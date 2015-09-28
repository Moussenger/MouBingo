"use strict";

$(function() {
    var DEFAULT_CARDS_NUMBER = 10;

    var cardsNumber;

	var createCards, modalGenerateCards, generateCards, goToBingo;

	createCards = function () {
		BingoGeneratorUI.createCards(cardsNumber);
	};

    modalGenerateCards = function () {
        var newCardsNumber;

        newCardsNumber = parseInt($("#txt-cards").val());

        if(!newCardsNumber || newCardsNumber < 1) newCardsNumber = 1;

        cardsNumber = newCardsNumber;

        createCards();
    };

    generateCards = function () {
        $("#txt-cards").val(cardsNumber);

        setTimeout(function () {
            $("#txt-cards").focus();
        }, 100);
    };

    goToBingo = function () {
        $(location).attr('href', 'index.html');
    };

	$("#btn-generator").click(generateCards);
    $("#btn-modal-generate").click(modalGenerateCards);  
    $("#btn-bingo").click(goToBingo);

    cardsNumber = DEFAULT_CARDS_NUMBER;
});