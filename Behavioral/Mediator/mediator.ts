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
  register(person: IFamilyMember): void;
  notify(from: string, message: string, isPrivate: boolean): void;
  notifyDirectly(from: string, message: string, name: string): void;
}

interface IFamilyMember {
  send(message: string): void;
  sendPrivate(message: string, to: string): void;
  receive(message: string, from: string, isPrivate: boolean): void;
  setChatRoom(room: IFamilyChatRoom): void;
  getName(): string;
  getPosition(): string;
}

class FamilyMember implements IFamilyMember {
  name: string;
  position: string;
  room: IFamilyChatRoom; //everyone knows a single mediator
  constructor(name: string, position: string, room: IFamilyChatRoom) {
    this.name = name;
    this.position = position;
    this.room = room;
  }

  getName(): string {
    return this.name;
  }

  getPosition(): string {
    return this.position;
  }

  send(message: string): void {
    console.log(`${this.name} sent ${message}`);
    this.room.notify(message, this.name, false);
  }
  sendPrivate(message: string, to: string): void {
    this.room.notifyDirectly(this.name, message, to);
  }
  receive(message: string, from: string, isPrivate: boolean) {
    if (!isPrivate) {
      console.log(
        `${this.position} ${this.name} received message ${message} from ${from}`
      );
    } else {
      console.log(
        `${this.position} ${this.name} received a PRIVATE message ${message} from ${from}`
      );
    }
  }
  setChatRoom(room: IFamilyChatRoom): void {
    this.room = room;
  }
}

class ChatRoom implements IFamilyChatRoom {
  recipients: IFamilyMember[]; //mediator knows about all
  constructor() {
    this.recipients = [];
  }
  notifyDirectly(from: string, message: string, name: string): void {
    let recipient = this.recipients.filter((r) => r.getName() === name);
    if (recipient && recipient.length > 0 && recipient[0] != undefined) {
      recipient[0].receive(message, from, true);
    } else {
      throw new Error(`Recipient ${name} is not registered`);
    }
  }
  notify(message: string, from: string, isPrivate: boolean): void {
    this.recipients.forEach((r) => r.receive(message, from, false));
    console.log();
  }
  register(person: IFamilyMember): void {
    this.recipients.push(person); //check for duplicates
  }
  registerInBulk(people: IFamilyMember[]): void {
    this.recipients.push(...people);
    this.recipients.forEach((r) => r.setChatRoom(this));
  }
}

let cha = new ChatRoom();
let fa = new FamilyMember("John", "father", cha);
let ma = new FamilyMember("Mary", "mother", cha);
let so = new FamilyMember("Jack", "son", cha);
let da = new FamilyMember("Jill", "daughter", cha);

cha.registerInBulk([fa, ma, so, da]);
fa.send("hi!");
da.sendPrivate("hello!", "Jack");
ma.sendPrivate("Hey!", "Jill");
