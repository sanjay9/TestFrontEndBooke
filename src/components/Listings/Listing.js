import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function Listing({ book, setAllListings }) {
  let navigate = useNavigate();

  async function  deleteRecord() {
   await axios 
      .delete(`https://backendapi-yo8i.onrender.com/book/delete/${book._id}`)
      // .then((res) => navigate("/home"))
      .catch((err) => {
        console.log(err);
      });

   await   axios
      .get("https://backendapi-yo8i.onrender.com/user/listings")
      .then((res) => {
        setAllListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }

  function handleEdit(event) {
    navigate(`/edit-listing/${event.target.value}`, true);
  }

  return (
    <Card style={{ width: "25rem" }}>
      <Card.Body >
        <Card.Img
          style={{
            width: "20%",
            float: "left",
            marginRight: "20px",
            maxHeight: "200px",
            minHeight:"65px",
            objectFit: "contain",
          }}
          src={"https://backendapi-yo8i.onrender.com/BookImagesUploaded/" + book.image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src =
              "https://backendapi-yo8i.onrender.com/BookImagesUploaded/noImage.png";
          }}
        />
        <Card.Title>
          {book.title} by {book.authors}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">${book.price}</Card.Subtitle>
        {/* <Button variant="primary" value={book.isbn} onClick={handleEdit}>
          Edit
        </Button>  */}
        {book.sold ? (<Button variant="success">SOLD</Button>) : (<span></span>)}
        {'  '}<Button variant="danger" onClick={deleteRecord}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}
