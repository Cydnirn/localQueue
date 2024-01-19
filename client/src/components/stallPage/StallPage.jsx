import React, { useState } from "react";

function StallPage(props) {
    const [menuItems, setMenuItems] = useState([]);
  const { menus, stallName } = props;
  return (
    <div className="inner-contain">
      <h2>{stallName}</h2>
      <div className="content">
        <div className="list-food">
          {menus.map((menu) => (
            <div key={menu.name}></div>
          ))}
        </div>
      </div>
      F
    </div>
  );
}

export default StallPage;
