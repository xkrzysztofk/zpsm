
import React, {useState,useEffect} from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';


function Terms({setIsAccepted}) {
    const onPress = () => {
        setIsAccepted(true);
        AsyncStorage.setItem('@isTermAccepted','true')
    }

  return (
      <View><Text><h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>  {'\n'}
           1. Duis nec faucibus odio.{'\n'}
           2. Aliquam quis nunc dui. {'\n'}
           3. Maecenas ornare enim non est ornare fringilla. {'\n'}
           4. Etiam quis sem mi. Sed quis pellentesque enim, a interdum ligula. {'\n'}
           5. Nullam sodales feugiat efficitur. Ut varius, dolor sit amet interdum suscipit, {'\n'}
           6. nisi ligula mattis elit, id ornare quam libero sed turpis. Etiam eu dolor tristique {'\n'}
           7. lectus posuere eleifend a non eros. Fusce pharetra justo neque, sit amet lacinia {'\n'}
           8. libero commodo pharetra. Proin nisi orci, dictum in ipsum et, tempor fermentum arcu.{'\n'} {'\n'} {'\n'} 
           </Text><TouchableOpacity onPress={onPress} style={styles.submit}>accept</TouchableOpacity></View>
  );
}
const styles = StyleSheet.create ({
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
})
export default Terms;