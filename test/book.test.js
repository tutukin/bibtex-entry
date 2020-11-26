'use strict';

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { expect } = Code;
const { describe, it } = exports.lab = Lab.script();

const { TYPE, FIELD, Entry} = require('..');

describe('ctor', () => {
    it('throws when the entry type is invalid', () => {
        expect(() => new Entry('invalid entry type')).to.throw(Error, 'Unknown type invalid entry type');
    });
});

describe('validate', () => {
    it('returns an empty array on a valid entry', () => {
        const entry = getValidEntry();
        const validationResult = entry.validate();
        expect(validationResult).to.be.empty();
    });

    it('returns an array of validation errors on an invalid entry', () => {
        const entry = new Entry(TYPE.book);
        const validationResult = entry.validate();
        expect(validationResult).to.be.not.empty();
    });
});

describe('toString', () => {
    it('should stringify the entry', () => {
        const entry = getValidEntry();
        const expectedBibtex = getValidEntryAsBibTeX();
        expect(entry.toString()).equals(expectedBibtex);
    });
});

describe.skip('parse', () => {
    it('parses bibtex records', () => {
        const bibtex = getValidEntryAsBibTeX();
        const expectedEntry = getValidEntry();

        const entry = Entry.parse(bibtex);

        expect(entry.getKey()).equals(expectedEntry.getKey());
       
        for (let [name, value] of entry.getFields) {
            expect(value).equals(expectedEntry.getField(name));
        }
    });
});

describe('adding and getting a field', () => {
    it('should add and retrieve a valid field', () => {
        const entry = new Entry(TYPE.book);
        const title = 'a title';

        entry.addField(FIELD.title, title);

        expect(entry.getField(FIELD.title)).equals(title);
    });

    it('should throw on adding an unknown field', () => {
        const entry = new Entry(TYPE.book);
        expect(() => entry.addField('unknown field', 'any value')).to.throw(Error, `Unknown field name 'unknown field'`);
    });

    it('should throw on adding an invalid field', () => {
        const entry = new Entry(TYPE.book);
        expect(() => entry.addField(FIELD.journal, 'journal')).throws(Error, `The field 'journal' is invalid in the context of type 'book'`);
    });
});

describe('addFields', () => {
    it('treats the single argument as key', () => {
        const entry = new Entry(TYPE.book);
        entry.addFields('entryKey');
        expect(entry.getKey()).equals('entryKey');
    });

    it('treats the first argument as key when the number of arguments is odd', () => {
        const entry = new Entry(TYPE.book);
        
        entry.addFields(
            'entryKey',
            FIELD.author, 'author');

        expect(entry.getKey()).equals('entryKey');
    });

    it('does not chage the key when the number of arguments is even', () => {
        const entry = new Entry(TYPE.book);
        entry.setKey('entryKey');
        
        entry.addFields(FIELD.author, 'author');

        expect(entry.getKey()).equals('entryKey');
    });

    it('sets fields when the number of arguments is odd and more than 1', () => {
        const entry = new Entry(TYPE.book);
        
        entry.addFields(
            'entryKey',
            FIELD.author, 'author');
        
        expect(entry.getField(FIELD.author)).equals('author');
    })

    it('sets fields when there is an even number of arguments', () => {
        const entry = new Entry(TYPE.book);
        
        entry.addFields(
            FIELD.author, 'author');
        
        expect(entry.getField(FIELD.author)).equals('author');
    });
});

function getValidEntry() {
    var entry = new Entry(TYPE.book);
    entry.setKey('entryKey');
    [FIELD.author, FIELD.title, FIELD.publisher, FIELD.year].forEach(f => entry.addField(f, f));
    return entry;
}

function getValidEntryAsBibTeX() {
    return `@book(entryKey,
    author = "author",
    publisher = "publisher",
    title = "title",
    year = "year")`;
}