import { createStore, applyMiddleware, combineReducers } from "redux";
import rootReducer from "../reducers/generalReducer";
import mediaReducer from "../reducers/mediaReducer";
import thunk from "redux-thunk";

export default function configureStore() {
  return createStore(
    combineReducers({
      general: rootReducer,
      media: mediaReducer
    }),
    applyMiddleware(thunk)
  );
}
