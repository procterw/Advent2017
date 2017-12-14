
const _ = require('lodash');
const input = require('./day12-input');

// console.log(getPipeConnections(input));
console.log(p2(input));

// _.uniq(list)

function getPipeConnections(pipes) {
  const thingsWeveSeen = [];
  const newThings = [0];
  while (true) {
    // do this forever
    const curPipe = newThings.pop();
    thingsWeveSeen.push(curPipe);
    
    const connections = pipes[curPipe]; // [82]
    // remove stuff we've seen
    const newConnections = connections.filter(c => (
      !_.includes(thingsWeveSeen, c) && !_.includes(newThings, c)
    ));
    // add all the connections to new things
    newConnections.forEach(c => newThings.push(c));

    if (!newThings.length) return _.uniq(thingsWeveSeen);
  }
}

function p2(pipes) {
  let groupCount = 0;
  while(pipes.length) {
    groupCount++;
    console.log(pipes.length)
    const group = getPipeConnections(pipes);
    pipes = _.xor(group, pipes);
  }
  return groupCount;
}