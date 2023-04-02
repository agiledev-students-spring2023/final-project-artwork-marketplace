const chai = require('chai')
const should = chai.should()
const expect = chai.expect()
const server = require('../app')
const chaiHttp = require('chai-http')
const chaiSorted = require('chai-sorted')
chai.use(chaiHttp)
chai.use(chaiSorted)

// describe('The "/users" route', () => {
//     describe('The "/register" route POST function for registering a new user', () => {
//         const newUser = {    
//             "_id": 5,
//             "user": "Artist",
//             "name": {
//                 "first": "Anh",
//                 "last": "Tran"
//             },
//             "email": "artist5@artist.com",
//             "password": "123456",
//             "products_uploaded": [],
//             "cart": [],
//             "saved": [],
//             "following" : [],
//             "followers" : []
//         }
//         it('should be an object', (done) => { 
//             chai.request(server)
//                 .post('/users/register')
//                 .send(newUser)
//                 .end((err, res) => {
//                     res.body.should.be.a('object')
//                     done()
//                 })
//         })
//         it('should return all 15 artworks stored successfully', (done) => {
//             chai.request(server)
//                 .post('/users/register')
//                 .send(newUser)
//                 .end((err, res) => {
//                     res.body.should.have.status(200)
//                     res.body
//                     done()
//             })
//         })
//     })
//     describe('The "/login" route POST function for registering a new user', () => {
//         const newUser = {    
//             "_id": 5,
//             "user": "Artist",
//             "name": {
//                 "first": "Anh",
//                 "last": "Tran"
//             },
//             "email": "artist5@artist.com",
//             "password": "123456",
//             "products_uploaded": [],
//             "cart": [],
//             "saved": [],
//             "following" : [],
//             "followers" : []
//         }
//         it('should be an object', (done) => { 
//             chai.request(server)
//                 .post('/users/login')
//                 .send(newUser)
//                 .end((err, res) => {
//                     res.body.should.be.a('object')
//                     done()
//                 })
//         })
//         it('should return all 15 artworks stored successfully', (done) => {
//             chai.request(server)
//                 .post('/users/login')
//                 .send(newUser)
//                 .end((err, res) => {
//                     res.body.should.have.status(200)
//                     res.body
//                     done()
//             })
//         })
//     })
// })