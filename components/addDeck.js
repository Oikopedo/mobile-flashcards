import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, 
  Text, 
  KeyboardAvoidingView, 
  TextInput,
  Keyboard
} from 'react-native';
import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions';
import { SubmitBtn } from './addCard';
import { styles } from '../utils/style';

class AddDeck extends Component{
  state={
    title:""
  };

  submit = () => {

    if (this.state.title===""){
      alert("Cant submit an empty title");
      return;
    }

    if (this.props.decks[this.state.title]!==undefined){
      alert("This deck already exists, please choose another title");
      return;
    }

    Keyboard.dismiss();

    const { dispatch, navigation } = this.props;
    const { title } = this.state;

    navigation.goBack();

    dispatch(addDeck(title));

    saveDeckTitle(title);

    this.setState({
      title:""
    });

  };

  render(){
    return (
      <View style={styles.generalView}>
        <Text style={{fontSize:16, textAlign:"center", marginVertical:20}}>
          What is the title of your new deck?
        </Text>
        <KeyboardAvoidingView behavior="padding">
          <TextInput defaultValue={this.state.title} style={styles.inputStyle} onChangeText={(text) => (this.setState({ title:text }))}/>
        </KeyboardAvoidingView>
        <SubmitBtn onPress={this.submit}/>
      </View>
    );
  }
}

function mapStateToProps(decks){
  return {
    decks,
  };
}

export default connect(mapStateToProps)(AddDeck);