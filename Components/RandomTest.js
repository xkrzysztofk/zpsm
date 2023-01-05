
import React, {useState,useEffect} from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';


function RandomTest({navigation}) {
    const [isLoading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
  
    React.useEffect(() => {
      fetch('https://tgryl.pl/quiz/tests')
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setData(json)
        })
        .catch((error) => alert(error))
        .finally(setLoading(false));
    },[]);

    const randNum = Math.floor(Math.random() * 3) + 0;
    console.log(randNum)

  return (
      <View>
        <TouchableHighlight onPress={() => navigation.navigate('Quiz_1', {testId:data[randNum].id, type: data[randNum].tags[0]})} style={styles.goto_button}>
            <Text>Wygeneruj losowy quiz</Text>
        </TouchableHighlight>

      </View>
  );
}
const styles = StyleSheet.create ({
    goto_button: {
        textAlign:'center',
        borderWidth: 1,
        height:30,
        width:'25%',
        textAlignVertical:'center',
        fontSize: 18,
        backgroundColor: 'grey',
        padding:5
    }
})
export default RandomTest;