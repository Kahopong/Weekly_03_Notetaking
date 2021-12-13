const NoteRouter = require('../Routers/NoteRouter.js');
let noteRouter;
let noteService;
let response;


describe("Testing noteRouter with a function noteService", () => {

    beforeEach(() => {
        noteService = {
            list: jest.fn().mockResolvedValue({ 'note': 'note' }),
            add: jest.fn().mockResolvedValue(true),
            remove: jest.fn().mockResolvedValue(true),
            update: jest.fn().mockResolvedValue(true),
        }
        noteRouter = new NoteRouter(noteService);
        response = {
            status: jest.fn().mockResolvedValue(200),
            json: () => {
                return "Mock"
            },
        }
    })



    test('Get request should call a list of notes of the user', (done) => {
        let request = { session: { passport: { user: { username: 'sam' } } } }
        noteRouter.get(request, response)
            .then(() => {
                expect(noteService.list).toHaveBeenCalledWith('sam');
                done();
            })
    })

    test('Post request should call add function of noteService', (done) => {
        let request = {
            session: { passport: { user: { username: 'sam' } } },
            body: { note: 'Testing', },
        }
        noteRouter.post(request, response)
            .then(() => {
                expect(noteService.add).toHaveBeenCalledWith('Testing', 'sam')
                done();
            })
            .catch((err) => {
                throw new Error(err)
            })
    })

    test('Put request should call update function of noteService', (done) => {
        let request = {
            session: { passport: { user: { username: 'sam' } } },
            body: { note: 'Testing', },
            params: { id: 1, },
        }
        noteRouter.put(request, response)
            .then(() => {
                expect(noteService.update).toHaveBeenCalledWith(1, 'Testing', 'sam')
                done();
            })
            .catch((err) => {
                throw new Error(err)
            })
    })

    test('Delete request should call remove function of noteService', (done) => {
        let request = {
            session: { passport: { user: { username: 'sam' } } },
            params: { id: 1, },
        }
        noteRouter.delete(request, response)
            .then(() => {
                expect(noteService.remove).toHaveBeenCalledWith(1, 'sam')
                done();
            })
            .catch((err) => {
                throw new Error(err)
            })
    })
})