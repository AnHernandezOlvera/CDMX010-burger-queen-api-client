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
    date:'',
    items:[],
    status:'pendiente',
    total:0
  });

  const updateNewOrder = (finalCart) => {
    setCart({
      ...cart,
      hora: finalCart.hora,
      date: finalCart.date,
      client: finalCart.client,
      total: finalCart.total,
      items: finalCart.items,
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
          <NewOrder cart={cart} callback={updateNewOrder} />
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
