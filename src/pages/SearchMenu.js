import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const searchedItems = [
  { name: "Omlette", image: "/img/omlette.jpeg" },
  { name: "North Indian", image: "/img/panner.jpeg" },
  { name: "Coffee", image: "/img/coffee.jpeg" },
  { name: "Cake", image: "/img/cake.jpeg" },
  { name: "Chicken", image: "/img/chicken.jpeg" },
  { name: "Idli", image: "/img/idli.jpeg" },
  { name: "Noodles", image: "/img/noodles.jpeg" },
];

const categories = [
  ["Starters", "Main course", "Snacks and Quick Bites", "Deserts and Sweets"],
  ["Local specials", "Continental", "Asian", "Drinks"],
  ["Breakfast", "Lunch", "Dinner", "Brunch"],
];

function SearchMenu  () {
  return (
    <div className="container mt-3">
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <div className="d-flex align-items-center">
          <img src="/img/logoimg.jpg" alt="Homely Bites Logo" width="50" height="50" className="rounded-circle me-2" />
          <h4 className="fw-bold">Homely Bites</h4>
        </div>
        <FaUserCircle size={30} className="text-secondary" />
      </div>

      {/* Search Bar */}
      <div className="text-center my-4">
        <div className="d-flex justify-content-center">
          <input type="text" className="form-control w-50" placeholder="Search for food item" />
          <button className="btn btn-light border ms-2">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Commonly Searched Items */}
      <h5 className="text-center fw-bold my-3">Most commonly searched items</h5>
      <div className="d-flex justify-content-center gap-4 flex-wrap">
        {searchedItems.map((item, index) => (
          <div key={index} className="text-center">
            <img src={item.image} alt={item.name} className="rounded-circle" width="60" height="60" />
            <p className="mt-2">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Category Buttons */}
      <div className="d-flex justify-content-center mt-4 gap-5 flex-wrap">
        {categories.map((column, i) => (
          <div key={i} className="d-flex flex-column gap-3">
            {column.map((category, j) => (
              <button key={j} className="btn btn-warning fw-bold">{category}</button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMenu;
