import React, { useEffect, useState } from "react";
import attractionServices from "../services/services";

const Attractions = () => {
  const [attractions, setAttractions] = useState([]);

  const getAttractions = async () => {
    const data = await attractionServices.getAllAttractions();
    setAttractions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getAttractions();
  }, []);
console.log(attractions);
  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Megnevezés</th>
          <th>Település</th>
          <th>Cím</th>
          <th>Kategória</th>
          <th>Ár</th>
          <th>Megjegyzés</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
       {attractions.map((attraction) =>( <tr key={attraction.id}>
          <td>{attraction.name}</td>
          <td>{attraction.settlement}</td>
          <td>{attraction.category}</td>
          <td>{attraction.address}</td>
          <td>{attraction.price}</td>
          <td>{attraction.note}</td>
          <td>
            <button className="btn btn-primary">Módosítás</button>
            <button className="btn btn-danger">Törlés</button>
          </td>
        </tr>))}
      </tbody>
    </table>
  );
};

export default Attractions;
