import React,{ useState, useEffect } from 'react'
import Header from '../../components/header/header'
import './new-order.css'
import BreakfastMenu from '../../components/products/Breakfast';
import GeneralMenu from '../../components/products/GeneralMenu';
import { Menu } from '../../components/menu/Menu';

const NewOrder = () => {
    
    const [desayuno,setDesayuno]=useState(true);
    const [general, setGeneral] = useState(true)
    const [breakfastMenu, setBreakfastMenu] = useState([]);
    const [generalMenu, setGeneralMenu] = useState([]);
 

    const handleSetComida=()=>setGeneral(false)
    const handleSetDesayuno=()=>setDesayuno(true)
    //Estado de ordenes
    const [order, setOrder] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async() => {
        const data = await fetch('https://api.sheety.co/7d28747999f75b5a4eef909ac5bef343/menu/products?filter[type]=desayuno')
        const product = await data.json()
            setBreakfastMenu(product);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const data = await fetch('https://api.sheety.co/7d28747999f75b5a4eef909ac5bef343/menu/products?filter[type]=menú general')
        const product = await data.json()
        setGeneralMenu(product)
    })

    
    const handleUpdateRemove = (id)=> {
        const updateRemove = order.filter((product) => product.id !== id)
        setOrder(updateRemove)
    }
    
    // const handleUpdateRemove = (id, price)=> {
    //     const updateRemove = order.filter((product) => {
    //         if(product.id !==id){
    //             return {
    //                 ...product,
    //                 price: (product.price) - (price),
    //             }
    //         }
        
    //     })
    //     setOrder(updateRemove)
    // }

    const handleUpdatePrice = (id, price) => {
        const updateProduct = order.map((product) => {
            if(product.id === id){
                return {
                    ...product,
                    price: (product.price) + (price),
                }
            }
            return product;
        });
        setOrder(updateProduct);
    }

    const addProductOrder = (product => {
        if(!order.find(p => product.name === p.name)) {
            setOrder([...order, {name: product.name, id: product.id, price: parseInt(product.price)}]) 
        } else if(order.find(p => product.name === p.name)) {   
            handleUpdatePrice(product.id, parseInt(product.price) );
        }
            
    });

    React.useEffect(() => {
        //console.log('useEffect')
        handleTotal()
    })
    const handleTotal = () => {
        let value = 0;
        order.map((product)=> {
            value = value + (parseInt(product.price));
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
                        {desayuno &&
                            <Menu desayuno={desayuno} breakfastMenu={breakfastMenu} generalMenu={generalMenu}/>
                        } 
                       
                    </ul>
                    </div>        
                </div>

                <div className='final-order'>
                    <p className='title-table bgGreen white'>ORDEN FINAL</p>
                    <div >
                    {!order ? 'sin orden': order.map( product => (
                        <div key={product.id}>
                            <p >{product.name} {product.price}
                            <button className='rest bgRed white' onClick={()=>handleUpdateRemove(product.id)} >-</button>
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

export default NewOrder