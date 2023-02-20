import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendPath } from "src/utils/utils";

export const getAllStatistics = createAsyncThunk(
  "home/getAllStatistics",
  async (args, thunkAPI) => {
    return await axios
      .get(backendPath + "plate/statistics/all", {})
      .then((res) => {
        return res.data;
      });
  }
);
