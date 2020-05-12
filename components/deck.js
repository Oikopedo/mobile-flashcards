import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

function Deck ({ title, questions }) {
  return (
    <View>
      { title &&
      <View style={{ marginVertical: 20 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30 }}>{title}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize:16 }}>Cards: {questions.length}</Text>
        </View>
      </View>}
    </View>
  );
}

function mapStateToProps({ decks },{ deckTitle }){
  const deck = decks.filter((deck) => (deck.title === deckTitle));
  return {
    ...deck[0],
  }
}

export default connect(mapStateToProps)(Deck);