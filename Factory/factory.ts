namespace SoMuchBetterWithFactory {
  interface Present {
    whatIsIt(): string;
    play(): string;
  }

  class ToyCar implements Present {
    whatIsIt(): string {
      return "This is a toy car";
    }
    play(): string {
      return "vroom!!";
    }
  }

  class ToyBoat implements Present {
    play(): string {
      return "Off we go!";
    }
    whatIsIt(): string {
      return "This is a toy boat";
    }
  }

  class BagOfCoal implements Present {
    play(): string {
      return "You now have a dirty face!";
    }
    whatIsIt(): string {
      return "Bag of coal";
    }
  }

  enum ToyType {
    car,
    boat,
    coal,
  }
  //Creator class
  class ToyFactory {
    makeAToy(typeOfToy: ToyType): Present {
      switch (typeOfToy) {
        case ToyType.boat: {
          return new ToyBoat();
        }
        case ToyType.car: {
          return new ToyCar();
        }
        case ToyType.coal: {
          return new BagOfCoal();
        }
      }
    }
  }

  class ElvesFactory {
    toyFactory: ToyFactory;

    constructor(toyFactory: ToyFactory) {
      this.toyFactory = toyFactory;
    }

    makeToys(order: ToyType[]) {
      order.forEach((x) => {
        let toy = this.toyFactory.makeAToy(x);
        console.log(toy.whatIsIt());
        console.log(toy.play());
        console.log();
      });
    }
  }

  let tf = new ToyFactory();
  let toyProductionFacility = new ElvesFactory(tf);
  let order = new Array(
    ToyType.boat,
    ToyType.car,
    ToyType.boat,
    ToyType.car,
    ToyType.coal,
    ToyType.car
  );
  toyProductionFacility.makeToys(order);
  /*
  let boat = tf.makeAToy(ToyType.boat);
  console.log(boat.whatIsIt());

  let car = tf.makeAToy(ToyType.car);
  console.log(car.whatIsIt());

  let coal = tf.makeAToy(ToyType.coal);
  console.log(coal.whatIsIt());

   So what? We just added another level of complexity.

The answer is that if we need to extend it further to other toys, it'll be easier
*/
}
