import { AsyncStorage } from "react-native"

export const CARD_STORAGE_KEY = 'mobileCards:decks';

export function getDecks(){
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then((decks) => (JSON.parse(decks)));
}

export function saveDeckTitle(title){
  return AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify({
    [title]:{
      title:title,
      questions:[]
    }
  }));
}

export function deleteDeckTitle(title){
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results);
      decks[title] = undefined;
      delete decks[title];
      AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(decks));
    });
}

export function submitCard(title, card){
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results);
      decks[title].questions.push(card);
      AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify({
        [title]:{
          ...decks[title],
        }
      }));
    });
}
