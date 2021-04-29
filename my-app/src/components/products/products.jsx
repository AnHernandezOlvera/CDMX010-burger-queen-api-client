import React from 'react';
import './products.css'

const Products = () => {
    const [products, setProducts] = React.useState()
    React.useEffect(() => {
        //console.log('useEffect')
        getProducts()
    },[])
    const getProducts = async () => {
        const data = await fetch('https://api.sheety.co/7d28747999f75b5a4eef909ac5bef343/menu/products')
        const product = await data.json()
        console.log(product)
        setProducts(product)
    }
    
    return (
        <div>
            <h1>hola</h1>
            <ul className='products-list bgWhite black'>
                { !products ? 'Sin datos' :
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
 
export default Products;