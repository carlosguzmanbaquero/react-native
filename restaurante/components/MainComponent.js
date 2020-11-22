import React, { Component } from 'react';
import Home from './HomeComponent';
import Dishdetail from './DishdetailComponent';
import Menu from './MenuComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();

const HomeStackNavigator = () => {
    return (
        <HomeNavigator.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff"            
            }
        }}>
        <HomeNavigator.Screen
            name="Home"
            component={Home}
        />           
    </HomeNavigator.Navigator>
    );
  };

const MenuStackNavigator = () => {
    return (
        <MenuNavigator.Navigator
        initialRouteName='Menu'
        screenOptions={{
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff"            
            }
        }}>
        <MenuNavigator.Screen
            name="Menu"
            component={Menu}
        />
        <MenuNavigator.Screen
            name="Dishdetail"
            component={Dishdetail}
            options={{ headerTitle: "Dish Detail"}}
        />            
    </MenuNavigator.Navigator>
    );
  };

function MainNavigatorScreen() {
    return (
      <MainNavigator.Navigator>
        <MainNavigator.Screen name="Home" component={HomeStackNavigator} />
        <MainNavigator.Screen name="Menu" component={MenuStackNavigator} />
      </MainNavigator.Navigator>
    );
}

class Main extends Component {

  render() {
 
    return (
        <NavigationContainer>
            <MainNavigatorScreen/>        
        </NavigationContainer>
    );
  }
}
  
export default Main;