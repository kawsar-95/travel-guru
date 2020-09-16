import React from "react";

const HotelDetails = (props) => {
  const {
    title,
    star,
    reviewed,
    bedroom,
    bed,
    bath,
    img,
    guest,
    price,
  } = props.hotel;
  return (
    <div style={{ display: "flex" }}>
      <div>
        <img style={{ width: "300px" }} src={img} alt="" />
      </div>
      <div>
        <h3>{title}</h3>
        <div>
          <span>{guest} guests</span>
          <span>{bedroom} bedrooms</span>
          <span>{bed} beds</span>
          <span>{bath} baths</span>
        </div>
        <p>With air conditioning kitchen</p>
        <p>Cancellation flexibility available</p>
        <div>
          <span>{star}</span>
          <span>({reviewed})</span>
          <span>${price}/Night</span>
          <span>167 total</span>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
