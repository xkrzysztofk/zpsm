import * as React from 'react';
import { View, Text, Button, TouchableHighlight, StyleSheet, FlatList } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';

var _ = require('lodash');

function HomeScreen({ navigation,tests }) {
    const [isLoading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
    console.log(tests)
    // NetInfo.fetch().then(state => {
    //     console.log("Connection type", state.type);
    //     console.log("Is connected?", state.isConnected);
    //     if(state.isConnected == false){
            
    //       setData(tests)
    //     }
    //   });
    
    React.useEffect(() => {
        AsyncStorage.getItem('@tests')
                    .then((value) => JSON.parse(value))
                    .then((value) => setData(value));
    },[]);
    
    // React.useEffect(() => {
    //   fetch('https://tgryl.pl/quiz/tests')
    //     .then((response) => response.json())
    //     .then((json) => {

    //       setData(json)
    //     })
    //     .catch((error) => alert(error))
    //     .finally(setLoading(false));
    // },[]);

    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
        data={_.shuffle(data)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
        <View style={styles.middle}>
            <Text><h1>{item.name}</h1></Text>
            <Text>{item.description}</Text>
            <Text>Poziom trudności: {item.level}</Text>
            <Text>Liczba pytań: {item.numberOfTasks}</Text>
            <TouchableHighlight onPress={() => navigation.navigate('Quiz_1', {testId:item.id, type: item.tags[0]})} style={styles.goto_button}><Text>Przejdź do quizu</Text></TouchableHighlight>
        </View>
        )}
      />
            <View style={styles.result_container}>
                <h1>Get to know your ranking result</h1>
                <TouchableHighlight
                    onPress={() => navigation.navigate('Result')}
                    styles={{position:'relative',left:50}}
                >
                    <Text
                    style={styles.goto_button}
                    >Go to Results</Text>
                </TouchableHighlight>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    result_container: {
        backgroundColor: "darkgrey",
        borderWidth: 3,
        margin: 15,
        padding: 5
    },
    middle: {
        backgroundColor: "beige",
        borderWidth: 4,
        margin:15,
        padding:5
    },
    goto_button: {
        textAlign:'center',
        borderWidth: 1,
        height:30,
        textAlignVertical:'center',
        fontSize: 18,
        backgroundColor: 'grey',
        padding:5
    }
});
export default HomeScreen;