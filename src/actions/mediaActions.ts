import { Audio } from "../types/audio";

interface NEXT_AUDIO {
  type: "NEXT_AUDIO";
}

interface SELECT_AUDIO {
  type: "SELECT_AUDIO";
  data: { path: string; audio: Audio };
}

interface SET_PLAYLIST {
  type: "SET_PLAYLIST";
  data: Audio[];
}

interface ADD_TO_PLAYLIST {
  type: "ADD_TO_PLAYLIST";
  data: Audio;
}

export type MediaAction =
  | NEXT_AUDIO
  | SELECT_AUDIO
  | SET_PLAYLIST
  | ADD_TO_PLAYLIST;
