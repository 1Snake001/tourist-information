import React, { useEffect, useState } from "react";
import attractionServices from "../services/services";
import { useNavigate } from "react-router-dom";

const Attractions = () => {
  const [attractions, setAttractions] = useState([]);
  const [filteredSettlement, setFilteredSettlement] = useState("Mindegyik");

  const navigate = useNavigate();

  const getAttractions = async () => {
    const data = await attractionServices.getAllAttractions();
    setAttractions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getAttractions();
  }, []);

  const settlementOptions = [
    "Mindegyik",
    ...new Set(attractions.map((attraction) => attraction.settlement)),
  ];

  const handleSettlementChange = (event) => {
    setFilteredSettlement(event.target.value);
  };

  const filteredAttractions =
    filteredSettlement === "Mindegyik"
      ? attractions
      : attractions.filter(
          (attraction) => attraction.settlement === filteredSettlement
        );

  function handleNavigateNewAttr() {
    navigate("/attraction/new");
  }

  async function handleDelete(id) {
    await attractionServices.deleteAttraction(id);
    await getAttractions();
  }

  async function handleUpdateForm(attraction) {
    navigate(`/attraction/edit/${attraction.id}`);
  }

  return (
    <>
      <div>
        <h1>Látványosságok</h1>
      </div>
      <div>
        <button
          onClick={handleNavigateNewAttr}
          className="btn btn-primary post"
        >
          Felvitel
        </button>
      </div>
      <div>
        <label className="settlement-label" htmlFor="settlement">
          Város:
        </label>
        <select
          id="settlement"
          name="settlement"
          className="form-control"
          value={filteredSettlement}
          onChange={handleSettlementChange}
        >
          {settlementOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
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
          {filteredAttractions.map((attraction) => (
            <tr key={attraction.id}>
              <td>{attraction.name}</td>
              <td>{attraction.settlement}</td>
              <td>{attraction.category}</td>
              <td>{attraction.address}</td>
              <td>{attraction.price}</td>
              <td>{attraction.note}</td>
              <td>
                <button
                  onClick={() => handleUpdateForm(attraction)}
                  className="btn btn-primary"
                >
                  Módosítás
                </button>
                <button
                  onClick={() => handleDelete(attraction.id)}
                  className="btn btn-danger"
                >
                  Törlés
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Attractions;
