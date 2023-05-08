const chai = require('chai')
const should = chai.should()
const expect = chai.expect()
const server = require('../app')
const chaiHttp = require('chai-http')
const chaiSorted = require('chai-sorted')
chai.use(chaiHttp)
chai.use(chaiSorted)

describe('The "/users" route', () => {
    describe('The "/register" route POST function for registering a new user', () => {
        const newUser = {    
            "_id": 5,
            "user": "Artist",
            "name": {
                "first": "Random",
                "last": "Userrr"
            },
            "email": "artist5@artist.com",
            "password": "123456",
            "products_uploaded": [],
            "cart": [],
            "saved": [],
            "following" : [],
            "followers" : []
        }
        it('should respond the user object with successful status', (done) => { 
            chai.request(server)
                .post('/users/register')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a("object")
                    res.body.should.have.property("_id")
                    res.body._id.should.be.a("number")
                    res.body.should.have.property("user")
                    res.body.user.should.be.a("string")
                    
                    res.body.should.have.property("name")
                    res.body.name.should.be.a("object")
                    res.body.name.should.have.property("first")
                    res.body.name.first.should.be.a("string")
                    res.body.name.should.have.property("last")
                    res.body.name.last.should.be.a("string")
                    res.body.name.should.have.property("full")
                    res.body.name.full.should.be.a("string")

                    res.body.should.have.property("password")
                    res.body.password.should.be.a("string")

                    res.body.should.have.property("products_uploaded")
                    res.body.products_uploaded.should.be.a("array")
                    res.body.should.have.property("cart")
                    res.body.cart.should.be.a("array")
                    res.body.should.have.property("saved")
                    res.body.saved.should.be.a("array")

                    res.body.should.have.property("following")
                    res.body.following.should.be.a("array")
                    res.body.should.have.property("followers")
                    res.body.followers.should.be.a("array")
                    done()
                })
        })
        it('should hash users password before saving', (done) => {
            chai.request(server)
                .post('/users/register')
                .send(newUser)
                .end((err, res) => {
                    (res.body.password !== newUser.password).should.be.true
                    done()
            })
        })
    })
    describe('The "/login" route POST function for registering a new user', () => {
        const newUser = {    
            "email": "artist1@artist.com",
            "password": "123456"
        }
        const nonExistantUser = {    
            "email": "artist6@artist.com",
            "password": "123456"
        }
        const wrongPasswordUser = {    
            "email": "artist1@artist.com",
            "password": "12345678"
        }
        const chooseUser = Math.floor(Math.random() * 3) + 1
        if(chooseUser === 2){
            it('should respond with an object', (done) => { 
                chai.request(server)
                    .post('/users/login')
                    .send(wrongPasswordUser)
                    .end((err, res) => {
                        res.body.should.be.a('object')
                        done()
                    })   
            })
        }
        else if(chooseUser === 3){
            it('should respond with an object', (done) => { 
                chai.request(server)
                    .post('/users/login')
                    .send(nonExistantUser)
                    .end((err, res) => {
                        res.body.should.be.a('object')
                        done()
                    })   
            })
        }
        else{
            it('should respond with an object', (done) => { 
                chai.request(server)
                    .post('/users/login')
                    .send(newUser)
                    .end((err, res) => {
                        res.body.should.be.a('object')
                        done()
                    })   
            })
        }
        it('should return correct message and status on successful login', (done) => {
            chai.request(server)
                .post('/users/login')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.success.should.equal(true)
                    res.body.message.should.include("Successful Login!")
                    done()
            })
        })
        it('should return correct message and status on a non existant user login', (done) => {
            chai.request(server)
                .post('/users/login')
                .send(nonExistantUser)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.success.should.equal(false)
                    res.body.message.should.include("artist6@artist.com is not registered with us yet!")
                    done()
            })
        })
        it('should return correct message and status on a wrong password user login', (done) => {
            chai.request(server)
                .post('/users/login')
                .send(wrongPasswordUser)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.success.should.equal(false)
                    res.body.message.should.include("Wrong Username and/or Password!")
                    done()
            })
        })
    })
    describe('The "/:id" route GET function for getting a single user by ID', () => {
        it('should return the user object with successful status', (done) => { 
            chai.request(server)
                .get('/users/3')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a("object")
                    res.body.should.have.property("_id")
                    res.body._id.should.be.a("number")
                    res.body.should.have.property("user")
                    res.body.user.should.be.a("string")
                    
                    res.body.should.have.property("name")
                    res.body.name.should.be.a("object")
                    res.body.name.should.have.property("first")
                    res.body.name.first.should.be.a("string")
                    res.body.name.should.have.property("last")
                    res.body.name.last.should.be.a("string")
                    res.body.name.should.have.property("full")
                    res.body.name.full.should.be.a("string")

                    res.body.should.have.property("products_uploaded")
                    res.body.products_uploaded.should.be.a("array")
                    res.body.should.have.property("cart")
                    res.body.cart.should.be.a("array")
                    res.body.should.have.property("saved")
                    res.body.saved.should.be.a("array")

                    res.body.should.have.property("following")
                    res.body.following.should.be.a("array")
                    res.body.should.have.property("followers")
                    res.body.followers.should.be.a("array")
                    done()
                })
        })
        it('should not return users password', (done) => {
            chai.request(server)
                .get('/users/3')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.not.have.property("password")
                    done()
            })
        })
        it('should return correct message and status on a non existant user ID get request', (done) => {
            chai.request(server)
                .get('/users/6')
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.have.property("success")
                    res.body.success.should.equal(false)
                    res.body.should.have.property("message")
                    res.body.message.should.include("User ID: 6 is not valid!")
                    done()
            })
        })
    })
})