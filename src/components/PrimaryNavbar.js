import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Brand from './Brand';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PrimaryNavbar() {
  const [selected, setSelected] = useState(0)
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist.value);
  useEffect(() => {
    setInterval(() => {
      //console.log("I am executed on every one second")
      //console.log(wishlist)
      let selectedProducts = localStorage.getItem("selectedProducts");
      if (!selectedProducts){
        selectedProducts = []
      } else {
        selectedProducts = JSON.parse(selectedProducts);
      }
      //console.log(selectedProducts.length)
      setSelected(selectedProducts.length)
    },1000)
  }, [])
  function onLogout(){
    localStorage.removeItem("token");
    navigate("/")
  }
    return (
      <>
        <Navbar bg="light" expand="lg">
      <Container>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Brand/>
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link className='position-relative' href="#link">Wishlist 
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishlist?.length}
              </span>
            </Nav.Link>
            <Nav.Link href="/product">Product</Nav.Link>
            <Nav.Link onClick={onLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
      </>
    );
  }
  
  export default PrimaryNavbar;
  