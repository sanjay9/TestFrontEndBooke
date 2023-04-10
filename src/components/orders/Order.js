import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function Order({ order }) {
  let navigate = useNavigate();

  function deleteRecord() {
    axios
      .delete(`https://backendapi-yo8i.onrender.com/user/${order._id}`)
      .then((res) => navigate("/home"))
      .catch((err) => {
        console.log(err);
      });
  }
  function handleEdit(event) {
    //TO DO:
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
          Order Status: {order.status}
        </Card.Subtitle>
        <Button variant="primary" value={order._id} onClick={handleEdit}>
          Edit
        </Button>
        {/* <Button variant="danger" onClick={deleteRecord}>
          Delete
        </Button> */}
      </Card.Body>
    </Card>
  );
}
