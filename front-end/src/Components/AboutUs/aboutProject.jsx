import React from 'react'
import './aboutProject.css'

const aboutProject = () => {
  return (
    <section id='aboutProject'>
      <div className="container aboutProject__container">
        <h2 className='titleProject'>About Artwork Marketplace</h2>
        <div className="aboutProject__items">
          <article className="aboutProject__item">
            <h3 className="subTitle">The Current Issue</h3>
            <p className="content">              
              Most current E-commerce companies reward sellers who have a 
              large pre-existing customer base and who sell their products on 
              a mass scale, such as Etsy. Other artists-oriented platforms, 
              like Jean Lurssen, Amira Rahim, makes it difficult for artists 
              who create art themselves, piece by piece (not en mass), or artists 
              who are just starting out, to get exposure and be successful selling 
              their art in these markets.
            </p>
          </article>
          <article className="aboutProject__item">
            <h3 className="subTitle">Our Solution</h3>
            <p className="content">
              Our project would be the first online trading platform specifically 
              designed for amateur artists to get exposure and feedback from customers.
              So, our product would help juvenile artists to better initiate and 
              progress their early careers. With the added functionality for users 
              to follow and connect with each other, Artwork Marketplace will help users find 
              people with similar interests and seek opportunities for further collaboration.
            </p>
          </article>
          <article className="aboutProject__item">
            <h3 className="subTitle">Functionalities</h3>
            <p className="content">
              Similar to existing ecommerce platforms, users will be able to choose to be 
              artists and/or customers in registration. Artists will be able to add and 
              manage their artwork easily with an individual profile page and featured items. 
              Consumers will be able to view and purchase artworks, while the system will also 
              provide recommendations of "rising stars" and categorizations of arts into 
              various genres. We are also interested in implementing individual messages 
              and public discussions (e.g. forums, comments) in the future.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default aboutProject