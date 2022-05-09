interface IParentCommunicator {
  saySomethingToSon(): void;
  saySomethingToDaughter(): void;
  saySomethingToSpouse(): void;
}

interface IChildCommunicator {
  saySomethingToMother(): void;
  saySomethingToFather(): void;
  saySomethingToOtherSibling(): void;
}

class Mother implements IParentCommunicator {
  constructor() {}
  saySomethingToDaughter(): void {
    throw new Error("Method not implemented.");
  }
  saySomethingToSpouse(): void {
    throw new Error("Method not implemented.");
  }
  saySomethingToSon(): void {}
}

class Father implements IParentCommunicator {
  constructor() {}
  saySomethingToDaughter(): void {
    throw new Error("Method not implemented.");
  }
  saySomethingToSpouse(): void {
    throw new Error("Method not implemented.");
  }
  saySomethingToSon(): void {}
}

class Son implements IChildCommunicator {
  saySomethingToMother(): void {
    throw new Error("Method not implemented.");
  }
  saySomethingToFather(): void {
    throw new Error("Method not implemented.");
  }
  saySomethingToOtherSibling(): void {
    throw new Error("Method not implemented.");
  }
}

class Daughter implements IChildCommunicator {
  saySomethingToMother(): void {
    throw new Error("Method not implemented.");
  }
  saySomethingToFather(): void {
    throw new Error("Method not implemented.");
  }
  saySomethingToOtherSibling(): void {
    throw new Error("Method not implemented.");
  }
}
//------------------------- Mediator:
interface IFamilyChatRoom {
  notify(from: string, message: string): void;
  register(person: IFamilyMember): void;
}

interface IFamilyMember {
  send(message: string): void;
  setChatRoom(room: IFamilyChatRoom): void;
  getName(): string;
  getPosition(): string;
}

class FamilyMember implements IFamilyMember {
  name: string;
  position: string;
  room: IFamilyChatRoom;
  constructor(name: string, position: string) {
    this.name = name;
    this.position = position;
  }

  getName(): string {
    return this.name;
  }

  getPosition(): string {
    return this.position;
  }

  send(message: string): void {
    throw new Error("Method not implemented.");
  }
  setChatRoom(room: IFamilyChatRoom): void {
    this.room = room;
  }
}

class ChatRoom implements IFamilyChatRoom {
  recipients: IFamilyMember[];

  notify(from: string, message: string): void {
    this.recipients.forEach((r) =>
      console.log(
        `${r.getPosition} ${r.getName} received message ${message} from ${from}`
      )
    );
  }
  register(person: IFamilyMember): void {
    this.recipients.push(person); //check for duplicates
  }
  registerInBulk(people: IFamilyMember[]): void {
    this.recipients.push(...people);
  }
}

let fa = new FamilyMember("John", "father");
let ma = new FamilyMember("Mary", "mother");
let so = new FamilyMember("Jack", "son");
let da = new FamilyMember("Jill", "daughter");

let cha = new ChatRoom();
cha.registerInBulk([fa, ma, so, da]);
