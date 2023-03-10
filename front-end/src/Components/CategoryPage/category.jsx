import React from 'react'
import './category.css' 
import Logo from '../../Assets/Pictures/logo-placeholder.jpeg' 

const Card = () => {
    return(
            <div className='category_card'>
                <img className ='category_logop' src={Logo} alt=''/>
                <h2 className='category_name'>Product Name</h2>
                <h3 className='category_price'>$Price.99</h3>
                <h4 className= 'category_text'> Product info</h4>
                <section className = 'category_profP'></section>
            </div>
    );
}

const Lists = () => {

    return (

    <div>
        <ul className='category_container'>
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
            <div className='category_search'>Search Bar</div>
            <div className='category_categoryHeader'>
                <div className='category_categoryHeaderText'>Category Name</div>
            </div>
            <Lists/>
        </div>
    );
}

export default Categories