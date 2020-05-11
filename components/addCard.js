import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { submitCard } from '../utils/api';
import { connect } from 'react-redux';
import { addCard } from '../actions';

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
    height: 45,
    borderRadius:2,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  }
})

function SubmitBtn({ onPress }){
  return (
    <TouchableOpacity style={styles.androidSubmitBtn}
      onPress = { onPress }>
      <Text style = {styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddCard extends Component{

  state = {
    question : '',
    answer : ''
  };

  onChangeText = ( key, text ) =>{
    this.setState({
      [key] : text,
    });
  };

  submit = () => {

    const { dispatch, deckTitle, navigation } = this.props;

    dispatch(addCard(deckTitle,{ ...this.state }));

    submitCard(deckTitle,{...this.state});

    this.setState({
      question: '',
      answer: ''
    });

    navigation.goBack()

    /*const card = this.state;
    const key = uuidv4();
    //Update Redux
    this.props.dispatch(addCard({
      [key]:card,
    }))

    //Navigate Home
    //Save Db
    submitCard({ card, key })

    this.setState({
      Question : '',
      Answer : '',
    });

    alert( "Submitted" );*/
  };

  render(){
    const state = this.state
    return (
      <View style = {styles.all}>
        {Object.keys(state).map((key) => (
          <KeyboardAvoidingView key = { key } behavior = 'padding'>
            <TextInput style={styles.line}
              placeholder = {key}
              value = {state[key]}
              onChangeText = {(text) => (this.onChangeText(key, text))}
            />
          </KeyboardAvoidingView>
        ))}
        <SubmitBtn onPress = {this.submit}/>
      </View>
    );
  }
}

function mapStateToProps(_, { route }){
  const { deckTitle } = route.params;
  return {
    deckTitle,
  }
}

export default connect(mapStateToProps)(AddCard)