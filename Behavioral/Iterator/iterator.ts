/*class Ingredient {
  name: string;
  isDry: boolean;
  unitOfMeasure: string;
  units: string;
  constructor(
    name: string,
    isDry: boolean,
    unitOfMeasure: string,
    units: string
  ) {
    this.name = name;
    this.isDry = isDry;
    this.unitOfMeasure = unitOfMeasure;
    this.units = units;
  }
}

class Recipe {
  ingredients: Array<Ingredient>;
  directions: Array<string>;

  constructor(ingredients: Array<Ingredient>, directions: Array<string>) {
    this.ingredients = ingredients;
    this.directions = directions;
  }
}

interface IIngredientIterator {
  first(): Ingredient;
  last(): Ingredient;
  next(): Ingredient;
  previous(): Ingredient;
  currentPosition: number;
  hasNext(): boolean;
  currentItem: Ingredient;
}
*/
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
