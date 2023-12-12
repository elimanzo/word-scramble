import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const WORDBANK = [
  'node',
  'react',
  'heap',
  'queue',
  'priorityqueue',
  'trees',
  'binary',
  'stack',
  'digit',
  'map',
  'frequency'
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
  const [wordBank, setWordBank] = useState([...WORDBANK]);
  const [gameOver, setGameOver] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [randomLetters, setRandomLetters] = useState('');
  const [userWord, setUserWord] = useState('');
  const [winLoss, setWinLoss] = useState('');
  const [score, setScore] = useState({ wins: 0, losses: 0 });
  const setWordToGuess = () => {
    setWinLoss('');
    const randomIndex = getRandomIndex(wordBank);
    const word = wordBank[randomIndex].toUpperCase();
    setCurrentWord(word);
    setRandomLetters(randomizeString(word));
    wordBank.splice(randomIndex, 1);
    setWordBank(wordBank);
  };
  const didYouGuessIt = () => {
    if (userWord === currentWord) {
      setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
      setWinLoss('Won!');
    } else {
      setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
      setWinLoss('Lost!');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Word Scramble!</Text>
      {gameOver ? (
        <>
          <Text style={styles.word}>GAME OVER!</Text>
          <Text style={styles.resultText}>
            Game Recap - Won: {score.wins} Lost: {score.losses} Win Ratio:{' '}
            {Math.floor((score.wins / (score.losses + score.wins)) * 100)} %
          </Text>
          <Button
            title='Start Again!'
            onPress={() => {
              setWordBank([...WORDBANK]);
              setGameOver(false);
              setUserWord('');
              setRandomLetters('');
            }}
            style={styles.button}
          />
        </>
      ) : (
        <>
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
                placeholder='Enter Word Guess'
              />
              {winLoss === '' && (
                <Button
                  title='Submit'
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
                  <Text style={styles.resultText}>
                    Won: {score.wins} Lost: {score.losses} Win Ratio:{' '}
                    {Math.floor(
                      (score.wins / (score.losses + score.wins)) * 100
                    )}{' '}
                    %
                  </Text>
                  <Button
                    title='Next Word'
                    onPress={() => {
                      if (wordBank.length > 0) {
                        setWordToGuess();
                        setUserWord('');
                      } else {
                        setGameOver(true);
                      }
                    }}
                    style={styles.button}
                  />
                </View>
              )}
            </>
          ) : (
            <>
              <Text style={styles.instructions}>Press Start to play!</Text>
              <Button
                title='Start'
                onPress={() => {
                  setWordToGuess();
                  setScore({ wins: 0, losses: 0 });
                }}
                style={styles.button}
              />
            </>
          )}
        </>
      )}
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
  },
  title: {
    fontSize: 26,
    marginBottom: 20
  },
  word: {
    fontSize: 20,
    marginBottom: 10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8
  },
  button: {
    marginTop: 10
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  resultText: {
    fontSize: 16,
    marginHorizontal: 15,
    marginBottom: 10
  },
  instructions: {
    fontSize: 20,
    marginBottom: 20
  }
});
