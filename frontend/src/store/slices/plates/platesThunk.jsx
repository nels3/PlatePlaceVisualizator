import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendPath } from "src/utils/utils";

export const fetchPlatesList = createAsyncThunk(
  "plates/fetchPlatesList",
  async (args, thunkAPI) => {
    return await axios.get(backendPath + "plate/list/all", {}).then((res) => {
      return res.data;
    });
  }
);
