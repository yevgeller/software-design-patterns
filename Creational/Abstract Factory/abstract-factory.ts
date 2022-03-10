namespace SoMuchBetterWithAbstractFactory {
  //declare interfaces for the "pieces" that comprise a unit
  interface Chief {
    command(): string;
  }

  interface Lieutenant {
    manage(): string;
  }

  interface UnitMember {
    doStuff(): string;
  }
  //declare abstract factory interface
  interface ResponderFactory {
    chief: Chief;
    lt: Lieutenant;
    unitMember: UnitMember;
    makeChief(): Chief;
    makeLieutenant(): Lieutenant;
    makeUnitMember(): UnitMember;
  }

  class FireChief implements Chief {
    command(): string {
      return "Fire Chief: Get those hoses right there right away and gimme water!!";
    }
  }

  class PoliceChief implements Chief {
    command(): string {
      return "Police Chief: I need this solved yesterday!";
    }
  }

  class FireLieutenant implements Lieutenant {
    manage(): string {
      return "Fire Lieutenant: Jeeves, get those two hoses right away! Wooster, turn on the water!";
    }
  }

  class PoliceLieutenant implements Lieutenant {
    manage(): string {
      return "Police Lieutenant: I put my two best men on this case.";
    }
  }

  class FireMan implements UnitMember {
    doStuff(): string {
      return "Fireman: ... (grumble-grumble)";
    }
  }

  class PoliceUnitMember implements UnitMember {
    doStuff(): string {
      return "Police unit member: Pulling out magnifying glass, I'm on the case!";
    }
  }

  class FiremenUnitFactory implements ResponderFactory {
    chief: Chief;
    lt: Lieutenant;
    unitMember: UnitMember;
    makeChief(): Chief {
      this.chief = new FireChief();
      return this.chief;
    }
    makeLieutenant(): Lieutenant {
      this.lt = new FireLieutenant();
      return this.lt;
    }
    makeUnitMember(): UnitMember {
      this.unitMember = new FireMan();
      return this.unitMember;
    }
    constructor() {
      this.makeChief();
      this.makeLieutenant();
      this.makeUnitMember();
    }
  }

  class PoliceUnitFactory implements ResponderFactory {
    chief: Chief;
    lt: Lieutenant;
    unitMember: UnitMember;

    makeChief(): Chief {
      this.chief = new PoliceChief();
      return this.chief;
    }
    makeLieutenant(): Lieutenant {
      this.lt = new PoliceLieutenant();
      return this.lt;
    }

    makeUnitMember(): UnitMember {
      this.unitMember = new PoliceUnitMember();
      return this.unitMember;
    }
    constructor() {
      this.makeChief();
      this.makeLieutenant();
      this.makeUnitMember();
    }
  }

  let policeUnit = new PoliceUnitFactory();
  console.log(policeUnit.chief.command());
  console.log(policeUnit.lt.manage());
  console.log(policeUnit.unitMember.doStuff());

  let fireUnit = new FiremenUnitFactory();
  console.log(fireUnit.chief.command());
  console.log(fireUnit.lt.manage());
  console.log(fireUnit.unitMember.doStuff());
  //bad code:
  /*
  let chief = new FireChief();
  let lt = new FireLieutenant();
  let unitMember = new FireMan();
  let chief2 = new PoliceChief();
  let lt2 = new PoliceLieutenant();
  let unitMember2 = new PoliceUnitMember();

  let PoliceUnit = new Unit(chief2, lt, unitMember);
  let FireMen = new Unit(chief, lt, unitMember);
  */
}
