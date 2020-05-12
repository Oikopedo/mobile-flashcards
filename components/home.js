import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Deck from './deck';
import { getDecks } from '../utils/api';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions/index'
import { styles } from '../utils/style';

function Home({ receiveDecks, navigation, order }){

  useEffect(() => {
    getDecks().then((decks) => receiveDecks(decks));
  }, []);

  const renderDeck = ({ item })  => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(
        'DeckPage',
        { deckTitle: item }
      )}>
        <Deck deckTitle={item}/>
      </TouchableOpacity>);
  };
  
  return (
    <View style={{ flex:1 }}>
      {order.length === 0 ?
      <View style={styles.generalView}>
        <Text style={{ fontSize:30, textAlign:"center" }}>There are no decks, please add a deck</Text>
      </View>:
      <View>
        <FlatList data={order} renderItem={renderDeck} keyExtractor={(item) => (item)}/>
      </View>}
    </View>
  );
}

function mapStateToProps({ order }){
  return{
    order,
  };
}

export default connect(mapStateToProps, { receiveDecks })(Home);