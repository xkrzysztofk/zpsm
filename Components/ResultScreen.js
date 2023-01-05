
import * as React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-web';

const results2 = [{
  "nick": "Marek",
  "score": 18,
  "total": 20,
  "type": "historia",
  "data": "2018-11-22"
},
{
  "nick": "Jarek",
  "score": 19,
  "total": 20,
  "type": "fizyka",
  "data": "2018-11-22"
},
{
  "nick": "Czarek",
  "score": 11,
  "total": 20,
  "type": "matematyka",
  "data": "2018-11-22"
},
{
  "nick": "Zuzanna",
  "score": 13,
  "total": 20,
  "type": "biologia",
  "data": "2018-11-22"
}
]


function ResultScreen({ navigation }) {

  const [isLoading, setLoading] = React.useState(true)
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    fetch('https://tgryl.pl/quiz/results')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json)
      })
      .catch((error) => alert(error))
      .finally(setLoading(false));
  },[]);



  return (
    <View >
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style= {styles.container}>
            <View style={styles.nickname}>{item.nick}</View>
            <View style={styles.points}>{item.score}/{item.total}</View>
            <View>{item.type}</View>
            <View style={styles.data}>{item.createdOn}</View>
            <View>ID gracza: {item.id}</View>
          </View>
        )}
      />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    margin: 15,
    padding: 5,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "rgb(252, 165, 3)"
  },
  nickname: {
    flex: 1,
    padding: 5,
    fontFamily: "'lucida grande', tahoma, verdana, arial, sans-serif",
  },
  points: {
    fontFamily: "'lucida grande', tahoma, verdana, arial, sans-serif",
  },
  data: {
    display: "flex",
    justifyContent: "flex-end"
  }
});
export default ResultScreen;