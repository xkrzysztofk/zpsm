
import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

let points=0;

const tasks = [{
  "id":1,
  "question": "Podaj wzór na delte?",
  "answers":[
    {"content":"b^2-4ac",
      "isCorrect":true
    },
    {"content":"a^2+bc",
      "isCorrect":false
    },
    {"content":"c^2-c+b",
      "isCorrect":false
    },
    {"content":"a^2",
      "isCorrect":false
    },
  ],
},
{
  "id":2,
  "question": "Jaką liczbą jest 0?",
  "answers":[
    {"content":"Parzystą",
      "isCorrect":false
    },
    {"content":"Nieparzystą",
      "isCorrect":false
    },
    {"content":"Nie wiadomo",
      "isCorrect":false
    },
    {"content":"0 jest tylko zerem",
      "isCorrect":true
    },
  ],
},
{
  "id":3,
  "question": "Ile to jest 2+2?",
  "answers":[
    {"content":"4",
      "isCorrect":true
    },
    {"content":"5",
      "isCorrect":false
    },
    {"content":"8",
      "isCorrect":false
    },
    {"content":"10",
      "isCorrect":false
    },
  ],
},
]

function QuizScreen_3({ navigation }) {
const [count, setCount] = useState(0);
const onPress = () => setCount(prevCount => prevCount + 1);
const addPoint = (bool) => {if(bool){setCount(count+1)}}

    return (
      <View>
      <FlatList
        data={tasks}
        keyExtractor={tasks.id}
        renderItem={({item}) => (
          <View style={styles.container}>
          <Text><h1>{item.question}</h1></Text>
          <Text style={styles.answer_container}>
            {item.answers.map((answer,index) => {return(<TouchableOpacity onPress={() => {addPoint(answer.isCorrect)}} style={styles.single_answer}>{answer.content}</TouchableOpacity>)})}
          </Text>
          </View>
        )}
        />
        <TouchableOpacity
        onPress={() => navigation.navigate('FinishQuizScreen',{count})} style={styles.submit}>Submit</TouchableOpacity>
        </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      display:'flex',
      margin:15,
      padding:5,
      height:"25vh",
      borderWidth:2,
      borderRadius:10,
    },
    answer_container: {
      display:'flex',
      justifyContent:'space-around',
      margin:20,
    },
    single_answer: {
      padding:5,
      borderRadius:20,
      backgroundColor:'rgb(72, 117, 0)',
      color:"white",
    },
    submit:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      padding:5,
      width:'15%',
      marginLeft:'45%',
      borderRadius:20,
      backgroundColor:'rgb(50, 71, 209)',
      color:"white",
    },
  });
export default QuizScreen_3;