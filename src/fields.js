'use strict';

/**
 * See http://mirror.macomnet.net/pub/CTAN/biblio/bibtex/contrib/doc/btxdoc.pdf
 */
module.exports = {
    /**
     * Usually the address of the publisher or other type of institution. For major publishing houses,
     * van Leunen recommends omitting the information entirely. For small publishers, on the other hand,
     * ou can help the reader by giving the complete address.
     */
    address: 'address',
   
    /**
     * An annotation. It is not used by the standard bibliography styles, but may be used by others
     * that produce an annotated bibliography.
     */
    annote: 'annote',

    /**
     * The name(s) of the author(s), in the format described in the LATEX book.
     */
    author: 'author',

    /**
     * Title of a book, part of which is being cited. See the LATEX book for how to type titles.
     * For book entries, use the **title** field instead.
     */
    booktitle: 'booktitle',

    /**
     * A chapter (or section or whatever) number.
     */
    chapter: 'chapter',

    /**
     * The database key of the entry being cross referenced.
     */
    crossref: 'crossref',

    /**
     * The edition of a book—for example, “Second”. This should be an ordinal, and should
     * have the first letter capitalized, as shown here; the standard styles convert to
     * lower case when necessary.
     */
    edition: 'edition',

    /**
     * Name(s) of editor(s), typed as indicated in the LATEX book. If there is also an author
     * field, then the editor field gives the editor of the book or collection in which
     * the reference appears.
     */
    editor: 'editor',

    /**
     * How something strange has been published. The first word should be capitalized.
     */
    howpublished: 'howpublished',

    /**
     * The sponsoring institution of a technical report.
     */
    institution: 'institution',
    
    /**
     * A journal name. Abbreviations are provided for many journals; see the Local Guide.
     */
    journal: 'journal',

    /**
     * Used for alphabetizing, cross referencing, and creating a label when the “author”
     * information (described in Section 4) is missing. This field should not be confused
     * with the key that appears in the \cite command and at the beginning of the database entry.
     */
    key: 'key',

    /**
     * The month in which the work was published or, for an unpublished work, in which it was
     * written. You should use the standard three-letter abbreviation, as described in
     * Appendix B.1.3 of the LATEX book.
     */
    month: 'month',

    /**
     * Any additional information that can help the reader. The first word should be capitalized.
     */
    note: 'note',

    /**
     * The number of a journal, magazine, technical report, or of a work in a series. An issue of
     * a journal or magazine is usually identified by its volume and number; the organization that
     * issues a technical report usually gives it a number; and sometimes books are given numbers
     * in a named series.
     */
    number: 'number',

    /**
     * The organization that sponsors a conference or that publishes a manual.
     */
    organization: 'organization',

    /**
     * One or more page numbers or range of numbers, such as 42--111 or 7,41,73--97 or 43+
     * (the ‘+’ in this last example indicates pages following that don’t form a simple range).
     * To make it easier to maintain Scribecompatible databases, the standard styles convert
     * a single dash (as in 7-33) to the double dash used in TEX to denote number ranges
     * (as in 7--33).
     */
    pages: 'pages',

    /**
     * The publisher’s name.
     */
    publisher: 'publisher',

    /**
     * The name of the school where a thesis was written.
     */
    school: 'school',

    /**
     * The name of a series or set of books. When citing an entire book, the the title field
     * gives its title and an optional series field gives the name of a series or multi-volume
     * set in which the book is published.
     */
    series: 'series',

    /**
     * The work’s title, typed as explained in the LATEX book.
     */
    title: 'title',

    /**
     * The type of a technical report—for example, “Research Note”.
     */
    type: 'type',

    /**
     * The volume of a journal or multivolume book.
     */
    volume: 'volume',

    /**
     * The year of publication or, for an unpublished work, the year it was written. Generally it
     *  should consist of four numerals, such as 1984, although the standard styles can handle
     * any year whose last four nonpunctuation characters are numerals, such as ‘(about 1984)’.
     */
    year: 'year',

    /**
     * Normalizes the field name. Returns `undefined` for an unknown field.
     * @param {string} name the field name.
     * @returns {string} the normalized field name, or undefined for an unknown field.
     */
    $normalize(name) {
        name = name.toLowerCase();
        return !!this[name] ?
            name :
            undefined;
    }
};
