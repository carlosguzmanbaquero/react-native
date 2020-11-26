import React, { Component } from 'react';
import { FlatList, View, Text, TouchableOpacity, Animated, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { deleteFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    };

    render() {
        const renderMenuItem = ({item, index}) => {
            const rightButton = (progress, dragX) => {
                const scale = dragX.interpolate({
                    inputRange: [-100, 0],
                    outputRange: [0.7, 0]
                })
                return(
                    <>
                        <TouchableOpacity onPress={() =>{ 
                            Alert.alert(
                                'Delete Favorite?',
                                'Are you sure you wish to delete the favorite dish ' + item.name + '?',
                                [
                                    { 
                                        text: 'Cancel', 
                                        onPress: () => console.log(item.name + 'Not Deleted'),
                                        style: ' cancel'
                                    },
                                    {
                                        text: 'OK',
                                        onPress: () => this.props.deleteFavorite(item.id)
                                    }
                                ],
                                { cancelable: false }
                            );
                        }}>
                            <View style={{flex:1, backgroundColor: 'red', justifyContent: 'center'}}>
                                <Animated.Text style={{color: 'white', paddingHorizontal: 10,
                                        fontWeight:'600', transform: [{scale}]}}>
                                            Delete
                                </Animated.Text>
                            </View>
                        </TouchableOpacity>
                    </>
                );
            }
            return(
                <Swipeable renderRightActions={rightButton}>
                 <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        onPress={() => navigate('Dishdetail', { dishId: item.id })}
                        leftAvatar={{ source: {uri: baseUrl + item.image}}}
                        />
                </Swipeable>
            );
        }

        const { navigate } = this.props.navigation;

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <FlatList 
                    data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
            );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites);