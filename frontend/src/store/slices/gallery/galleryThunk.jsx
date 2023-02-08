import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendPath } from "src/utils/utils";

export const getRegions = createAsyncThunk(
  "plates/getRegions",
  async (args, thunkAPI) => {
    return await axios.get(backendPath + "plate/regions", {}).then((res) => {
      return res.data;
    });
  }
);
export const getCountries = createAsyncThunk(
  "plates/getCountries",
  async (args, thunkAPI) => {
    return await axios.get(backendPath + "plate/countries", {}).then((res) => {
      return res.data;
    });
  }
);

export const getPlatesByCountry = createAsyncThunk(
  "plates/getPlatesByCountry",
  async (args, thunkAPI) => {
    return await axios
      .get(backendPath + "plate/country", { params: { country: args } })
      .then((res) => {
        return res.data;
      });
  }
);

export const getPlatesByRegion = createAsyncThunk(
  "plates/getPlatesByRegion",
  async (args, thunkAPI) => {
    return await axios
      .get(backendPath + "plate/region", { params: { region: args } })
      .then((res) => {
        return res.data;
      });
  }
);
