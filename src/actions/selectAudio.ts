import { Audio } from "../types/audio";

export function getPath(audio: Audio) {
  return `http://localhost:4000/api/v1/books/${audio.book_id}/audio/${audio.id}`;
}

export function selectAudio(audio: Audio) {
  return {
    type: "SELECT_AUDIO",
    data: {
      path: getPath(audio),
      audio: audio
    }
  };
}
