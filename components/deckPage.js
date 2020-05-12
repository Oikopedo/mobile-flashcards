import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Deck  from './deck';
import { connect } from 'react-redux';
import { deleteDeck } from '../actions';
import { deleteDeckTitle } from '../utils/api';
import { styles } from '../utils/style';

function DeckPage(props){

  const { dispatch, navigation, deck } = props;

  const onAdd = () => {
    navigation.navigate(
      'AddCard',
      { deckTitle: deck.title }
    )
  }
  

  const onDelete = () => {
    navigation.goBack();
    dispatch(deleteDeck(deck.title));
    deleteDeckTitle(deck.title);
  };

  const onQuiz = () => {
    navigation.navigate(
      'Quiz',
      { deckTitle: deck.title }
    )
  }

  return (
    <View style={styles.generalView}>
      {typeof deck !== "undefined" && (
      <View>
          <Deck { ...deck }/>
          <TouchableOpacity style={{ ...styles.button, backgroundColor:'green',
            paddingHorizontal: 25 }} onPress={onAdd}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.button, backgroundColor: 'purple',
            paddingHorizontal: 25 }} onPress={onQuiz}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.button, backgroundColor:'red' }}
            onPress={onDelete}>
            <Text style={styles.buttonText}>Delete Deck</Text>
          </TouchableOpacity>
      </View>
      )}
    </View>
  );
}

function mapStateToProps(decks, { route }){
  const { deckTitle } = route.params;
  const deck = decks[deckTitle];
  return {
    deck,
  }
}

export default connect(mapStateToProps)(DeckPage);