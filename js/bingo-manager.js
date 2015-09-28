"use strict";

$(function() {
	var DEFAULT_TIME = 5;

	var sound, intervalId, silence, time, uTime, userTime, intervalTime, paused, playing;
	
	var init, next, start, reset, setTime, modalReset, modalSetTime, updateProgressBar, goToGenerator;

	init = function () {
	    silence      = false;
	    intervalTime = userTime * 1000;
	    paused       = true;
	    uTime        = 30;
	    time         = 0;
	    playing      = false;

		BingoUI.clean();
		BingoUI.createBalls(Bingo.getLimit());
		BingoUI.updateProgressBar(0);
		Bingo.init();

		$("#btn-start").text("Empezar");
		$("#time").text(userTime);
	};

	updateProgressBar = function () {
		BingoUI.updateProgressBar(100 - parseInt((time / intervalTime) * 100));
	};

	next = function () {
		var last;
		updateProgressBar();

		if(time < intervalTime) {
			time += uTime;
			return;
		}

		time = 0;

		last = Bingo.next();

		if(!last) {
			clearInterval(intervalId);
			return;
		}

		!silence && sound.play ? sound.play() : (sound.Play ? sound.Play() : undefined);
		BingoUI.flashBox();
		BingoUI.addNewNumber(last);
	};

	start = function () {
		var text;

		if(paused) {
			time = 0;
			intervalId = setInterval(next, uTime);
			text = "Pausar";
		} else {
			clearInterval(intervalId);
			text = "Continuar";
		}

		$(this).text(text);
		paused = !paused;

		playing = true;
	};

	reset = function () {
		var text;

		if(!paused) {
			clearInterval(intervalId);
			text = "Continuar";
			paused = !paused;
		}

		playing               = false;
		window.onbeforeunload = null;

		$("#btn-start").text(text);
	};

	modalReset = function () {
		init();
	};

	modalSetTime = function () {
		var newTime;

		newTime      = parseInt($("#txt-time").val());

		if(!newTime || newTime < 2) return;

		intervalTime = newTime * 1000;
		userTime     = newTime;

		$("#time").text(userTime);
	};

	setTime = function () {
		reset();

		$("#txt-time").val(userTime);
		setTimeout(function () {
			$("#txt-time").focus();
		}, 100);
	};

	goToGenerator = function () {
		$(location).attr('href', 'generator.html');

		if(playing) {
			window.onbeforeunload = function() { 
			    return 'Hay un juego en marcha';
			};
		}
	};

	$("#btn-start").click(start);
	$("#btn-reset").click(reset);
	$("#btn-modal-reset").click(modalReset);
	$("#btn-time").click(setTime);
	$("#btn-modal-time").click(modalSetTime);
	$("#btn-generator").click(goToGenerator);

	sound = document.createElement("audio");
	sound.setAttribute('src', 'sounds/ball.wav');

	userTime = DEFAULT_TIME;

	init();
});