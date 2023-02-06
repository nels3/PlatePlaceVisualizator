import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendPath } from "src/utils/utils";

export const getCountryByName = createAsyncThunk(
  "world/getCountryByName",
  async (args, thunkAPI) => {
    return await axios
      .get(backendPath + "country/check", {
        params: {
          name: args.name,
          language: args.language,
        },
      })
      .then((res) => {
        return { info: "ok", data: res.data, field: args.id };
      })
      .catch((error) => {
        return { info: "error", field: args.id };
      });
  }
);

export const getCityByName = createAsyncThunk(
  "world/getCityByName",
  async (args, thunkAPI) => {
    return await axios
      .get(backendPath + "city/", {
        params: {
          name: args.name,
          name_pl: args.name_pl,
          country: args.country,
          country_pl: args.country_pl,
        },
      })
      .then((res) => {
        return { info: "ok", data: res.data, field: args.id };
      })
      .catch((error) => {
        return { info: "error", field: args.id };
      });
  }
);

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

    formData.append("id", args.id);
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

export const deleteCountry = createAsyncThunk(
  "plates/deleteCountry",
  async (args, thunkAPI) => {
    return await axios.delete(backendPath + "country/", {
      params: { id: args },
    });
  }
);

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
    formData.append("population", args.region);
    formData.append("longitude", args.region);
    formData.append("latitude", args.region);

    return await axios.post(backendPath + "city/", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  }
);

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

export const deleteCity = createAsyncThunk(
  "plates/deleteCity",
  async (args, thunkAPI) => {
    return await axios.delete(backendPath + "city/", {
      params: { id: args },
    });
  }
);
