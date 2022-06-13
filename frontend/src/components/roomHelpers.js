import { setParticipants } from "../redux/room/roomSlice";

export const handleParticipantConnected = (
  newParticipant,
  participants,
  dispatch
) => {
  dispatch(setParticipants([...participants, newParticipant]));
};

export const handleParticipantDisconnected = (
  participant,
  participants,
  dispatch
) => {
  dispatch(setParticipants(participants.filter((i) => i !== participant)));
};
