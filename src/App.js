import React from 'react';
import './App.css';
import ProductsList from './components/ProductsList/ProductsList'

const App = () => {
  return (
    <div className="App">
      <header className='header' >
        <div className="logo">My Store</div>
      </header>
      <ProductsList />
    </div>
  );
}

export default App;
