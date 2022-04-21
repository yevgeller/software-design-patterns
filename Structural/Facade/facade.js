// class Refrigerator {
//   items = [] as any;
//   open = () => console.log("refrigerator is open");
//   close = () => console.log("refrigerator is closed");
//   get = (item: string) => {
//     if (this.items.indexOf(item) >= 0) return `retrieved ${item}`;
//     else return `no ${item} in the fridge`;
//   };
//   constructor() {
//     this.items = ["eggs", "bacon", "sausage", "orange juice", "milk", "cream"];
//   }
// }
// class Chef {
//   comeInToWork = () => console.log("grumble grumble, I have arrived");
//   leave = () => console.log("see you tomorrow");
//   washHands = () =>
//     console.log("I am going to go wash my hands, back in a minute");
// }
// class Stove {
//   mediumHeat = () => console.log("stove is on medium heat");
//   highHeat = () => console.log("stove is on high heat");
//   lowHeat = () => console.log("stove is on low heat");
// }
// //maybe redo this as a movie projection or a play start
// interface IInPosition {
// inPosition(): void;
// }
//implement interface on all of them
//console code
var SoundBooth = /** @class */ (function () {
    function SoundBooth() {
        this.setUpSound = function () { return console.log("sound set up"); };
        this.tearDownSound = function () { return console.log("sound system put away"); };
        this.setUpOnStageMicrophones = function () { return console.log("stage microphones set up"); };
        this.tearDownOnStageMicrophones = function () {
            return console.log("stage microphones tore down");
        };
        console.log("sound booth here");
    }
    return SoundBooth;
}());
var Auditorium = /** @class */ (function () {
    function Auditorium(lightingProvider) {
        var _this = this;
        this.closeDoors = function () { return console.log("doors are closed"); };
        this.openDoors = function () { return console.log("doors are open"); };
        this.dimLights = function () { return _this.lightingProvider.dimLights(); };
        this.brightLights = function () { return _this.lightingProvider.brightLights(); };
        this.lightingProvider = lightingProvider;
        console.log("auditorium here");
    }
    return Auditorium;
}());
var LightingProvider = /** @class */ (function () {
    function LightingProvider() {
        this.dimLights = function () { return console.log("lights dimmed"); };
        this.brightLights = function () { return console.log("lights are on 100%"); };
        this.setStageLights = function () { return console.log("stage lights are set properly"); };
        console.log("Lighting Provider initialized");
    }
    return LightingProvider;
}());
var StageManager = /** @class */ (function () {
    function StageManager(lightingProvider, talentManager) {
        var _this = this;
        this.ensureActorsReady = function () { return console.log("actors are ready"); };
        this.ensureLightIsSet = function () { return _this.lightingProvider.setStageLights(); };
        this.lightingProvider = lightingProvider;
        this.talentManager = talentManager;
        console.log("stage manager is ready");
    }
    return StageManager;
}());
var TalentManager = /** @class */ (function () {
    function TalentManager() {
        this.castActors = function () { return console.log("actors cast to roles"); };
        this.ensureCastIsReadyForPerformance = function () {
            return console.log("cast is ready to perform");
        };
        console.log("talent manager is ready to deal with cast");
    }
    return TalentManager;
}());
var Choir = /** @class */ (function () {
    function Choir() {
        this.prepareChoir = function () { return console.log("choir is ready"); };
        console.log("choir is here");
    }
    return Choir;
}());
var Orchestra = /** @class */ (function () {
    function Orchestra() {
        this.prepare = function () { return console.log("orchestra is ready"); };
        console.log("orchestra is here");
    }
    return Orchestra;
}());
var soundBooth = new SoundBooth();
var lightingProvider = new LightingProvider();
var auditorium = new Auditorium(lightingProvider);
var talentManager = new TalentManager();
var stageManager = new StageManager(lightingProvider, talentManager);
var choir = new Choir();
var orchestra = new Orchestra();
