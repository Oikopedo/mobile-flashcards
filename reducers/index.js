import { 
  RECEIVE_DECKS, 
  ADD_DECK, 
  DELETE_DECK, 
  ADD_CARD, 
  QUIZ_QUESTION, 
  REMOVE_QUIZ
} from "../actions";

export default function decks(state = {}, action){
  let newState;
  switch (action.type){
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case DELETE_DECK:
      newState = {
        ...state,
      };
      newState[action.title] = undefined;
      delete newState[action.title];
      return newState;
    case ADD_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [...state[action.title].questions, action.card]
        }
      };
    case QUIZ_QUESTION:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          quiz: state[action.title].quiz ? {
            counter: state[action.title].quiz.counter + 1,
            correctCounter: action.correct ? 
              state[action.title].quiz.correctCounter + 1 : 
              state[action.title].quiz.correctCounter
          } : {
            counter: 1,
            correctCounter: action.correct ? 1 : 0
          }
        }
      }
    case REMOVE_QUIZ:
      newState = {
        ...state,
      }
      newState[action.title].quiz = undefined;
      delete newState[action.title].quiz;
      return newState;
    default:
      return state;
  }
}