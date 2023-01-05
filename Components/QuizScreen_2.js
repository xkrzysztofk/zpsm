
import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

let points=0;

const tasks = [{
  "id":1,
  "question": "Czy pingwiny mają kolana?",
  "answers":[
    {"content":"Tak, chociaż ich nie używają",
      "isCorrect":true
    },
    {"content":"Nie",
      "isCorrect":false
    },
    {"content":"Tak",
      "isCorrect":false
    },
    {"content":"Nie, ale drugie nie",
      "isCorrect":false
    },
  ],
},
{
  "id":2,
  "question": "Jak sie nazywa samica żubra?",
  "answers":[
    {"content":"Krowa",
      "isCorrect":true
    },
    {"content":"Żubrówka",
      "isCorrect":false
    },
    {"content":"Żubrzyca",
      "isCorrect":true
    },
    {"content":"Byk",
      "isCorrect":false
    },
  ],
},
{
  "id":3,
  "question": "Co było pierwsze jajko czy kura?",
  "answers":[
    {"content":"Kura",
      "isCorrect":false
    },
    {"content":"Jajko",
      "isCorrect":false
    },
    {"content":"Oba",
      "isCorrect":false
    },
    {"content":"Nie wiadomo",
      "isCorrect":true
    },
  ],
},
]

function QuizScreen_2({ navigation }) {
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
export default QuizScreen_2;