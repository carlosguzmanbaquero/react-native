import React, { Component } from 'react';
import Dishdetail from './DishdetailComponent';
import Menu from './MenuComponent';
import { View, Platform } from 'react-native';
//import { createStackNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            }
        }
    }
);

class Main extends Component {

  render() {
 
    return (
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : 0}}>
        <MenuNavigator />
    </View>
    );
  }
}
  
export default Main;