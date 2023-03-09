import React from 'react'
import './category.css' 
import Logo from '../../Assets/Pictures/logo-placeholder.jpeg' 

const Card = () => {
    return(
            <div className='card'>
                <img className ='logop' src={Logo} alt=''/>
                <h2 className='name'>Product Name</h2>
                <h3 className='price'>$Price.99</h3>
                <h4 className= 'text'> Product info</h4>
                <section className = 'profP'></section>
            </div>
    );
}

const Lists = () => {

    return (

    <div>
        <ul className='container'>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>
            <li><Card/></li>         
        </ul>
    </div>
    );
}

const Categories = () => {
    return(
        <div>
            <div className='search'>Search Bar</div>
            <div className='categoryHeader'>
                <div className='categoryHeaderText'>Category Name</div>
            </div>
            <Lists/>
        </div>
    );
}

export default Categories