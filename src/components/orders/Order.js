import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function Order({ order,setOrders }) {
  let navigate = useNavigate();

  function deleteRecord() {
    axios
      .delete(`http://localhost:3500/user/${order._id}`)
      .then((res) => navigate("/home"))
      .catch((err) => {
        console.log(err);
      });
  }
  function handleEdit(event) {
    //TO DO:
  }

  async function updateStatus(status, id) {
   try{
    await axios.put(`http://localhost:3500/orders/statusUpdate/${id}`, {status})

    axios
      .get("http://localhost:3500/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));


  }catch(err){
    console.log(err);
  }
  }


  return (
    <Card style={{ width: "80%", padding: "30dp" }}>
      <Card.Body>
        <Card.Title>Order ID: {order._id}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Buyer: {order.buyerEmail}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Seller: {order.sellerEmail}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Condition Guarantee: {order.conditionVerification}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Order Status: {order.status}
        </Card.Subtitle>
        <Button variant="primary" value={order._id} onClick={handleEdit}>
          Edit
        </Button>{" "}
        <Button variant="primary" onClick={() => updateStatus("Shipped",order._id)}>
          Shipped
        </Button>{" "}
        <Button variant="primary" onClick={() => updateStatus("Delivered",order._id)}>
          Delivered
        </Button>
        {/* <Button variant="danger" onClick={deleteRecord}>
          Delete
        </Button> */}
        <br/><br/>
        <Button href={`mailto:${order.buyerEmail}?Subject=Bookepedia%20Order%20`} target="_blank" rel="noopener noreferrer">
      Email Buyer
    </Button>
      </Card.Body>
      
    </Card>
    
  );
}
