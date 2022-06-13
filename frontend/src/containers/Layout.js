/* global chrome */

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setTabs, setActiveTab } from "../redux/tabs/tabsSlice";

import { Box, Backdrop, CircularProgress, Divider } from "@mui/material";
import TopNav from "../components/TopNav";
import TabsList from "../components/TabsList";
import BottomNav from "../components/BottomNav";

export default function Layout({ children }) {
  const tabs = useSelector((state) => state.tabs.list);
  const loading = useSelector((state) => state.utils.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!tabs.length) {
      let queryOptions = {};

      if (chrome.tabs) {
        chrome.tabs.query(queryOptions).then((data) => {
          dispatch(setTabs(data));
          dispatch(setActiveTab(data[0]));
        });
      } else {
        const tempTabs = [
          {
            favIconUrl: "https://www.google.com/s2/favicons?domain=google.com",
            title: "Google",
            url: "https://www.google.com/",
          },
          {
            favIconUrl:
              "https://res.cloudinary.com/practicaldev/image/fetch/s--E8ak4Hr1--/c_limit,f_auto,fl_progressive,q_auto,w_32/https://dev-to.s3.us-east-2.amazonaws.com/favicon.ico",
            title: "Dev.to",
            url: "https://dev.to/",
          },
        ];
        dispatch(setTabs(tempTabs));
        dispatch(setActiveTab(tempTabs[0]));
      }
    }
  }, [tabs.length, dispatch]);

  return (
    <Box>
      <TopNav />
      <TabsList />
      <Divider />
      {children}
      <BottomNav />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
