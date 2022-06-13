import { createSlice } from "@reduxjs/toolkit";

export const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    list: [],
    activeTab: null,
  },
  reducers: {
    setTabs: (state, { payload }) => {
      state.list = payload;
    },
    setActiveTab: (state, { payload }) => {
      state.activeTab = payload;
    },
  },
});

export const { setTabs, setActiveTab } = tabsSlice.actions;

export default tabsSlice.reducer;
