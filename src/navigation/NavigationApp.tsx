/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import DetailScreen from '../screens/DetailBook';
import BorrowedBooks from '../screens/BorrowedBooks';
import BorrowBook from '../screens/BorrowBook';
import Login from '../screens/Login';
import AdminDashboard from '../screens/Books';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Detail" component={DetailScreen} />
    <Stack.Screen name="BorrowedBooks" component={BorrowedBooks} />
    <Stack.Screen name="BorrowBook" component={BorrowBook} />
  </Stack.Navigator>
);

const AdminStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'HomeStack') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'BorrowedBooks') {
          iconName = focused ? 'book' : 'book-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#133E87',
      tabBarInactiveTintColor: '#666',
    })}>
    <Tab.Screen
      name="HomeStack"
      component={HomeStack}
      options={{title: 'Beranda', headerShown: false}}
    />
    <Tab.Screen
      name="BorrowedBooks"
      component={BorrowedBooks}
      options={{title: 'Pinjaman', headerShown: false}}
    />
  </Tab.Navigator>
);

const MainNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="App" component={TabNavigator} />
    <Stack.Screen name="Admin" component={AdminStack} />
  </Stack.Navigator>
);

export default MainNavigator;
