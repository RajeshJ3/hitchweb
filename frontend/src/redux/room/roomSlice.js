import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    connected: false,
    room: null,
    participants: [],
  },
  reducers: {
    setRoom: (state, { payload }) => {
      state.connected = payload.connected;
      state.room = payload.room;
    },
    setParticipants: (state, { payload }) => {
      state.participants = payload;
    },
    disconnect: (state) => {
      state.room.disconnect();

      state.connected = false;
      state.room = null;
      state.participants = [];
    },
  },
});

export const { setRoom, setParticipants, disconnect } = roomSlice.actions;

export default roomSlice.reducer;
