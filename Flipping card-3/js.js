var frontCards = [
	'images/HS_backstab.png',
	'images/HS_blessing.png',
	'images/HS_charge.png',
	'images/HS_healing.png',
	'images/HS_pact.png',
	'images/HS_streng.png',
	'images/HS_shadowstep.png'
];
var backCard = 'images/HS_Back_Card.png';
var $currentCard = null;
var audioSourse = {
	audioBackground : 'audio/background.mp3',
	audioFlipCard : 'audio/flip-card.mp3',
	audioFlipWrong : 'audio/flip-wrong.mp3',
	audioFlipCorrect : 'audio/flip-correct.mp3',
	audioGameOver : 'audio/laughing-game-over.mp3',
	audioVictory : 'audio/victory.mp3'
};
var normalModeTime = 30;
var hardModeTime = 25;
var progressBarNumber = 100;
var proressPercent = Number($('.progress-bar').attr('style').substring(6,10));
var arrCard = [];
var count = 0;


function shuffle(arr) {
	var currentIndex = arr.length,tempValue,randomIndex;

	while(currentIndex !== 0){
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -=1;

		tempValue = arr[currentIndex];
		arr[currentIndex] = arr[randomIndex];
		arr[randomIndex] = tempValue;
	}
	return arr;
};
function soundEffect(audioSourse){
	var audio = document.createElement("audio");
	audio.src = audioSourse;
	audio.addEventListener("ended", function () {
		document.removeChild(this);
	}, false);
	return audio;   
};

function progressTime(timeMode) {
	proressPercent -= (100/timeMode);
	if (proressPercent <= 100 && proressPercent >= 80) {
		$('.progress-bar').addClass('progress-bar-info');
		$('.progress-bar').css({
			'transition': 'width 1s linear',
			'width': proressPercent+'%',
			'transition-duration': '1000ms'
		});
	} else if (proressPercent < 80 && proressPercent >= 50) {
		$('.progress-bar').removeClass('progress-bar-info');
		$('.progress-bar').addClass('progress-bar-success');
		$('.progress-bar').css({
			'transition': 'width 1s linear',
			'width': proressPercent+'%',
			'transition-duration': '1000ms'
		});

	} else if (proressPercent < 50 && proressPercent >= 20) {
		$('.progress-bar').removeClass('progress-bar-info');
		$('.progress-bar').addClass('progress-bar-warning');
		$('.progress-bar').css({
			'transition': 'width 1s linear',
			'width': proressPercent+'%',
			'transition-duration': '1000ms'
		});
	} else if (proressPercent >= 0 && proressPercent < 20) {
		$('.progress-bar').removeClass('progress-bar-warning');
		$('.progress-bar').addClass('progress-bar-danger')
		$('.progress-bar').css({
			'transition': 'width 1s linear',
			'width': proressPercent+'%',
			'transition-duration': '1000ms'
		});

	}
};

function run(timeRemaining) {
	var runTime = timeRemaining;
	var runGame = setInterval(function () {
		timeRemaining--;
		console.log(timeRemaining);

		progressTime(runTime);
		if (count == 7) {
			clearInterval(runGame);
			$('.victoryBlock').css('display', 'block');
			document.getElementById('backgroundMusic').pause();
			soundEffect(audioSourse.audioVictory).play();
		}
		if (timeRemaining == -1) {
			clearInterval(runGame);
			$('#endGameModal').modal({
				show : true,
				backdrop : false,
				keyboard : false
			});

			document.getElementById('backgroundMusic').pause();
			soundEffect(audioSourse.audioGameOver).play();
		}

	},1000);
};

function populate() {
	frontCards = frontCards.concat(frontCards);
	frontCards = shuffle(frontCards);
	var html = '';
	for (var i = 0; i < frontCards.length; i++) {
		html += 
			'<div class="card"  data-name="' + frontCards[i] + '">'+
				'<div class="front">' +
					'<img src="' + backCard + '">' +
				'</div>' +
				'<div class="back">' +
					'<img src="' + frontCards[i] + '">' +
				'</div>' +
			'</div>';

	}

	$('.main-content').html(html);
};

function flip() {
	$('.card').on('click',function () {
		if (arrCard.length < 2 ) {
			if (!$(this).hasClass('flipped')) {
				$(this).toggleClass('flipped');
				soundEffect(audioSourse.audioFlipCard).play();
				arrCard.push($(this));
				if (!$currentCard) {
					$currentCard = $(this);
				} else {
					var $that = $(this);
					if ($(this).attr('data-name') !== $currentCard.attr('data-name') ) {
						setTimeout(function () {
							$currentCard.toggleClass('flipped');
							$that.toggleClass('flipped');
							$currentCard = null;
							arrCard = [];
							soundEffect(audioSourse.audioFlipWrong).play();
						}, 500);
					} else {
						setTimeout(function () {
							$that.animate({
								'opacity': '0'},
								500);
							$currentCard.animate({
								'opacity': '0'},
								500);
							$currentCard = null;
							arrCard = [];
							soundEffect(audioSourse.audioFlipCorrect).play();
							count++;
							
						},500);
					}
				}
			}
		}
	});
};

function playing() {

	$('#startGameModal').modal({
		show : true,
		backdrop : false,
		keyboard : false
	});
	
	$('.btn-choose').on('click', function(event) {
		event.preventDefault();
		var gameMode = $(this).attr('value');
		$('#startGameModal').modal({
			show:false
		});

		document.getElementById('backgroundMusic').play();

		run(gameMode);
	});		
};

function replay() {
	window.location.reload();
};


$(function () {
	populate();
	flip();
	playing();
});