import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../backend/firebase";

export const getSearch = createAsyncThunk(
  "search/getSearch",

  async (para, { rejectWithValue }) => {
    console.log(para.value);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", para.value)
    );
    console.log("try");
    try {
      var data = null;

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        data = doc._document.data.value.mapValue;

        console.log(data);
      });

      return data;
      // return res;
    } catch (err) {
      return rejectWithValue("Opps there seems to be an error");
    }
  }
);

export default getSearch;
