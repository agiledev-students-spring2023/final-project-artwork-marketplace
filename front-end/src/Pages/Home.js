import React from 'react'
import LandingPage from '../Components/Landing/landing'
import CategoryDisplay from '../Components/CustomerHomePage/CategoryDisplay'
import ArtistProducts from '../Components/ArtistHome/ArtistProducts'
import Navbar from '../Components/Navbar/Navbar'
import Settings from '../Components/Settings/Settings'
import { motion } from 'framer-motion'

const Home = props => {
  return (
    <div>
      {!props.user.user &&(
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 1}}
        key={"LandingPage"}
        >
          <LandingPage user={props.user} />
        </motion.div>
      )}
      {props.user.user &&(
        <>
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1.5}}
            key={"HomeSettings"}
          >
            <Settings user={props.user} setuser={props.setuser} />
          </motion.div>
          <motion.div
            initial={{opacity: 0, y: '100%'}}
            animate={{opacity: 1, y: '0%'}}
            exit={{opacity: 0, y: '100%'}}
            transition={{duration: 1}}
            key={"HomePage"}
          >
            {props.user.user === "Customer" && (
                <CategoryDisplay user={props.user} />
            )}
            {props.user.user === "Artist" && (
                <ArtistProducts user={props.user} />
            )}
          </motion.div>
          <Navbar user={props.user} />
        </>
      )}  
    </div>
  )
}

export default Home