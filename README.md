# Bibtex Entry

Provides a basic entity class for a BibTeX entry. Implementation follows
the [BibTeXing]( http://mirror.macomnet.net/pub/CTAN/biblio/bibtex/contrib/doc/btxdoc.pdf)
by Oren Patashnik.

This package is not fully implemented, so the following example is a kind of a plan to do. Check unit tests
for what is actually implemented (more or less).

## Getting Startes

Install it via [npm](https://www.npmjs.com/package/bibtex-entry):

```shell
npm install bibtex-entry
```

Use in your project:

```javascript
const { Entry, FIELD, TYPE } = require('bibtex-entry');

const book = new Entry(TYPE.book);

book.setKey('Knuth-1986');

book.addFields(
    FIELD.author, 'Knuth, Donald Ervin',
    FIELD.title, 'The TeXbook',
    FIELD.publisher, 'Addison-Wesley',
    FIELD.year, 1986);

if (book.validate().length == 0) {
    console.log(book);
}


const article = Entry.parse(`@ARTICLE{Haaland-2002,
    AUTHOR = {Haaland, Arne and others},
    TITLE = {Molecular Structures of Two Metal Tetrakis(Tetrahydroborates), Zr(BH_4)_4 and U(BH_4)_4 : Equilibrium Conformations and Barriers to Internal Rotation of the Triply Bridging BH_4 Groups},
    JOURNAL = {Inorganic Chemistry},
    VOLUME = {41},
    NUMBER = {25},
    PAGES = {6646–55},
    YEAR = {2002}
}`);

if (article.validate().length == 0) {
    console.log(article.getField(FIELD.title));
}
```