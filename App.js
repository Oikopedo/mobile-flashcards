import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Constants from 'expo-constants';
import reducer from './reducers';
import Home from './components/home';
import AddDeck from './components/addDeck';
import AddCard from './components/addCard';
import DeckPage from './components/deckPage';
import Quiz from './components/quiz';
import { setLocalNotification } from './utils/helpers';

const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const options = {
  headerStyle: {
    backgroundColor: 'purple'
  },
  headerTintColor: 'white'
};

function CustomStatusBar({ backgroundColor, ...props }){
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} { ...props }/>
    </View>
  );
}

function HomeTab(){
  return (
    <Tab.Navigator  tabBarOptions={{ activeTintColor: 'white',
      style: { backgroundColor: 'purple' }}}>
      <Tab.Screen name="Decks" component={Home} />
      <Tab.Screen name="AddDeck" component={AddDeck} />
    </Tab.Navigator>
  );
}

export default function App() {
  
  useEffect(() => {
    setLocalNotification();
  },[]);

  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <CustomStatusBar backgroundColor='purple' barStyle='light-content'/>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeTab} 
              options={{ headerShown: false }}/>
            <Stack.Screen name="DeckPage" component={DeckPage} 
              options={{ ...options, title: '' }}/>
            <Stack.Screen name="AddCard" component={AddCard} 
              options={({ route }) => ({ title: 'Add Card to '
              +route.params.deckTitle, ...options })}/>
            <Stack.Screen name="Quiz" component={Quiz} 
              options={({ route }) => ({ title: 'Quiz on '
              +route.params.deckTitle, ...options })}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
