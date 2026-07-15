import React from 'react'
import CategorySlider from '../Components/CategorySlider'
import Bn from "../Assets/Images/bn1.jpg"
import DealsSection from '../Components/DealsSection'
import ProductGrid from '../Components/ProductGrid'

const Home = () => {
  return (
    <div>
        <CategorySlider/>
        <div className="">
            <img src={Bn} alt='' className='h-full' />
        </div>
        <DealsSection/>
        <ProductGrid />
    </div>
  )
}

export default Home