import React, { useState, useCallback, useEffect } from 'react'
import Chat from'./src/Chat'
import Room from'./src/Room'
import Login from'./src/Login'
import Register from'./src/Register'
import RoomList from'./src/RoomList'
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"

const AppStackNavigator = createStackNavigator({
  Register: { screen: Register, navigationOptions:{
    headerShown: false
  } },
  // Room: { screen: Room },
  RoomList: { screen: RoomList, navigationOptions:{
    headerShown: false
  } },
  Chat: { screen: Chat, navigationOptions:{
    headerShown: false
  } }
});

const App = createAppContainer(AppStackNavigator);

export default App;