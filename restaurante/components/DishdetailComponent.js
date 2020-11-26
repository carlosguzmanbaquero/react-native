import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Modal, Button, TextInput } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card >
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={{ uri: baseUrl + dish.image}} />
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={styles.viewIcons}>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => /*props.favorite ? console.log('Already favorite',props.favorite) :*/ props.onPress()}
                    />

                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => /*props.favorite ? console.log('Already favorite',props.favorite) :*/ props.onPressComment()}
                    />        
                    </View>     
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
                <View style={styles.leftContainer}>
                <Rating imageSize={12}
                    readonly='true'
                    startingValue = {item.rating}/>
                </View>
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
            favorites: [],
            showModal: false,
            rating: 1,
            author: '',
            comment: ''
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        //this.setState({favorites: this.state.favorites.concat(dishId)});
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment() {
        console.log(JSON.stringify(this.state));
        this.props.postComment(this.props.route.params.dishId, this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
        this.resetForm();
    }

    resetForm() {
        this.setState({
            showModal: false,
            rating: 1,
            author: '',
            comment: ''
        });
    }

    render() {
        const dishId = this.props.route.params.dishId;
        
        return(
            
            <ScrollView vertical>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                 favorite={this.props.favorites.some(el => el === dishId)}
                 onPress={() => this.markFavorite(dishId)} 
                 onPressComment={() => this.toggleModal()} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View>
                        
                        <Rating
                            showRating 
                            onFinishRating={(rating) => {
                                this.setState({
                                rating: rating
                                });
                                }
                            }
                            startingValue = {this.state.rating}
                            />

                        <Input
                        placeholder="Author"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={value => this.setState({ author: value })}
                        />

                        <Input
                        placeholder="Comment"
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        onChangeText={value => this.setState({ comment: value })}
                        />
                        
                        <Button 
                            onPress = {() =>{this.handleComment();}}
                            color="#512DA8"
                            title="SUBMIT" 
                            />
                        <Text/>
                        <Button 
                            onPress = {() =>{this.toggleModal();}}
                            color="#808080"
                            title="CANCEL" 
                            />
                    </View>
                </Modal>
            </ScrollView>
                
        );
    }

}

const styles = StyleSheet.create({
    viewIcons: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
      },

  });

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);