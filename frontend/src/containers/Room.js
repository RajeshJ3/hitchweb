import { useEffect, useState } from "react";

import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import { useSelector, useDispatch } from "react-redux";
import { setRoom, setParticipants } from "../redux/room/roomSlice";
import { setLoading } from "../redux/utils/utilsSlice";

import { RoomEvent } from "livekit-client";

import {
  AudioRenderer,
  useParticipant,
  useRoom,
} from "@livekit/react-components";

import {
  handleParticipantConnected,
  handleParticipantDisconnected,
} from "../components/roomHelpers";

import axios from "axios";
import { config } from "../utils/config";
import { getDomainFromUrl } from "../utils/helpers";

export default function Home() {
  const [name, setName] = useState(localStorage.getItem("name") || "");

  const dispatch = useDispatch();

  const { room } = useRoom({
    audioCaptureDefaults: {
      autoGainControl: true,
      deviceId: "",
      echoCancellation: true,
      noiseSuppression: true,
    },
    adaptiveStream: true,
    dynacast: true,
  });

  const activeTab = useSelector((state) => state.tabs.activeTab);
  const loading = useSelector((state) => state.utils.loading);
  const globalRoom = useSelector((state) => state.room);

  useEffect(() => {
    const tempParticipants =
      (globalRoom.room && [...globalRoom.room.participants].map((i) => i[1])) ||
      [];
    dispatch(setParticipants(tempParticipants));
  }, [dispatch, globalRoom.room]);

  const handleJoin = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    localStorage.setItem("name", name);

    const res = await axios.post(`${config.DOMAIN}/obtain-token/`, {
      room: activeTab ? getDomainFromUrl(activeTab.url) : "Hitchweb",
      identity: name,
    });

    console.log("Token obtained");

    room
      .on(RoomEvent.ParticipantConnected, (newParticipant) =>
        handleParticipantConnected(
          newParticipant,
          globalRoom.participants || [],
          dispatch
        )
      )
      .on(RoomEvent.ParticipantDisconnected, (participant) =>
        handleParticipantDisconnected(
          participant,
          globalRoom.participants || [],
          dispatch
        )
      );

    await room.connect(config.WS_DOMAIN, res.data.access_token);
    console.log("connected to room", room.name);

    // camera not required
    room.localParticipant.setCameraEnabled(false);

    // audio device required
    await room.localParticipant.setMicrophoneEnabled(true);

    dispatch(setRoom({ connected: true, room }));
    dispatch(setLoading(false));
  };

  const Item = ({ participant, local }) => {
    if (!local) {
      participant = participant[1];
    }

    const { isSpeaking, subscribedTracks } = useParticipant(participant);

    return (
      <Grid item xs={4} sm={3}>
        {subscribedTracks.map((subscribedTrack, index) => (
          <AudioRenderer
            key={index}
            track={subscribedTrack.track}
            isLocal={local}
          />
        ))}
        <Paper
          elevation={1}
          sx={{
            cursor: "pointer",
            borderRadius: "0px",
            padding: "18px 10px",

            boxShadow: isSpeaking
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
              direction="column"
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <Typography color="GrayText" sx={{ fontSize: "10px" }}>
                {participant.identity}
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Grid>
    );
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: "10px",
      }}
    >
      {!globalRoom.connected ? (
        <form onSubmit={handleJoin}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
              width: "100%",
              minHeight: "50vh",
              height: "100%",
            }}
          >
            <TextField
              fullWidth
              required
              id="filled-basic"
              label="Filled"
              variant="filled"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              fullWidth
              disableElevation
              disabled={loading}
              type="submit"
              variant="contained"
              color="primary"
            >
              Join
            </Button>
          </Stack>
        </form>
      ) : (
        globalRoom.connected && (
          <Grid container spacing={2}>
            <Item participant={globalRoom.room.localParticipant} local={true} />
            {globalRoom.room &&
              [...globalRoom.room.participants].map((participant, index) => (
                <Item key={index} participant={participant} />
              ))}
          </Grid>
        )
      )}
    </Container>
  );
}
