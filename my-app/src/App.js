import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import WaiterBoard from './pages/WaiterBoard/WaiterBoard';
import OrdersToDeliver from './pages/OrdersToDeliver/OrdersToDeliver';
import NewOrder from './pages/NewOrder/NewOrder';
import Login from './pages/Login/Login';

import './style/App.css';

function App() {

  const [cart, setCart] = useState({
    client:'',
    hora:'',
    items:[],
    status:'pendiente',
    total:0
  });

  const updateNewOrder = (name, totalValue, orderItems) => {
    setCart({
      ...cart,
      client: name,
      total: totalValue,
      items: orderItems,
    });
};

const handlePostNewOrder = () => {
  let url = 'http://localhost:8000/orders';
  let body = JSON.stringify(cart);
  console.log(body);
  return fetch(url, {    
    body,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path='/WaiterBoard'>
          <WaiterBoard />
        </Route>

        <Route path='/NewOrder'>
          <NewOrder cart={cart} callback={updateNewOrder} handlePostNewOrder = {handlePostNewOrder} />
        </Route>

        <Route path='/OrdersToDeliver'>
          <OrdersToDeliver />
        </Route>

        <Route path='/'>
          <Login />
        </Route>

      </Switch>
      </div>
    </Router>
  );
};

export default App;
