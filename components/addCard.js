import React, { Component } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  KeyboardAvoidingView
} from 'react-native';
import { submitCard } from '../utils/api';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { styles } from '../utils/style'

export function SubmitBtn({ onPress }){
  return (
    <TouchableOpacity style={{...styles.button,backgroundColor: 'purple'}}
      onPress = {onPress}>
      <Text style = {{...styles.buttonText,fontSize: 22}}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddCard extends Component{

  state = {
    question: '',
    answer: ''
  };

  onChangeText = (key, text) =>{
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

    navigation.goBack();
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

export default connect(mapStateToProps)(AddCard);