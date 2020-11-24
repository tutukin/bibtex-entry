'use strict';

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { expect } = Code;
const { it } = exports.lab = Lab.script();

const { TYPE, FIELD, Entry} = require('..');

it('xxx yyy', () => {
    const book = new Entry(TYPE.book);
    const errors = book.validate();
    expect(errors).to.have.length().above(0);
});