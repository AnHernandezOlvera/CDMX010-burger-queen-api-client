import React from 'react'
import Header from '../../components/header/header'
import './new-order.css'
import Products from '../../components/products/products'

const NewOrder = () => {
    // const [menus, setMenu] = React.useState()
    // React.useEffect(() => {
    //     //console.log('useEffect')
    //     getMenu()
    // },[])
    // const getMenu = async () => {
    //     const data = await fetch('https://api.sheety.co/7d28747999f75b5a4eef909ac5bef343/menu/products')
    //     const products = await data.json()
    //     console.log(products)
    //     setMenu(products)
    // }
    

    return (
        <div>
            <Header />
            <div className='grid'>
                <div id='clientName'>
                    <label className='yellow'>Nombre: </label>
                    <input type="text" id='name'/>
                </div>
                <button className='buttonSmall bgYellow black'>MENÚ DESAYUNO</button>
                <button className='buttonSmall bgYellow black'>MENÚ GENERAL</button>
                <div className='date'>
                    <p className='yellow'>Fecha: 
                        <span> xx/xx/xx</span>
                    </p>
                </div>
                <div className='hour'>
                    <p className='yellow'>Hora: 
                        <span> xx:xx</span>
                    </p>
                </div>

                <div className='menu'>
                    <p className='title-table bgYellow black'></p>
                    <div className='table-container'>
                    <ul className='products-list bgWhite black'>
                      <Products/>    
                    </ul>
                    </div>        
                </div>

                <div className='final-order'>
                    <p className='title-table bgGreen white'>MENU DESAYUNO</p>
                </div>

            </div>
        </div>
    )
}

export default NewOrder