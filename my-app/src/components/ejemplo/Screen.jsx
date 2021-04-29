import React from 'react'
import Header from '../../components/header/header'
import Products from '../products/Breakfast';
import Button from './Button';
const Screen = () => {
    return (
        <div>
            <Header />
            <Button>MENÚ DESAYUNO</Button>

            <Button
                onClick ={() => {
                    console.log('click');
                    <ul className='products-list bgWhite black'>
                      <Products/>    
                    </ul>
                }}
                buttonStyle='bgGreen'
            >
                MENÚ GENERAL
            </Button>
            <div>Contenido 1</div>
            <div>Contenido 2</div>
        </div>
    )
}

export default Screen
