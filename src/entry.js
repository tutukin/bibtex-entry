'use strict';

const validation = require('./validation');
const FIELD = require('./fields');

module.exports = class Entry {
    #type;
    #key;
    #fields = {};

    /**
     * Creates an entry of the given type.
     * @param {enum} type the entry type.
     */
    constructor(type) {
        this.#type = type.toLowerCase();
        if (!validation[this.#type]) {
            throw Error(`Unknown type ${type}`);
        }
    }

    /**
     * Creates an entry from its JSON representation.
     * @param {string} json the JSON string created with the
     *      `toJson()` method.
     * @returns {Entry} the entry.
     */
    static fromJson(json) {
        var obj = JSON.parse(json);
        var entry = new Entry(obj.$type);
        entry.setKey(obj.$id);
        for (let fieldName of Object.keys(obj).filter(n => !n.startsWith('$'))) {
            entry.addField(fieldName, obj[fieldName]);
        }
        return entry;
    }

    /**
     * Adds specified fields to the entry.
     * @param  {...string} fields the fields. When the number of arguments
     * is odd, then the first argument is the entry key. When the number
     * of arguments is even, they are treated as name1, value1, name2, value2…
     */
    addFields(...fields) {
        if (fields.length % 2 != 0) {
            this.setKey(fields.shift());
        }

        while (fields.length > 0) {
            this.addField(fields.shift(), fields.shift());
        }
    }

    /**
     * Adds the specified field to the entry.
     * @param {string} fieldName the name of the field.
     * @param {*} value the value of the field.
     * @throws {Error} for an undefined or an invalid field.
     */
    addField(fieldName, value) {
        fieldName = this._getNormalizedFieldName(fieldName);
        this.#fields[fieldName] = value;
    }

    /**
     * Gets the value of a field.
     * @param {string} fieldName the field name.
     * @throws {Error} for an undefined or an invalid field.
     */
    getField(fieldName) {
        fieldName = this._getNormalizedFieldName(fieldName);
        return this.#fields[fieldName];
    }

    /**
     * Returns an iterator over pairs [name, value].
     */
    *fields() { // FIXME: may it be `get *fields()` ?
        for (let pair of Object.entries(this.#fields).sort((a, b) => a[0] - b[0])) {
            yield pair;
        }
    }

    /**
     * Returns the entry key.
     * @returns {string} the entry key.
     */
    getKey() {
        return this.#key;
    }

    /**
     * Parses a bibtex record.
     * @param {string} bibtex the BibTeX record.
     * @returns {Entry} the entry instance.
     */
    static parse(bibtex) {
        throw Error('Not implemented');
    }

    /**
     * Sets the entry key.
     * @param {string} key the entry key.
     * @throws {Error} TODO: validate the key! 
     */
    setKey(key) {
        // FIXME validate the key!
        this.#key = key;
    }

    /**
     * Returns the string representation of the BibTeX entry.
     * @returns {string} the bibtex entry.
     */
    toString() {
        const { mandatory, optional } = validation[this.#type];
        var expectedFields = mandatory.flat().concat(optional).sort();
        var fields = expectedFields
            .map(n => [n, this.#fields[n]])
            .filter(([k, v]) => !!v)
            .map(([k, v]) => `    ${k} = "${v}"`);
        return `@${this.#type}(${this.#key},
${fields.join(',\n')})`;
    }

    /**
     * Converts the entry to JSON.
     * @returns {string} the JSON representation of the entry.
     */
    toJson() {
        const obj = {
            $type: this.#type,
            $id: this.getKey()
        };

        for (let [name, value] of this.fields())
        {
            obj[name] = value;
        }

        return JSON.stringify(obj);
    }

    /**
     * Validates the entry.
     * @returns {string[]} the array of validation errors or an empty array
     * for a valid entry.
     */
    validate() {
        const { mandatory } = validation[this.#type];
        const fieldNames = Object.keys(this.#fields);
        const errors = [];

        if (!this.#key) {
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

    _getNormalizedFieldName(fieldName) {
        const normalizedFieldName = FIELD.$normalize(fieldName);

        if (!normalizedFieldName) {
            throw Error(`Unknown field name '${fieldName}'`);
        }

        const { mandatory, optional } = validation[this.#type];

        if (!mandatory.flat().includes(normalizedFieldName) && !optional.includes(normalizedFieldName)) {
            throw Error(`The field '${fieldName}' is invalid in the context of type '${this.#type}'`);
        }

        return fieldName;
    }
}
