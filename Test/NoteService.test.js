// Before each time you run jest test: un the commands below in you CLI
// knex migrate:rollback --env testing
// knex migrate:latest --env testing
// knex seed:run --env testing
// This resets the testing database we want to use within this application

// run the test with: --forceExit


const NoteService = require('../Services/NoteService.js');
const knexFile = require('../knexfile').development;
const knex = require('knex')(knexFile);
let noteService;

describe('Testing Note Service', () => {

    beforeEach(() => {
        noteService = new NoteService(knex);
    })

    //-------List Function------
    test('listing correctly', () => {
        return noteService.list('dennis')
            .then((notes) => expect(notes.map((a) => a.note)).toStrictEqual(['I am Dennis']));
    })

    test('listing negative test', () => {
        return noteService.list('negative')
            .catch((err) => {
                expect(err).toEqual(new Error('Cannot list notes to a non-existing user'))
            })
    })

    // //-------Add Function------
    test('adding correctly', () => {
        return noteService.add('adding', 'dennis')
            .then((notes) => expect(notes.map((a) => a.note)).toStrictEqual(['I am Dennis', 'adding']));
    })

    test('adding negative test', () => {
        return noteService.add('adding', 'negative')
            .catch((err) => {
                expect(err).toEqual(new Error('Cannot add notes to a non-existing user'))
            })
    })

    // //-------Update Function------
    test('update correctly', () => {
        return noteService.update(1, 'editting', 'dennis')
            .then((notes) => expect(notes.map((a) => a.note)).toStrictEqual(['I am Dennis', 'editting']));
    })

    test('updating negative test: non-existing user', () => {
        return noteService.update(0, 'editting', 'negative')
            .catch((err) => {
                expect(err).toEqual(new Error('Cannot update notes to a non-existing user'))
            })
    })

    test('updating negative test: non-existing index', () => {
        return noteService.update(3, 'editting', 'dennis')
            .catch((err) => {
                expect(err).toEqual(new Error('Cannot update notes of an incorrect index'))
            })
    })

    // //-------Remove Function------
    test('remove correctly', () => {
        return noteService.remove(1, 'dennis')
            .then((notes) => expect(notes.map((a) => a.note)).toStrictEqual(['I am Dennis']));
    })

    test('removing negative test: non-existing user', () => {
        return noteService.remove(0, 'negative')
            .catch((err) => {
                expect(err).toEqual(new Error('Cannot remove notes from a non-existing user'))
            })
    })

    test('removing negative test: non-existing index', () => {
        return noteService.remove(3, 'dennis')
            .catch((err) => {
                expect(err).toEqual(new Error('Cannot remove notes of an incorrect index'))
            })
    })


    // //-------Test all in one---------

    test('All in one add, update, remove, list', () => {
        return noteService.add('Hello World', 'alina')
            .then(() => noteService.add('Knex is fun', 'alina'))
            .then(() => noteService.update(1, 'changed', 'alina'))
            .then(() => noteService.remove(0, 'alina'))
            .then(() => noteService.update(0, 'Death Note', 'alina'))
            .then(() => noteService.remove(0, 'alina'))
            .then(() => noteService.list('alina'))
            .then((notes) => expect(notes.map((a) => a.note)).toStrictEqual(['Knex is fun']));
    })
})