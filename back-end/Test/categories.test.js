const chai = require('chai')
const should = chai.should()
const expect = chai.expect()
const server = require('../app')
const chaiHttp = require('chai-http')
const chaiSorted = require('chai-sorted')
chai.use(chaiHttp)
chai.use(chaiSorted)

describe('The "/categories" route', () => {
    describe('The "/" route GET function for all categories', () => {
        it('should be an array', (done) => {
            chai.request(server)
                .get('/categories')
                .end((err, res) => {
                    res.body.should.be.a('array')
                    done()
                })
        })
        it('should return all 3 categories', (done) => {
            chai.request(server)
                .get('/categories')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.length.should.be.equals(3)
                    done()
                })
        })
    })
    describe('GET category by :/id', () => {
        it('should return one object', (done) => {
            chai.request(server)
                .get(`/categories/2`)
                .end((err, res) => {
                    res.body.should.be.a('object')
                    Array(res.body).length.should.be.equals(1)
                    done()
                })
        })
        it('should return a product with the same id successfully', (done) => {
            chai.request(server)
                .get(`/categories/2`)
                .end((err, res) => {
                    const resultID = res.body._id
                    res.should.have.status(200)
                    resultID.should.be.equals(2)
                    done()
                })
        })
    })
    describe('GET categories by product ID with "/product/:id"', () => {
        it('should return an array', (done) => {
            chai.request(server)
                .get(`/categories/product/2`)
                .end((err, res) => {
                    res.body.should.be.a('array')
                    res.body.length.should.be.equals(1)
                    done()
                })
        })
        it('should return the correct categories', (done) => {
            chai.request(server)
                .get(`/categories/product/2`)
                .end((err, res) => {
                    const resultID = res.body._id
                    res.should.have.status(200)
                    res.body.forEach(category => category._id.should.be.equals(2))
                    done()
                })
        })
    })
})
