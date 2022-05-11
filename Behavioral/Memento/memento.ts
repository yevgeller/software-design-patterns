// let eh = "a";
// while (eh !== "o") {
//   console.log(eh);
//   eh = prompt("enter o to quit");
// }

class Game {
  word: string;
  guesses: string[];
  numberOfErrors: number;
  numberOfAllowedAttempts: number;

  constructor() {
    this.word = "SECRET";
    this.guesses = [];
    this.numberOfErrors = 0;
    this.numberOfAllowedAttempts = 6;
  }

  processGuess(guess: string) {
    if (this.guesses.indexOf(guess) >= 0) {
      console.log(`already guessed ${guess}. Try again`);
      return;
    }
    this.guesses.push(guess);
    if (this.word.indexOf(guess) >= 0) console.log("Good guess!");
    else {
      console.log(`bad guess! This word contains no ${guess}.`);
      console.log(
        `You have ${
          this.numberOfAllowedAttempts - this.numberOfErrors
        } guesses left`
      );
      this.numberOfErrors++;
    }
    console.log(this.currentPuzzleState());
  }

  private currentPuzzleState(): string {
    let result = ""; //'_ _ _ _ _ _';
    for (let i = 0; i < this.word.length; i++) {
      if (this.guesses.indexOf(this.word[i].toString()) >= 0) {
        result += this.word[i].toString().toUpperCase() + " ";
      } else {
        result += "_ ";
      }
    }
    return result;
  }
}

let g = new Game();
g.guesses = ["S", "T", "E"];
setTimeout(() => g.processGuess("A"), 500);
setTimeout(() => g.processGuess("C"), 520);
setTimeout(() => g.processGuess("H"), 510);
setTimeout(() => g.processGuess("K"), 530);
setTimeout(() => g.processGuess("L"), 550);
setTimeout(() => g.processGuess("M"), 560);
setTimeout(() => g.processGuess("N"), 570);
setTimeout(() => g.processGuess("O"), 580);
