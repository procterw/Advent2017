// Okay using lodash and d3 when I need them
const _ = require('lodash');
const input = require('./day6-input');
const d3 = require('d3-array');

const cl = console.log;

cl( 'PART 1: ' + p1([...input]) );
// cl( 'PART 2: ' + p2([...input]) );

// #$&*#@^$&#*@($^(*(#*))) //
// PART 1
// #$&*#@^$&#*@($^(*(#*))) //
// cl( p1([0,2,7,0]) ); // 5
function p1(input) {
  const states = [input.join()];
  let steps = 0;
  while (true) {
    steps++;
    const max = d3.max(input);
    const maxi = _.findIndex(input, o=>o===max);
    input[maxi] = 0;
    input = loop(input, maxi, max);
    const state = input.join();
    // PART 1
    // if (_.includes(states, state)) return steps;
    // PART 2
    if (_.includes(states, state)) return steps - states.indexOf(state);
    states.push(state);
  }
}

// cl( loop([1,2,3], 1, 20)); // [ 8, 8, 10 ]
function loop(arr, i, n){
  for (let j=0; j<n; j++) {
    i++;
    if (_.isUndefined(arr[i])) i = 0;
    arr[i]++;
  }
  return arr;
}