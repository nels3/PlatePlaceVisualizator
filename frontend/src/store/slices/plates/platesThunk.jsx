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
export const fetchPlateImage = createAsyncThunk(
  "plates/fetchPlateImage",
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

export const updatePlate = createAsyncThunk(
  "plates/updatePlate",
  async (args, thunkAPI) => {
    let formData = new FormData();

    formData.append("id", args.id);
    formData.append("city", args.city);
    formData.append("city_pl", args.city_pl);
    formData.append("country", args.country);
    formData.append("country_pl", args.country_pl);
    formData.append("latitude", args.latitude);
    formData.append("longitude", args.longitude);
    formData.append("info", args.info);
    formData.append("file", args.file);

    return await axios.post(backendPath + "plate/", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  }
);

export const fetchStatistics = createAsyncThunk(
  "plates/fetchStatistics",
  async (args, thunkAPI) => {
    return await axios.get(backendPath + "plate/statistics", {}).then((res) => {
      return res.data;
    });
  }
);
