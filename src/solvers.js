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
  var bord = new Board({n: n});
  var x = 0;
  var solutions = [];
  // debugger;
  while (x < n) {
    for (var i = 0; i < n; i++) {
      for (var k = 0; k < n; k++) {
        if (x > i) { bord = new Board({n: n}); }
        if (i >= x) {
          bord.togglePiece(i, k);
          if (bord.hasAnyRowConflicts(i)) {
            bord.togglePiece(i, k);
          }
          if (bord.hasAnyColConflicts(k)) {
            bord.togglePiece(i, k);
          }
          var numPieces = _.reduce(bord.rows(), function(memo, row) {
            return memo + _.reduce(row, function(memo, col) {
              return memo + col;
            }, 0);
          }, 0);
          var isValid = numPieces === n && !bord.hasAnyRooksConflicts();
          if (isValid) {
            solutions.push(bord.rows());
          }
        }
      }
    }
    x++;
  }

  console.log('solutions', JSON.stringify(solutions, null, 2));
  return solutions;
};

/*window.returnSolution = function(board, n) {
  var storate = [];
  var traverse = function(row) {
    for (var i = 0; i < n; i++) {
 //     .togglePiece()
    }

  }
};*/

window.findNRooksSolution = function(n) {
  // var bord = new Board({n: n});
  // var rows = bord.rows();
  // var solutions = [];
  // var findCount = function(row) {
  //   if (row === n) {
  //     var completedBoard = new Board(rows);
  //     solutions.push(JSON.stringify(completedBoard.rows()));
  //     return;
  //   }
  //   for (var i = 0; i < rows.length; i++) {
  //     bord.togglePiece(row, i);
  //     console.log('rows2', JSON.stringify(rows, null, 2));
  //     if (!bord.hasAnyRooksConflicts()) {
  //       findCount(row + 1);
  //     }
  //     bord.togglePiece(row, i);
  //   }
  // };
  // findCount(0);
  // console.log('solutions[0]', JSON.stringify(solutions[0], null, 2));
  // return JSON.parse(solutions[0]);
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  var solutions = window.findNRooks(n);
  console.log('solution', solutions);
  return solutions[0];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var bord = new Board({n: n});
  var rows = bord.rows();
  var solutions = 0;
  var findCount = function(row) {
    if (row === n) {
      solutions++;
      return;
    }
    for (var i = 0; i < rows.length; i++) {
      bord.togglePiece(row, i);
      if (!bord.hasAnyRooksConflicts()) {
        findCount(row + 1);
      }
      bord.togglePiece(row, i);
    }
  };
  findCount(0);
  return solutions;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var bord = new Board({n: n});
  var rows = bord.rows();
  var solutions = [];
  var findCount = function(row) {
    // debugger;
    if (row === n) {
      // console.log(rows)
      var completedBoard = new Board(rows);
      // var completedBoard = rows.slice();
      // var foo = completedBoard.slice();
      // console.log('foo', JSON.stringify(foo, null, 2));
      // console.log('rows1', JSON.stringify(rows.slice(), null, 2));
      solutions.push(JSON.stringify(completedBoard.rows()));
      return;
    }
    for (var i = 0; i < rows.length; i++) {
      bord.togglePiece(row, i);
      console.log('rows2', JSON.stringify(rows, null, 2));
      if (!bord.hasAnyQueensConflicts()) {
        findCount(row + 1);
      }
      bord.togglePiece(row, i);
    }
  };
  findCount(0);
  console.log('solutions[0]', JSON.stringify(solutions[0], null, 2));
  return JSON.parse(solutions[0]);
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var bord = new Board({n: n});
  var rows = bord.rows();
  var solutions = 0;
  var findCount = function(row) {
    if (row === n) {
      solutions++;
      return;
    }
    for (var i = 0; i < rows.length; i++) {
      bord.togglePiece(row, i);
      if (!bord.hasAnyQueensConflicts()) {
        findCount(row + 1);
      }
      bord.togglePiece(row, i);
    }
  };
  findCount(0);
  return solutions;
};
