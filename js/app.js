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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


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
	var openCards = [];
	// This randomizes the face-down cards.
	shuffle(cardNames);
	cardSymbol.removeClass();
	cardSymbol.each(function(index) {
		$( this ).addClass('fa fa-' + cardNames[index]);
		index++;
	});

	function compareCards() {
		if (flipped === openCards[0])

	}

	// Flips the card from face-down to face-up.
	function cardFlipper() {
		card.click(function() {
			var flipped = 
			$( this ).addClass('open show');

			openCards.push(flipped);
			console.log(openCards);
			compareCards();
		});
	}

// This holds opened cards that are ready to be 
// checked against the next clicked card.


/*
	function cardInArray(array) {
		

		return array;
	}
*/
	cardFlipper();
}


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
startGame();
// *** Stuff that does work: ***

/*
.removeClass();
.addClass('match');

card.click(function() {
	$( this ).addClass('open show');
});
*/

// Stuff that doesn't work:

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