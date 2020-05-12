import { 
  RECEIVE_DECKS, 
  ADD_DECK, 
  DELETE_DECK, 
  ADD_CARD, 
  QUIZ_QUESTION, 
  RESET_QUIZ
} from "../actions";

export default function decks(state = { decks: {}, order: [] }, action){
  switch (action.type){
    case RECEIVE_DECKS:
      if (action.decks){
        const decksWithQuiz = {}
        Object.entries(action.decks).forEach(([title, deck]) => {
          decksWithQuiz[title]= {
            ...deck,
            quiz: {
              counter: 0,
              correctCounter: 0
            }
          };
        });
        return {
          ...state,
          decks: {
            ...state.decks,
            ...decksWithQuiz,
          },
          order: [ ...state.order, ...Object.keys(action.decks) ]
        };
      }
      return state;
    case ADD_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.deck.title]: {
            ...action.deck,
            quiz: {
              counter: 0,
              correctCounter: 0
            }
          },
        },
        order: [ ...state.order, action.deck.title ]
      };
    case DELETE_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.title]: undefined
        },
        order: state.order.filter((title) => (action.title !== title))
      };
    case ADD_CARD:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.title]: {
            ...state.decks[action.title],
            questions: [ ...state.decks[action.title].questions, action.card]
          }
        }
      };
    case QUIZ_QUESTION:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.title]: {
            ...state.decks[action.title],
            quiz: {
              counter: state.decks[action.title].quiz.counter + 1,
              correctCounter: action.correct ? 
                state.decks[action.title].quiz.correctCounter + 1 :
                state.decks[action.title].quiz.correctCounter
            }
          }
        }
      };
    case RESET_QUIZ:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.title]: {
            ...state.decks[action.title],
            quiz: {
              counter: 0,
              correctCounter: 0
            }
          }
        }
      };
    default:
      return state;
  }
}