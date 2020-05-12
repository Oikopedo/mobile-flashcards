import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { styles } from '../utils/style';
import { View, Text, TouchableOpacity} from 'react-native';
import { resetQuiz } from '../actions/index';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

function AllCardsPlayed({ deck, resetQuiz, navigation }){

  const { correctCounter } = deck.quiz;
  const  length = deck.questions.length; 

  useEffect(() => {
    clearLocalNotification().then(setLocalNotification);
  });

  const restart = () => {
    resetQuiz(deck.title);
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
        You played all cards and you choose {correctCounter} out of {length} cards as correct
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

function mapStateToProps({ decks }, { deckTitle, navigation }){
  return ({
    deck: decks[deckTitle],
    navigation,
  })
}

export default connect(mapStateToProps, { resetQuiz })(AllCardsPlayed);