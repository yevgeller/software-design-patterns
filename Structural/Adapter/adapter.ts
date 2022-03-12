class CSVProvider {
  public getData(): string {
    const header = "FirstName,LastName,Age";
    const line1 = "John,Smith,25";
    const line2 = "Mary,Smith,25";
    const line3 = "Jacob,Smith,3";
    const CRLF = "\n";
    const interimResult = [header, line1, line2, line3];
    const res = interimResult.join(CRLF);
    console.log("data in CSV provider\n", res);
    return res;
  }
}

class JSONProcessor {
  public doSomethingWithJSON(json: string): void {
    console.log(JSON.stringify(json, null, 2));
  }

  public showJSON(json: string): void {
    console.table(json);
  }
}

class Adapter {
  private csvProvider: CSVProvider;
  private jsonProcessor: JSONProcessor;
  constructor() {
    this.csvProvider = new CSVProvider();
  }
  public Magic(): void {
    const incoming = this.csvProvider.getData().split("\n");
    console.log("incoming", incoming);
    const objectProps = incoming[0];
    console.log(objectProps);
    let arr = [] as any;
    for (let i = 1; i < incoming.length; i++) {
      console.table(incoming[i]);
      let vals = incoming[i].split(",");
      console.table(vals);
    }
  }
}

let obj1 = {
  firstName: "Alex",
  lastName: "Jones",
  age: 23,
};
let obj2 = {
  firstName: "Alex",
  lastName: "Jones",
  age: 23,
};
let obj3 = {
  firstName: "Alex",
  lastName: "Jones",
  age: 23,
};
let arr = [obj1, obj2, obj3];
console.table(arr);

let adapter1 = new Adapter();
adapter1.Magic();
