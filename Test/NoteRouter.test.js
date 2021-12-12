const NoteRouter = require('../Routers/NoteRouter.js');
let noteRouter;
let noteService;
let response;

describe("Testing noteRouter with a function noteService", () => {
    beforeEach(() => {
        noteService = {
            list: jest.fn().mockResolvedValue(true),
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
        noteRouter.get({ auth: { user: 'Sam', }, }, response)
            .then(() => {
                expect(noteService.list).toHaveBeenCalledWith('Sam');
                done();
            })
    })

    test('Post request should call add function of noteService', (done) => {
        noteRouter.post({
                auth: { user: 'Sam', },
                body: { note: 'Testing', },
            }, response)
            .then(() => {
                expect(noteService.add).toHaveBeenCalledWith('Testing', 'Sam')
                expect(noteService.list).toHaveBeenCalledWith('Sam');
                expect(response.status).not.toHaveBeenCalled()
                done();
            })
            .catch((err) => {
                throw new Error(err)
            })
    })

    test('Put request should call update function of noteService', (done) => {
        noteRouter.put({
                auth: { user: 'Sam', },
                body: { note: 'Testing', },
                params: { id: 1, },
            }, response)
            .then(() => {
                expect(noteService.update).toHaveBeenCalledWith(1, 'Testing', 'Sam')
                expect(noteService.list).toHaveBeenCalledWith('Sam');
                expect(response.status).not.toHaveBeenCalled()
                done();
            })
            .catch((err) => {
                throw new Error(err)
            })
    })

    test('Delete request should call remove function of noteService', (done) => {
        noteRouter.delete({
                auth: { user: 'Sam', },
                params: { id: 2, },
            }, response)
            .then(() => {
                expect(noteService.remove).toHaveBeenCalledWith(2, 'Sam')
                expect(noteService.list).toHaveBeenCalledWith('Sam');
                expect(response.status).not.toHaveBeenCalled()
                done();
            })
            .catch((err) => {
                throw new Error(err)
            })
    })
})