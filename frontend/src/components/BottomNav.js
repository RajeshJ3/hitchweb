import { useState } from "react";

import { useSelector } from "react-redux";

import { Box, Container, Stack, Fab } from "@mui/material";
import { Call, Headset, HeadsetOff, Mic, MicOff } from "@mui/icons-material";

export default function BottomNav() {
  const [isDeaf, setIsDeaf] = useState(false);

  const room = useSelector((state) => state.room.room);

  const [isMuted, setIsMuted] = useState(
    room && room.localParticipant && !room.localParticipant.isMicrophoneEnabled
  );

  return (
    room &&
    room.localParticipant && (
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            padding: "0px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              borderRadius: "0px",
              padding: "5px 10px",
              zIndex: 10000,
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Fab
                size="small"
                color="error"
                aria-label="end-call"
                onClick={() => {
                  window.location.reload();
                }}
              >
                <Call />
              </Fab>
              <Fab
                size="large"
                color={isMuted ? "default" : "primary"}
                aria-label="mic"
                onClick={() => {
                  room.localParticipant
                    .setMicrophoneEnabled(
                      !room.localParticipant.isMicrophoneEnabled
                    )
                    .then(() =>
                      setIsMuted(!room.localParticipant.isMicrophoneEnabled)
                    );
                }}
              >
                {isMuted ? <MicOff /> : <Mic />}
              </Fab>
              <Fab
                size="small"
                aria-label="headset"
                onClick={() => setIsDeaf(isDeaf)}
              >
                {isDeaf ? <HeadsetOff /> : <Headset />}
              </Fab>
            </Stack>
          </Stack>
        </Container>
      </Box>
    )
  );
}
