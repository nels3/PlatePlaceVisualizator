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
    formData.append("city", args.city ? args.city : "");
    formData.append("city_pl", args.city_pl ? args.city_pl : "");
    formData.append("country", args.country);
    formData.append("country_pl", args.country_pl);
    formData.append("latitude", args.latitude);
    formData.append("longitude", args.longitude);
    formData.append("info", args.info ? args.info : "");
    formData.append(
      "is_country_plate",
      args.is_country_plate ? args.is_country_plate : ""
    );
    if (args.file) formData.append("file", args.file);

    return await axios.post(backendPath + "plate/", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  }
);

export const addNewPlate = createAsyncThunk(
  "plates/addNewPlate",
  async (args, thunkAPI) => {
    let formData = new FormData();

    formData.append("city", args.city ? args.city : "");
    formData.append("city_pl", args.city_pl ? args.city_pl : "");
    formData.append("country", args.country);
    formData.append("country_pl", args.country_pl);
    formData.append("latitude", args.latitude);
    formData.append("longitude", args.longitude);
    formData.append("info", args.info ? args.info : "");
    formData.append("file", args.file ? args.file : "");
    formData.append(
      "is_country_plate",
      args.is_country_plate ? args.is_country_plate : ""
    );
    return await axios.put(backendPath + "plate/", formData, {
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
    return await axios
      .get(backendPath + "plate/statistics", { params: { language: args } })
      .then((res) => {
        return res.data;
      });
  }
);

export const deletePlate = createAsyncThunk(
  "plates/deletePlate",
  async (args, thunkAPI) => {
    return await axios.delete(backendPath + "plate/", {
      params: { id: args },
    });
  }
);
