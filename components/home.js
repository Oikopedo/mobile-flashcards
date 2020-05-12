import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Deck from './deck';
import { getDecks } from '../utils/api';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions/index'
import { styles } from '../utils/style';

function Home({ dispatch, navigation, decks }){

  useEffect(() => {
    getDecks().then((decks) => dispatch(receiveDecks(decks)));
  }, []);

  const renderDeck = ({ item })  => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(
        'DeckPage',
        { deckTitle: item.title }
      )}>
        <Deck { ...item }/>
      </TouchableOpacity>);
  };

  return (
    <View style={{ flex:1 }}>
      {decks.length === 0 ?
      <View style={styles.generalView}>
        <Text style={{ fontSize:30, textAlign:"center" }}>There are no decks, please add a deck</Text>
      </View>:
      <View>
        <FlatList data={decks} renderItem={renderDeck} keyExtractor={(item) => (item.title)}/>
      </View>}
    </View>
  );
}

function mapStateToProps({ decks }){
  return{
    decks,
  };
}

export default connect(mapStateToProps)(Home);