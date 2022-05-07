interface IEnumerable {
  getEnumerator(): IEnumerator;
}

interface IEnumerator {
  current(): number;
  moveNext(): boolean;
}
//class IngredientCollection
class FibonacciSequence implements IEnumerable {
  numberOfDigits: number;
  constructor(numberOfDigits: number) {
    this.numberOfDigits = numberOfDigits;
  }
  getEnumerator(): IEnumerator {
    return new FibonacciEnumerator(this.numberOfDigits);
  }
}

class FibonacciEnumerator implements IEnumerator {
  numberOfDigits: number;
  currentPosition: number;
  previousTotal: number;
  currentTotal: number;
  constructor(numberOfDigits: number) {
    this.numberOfDigits = numberOfDigits;
    this.reset();
  }
  current(): number {
    return this.currentTotal;
  }
  moveNext(): boolean {
    let newTotal = this.previousTotal + this.currentTotal;
    this.previousTotal = this.currentTotal;
    this.currentTotal = newTotal;
    this.currentPosition++;
    return this.currentPosition <= this.numberOfDigits;
  }

  private reset(): void {
    this.currentPosition = 0;
    this.previousTotal = 0;
    this.currentTotal = 1;
  }
}

let f = new FibonacciSequence(10);
let e = f.getEnumerator();
while (e.moveNext()) {
  console.log(e.current());
}

//https://app.pluralsight.com/library/courses/design-patterns-on-ramp/table-of-contents
