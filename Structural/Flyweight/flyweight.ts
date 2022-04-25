interface IFloraItem {
  readonly name: string; //intrinsic state
  readonly description: string; //intrinsic state
  display(
    size: "small" | "medium" | "large",
    somethingElseExtrinsic: string
  ): void; //partially extrinsic: size is provided
}

class FloraItemParent implements IFloraItem {
  name: string;
  description: string;
  display(
    size: "small" | "medium" | "large",
    somethingElseExtrinsic: string = ""
  ): void {
    console.log(
      `A ${size}-sized ${this.name}, looks like a ${this.description} is here.`
    );
    if (somethingElseExtrinsic.length > 0) {
      console.log("Extra data: ", somethingElseExtrinsic);
    }
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

  showDictionary(showIndividualRecords: boolean = false): void {
    if (showIndividualRecords)
      console.log("----- Current state of the factory:");
    let count = 0;
    for (const prop in this.dictionary) {
      if (showIndividualRecords) {
        console.log(
          `${prop}: ${(this.dictionary[prop] as FloraItemParent).name}`
        );
      }
      count++;
    }
    console.log("Total number of records in the factory:", count);
    console.log();
  }
}

let floraFactory = new FloraFactory();
console.log("-- large items --");
let largePine = floraFactory.getFloraItem("pine");
largePine.display(
  "large",
  "a large pine, but seems that it has absolutely no cones"
);
floraFactory.showDictionary();
let largeGrass = floraFactory.getFloraItem("grass");
largeGrass.display("large", "some bug is sitting on this huge blade of grass");
floraFactory.showDictionary();
let largeFern = floraFactory.getFloraItem("fern");
largeFern.display("large", "this fern is so large, it's starting to wilt");
floraFactory.showDictionary(true);

console.log("-- medium items --");
let mediumPine = floraFactory.getFloraItem("pine");
mediumPine.display("medium", "nice and perfect size tree");
floraFactory.showDictionary();
let mediumGrass = floraFactory.getFloraItem("grass");
mediumGrass.display("medium", "this blade of grass is ready to be cut");
floraFactory.showDictionary();
let mediumFern = floraFactory.getFloraItem("fern");
mediumFern.display("medium", "this fern is a part of a huge fern patch");
floraFactory.showDictionary(true);

console.log("-- small items --");
let smallPine = floraFactory.getFloraItem("pine");
smallPine.display(
  "small",
  "this tree could make a great house tree for Christmas"
);
floraFactory.showDictionary();
let smallGrass = floraFactory.getFloraItem("grass");
smallGrass.display("small", "freshly cut and smells great");
floraFactory.showDictionary();
let smallFern = floraFactory.getFloraItem("fern");
smallFern.display("small", "a young fern");
floraFactory.showDictionary(true);

console.log("-- one of each items --");
let largePine2 = floraFactory.getFloraItem("pine");
largePine2.display(
  "large",
  "Another large pine tree!"
);
floraFactory.showDictionary();
let smallGrass2 = floraFactory.getFloraItem("grass");
smallGrass2.display("small", "ALSO freshly cut");
floraFactory.showDictionary();

let mediumFern2 = floraFactory.getFloraItem("fern");
smallFern.display("medium", "not such young fern, but not as bushy as an adult plant");
floraFactory.showDictionary(true);