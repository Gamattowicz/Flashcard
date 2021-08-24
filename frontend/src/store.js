import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  wordListReducer,
  wordAllListReducer,
  wordDetailsReducer,
  wordCreateReducer,
  wordDrawReducer,
  wordAddExerciseReducer,
  wordAddCorrectAnswerReducer,
  wordAddWrongAnswerReducer,
} from './reducers/wordReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
} from './reducers/userReducers'
import {
  categoryListReducer,
  categoryDetailsReducer,
  categoryCreateReducer,
} from './reducers/categoryReducers'
import {
  deckListReducer,
  deckAllListReducer,
  deckDetailsReducer,
  deckCreateReducer,
} from './reducers/deckReducers'
import {
  exerciseCreateReducer,
  exerciseListReducer,
  exerciseAllListReducer,
  exerciseAddCorrectAnswerReducer,
  exerciseAddWrongAnswerReducer,
  exerciseDetailsReducer,
} from './reducers/exerciseReducers'

const reducer = combineReducers({
  wordList: wordListReducer,
  wordAllList: wordAllListReducer,
  wordDetails: wordDetailsReducer,
  wordCreate: wordCreateReducer,
  wordDraw: wordDrawReducer,
  wordAddExercise: wordAddExerciseReducer,
  wordAddCorrectAnswer: wordAddCorrectAnswerReducer,
  wordAddWrongAnswer: wordAddWrongAnswerReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  categoryCreate: categoryCreateReducer,
  deckList: deckListReducer,
  deckAllList: deckAllListReducer,
  deckDetails: deckDetailsReducer,
  deckCreate: deckCreateReducer,
  exerciseCreate: exerciseCreateReducer,
  exerciseList: exerciseListReducer,
  exerciseAllList: exerciseAllListReducer,
  exerciseAddCorrectAnswer: exerciseAddCorrectAnswerReducer,
  exerciseAddWrongAnswer: exerciseAddWrongAnswerReducer,
  exerciseDetails: exerciseDetailsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
