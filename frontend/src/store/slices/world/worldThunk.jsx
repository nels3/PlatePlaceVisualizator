import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendPath } from "src/utils/utils";

export const fetchCountriesList = createAsyncThunk(
  "world/fetchCountriesList",
  async (args, thunkAPI) => {
    return await axios.get(backendPath + "country/list", {}).then((res) => {
      return res.data;
    });
  }
);

export const fetchCitiesList = createAsyncThunk(
  "world/fetchCitiesList",
  async (args, thunkAPI) => {
    return await axios.get(backendPath + "city/list", {}).then((res) => {
      return res.data;
    });
  }
);
