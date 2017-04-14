var frontCards = [
'images/HS_backstab.png',
'images/HS_blessing.png',
'images/HS_charge.png',
'images/HS_healing.png',
'images/HS_pact.png'
];
var backCard = 'images/HS_Back_Card.png';
var $currentCard = null;
var audio = [
'audio/background.mp3',
'audio/flip-card.mp3',
'audio/flip-wrong.mp3',
'audio/flip-correct.mp3',

];


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
}
function soundEffect(audioSourse){
	var audio = document.createElement("audio");
	audio.src = audioSourse;
	audio.addEventListener("ended", function () {
		document.removeChild(this);
	}, false);
	audio.play();   
}





$(function () {
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



	var arrCard = [];
	$('.card').on('click',function () {

		if (arrCard.length < 2 ) {
			if (!$(this).hasClass('flipped')) {
				$(this).toggleClass('flipped');
				soundEffect(audio[1]);
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
							soundEffect(audio[2]);
						}, 800);
					} else {
						setTimeout(function () {
							$that.css('opacity','0');
							$currentCard.css('opacity','0');
							$currentCard = null;
							arrCard = [];
							soundEffect(audio[3]);
						},800);
					}
				}
			}
		}
	});

	
	soundEffect(audio[0]);

});