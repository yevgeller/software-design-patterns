class Interior {
  //Pizza
  seatMaterial: string; //shape: string;
  seatColor: string; //kind: string;
  constructor() {
    this.seatMaterial = "round";
    this.seatColor = "cheese";
  }
}

class BlackLeatherInterior extends Interior {
  //SquareCheesePizza
  constructor() {
    super();
    this.seatMaterial = "leather";
    this.seatColor = "black";
  }
  moveSeatBack(): void {
console.log('seat moved back');
  }
  reclineSeatBack(): void {
      console.log('seat reclined back');
  }
}

class BlackClothInterior extends Interior {
  //SquareSupremePizza
  constructor() {
    super();
    this.seatMaterial = "cloth";
    this.seatColor = "black";
  }
}

class RedLeatherInterior extends Interior {
  //RoundCheesePizza
  constructor() {
    super();
    this.seatMaterial = "leather";
    this.seatColor = "red";
  }
}

class RedClothInterior extends Interior {
  //RoundSupremePizza
  constructor() {
    super();
    this.seatMaterial = "cloth";
    this.seatColor = "red";
  }
}

//need to extract one dimension into
//Abstraction/interface -- control layer, outsource work to implementation
//Implementation/platform -- does the work

class Pizza2 {
  shape: string;
}
//chef cooking --
//pilot and plane
/*
pilot can fly intel missions or can fly against aircraft or destroy land targets or practice flights
plane can have weapons, can have missiles, guns, extra fuel


implementation
A single home PC
+ playAGame()
+ sendEmail() //different e-mail application, gmail or Outlook
+ doWork() //use VisualStudio or Word

Abstraction: user
*/
