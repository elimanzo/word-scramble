import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const WORDBANK = [
  'node',
  'react',
  'linkedlist',
  'heap',
  'stack',
  'queue',
  'trees',
];

function randomizeString(s) {
  if (new Set(s).size <= 1) {
    throw new Error('Invalid String: String could not be randomized');
  }
  const arr = [...s];
  const randomArr = [];
  while (arr.length > 0) {
    const randomIndex = getRandomIndex(arr);
    swapElements(arr, randomIndex, arr.length - 1);
    randomArr.push(arr.pop());
  }
  const randomString = randomArr.join('');
  return randomString === s ? randomizeString(s) : randomString;
}

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function swapElements(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

export default function App() {
  const [currentWord, setCurrentWord] = useState('');
  const [randomLetters, setRandomLetters] = useState('');
  const [userWord, setUserWord] = useState('');
  const [winLoss, setWinLoss] = useState('');
  const setWordToGuess = () => {
    setWinLoss('');
    const word = WORDBANK[getRandomIndex(WORDBANK)].toUpperCase();
    setCurrentWord(word);
    setRandomLetters(randomizeString(word));
  };
  const didYouGuessIt = () => {
    if (userWord === currentWord) {
      setWinLoss('Won!');
    } else {
      setWinLoss('Loss!');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Word Scramble!</Text>
      {randomLetters !== '' ? (
        <>
          <Text style={styles.word}>Word: {randomLetters}</Text>
          <TextInput
            style={styles.input}
            value={userWord}
            onChangeText={(text) => {
              const setLetters = new Set(currentWord);
              const setStr = ['[^', ...setLetters, ']+'].join('');
              const regex = new RegExp(setStr, 'g');
              setUserWord(text.toUpperCase().replace(regex, ''));
            }}
            placeholder="Enter Word Guess"
          />
          {winLoss === '' && (
            <Button
              title="Submit"
              onPress={didYouGuessIt}
              style={styles.button}
            />
          )}
          {winLoss !== '' && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>
                You {winLoss} The word was {currentWord}. Press the reset to
                start again!
              </Text>
              <Button
                title="Reset"
                onPress={setWordToGuess}
                style={styles.button}
              />
            </View>
          )}
        </>
      ) : (
        <>
          <Text style={styles.instructions}>Press Start to play!</Text>
          <Button
            title="Start"
            onPress={setWordToGuess}
            style={styles.button}
          />
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  word: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  button: {
    marginTop: 10,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 20,
  },
});
