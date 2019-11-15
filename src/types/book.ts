import { Audio } from "./audio";

export interface Book {
  id: number;
  title: string;
  author: string;
  audio: Audio[];
}
