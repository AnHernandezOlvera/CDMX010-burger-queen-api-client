import React,{useState, useEffect} from 'react';

import Header from '../../components/Header/Header';
import BreakfastMenu from '../../components/Products/Breakfast';
import GeneralMenu from '../../components/Products/GeneralMenu';
import DateOrder from '../../components/Date/DateOrder';
import Hour from '../../components/Date/Hour';

import './NewOrder.css';

const NewOrder = ({callback}) => {
  
    const [desayuno,setDesayuno] = useState(true);
    const [waiterCart, setWaiterCart] = useState({
        client:'',
        hora:'',
        date:'',
        items:[],
        status:'pendiente',
        total:0,
      });

    const handleSetComida = () => setDesayuno(false);
    const handleSetDesayuno = () => setDesayuno(true);
    const handleUpdateNewClient = e => setWaiterCart({
        ...waiterCart,
        client: e.target.value,
    });
  
    const handleRemoveProduct = (id, totalPrice, price ) => {
        if (totalPrice === price) {
            console.log('producto eliminado');
            const newArrayProducts = waiterCart.items.filter((product) =>
            product.id !== id
        )
        setWaiterCart({...waiterCart, items: newArrayProducts, total:waiterCart.total-parseInt(price)})
        } else {
            const remove = waiterCart.items.map((product) => {
                if(product.id === id) {
                    return {
                        ...product,
                        totalPrice: parseInt(totalPrice) - parseInt(price),
                    };
                };
                return product;              
            });
            setWaiterCart({...waiterCart, items: remove, total:waiterCart.total-parseInt(price)});
        };
    };

    const handleUpdatePrice = (id, price) => {
        const items = waiterCart.items;
        console.log(items);
        const updateProduct = items.map((product) => {
            if(product.id === id) {
                return {
                    ...product, totalPrice: parseInt(product.totalPrice) + parseInt(price), 
                };
            }else{
                console.log('no funciona');
            }
            return product;
        });
        setWaiterCart({
            ...waiterCart,
            items: updateProduct,
            total: waiterCart.total += parseInt(price)
         });
    };

    const addProductOrder = (product => {
        const items =waiterCart.items;
        if(!items.find(p => product.name === p.name)) {
            setWaiterCart({
                ...waiterCart,
                items: [...items, {name: product.name, id: product.id, totalPrice: parseInt(product.totalPrice), price: parseInt(product.price)}],
                total: waiterCart.total+= parseInt(product.totalPrice)
            }) 
        } else if(items.find(p => product.name === p.name)) {      
            handleUpdatePrice(product.id, product.price);
        };        
    });

    
    const handleUpdateOrder = (finalCart) => {
        callback(finalCart);
        let data = {
            client: finalCart.client,
            hora: finalCart.hora,
            date: finalCart.date,
            items:finalCart.items,
            status:'pendiente',
            total:finalCart.total,
        }
        const handlePostNewOrder = () => {
            let url = 'http://localhost:8000/orders';
            let body = JSON.stringify(data);
            return fetch(url, {    
              body,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
            });
          };
         
        handlePostNewOrder();
        setWaiterCart({
        client:'',
        hora:'',
        date:'',
        items:[],
        status:'pendiente',
        total:0,
        })
      
    };
    const handleDate = () => {
        let dateNow='';
        const DateOrder = () => {
            let newDate = new Date();
            let date = newDate.getDate();
            let month = newDate.getMonth()+1;
            let year = newDate.getFullYear();
            dateNow = `${date}/${month}/${year}`
            setWaiterCart({
                ...waiterCart,
                hora: dateNow,
            })
        };
        DateOrder();
        return dateNow;
    };

    const handleHour = () => {
        let timeNow='';
        const hourNow = () => {
            let newDate = new Date();
            let timeHour = newDate.getHours();
            let timeMin = newDate.getMinutes();
            let timeSec = newDate.getSeconds();
            timeNow = ` ${timeHour}:${timeMin}:${timeSec}`;
            setWaiterCart({
                ...waiterCart,
                hora: timeNow,
            })
        };
        hourNow();
        return timeNow;
    };
    const handleClick = async () => {
        const time = await handleHour();
        const date = handleDate();
        const finalCart = {
            ...waiterCart,
            hora: time,
            date: date
        }
        handleUpdateOrder(finalCart);
        
    }



    return (
        <div>
            <Header />
            <div className='grid'>
                <div id='clientName'>
                    <label className='yellow'>Nombre: </label>
                        <input type="text" id='name'  onChange={handleUpdateNewClient} value={waiterCart.client}/>    
                </div>
                <button className='buttonSmall bgYellow black' onClick={handleSetDesayuno}>MENÚ DESAYUNO</button>
                <button className='buttonSmall bgYellow black' onClick={handleSetComida}>MENÚ GENERAL</button>
                <div className='date'>
                    <p className='yellow'>Fecha: <DateOrder/></p>                   
                </div>
                {/* <div className='hour'>
                    <p className='yellow'>Hora: <Hour/></p>
                </div> */}
                {/* MENU TABLE */}
                <div className='menu'>
                    <p className='title-table bgYellow black'></p>
                    <div className='table-container'>
                    <ul className='products-list bgWhite black'>
                        <span>Producto</span>
                        <span>Precio</span>
                        {desayuno?<BreakfastMenu callback={addProductOrder}/>:<GeneralMenu callback={addProductOrder}/>}                      
                    </ul>
                    </div>        
                </div>
                {/* FINAL ORDER TABLE */}
                <div className='final-order'>
                    <p className='title-table bgGreen white'>ORDEN FINAL</p>
                    <div>
                        {!waiterCart.items ? 'sin orden': waiterCart.items.map( product => (
                            <div key={product.id}>
                                <p key={product.id}>{product.name} {product.totalPrice}
                                    <button className='rest bgRed white' onClick={()=>handleRemoveProduct(product.id, product.totalPrice, product.price)} >-</button>
                                </p>
                            </div>
                        ))}
                    </div>
                    <h1>{!waiterCart.items ? '0' : waiterCart.total}</h1>
                    <button onClick={(e)=>handleClick()}>Enviar</button>
                </div>
            </div>
        </div>
    );
};

export default NewOrder;