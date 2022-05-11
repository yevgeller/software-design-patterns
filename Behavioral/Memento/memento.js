// let eh = "a";
// while (eh !== "o") {
//   console.log(eh);
//   eh = prompt("enter o to quit");
// }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game = /** @class */ (function () {
    function Game() {
        this.word = "SECRET";
        this.guesses = [];
        this.numberOfErrors = 0;
        this.numberOfAllowedAttempts = 6;
        console.log(this.currentPuzzleState());
        this.supportUndo = false;
    }
    Game.prototype.processGuess = function (guess) {
        if (guess.length !== 1) {
            console.log("One letter at a time, please");
            return;
        }
        guess = guess.toUpperCase();
        if (!/^[a-zA-Z\-]+$/.test(guess)) {
            console.log("alphabetic characters only, please");
            return;
        }
        if (this.guesses.indexOf(guess) >= 0) {
            console.log("already guessed ".concat(guess, ". Try again"));
            return;
        }
        this.guesses.push(guess);
        var displayed = this.currentPuzzleState();
        if (this.word.indexOf(guess) >= 0) {
            console.log("Good guess!");
            if (displayed.indexOf("_") < 0) {
                console.log("Victory! With only ".concat(this.numberOfErrors, " errors!"));
                this.gameOver = true;
            }
        }
        else {
            this.numberOfErrors++;
            console.log("bad guess! This word contains no ".concat(guess, "."));
            console.log("You have ".concat(this.attemptsLeft(), " guesses left"));
            if (this.attemptsLeft() === 0) {
                this.gameOver = true;
                console.log("You lost. The word was: ".concat(this.word.toUpperCase()));
            }
        }
        console.log(displayed);
    };
    Game.prototype.attemptsLeft = function () {
        return this.numberOfAllowedAttempts - this.numberOfErrors;
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
    Game.prototype.gameIsOver = function () {
        return this.gameOver;
    };
    return Game;
}());
var Memento = /** @class */ (function () {
    function Memento(guesses, numberOfErrors) {
        this.guesses = guesses;
        this.numberOfErrors = numberOfErrors;
    }
    return Memento;
}());
var GameWithUndo = /** @class */ (function (_super) {
    __extends(GameWithUndo, _super);
    function GameWithUndo() {
        var _this = _super.call(this) || this;
        _this.supportUndo = true;
        console.log("undo supported!");
        return _this;
    }
    GameWithUndo.prototype.createCheckPoint = function () {
        return new Memento(this.guesses, this.numberOfErrors);
    };
    GameWithUndo.prototype.processCheckPoint = function (checkPoint) {
        var _a;
        this.guesses.length = 0;
        (_a = this.guesses).push.apply(_a, checkPoint.guesses);
        this.numberOfErrors = checkPoint.numberOfErrors;
    };
    return GameWithUndo;
}(Game));
var g = new Game(); //Originator
var input = ".";
// while (!g.gameIsOver()) {
//   //this main program is the CareTaker
//   input = prompt("enter a letter");
//   console.log("Input: ", input);
//   g.processGuess(input);
// }
var g2 = new GameWithUndo();
var mementos = [];
while (!g2.gameIsOver()) {
    //this main program is the CareTaker
    input = prompt("enter a letter, or '-' to undo");
    console.log("Input: ", input);
    g2.processGuess(input);
}
