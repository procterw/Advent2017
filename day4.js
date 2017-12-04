// Okay using lodash and d3 when I need them
const _ = require('lodash');
const input = require('./day4-input');

const cl = console.log;

cl( 'PART 1: ' + p1(input) );
cl( 'PART 2: ' + p2(input) );

// #$&*#@^$&#*@($^(*(#*))) //
// PART 1
// #$&*#@^$&#*@($^(*(#*))) //

function p1(input) {
  return input.map(row => {
    const words = row.split(' ');
    return _.uniq(words).length === words.length;
  }).filter(Boolean).length;
}

// #$&*#@^$&#*@($^(*(#*))) //
// PART 2
// #$&*#@^$&#*@($^(*(#*))) //

function p2() {
  return input.map(row => {
    const words = row.split(' ');
    return isValidPassphrase(words);
  }).filter(Boolean).length;
}

function isValidPassphrase(words) {
  const validWords = [];
  for (let i=0; i<words.length; i++) {
    const w1 = words[i];
    const anagramCount = validWords
      .map(w2 => isAnagram(w1, w2))
      .filter(Boolean)
      .length;
    if (anagramCount > 0) return false;
    validWords.push(w1);
  }
  return true;
}

function isAnagram(w1, w2) {
  if (w1.length !== w2.length) return;
  return sortWord(w2) === sortWord(w1);
}

function sortWord(w) {
  return w.split('').sort().join('');
}