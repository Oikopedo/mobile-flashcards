import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../utils/style';

/*const styles = StyleSheet.create({
  all: {
    flex:1,
    padding:5,
    justifyContent:'center'
  },
  line:{
    padding: 5,
    margin:5,
    marginBottom:30,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth:1,
    height:50,
    fontSize:16,
    justifyContent:'center',
    alignItems:'center'
  },
  iosSubmitBtn: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: 'purple',
    padding: 20,
    margin: 5,
    height: 45,
    borderRadius:30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  }
})*/

class Quiz extends Component{
  state ={
    showAnswer: false,
    counter:0,
    correctCounter:0
  };

  switch = () => {
    this.setState((currentState) =>({
      showAnswer: !currentState.showAnswer
    }));
  };

  next = () => {
    this.setState((currentState) =>({
      counter: currentState.counter+1
    }));
  };

  correct = () => {
    this.setState((currentState) => ({
      correctCounter: currentState.correctCounter+1
    }));
    this.next();
  };

  render(){
    const { deck } = this.props;
    const { counter } = this.state;
    return(
      <View style={styles.generalView}>
        {
          deck.questions.length===0 ?
            <Text style={{textAlign:"center", fontSize:30}}>
              Cant take a quiz with no Questions
            </Text>
            :counter===deck.questions.length ?
              <Text style={{textAlign:"center", fontSize:30}}>
                You played all cards and you choose {this.state.correctCounter} out of {deck.questions.length} cards as correct
              </Text>:
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
                <TouchableOpacity onPress={this.next} 
                  style={{...styles.button,backgroundColor:'red'}}>
                  <Text style={{fontSize:30}}>Incorrect</Text>
                </TouchableOpacity>
              </View>
        }
      </View>
    );
  }
}

function mapStateToProps(decks, { route }){
  const { deckTitle } = route.params;
  const deck = decks[deckTitle];
  return {
    deck,
  };
}

export default connect(mapStateToProps)(Quiz);