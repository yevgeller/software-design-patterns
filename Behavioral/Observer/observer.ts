namespace Observer {
  enum DisasterType {
    Fire = 1, //fire trucks and ambulance
    Party, //police and ambulance
    Parade, //fire and police
  }

  class Disaster {
    disasterType: DisasterType;
    destroyedArea: number;
    constructor(disasterType: DisasterType, destroyedArea: number) {
      this.disasterType = disasterType;
      this.destroyedArea = destroyedArea;
    }
  }

  class DisasterFactory {
    area: number;
    constructor(area: number) {
      this.area = area;
    }
    createDisasterByType(type: string): Disaster {
      switch (type.toUpperCase()) {
        case "FIRE":
          return new Disaster(DisasterType.Fire, this.area);
        case "PARTY":
          return new Disaster(DisasterType.Party, this.area);
        default:
          return new Disaster(DisasterType.Parade, this.area);
      }
    }
  }

  abstract class GeneralDisasterNotifier {
    private emergencyServices: Array<IDisasterNotificationListener>;
    constructor() {
      this.emergencyServices = [];
    }

    addListener(listener: IDisasterNotificationListener) {
      this.emergencyServices.push(listener);
    }

    removeListener(listener: IDisasterNotificationListener) {
      this.emergencyServices = this.emergencyServices.filter(
        (x) => x.id !== listener.id
      );
    }

    notify(disaster: Disaster): void {
      this.emergencyServices.forEach((es) =>
        es.receiveDisasterNotification(disaster)
      );
    }
  }

  class ConcreteDisasterNotifier extends GeneralDisasterNotifier {
    callEmergencyServices(
      disasterType: "fire" | "party" | "parade",
      destroyedArea: number
    ) {
      console.log(
        `Attention! There is a ${disasterType} in the area, affecting ${destroyedArea} sq. miles. Dispatching appropriate services...`
      );
      let df = new DisasterFactory(destroyedArea);

      this.notify(df.createDisasterByType(disasterType));
    }
  }

  interface IDisasterNotificationListener {
    id: number;
    receiveDisasterNotification(disaster: Disaster): void;
  }

  class FireBrigade implements IDisasterNotificationListener {
    id: number;
    receiveDisasterNotification(disaster: Disaster): void {
      console.log(
        `Fire Brigade ${this.id} has been notified about ${
          DisasterType[disaster.disasterType]
        }`
      );
    }
    constructor() {
      this.id = 1;
    }
  }
  class PoliceSquad implements IDisasterNotificationListener {
    id: number;
    receiveDisasterNotification(disaster: Disaster): void {
      console.log(
        `Police Squad ${this.id} has been notified about ${
          DisasterType[disaster.disasterType]
        }`
      );
    }
    constructor() {
      this.id = 2;
    }
  }
  class AmbulanceCrew implements IDisasterNotificationListener {
    id: number;
    receiveDisasterNotification(disaster: Disaster): void {
      console.log(
        `Ambulance Crew ${this.id} has been notified about ${
          DisasterType[disaster.disasterType]
        }`
      );
    }
    constructor() {
      this.id = 3;
    }
  }

  let f = new FireBrigade();
  let p = new PoliceSquad();
  let a = new AmbulanceCrew();

  let n = new ConcreteDisasterNotifier();
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
}
