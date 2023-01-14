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

export const updatePlate = createAsyncThunk(
  "plates/updatePlate",
  async (args, thunkAPI) => {
    return await axios.post(backendPath + "plate/", {
      id: args.id,
      city: args.city,
      city_pl: args.city_pl,
      country: args.country,
      country_pl: args.country_pl,
      latitude: args.latitude,
      longitude: args.longitude,
      info: args.info,
    });
  }
);
