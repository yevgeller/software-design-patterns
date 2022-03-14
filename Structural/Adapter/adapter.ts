class CSVProvider {
  public getColumnHeaders(): string {
    return "FirstName,LastName,Age";
  }

  public getData(): string {
    const line1 = "John,Smith,25";
    const line2 = "Mary,Smith,25";
    const line3 = "Jacob,Smith,3";
    const CRLF = "\n";
    const interimResult = [line1, line2, line3];
    const res = interimResult.join(CRLF);
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
  constructor() {
    this.csvProvider = new CSVProvider();
  }
  public ConvertCsvToJson(): string {
    const incoming = this.csvProvider.getData().split("\n");
    const columnHeaders = this.csvProvider.getColumnHeaders().split(",");
    let arr = [] as any;
    for (let i = 1; i < incoming.length; i++) {
      console.table(incoming[i]);
      let vals = incoming[i].split(",");
      const person = new Object();
      for (let j = 0; j < columnHeaders.length; j++) {
        person[columnHeaders[j]] = vals[j];
      }
      console.log("person", person);
      arr.push(person);
      //console.table(vals);
    }
    return arr;
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

const adapter1 = new Adapter();
const jp = new JSONProcessor();
jp.doSomethingWithJSON(adapter1.ConvertCsvToJson());
