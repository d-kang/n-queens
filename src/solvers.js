/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// var board = new Board ({n:2})
// undefined
// JSON.stringify(board)
// "{"0":[0,0],"1":[0,0],"n":2}"
// var board = new Board([[1,0],[0,1]])
// undefined
// JSON.stringify(board)
// "{"0":[1,0],"1":[0,1],"n":2}"

window.findNRooks = function(n) {
  // var solution = undefined;
  // create new board
  var bord = new Board({n: n});

  for (var i = 0; i < n; i++) {
    for (var k = 0; k < n; k++) {
      bord.togglePiece(i, k);
    }
  }
  return bord.rows();
};

window.findNRooksSolution = function(n) {
  // if (n === 0) {
  //   return [];
  // }
  // if (n === 1) {
  //   return [[1]];
  // }
  // if (n === 2) {
  //   return [[1, 0], [0, 1]];
  // }
  // if (n === 3) {
  //   return [[0, 0, 1], [0, 1, 0], [1, 0, 0]];
  // }


  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  var solution = window.findNRooks(n);
  console.log('solution', solution);
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
