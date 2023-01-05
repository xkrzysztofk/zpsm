import * as React from 'react';
import { View, Text, Button, TouchableHighlight, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function FinishQuizScreen({ route,navigation }) {
    const {count,total,type} = route.params;
    
    function sendResult() {
        console.log(count, type, total)
        try {
        fetch('https://tgryl.pl/quiz/result', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            nick: 'Krzysztof',
            score: count,
            total: total,
            type: type
            })
        })}catch(error){
            console.log(error)
        };
    };

    return (
        <View style={styles.container}>
            <h1>Twój wynik to: {count} / {total}</h1> 
            <TouchableOpacity onPress={sendResult} style={styles.goto_button}>Prześlij wynik</TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create ({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
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
})
export default FinishQuizScreen;