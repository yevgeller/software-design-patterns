namespace Command2 {
  interface ICommand {
    execute(): void;
    canExecute(): boolean;
    undo(): void;
  }

  class Truck {
    id: number;
    weightCapacity: number;
    shipments: Array<Shipment>;
    constructor(id: number, weight: number) {
      this.id = id;
      this.weightCapacity = weight;
      this.shipments = [];
    }
    totalWeightSoFar(): number {
      if (this.shipments === undefined) return 0;
      if (this.shipments.length === 0) return 0;
      let runningTotal = 0;
      this.shipments.forEach((s) => (runningTotal += s.weight));
      return runningTotal;
    }
  }

  class Shipment {
    id: number;
    weight: number;
    description: string;
    constructor(id: number, weight: number, description: string) {
      this.id = id;
      this.weight = weight;
      this.description = description;
    }
  }

  interface ITruckLoaderRepository {
    addShipment(shipment: Shipment, truckId: number);
    removeShipment(shipment: Shipment, truckId: number);
    provideStatus(): void;
  }

  class TruckLoaderRepository implements ITruckLoaderRepository {
    trucks: Truck[];
    constructor() {
      this.trucks = [];
      this.trucks.push(new Truck(1, 3));
      this.trucks.push(new Truck(2, 5));
    }
    addShipment(shipment: Shipment, truckId: number) {
      let thisTruckInArray = this.trucks.filter((t) => t.id === truckId);
      if (thisTruckInArray !== undefined && thisTruckInArray.length > 0) {
        let thisTruck = thisTruckInArray[0];
        thisTruck.shipments.push(shipment);
        thisTruck.weightCapacity += shipment.weight;
      }
    }
    removeShipment(shipment: Shipment, truckId: number) {
      let thisTruckInArray = this.trucks.filter((t) => t.id === truckId);
      if (thisTruckInArray !== undefined && thisTruckInArray.length > 0) {
        let thisTruck = thisTruckInArray[0];
        thisTruck.shipments = thisTruck.shipments.filter(
          (s) => s.id !== shipment.id
        );
        thisTruck.weightCapacity -= shipment.weight;
      }
    }
    provideStatus(): void {
      this.trucks.forEach((t) => {
        console.log(
          `Truck ${t.id}, ${
            t.shipments.length
          } shipments, ${t.totalWeightSoFar()}/${t.weightCapacity} filled`
        );
        if (t.shipments?.length > 0) {
          console.log("Truck contents:");
          t.shipments.forEach((s) =>
            console.log(
              `Shipment ${s.id}, weight: ${s.weight}, contents: ${s.description}`
            )
          );
        }
      });
    }
  }

  class LoadShipment implements ICommand {
    private readonly truckId: number;
    private readonly shipment: Shipment;
    private readonly repository: ITruckLoaderRepository;
    constructor(
      truckId: number,
      shipment: Shipment,
      repository: ITruckLoaderRepository
    ) {
      this.truckId = truckId;
      this.shipment = shipment;
      this.repository = repository;
    }
    execute(): void {
      this.repository.addShipment(this.shipment, this.truckId);
    }
    canExecute(): boolean {
      if (this.shipment === undefined) {
        console.log(
          "Shipment is undefined, cannot load shipment on this truck"
        );
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
    }
    undo(): void {
      this.repository.removeShipment(this.shipment, this.truckId);
    }
  }

  class CommandManager {
    //since there is no UI, this will be a way to "click" "buttons"

    private commandStack: ICommand[];
    constructor() {
      this.commandStack = [];
    }
    public invoke(command: ICommand): void {
      if (command.canExecute()) {
        this.commandStack.push(command);
        command.execute();
      }
    }

    public undo(): void {
      if (this.commandStack?.length > 0) {
        let lastCommand = this.commandStack.pop();
        lastCommand.undo();
      }
    }
  }

  let cmdMgr = new CommandManager();
  let repository = new TruckLoaderRepository();
  let shipmentOfBananas = new Shipment(1, 1, "bananas");
  let shipmentOfMangoes = new Shipment(2, 1, "mangoes");
  console.log("Initial repository state:");
  repository.provideStatus();
  console.log("adding bananas to truck 1 for weight of 1");
  cmdMgr.invoke(new LoadShipment(1, shipmentOfBananas, repository));
  repository.provideStatus();
  console.log("adding mangoes to truck 2 for weight of 1");
  cmdMgr.invoke(new LoadShipment(2, shipmentOfMangoes, repository));
  repository.provideStatus();
  console.log(
    "Oops! Mangoes should have gone to truck one. Undo loading to truck 2"
  );
  cmdMgr.undo();
  repository.provideStatus();
  console.log("loading mangoes to truck 1 for weight of 1");
  cmdMgr.invoke(new LoadShipment(1, shipmentOfMangoes, repository));
  repository.provideStatus();
}
