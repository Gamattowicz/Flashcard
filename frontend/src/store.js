import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  wordListReducer,
  wordDetailsReducer,
  wordCreateReducer,
  wordDrawReducer,
  wordAddExerciseReducer,
  wordAddCorrectAnswerReducer,
} from "./reducers/wordReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
  categoryListReducer,
  categoryDetailsReducer,
  categoryCreateReducer,
} from "./reducers/categoryReducers";
import {
  deckListReducer,
  deckDetailsReducer,
  deckCreateReducer,
} from "./reducers/deckReducers";

const reducer = combineReducers({
  wordList: wordListReducer,
  wordDetails: wordDetailsReducer,
  wordCreate: wordCreateReducer,
  wordDraw: wordDrawReducer,
  wordAddExercise: wordAddExerciseReducer,
  wordAddCorrectAnswer: wordAddCorrectAnswerReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  categoryCreate: categoryCreateReducer,
  deckList: deckListReducer,
  deckDetails: deckDetailsReducer,
  deckCreate: deckCreateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
