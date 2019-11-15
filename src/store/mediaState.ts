import { Audio } from "../types/audio";

export interface MediaState {
  audioPath: string;
  activeAudio?: Audio;
  playlist: Audio[];
}

export const DefaultMediaState: MediaState = {
  audioPath: "",
  activeAudio: undefined,
  playlist: []
};
