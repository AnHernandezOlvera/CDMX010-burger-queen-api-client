/* eslint-disable no-sequences */
import React, {useState} from 'react';
import './products.css'

const BreakfastMenu = (props) => {

    const [products, setProducts] = React.useState()
    // const [numero, setNumero] = useState(0);
    
 

    React.useEffect(() => {
        //console.log('useEffect')
        getProducts()
    },[])
    const getProducts = async () => {
        const data = await fetch('https://api.sheety.co/28fe1198d1c3666324ccbedbaff1aa61/menu/products?filter[type]=desayuno')
        const product = await data.json()
        console.log(product)
        setProducts(product)
    }
   
    const addProductOrder = (e) => {
        props.callback({name: e.target.name, id: e.target.id, totalPrice: e.target.dataset.price, price: e.target.dataset.price})
        // console.log('me diste un clic', {numero});
        // setNumero(numero + 1);
    }
   
    return (
        <div>
            
            <ul className='products-list bgWhite black'>
                { products&&
                products.products.map((item) => (
                    <li key={item.id} className='product-container'>
                        <span className='text-black'>{item.name}</span>
                        <span className='text-black'>{item.price}</span>
                        <button className=' add bgGreen white'onClick={addProductOrder} id ={item.id} name={item.name} data-price={item.price}>+</button>
                    </li>
                ))
                }             
            </ul>
        </div>         
    );
} 
export default BreakfastMenu;
