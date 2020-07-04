function aiMove() {
    let bestScore = -Infinity;
    let move;

    // For every move
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // If turn is valid (space not filled)
            if (board[i][j] == 0) {
                // Begin minimax
                board[i][j] = ai;
                let score = minimax(0, false);
                board[i][j] = 0;

                if(score > bestScore) {
                    bestScore = score;
                    move = { i ,j };
                }
            }
        }
    }

    board[move.i][move.j] = ai;

    // Check if move wins
    checkWinner();
    redraw();

    if(winner === null) {
        currentPlayer = human;
    }
}

let scores = {
    "ai" : 10,
    "human" : -10,
    "tie" : 0
}

function minimax(depth, isMaximizing) {
    checkWinner();
    
    // When reaches game over state
    if(winner !== null){
        let score = scores[winner];
        winner = null; // Reset winner state
        return score;
    }

    if(isMaximizing) {
        let bestScore = -Infinity; 
        
        // For every move
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // If turn is valid (space not filled)
                if (board[i][j] == 0) {
                    // Begin minimax
                    board[i][j] = ai;
                    let score = minimax(depth + 1, false);
                    board[i][j] = 0;

                    bestScore = max(score, bestScore);
                }
            }
        }
        return bestScore;
    }

    if(!isMaximizing) {
        let bestScore = Infinity; 
        
        // For every move
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // If turn is valid (space not filled)
                if (board[i][j] == 0) {
                    // Begin minimax
                    board[i][j] = human;
                    let score = minimax(depth + 1, true);
                    board[i][j] = 0;

                    bestScore = min(score, bestScore);
                }
            }
        }
        return bestScore;
    }

}

function minimize() {

}

function maximize() {

}