interface IIterable {
  getIterator(): IIterator;
}

class FibonacciSequence implements IIterable {
  //container
  numberOfDigits: number;
  constructor(numberOfDigits: number) {
    this.numberOfDigits = numberOfDigits;
  }
  getIterator(): IIterator {
    return new FibonacciEnumerator(this.numberOfDigits);
  }
}

interface IIterator {
  current(): number;
  moveNext(): boolean;
}
class FibonacciEnumerator implements IIterator {
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
let e = f.getIterator();
let output = "Result: ";
while (e.moveNext()) {
  output += e.current() + " ";
}
console.log(output);
//https://app.pluralsight.com/library/courses/design-patterns-on-ramp/table-of-contents
