import React from 'react'
import './CHPcategories.css'

 
const Lists = () => {
    return (
    <div>
        <div>
            <h2> 
                <div className='button'> Category Name</div>
                {/* add link to category page */}
            </h2>
        </div>
        <ul className='images'>
            <li><img src="https://picsum.photos/200/300" alt="alternatetext"/></li>
            <li><img src="https://picsum.photos/200/300" alt="alternatetext"/></li>
            <li><img src="https://picsum.photos/200/300" alt="alternatetext"/></li>
            <li><img src="https://picsum.photos/200/300" alt="alternatetext"/></li>
            <li><img src="https://picsum.photos/200/300" alt="alternatetext"/></li>
            <li><img src="https://picsum.photos/200/300" alt="alternatetext"/>e</li>
            <li><img src="https://picsum.photos/200/300" alt="alternatetext"/></li>
        </ul>
    </div>
    );
}

const Categories = () => {
    return(
        <div>
             <div className='search'>Search Bar</div>
            <div className='banner'>
                <h1>Check out our editors pick in every category!</h1>
            </div>
            <Lists/>
            <Lists/>
            <Lists/>
            <Lists/>
        </div>
    );
}

export default Categories