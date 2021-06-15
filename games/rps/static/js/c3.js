function rpsGame(yourChoice){
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randomTorpsInt());
    console.log(botChoice);
    results = decideWinner(humanChoice,botChoice);
    console.log(results);
    message = finalMessage(results);
    console.log(message);
    rpsfrontend(humanChoice,botChoice,message);
}

function randomTorpsInt(){
    return Math.floor(Math.random() * 3)
}

function numberToChoice(number){
    return['rock','paper','scissors'][number];
}

function decideWinner(yourChoice,computerChoice){
    
    var rpsdatabase = {
        'rock': {'scissors':1 , 'rock':0.5 , 'paper':0},
        'paper': {'rock':1 , 'paper':0.5 , 'scissors':0},
        'scissors': {'paper':1 , 'scissors':0.5, 'rock':0}
    };

    var yourScore = rpsdatabase[yourChoice][computerChoice];
    var computerScore = rpsdatabase[computerChoice][yourChoice];

    return [yourScore,computerScore];
}

function finalMessage([yourScore,computerScore]){
    if(yourScore === 0){
        return{'message':'You Lost!','color':'red'};
    }
    else if(yourScore ===0.5){
        return{'message':'You Tied!','color':'yellow'};
    }
    else{
        return{'message':'You Won!','color':'green'};
    }
    
}

function rpsfrontend(humanImageChoice,botImageChoice,finalMessage){
    var imagesdatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    };

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var msgDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesdatabase[humanImageChoice] + "'width=150 height=150 style='box-shadow: 0px 10px 50px rgba(37,50,223,1)'>";
    botDiv.innerHTML = "<img src='" + imagesdatabase[botImageChoice] + "'width=150 height=150 style='box-shadow: 0px 10px 50px rgba(243,38,223,1)'>";
   
    msgDiv.innerHTML = "<h1 style = 'color : "+ finalMessage['color'] + "; font-size: 60px; padding:30px; '>"+finalMessage['message']+"</h1>";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(msgDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

function playAgain(){
    window.location.reload();    
}