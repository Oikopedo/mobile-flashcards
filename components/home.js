import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Deck from './deck';
import { getDecks } from '../utils/api';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions/index'
import { styles } from '../utils/style';

class Home extends Component{

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
        <Deck { ...item }/>
      </TouchableOpacity>);
  };

  render(){
    const { decks } =this.props
    const values = Object.values(decks)
    return (
      <View style={{flex:1}}>
        {values.length === 0 ?
        <View style={styles.generalView}>
          <Text style={{ fontSize:30, textAlign:"center" }}>There are no decks, please add a deck</Text>
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

export default connect(mapStateToProps)(Home);