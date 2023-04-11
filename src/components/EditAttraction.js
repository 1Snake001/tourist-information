import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import AttracionsForm from "./AttracionsForm";
import attractionServices from "../services/services";

const EditAttraction = () => {
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);

  useEffect(() => {
    const promise =  attractionServices.getAttraction(id);

    promise.then((attr) => {
     const attractionData =  attr.data();
      const attraction = { id, attractionData };
       setAttraction(attraction);
    });
  }, [id]);

  return (
    <section>
      <h1 className="title">Látványosság módosítása</h1>
      {attraction && <AttracionsForm type="edit" attraction={attraction} />}
    </section>
  );
};

export default EditAttraction;
