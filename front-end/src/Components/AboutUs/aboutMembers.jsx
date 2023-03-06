import React from 'react'
import './aboutMembers.css'
import {FaLinkedin, FaGithubSquare} from 'react-icons/fa'
import {CgWebsite} from 'react-icons/cg'
import Anh from '../../Assets/MemberPics/Anh.jpg'
import Amy from '../../Assets/MemberPics/Amy.jpeg'
import Chloe from '../../Assets/MemberPics/Chloe.jpg'
import Steven from '../../Assets/MemberPics/Steven.jpg'

const aboutMembers = () => {
  return (
    <div className="container aboutMembers__container">
      <h2 className='titleMembers'>About The Team</h2>
      <div className="members">
        
        {/* ANH */}
        <article className="memberProfile">
          <div className="memberImage">
            <img className='memberPic' src={Anh} alt="" />
          </div>
          <div className="memberInfo">
            <h3 className='memberName'>Anh</h3>
            <h5 className="memberDescription">NYU CAS • CS • Senior</h5>
            <div className="memberSocials">
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/anhtrr/" target="_blank"><FaLinkedin/></a>
              {/* Github */}
              <a href="https://github.com/Anhtrr" target="_blank"><FaGithubSquare/></a>
              {/* Website */}
              <a href="http://anhtrr.com/" target="_blank"><CgWebsite/></a>
            </div>
          </div>
        </article>

        {/* CHLOE */}
        <article className="memberProfile">
          <div className="memberImage">
            <img className='memberPic' src={Chloe} alt="" />
          </div>
          <div className="memberInfo">
            <h3 className='memberName'>Chloe</h3>
            <h5 className="memberDescription">NYU {/* School */} • {/* Major */} • {/* Year */}</h5>
            <div className="memberSocials">
              {/* LinkedIn */}
              <a href="" target="_blank"><FaLinkedin/></a>
              {/* Github */}
              <a href="" target="_blank"><FaGithubSquare/></a>
              {/* Website */}
              <a href="" target="_blank"><CgWebsite/></a>
            </div>
          </div>
        </article>

        {/* STEVEN */}
        <article className="memberProfile">
          <div className="memberImage">
            <img className='memberPic' src={Steven} alt="" />
          </div>
          <div className="memberInfo">
            <h3 className='memberName'>Steven</h3>
            <h5 className="memberDescription">NYU CAS • Math & CS • Senior</h5>
            <div className="memberSocials">
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/zihan-zhang-8295161a2/" target="_blank"><FaLinkedin/></a>
              {/* Github */}
              <a href="https://github.com/StevenZhang0116" target="_blank"><FaGithubSquare/></a>
              {/* Website */}
              <a href="https://stevenzhang0116.wordpress.com/" target="_blank"><CgWebsite/></a>
            </div>
          </div>
        </article>

        {/* AMY */}
        <article className="memberProfile">
          <div className="memberImage">
            <img className='memberPic' src={Amy} alt="" />
          </div>
          <div className="memberInfo">
            <h3 className='memberName'>Amy</h3>
            <h5 className="memberDescription">NYU Stern • Finance & Marketing • Senior</h5>
            <div className="memberSocials">
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/amy-yue-570b34122/" target="_blank"><FaLinkedin/></a>
              {/* Github */}
              <a href="https://github.com/ay1534" target="_blank"><FaGithubSquare/></a>
              {/* Website */}
              <a href="https://misscookycake.weebly.com/" target="_blank"><CgWebsite/></a>
            </div>
          </div>
        </article>

      </div>
    </div>
  )
}

export default aboutMembers