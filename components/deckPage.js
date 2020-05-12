import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Deck  from './deck';
import { connect } from 'react-redux';
import { deleteDeck } from '../actions';
import { deleteDeckTitle } from '../utils/api';
import { styles } from '../utils/style';

function DeckPage({ deleteDeck, navigation, deckTitle }){

  const onAdd = () => {
    navigation.navigate(
      'AddCard',
      { deckTitle }
    )
  }
  

  const onDelete = () => {
    navigation.goBack();
    deleteDeck(deckTitle);
    deleteDeckTitle(deckTitle);
  };

  const onQuiz = () => {
    navigation.navigate(
      'Quiz',
      { deckTitle }
    )
  }

  return (
    <View style={styles.generalView}>
      <Deck deckTitle={deckTitle}/>
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
  );
}

function mapStateToProps(_, { route }){
  const { deckTitle } = route.params;
  return {
    deckTitle,
  }
}

export default connect(mapStateToProps, { deleteDeck })(DeckPage);