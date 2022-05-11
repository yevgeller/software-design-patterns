class Game {
  private word: string;
  guesses: string[];
  numberOfErrors: number;
  private numberOfAllowedAttempts: number;
  private gameOver: boolean;
  supportUndo: boolean;

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
      console.log("One letter at a time, please"); //change this to a property
      return;
    }
    guess = guess.toUpperCase();
    if (!/^[a-zA-Z\-]+$/.test(guess)) {
      console.log("alphabetic characters only, please");
      return;
    }
    if (this.guesses.indexOf(guess) >= 0) {
      console.log(`already guessed ${guess}. Try again`);
      return;
    }

    this.guesses.push(guess);
    let displayed = this.currentPuzzleState() as string;

    if (this.word.indexOf(guess) >= 0) {
      console.log("Good guess!");
      if (displayed.indexOf("_") < 0) {
        console.log(`Victory! With only ${this.numberOfErrors} errors!`);
        this.gameOver = true;
      }
    } else {
      this.numberOfErrors++;
      console.log(
        `bad guess! This word contains no ${guess}. You have ${this.attemptsLeft()} guesses left`
      );
      if (this.attemptsLeft() === 0) {
        this.gameOver = true;
        console.log(`You lost. The word was: ${this.word.toUpperCase()}`);
      }
    }
    console.log(displayed);
  }

  private attemptsLeft(): number {
    return this.numberOfAllowedAttempts - this.numberOfErrors;
  }

  private currentPuzzleState(): string {
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
    return new Memento(this.guesses, this.numberOfErrors);
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
    mementos.push(g2.createCheckPoint());
    g2.processGuess(input);
  }
}
