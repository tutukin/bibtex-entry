'use strict';

const FIELD = require('./fields');

module.exports = {
    /**
     * An article from a journal or magazine.
     */
    article: 'article',
    
    /**
     * A book with an explicit publisher.
     */
    book: 'book',

    /**
     * A work that is printed and bound, but without a named publisher or sponsoring institution.
     */
    booklet: 'booklet',

    /**
     * The same as INPROCEEDINGS, included for Scribe compatibility.
     */
    conference: 'conference',

    /**
     * A part of a book, which may be a chapter (or section or whatever) and/or a range of pages.
     */
    inbook: 'inbook',

    /**
     * A part of a book having its own title.
     */
    incollection: 'incollection',

    /**
     * An article in a conference proceedings.
     */
    inproceedings: 'inproceedings',

    /**
     * Technical documentation.
     */
    manual: 'manual',

    /**
     * A Master’s thesis.
     */
    mastersthesis: 'masterthesis',

    /**
     * Use this type when nothing else fits.
     */
    misc: 'misc',

    /**
     * A PhD thesis.
     */
    phdthesis: 'phdthesis',

    /**
     * The proceedings of a conference.
     */
    proceedings: 'proceedings',
    
    /**
     * A report published by a school or other institution, usually numbered within a series.
     */
    techreport: 'techreport',

    /**
     * A document having an author and title, but not formally published.
     */
    unpublished: 'unpublished'
};
