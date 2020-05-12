export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_CARD = 'ADD_CARD';
export const QUIZ_QUESTION = 'QUIZ_QUESTION';
export const RESET_QUIZ = 'RESET_QUIZ';

export function receiveDecks(decks){
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addDeck(title){
  return {
    type: ADD_DECK,
    deck: {
      title: title,
      questions: []
    }
  };
}

export function deleteDeck(title){
  return{
    type: DELETE_DECK,
    title: title
  };
}

export function addCard(title, card){
  return{
    type: ADD_CARD,
    title,
    card,
  };
}

export function quizQuestion(title,correct){
  return{
    type: QUIZ_QUESTION,
    title,
    correct,
  };
}

export function resetQuiz(title){
  return{
    type: RESET_QUIZ,
    title,
  };
}