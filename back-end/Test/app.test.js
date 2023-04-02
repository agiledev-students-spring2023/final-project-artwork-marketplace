const chai = require('chai')
const server = require('../app')
const should = chai.should()
const expect = chai.expect()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

describe('The default "/" route', () => {
    describe('The default REST API server', () => {
        it('should have successful status', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })
        it('should respond with a res object', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.body.should.be.a('object')
                    done()
                })
        })
        it('should send a message including the default "/" route has been requested', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    const successMessage = res.text
                    successMessage.should.be.a('string')
                    successMessage.should.include('path "/" received!')
                    done()
                })
        })
    })
})