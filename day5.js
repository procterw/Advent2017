// Okay using lodash and d3 when I need them
// const _ = require('lodash');
const input = require('./day5-input');

const cl = console.log;

cl( 'PART 1: ' + p1([...input]) );
cl( 'PART 2: ' + p2([...input]) );

// #$&*#@^$&#*@($^(*(#*))) //
// PART 1
// #$&*#@^$&#*@($^(*(#*))) //

// cl( p1([0, 3, 0, 1, -3]) ); // 5
function p1(input) {
  let i = 0;
  let nSteps = 0;
  while(true) {
    const instruction = input[i];
    input[i]++;
    i = i + instruction;
    nSteps++;
    if (i > input.length-1) return nSteps;
  }
}

// #$&*#@^$&#*@($^(*(#*))) //
// PART 2
// #$&*#@^$&#*@($^(*(#*))) //

// cl( p2([0, 3, 0, 1, -3]) ); // 10
function p2(input) {
  let i = 0;
  let nSteps = 0;
  while(true) {
    const instruction = input[i];
    instruction >= 3 ? input[i]-- : input[i]++;
    i = i + instruction;
    nSteps++;
    if (i > input.length-1) return nSteps;
  }
}