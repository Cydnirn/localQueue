import { useState, useEffect } from "react";
import "./homeMenu.css";
import axios from "@api/axios";
import SearchBar from "@components/SearchBar/SearchBar";
import StallPage from "@components/stallPage/StallPage";
import { Avatar } from '@mui/material';
import {deepOrange} from "@mui/material/colors";
import useAuth from "../../hooks/useAuth";
import OffCanvasExample from "../../components/bottompopup/BottomPopUp";

function HomeMenu() {
  const [stalls, setStalls] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedStall, setSelectedStall] = useState("");
  const {auth} = useAuth();
  const maxList = 6;

  useEffect(() => {
    const fetchStalls = async () => {
      const res = await axios.get("/Stalls/");
      setStalls(res.data.results);
    };
    fetchStalls();
  }, []);

  const handleSearch = (term) => {
    console.log(`SearchTerm: ${term}`);
    const searchName = async () => {
      try {
        const res = await axios.get(`/Stalls?stallName=${term}`, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        });
        if (res?.data?.results) {
          setStalls(res.data.results);
        }
      } catch (err) {
        console.log(err?.data);
      }
    };
    searchName();
  };

  const fetchStallMenus = async (stallName) => {
    try{
      setSelectedStall(stallName);
      const res = await axios.get(`/Stalls/${stallName}/menus`);
      setMenus(res.data.results);
    }
    catch{

    }
  }

  const lists = Array.from({ length: maxList }, (_, index) => (
    <li key={index}>
      <div className="list">
        Cemilan
      </div>
    </li>
  ));

  return (
    <div className="main">
      <div className="homeNav">
        <h4>name</h4>
        <Avatar sx={{bgcolor:deepOrange[500]}}>{auth?.username}</Avatar>
      </div>

      <SearchBar placeholder={"Makan apa hari ini"} onSearch={handleSearch} />
      <ul className="listbar">
        {lists}
      </ul>

      <ul className="main-page">
        {stalls.map((stall) => (
          <li key={stall.stallName} className="page" onClick={() => {fetchStallMenus(stall.stallName)}}>
            <div className="toko-image"></div>
            <p className="casual-word">{stall.stallName}</p>
            <p className="italic">{stall.isCashless ? "Cashless" : "Cash"}</p>
            <button className="submit-button">Buka Toko</button>
          </li>
        ))}
      </ul>

      <StallPage menus={menus} stallName={selectedStall}/>

    </div>
  );
}

export default HomeMenu;
