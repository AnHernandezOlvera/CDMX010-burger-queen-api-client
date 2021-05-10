import React,{useState, useEffect} from 'react';

import Header from '../../components/Header/Header';
import BreakfastMenu from '../../components/Products/Breakfast';
import GeneralMenu from '../../components/Products/GeneralMenu';
import DateOrder from '../../components/Date/DateOrder';
import Hour from '../../components/Date/Hour';

import './NewOrder.css';

const NewOrder = ({callback}) => {
  
    const [desayuno,setDesayuno] = useState(true);
    // const [order, setOrder] = useState([]); // items
    // const [totalPrice, setTotalPrice] = useState(0); // precio
    // const [newClient, setNewClient] = useState('');// Nombre del cliente
    const [cart, setCart] = useState({
        client:'',
        hora:'',
        items:[],
        status:'pendiente',
        total:0,
      });

    const handleSetComida = () => setDesayuno(false);
    const handleSetDesayuno = () => setDesayuno(true);
    const handleUpdateNewClient = e => setCart({
        ...cart,
        client: e.target.value,
    });
   

    // useEffect(() => {
    //     const handleTotal = () => {
    //         let value = 0;
    //         const items = cart.items;
    //         console.log(items, 'hola');
    //         items.map((product)=> {
    //             console.log(product, 'hola');
    //             value = value + (parseInt(product.totalPrice));
    //             return value;
    //         });
    //         setCart({
    //             ...cart, total: value
    //         });
    //     };
    //     handleTotal();
    // },[]);
    // useEffect(() => {
    //     const handleTotal = () => {
    //         let value = 0;
    //         console.log(cart.items);
    //     }
    //     handleTotal();
    // },[])

  
    const handleRemoveProduct = (id, totalPrice, price ) => {
        if (totalPrice === price) {
            console.log('producto eliminado');
            const newArrayProducts = cart.items.filter((product) =>
            product.id !== id
        )
        setCart({...cart, items: newArrayProducts, total:cart.total-parseInt(price)})
        } else {
            const remove = cart.items.map((product) => {
                if(product.id === id) {
                    return {
                        ...product,
                        totalPrice: parseInt(totalPrice) - parseInt(price),
                    };
                };
                return product;              
            });
            setCart({...cart, items: remove, total:cart.total-parseInt(price)});
        };
    };

    const handleUpdatePrice = (id, price) => {
        const items = cart.items;
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
        setCart({
            ...cart,
            items: updateProduct,
            total: cart.total += parseInt(price)
         });
    };

    const addProductOrder = (product => {
        const items =cart.items;
        if(!items.find(p => product.name === p.name)) {
            setCart({
                ...cart,
                items: [...items, {name: product.name, id: product.id, totalPrice: parseInt(product.totalPrice), price: parseInt(product.price)}],
                total: cart.total+= parseInt(product.totalPrice)
            }) 
        } else if(items.find(p => product.name === p.name)) {      
            handleUpdatePrice(product.id, product.price);
        };        
    });

    
    const handleUpdateOrder = (parametro) => {
        callback(parametro);
        
        let data = {
            client: cart.client,
            hora: cart.hora,
            items:cart.items,
            status:'pendiente',
            total:cart.total,
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
        setCart([]);  
    };

    return (
        <div>
            <Header />
            <div className='grid'>
                <div id='clientName'>
                    <label className='yellow'>Nombre: </label>
                    <input type="text" id='name' onChange={handleUpdateNewClient} />
                </div>
                <button className='buttonSmall bgYellow black' onClick={handleSetDesayuno}>MENÚ DESAYUNO</button>
                <button className='buttonSmall bgYellow black' onClick={handleSetComida}>MENÚ GENERAL</button>
                <div className='date'>
                    <p className='yellow'>Fecha: <DateOrder/></p>                   
                </div>
                <div className='hour'>
                    <p className='yellow'>Hora: <Hour/></p>
                </div>
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
                        {!cart.items ? 'sin orden': cart.items.map( product => (
                            <div key={product.id}>
                                <p key={product.id}>{product.name} {product.totalPrice}
                                    <button className='rest bgRed white' onClick={()=>handleRemoveProduct(product.id, product.totalPrice, product.price)} >-</button>
                                </p>
                            </div>
                        ))}
                    </div>
                    <h1>{!cart.items ? '0' : cart.total}</h1>
                    <button onClick={()=>handleUpdateOrder(cart)}>Enviar</button>
                </div>
            </div>
        </div>
    );
};

export default NewOrder;