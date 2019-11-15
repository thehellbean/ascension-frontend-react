import { Audio } from "../types/audio";

export function updateAudioProgress(progress: number, audio: Audio) {
  return (dispatch: Function) => {
    fetch(
      `http://localhost:4000/api/v1/books/${audio.book_id}/audio/${audio.id}/progress`,
      {
        method: "POST",
        body: JSON.stringify({
          progress: Math.floor(progress)
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(() =>
      dispatch({
        type: "UPDATE_AUDIO_PROGRESS",
        data: {
          audio: audio,
          progress: progress
        }
      })
    );
  };
}
