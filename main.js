/**
 * @param  {} 'load'
 * @param  {} (
 */
window.addEventListener('load',() => {

    /**
     * @param  {} document.querySelectorAll(".cell"
     * @param  {} ;constturn=document.querySelector(".turn"
     * @param  {} ;constreset=document.querySelector(".reset"
     * @param  {} ;constresult=document.querySelector(".result"
     */
    const cells = Array.from(document.querySelectorAll(".cell"));
    const turn = document.querySelector(".turn");
    const reset = document.querySelector(".reset");
    const result = document.querySelector(".result");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currPlayer = "X";
    let onGame = true;

    const playerX = "X WON";
    const playerO = " O WON";
    const tie = "TIE";

    /*
          Indexes within the board
          [0] [1] [2]
          [3] [4] [5]
          [6] [7] [8]
    */
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    /**
     * @param  {} =>{letwonRound=false;for(leti=0;i<8;i++
     * @param  {} {constwin=winConditions[i];constfirst=board[win[0]]constsecond=board[win[1]];constthirdth=board[win[2]];if(first===''||second===''||thirdth===''
     * @param  {} {continue;}if(first===second&&second===thirdth
     * @param  {} {wonRound=true;break;}}if(wonRound
     * @param  {playerO} {announce(currPlayer==='X'?playerX
     */
    const handleResult = () => {
        let wonRound = false;
        for (let i = 0; i < 8; i++) {
            const win = winConditions[i];
            const first = board[win[0]]
            const second = board[win[1]];
            const thirdth = board[win[2]];

            if (first === '' || second === '' || thirdth === '') {
                continue;
            }
            if (first === second && second === thirdth) {
                wonRound = true;
                break;
            }
        }
        if (wonRound) {
            announce(currPlayer === 'X' ? playerX : playerO)
            onGame = false
            return
        }
        if (!board.includes('')) announce(tie)

    };

    /**
     * @param  {} player
     * @param  {} =>{switch(player
     * @param  {result.innerHTML='Player<spanclass="turn">X<span>Won'break;caseplayerO:result.innerHTML='Player<spanclass="turn">O<span>Won'break;casetie:result.innerText='Tie'break;}result.classList.remove('hide'} {caseplayerX
     */
    const announce = (player) => {
        switch (player) {
            case playerX:
                result.innerHTML = 'Player <span class="turn">X<span> Won'
                break;
            case playerO:
                result.innerHTML = 'Player <span class="turn">O<span> Won'
                break;
            case tie:
                result.innerText = 'Tie'
                break;
        }
        result.classList.remove('hide')
    }

    /**
     * @param  {} cell
     * @param  {} =>{if(cell.innerText==='X'||cell.innerText==='O'
     */
    const isValidAction = (cell) => {
        if (cell.innerText === 'X' || cell.innerText === 'O')
            return false
        return true
    }

    /**
     * @param  {} index
     */
    const updateBoard = (index) => {
        board[index] = currPlayer
    }

    /**
     * @param  {} =>{turn.classList.remove(`player${currPlayer}`
     * @param  {'X';turn.innerText=currPlayer;turn.classList.add(`player${currPlayer}`} ;currPlayer=currPlayer==='X'?'O'
     */
    const changePlayer = () => {
        turn.classList.remove(`player${currPlayer}`);
        currPlayer = currPlayer === 'X' ? 'O' : 'X';
        turn.innerText = currPlayer;
        turn.classList.add(`player${currPlayer}`);
    }

    /**
     * @param  {} cell
     * @param  {} index
     * @param  {} =>{if(isValidAction(cell
     * @param  {} &&onGame
     * @param  {} {cell.innerText=currPlayercell.classList.add(`player${currPlayer}`
     * @param  {} updateBoard(index
     * @param  {} handleResult(
     * @param  {} changePlayer(
     */
    const userMove = (cell, index) => {
        if (isValidAction(cell) && onGame) {
            cell.innerText = currPlayer
            cell.classList.add(`player${currPlayer}`)
            updateBoard(index)
            handleResult()
            changePlayer()
        }
    }

    /**
     * @param  {} =>{board=[""
     * @param  {} ""
     * @param  {} ""
     * @param  {} ""
     * @param  {} ""
     * @param  {} ""
     * @param  {} ""
     * @param  {} ""
     * @param  {} ""]onGame=true;result.classList.add('hide'
     * @param  {} ;if(currPlayer==='O'
     * @param  {} {changePlayer(
     * @param  {} ;}cells.forEach(cell=>{cell.innerText='';}
     */
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""]
        onGame = true;
        result.classList.add('hide');

        if (currPlayer === 'O') {
            changePlayer();
        }

        cells.forEach(cell => {
            cell.innerText = '';
        }
        )
    }

    /**
     * @param  {} (cell
     * @param  {} index
     * @param  {} =>{cell.addEventListener('click'
     * @param  {} (
     * @param  {} =>userMove(cell
     * @param  {} index
     * @param  {} ;}
     */
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => userMove(cell, index));
    });

    /**
     * @param  {} 'click'
     * @param  {} resetBoard
     */
    reset.addEventListener('click', resetBoard);

});
