import React, { Component } from 'react';
import Home from './HomeComponent';
import Dishdetail from './DishdetailComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { View, Text, ScrollView, Image, StyleSheet, SafeAreaView, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import NetInfo from "@react-native-community/netinfo";

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const ReservationNavigator = createStackNavigator();
const FavoriteNavigator = createStackNavigator();
const LoginNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();

const HomeStackNavigator = ({navigation}) => {
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
            options={{
                headerLeft: () => (
                    <Icon name="menu" size={24} 
                    color= 'white'
                    onPress={ () => navigation.toggleDrawer() } />    
                ),
              }}
        />           
    </HomeNavigator.Navigator>
    );
};

const ContactStackNavigator = ({navigation}) => {
    return (
        <ContactNavigator.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff"            
            }
        }}>
        <ContactNavigator.Screen
            name="Contact Us"
            component={Contact}
            options={{
                headerLeft: () => (
                    <Icon name="menu" size={24} 
                    color= 'white'
                    onPress={ () => navigation.toggleDrawer() } />    
                ),
              }}
        />           
    </ContactNavigator.Navigator>
    );
};

const AboutStackNavigator = ({navigation}) => {
    return (
        <AboutNavigator.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff"            
            }
        }}>
        <AboutNavigator.Screen
            name="About Us"
            component={About}
            options={{
                headerLeft: () => (
                    <Icon name="menu" size={24} 
                    color= 'white'
                    onPress={ () => navigation.toggleDrawer() } />    
                ),
              }}
        />           
    </AboutNavigator.Navigator>
    );
};

const MenuStackNavigator = ({navigation}) => {
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
        }} 
        >
        <MenuNavigator.Screen
            name="Menu"
            component={Menu}
            options={{
                headerLeft: () => (
                    <Icon name="menu" size={24} 
                    color= 'white'
                    onPress={ () => navigation.toggleDrawer() } />    
                ),
              }}
        />
        <MenuNavigator.Screen
            name="Dishdetail"
            component={Dishdetail}
        />            
    </MenuNavigator.Navigator>
    );
};

const ReservationStackNavigator = ({navigation}) => {
    return (
        <ReservationNavigator.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff"            
            }
        }}>
        <ReservationNavigator.Screen
            name="Reservation"
            component={Reservation}
            options={{
                headerLeft: () => (
                    <Icon name="menu" size={24} 
                    color= 'white'
                    onPress={ () => navigation.toggleDrawer() } />    
                ),
              }}
        />           
    </ReservationNavigator.Navigator>
    );
};

const FavoriteStackNavigator = ({navigation}) => {
    return (
        <FavoriteNavigator.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff"            
            }
        }}>
        <FavoriteNavigator.Screen
            name="Favorites"
            component={Favorites}
            options={{
                headerLeft: () => (
                    <Icon name="menu" size={24} 
                    color= 'white'
                    onPress={ () => navigation.toggleDrawer() } />    
                ),
              }}
        />           
    </FavoriteNavigator.Navigator>
    );
};

const LoginStackNavigator = ({navigation}) => {
    return (
        <LoginNavigator.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff"            
            }
        }}>
        <LoginNavigator.Screen
            name="Login"
            component={Login}
            options={{
                headerLeft: () => (
                    <Icon name="menu" size={24} 
                    color= 'white'
                    onPress={ () => navigation.toggleDrawer() } />    
                ),
              }}
        />           
    </LoginNavigator.Navigator>
    );
};

function MainNavigatorScreen() {
    return (
      <MainNavigator.Navigator drawerContent={(props) => <CustomDrawerContentComponent {...props} />} initialRouteName="Home">
        
        <MainNavigator.Screen name="Login" component={LoginStackNavigator} options={{ drawerLabel:"Login", drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='sign-in'
              type='font-awesome'            
              size={22}
              color={tintColor}
            />
         )}} />
        <MainNavigator.Screen name="Home" component={HomeStackNavigator} options={{ drawerLabel:"home", drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          )}} />
        <MainNavigator.Screen name="Menu" component={MenuStackNavigator} options={{ drawerLabel:"Menu", drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          )}} />
        <MainNavigator.Screen name="About Us" component={AboutStackNavigator} options={{ drawerLabel:"About Us", drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info-circle'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          )}} />
        <MainNavigator.Screen name="Contact Us" component={ContactStackNavigator} options={{ drawerLabel:"Contact Us", drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='address-card'
              type='font-awesome'            
              size={22}
              color={tintColor}
            />
          )}} />

        <MainNavigator.Screen name="Reservation" component={ReservationStackNavigator} options={{ drawerLabel:"Reservation", drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='cutlery'
              type='font-awesome'            
              size={22}
              color={tintColor}
            />
         )}} />

        <MainNavigator.Screen name="Favorites" component={FavoriteStackNavigator} options={{ drawerLabel:"Favorites", drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='heart'
              type='font-awesome'            
              size={22}
              color={tintColor}
            />
         )}} />
      </MainNavigator.Navigator>
    );
}

const CustomDrawerContentComponent = (props) => {
    return (
        <ScrollView>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}>Restaurante</Text>
                </View>
            </View>
            <DrawerItemList {...props}/>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();

        NetInfo.fetch().then((connectionInfo) => {
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type, ToastAndroid.LONG)
        });
        
        NetInfo.addEventListener(connectionChange => this.handleConnectivityChange(connectionChange))
    }

    componentWillUnmount() {
        NetInfo.removeEventListener(connectionChange => this.handleConnectivityChange(connectionChange))
    }

    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
          case 'none':
            ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
            break;
          case 'wifi':
            ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
            break;
          case 'cellular':
            ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
            break;
          case 'unknown':
            ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
            break;
          default:
            break;
        }
    }

  render() {
 
    return (
        <NavigationContainer>
            <MainNavigatorScreen/>        
        </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);