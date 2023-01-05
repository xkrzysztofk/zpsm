
import React, {useState,useEffect} from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './Components/HomeScreen';
import ResultScreen from './Components/ResultScreen';
import QuizScreen from './Components/QuizScreen';
import QuizScreen_2 from './Components/QuizScreen_2';
import QuizScreen_3 from './Components/QuizScreen_3';
import RandomTest from './Components/RandomTest';
import Terms from './Components/Terms'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FinishQuizScreen from './Components/FinishQuizScreen';
import { ActivityIndicator } from 'react-native-web';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NetInfo from "@react-native-community/netinfo";

const Drawer = createDrawerNavigator();

var _ = require('lodash');




function App() {
  const [isAccepted, setIsAccepted] = useState(false);
  // const [data, setData] = React.useState([])
  const [isLoading, setLoading] = React.useState(true)
  const [tests, setTests] = useState([]);
  const [details, setDetails] = useState([]);
  const [isAppOffline, setIsAppOffline] = React.useState(false);



  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        setIsAppOffline(false);
        console.log("Internet connection back");
      } else {
        setIsAppOffline(true);
        console.log("Internet connection lost");
      }
    });

    return () => unsubscribe();
  }, []);


  const _storeData = async () => {
    try {
        fetch('https://tgryl.pl/quiz/tests')
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            // setData(json);
            AsyncStorage.setItem('@tests',JSON.stringify(json));
            let info = [];
            json.map((item) => {
              info.push(
                fetch('https://tgryl.pl/quiz/test/' + item.id).then((value) =>
                  value.json()
                )
              );
            });

            Promise.all(info).then((response) => {
              response.map((el) => {
                el.tasks = _.shuffle(el.tasks);
                el.tasks.map((item) => {
                  item.answers = _.shuffle(item.answers);
                });
              });
              console.log(response)
              AsyncStorage.setItem(
                '@details',
                JSON.stringify(_.shuffle(response))
              );
              AsyncStorage.getItem('@details')
                .then((value) => JSON.parse(value))
                .then((value) => setDetails(value));
            });
          })
          .catch((error) => alert(error))
          .finally(setLoading(false));
    } catch (error) {
      console.log(error)
    }
  };


  const checkTermsAccepted= async () => {
    try{

      const value = await AsyncStorage.getItem('@isTermAccepted');

      if(value == 'true'){
        setIsAccepted(true)
      }

    } catch (err){
        console.log('Error @checkOnboarding: ', err)
    } 
  } 

  useEffect(() => {
    checkTermsAccepted();
    if(isAppOffline){
      AsyncStorage.getItem('@tests')
          .then((value) => JSON.parse(value))
          .then((value) => setTests(value));
    }else{
      _storeData();
    }
    
  }, []); 

  return (
    isAccepted ? (<NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Result" component={ResultScreen} />
        <Drawer.Screen name="Quiz_1" component={QuizScreen} />
        <Drawer.Screen name="Quiz_2" component={QuizScreen_2} />
        <Drawer.Screen name="Quiz_3" component={QuizScreen_3}/>
        <Drawer.Screen name="FinishQuizScreen" component={FinishQuizScreen}/>
        <Drawer.Screen name="Generate random test" component={RandomTest}/>
      </Drawer.Navigator>
    </NavigationContainer>): <Terms setIsAccepted={setIsAccepted}/> 
    
  );
}

export default App;