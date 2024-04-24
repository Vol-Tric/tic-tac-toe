let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


// setting a variable for turn of player X or O
// when turnO = true , turnX = false;
let turnO = true;


// count is used to check number of counts so that a draw situation can be checked
let count = 0;


// stores all the possible winning patterns
const winPatterns = [ [0,1,2] , [3,4,5] , [6,7,8] , [0,3,6] , [1,4,7] , [2,5,8] , [0,4,8] , [6,4,2] ];




// resets the whole game
const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};


// disable the box which has been clicked so that it can not be further changed.
const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};


// enable disabled boxes , for reset or a new game
const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};


// displays the winner
const showWinner = (winner) =>{
    msg.innerText = `congratulation , winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


// display if the match is drawed
const showDraw = () =>{
    msg.innerText = `Draw , no player wins`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};





// check if anyone is a winner in the current situation , runs after each click
const checkWinner = () =>{
    count++;

    for(let pattern of winPatterns){
        
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){ //to verify that all three boxes are filled
            if(pos1Val === pos2Val && pos2Val === pos3Val && pos3Val === pos1Val){
                showWinner(pos1Val);
            }
            
        }
    }

    if(count === 9){
        showDraw();
    }
}

// this is to click each box
boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        if(turnO){
            box.innerText = "O";
            box.style.color = "#08415C";
            turnO = false;
        }
        else if(!turnO){
            box.innerText = "X";
            box.style.color = "#F19C79";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});


// button for new game
newGameBtn.addEventListener("click" , resetGame);


// button for reset game
resetButton.addEventListener("click", resetGame);



