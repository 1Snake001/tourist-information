import { db } from "../firebase-config";

import {
    collection,
    getDocs,
} from "firebase/firestore";

const attractionRef = collection(db, "attractions");

class AttractionServices{

   getAllAttractions = async () => {
        return getDocs(attractionRef);
      };
}

const attractionSevice =  new AttractionServices();

export default attractionSevice;