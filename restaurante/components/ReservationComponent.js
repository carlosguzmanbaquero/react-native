import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, TouchableOpacity, Alert } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import * as Animatable from 'react-native-animatable';
//import * as Notifications from 'expo-notifications'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false,
            show: false,
            mode: 'date'
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async obtainCalendarPermission(){
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        console.log('Here are all your calendars:');
        console.log({ calendars });
        }
    }

    async presentLocalNotification(date) {
        
        await this.obtainNotificationPermission();

        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }
/*
    async presentLocalNotification2(date) {
        await this.obtainNotificationPermission();
        // Prepare the notification channel
        Notifications.setNotificationChannelAsync('restaurante', {
            name: 'restaurante',
            importance: Notifications.AndroidImportance.HIGH,
        });

        // Eg. schedule the notification
        Notifications.scheduleNotificationAsync({
            content: {
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            //sound: 'email-sound.wav', // <- for Android below 8.0
            },
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            },
            trigger: {
            seconds: 2,
            channelId: 'restaurante', // <- for Android 8.0+, see definition above
            },
        });
    }*/

    handleReservation() {
        console.log(JSON.stringify(this.state));
        //this.toggleModal();

        Alert.alert(
            '','You Reservation OK?\n\nNumber of Guests: '+this.state.guests+'\nSmoking? '+(this.state.smoking?'Yes':'No')+'\nDate and Time: '+this.state.date,
            [
            {text: 'Cancel', onPress: () => {this.resetForm()}, style: 'cancel'},
            {text: 'OK', onPress: () =>  {
                //envia una notificacion de la reserva
                this.presentLocalNotification(this.state.date);

                //Agrega al calendario el evento
                this.addReservationToCalendar(this.state.date);

                this.resetForm() }}
            ],
            { cancelable: false }
        );
    }

    addReservationToCalendar(date){
        this.createCalendar(date);
    }

    async getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
    }

    async createCalendar(date) {
        await this.obtainCalendarPermission();
        
        //suma dos horas a la fecha
        fechaFin = new Date(date);
		fechaFin.setHours(fechaFin.getHours()+2);

        const defaultCalendarSource =
            Platform.OS === 'ios'
            ? await getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'Con Fusion' };

        const newCalendarID = await Calendar.createCalendarAsync({
            title: 'Con Fusion Table Reservation',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
            startDate: date,
            endDate: fechaFin,
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        });
        console.log(`Your new calendar ID is: ${newCalendarID}`);
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false,
            show: false,
            mode: 'date'
        });
    }
    
    render() {
  

        return(
            <ScrollView>
                <Animatable.View animation="zoomInUp" duration={2000} delay={1000}>
                    <Card>
                        <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                        </Picker>
                        </View>
                        <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            onTintColor='#512DA8'
                            onValueChange={(value) => this.setState({smoking: value})}>
                        </Switch>
                        </View>
                        
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Date and Time</Text>
                            <TouchableOpacity style={styles.formItem}
                                    style={{
                                        padding: 7,
                                        borderColor: '#512DA8',
                                        borderWidth: 2,
                                        flexDirection: "row"
                                    }}
                                    onPress={() => this.setState({ show: true, mode: 'date' })}>
                                <Icon type='font-awesome' name='calendar' color='#512DA8' />
                                <Text >
                                    {' ' + Moment(this.state.date).format('DD-MMM-YYYY h:mm A') }
                                </Text>
                            </TouchableOpacity>
                            {/* Date Time Picker */}
                            {this.state.show && (
                                <DateTimePicker
                                    value={this.state.date}
                                    mode={this.state.mode}
                                    minimumDate={new Date()}
                                    minuteInterval={30}
                                    onChange={(event, date) => {
                                        if (date === undefined) {
                                            this.setState({ show: false });
                                        }
                                        else {
                                            this.setState({
                                                show: this.state.mode === "time" ? false : true,
                                                mode: "time",
                                                date: new Date(date)
                                            });
                                        }
                                    }}
                                />
                            )}
                        </View>
                        
                        <View style={styles.formRow}>
                        <Button
                            onPress={() => this.handleReservation()}
                            title="Reserve"
                            color="#512DA8"
                            accessibilityLabel="Learn more about this purple button"
                            />
                        </View>
                    </Card>
                </Animatable.View>

                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {Moment(new Date(this.state.date)).format('DD-MMM-YYYY h:mm A')}</Text>
                        
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Close" 
                            />
                    </View>
                </Modal>
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;