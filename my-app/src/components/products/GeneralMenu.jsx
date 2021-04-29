import React from 'react';
import './products.css'

const GeneralMenu = () => {
    const [products, setProducts] = React.useState()
    React.useEffect(() => {
        //console.log('useEffect')
        getProducts()
    },[])
    const getProducts = async () => {
        const data = await fetch('https://api.sheety.co/7d28747999f75b5a4eef909ac5bef343/menu/products?filter[type]=menú general')
        const product = await data.json()
        console.log(product)
        setProducts(product)
    }
    
    return (
        <div>
            
            <ul className='products-list bgWhite black'>
                { products&&
                products.products.map((item) => (
                    <li key={item.id} className='product-container'>
                        <span className='text-black'>{item.name}</span>
                        <span className='text-black'>{item.price}</span>
                        <button className=' add bgGreen white'>+</button>
                    </li>
                ))
                }             
            </ul>
        </div>         
    );
}
 
export default GeneralMenu;