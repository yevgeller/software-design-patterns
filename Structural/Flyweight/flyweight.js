var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FloraItemParent = /** @class */ (function () {
    function FloraItemParent() {
        this.name = "no name";
        this.description = "no description";
    }
    FloraItemParent.prototype.display = function (size, somethingElseExtrinsic) {
        if (somethingElseExtrinsic === void 0) { somethingElseExtrinsic = ""; }
        console.log("A ".concat(size, "-sized ").concat(this.name, ", looks like a ").concat(this.description));
        if (somethingElseExtrinsic.length > 0) {
            console.log("Extra data: ", somethingElseExtrinsic);
        }
    };
    return FloraItemParent;
}());
var Fern = /** @class */ (function (_super) {
    __extends(Fern, _super);
    function Fern() {
        var _this = _super.call(this) || this;
        _this.name = "Fern";
        _this.description =
            "A plant with a bunch of tiny leaves. Makes a great house plant.";
        return _this;
    }
    return Fern;
}(FloraItemParent));
var PineTree = /** @class */ (function (_super) {
    __extends(PineTree, _super);
    function PineTree() {
        var _this = _super.call(this) || this;
        _this.name = "Pine tree";
        _this.description = "Tall mighty tree. Watch out for pine cones!";
        return _this;
    }
    return PineTree;
}(FloraItemParent));
var GrassBlade = /** @class */ (function (_super) {
    __extends(GrassBlade, _super);
    function GrassBlade() {
        var _this = _super.call(this) || this;
        _this.name = "blade of grass";
        _this.description = "green string.";
        return _this;
    }
    return GrassBlade;
}(FloraItemParent));
var FloraFactory = /** @class */ (function () {
    function FloraFactory() {
        this.dictionary = {};
        console.log("\n");
        console.log("FloraFactory is ready. Your options are: fern, pine, grass");
        console.log("\n");
    }
    FloraFactory.prototype.getFloraItem = function (itemKey) {
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
    };
    FloraFactory.prototype.showDictionary = function (showIndividualRecords) {
        if (showIndividualRecords === void 0) { showIndividualRecords = false; }
        if (showIndividualRecords)
            console.log("----- Current state of the factory:");
        var count = 0;
        for (var prop in this.dictionary) {
            if (showIndividualRecords) {
                console.log("".concat(prop, ": ").concat(this.dictionary[prop].name));
            }
            count++;
        }
        console.log("Total number of records in the factory:", count);
        console.log();
    };
    return FloraFactory;
}());
var floraFactory = new FloraFactory();
console.log("-- large items --");
var largePine = floraFactory.getFloraItem("pine");
largePine.display("large", "a large pine, but seems that it has absolutely no cones");
floraFactory.showDictionary();
var largeGrass = floraFactory.getFloraItem("grass");
largeGrass.display("large", "some bug is sitting on this huge blade of grass");
floraFactory.showDictionary();
var largeFern = floraFactory.getFloraItem("fern");
largeFern.display("large", "this fern is so large, it's starting to wilt");
floraFactory.showDictionary(true);
console.log("-- medium items --");
var mediumPine = floraFactory.getFloraItem("pine");
mediumPine.display("medium", "nice and perfect size tree");
floraFactory.showDictionary();
var mediumGrass = floraFactory.getFloraItem("grass");
mediumGrass.display("medium", "this blade of grass is ready to be cut");
floraFactory.showDictionary();
var mediumFern = floraFactory.getFloraItem("fern");
mediumFern.display("medium", "this fern is a part of a huge fern patch");
floraFactory.showDictionary(true);
console.log("-- small items --");
var smallPine = floraFactory.getFloraItem("pine");
smallPine.display("small", "this tree could make a great house tree for Christmas");
floraFactory.showDictionary();
var smallGrass = floraFactory.getFloraItem("grass");
smallGrass.display("small", "freshly cut and smells great");
floraFactory.showDictionary();
var smallFern = floraFactory.getFloraItem("fern");
smallFern.display("small", "a young fern");
floraFactory.showDictionary(true);
console.log("-- one of each items --");
var largePine2 = floraFactory.getFloraItem("pine");
largePine2.display("large", "Another large pine tree!");
floraFactory.showDictionary();
var smallGrass2 = floraFactory.getFloraItem("grass");
smallGrass2.display("small", "ALSO freshly cut");
floraFactory.showDictionary();
var mediumFern2 = floraFactory.getFloraItem("fern");
smallFern.display("medium", "not such young fern, but not as bushy as an adult plant");
floraFactory.showDictionary(true);
