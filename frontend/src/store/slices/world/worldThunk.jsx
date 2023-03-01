import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendPath } from "src/utils/utils";

// fetching all countries from backend
export const fetchCountriesList = createAsyncThunk(
  "world/fetchCountriesList",
  async (args, thunkAPI) => {
    return await axios
      .get(backendPath + "country/list", { params: { language: args } })
      .then((res) => {
        return res.data;
      });
  }
);

// updating existing country
export const updateCountry = createAsyncThunk(
  "plates/updateCountry",
  async (args, thunkAPI) => {
    let formData = new FormData();

    formData.append("id", args.id);
    formData.append("name", args.name);
    formData.append("name_pl", args.name_pl);
    formData.append("capital", args.capital);
    formData.append("region", args.region);
    formData.append("subregion", args.subregion);
    formData.append("longitude", args.longitude);
    formData.append("latitude", args.latitude);

    return await axios.post(backendPath + "country/", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  }
);

// saving new country
export const addNewCountry = createAsyncThunk(
  "plates/addNewCountry",
  async (args, thunkAPI) => {
    let formData = new FormData();

    formData.append("name", args.name);
    formData.append("name_pl", args.name_pl);
    formData.append("capital", args.capital);
    formData.append("region", args.region);
    formData.append("subregion", args.subregion);
    formData.append("longitude", args.longitude);
    formData.append("latitude", args.latitude);

    return await axios.put(backendPath + "country/", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  }
);

// deleting existing country
export const deleteCountry = createAsyncThunk(
  "plates/deleteCountry",
  async (args, thunkAPI) => {
    return await axios.delete(backendPath + "country/", {
      params: { id: args },
    });
  }
);

// fetching all cities from backend
export const fetchCitiesList = createAsyncThunk(
  "world/fetchCitiesList",
  async (args, thunkAPI) => {
    return await axios
      .get(backendPath + "city/list", { params: { language: args } })
      .then((res) => {
        return res.data;
      });
  }
);

// updating existing city
export const updateCity = createAsyncThunk(
  "plates/updateCity",
  async (args, thunkAPI) => {
    let formData = new FormData();

    formData.append("id", args.id);
    formData.append("name", args.name);
    formData.append("name_pl", args.name_pl);
    formData.append("country", args.country);
    formData.append("country_pl", args.country_pl);
    formData.append("region", args.region);
    formData.append("population", args.population);
    formData.append("longitude", args.longitude);
    formData.append("latitude", args.latitude);

    return await axios.post(backendPath + "city/", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  }
);

// saving new city
export const addNewCity = createAsyncThunk(
  "plates/addNewCity",
  async (args, thunkAPI) => {
    let formData = new FormData();

    formData.append("name", args.name);
    formData.append("name_pl", args.name_pl);
    formData.append("country", args.country);
    formData.append("country_pl", args.country_pl);
    formData.append("region", args.region);
    formData.append("population", args.population);
    formData.append("longitude", args.longitude);
    formData.append("latitude", args.latitude);

    return await axios.put(backendPath + "city/", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  }
);

// deleting existing city
export const deleteCity = createAsyncThunk(
  "plates/deleteCity",
  async (args, thunkAPI) => {
    return await axios.delete(backendPath + "city/", {
      params: { id: args },
    });
  }
);
