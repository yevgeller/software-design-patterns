namespace AllIsBetterWithAMethodToCloneStuff {
  interface ICloneable {
    clone();
  }

  class Marble implements ICloneable {
    size: number;
    color: string;
    constructor(size: number, color: string) {
      this.size = size;
      this.color = color;
    }
    clone(): Marble {
      return new Marble(this.size, this.color);
    }
    displayProperties(): string {
      return `size: ${this.size}; color: ${this.color}`;
    }
  }

  let greenMarble = new Marble(1, "green");
  let redMarble = greenMarble.clone();
  redMarble.color = "red";
  console.log(greenMarble.displayProperties());
  console.log(redMarble.displayProperties());
}
