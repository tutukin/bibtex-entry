'use strict';

const validation = require('./validation');

module.exports = class Entry {
    #type;
    #key;
    #fields = {};

    constructor(type) {
        this.#type = type.toLowerCase();
        if (!validation[this.#type]) {
            throw Error(`Unknown type ${type}`);
        }
    }

    setKey(key) {
        this.#key = key;
    }

    toString() {
        const { mandatory, optional } = validation[this.#type];
        var expectedFields = mandatory.flat().concat(optional).sort();
        var fields = expectedFields
            .map(n => [n, this.#fields[n]])
            .filter(([k, v]) => !!v)
            .map(([k, v]) => `\t${k} = "${v}"`);
        return `@${this.#type}(${this.#key}
${fields.join(',\n')})`;
    }

    validate() {
        const { mandatory } = validation[this.#type];
        const fieldNames = Object.keys(this.#fields);
        const errors = [];

        if (!!this.#key) {
            errors.push(`Entry key should be defined.`)
        }
        for (let alternatives of mandatory) {
            if (!alternatives.find(a => fieldNames.includes(a))) {
                const message = alternatives.length > 1 ?
                    `At east one of [${alternatives.join(', ')}] should be defined for the '${this.#type}' type.` :
                    `The field ${alternatives[0]} is mandatory for the '${this.#type}' type.`;
                errors.push(message);
            }
        }

        return errors;
    }
}
