import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function Listing({ book }) {
  let navigate = useNavigate();

  function deleteRecord() {
    axios
      .delete(`https://backendapi-yo8i.onrender.com/book/${book.isbn}`)
      // .then((res) => navigate("/home"))
      .catch((err) => {
        console.log(err);
      });
  }
  
  function handleEdit(event) {
    navigate(`/edit-listing/${event.target.value}`, true);
  }

  return (
    <Card style={{ width: "25rem" }}>
      <Card.Body>
        <Card.Title>
          {book.title} by {book.authors}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">${book.price}</Card.Subtitle>
        {/* <Button variant="primary" value={book.isbn} onClick={handleEdit}>
          Edit
        </Button>  */}
        <Button variant="danger" onClick={deleteRecord}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}
