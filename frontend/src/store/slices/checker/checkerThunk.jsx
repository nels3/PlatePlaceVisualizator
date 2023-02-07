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
