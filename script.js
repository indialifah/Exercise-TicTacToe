// Selecting all required elements
const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");


window.onload = () => { // once window loaded 
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = () => {
        selectBox.classList.add("hide"); // hide the select box on player X button clicked
        playBoard.classList.add("show"); // show the playboard section on player X button clicked
    }

    selectOBtn.onclick = () => {
        selectBox.classList.add("hide"); // hide the select box on player O button clicked
        playBoard.classList.add("show"); // show the playboard section on player O button clicked
        players.setAttribute("class", "players active player");
    }
}

let playerXIcon = "fas fa-times"; 
let playerOIcon = "far fa-circle";

let playerSign = "X"; // suppose player will be X

runBot = true;

// user click function
function clickedBox(element) {
    if (players.classList.contains("player")) {
        element.innerHTML = `<i class="${playerOIcon}"></i>`; // add circle icon 
        players.classList.add("active");
        // if player select O, playerSign value must be O
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; // add cross icon
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner(); // call select winner function
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none"; // the selected box can't be selected again 
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); 
    setTimeout(()=>{
        bot();
    }, randomDelayTime);
}

// bot click function
function bot() {
    let array = []; // empty array to store unselected box index here
    if (runBot) {
        playerSign = "O"; // set the bot playerSign default value
    for (let i = 0; i < allBox.length; i++) {
        if (allBox[i].childElementCount == 0) { 
            array.push(i);
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
        if (players.classList.contains("player")) {
            allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; // add circle icon 
            players.classList.remove("active");
            // if player select O, bot playerSign must be X
            playerSign = "X";
            allBox[randomBox].setAttribute("id", playerSign);
        } else {
            allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; // add cross icon
            players.classList.remove("active");
            allBox[randomBox].setAttribute("id", playerSign);
        }
        selectWinner();
    }
    allBox[randomBox].style.pointerEvents = "none"; // the selected box by bot can't be selected by user
    playBoard.style.pointerEvents = "auto";
    playerSign = "X";
    }
}

// function to select the winner!!
function getClass(idname) { 
    return document.querySelector(".box" + idname).id; // return id name
}

function checkClass(val1, val2, val3, sign) {
    if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}

function selectWinner() {
    if (checkClass(1,2,3, playerSign) || checkClass(4,5,6, playerSign) || checkClass(7,8,9, playerSign) || checkClass(1,4,7, playerSign) || checkClass(2,5,8, playerSign) || checkClass(3,6,9, playerSign) || checkClass(1,5,9, playerSign) || checkClass(3,5,7, playerSign)) {
        console.log(playerSign + " " + "is the winner");

        runBot = false;
        bot(runBot);

        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);

        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;

    } else {
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "") {
            runBot = false;
            bot(runBot);

            setTimeout(() => {
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700);

            wonText.textContent = `Match has been drawn!`;
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload();
}