// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var bord = this;
      var check = false;
      var count = 0;
      var row = bord.get(rowIndex);
      row.forEach(function(element) {
        if (element === 1) {
          count++;
        }
      });
      if (count > 1) {
        check = true;
      }
      return check;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var bord = this;
      var check = false;
      var count = 0;
      var checkConflict = function() {
        console.log(bord.get(count));
        if (bord.get(count) && check === false) {
          if (bord.hasRowConflictAt(count)) {
            check = true;
          }
          count++;
          checkConflict();
        }
      };
      checkConflict();
      return check;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(col) {
      var bord = this;
      var count = 0;
      for (var i = 0; i < bord.rows().length; i++) {
        var row = bord.get(i);
        if (row[col] === 1) {
          count++;
        }
      }
      return count >= 2;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      /*for (var i = 0; i < bord.rows().length; i++) {
        this.hasColConflictAt(i);

      }*/
      var bord = this;
      var rows = this.rows();
      var hasConflict = rows.reduce(function(memo, col, i) {
        if (memo) {
          return memo;
        }
        return memo = bord.hasColConflictAt(i);
      }, false);
      return hasConflict;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    // majorDiagonalColumnIndexAtFirstRow
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(major) {

      var bord = this;
      var rows = bord.rows();
      var count = 0;
      var isPositive = true;
      if (major < 0) {
        isPositive = false;
        major = Math.abs(major);
      }
      for (var i = 0; i < rows.length; i++) {
        if (isPositive) {
          if (rows[i][i + major] === 1) {
            count++;
          }
        } else {
          if (rows[major + i] && rows[major + i][i] === 1) {
            count++;
          }
        }
      }
      return count >= 2;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var bord = this;
      var rows = this.rows();
      var check = false;
      for (var i = (0 - rows.length); i < rows.length; i++) {
        if (check === false) {
          check = bord.hasMajorDiagonalConflictAt(i);
        }
      }
      return check;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    // minorDiagonalColumnIndexAtFirstRow
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minor) {
      var bord = this;
      var rows = bord.rows();
      var count = 0;
      if (minor >= 0) {
        for (var i = 0; i < rows.length; i++) {
          if (rows[i][minor - i] === 1) {
            count++;
          }
        }
      } else {
        minor = Math.abs(minor);
        for (var k = 0; k < rows.length; k++) {
          if (rows[minor + k] && rows[minor + k][rows.length - 1 - k] === 1) {
            count++;
          }
        }
      }
      return count >= 2;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var bord = this;
      var rows = this.rows();
      var check = false;
      for (var i = (0 - rows.length - 1); i < rows.length; i++) {
        if (check === false) {
          check = bord.hasMinorDiagonalConflictAt(i);
        }
      }
      return check;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
