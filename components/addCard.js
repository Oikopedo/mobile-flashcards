import React, { Component } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import { submitCard } from '../utils/api';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { styles } from '../utils/style'

class AddCard extends Component{

  state = {
    question: '',
    answer: ''
  };

  onChangeText = (key, text) =>{
    this.setState({
      [key]: text,
    });
  };

  submit = () => {

    const { question, answer } = this.state;

    if (question === '' || answer === ''){
      alert('Question and Answer must be filled');
      return;
    }

    Keyboard.dismiss();

    const { dispatch, deckTitle, navigation } = this.props;

    navigation.goBack();

    dispatch(addCard(deckTitle,{ ...this.state }));

    submitCard(deckTitle,{ ...this.state });

    this.setState({
      question: '',
      answer: ''
    });

  };

  render(){
    return (
      <View style = {styles.generalView}>
        {Object.keys(this.state).map((key) => (
          <KeyboardAvoidingView key = {key} behavior = 'padding'>
            <TextInput style={styles.inputStyle}
              placeholder = {key}
              value = {this.state[key]}
              onChangeText = {(text) => (this.onChangeText(key, text))}
            />
          </KeyboardAvoidingView>
        ))}
        <TouchableOpacity style={{ ...styles.button, backgroundColor: 'purple' }}
          onPress = {this.submit}>
          <Text style = {{ ...styles.buttonText, fontSize: 22 }}>SUBMIT</Text>
        </TouchableOpacity>
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

export default connect(mapStateToProps)(AddCard);