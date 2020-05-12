import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../utils/style';
import { quizQuestion } from '../actions/index';

class Game extends Component{

  state ={
    showAnswer: false,
  };

  switch = () => {
    this.setState((currentState) =>({
      showAnswer: !currentState.showAnswer
    }));
  };

  answer = (value) => {
    this.setState({
      showAnswer: false
    });
    const { dispatch, deck } = this.props;
    dispatch(quizQuestion(deck.title,value));
  }

  incorrect = () => {
    this.answer(false);
  };

  correct = () => {
    this.answer(true);
  };
  
  render(){

    const { deck } = this.props;
    const counter = deck.quiz ? deck.quiz.counter : 0;

    return(
      <View>
        <Text style={{fontSize:16,margin:20,textAlign:'center'}}>
          Card: {counter+1}/{deck.questions.length}
        </Text>
        <Text style={{textAlign:"center", fontSize:30}}>
          {!this.state.showAnswer ? deck.questions[counter].question
            :deck.questions[counter].answer}
        </Text>
        <TouchableOpacity onPress={this.switch}>
          <Text style={{fontSize:16, textAlign:"center", 
            marginVertical:30, color:"red"}}>
            {!this.state.showAnswer ? 'Show Answer': 'Show Question'}
          </Text>
        </TouchableOpacity >
        <TouchableOpacity onPress={this.correct} 
          style={{...styles.button,backgroundColor:'green',paddingHorizontal:30}}>
          <Text style={{...styles.buttonText,fontSize:30}}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.incorrect} 
          style={{...styles.button,backgroundColor:'red'}}>
          <Text style={{fontSize:30}}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(decks, { deckTitle }){
  const deck = decks[deckTitle];
  return{
    deck,
  }
}

export default connect(mapStateToProps)(Game);