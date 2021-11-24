
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { CartProvider } from './CartContext';
//-------Components------------
import FirstNavbar from './Components/NavigationComponents/FirstNavbar/FirstNavBar';
import Home from './Components/views/home/Home';
import Cart from './Components/views/cart/Cart';
import ItemDetail from './Components/views/itemDetail/ItemDetail';
import Admin from './Components/views/admin/Admin';
import Footer from './Components/footer/Footer';
import ErrorPage from './Components/errorPage/ErrorPage';
import BuyForm from './Components/CartComponents/buyForm/BuyForm';

const App= ()=> {

  
    return (
      <Router >
          <div className="App">
          <CartProvider>  
            <FirstNavbar />
                <Switch >
                  <Route path='/' exact component={Home}/>
                  <Route path='/home' exact component={Home}/>
                  <Route path='/cart' exact component={Cart}/>
                  <Route path='/article/:id' exact component={ItemDetail}/>
                  <Route path='/admin' exact component={Admin}/>
                  <Route path='/cart/form' exact component={BuyForm}/>
                  <Route path='/*' exact component={ErrorPage}/>
                </Switch>
            <Footer/>    
          </CartProvider>
          </div>
      </Router>
    )
}
export default App;

