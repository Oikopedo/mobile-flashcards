import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../utils/style';
import AllCardsPlayed from './allCardsPlayed';
import Game from './game';

function Quiz({ deckTitle, navigation, length, counter }){

  return(
    <View style={styles.generalView}>
      {
        length === 0 ?
          <Text style={{ textAlign: "center", fontSize: 30 }}>
            Cant take a quiz with no Questions
          </Text>
          :counter === length ?
            <AllCardsPlayed deckTitle={deckTitle} navigation={navigation}/>:
            <Game deckTitle={deckTitle}/>
      }
    </View>
  );
}

function mapStateToProps({ decks }, { route }){
  const { deckTitle } = route.params;
  const deck = decks[deckTitle];
  return {
    length: deck.questions.length,
    counter: deck.quiz.counter,
    deckTitle,
  };
}

export default connect(mapStateToProps)(Quiz);