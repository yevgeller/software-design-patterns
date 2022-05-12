class Game {
  private word: string;
  guesses: string[];
  numberOfErrors: number;
  private numberOfAllowedAttempts: number;
  private gameOver: boolean;
  supportUndo: boolean;
  message: string;

  constructor() {
    this.word = "SECRET";
    this.guesses = [];
    this.numberOfErrors = 0;
    this.numberOfAllowedAttempts = 6;
    console.log(this.currentPuzzleState());
    this.supportUndo = false;
  }

  processGuess(guess: string) {
    if (guess.length !== 1) {
      this.message = "One letter at a time, please";
      return;
    }
    guess = guess.toUpperCase();
    if (!/^[a-zA-Z\-]+$/.test(guess)) {
      this.message = "alphabetic characters only, please";
      return;
    }
    if (this.guesses.indexOf(guess) >= 0) {
      this.message = `already guessed ${guess}. Try again`;
      return;
    }

    this.guesses.push(guess);

    if (this.word.indexOf(guess) >= 0) {
      this.message = "Good guess!";
      if (this.currentPuzzleState().indexOf("_") < 0) {
        this.message = `Victory! With only ${this.numberOfErrors} errors!`;
        this.gameOver = true;
      }
    } else {
      this.numberOfErrors++;
      this.message = `bad guess! This word contains no ${guess}. You have ${this.attemptsLeft()} guesses left`;
      if (this.attemptsLeft() === 0) {
        this.gameOver = true;
        this.message = `You lost. The word was: ${this.word.toUpperCase()}`;
      }
    }
    //console.log(this.currentPuzzleState());
  }

  private attemptsLeft(): number {
    return this.numberOfAllowedAttempts - this.numberOfErrors;
  }

  currentPuzzleState(): string {
    let result = "";
    for (let i = 0; i < this.word.length; i++) {
      if (this.guesses.indexOf(this.word[i].toString()) >= 0) {
        result += this.word[i].toString().toUpperCase() + " ";
      } else {
        result += "_ ";
      }
    }
    return result;
  }

  public gameIsOver(): boolean {
    return this.gameOver;
  }
}

class Memento {
  guesses: string[];
  numberOfErrors: number;
  constructor(guesses: string[], numberOfErrors: number) {
    this.guesses = guesses;
    this.numberOfErrors = numberOfErrors;
  }
}

class GameWithUndo extends Game {
  constructor() {
    super();
    this.supportUndo = true;
    console.log("undo supported!");
  }
  public createCheckPoint(): Memento {
    return new Memento([...this.guesses], this.numberOfErrors);
  }

  public processCheckPoint(checkPoint: Memento): void {
    this.guesses.length = 0;
    this.guesses.push(...checkPoint.guesses);
    this.numberOfErrors = checkPoint.numberOfErrors;
  }
}

let g = new Game(); //Originator
let input = ".";
// while (!g.gameIsOver()) {
//   //this main program is the CareTaker
//   input = prompt("enter a letter");
//   console.log("Input: ", input);
//   g.processGuess(input);
// }

let g2 = new GameWithUndo();

let mementos = [] as Array<Memento>;

while (!g2.gameIsOver()) {
  //this main program is the CareTaker
  input = prompt("enter a letter, or '-' to undo");
  console.log("Input: ", input);
  if (input === "-" && mementos.length > 1) {
    mementos.pop();
    g2.processCheckPoint(mementos[mementos.length - 1]);
  } else {
    g2.processGuess(input);
    let m = g2.createCheckPoint();
    console.log(m.guesses);
    mementos.push(m);
    console.log(g2.message);
    console.log(g2.currentPuzzleState());
  }
}
