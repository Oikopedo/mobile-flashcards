import React from 'react';
import { View, Text } from 'react-native';

export default function Deck ({ title, questions }) {
  //console.log(title);
  //console.log(questions);
  return (
    <View style={{marginVertical:20}}>
      <View style={{alignItems:"center"}}>
        <Text style={{fontSize:30}}>{title}</Text>
      </View>
      <View style={{alignItems:"center"}}>
        <Text style={{fontSize:16}}>Cards: {questions.length}</Text>
      </View>
    </View>
  );
}