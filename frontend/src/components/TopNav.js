import { Container, Paper, Stack, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import logo from "../assets/images/logo/64.png";
import { useSelector } from "react-redux";

export default function TopNav() {
  const globalRoom = useSelector((state) => state.room);

  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: "0px",
        padding: "5px 10px",
        position: "sticky",
        top: 0,
        zIndex: 10000,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          padding: "0px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <img style={{ height: "32px" }} src={logo} alt="Logo" />
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              fontWeight="bold"
              sx={{ marginBottom: "-3px" }}
            >
              {(globalRoom && globalRoom.room && [...globalRoom.room.participants].length + 1) || "0"}
            </Typography>
            <Person color="primary" size="small" />
          </Stack>
        </Stack>
      </Container>
    </Paper>
  );
}
