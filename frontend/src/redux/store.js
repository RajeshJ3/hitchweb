import { configureStore } from "@reduxjs/toolkit";

import tabs from "./tabs/tabsSlice";
import utils from "./utils/utilsSlice";
import room from "./room/roomSlice";

export default configureStore({
  reducer: {
    room,
    tabs,
    utils,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "room/setRoom",
          "room/setParticipants",
          "room/setSpeakingParticipants",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: [],
        // Ignore these paths in the state
        ignoredPaths: [
          "room.room",
          "room.participants",
          "room.speakingParticipants",
        ],
      },
    }),
});
