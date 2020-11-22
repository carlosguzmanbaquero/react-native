import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card >
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={{ uri:'https://i0.wp.com/globomiami.com/wp-content/uploads/2020/09/avatar-publicity_still-h_2019-compressed.jpg'}} />
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => /*props.favorite ? console.log('Already favorite',props.favorite) :*/ props.onPress()}
                    />             
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card >
            <Card.Title>Comments</Card.Title>
            <FlatList vertical
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
        </Card>
    );
}

class DishDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            favorites: []
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        this.setState({favorites: this.state.favorites.concat(dishId)});
    }

    render() {
        const dishId = this.props.route.params.dishId;
        
        return(
            
            <ScrollView vertical>
                <RenderDish dish={this.state.dishes[+dishId]} 
                 favorite={this.state.favorites.some(el => el === dishId)}
                 onPress={() => this.markFavorite(dishId)} />
                <RenderComments comments={this.state.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
                
        );
    }

}

export default DishDetail;