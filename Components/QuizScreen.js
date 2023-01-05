
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
const tasks = [{
  "id": 1,
  "question": "Ktory wodz po smierci Gajusza Mariusza, prowadzil wojne domowa z Sulia?",
  "answers": [
    {
      "content": "LUCJUSZ CYNNA",
      "isCorrect": true
    },
    {
      "content": "LUCJUSZ MURENA",
      "isCorrect": false
    },
    {
      "content": "JULIUSZ CEZAR",
      "isCorrect": false
    },
    {
      "content": "MAREK KRASSUS",
      "isCorrect": false
    },
  ],
},
{
  "id": 2,
  "question": "W ktorym roku odbyla sie bitwa pod Grunwaldem?",
  "answers": [
    {
      "content": "1410",
      "isCorrect": true
    },
    {
      "content": "1939",
      "isCorrect": false
    },
    {
      "content": "966",
      "isCorrect": false
    },
    {
      "content": "843",
      "isCorrect": false
    },
  ],
},
{
  "id": 3,
  "question": "Ile lat trwało 20-lecie miedzywojenne",
  "answers": [
    {
      "content": "21",
      "isCorrect": true
    },
    {
      "content": "20",
      "isCorrect": false
    },
    {
      "content": "19",
      "isCorrect": false
    },
    {
      "content": "10",
      "isCorrect": false
    },
  ],
},
]

var _ = require('lodash');

function QuizScreen({ route, navigation }) {
  const { testId,type } = route.params
  const [count, setCount] = useState(0);
  const addPoint = (bool) => { if (bool) { setCount(count + 1) } }
  const [isLoading, setLoading] = React.useState(true)
  const [data, setData] = React.useState([])
  const [isAppOffline, setIsAppOffline] = React.useState(false);
  
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        // setIsAppOffline(false);
        console.log("Internet connection back");
          fetch('https://tgryl.pl/quiz/test/' + testId)
            .then((response) => response.json())
            .then((json) => {
          setData(_.shuffle(json.tasks))
        })
        .catch((error) => alert(error))
        .finally(setLoading(false));
      } else {
        // setIsAppOffline(true);
        console.log("Internet connection lost");
        AsyncStorage.getItem('@details')
                    .then((value) => JSON.parse(value))
                    .then((value) => {
                      setData(value.find(test => test.id===testId).tasks)
                      console.log(value.find(test => test.id===testId).tasks)})
      }
    });

    return () => unsubscribe();
  }, [testId]);



  return data.length > 0 ? (
    
    <View style={styles.main_view}>
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.container}>
        <Text><h1>{item.question}</h1></Text>
        <Text style={styles.answer_container}>
          {item.answers.map((answer,index) => {return(
          <TouchableOpacity onPress={() => {addPoint(answer.isCorrect)}} style={styles.single_answer}>
          {answer.content}
          </TouchableOpacity>)})}
        </Text>

        </View>
      )}
      />
    <TouchableOpacity
    onPress={() => navigation.navigate('FinishQuizScreen',{count,total: data.length,type})} style={styles.submit}>Submit</TouchableOpacity>
    </View>
  ) : null;
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    margin: 15,
    padding: 5,
    height: "25vh",
    borderWidth: 2,
    borderRadius: 10,
  },
  answer_container: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: 20,
  },
  single_answer: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'rgb(72, 117, 0)',
    color: "white",
  },
  submit: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: '15%',
    marginLeft: '45%',
    borderRadius: 20,
    backgroundColor: 'rgb(50, 71, 209)',
    color: "white",
  },
});
export default QuizScreen;