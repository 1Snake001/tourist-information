import { db } from "../firebase-config";

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const attractionRef = collection(db, "attractions");

class AttractionServices {
  getAllAttractions = async () => {
    return await getDocs(attractionRef);
  };

  getAttraction = async (id) => {
    const attractionDoc = doc(attractionRef, id);
    return await getDoc(attractionDoc);
  };
  
  addAttractions = async (newAttraction) => {
    return await addDoc(attractionRef, newAttraction);
  };

  deleteAttraction = async (id) => {
    const attractionDoc = doc(attractionRef, id);
    return await deleteDoc(attractionDoc);
  };

  updateAttraction = async (id, updatedAttraction) => {
    const attractionDoc = doc(attractionRef, id);
    return await updateDoc(attractionDoc, updatedAttraction);
  };


}

const attractionSevice = new AttractionServices();

export default attractionSevice;
