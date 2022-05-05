var Command2;
(function (Command2) {
    var Truck = /** @class */ (function () {
        function Truck(id, weight) {
            this.id = id;
            this.weightCapacity = weight;
            this.shipments = [];
        }
        Truck.prototype.totalWeightSoFar = function () {
            if (this.shipments === undefined)
                return 0;
            if (this.shipments.length === 0)
                return 0;
            var runningTotal = 0;
            this.shipments.forEach(function (s) { return (runningTotal += s.weight); });
            return runningTotal;
        };
        return Truck;
    }());
    var Shipment = /** @class */ (function () {
        function Shipment(id, weight, description) {
            this.id = id;
            this.weight = weight;
            this.description = description;
        }
        return Shipment;
    }());
    var TruckLoaderRepository = /** @class */ (function () {
        function TruckLoaderRepository() {
            this.trucks = [];
            this.trucks.push(new Truck(1, 3));
            this.trucks.push(new Truck(2, 5));
        }
        TruckLoaderRepository.prototype.addShipment = function (shipment, truckId) {
            var thisTruckInArray = this.trucks.filter(function (t) { return t.id === truckId; });
            if (thisTruckInArray !== undefined && thisTruckInArray.length > 0) {
                var thisTruck = thisTruckInArray[0];
                thisTruck.shipments.push(shipment);
                thisTruck.weightCapacity += shipment.weight;
            }
        };
        TruckLoaderRepository.prototype.removeShipment = function (shipment, truckId) {
            var thisTruckInArray = this.trucks.filter(function (t) { return t.id === truckId; });
            if (thisTruckInArray !== undefined && thisTruckInArray.length > 0) {
                var thisTruck = thisTruckInArray[0];
                thisTruck.shipments = thisTruck.shipments.filter(function (s) { return s.id !== shipment.id; });
                thisTruck.weightCapacity -= shipment.weight;
            }
        };
        TruckLoaderRepository.prototype.provideStatus = function () {
            this.trucks.forEach(function (t) {
                var _a;
                console.log("Truck ".concat(t.id, ", ").concat(t.shipments.length, " shipments, ").concat(t.totalWeightSoFar(), "/").concat(t.weightCapacity, " filled"));
                if (((_a = t.shipments) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    console.log("Truck contents:");
                    t.shipments.forEach(function (s) {
                        return console.log("Shipment ".concat(s.id, ", weight: ").concat(s.weight, ", contents: ").concat(s.description));
                    });
                }
            });
        };
        return TruckLoaderRepository;
    }());
    var LoadShipment = /** @class */ (function () {
        function LoadShipment(truckId, shipment, repository) {
            this.truckId = truckId;
            this.shipment = shipment;
            this.repository = repository;
        }
        LoadShipment.prototype.execute = function () {
            this.repository.addShipment(this.shipment, this.truckId);
        };
        LoadShipment.prototype.canExecute = function () {
            if (this.shipment === undefined) {
                console.log("Shipment is undefined, cannot load shipment on this truck");
                return false;
            }
            /*
            let truckInArray = repository.trucks.filter((t) => t.id === this.truckId);
            if (truckInArray.length === 0) {
              console.log(
                "no truck with such id. Cannot load shipment on a non-existent truck"
              );
              return false;
            }
            let truck = truckInArray[0];
            if (
              truck.totalWeightSoFar() + this.shipment.weight >
              truck.weightCapacity
            ) {
              console.log(
                "This shipment will overload the truck. cannot load shipment on this truck"
              );
              return false;
            }
      */
            return true;
        };
        LoadShipment.prototype.undo = function () {
            this.repository.removeShipment(this.shipment, this.truckId);
        };
        return LoadShipment;
    }());
    var CommandManager = /** @class */ (function () {
        function CommandManager() {
            this.commandStack = [];
        }
        CommandManager.prototype.invoke = function (command) {
            if (command.canExecute()) {
                this.commandStack.push(command);
                command.execute();
            }
        };
        CommandManager.prototype.undo = function () {
            var _a;
            if (((_a = this.commandStack) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                var lastCommand = this.commandStack.pop();
                lastCommand.undo();
            }
        };
        return CommandManager;
    }());
    var cmdMgr = new CommandManager();
    var repository = new TruckLoaderRepository();
    var shipmentOfBananas = new Shipment(1, 1, "bananas");
    var shipmentOfMangoes = new Shipment(2, 1, "mangoes");
    console.log("Initial repository state:");
    repository.provideStatus();
    console.log("adding bananas to truck 1 for weight of 1");
    cmdMgr.invoke(new LoadShipment(1, shipmentOfBananas, repository));
    repository.provideStatus();
    console.log("adding mangoes to truck 2 for weight of 1");
    cmdMgr.invoke(new LoadShipment(2, shipmentOfMangoes, repository));
    repository.provideStatus();
    console.log("Oops! Mangoes should have gone to truck one. Undo loading to truck 2");
    cmdMgr.undo();
    repository.provideStatus();
    console.log("loading mangoes to truck 1 for weight of 1");
    cmdMgr.invoke(new LoadShipment(1, shipmentOfMangoes, repository));
    repository.provideStatus();
})(Command2 || (Command2 = {}));
