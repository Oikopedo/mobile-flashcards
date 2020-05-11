import { AsyncStorage } from "react-native"

export const CARD_STORAGE_KEY = 'mobileCards:decksV2';

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

/*export function fetchCards(){
  return AsyncStorage.getItem( CARD_STORAGE_KEY )
  .then((cards) => (JSON.parse(cards)));
}

export function submitCard({ card, key }){
  return AsyncStorage.mergeItem( CARD_STORAGE_KEY, JSON.stringify({
    [ key ] : card,
  }));
}

export function removeCard( key ){
  return AsyncStorage.getItem( CARD_STORAGE_KEY )
    .then(( results ) => {
      const cards = JSON.parse( results );
      cards[ key ] = undefined;
      delete cards[ key ];
      AsyncStorage.setItem( CARD_STORAGE_KEY, JSON.stringify( cards ));
    });
}*/