import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Deck from './deck';
import { getDecks } from '../utils/api';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions/index'

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
    alignSelf:"stretch",
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  }
})

class Home extends Component{
  /*state = {
    React: {
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
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
    React2: {
      title: 'React2',
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
    },
    JavaScript2: {
      title: 'JavaScript2',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
    React3: {
      title: 'React3',
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
    },
    JavaScript3: {
      title: 'JavaScript3',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
    React4: {
      title: 'React4',
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
    },
    JavaScript4: {
      title: 'JavaScript4',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
    React5: {
      title: 'React5',
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
    },
    JavaScript5: {
      title: 'JavaScript5',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
    React6: {
      title: 'React6',
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
    },
    JavaScript6: {
      title: 'JavaScript6',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
    React7: {
      title: 'React7',
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
    },
    JavaScript7: {
      title: 'JavaScript7',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
    React8: {
      title: 'React8',
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
    },
    JavaScript8: {
      title: 'JavaScript8',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  };*/

  componentDidMount(){
    const { dispatch } = this.props;

    getDecks()
    .then((decks) => dispatch(receiveDecks(decks)))
  }

  renderDeck = ({ item })  => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.navigate(
        'DeckPage',
        { deckTitle: item.title }
      )}>
        <Deck {...item}/>
      </TouchableOpacity>);
  };

  render(){
    const { decks } =this.props
    const values = Object.values(decks)
    return (
      <View style={{margin:8, flex:1}}>
        {values.length === 0 ?
        <View style={{flex: 1, 
          alignItems: 'center',
          justifyContent: 'center'}}>
          <Text style={{fontSize:30, textAlign:"center"}}>There are no decks, please add a deck</Text>
        </View>:
        <View>
         <FlatList data={values} renderItem={this.renderDeck} keyExtractor={(item) => (item.title)}/>
         </View>}
      </View>
    );
  }
}

function mapStateToProps(decks){
  return{
    decks,
  };
}

export default connect(mapStateToProps)(Home)