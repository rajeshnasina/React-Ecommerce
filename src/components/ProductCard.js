import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PriceTag from "./PriceTag";
import BtnIcon from "./BtnIcon";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {add,remove} from '../reducers/Wishlist'
//import Wishlist from "../reducers/Wishlist";
import { useDispatch } from "react-redux"; 
function ProductCard(props) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(props.item.selected);
  const [verify, setVerify] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  const [isAdmin,setIsAdmin] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      const decoded = jwt_decode(token);
      console.log(decoded)
      if(decoded.role === "administrator") {
        setIsAdmin(true)
      } 
      else {
        setIsAdmin(false)
      }
      
    }
  },[])
  function onFavClick() {
    // alert("FavClick");
    setSelected(!selected);
    let selectedProducts = localStorage.getItem("selectedProducts");
    if (!selectedProducts) {
      selectedProducts = [];
    } else {
      selectedProducts = JSON.parse(selectedProducts);
    }
    const id = props.item._id;
    const index = selectedProducts.indexOf(id);
    if (index == -1) {
      selectedProducts.push(props.item._id);
       dispatch(add(selectedProducts))
    } else {
      selectedProducts.splice(index, 1);
       dispatch(remove(selectedProducts))
    }

    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    setTimeout(() => {
      console.log(localStorage.getItem("selectedProducts"));
    }, 1000);
  }
  function onCheckoutClick(productId) {
    alert(productId);
  }
  function onEdit(productId) {
    navigate("product/" + productId);
  }
  // function formatPrice(price) {
  //   return parseFloat(price).toFixed(2)
  // }
  function onDelete(productId) {
    // const verify = window.confirm("Are you sure you want to delete");
    setVerify(true)
    setDeleteId(productId)
    
  }
  function onVerifyClose(result){
    if(!result){
      setVerify(false)
      
      return
    }
    axios.delete("http://localhost:3000/products/" + deleteId, {
      headers:{
        Authorization: "Bearer" + localStorage.getItem("token")
      }
    })
    .then((res) => {
      setVerify(false)
      // window.location.reload()
      props.reload()
    })
    .catch((err) => {

    })
    
  }
  return (
    <>
      <Card>
        <Card.Img variant="top" src={props.item.image} />
        <Card.Body>
          <Card.Title>{props.item.title}</Card.Title>
          <Card.Text>{props.item.description}</Card.Text>
          <PriceTag price={props.item.price} />
          <div
            className="btn-group w-100"
            role="group"
            aria-label="Basic example"
          >
            <BtnIcon
              icon="shopping_cart_checkout"
              onClick={() => onCheckoutClick(props.item._id)}
            />
            {selected ? (
              <BtnIcon icon="favorite" onClick={onFavClick} />
            ) : (
              <BtnIcon icon="favorite_border" onClick={onFavClick} />
            )}

            <BtnIcon icon="scompare_arrows" />
          </div>
          {isAdmin ?
            <div className="btn-group w-100">
              <BtnIcon icon="edit"  onClick={() => onEdit(props.item._id)}/>
              <BtnIcon icon="delete" onClick={() => onDelete(props.item._id)}/>
            </div>
          : ''}
        </Card.Body>
      </Card>
      {verify ? <ConfirmModal onClose={onVerifyClose}/> : ""}
      
    </>
  );
}

export default ProductCard;
