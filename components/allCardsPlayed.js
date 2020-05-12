import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { styles } from '../utils/style';
import { View, Text, TouchableOpacity} from 'react-native';
import { resetQuiz } from '../actions/index';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

function AllCardsPlayed({ deck, dispatch, navigation, correctCounter }){

  useEffect(() => {
    clearLocalNotification().then(setLocalNotification);
  });

  const restart = () => {
    dispatch(resetQuiz(deck.title));
  }

  const toHome = () => {
    navigation.navigate('Home');
  }

  const back = () => {
    navigation.goBack();
  }

  return(
    <View>
      <Text style={{ textAlign:"center", fontSize: 30, marginVertical: 30 }}>
        You played all cards and you choose {correctCounter} out of {deck.questions.length} cards as correct
      </Text>
      <TouchableOpacity onPress={restart} 
        style={{ ...styles.button, backgroundColor: 'green', paddingHorizontal: 25 }}>
        <Text style={{ ...styles.buttonText, fontSize: 30 }}>Restart Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={back} 
        style={{ ...styles.button, backgroundColor: 'purple' }}>
        <Text style={{ ...styles.buttonText, fontSize: 30 }}>Back to Deck</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toHome} 
        style={{ ...styles.button, backgroundColor: 'red', paddingHorizontal: 65 }}>
        <Text style={{ fontSize: 30 }}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

function mapStateToProps({ decks, quiz }, { deckTitle, navigation }){
  return ({
    deck: decks.filter((deck) => (deck.title === deckTitle))[0],
    correctCounter: quiz[deckTitle].correctCounter,
    navigation,
  })
}

export default connect(mapStateToProps)(AllCardsPlayed);