import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Deck  from './deck';
import { connect } from 'react-redux';
import { deleteDeck } from '../actions';
import { deleteDeckTitle } from '../utils/api';
import { CommonActions } from '@react-navigation/native';

const styles = StyleSheet.create({
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
    padding: 5,
    margin: 5,
    paddingHorizontal:25,
    height: 45,
    borderRadius:30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  }
})

class DeckPage extends Component{
  /*state =  {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  }*/

  onAdd = () => {
    const { navigation, deck } = this.props;
    navigation.navigate(
      'AddCard',
      { deckTitle: deck.title }
    )
  }
  

  onDelete = () => {

    const { dispatch, navigation, deck} = this.props;

    deleteDeckTitle(deck.title);
    navigation.goBack();
    dispatch(deleteDeck(deck.title));
  };

  onQuiz = () => {
    const { navigation, deck } = this.props;
    navigation.navigate(
      'Quiz',
      { deckTitle: deck.title }
    )
  }

  render(){
    const { deck } = this.props
    return (
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        {typeof deck !== "undefined" && (
        <View style={{margin:8}}>
            <Deck {...deck}/>
            <TouchableOpacity style={{...styles.androidSubmitBtn, backgroundColor:'green'}} onPress={this.onAdd}>
              <Text style={{color:'white'}}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.androidSubmitBtn} onPress={this.onQuiz}>
              <Text style={{color:'white'}}>Start Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.androidSubmitBtn, backgroundColor:'red'}} onPress={this.onDelete}>
              <Text style={{color:'white'}}>Delete Deck</Text>
            </TouchableOpacity>
        </View>
        )}
      </View>
    );
  }
}

function mapStateToProps(decks, { route }){
  const { deckTitle } = route.params;
  const deck = decks[deckTitle];
  return {
    deck,
  }
}

export default connect(mapStateToProps)(DeckPage);