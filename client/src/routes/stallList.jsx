import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../components/api";

function StallList() {
  const [stalls, setStalls] = useState([]);
  const [selectedStall, setSelectedStall] = useState(null);
  const [menus, setMenus] = useState([]);

  console.log(`${api}/stalls`);

  useEffect(() => {
    fetchStalls();
  }, []);

  const fetchStalls = async () => {
    const response = await axios.get(`${api}/stalls`);
    setStalls(response.data.results);
  };

  const selectStall = async (stallName) => {
    setSelectedStall(stallName);
    const response = await axios.get(`${api}/stalls/${stallName}/menus`);
    setMenus(response.data.results);
  };

  return (
    <div>
      <h2>Stall List</h2>
      {stalls.map((stall, index) => (
        <button key={index} onClick={() => selectStall(stall.stallName)}>
          {stall.stallName}
        </button>
      ))}
      {selectedStall && (
        <div>
          <h2>{selectedStall} Menus</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu, index) => (
                <tr key={index}>
                  <td>{menu.name}</td>
                  <td>{menu.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StallList;
