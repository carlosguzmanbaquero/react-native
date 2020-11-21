import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

function Menu(props) {

    const renderMenuItem = ({item, index}) => {

        return (            
                <ListItem key={index}  onPress={() => props.onPress(item.id)}>
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
                data={props.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
    );
}


export default Menu;