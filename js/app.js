/*
 * This list has all of the card's names.
 */
var cardNames  = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf',
				  'bicycle', 'bomb','diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube',
 				  'leaf', 'bicycle', 'bomb'],
	scorePanel = $('.score-panel'),
	deck       = $('.deck'),
	card       = $('.card'),
	cardSymbol = card.children(),
	moves	   = $('.moves');
	
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

// This is the game board
function startGame() {
	// This holds opened cards that are ready to be 
	// checked against the next clicked card.
	var openCards = [];

	// This randomizes the face-down cards.
	shuffle(cardNames);
	cardSymbol.removeClass();
	// ??? Helper said something about not needing index? But it doesn't work without it.
	cardSymbol.each(function(index) {
		$( this ).addClass('fa fa-' + cardNames[index]);
		index++;
	});

	// Flips one card and then shuts off.
	function flipOnce() {
		
		// Pfft. Why does it only work once. It gets stuck after this <------------------
		deck.on('click', '.card', function() {
			// Flips the card from face-down to face-up.
			var flipped = $( this ).addClass('open show');
			// Stops the event.
			deck.off('click');
			console.log('flippedOnce')
		});
		
		/*
		card.click(function() {
			// Flips the card from face-down to face-up.
			var flipped = $( this ).addClass('open show');
			// Puts the card's symbol name into the openCards array.
			openCards.push(flipped.children().attr('class'));
			// Stops the event.
			card.off('click');
			console.log('flippedOnce')
			console.log(openCards);
		});
		*/

	}

	/*
	// Puts the card's symbol name into the openCards array.
	function addToArray(array) {
		openCards.push(flipped.children().attr('class'));
		return array;
	}
	*/

	// This compares the two clicked cards to see if they are the same and returns boolean.
	function compareCards(array) {
		if (openCards[0] === openCards[1]) {
			return true;
		} else {
			return false;
		}
	}

	// This function will lock the matches.
	function lockMatch() {
		// code
	}

	// This flips the two unmatched cards back over. UNTESTED
	function flipBackOver(array) {
		deck.children().removeClass('open show');
		array = [];
		return array;
	}

	// Flips the card from face-down to face-up.
	function cardFlipper() {
		if (openCards.length < 1) {
			// How do I get this to run first and then 
			// wait till it's done before it does the next step?
			flipOnce();
			// WHY DOES THIS RUN FIRST!?
			console.log("this should run after the card is flipped!");
		} else {
			flipOnce();
			var compared = compareCards(openCards);
			console.log(compared);
			if (compared === true) {
				lockMatch();
			} else {
				flipBackOver(openCards);
			}
		}
	}
	cardFlipper();	
}

startGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// *** Stuff that does work: ***

/*
.removeClass();
.addClass('match');

card.click(function() {
	$( this ).addClass('open show');
});

	// FLips forever.
	function flipForever() {
		card.click(function() {
			var flippy = $( this ).addClass('open show');
			openCards.push(flippy.children().attr('class'));
			console.log(openCards);
			console.log('flippin forever!')
		});
	}


*/

// Stuff that doesn't work:

/*
function compareCards(variable, array) {
		if (flipped === array[0]) {
			console.log('This is a test. Success!')
		} else {
			return array;
		}
		return array;
	}


	function compareCards() {
		console.log('Shit!');
		
		if (flipped === openCards[0]) {
			$( this ).removeClass('open show');
			$( this ).addClass('match');
		} else {
			$( this ).removeClass('open show')
		}
*/

/*
var flippedClass = flipped.children().attr('class');
*/

// This switches the card to 'card open show' when clicked
/*
function cardFlipper() {
	card.click(function() {
		$( this ).***class is lowercase dink***addclass( 'open show' );
	});
}
*/

/*
function cardFlipper(openCards) {
	if (openCards.length === 0){
		card.click(function() {
			var flipped = $( this ).addClass( 'open show' );
			openCards.push(flipped.children());
			});
		}
	}
*/

// Each time a card is opened it goes in the openCards array.
	/*
	*YOU FORGOT THE VAR* openCards = [];
	if (openCards.length() === 0) {
		card.click(function() {
			$( this ).add*CLASS SHOULD BE UPPERCASEclass( 'open show' )
		});
	} else {
		console.log("It's full mang");
	}
	*/

// This sets moves to 0. Currently not editable.
// :/ Actually this doesn't even work at all.
// moves.text('0');