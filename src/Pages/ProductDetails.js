import React, { useEffect, useState } from 'react'
import ProductImageSlider from '../Components/ProductImageSlider';
import Data from '../Data'
import { useParams } from 'react-router-dom';
import ProductInfo from '../Components/ProductInfo';
import Review1 from "../Assets/Images/review_1.jpg"
import Review2 from "../Assets/Images/review_2.jpg"
import Review3 from "../Assets/Images/review_3.jpg"
import Review4 from "../Assets/Images/review_4.jpg"
import StickyBottomBar from '../Components/StickyBottomBar';

const ProductDetails = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (!id) return;
        window.scroll(0,0)

        const selectedProduct = Data.find(
            (item) => item.id === Number(id)
        );

        setProduct(selectedProduct || null);
    }, [id]);

    if (!product) {
        return <div>Product not found.</div>;
    }
    return (
        <div>
            <div className='px-4'><ProductImageSlider images={product.images} /></div>
            <ProductInfo product={product} />
            <div className='px-4'>
                <img src={Review1} alt='' className='w-full' />
                <img src={Review2} alt='' className='w-full' />
                <img src={Review3} alt='' className='w-full' />
                <img src={Review4} alt='' className='w-full' />
            </div>
            <StickyBottomBar product={product}/>
        </div>
    )
}

export default ProductDetails