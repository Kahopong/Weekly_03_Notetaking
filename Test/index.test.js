const request = require('supertest')
const app = require('../index.js')

describe('index test', () => {

    test('/ should return index page', (done) => {
        request(app).get('/')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200, done)
    })

    // test('Wrong password should give 401 Unauthorized', (done) => {
    //     let username = 'tester'
    //     let password = 'wrongPassword'
    //     request(app).get('/')
    //         .auth(username, password)
    //         .expect(401, done)
    // })

    // test('Wrong username should give 401 Unauthorized', (done) => {
    //     let username = 'wrongUsername'
    //     let password = 'abcd'
    //     request(app).get('/')
    //         .auth(username, password)
    //         .expect(401, done)
    // })

    // test('Wrong address should give 404 not found', (done) => {
    //     let username = 'tester'
    //     let password = 'abcd'
    //     request(app).get('/api/wrong')
    //         .auth(username, password)
    //         .expect(404, done)
    // })

    // test('GET method should give 401 for wrong login', (done) => {
    //     let username = 'wrong'
    //     let password = 'wrong'
    //     request(app).get('/api/notes')
    //         .auth(username, password)
    //         .expect(401, done)
    // })

    // test('POST method should give 401 for wrong login', (done) => {
    //     let username = 'wrong'
    //     let password = 'wrong'
    //     request(app).post('/api/notes')
    //         .auth(username, password)
    //         .expect(401, done)
    // })

    // test('PUT method should give 401 for wrong login', (done) => {
    //     let username = 'wrong'
    //     let password = 'wrong'
    //     request(app).put('/api/notes')
    //         .auth(username, password)
    //         .expect(401, done)
    // })

    // test('DELETE method should give 401 for wrong login', (done) => {
    //     let username = 'wrong'
    //     let password = 'wrong'
    //     request(app).delete('/api/notes')
    //         .auth(username, password)
    //         .expect(401, done)
    // })
})