/*
 * This list has all of the card's names.
 * The rest are variables for shortcuts.
 */
var cardNames  = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf',
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
    var currentIndex = array.length, temporaryValue, randomIndex;

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
	var openCards  = [],
		moves 	   = 0,
		matches    = 0,
		modal	   = document.getElementById('win-modal'),
		span 	   = document.getElementById('close'),
		timerOn    = false,
		// This must be global for clearInterval to work.
		goClock;
		
	// This randomizes the face-down cards.
	shuffle(cardNames);
	cardSymbol.removeClass();

	// ??? Helper said something about not needing index here? But it doesn't work without it.
	cardSymbol.each(function(index) {
		$( this ).addClass('fa fa-' + cardNames[index]);
		index++;
	});

	// This starts listening for clicks on the deck and cards.
	function initEventListener() {
		// This makes sure the click listener is off for the next cycle.
		deck.off('click');

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
		});








		// IT INTERACTS WITH THE DOM BUT CAN'T SELECT THE RIGHT ONE.
		// This changes the star-rating depending on how many moves have passed.
		if (moves >= 16) {
			$( '.starRatingIcons' ).children( '.1 fa fa-star' ).removeClass();
			$( '.stars' ).children().children().find( 'panel1 fa fa-star' ).removeClass();
		}
	
   
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
			var flipped = $( this ).addClass('open show');

			// Adds clicked card to the array to be checked later for matches.
			openCards.push(flipped.children());

			// If there's more than one opened card then it checks if they match.
			if (openCards.length > 1) {
				var compare = compareCards(openCards);
				if (compare === false) {
					for (var index = 0; index < 2; index++) {
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
			var sec = 0;

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
			var minutes = $('#minutes').text();
			var seconds = $('#seconds').text();
			$('.clearTime').text('Clear Time is: ' + minutes + ':' + seconds);

			// Displays number of moves.
			$('.movesNumber').text('You completed the game in ' + moves + ' moves.');










			// IN PROGRESS
			// Displays star rating.

			// Displays class of first i in class stars.
			//var starRating = $('.stars').find('i').attr('class');


			$('.starText').text("Here's your star rating: ");
			//$('.starRatingIcons').find('li').text();

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
		}
	}

	// This compares the two clicked cards to see if they are the same and returns a boolean.
	function compareCards(array) {
		if (openCards[0].attr('class') === openCards[1].attr('class')) {
			return true;
		} else {
			return false;
		}
	}

	// This function will lock the matches.
	function lockMatch() {
		for (var index = 0; index < 2; index++) {
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
