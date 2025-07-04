let score = JSON.parse(localStorage.getItem('score')) ||  {
                wins: 0,
                losses: 0,
                ties: 0
            };

        updateScoreElement();

        /* if (!score) {
            score = {
                wins: 0,
                losses: 0,
                ties: 0
            };
        } */

        let isAutoPlay = false;
        let intervalId;
        function autoPlay(){
            if(!isAutoPlay){
                intervalId = setInterval(function(){
                    const move = pickComputerMove();
                    playGame(move);
                }, 2000);
                isAutoPlay=true;
            }
            else{
                clearInterval(intervalId);
                isAutoPlay=false;
            }
        }

        function playGame(playerMove){
            const computerMove = pickComputerMove();
            let result = '';
            if(playerMove==='scissors'){
                if(computerMove === 'rock'){
                    result = 'You lose';
                }
                else if(computerMove ==='paper'){
                    result = 'You win';
                }
                else if(computerMove ==='scissors'){
                    result = 'Tie';
                }
            }

            else if(playerMove === 'paper'){
                if(computerMove === 'rock'){
                    result = 'You win';
                }
                else if(computerMove ==='paper'){
                    result = 'Tie';
                }
                else if(computerMove ==='scissors'){
                    result = 'You lose';
                }
            }

            else{
                if(computerMove === 'rock'){
                    result = 'Tie';
                }
                else if(computerMove ==='paper'){
                    result = 'You lose';
                }
                else if(computerMove ==='scissors'){
                    result = 'You win';
                }
            }

            if (result==='You win'){
                score.wins+=1;
            }
            else if (result === 'You lose'){
                score.losses+=1;
            }
            else{
                score.ties+=1;
            }

            localStorage.setItem('score',JSON.stringify(score));

            updateScoreElement();
            document.querySelector('.js-result').innerHTML = ` The result is ${result}!!`;
            document.querySelector('.js-moves').innerHTML = `You Picked
        <img src="./images/${playerMove}-emoji.png">, And Computer Picked 
        <img src="./images/${computerMove}-emoji.png">`;

            /*alert(`you picked ${playerMove}. computer picked ${computerMove}. The result is ${result}!!
Wins : ${score.wins}, Losses : ${score.losses}, Ties : ${score.ties}`);*/
        }

        function updateScoreElement(){
            document.querySelector('.js-score').innerHTML = `Wins : ${score.wins}, Losses : ${score.losses}, Ties : ${score.ties}`;

        }

        function pickComputerMove() {
            const randomNumber = Math.random();
            let computerMove = '';
            if(randomNumber >= 0 && randomNumber<1/3){
                computerMove = 'rock';
            }
            else if(randomNumber >= 1/3 && randomNumber<2/3){
                computerMove = 'paper';
            }
            else if(randomNumber >=2/3 && randomNumber <1 ){
                computerMove ='scissors';
            }
            return computerMove;
        }