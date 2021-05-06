import React, { useState, useEffect } from 'react';

import Header from '../../components/header/header';
import BreakfastMenu from '../../components/products/Breakfast';
import GeneralMenu from '../../components/products/GeneralMenu';
import DateOrder from '../../components/Date/Date'
import Hour from '../../components/Date/Hour'

import './new-order.css';

const NewOrder = ({products}) => {
    const [products, setProducts] = React.useState()
    const [desayuno,setDesayuno] =useState(true);
    const [order, setOrder] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const handleSetComida = () => setDesayuno(false);
    const handleSetDesayuno = () => setDesayuno(true);
    //Estado de ordenes
  
    const handleRemoveProduct = (id, totalPrice, price )=> {
        if (totalPrice === price) {
            console.log('producto eliminado');
            const newArrayProducts = order.filter((product) =>
            product.id !== id
           
        )
        setOrder(newArrayProducts)
        } else {
            const remove = order.map((product) => {
                if(product.id === id){
                    return {
                        ...product,
                        totalPrice: parseInt(totalPrice) - parseInt(price),
                        
                    }
                }
                return product
                
            });
            setOrder(remove)
        }
    }


    const handleUpdatePrice = (id, price) => {
        const updateProduct = order.map((product) => {
            if(product.id === id){
                return {
                    ...product,
                    totalPrice: parseInt(product.totalPrice) + parseInt(price),
                }
            }
            return product;
        });
        setOrder(updateProduct);
    }

    const addProductOrder = (product => {
        if(!order.find(p => product.name === p.name)) {
            setOrder([...order, {name: product.name, id: product.id, totalPrice: parseInt(product.totalPrice), price: parseInt(product.price)}]) 
        } else if(order.find(p => product.name === p.name)) {   
            handleUpdatePrice(product.id, product.price );
        }
            
    });

    const getProducts = async () => {
        
        const data = await fetch('https://api.sheety.co/7efa937ced91610a35836cac784d90fd/menu/products?filter[type]=desayuno')
        
        const product = await data.json()
        console.log('product', product)
        setProducts(product)
    }
    
    useEffect(() => {
        //console.log('useEffect')
        handleTotal();
        getProducts()
    });

    useEffect(() => {
        getProducts()
    });

    const handleTotal = () => {
        let value = 0;
        order.map((product)=> {
            value = value + (parseInt(product.totalPrice));
            return value
        })
        setTotalPrice(value);
    }
    
    return (
        <div>
            <Header />
            <div className='grid'>
                <div id='clientName'>
                    <label className='yellow'>Nombre: </label>
                    <input type="text" id='name'/>
                </div>
                <button className='buttonSmall bgYellow black' onClick={handleSetDesayuno}>MENÚ DESAYUNO</button>
                <button className='buttonSmall bgYellow black' onClick={handleSetComida}>MENÚ GENERAL</button>
                <div className='date'>
                    <p className='yellow'>Fecha: 
                        <DateOrder/>
                    </p>
                </div>
                <div className='hour'>
                    <p className='yellow'>Hora:<Hour/></p>
                </div>

                <div className='menu'>
                    <p className='title-table bgYellow black'></p>
                    <div className='table-container'>
        
                    <ul className='products-list bgWhite black'>
                        <span>Producto</span>
                        <span>Precio</span>
                      {desayuno?<BreakfastMenu callback={addProductOrder} products={products}/>:<GeneralMenu callback={addProductOrder}/>} 
                       
                    </ul>
                    </div>        
                </div>

                <div className='final-order'>
                    <p className='title-table bgGreen white'>ORDEN FINAL</p>
                    <div >
                    {!order ? 'sin orden': order.map( product => (

                        <div key={product.id}>
                            <p >{product.name} {product.totalPrice}
                            <button className='rest bgRed white' onClick={()=>handleRemoveProduct(product.id, product.totalPrice, product.price)} >-</button>
                            </p>
                            
                        </div>
                    ))}
                    </div>
                    <h1>{!order ? '0' : totalPrice}</h1>
                </div>

            </div>
        </div>
    )
}

export default NewOrder;