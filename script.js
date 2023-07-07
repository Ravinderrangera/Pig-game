// Selecting Elements
const btnNew = document.querySelector('.btn--new');
const btnhHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const diceEl = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');


// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function(){
scores = [0,0];
currentScore = 0 ;
 activePlayer = 0;
 playing = true;

    score0El.textContent = 0 ;
    score1El.textContent = 0 ;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
   
    diceEl.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    
}
init();

const switchPlayer = function (){ document.getElementById(`current--${activePlayer}`).textContent = 0;
   
activePlayer = activePlayer === 0 ? 1 : 0; //This allows us to switch 0 to 1.
currentScore = 0 ;
player0.classList.toggle('player--active');  // What toggle will do is that it will add the class if it is not there and if it is there, it will remove it.
player1.classList.toggle('player--active');
}


// Rolling dice functionality
btnRoll.addEventListener('click', function(){
    if (playing){// 1. Generating a Random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
    
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; 
    
    // 3. Check for rolled 1: if true
    if(dice !== 1){
        //Add dice to current score
        currentScore += dice; //( In order to actually be able to add the current dice to the current score, we need a way of saving that current score somewhere. So remember from the first project that we should not just store any data only in the DOM. So in this particular case we should not only display this current score on the user interface. Instead we also want a variable which always holds the current score of this current round.)
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    
    
    }
    else{
        //  switch to next player
        switchPlayer();
  
    
    
    }}

});

btnhHold.addEventListener('click', function(){
    if(playing){// 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        //scores[1] = score[1]+currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        
        // 2. Check if player's score is >= 50
        // Finish the game
        if (scores[activePlayer]>= 50){
            playing = false;
            diceEl.classList.add('hidden');
           
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');//(When we use query selector, we need an actual selector.)
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
          // document.querySelector(`.player--${activePlayer}`).textContent = 'WINNER';
          
        }else{
        //Switch the next player
        switchPlayer()}}

})

btnNew.addEventListener('click', init)//Just keep in mind that we do not call this fuction here. It is JavaScript who will call the init function as soon as the user clicks on the button.

