import {
  Container,
  Avatar,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import { Box } from "@mui/system";
import { setActiveTab } from "../redux/tabs/tabsSlice";

export default function TabsList() {
  const tabs = useSelector((state) => state.tabs);

  const dispatch = useDispatch();

  const Item = ({ item }) => {
    return (
      <Grid item xs={4} sm={3}>
        <Paper
          elevation={1}
          sx={{
            cursor: "pointer",
            borderRadius: "0px",
            padding: "18px 10px",

            boxShadow:
              tabs.activeTab === item
                ? "0px 1px 0px 1px rgba(25, 118, 210, 30%), 0px 1px 0px 0px rgba(25, 118, 210, 30%), 0px 0px 3px 0px rgba(25, 118, 210, 30%)"
                : "",

            backgroundColor: "rgba(0, 0, 0, 0.02)",

            "&:active": {
              backgroundColor: "rgba(0, 0, 0, 0.02)",
            },

            "&:focus": {
              backgroundColor: "rgba(0, 0, 0, 0.02)",
            },

            "&:focus-within": {
              backgroundColor: "rgba(0, 0, 0, 0.02)",
            },

            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.01)",
            },
          }}
          onClick={() => {
            dispatch(setActiveTab(item));
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <Avatar
                alt="Remy Sharp"
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: "5px solid, red",
                }}
                src={item.favIconUrl}
              />
              <Typography color="GrayText" sx={{ fontSize: "10px" }}>
                {item.title}
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Grid>
    );
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          padding: "10px",
        }}
      >
        <Grid container spacing={2}>
          {tabs.list.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
