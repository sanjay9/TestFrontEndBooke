import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function BookDetails() {
  let navigate = useNavigate();
  const { _id } = useParams();
  const [book, setBook] = useState();

  useEffect(() => {
    axios
      .get(`https://backendapi-yo8i.onrender.com/book/details/${_id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {book ? (
        <div style={{ margin: "20px" }}>
          <br />
          <img
            style={{
              width: "35%",
              borderRadius: "50px",
              maxHeight: "500px",
              objectFit: "contain",
              border: "5px solid #0047a9",
              float: "left",
            }}
            src={"https://backendapi-yo8i.onrender.com/BookImagesUploaded/" + book.image}
          />
          <div style={{ marginLeft: "30px", float: "left", width: "45%" }}>
            <h1 style={{ marginBottom: "0px" }}>{book.title}</h1>
            <i>by {book.authors}</i>
            <br />
            <br />
            <p>Condition: {book.condition}</p>
            <hr />
            <p>{book.description}</p>
            <hr />
            <Button
              variant="primary"
              onClick={() => navigate("/book-details/" + book._id)}
            >
              Price: ${book.price.toFixed(2)}
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate("/order-summary/" + book._id)}
            >
              Buy
            </Button>
            <br />
            <small className="text-muted">Book viewed {book.views} times</small>
            <br />
            <br />
            <p>
              <b>Genre:</b> {book.genre} <br />
              <b>ISBN:</b> {book.isbn} <br />
              <b>Sold by:</b> {book.sellerEmail} <br />
              <b>Date Added:</b>{" "}
              {new Date(book.dateAdded).toLocaleString("en-CA")}
              <br />
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
