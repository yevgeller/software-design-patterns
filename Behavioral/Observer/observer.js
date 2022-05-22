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
var Observer;
(function (Observer) {
    var DisasterType;
    (function (DisasterType) {
        DisasterType[DisasterType["Fire"] = 1] = "Fire";
        DisasterType[DisasterType["Party"] = 2] = "Party";
        DisasterType[DisasterType["Parade"] = 3] = "Parade";
    })(DisasterType || (DisasterType = {}));
    var Disaster = /** @class */ (function () {
        function Disaster(disasterType, destroyedArea) {
            this.disasterType = disasterType;
            this.destroyedArea = destroyedArea;
        }
        return Disaster;
    }());
    var DisasterFactory = /** @class */ (function () {
        function DisasterFactory(area) {
            this.area = area;
        }
        DisasterFactory.prototype.createDisasterByType = function (type) {
            switch (type.toUpperCase()) {
                case "FIRE":
                    return new Disaster(DisasterType.Fire, this.area);
                case "PARTY":
                    return new Disaster(DisasterType.Party, this.area);
                default:
                    return new Disaster(DisasterType.Parade, this.area);
            }
        };
        return DisasterFactory;
    }());
    var GeneralDisasterNotifier = /** @class */ (function () {
        function GeneralDisasterNotifier() {
            this.emergencyServices = [];
        }
        GeneralDisasterNotifier.prototype.addListener = function (listener) {
            this.emergencyServices.push(listener);
        };
        GeneralDisasterNotifier.prototype.removeListener = function (listener) {
            this.emergencyServices = this.emergencyServices.filter(function (x) { return x.id !== listener.id; });
        };
        GeneralDisasterNotifier.prototype.notify = function (disaster) {
            this.emergencyServices.forEach(function (es) {
                return es.receiveDisasterNotification(disaster);
            });
        };
        return GeneralDisasterNotifier;
    }());
    var ConcreteDisasterNotifier = /** @class */ (function (_super) {
        __extends(ConcreteDisasterNotifier, _super);
        function ConcreteDisasterNotifier() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ConcreteDisasterNotifier.prototype.callEmergencyServices = function (disasterType, destroyedArea) {
            console.log("Attention! There is a ".concat(disasterType, " in the area, affecting ").concat(destroyedArea, " sq. miles. Dispatching appropriate services..."));
            var df = new DisasterFactory(destroyedArea);
            this.notify(df.createDisasterByType(disasterType));
        };
        return ConcreteDisasterNotifier;
    }(GeneralDisasterNotifier));
    var FireBrigade = /** @class */ (function () {
        function FireBrigade() {
            this.id = 1;
        }
        FireBrigade.prototype.receiveDisasterNotification = function (disaster) {
            console.log("Fire Brigade ".concat(this.id, " has been notified about ").concat(DisasterType[disaster.disasterType]));
        };
        return FireBrigade;
    }());
    var PoliceSquad = /** @class */ (function () {
        function PoliceSquad() {
            this.id = 2;
        }
        PoliceSquad.prototype.receiveDisasterNotification = function (disaster) {
            console.log("Police Squad ".concat(this.id, " has been notified about ").concat(DisasterType[disaster.disasterType]));
        };
        return PoliceSquad;
    }());
    var AmbulanceCrew = /** @class */ (function () {
        function AmbulanceCrew() {
            this.id = 3;
        }
        AmbulanceCrew.prototype.receiveDisasterNotification = function (disaster) {
            console.log("Ambulance Crew ".concat(this.id, " has been notified about ").concat(DisasterType[disaster.disasterType]));
        };
        return AmbulanceCrew;
    }());
    var f = new FireBrigade();
    var p = new PoliceSquad();
    var a = new AmbulanceCrew();
    var n = new ConcreteDisasterNotifier();
    n.addListener(f);
    n.addListener(p);
    n.addListener(a);
    n.removeListener(f);
    n.callEmergencyServices("party", 1);
    n.removeListener(p);
    n.addListener(f);
    n.callEmergencyServices("fire", 1);
    n.removeListener(a);
    n.addListener(p);
    n.callEmergencyServices("parade", 2);
})(Observer || (Observer = {}));
