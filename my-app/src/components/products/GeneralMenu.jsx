import React, {useState, useEffect} from 'react';

import './Products.css';

const GeneralMenu = (props) => {
    const [products, setProducts] = useState();

    useEffect(() => {
        getProducts();
    },[]);

    const getProducts = async () => {
        const data = await fetch('http://localhost:8000/products?type=menú general');
        const product = await data.json();
        setProducts(product);
    }

    const addProductOrder = (e) => {
        props.callback({name: e.target.name, id: e.target.id, totalPrice: e.target.dataset.price, price: e.target.dataset.price});
    }
    
    return (
        <div>  
            <ul className='products-list bgWhite black'>
                { products&&
                products.map((item) => (
                    <li key={item.id} className='product-container'>
                        <span className='text-black'>{item.name}</span>
                        <span className='text-black'>{item.price}</span>
                        <button className=' add bgGreen white'onClick={addProductOrder} id ={item.id} name={item.name} data-price={item.price}>+</button>
                    </li>
                ))
                };            
            </ul>
        </div>         
    );
}
 
export default GeneralMenu;