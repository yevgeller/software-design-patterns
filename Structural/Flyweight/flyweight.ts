interface IFloraItem {
  readonly name: string; //intrinsic state
  readonly description: string; //intrinsic state
  display(size: "small" | "medium" | "large"): void; //partially extrinsic: size is provided
}

class FloraItemParent implements IFloraItem {
  name: string;
  description: string;
  display(size: "small" | "medium" | "large"): void {
    console.log(
      `A ${size}-sized ${this.name}, looks like a ${this.description} is here.`
    );
  }
}

class Fern extends FloraItemParent {
  constructor() {
    super();
    this.name = "Fern";
    this.description =
      "A plant with a bunch of tiny leaves. Makes a great house plant.";
  }
}

class PineTree extends FloraItemParent {
  constructor() {
    super();
    this.name = "Pine tree";
    this.description = "Tall mighty tree. Watch out for pine cones!";
  }
}

class GrassBlade extends FloraItemParent {
  constructor() {
    super();
    this.name = "blade of grass";
    this.description = "green string.";
  }
}

class FloraFactory {
  dictionary = {};
  constructor() {
    console.log("\n");
    console.log("FloraFactory is ready. Your options are: fern, pine, grass");
    console.log("\n");
  }
  getFloraItem(itemKey: string): FloraItemParent {
    switch (itemKey) {
      case "fern":
        if (this.dictionary.hasOwnProperty("fern"))
          return this.dictionary["fern"];
        else {
          this.dictionary["fern"] = new Fern();
          return this.dictionary["fern"];
        }
      case "pine":
        if (this.dictionary.hasOwnProperty("pine"))
          return this.dictionary["pine"];
        else {
          this.dictionary["pine"] = new PineTree();
          return this.dictionary["pine"];
        }
      case "grass":
        if (this.dictionary.hasOwnProperty("grass"))
          return this.dictionary["grass"];
        else {
          this.dictionary["grass"] = new GrassBlade();
          return this.dictionary["grass"];
        }

      default:
        break;
    }
    return new GrassBlade();
  }

  showDictionary(): void {
    console.log("----- Current state of the factory:");
    for (const prop in this.dictionary) {
      console.log(
        `${prop}: ${(this.dictionary[prop] as FloraItemParent).name}`
      );
    }
  }
}

let floraFactory = new FloraFactory();
console.log("-- large items --");
let largePine = floraFactory.getFloraItem("pine");
largePine.display("large");
floraFactory.showDictionary();
let largeGrass = floraFactory.getFloraItem("grass");
largeGrass.display("large");
floraFactory.showDictionary();
let largeFern = floraFactory.getFloraItem("fern");
largeFern.display("large");
floraFactory.showDictionary();

console.log("-- medium items --");
let mediumPine = floraFactory.getFloraItem("pine");
mediumPine.display("medium");
floraFactory.showDictionary();
let mediumGrass = floraFactory.getFloraItem("grass");
mediumGrass.display("medium");
floraFactory.showDictionary();
let mediumFern = floraFactory.getFloraItem("fern");
mediumFern.display("medium");
floraFactory.showDictionary();

console.log("-- small items --");
let smallPine = floraFactory.getFloraItem("pine");
smallPine.display("small");
floraFactory.showDictionary();
let smallGrass = floraFactory.getFloraItem("grass");
smallGrass.display("small");
floraFactory.showDictionary();
let smallFern = floraFactory.getFloraItem("fern");
smallFern.display("small");
floraFactory.showDictionary();
