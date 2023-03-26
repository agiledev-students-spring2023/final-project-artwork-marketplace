import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import './profileSub.css'

const ProfileSub = props => {
    return(
        <div className='profileContainer'>
            <h3 className='addartplace'>
                Profile Page
            </h3>
            <img className='profile_featuredpic' src="https://thumbs.dreamstime.com/z/transparent-designer-must-have-fake-background-39672616.jpg" />
            
        </div>
    )

}

export default ProfileSub

