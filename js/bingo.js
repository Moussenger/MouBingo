"use strict";

var Bingo = (function () {
	var mNumbers, mLimit, mNumbersList;

	var resetNumbersList, shuffle;

	mNumbers     = [];
	mNumbersList = [];
	mLimit       = 90;

	resetNumbersList = function () {
		var i;

		mNumbersList = [];

		for(i=1; i<=mLimit; i++) {
			mNumbersList.push(i);
		}
	};

	shuffle = function () {
		var i, r, t;

		resetNumbersList();

		for(i=0; i<mLimit; i++) {
			r = parseInt(Math.random() * (mLimit));
			t = mNumbersList[r];
			mNumbersList[r] = mNumbersList[i];
			mNumbersList[i] = t;
		}
	};

	return {
		setLimit : function (limit) {
			mLimit = limit;
			this.reset();
		},

		getLimit : function () {
			return mLimit;
		},

		getNumbersList : function () {
			return mNumbers;
		},

		reset : function () {
			mNumbers = [];
			shuffle();
		},

		next : function () {
			var last;

			if(mNumbersList.length) {
				last = mNumbersList.shift();
				mNumbers.unshift(last);
			}

			return last;
		},

		init : function () {
			this.reset();
		}
	}
})();