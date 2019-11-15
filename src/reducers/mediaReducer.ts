import { getPath } from "../actions/selectAudio";
import { DefaultMediaState } from "../store/mediaState";
import { MediaAction } from "../actions/mediaActions";

export default function mediaReducer(
  state = DefaultMediaState,
  action: MediaAction
) {
  switch (action.type) {
    case "SELECT_AUDIO":
      return {
        ...state,
        audioPath: action.data.path,
        activeAudio: action.data.audio
      };
    case "NEXT_AUDIO":
      if (state.playlist.length > 0) {
        const [, ...splicedArray] = state.playlist;
        return {
          ...state,
          activeAudio: state.playlist[0],
          audioPath: getPath(state.playlist[0]),
          playlist: splicedArray
        };
      } else {
        return state;
      }
    case "SET_PLAYLIST":
      return { ...state, playlist: [...action.data] };
    case "ADD_TO_PLAYLIST":
      return { ...state, playlist: [...state.playlist, action.data] };
    default:
      return state;
  }
}
