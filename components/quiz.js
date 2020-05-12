import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../utils/style';
import AllCardsPlayed from './allCardsPlayed';
import Game from './game';

function Quiz(props){

  const { deck, navigation } = props;
  const counter = deck.quiz ? deck.quiz.counter : 0;

  return(
    <View style={styles.generalView}>
      {
        deck.questions.length === 0 ?
          <Text style={{ textAlign: "center", fontSize: 30 }}>
            Cant take a quiz with no Questions
          </Text>
          :counter === deck.questions.length ?
            <AllCardsPlayed deckTitle={deck.title} navigation={navigation}/>:
            <Game deckTitle={deck.title}/>
      }
    </View>
  );
}

function mapStateToProps(decks, { route }){
  const { deckTitle } = route.params;
  const deck = decks[deckTitle];
  return {
    deck,
  };
}

export default connect(mapStateToProps)(Quiz);