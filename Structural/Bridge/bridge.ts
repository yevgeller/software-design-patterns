// class Interior {
//   seatMaterial: string;
// }

// class ClothInterior extends Interior {
//   constructor() {
//     super();
//     this.seatMaterial = "cloth";
//   }
// }

// class LeatherInterior extends Interior {
//   constructor() {
//     super();
//     this.seatMaterial = "leather";
//   }
// }

// class BlackLeatherInterior extends LeatherInterior {
//   seatColor: string;
//   constructor() {
//     super();
//     this.seatColor = "black";
//   }
//   operate = () => console.log('Black leather');
// }

// class BlackClothInterior extends ClothInterior {
//   seatColor: string;
//   constructor() {
//     super();
//     this.seatColor = "black";
//   }
// }

// class RedLeatherInterior extends LeatherInterior {
//   seatColor: string;
//   constructor() {
//     super();
//     this.seatColor = "red"; //duplication
//   }
// }

// class RedClothInterior extends ClothInterior {
//   seatColor: string;
//   constructor() {
//     super();
//     this.seatColor = "red"; //duplication
//   }
// }

// //what about adding another color? Or another material?

// class SeatColor {
//   seatColor: string;
// }

// class RedSeatColor extends SeatColor {
//   constructor() {
//     super();
//     this.seatColor = "red";
//   }
// }

// class BlackSeatColor extends SeatColor {
//     constructor() {
//         super();
//         this.seatColor = "black";
//     }
// }
// //need to extract one dimension into
// //Abstraction/interface -- control layer, outsource work to implementation
// //Implementation/platform -- does the work

// class Pizza2 {
//   shape: string;
// }
// //chef cooking --
// //pilot and plane
// /*
// pilot can fly intel missions or can fly against aircraft or destroy land targets or practice flights
// plane can have weapons, can have missiles, guns, extra fuel

// implementation
// A single home PC
// + playAGame()
// + sendEmail() //different e-mail application, gmail or Outlook
// + doWork() //use VisualStudio or Word

// Abstraction: user
// */

class CarInterior {
  model: string;
  interiorMaterial: string;
  interiorColor: string;
  constructor(model: string, color: string, material: string) {
    this.model = model;
    this.interiorMaterial = "any";
    this.interiorColor = "any";
  }

  getInteriorMaterial = () =>
    console.log(`base class, ${this.interiorMaterial} material`);
  getInteriorColor = () =>
    console.log(`base class, ${this.interiorColor} interior color`);
}

class LeatherInterior extends CarInterior {
  constructor(model: string, color: string, material: string) {
    super(model, color, material);
    this.model = model;
    this.interiorColor = color;
    this.interiorMaterial = material;
  }

  
}

let li = new LeatherInterior("A", "blue", "leather");

li.getInteriorColor();
li.getInteriorMaterial();