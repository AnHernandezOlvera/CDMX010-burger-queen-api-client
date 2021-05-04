import React from 'react';

const Menu = ({breakfast, menuBreakfast, generalMenu}) => {
    return (
        <div>
            <ul className='products-list bgWhite black'>
                { 
                    (breakfast ? menuBreakfast : generalMenu).map((item) => (
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
};

export default Menu;