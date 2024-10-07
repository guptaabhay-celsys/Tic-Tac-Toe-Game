let boxes = document.querySelectorAll('.box')
let resetBtn = document.querySelector('.reset')
let newGameBtn = document.querySelector('.newGame')
let winText = document.querySelector('.winText')
let resultDiv = document.querySelector('.result-div')

let turnO = true;
let count = 0; 

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

function resetGame(){
    turnO = true;
    count = 0;
    enableBoxes();
    resultDiv.classList.add('hidden')
}


boxes.forEach((box) => {
    box.addEventListener('click', (e) => {
        e.stopPropagation();
        if(box.textContent == '' && turnO){
            box.textContent = 'O';
        }
        else{
            box.textContent = 'X';
        }
        turnO = !turnO;
        box.disabled = true;
        count++;
        let isWinner = checkWinner();

        if(count == 9 && !isWinner){
            gameDraw();
        }
    })
})

function enableBoxes(){
    for(let box of boxes){
        box.innerText = '';
        box.disabled = false;
    }
}

function disableBoxes(){
    for(let box of boxes){
        box.disabled = true;
    }
}

const gameDraw = () => {
    winText.innerText = `Game was a Draw.`;
    resultDiv.classList.remove("hidden");
    disableBoxes();
  };

  function showWinner(winner){
    winText.innerText = `Congratulations, Winner is ${winner}`;
    resultDiv.classList.remove('hidden');
    disableBoxes();
}


const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
    

    if(pos1 != '' && pos2 != '' && pos3 != ''){
        if(pos1 == pos2 && pos2 == pos3){
            showWinner(pos1)
            return true;
        }
    }
}
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

