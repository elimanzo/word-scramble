import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function randomizeString(s) {
  const arr = [...s];
  const randomArr = [];
  while (arr.length > 0) {
    randomIndex = Math.floor(Math.random() * arr.length);
    swapElements(arr, randomIndex, arr.length - 1);
    randomArr.push(arr.pop());
  }
  return randomArr.join('');
}

function swapElements(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

export default function App() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const [randomLetters, setRandomLetters] = useState(null);

  const updateRandomLetters = () => {
    setRandomLetters(randomizeString(letters));
  };
  return (
    <View style={styles.container}>
      <Text>Lets randomize the alphabet: {letters}</Text>
      {randomLetters && <Text>Randomized: {randomLetters}</Text>}
      <Button title='Randomize Me!' onPress={updateRandomLetters}></Button>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
