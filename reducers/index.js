import { 
  RECEIVE_DECKS, 
  ADD_DECK, 
  DELETE_DECK, 
  ADD_CARD, 
  QUIZ_QUESTION, 
  RESET_QUIZ
} from "../actions";

export default function decks(state = { decks: [], quiz: {} }, action){
  switch (action.type){
    case RECEIVE_DECKS:
      const quiz = {}
      Object.keys(action.decks).forEach((title) => {
        quiz[title]= {
          counter: 0, 
          correctCounter: 0
        };
      })
      return {
        ...state,
        decks: [ ...state.decks, ...Object.values(action.decks) ],
        quiz:{
          ...state.quiz, 
          ...quiz,
        }
      };
    case ADD_DECK:
      return {
        ...state,
        decks: [ ...state.decks, action.deck ],
        quiz: {
          ...state.quiz,
          [action.deck.title]: {
            counter: 0,
            correctCounter: 0
          }
        }
      };
    case DELETE_DECK:
      return {
        ...state,
        decks: state.decks.filter((deck) => (deck.title !== action.title)),
        quiz: {
          ...state.quiz,
          [action.title]: undefined
        }
      };
    case ADD_CARD:
      return {
        ...state,
        decks: state.decks.map((deck) => (deck.title === action.title ? { 
          ...deck,
          questions: [ ...deck.questions, action.card ]
        } : deck ))
      };
    case QUIZ_QUESTION:
      return{
        ...state,
        quiz: {
          ...state.quiz,
          [action.title]: {
            counter: state.quiz[action.title].counter+1,
            correctCounter: action.correct ? 
              state.quiz[action.title].correctCounter+1 : 
              state.quiz[action.title].correctCounter
          }
        }
      };
      
    case RESET_QUIZ:
      return {
        ...state,
        quiz: {
          ...state.quiz,
          [action.title]: {
            counter: 0,
            correctCounter: 0
          }
        }
      };
    default:
      return state;
  }
}