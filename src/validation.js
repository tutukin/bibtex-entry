'use strict';

const FIELD = require('./fields');
const TYPE = require('./types');

const validation = module.exports = {};

validation[TYPE.article] = {
    mandatory: [
        [FIELD.author],
        [FIELD.title],
        [FIELD.journal],
        [FIELD.year] 
    ],

    optional: [
        FIELD.volume,
        FIELD.number,
        FIELD.pages,
        FIELD.month,
        FIELD.note
    ]
};
    
validation[TYPE.book] = {
    mandatory: [
        [FIELD.author, FIELD.editor],
        [FIELD.title],
        [FIELD.publisher],
        [FIELD.year]
    ],

    optional: [
        FIELD.volume,
        FIELD.number,
        FIELD.series,
        FIELD.address,
        FIELD.edition,
        FIELD.month,
        FIELD.note
    ]
};

validation[TYPE.booklet] = {
    mandatory: [
        [FIELD.title]
    ],

    optional: [
        FIELD.author,
        FIELD.howpublished,
        FIELD.address,
        FIELD.month,
        FIELD.year,
        FIELD.note
    ]
};

validation[TYPE.inbook] = {
    mandatory: [
        [FIELD.author, FIELD.editor],
        [FIELD.title],
        [FIELD.chapter, FIELD.pages],
        [FIELD.publisher],
        [FIELD.year]
    ],

    optional: [
        FIELD.volume,
        FIELD.number,
        FIELD.series,
        FIELD.type,
        FIELD.address,
        FIELD.edition,
        FIELD.month,
        FIELD.note
    ]
};

validation[TYPE.incollection] = {
    mandatory: [
        [FIELD.author],
        [FIELD.title],
        [FIELD.booktitle],
        [FIELD.publisher],
        [FIELD.year]
    ],

    optional: [
        FIELD.editor,
        FIELD.volume,
        FIELD.number,
        FIELD.series,
        FIELD.type,
        FIELD.chapter,
        FIELD.pages,
        FIELD.address,
        FIELD.edition,
        FIELD.month,
        FIELD.note
    ]
};

validation[TYPE.conference] = validation[TYPE.inproceedings] = {
    mandatory: [
        [FIELD.author],
        [FIELD.title],
        [FIELD.booktitle],
        [FIELD.year]
    ],

    optional: [
        FIELD.editor,
        FIELD.volume,
        FIELD.number,
        FIELD.series,
        FIELD.pages,
        FIELD.address,
        FIELD.month,
        FIELD.organization,
        FIELD.publisher,
        FIELD.note
    ]
};

validation[TYPE.manual] = {
    mandatory: [[FIELD.title]],

    optional: [
        FIELD.author,
        FIELD.organization,
        FIELD.address,
        FIELD.edition,
        FIELD.month,
        FIELD.year,
        FIELD.note
    ]
};

validation[TYPE.mastersthesis] = {
    mandatory: [
        [FIELD.author],
        [FIELD.title],
        [FIELD.school],
        [FIELD.year]
    ],

    optional: [
        FIELD.type,
        FIELD.address,
        FIELD.month,
        FIELD.note
    ]
};

validation[TYPE.misc] = {
    mandatory: [],

    optional: [
        FIELD.author,
        FIELD.title,
        FIELD.howpublished,
        FIELD.month,
        FIELD.year,
        FIELD.note
    ]
};

validation[TYPE.phdthesis] = {
    mandatory: [
        [FIELD.author],
        [FIELD.title],
        [FIELD.school],
        [FIELD.year]
    ],

    optional: [
        FIELD.type,
        FIELD.address,
        FIELD.month,
        FIELD.note
    ]
};

validation[TYPE.proceedings] = {
    mandatory: [
        [FIELD.title],
        [FIELD.year]
    ],

    optional: [
        FIELD.editor,
        FIELD.volume,
        FIELD.number,
        FIELD.series,
        FIELD.address,
        FIELD.month,
        FIELD.organization,
        FIELD.publisher,
        FIELD.note
    ]
};
    
validation[TYPE.techreport] = {
    mandatory: [
        [FIELD.author],
        [FIELD.title],
        [FIELD.institution],
        [FIELD.year]
    ],

    optional: [
        FIELD.type,
        FIELD.number,
        FIELD.address,
        FIELD.month,
        FIELD.note
    ]
};

validation[TYPE.unpublished] = {
    mandatory: [
        [FIELD.author],
        [FIELD.title],
        [FIELD.note]
    ],

    optional: [
        FIELD.month,
        FIELD.year
    ]
};
