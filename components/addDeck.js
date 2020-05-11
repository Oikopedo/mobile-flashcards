import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, 
  Text, 
  KeyboardAvoidingView, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Keyboard
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions';

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

function SubmitBtn({ onPress }){
  return (
    <TouchableOpacity style={styles.androidSubmitBtn}
      onPress = {onPress}>
      <Text style = {styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends Component{
  state={
    title:""
  };

  toHome = () =>{
    this.props.navigation.dispatch(CommonActions.goBack());
  }

  submit = () => {

    if (this.state.title===""){
      alert("Cant submit an empty title");
      return;
    }

    if (this.props.decks[this.state.title]!==undefined){
      alert("This deck already exists, please choose another title");
      return;
    }

    Keyboard.dismiss()

    const { dispatch, navigation } = this.props;
    const { title } = this.state;

    dispatch(addDeck(title));

    saveDeckTitle(title);

    this.setState({
      title:""
    });

    navigation.goBack();
  };

  render(){
    return (
      <View style={{margin:8, flex:1}}>
        <Text style={{fontSize:16, textAlign:"center", marginVertical:20}}>
          What is the title of your new deck?
        </Text>
        <KeyboardAvoidingView behavior="padding">
          <TextInput defaultValue={this.state.title} style={styles.line} onChangeText={(text) => (this.setState({ title:text }))}/>
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