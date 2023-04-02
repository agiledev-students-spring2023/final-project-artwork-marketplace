const chai = require('chai')
const should = chai.should()
const expect = chai.expect()
const server = require('../app')
const chaiHttp = require('chai-http')
const chaiSorted = require('chai-sorted')
chai.use(chaiHttp)
chai.use(chaiSorted)

describe('The "/artworks" route', () => {
    describe('The "/" route POST function for a new singular artwork', () => {
        const newArtwork = {
            _id: 16,
            artist_id: 3,
            name: "Lorem Ipsum",
            shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum et malesuada ipsum primis in faucibus",
            price: 5050,
            status: "Available",
            thumbnailURL: "https://picsum.photos/200/300",
            categories_id: [1],
            imagesURL: ["https://picsum.photos/400", "https://picsum.photos/300/200"]
        }
        const errorArtwork = {
            _id: 17,
            artist_id: 2,
            name: "Lorem Ipsum",
            shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum et malesuada ipsum primis in faucibus",
            price: 5050,
            status: "Available",
            thumbnailURL: "https://picsum.photos/200/300",
            categories_id: [1],
            imagesURL: ["https://picsum.photos/400", "https://picsum.photos/300/200"]
        }
        const random = Math.floor(Math.random() * 8)
        if(random === 0){
            errorArtwork._id = ""
        }else if(random === 1){
            errorArtwork.artist_id = ""
        }else if(random === 2){
            errorArtwork.name = ""
        }else if(random === 3){
            errorArtwork.shortDescription = ""
        }else if(random === 4){
            errorArtwork.price = ""
        }else if(random === 5){
            errorArtwork.status = ""
        }else if(random === 6){
            errorArtwork.thumbnailURL = ""
        }else if(random === 7){
            errorArtwork.categories_id = ""
        }else{
            errorArtwork.imagesURL = ""
        }
        it('should be an object', (done) => { 
            chai.request(server)
                .post('/artworks')
                .send(newArtwork)
                .end((err, res) => {
                    res.body.should.be.a('object')
                    done()
                })
        })
        it('should throw error if object does not meet requirements', (done) => {
            chai.request(server)
                .post('/artworks')
                .send(errorArtwork)
                .end((err, res) => {
                    res.should.have.status(400 || 500)
                    res.body.should.have.include("Artwork does not meet requirement!")
                    done()
            })
        })
        it('should return the object added with all required fields', (done) => {
            chai.request(server)
                .post('/artworks')
                .send(newArtwork)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property("_id")
                    res.body.should.have.property("artist_id")
                    res.body.should.have.property("name")
                    res.body.should.have.property("shortDescription")
                    res.body.should.have.property("categories_id")
                    res.body.categories_id.should.be.a("array")
                    res.body.status.should.equal("Available")
                    res.body.price.should.be.a("number")
                    res.body.should.have.property("thumbnailURL")
                    done()
            })
        })
    })
    describe('The "/" route GET function for all artworks in storage', () => {
        it('should be an array', (done) => {
            chai.request(server)
                .get('/artworks')
                .end((err, res) => {
                    res.body.should.be.a('array')
                    done()
                })
        })
        it('should return all 15 artworks stored successfully', (done) => {
            chai.request(server)
                .get('/artworks')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.length.should.be.equals(15)
                    done()
                })
        })
    })
    describe('The "/:id" route GET function for one artwork by ID', () => {
        const randomID = Math.floor(Math.random() * 15) + 1
        it('should return a singular object', (done) => {
            chai.request(server)
                .get(`/artworks/${randomID}`)
                .end((err, res) => {
                    res.body.should.be.a('object')
                    Array(res.body).length.should.be.equals(1)
                    done()
                })
        })
        it('should return a product with the same id successfully', (done) => {
            chai.request(server)
                .get(`/artworks/${randomID}`)
                .end((err, res) => {
                    const resultID = res.body._id
                    res.should.have.status(200)
                    resultID.should.be.equals(randomID)
                    done()
                })
        })
    })
    describe('The "/artist/:id" route GET function for artworks by a user ID', () => {
        const randomArtistID = Math.floor(Math.random() * 15) + 1
        it('should return a list', (done) => {
            chai.request(server)
                .get(`/artworks/artist/${randomArtistID}`)
                .end((err, res) => {
                    res.body.should.be.a('array')
                    done()
                })
        })
        it('should return artworks with the same artist id successfully', (done) => {
            chai.request(server)
                .get(`/artworks/artist/${randomArtistID}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.forEach(artwork => artwork.artist_id.should.be.equals(randomArtistID))
                    done()
                })
        })
    })
    describe('The "/category/:id" route GET function for artworks by a category ID', () => {
        const randomCategoryID = Math.floor(Math.random() * 3) + 1
        it('should return a list', (done) => {
            chai.request(server)
                .get(`/artworks/category/${randomCategoryID}`)
                .end((err, res) => {
                    res.body.should.be.a('array')
                    done()
                })
        })
        it('should return artworks with the same category id successfully', (done) => {
            chai.request(server)
                .get(`/artworks/category/${randomCategoryID}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.forEach(artwork => artwork.categories_id.should.include(randomCategoryID))
                    done()
                })
        })
    })
    describe('The "/sortedASC" route GET function for all ascending sorted artworks in storage', () => {
        it('should be an array', (done) => {
            chai.request(server)
                .get('/artworks/sortedASC')
                .end((err, res) => {
                    res.body.should.be.a('array')
                    done()
                })
        })
        it('should sort all 15 artworks by ascending price successfully', (done) => {
            chai.request(server)
                .get('/artworks/sortedASC')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.length.should.be.equals(15)
                    res.body.should.be.ascendingBy("price")
                    done()
                })
        })
    })
    describe('The "/sortedDES" route GET function for all ascending sorted artworks in storage', () => {
        it('should be an array', (done) => {
            chai.request(server)
                .get('/artworks/sortedDES')
                .end((err, res) => {
                    res.body.should.be.a('array')
                    done()
                })
        })
        it('should sort all 15 artworks by ascending price successfully', (done) => {
            chai.request(server)
                .get('/artworks/sortedDES')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.length.should.be.equals(15)
                    res.body.should.be.descendingBy("price")
                    done()
                })
        })
    })
    describe('The "/sortedDES" route GET function for all ascending sorted artworks in storage', () => {
        it('should be an array', (done) => {
            chai.request(server)
                .get('/artworks/sortedDES')
                .end((err, res) => {
                    res.body.should.be.a('array')
                    done()
                })
        })
        it('should sort all 15 artworks by ascending price successfully', (done) => {
            chai.request(server)
                .get('/artworks/sortedDES')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.length.should.be.equals(15)
                    res.body.should.be.descendingBy("price")
                    done()
                })
        })
    })
    describe('The "/priceRange/:lower/:higher" route GET function for all artworks in a price range', () => {
        const randomLowerRange = Math.floor(Math.random() * 4990) + 243
        const randomHigherRange = Math.floor(Math.random() * 4991) + randomLowerRange
        it('should be an array', (done) => {
            chai.request(server)
                .get(`/artworks/priceRange/${randomLowerRange}/${randomHigherRange}`)
                .end((err, res) => {
                    res.body.should.be.a('array')
                    done()
                })
        })
        it('should find all artworks in price range', (done) => {
            chai.request(server)
                .get(`/artworks/priceRange/${randomLowerRange}/${randomHigherRange}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.forEach(artwork => (artwork.price <= randomHigherRange && artwork.price >= randomLowerRange).should.be.true)
                    done()
                })
        })
    })
    describe('The "/activeStatus/:status" route GET function for all artworks with a certain status', () => {
        const random = Math.floor(Math.random() * 2) + 1
        const status = "sold"
        if (random === 1){
            status = "available"
        }
        it('should be an array', (done) => {
            chai.request(server)
                .get(`/artworks/activeStatus/${status}`)
                .end((err, res) => {
                    res.body.should.be.a('array')
                    done()
                })
        })
        it(`should find all artworks with ${status} status`, (done) => {
            chai.request(server)
                .get(`/artworks/activeStatus/${status}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.forEach(artwork => artwork.status.should.be.equals(status))
                    done()
                })
        })
    })
})
