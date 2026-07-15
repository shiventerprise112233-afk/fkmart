import './App.css';
import Header from './Components/Header';
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import Address from './Pages/Address';
import OrderSummary from './Pages/OrderSummary';
import Payment from './Pages/Payment';

function App() {
  
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/product-details/:id" element={<ProductDetails/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/address" element={<Address/>} />
      <Route path="/order-summary" element={<OrderSummary/>} />
      <Route path="/payment" element={<Payment/>} />

    </Routes>
    </>
  );
}

export default App;
