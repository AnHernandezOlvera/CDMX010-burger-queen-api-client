import React,{useState} from 'react'
import Header from '../../components/header/header'
import './new-order.css'
import BreakfastMenu from '../../components/products/Breakfast';
import GeneralMenu from '../../components/products/GeneralMenu';

const NewOrder = () => {
    
    const [desayuno,setDesayuno]=useState(true)

    const handleSetComida=()=>setDesayuno(false)
    const handleSetDesayuno=()=>setDesayuno(true)

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
                        <span>Producto</span>
                        <span>Precio</span>
                      {desayuno?<BreakfastMenu/>:<GeneralMenu/>}  
                       
                    </ul>
                    </div>        
                </div>

                <div className='final-order'>
                    <p className='title-table bgGreen white'>ORDEN FINAL</p>
                </div>

            </div>
        </div>
    )
}

export default NewOrder