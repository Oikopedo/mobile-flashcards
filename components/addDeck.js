import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, 
  Text, 
  KeyboardAvoidingView, 
  TextInput,
  Keyboard,
  TouchableOpacity
} from 'react-native';
import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions';
import { styles } from '../utils/style';

class AddDeck extends Component{

  state={
    title: ''
  };

  submit = () => {

    const { dispatch, navigation, quiz } = this.props;
    const { title } = this.state;

    if (title === ''){
      alert("Cant submit an empty title");
      return;
    }

    if (quiz[title]){
      alert("This deck already exists, please choose another title");
      return;
    }

    Keyboard.dismiss();

    navigation.goBack();

    dispatch(addDeck(title));

    saveDeckTitle(title);

    this.setState({
      title: ''
    });

  };

  render(){
    return (
      <View style={styles.generalView}>
        <Text style={{ fontSize: 16, textAlign: "center", marginVertical: 20 }}>
          What is the title of your new deck?
        </Text>
        <KeyboardAvoidingView behavior="padding">
          <TextInput defaultValue={this.state.title} style={styles.inputStyle} 
            onChangeText={(text) => (this.setState({ title: text }))}/>
        </KeyboardAvoidingView>
        <TouchableOpacity style={{ ...styles.button, backgroundColor: 'purple' }}
          onPress = {this.submit}>
          <Text style = {{ ...styles.buttonText, fontSize: 22 }}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps({ quiz }){
  return {
    quiz,
  };
}

export default connect(mapStateToProps)(AddDeck);