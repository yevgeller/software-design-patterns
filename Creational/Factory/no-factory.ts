namespace WhoNeedsAFactory {
  class ToyCar {
    whatIsIt(): void {
      console.log("this is a toy car");
    }

    play(): void {
      console.log("vroom!!");
    }
  }

  class ToyProductionPlant {
    makePresents(): ToyCar[] {
      let carA = new ToyCar();
      let carB = new ToyCar();
      let carC = new ToyCar();
      return new Array(carA, carB, carC);
    }

    makeAToy(): ToyCar {
      return new ToyCar();
    }
  }

  let tpp = new ToyProductionPlant();
  let car = tpp.makePresents();
  car.forEach((x) => x.play());
}
