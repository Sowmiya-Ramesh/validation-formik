import React from 'react';
import ProductList from "./ProductList.js";
import { Navbar, Nav, NavItem, NavbarBrand, Container} from "reactstrap";
import { Link } from "react-router-dom";


function Home() {
    return (
        <div>
            <h1 style={{  textAlign :"center", backgroundColor:"black" , color:"whitesmoke", padding:"20px"}}>CAR BOSS</h1>
            <Navbar color="dark">
                <Container>
                    <NavbarBrand href="/">Home</NavbarBrand>
                    <Nav>
                        <NavItem>
                            <Link className="btn btn-primary" to="/add" > AddProduct</Link>
                            {/* <Link className="btn btn-primary" to="/edit/:id"> EditProduct</Link> */}
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>

            <br/> <br/>
            <ProductList />
        </div>
    )
}

export default Home;

