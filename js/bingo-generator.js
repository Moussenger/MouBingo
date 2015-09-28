"use strict";

var BingoGenerator = (function () {
	var Card = function () {
		var COLUMNS            = 9,
		    ROWS               = 3,
		    ROW_VALUES         = 5,
		    COLUMNS_MAX_VALUES = 2,
		    TOTAL_VALUES       = 15,
			EMPTY              = 0,
			VALUE_TO_SET       = -1;

		var card;

		var countRowValues, countColumnValues, generateCardValuesPlaces, generateCardValues, generateRandomList;

		card = [
			[EMPTY, EMPTY, EMPTY],
			[EMPTY, EMPTY, EMPTY],
			[EMPTY, EMPTY, EMPTY],
			[EMPTY, EMPTY, EMPTY],
			[EMPTY, EMPTY, EMPTY],
			[EMPTY, EMPTY, EMPTY],
			[EMPTY, EMPTY, EMPTY],
			[EMPTY, EMPTY, EMPTY],
			[EMPTY, EMPTY, EMPTY]
		];


		countRowValues = function (r) {
			var i, l, count;

			count = 0;

			for(i=0, l=COLUMNS; i<l; i++) {
				card[i][r] != EMPTY && count++;
			}

			return count;
		};

		countColumnValues = function (c) {
			var i, l, count;

			count = 0;

			for(i=0, l=ROWS; i<l; i++) {
				card[c][i] != EMPTY && count++;
			}

			return count;
		};

		generateCardValuesPlaces = function () {
			var getRandomRow, getRandomColumn, updateRowsAvailable, updateColumnsAvailable;

			var i, l, rowsAvailable, rowToSet, columnsAvailable, columnToSet, row, rowValuesNeeded, j;

			getRandomRow = function () {
				return parseInt(Math.random() * rowsAvailable.length);
			};

			getRandomColumn = function (row) {
				var columnAvailable, columnsEmpty, c, cl, value;

				columnsEmpty = [];
				for(c=0, cl = columnsAvailable.length; c < cl; c++) {
					columnAvailable = columnsAvailable[c];
					card[columnAvailable][row] == EMPTY && columnsEmpty.push(columnAvailable);
				}

				value = parseInt(Math.random() * columnsEmpty.length);

				return columnsEmpty[value];
			};

			updateRowsAvailable = function ()  {
				var r, rl;

				for(r=0, rl=rowsAvailable.length; r < rl; r++) {
					if(countRowValues(rowsAvailable[r]) >= ROW_VALUES) {
						rowsAvailable.splice(r, 1);
						rl--;
						r--;
					}
				}
			};

			updateColumnsAvailable = function ()  {
				var c, cl;

				for(c=0, cl=columnsAvailable.length; c < cl; c++) {
					if(countColumnValues(columnsAvailable[c]) >= COLUMNS_MAX_VALUES) {
						columnsAvailable.splice(c, 1);
						cl--;
						c--;
					}
				}
			};

			rowsAvailable    = [0, 1, 2];

			for(i=0, l=COLUMNS; i<l; i++) {
				updateRowsAvailable();

				rowToSet          = rowsAvailable[getRandomRow()];
				card[i][rowToSet] = VALUE_TO_SET;
			}
			

			for(i=0, l=rowsAvailable.length; i<l; i++) {
				row              = rowsAvailable[i];
				rowValuesNeeded  = ROW_VALUES - countRowValues(row);
				columnsAvailable = [0, 1, 2, 3, 4, 5, 6, 7, 8];

				for(j=0; j<rowValuesNeeded; j++) {
					updateColumnsAvailable();
					columnToSet = getRandomColumn(row);
					try {
						card[columnToSet][row] = VALUE_TO_SET;
					} catch (e) {
						card = [
							[EMPTY, EMPTY, EMPTY],
							[EMPTY, EMPTY, EMPTY],
							[EMPTY, EMPTY, EMPTY],
							[EMPTY, EMPTY, EMPTY],
							[EMPTY, EMPTY, EMPTY],
							[EMPTY, EMPTY, EMPTY],
							[EMPTY, EMPTY, EMPTY],
							[EMPTY, EMPTY, EMPTY],
							[EMPTY, EMPTY, EMPTY]
						];

						generateCardValuesPlaces();
						return;
					}
				}
			}
		};


		generateRandomList = function (min, max, count) {
			var list, candidates, i, l, candidate, pos;

			list       = [];
			candidates = [];

			for(i=0, l = (max-min+1); i < l; i++) {
				candidates.push(min+i);
			}

			for(i=0; i < count; i++) {
				pos       = parseInt(Math.random() * candidates.length);
				candidate = candidates[pos];
				candidates.splice(pos, 1);
				list.push(candidate);
			}

			return list.sort();
		}


		generateCardValues = function () {
			var c, r, colCount, min, max, list;

			for(c=0; c < COLUMNS; c++) {
				colCount = countColumnValues(c);
				min      = c * 10;
				max      = min + 9;

				max += min == 80 ? 1 : 0;
				min += min == 0 ? 1 : 0;

				list = generateRandomList(min, max, colCount);

				for(r=0; r < ROWS; r++) {
					if(card[c][r] === VALUE_TO_SET) {
						card[c][r] = list.shift();
					}
				}
			}
		}
		
		generateCardValuesPlaces();
		generateCardValues();

		this.getCard = function () {
			return card;
		}

		
	}

	return {
		createCards : function (n) {
			var i, cards;

			cards = [];

			for(i=0; i<n; i++) {
				cards.push(new Card());
			}

			return cards;
		}
	}


})();