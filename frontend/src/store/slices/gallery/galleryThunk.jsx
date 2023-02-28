import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendPath } from "src/utils/utils";

export const getRegions = createAsyncThunk(
  "gallery/getRegions",
  async (args, thunkAPI) => {
    return await axios.get(backendPath + "plate/regions", {}).then((res) => {
      return res.data;
    });
  }
);
export const getCountries = createAsyncThunk(
  "gallery/getCountries",
  async (args, thunkAPI) => {
    return await axios.get(backendPath + "plate/countries", {}).then((res) => {
      return res.data;
    });
  }
);
export const fetchAllPhotosDataForMap = createAsyncThunk(
  "gallery/fetchAllPhotosDataForMap",
  async (args, thunkAPI) => {
    return await axios.get(backendPath + "plate/map", {}).then((res) => {
      return res.data;
    });
  }
);

export const getPlatesByCountry = createAsyncThunk(
  "gallery/getPlatesByCountry",
  async (args, thunkAPI) => {
    return await axios
      .get(backendPath + "plate/country", { params: { country: args } })
      .then((res) => {
        return { data: res.data, accessor: args };
      });
  }
);

export const getPlatesByRegion = createAsyncThunk(
  "gallery/getPlatesByRegion",
  async (args, thunkAPI) => {
    return await axios
      .get(backendPath + "plate/region", { params: { region: args } })
      .then((res) => {
        return { data: res.data, accessor: args };
      });
  }
);

export const fetchPlateImage = createAsyncThunk(
  "gallery/fetchPlateImage",
  async (args, thunkAPI) => {
    return await axios
      .get(backendPath + "plate/image", {
        params: { id: args },
        responseType: "blob",
      })
      .then((res) => {
        return URL.createObjectURL(res.data);
      });
  }
);
