"use strict";

var BingoUI = (function () {

	return {
		createBalls : function (n) {
			var i, ball;

			for(i=1; i<=n; i++) {
				ball = $("<div>").addClass("ball-place").append(
							$("<div>").addClass("ball").append(
								$("<div>").addClass("circle").attr("id","ball-"+i).text(i)
							)
						);
				$("#balls-pool").append(ball);
			}
		},

		setBallActive : function (n) {
			$("#ball-"+n).addClass("active");
		},

		setLastNumber : function (n) {
			$("#last-number").text(n);
		},

		addNumberToList : function (n) {
			$("#number-list").prepend(
				$("<div>").addClass("number").text(n)
			);
		},

		addNewNumber : function (n) {
			this.setBallActive(n);
			this.setLastNumber(n);
			this.addNumberToList(n);
		},

		clean : function () {
			$("#last-number").text("-");
			$("#balls-pool").empty();
			$("#number-list").empty();
		},

		flashBox : function () {
			$("#last-number").animate({
		        backgroundColor: "#668cff"
		    }, 100);

		    $("#last-number").animate({
		        backgroundColor: "#3366ff"
		    }, 100);
		},

		updateProgressBar : function (size) {
			$("#progressbar").width(size+"%");
		}
	}

})();