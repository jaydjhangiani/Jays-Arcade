let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsover': false,
};

console.log(firebase)


const YOU = blackjackGame['you'];

const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');

const winSound = new Audio('static/sounds/cash.mp3');

const lossSound = new Audio('static/sounds/aww.mp3');

const blackjackHit = () => {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
        console.log(YOU['score']);
    }

}


document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);


function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}
function blackjackDeal() {
    if (blackjackGame['turnsover'] === true) {

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#blackjack-result').textContent = 'Lets Play!';
        document.querySelector('#blackjack-result').style.color = 'aliceblue';

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white';

        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').style.color = 'white';

        blackjackGame['turnsover'] = true;

        const button1 = document.querySelector("#blackjack-stand-button");
        button1.disabled = false;


    }
}

function updateScore(card, activePlayer) {
    //if adding 11 keeps below 21, add 11. Else add 1.
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1]
        }
        else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {

    blackjackGame['isStand'] = true;
    const b = document.querySelector('#blackjack-stand-button')
    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {

        b.disabled = true
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    b.disabled = false
    blackjackGame['turnsover'] = true;
    let winner = computeWinner();
    showResult(winner);

}
function computeWinner() {
    let winner;
    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins'] += 1;
            winner = YOU;
        }
        else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses'] += 1;
            winner = DEALER;
        }
        else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws'] += 1;
        }
    }
    else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = DEALER;
        blackjackGame['losses'] += 1;
    }
    else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws'] += 1;
    }
    console.log(blackjackGame);
    return winner;
}

function showResult(winner) {

    let message, messageColor;

    if (blackjackGame['turnsover'] === true) {

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Won!';
            messageColor = 'green';
            winSound.play();
        }

        else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost!';
            messageColor = 'red';
            lossSound.play();
        }

        else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You Drew!'
            messageColor = 'yellow'
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;

        const button1 = document.querySelector("#blackjack-stand-button");
        button1.disabled = true;

    }

    let w = blackjackGame['wins']
    let d = blackjackGame['draws']
    let l = blackjackGame['losses']

    t = w + d + l;

    console.log(t)

    if (t == '5') {
        const lol = document.querySelector('#lol')
        lol.textContent = 'Press Deal to Start Again';
        const button = document.querySelector("#blackjack-hit-button");
        button.disabled = true;
        const button1 = document.querySelector("#blackjack-stand-button");
        button1.disabled = true;
        const button2 = document.querySelector("#blackjack-deal-button");
        button2.addEventListener('click', e => {
            location.reload();
        })

        fun()
    }
}

function fun() {
    let w = blackjackGame['wins']
    let d = blackjackGame['draws']
    let l = blackjackGame['losses']

    let total = w * 100 + d * 50 + l * 25
    console.log('TOTAL:', total);

    auth.onAuthStateChanged(user => {
        //console.log(user.uid)
        if (user) {
            db.collection('users')
                .doc(user.uid)
                .get()
                .then((snapshot) => {
                    renderUsername(snapshot)
                })
                .catch((err) => {
                    alert(err.message);
                });

            function renderUsername(doc) {
                let u = doc.data().username
                let s = doc.data().score
                let final = s + total
                console.log(final, u)

                db.collection("scores")
                    .add({
                        username: u,
                        game: 'Blackjack',
                        score: total,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .catch((err) => {
                        alert(err.message);
                    });

                db.collection('users').doc(user.uid).update({
                    score: final
                })

            }
        }

    })
}
