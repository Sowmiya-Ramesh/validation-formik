import React,{ useEffect}from "react";
import './App.css';
import Home from "./Home.js";
import EditProduct from "./EditProduct.js";
import AddProduct from "./AddProduct.js";
import { BrowserRouter as Router, Switch , Route, Link} from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
 
  function getProduct(){
    fetch("https://60fcdb7a1fa9e90017c70cd7.mockapi.io/product",{ method: "GET"})
    .then((data) => data.json())
   
    .then((data) => console.log(data))
  }
  useEffect(() => {
    getProduct();
  }, []); 

  return (
    <div className="App">
      <header className="App-header">
  
        <Router>
          <Switch>
          <Route exact path="/" component={ Home } />
        <Route path="/edit/:id" component={ EditProduct } />
        <Route path="/add" component={ AddProduct } />
          </Switch>
        </Router>
        
      </header>
    </div>
  );
}

export default App;
