import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

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
  const letters = 'node';
  const [randomLetters, setRandomLetters] = useState('');
  const [userWord, setUserWord] = useState('');
  const [winLoss, setWinLoss] = useState(null);
  const updateRandomLetters = () => {
    setRandomLetters(randomizeString(letters));
  };
  const didYouGuessIt = () => {
    if (userWord === letters) {
      setWinLoss('Won!');
    } else {
      setWinLoss('Loss!');
    }
  };
  return (
    <View style={styles.container}>
      <Text>Press the start button to start guessing!</Text>
      {randomLetters && <Text>Guess Me! {randomLetters}</Text>}
      <Button title='Start' onPress={updateRandomLetters} />
      <TextInput
        value={userWord}
        onChangeText={setUserWord}
        placeholder='Type something here'
      />
      <Button title='Submit' onPress={didYouGuessIt} />
      {winLoss && <Text>Status: {winLoss}</Text>}
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
