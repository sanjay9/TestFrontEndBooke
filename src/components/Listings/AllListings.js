import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Listing from "./Listing";
import accountContext from "../userAccounts/accountContext";

export default function AllListings() {
  let navigate = useNavigate();
  const [allListings, setAllListings] = useState([]);
  const { userEmail } = React.useContext(accountContext);

  useEffect(() => {
    axios
      .get("http://localhost:3500/user/listings")
      .then((res) => {
        setAllListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Your Listings</h1>
      {allListings.map((listing) => listing.sellerEmail === userEmail ? (
        <Listing key={listing._id} book={listing} setAllListings={setAllListings} /> 
        ) : (
        <div></div>
        )       
      )}
    </div>
  );
}
