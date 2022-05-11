// let eh = "a";
// while (eh !== "o") {
//   console.log(eh);
//   eh = prompt("enter o to quit");
// }
var Game = /** @class */ (function () {
    function Game() {
        this.word = "SECRET";
        this.guesses = [];
        this.numberOfErrors = 0;
    }
    Game.prototype.processGuess = function (guess) {
        if (this.guesses.indexOf(guess) >= 0) {
            console.log("already guessed ".concat(guess, ". Try again"));
            return;
        }
        this.guesses.push(guess);
        if (this.word.indexOf(guess) >= 0)
            console.log("Good guess!");
        else {
            console.log("bad guess! This word contains no ".concat(guess, "."));
            console.log("You have ".concat(6 - this.numberOfErrors, " guesses left"));
            this.numberOfErrors++;
        }
        console.log(this.currentPuzzleState());
    };
    Game.prototype.currentPuzzleState = function () {
        var result = ""; //'_ _ _ _ _ _';
        for (var i = 0; i < this.word.length; i++) {
            if (this.guesses.indexOf(this.word[i].toString()) >= 0) {
                result += this.word[i].toString().toUpperCase() + " ";
            }
            else {
                result += "_ ";
            }
        }
        return result;
    };
    return Game;
}());
var g = new Game();
g.guesses = ["S", "T", "E"];
setTimeout(function () { return g.processGuess("A"); }, 500);
setTimeout(function () { return g.processGuess("C"); }, 520);
setTimeout(function () { return g.processGuess("H"); }, 510);
setTimeout(function () { return g.processGuess("K"); }, 530);
setTimeout(function () { return g.processGuess("L"); }, 550);
setTimeout(function () { return g.processGuess("M"); }, 560);
setTimeout(function () { return g.processGuess("N"); }, 570);
setTimeout(function () { return g.processGuess("O"); }, 580);
