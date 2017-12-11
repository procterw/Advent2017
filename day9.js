// Okay using lodash and d3 when I need them
const _ = require('lodash');
const d3 = require('d3-array');
const fs = require('fs');

const input = fs.readFileSync('./day9-input.txt', 'utf8');

const cl = console.log;

cl( 'PART 1: ' + p1(input));
cl( 'PART 2: ' + p2(input));

// #$&*#@^$&#*@($^(*(#*))) //
// PART 1
// #$&*#@^$&#*@($^(*(#*))) //

function p1(input) {
  return countGroups(removeCommas(removeGarbage(stripEscapes(input))));
}

function stripEscapes(str) {
  return str.replace(/(!.)+/g, '');
}

function findGarbage(str) {
  const garbage = [];
  let activeGarbageIndex = -1;
  for (let i=0; i<str.length; i++) {
    const char = str[i];
    if (activeGarbageIndex < 0) {
      if (char === '<') {
        activeGarbageIndex = i;
      }
    } else {
      if (char === '>') {
        garbage.push(str.substring(activeGarbageIndex, i+1));
        activeGarbageIndex = -1;
      }
    }
  }
  return garbage;
}

function removeGarbage(str) {
  return findGarbage(str)
    .reduce((str, g) => {
      return str.replace(g, '');
    }, str);
}

function countGarbage(garbage) {
  return d3.sum(garbage.map(g => g.length - 2));
}

function removeCommas(str) {
  return str.replace(/,/g, '');
}

function countGroups(str) {
  let depth = 0;
  let score = 0;
  for (let i=0; i<str.length; i++) {
    const char = str[i];
    if (char === '{') {
      depth++;
    }
    if (char === '}') {
      score += depth;
      depth--;
    }
  }
  return score;
}

// #$&*#@^$&#*@($^(*(#*))) //
// PART 2
// #$&*#@^$&#*@($^(*(#*))) //

function p2(input) {
  return countGarbage(findGarbage(stripEscapes(input)));
}