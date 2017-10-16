/*
 * This list has all of the card's names.
 * The rest are variables for shortcuts.
 */
let cardNames  = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf',
				  'bicycle', 'bomb','diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube',
 				  'leaf', 'bicycle', 'bomb'],
	scorePanel = $('.score-panel'),
	deck       = $('.deck'),
	card       = $('.card'),
	cardSymbol = card.children(),
	movesClass = $('.moves'),
	restart	   = $('.restart');
	
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// This is the game board.
function startGame() {
	// This array holds the first clicked card and second clicked card.
	// The rest of the variables are for shortcut and later functions.
	let openCards  		= [],
		moves 	   		= 0,
		matches    		= 0,
		modal	   		= document.getElementById('win-modal'),
		span 	   		= document.getElementById('close'),
		timerOn    		= false,
		starsScorePanel = $('.stars'),
		starRatings 	= [16, 32],
		// This must be global for clearInterval to work.
		goClock;

	cardShuffler();
		
	// This starts listening for clicks on the deck and cards.
	function initEventListener() {
		// This makes sure the click listener is off for the next cycle.
		deck.off('click');

		// This resets the cards back to the original clickable state.
		deck.children().prop('disabled', false);

		// This makes sure matched cards cannot be clicked.
		$('li').each(function(index) {
			if ($(this).hasClass('match')) {
				$(this).prop('disabled', true);
			}
		});

		// Check if matches have been met.
		endGame(matches);
		
		// This makes the restart button flip everything back down and sets values to zero.
		restart.click(function() {
			card.removeClass();
			card.addClass('card');
			matches = 0;
			moves = 0;
			movesClass.text(moves);
			stopTimer();
			$( '#seconds' ).html('00');
			$( '#minutes' ).html('00');
			starsScorePanel.children().children().each(function (index, element) {
				$(element).css('color', '');
			});
			$('.starRatingIcons').children().each(function(index, element) {
				$(element).removeClass();
				$(element).addClass('fa fa-star');
			});
			cardShuffler();
			deck.children().prop('disabled', false);
			openCards.splice(0, 2);
		});

		// This changes the star-rating to being greyed-out for the score panel stars and removes the class
		// for the modal stars. Star rating is based on the moves used.
		starsScorePanel.children().children().each(function (index, element) {
			if (starRatings[index] === moves) {
				$(element).css('color', 'grey');
			}
		});
		$('.starRatingIcons').children().each(function(index, element) {
			if (starRatings[index] === moves) {
				$(element).removeClass();
			}
		});
		   
    	// Attaches a click event listener to the card elements.
		deck.on('click', '.card', function() {
			
			// Counts how many moves.
			moveCounter();
			movesClass.text(moves);

			if (timerOn === false) {
				// Timer starts!
				goTimer();
			}
			
			// Flips the card from face-down to face-up.
			let flipped = $( this ).addClass('open show');

			// This disables a card that has been clicked from being able to be clicked again.
			if ($(this).hasClass('open')) {
				$(this).prop('disabled', true);
			}

			// Adds clicked card to the array to be checked later for matches.
			openCards.push(flipped.children());

			// If there's more than one opened card then it checks if they match.
			if (openCards.length > 1) {
				let compare = compareCards(openCards);
				if (compare === false) {
					for (let index = 0; index < 2; index++) {
						$(openCards[index]).parent().addClass('animated flash').css('background', '#ff3300');				
					}

					//Found on: http://www.telegraphicsinc.com/2013/07/how-to-use-animate-css/
					window.setTimeout( function(){
						card.removeClass('open show animated flash').css('background', '');
					}, 750);

					// Clears the array to keep the code from breaking.
					openCards.splice(0, 2);

					initEventListener();
				} else {
					lockMatch();
				}
			}
		});
	}

		// Stops the timer.
		function stopTimer() {
			clearInterval(goClock);
			timerOn = false;
		}

		// The timer.
		// Found on: https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
		function goTimer() {
			let sec = 0;

    		function pad ( val ) { 
    			return val > 9 ? val : "0" + val;
    		}
    		
    		// Made sure not to put var here. If you do, it won't work. It will take it out of global.
      		goClock = setInterval( function(){
       			$("#seconds").html(pad(++sec%60));
        		$("#minutes").html(pad(parseInt(sec/60,10)));
    		}, 1000);

    		timerOn = true;
    	}

    function cardShuffler() {
		// This randomizes the face-down cards.
		shuffle(cardNames);
		cardSymbol.removeClass();

		// ??? Helper said something about not needing index here? But it doesn't work without it.
		cardSymbol.each(function(index) {
			$( this ).addClass('fa fa-' + cardNames[index]);
			index++;
		});
	}	

	// This increases moves by 1.
	function moveCounter() {
		moves++;
	}

	// When 8 matches are made this function executes and brings up the victory modal!
	function endGame(value) {
		if (value === 8) {
			stopTimer();

			// Opens the modal.
			// https://www.w3schools.com/howto/howto_css_modals.asp
			modal.style.display = 'block';

			// Displays time.
			let minutes = $('#minutes').text();
			let seconds = $('#seconds').text();
			$('.clearTime').text('Clear Time: ' + minutes + ':' + seconds);

			// Displays number of moves.
			$('.movesNumber').text('You completed the game in ' + moves + ' moves.');

			// Displays star rating.
			$('.starText').text("Here's your star rating: ");
			
			// When the 'x' is clicked, the modal closes.
			$('.close').on('click', function() {
				modal.style.display = 'none';
			});

			// When the outside of the window is clicked, the modal closes.
			window.onclick = function(event) {
				if (event.target == modal) {
					modal.style.display = 'none';
				}
			}

			// The play again option resets everything and allows a fresh new play.
			$('.playAgainText').on('click', function() {
				card.removeClass();
				card.addClass('card');
				matches = 0;
				moves = 0;
				movesClass.text(moves);
				stopTimer();
				$( '#seconds' ).html('00');
				$( '#minutes' ).html('00');
				starsScorePanel.children().children().each(function (index, element) {
					$(element).css('color', '');
				});
				$('.starRatingIcons').children().each(function(index, element) {
					$(element).removeClass();
					$(element).addClass('fa fa-star');
				});
				modal.style.display = 'none';
				cardShuffler();
				deck.children().prop('disabled', false);
			});
		}
	}

	// This compares the two clicked cards to see if they are the same and returns a boolean.
	function compareCards(array) {
		return openCards[0].attr('class') === openCards[1].attr('class') ? true : false;
	}

	// This function will lock the matches.
	function lockMatch() {
		for (let index = 0; index < 2; index++) {
			$(openCards[index]).parent().removeClass('open show');
			$(openCards[index]).parent().addClass('match');
			$(openCards[index]).parent().addClass('animated tada');
		}
		// Empties the array so the code doesn't break.
		openCards.splice(0, 2);
		// Increase matches, which is in the startGame() scope.
		matches++;
		deck.off('click');
		initEventListener();
	}

	initEventListener();	
}

startGame();
