import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card>
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={{ uri:'https://i0.wp.com/globomiami.com/wp-content/uploads/2020/09/avatar-publicity_still-h_2019-compressed.jpg'}} />
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>                
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function Dishdetail(props) {
    return(<RenderDish dish={props.dish} />);
}

export default Dishdetail;