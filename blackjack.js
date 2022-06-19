
var dealerSum = 0;
var yourSum = 0;

// because ace can have two values
var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;

var canHit = true; //allows player to draw card while your sum is < 21

//win the page loads we will call a function and we will call build deck
window.onload = function (){
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck(){
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    //types: club, diamonds, hearts, spade
    let types = ["C", "D", "H", "S"];
    //initialize an empty deck
    deck = [];

    for (let i = 0; i < types.length; i++){
        for (let j = 0; j < values.length; j++){
            deck.push(values[j]+ "-" + types[i]); 
            //should be 52 cards total in Deck Array
        }
    }

    // console.log(deck);
}

function shuffleDeck(){
    for (let i = 0; i < deck.length; i++){
        //j will get random number between 1 and 52
        let j = Math.floor(Math.random()* deck.length);
        //to make sure there isn't any duplicates
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);

}


function startGame(){
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    // console.log(dealerSum);
    // console.log(dealerAceCount);

    while (dealerSum < 17){
        //creating an <img> tag 
        // example created: <img src="./cards/4-C.png">
        let cardImg = document.createElement("img");
        let card = deck.pop();
        //we set the path for the img tag src attribute
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        //appending card with while loop
        document.getElementById("dealer-cards").append(cardImg);
    }

    console.log(dealerSum);

    //now we get our cards
    for (let i = 0; i < 2; i++){
        //creating an <img> tag 
        let cardImg = document.createElement("img");
        let card = deck.pop();
        //we set the path for the img tag src attribute
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        //appending card with while loop
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);
    //for the buttons now
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("replay").addEventListener("click", );

}

function stay(){
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    //flip the deallers card
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";

    if(yourSum > 21){
        message = "You Lose";
    }
    else if(dealerSum > 21){
        message = "You Win";
    }
    else if (yourSum == dealerSum){
        message = "Tie";
    }
    else if (yourSum > dealerSum){
        message = "You Win!";
    }
    else if (yourSum < dealerSum){
        message = "You Lose!";
    }

    //sending message into html doucment
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText= yourSum;
    document.getElementById("results").innerText = message;
}

function hit(){
    if(!canHit){
        return;
    }

    //creating an <img> tag 
    let cardImg = document.createElement("img");
    let card = deck.pop();
    //we set the path for the img tag src attribute
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    //appending card with while loop
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21){
        canHit = false;
    }

}

function reduceAce(playerSum, playerAceCount){
    while(playerSum > 21 && playerAceCount > 0){
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;


}

function getValue(card){
    let data = card.split("-"); //"4-C" -> ["4", "C"]
    let value = data[0];

    //isNaN function checks value and if it is a letter A
    //it returns true and then it checks again if this time the letter is 
    //A if its A return 11 else return 10 (because J, Q, K are 10)
    if (isNaN(value)){
        if (value == "A"){
            return 11;
        }
        return 10;
    }

    //^^ about if it reunts all faluse we can conver the value to in Int with parseInt function
    return parseInt(value);
}

function checkAce(card){
    if(card[0] == "A"){
        return 1;
    }
    return 0;
}







