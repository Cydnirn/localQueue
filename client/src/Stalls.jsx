// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect } from "react";
import SearchBar from "../src/components/SearchBar";
import axios from "axios";

// call data from backend
const Stalls = () => {
  const [stalls, setStalls] = useState([]);
  const [goodsList, setGoodsList] = useState([]);

  useEffect(() => {
    const fetchStalls = async () => {
      const res = await axios.get("http://192.168.1.11:5000/Stalls/");
      console.log(res.data.results);
      setStalls(res.data.results);
    };
    fetchStalls();
  }, []);

  const fetchMenus = async (stallName) => {
    const res = await axios.get(`http://192.168.1.11:5000/Stalls/${stallName}/menus`);
    console.log(res);
    setGoodsList(res.data.results);
  };

  return (
    <div>
      <h1>Stalls</h1>
      <ul>
        <SearchBar />
        {stalls.map((stall) => (
          <li key={stall.stallName}>
            {stall.stallName} ({stall.stallNo}) - Cashless:{" "}
            {stall.isCashless ? "Yes" : "No"}
            <button onClick={() => fetchMenus(stall.stallName)}>Show Menus </button>
          </li>
        ))}
      </ul>
      <h2>Menus</h2>
      <ul>
        {goodsList.map((good) => (
          <li key={good.name}>
            {good.name} - Rp.{good.price} ({good.type}) - Spicy:{" "}
            {good.isSpicy ? "Yes" : "No"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stalls;
