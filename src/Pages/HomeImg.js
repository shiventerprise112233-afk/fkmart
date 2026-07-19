import React from 'react'
import { Link } from 'react-router-dom'
import Home from "../Assets/Images/home.png"

const HomeImg = () => {
    return (
        <div>
            <Link to="/" >
                <img src={Home} alt='' className='w-full' />
            </Link>
        </div>
    )
}

export default HomeImg