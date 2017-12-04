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
    return _.uniq(words.map(sortWord)).length === words.length;
  }).filter(Boolean).length;
}

function sortWord(w) {
  return w.split('').sort().join('');
}