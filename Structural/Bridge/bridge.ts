namespace NoBridge {
  class CarInterior {
    model: string;
    interiorColor: string;
    interiorMaterial: string;
    constructor(model: string) {
      this.model = model;
    }
    getSummary = () =>
      console.log(
        `Model: ${this.model}, ${this.interiorColor} ${this.interiorMaterial} interior.`
      );
  }

  class BlackLeatherInterior extends CarInterior {
    constructor(model: string) {
      super(model);
      this.model = model;
      this.interiorColor = "black";
      this.interiorMaterial = "leather";
    }
  }
  class BeigeLeatherInterior extends CarInterior {
    constructor(model: string) {
      super(model);
      this.model = model;
      this.interiorColor = "beige";
      this.interiorMaterial = "leather";
    }
  }
  class BlackClothInterior extends CarInterior {
    constructor(model: string) {
      super(model);
      this.model = model;
      this.interiorColor = "black";
      this.interiorMaterial = "cloth";
    }
  }
  class BeigeClothInterior extends CarInterior {
    constructor(model: string) {
      super(model);
      this.model = model;
      this.interiorColor = "beige";
      this.interiorMaterial = "cloth";
    }
  }
  let bl = new BlackLeatherInterior("A");
  let rc = new BeigeClothInterior("B");
  let bc = new BlackClothInterior("C");

  bl.getSummary();
  rc.getSummary();
  bc.getSummary();
}

namespace WithBridge {
  class CarInterior {
    interiorColor: InteriorColor;
    interiorMaterial: InteriorMaterial;
    model: string;
    constructor(
      model: string,
      color: InteriorColor,
      material: InteriorMaterial
    ) {
      this.model = model;
      this.interiorColor = color;
      this.interiorMaterial = material;
    }

    getSummary = () =>
      console.log(
        `Model: ${this.model}, ${this.interiorColor.interiorColor} ${this.interiorMaterial.interiorMaterial} interior.`
      );
  }

  interface InteriorColor {
    interiorColor: string;
  }

  interface InteriorMaterial {
    interiorMaterial: string;
  }

  class BlackInterior implements InteriorColor {
    interiorColor: string;
    constructor() {
      this.interiorColor = "black";
    }
  }
  class BeigeInterior implements InteriorColor {
    interiorColor: string;
    constructor() {
      this.interiorColor = "beige";
    }
  }

  class LeatherInterior implements InteriorMaterial {
    constructor() {
      this.interiorMaterial = "leather";
    }
    interiorMaterial: string;
  }

  class ClothInterior implements InteriorMaterial {
    interiorMaterial: string;
    constructor() {
      this.interiorMaterial = "cloth";
    }
  }

  class ClothLeatherComboInterior implements InteriorMaterial {
    interiorMaterial: string;
    constructor() {
      this.interiorMaterial = "cloth/leather combo";
    }
  }

  let bl = new CarInterior("D", new BlackInterior(), new LeatherInterior());
  let rc = new CarInterior("E", new BeigeInterior(), new ClothInterior());
  let bc = new CarInterior("F", new BlackInterior(), new ClothInterior());
  let rcl = new CarInterior("G", new BeigeInterior(), new ClothLeatherComboInterior());

  bl.getSummary();
  rc.getSummary();
  bc.getSummary();
  rcl.getSummary();
}
