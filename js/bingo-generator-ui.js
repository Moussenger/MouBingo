"use strict";

var BingoGeneratorUI = (function () {
	var generateCards, generateCard;

	generateCard = function (card) {
		var cardUI, cardTable, row, td, r, c, rl, cl, number;

		cardUI    = $("<div>").addClass("card-container");
		cardTable = $("<table>").addClass("card-body"); 

		for(r = 0, rl = 3; r < rl; r++) {
			row = $("<tr>").addClass("card-row");
			
			for(c = 0, cl = 9; c < cl; c++) {
				td     = $("<td>").addClass("card-col");
				number = card[c][r];
				number ? td.addClass("card-number").text(number) : td.addClass("card-empty");
				row.append(td);
			}

			cardTable.append(row);	
		}

		cardUI.append(cardTable);
		
		return cardUI;
	};

	generateCards = function (n) {
		var cardPlace, cards, i, l;

		cardPlace = $("#card-place");
		cardPlace.empty();

		cards = BingoGenerator.createCards(n);

		for(i=0, l = cards.length; i < l; i++) {
			cardPlace.append(generateCard(cards[i].getCard()));
		}

	};

	return {
		createCards : generateCards
	}

})();