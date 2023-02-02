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

export const updateCountry = createAsyncThunk(
  "plates/updateCountry",
  async (args, thunkAPI) => {
    let formData = new FormData();

    formData.append("name", args.name);
    formData.append("name_pl", args.name_pl);
    formData.append("capital", args.capital);
    formData.append("region", args.region);
    formData.append("subregion", args.subregion);

    return await axios.post(backendPath + "country/", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  }
);

export const addNewCountry = createAsyncThunk(
  "plates/addNewCountry",
  async (args, thunkAPI) => {
    let formData = new FormData();

    formData.append("name", args.name);
    formData.append("name_pl", args.name_pl);
    formData.append("capital", args.capital);
    formData.append("region", args.region);
    formData.append("subregion", args.subregion);

    return await axios.put(backendPath + "country/", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  }
);

export const updateCity = createAsyncThunk(
  "plates/updateCity",
  async (args, thunkAPI) => {
    //TODO
  }
);
