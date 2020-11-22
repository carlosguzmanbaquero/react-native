import React, { Component } from 'react';
import { View, FlatList, Text, ScrollView } from 'react-native';
import { ListItem, Avatar, Card } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';

function History() {
    return(
        <Card>
            <Card.Title>Our History</Card.Title>
            <Card.Divider/>
            <Text
                style={{margin: 10}}>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.

                The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
            </Text>
        </Card>
    );
}

function Leadership(props) {
    return(
        <Card>
            <Card.Title>Corporate Leadership</Card.Title>
            <Card.Divider/>
           <Leaders leaders={props.leaders}/>
        </Card>
    );
}

function Leaders(props) {
    
    const renderLeaders = ({item, index}) => {

        return (    
            <ListItem key={index}>
                <Avatar rounded source={{ uri:'https://i0.wp.com/globomiami.com/wp-content/uploads/2020/09/avatar-publicity_still-h_2019-compressed.jpg'}} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>  
        );
    };

    return (
            
        <FlatList 
            data={props.leaders}
            renderItem={renderLeaders}
            keyExtractor={leader => leader.id.toString()}/>

    );
}

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaders: LEADERS
        };
    }

    static navigationOptions = {
        title: 'About Us'
    };

    render() {
       return (
        <ScrollView>
            <History/>
            <Leadership leaders={this.state.leaders}/>
        </ScrollView>
       );
    }
}


export default About;