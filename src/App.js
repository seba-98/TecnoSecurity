
import React from 'react'
import { Route, Switch, } from 'react-router-dom';
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
      <div className="App">
              <CartProvider>  
                <FirstNavbar/>
                    <Switch >
                      <Route exact path='/'  component={Home}/>
                      <Route exact path='/home'  component={Home}/>
                      <Route exact path='/cart'  component={Cart}/>
                      <Route exact path='/article/:id'  component={ItemDetail}/>
                      <Route exact path='/admin'  component={Admin}/>
                      <Route exact path='/cart/form'  component={BuyForm}/>
                      <Route exact path='/*'  component={ErrorPage}/>
                    </Switch>
                <Footer/>    
              </CartProvider>
          </div>
    )
}
export default App;

