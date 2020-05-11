import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD } from "../actions";

export default function decks(state = {}, action){
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
      const newState = {
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
    default:
      return state;
  }
}