class CSVProvider {
  public getData(): string {
    const header = "FirstName,LastName,Age";
    const line1 = "John,Smith,25";
    const line2 = "Mary,Smith,25";
    const line3 = "Jacob,Smith,3";
    const CRLF = "\n";
    const interimResult = [header, line1, line2, line3];
    return interimResult.join(CRLF);
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
