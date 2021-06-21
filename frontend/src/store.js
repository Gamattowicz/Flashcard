import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { wordListReducer, wordDetailsReducer } from "./reducers/wordReducers";
import { userLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  wordList: wordListReducer,
  wordDetails: wordDetailsReducer,
  userLogin: userLoginReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
