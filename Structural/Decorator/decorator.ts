import { Promise } from "es6-promise";

class SimulatedApi {
  makeRequest = (): void => {
    setTimeout(() => {
      console.log(this.getData());
    }, this.getTimeout() * 1000);
  };

  getData = () => [
    { name: "John Johnson", age: 32 },
    { name: "Jane Johnson", age: 32 },
    { name: "Jim Johnson", age: 10 },
  ];

  getTimeout = () => Math.random() * (5 - 1) + 1;
}

let a = new SimulatedApi();

// console.log(Date.now());
// a.makeRequest();
// console.log(Date.now());

//extracting Interface
interface MakingSimulatedApiCalls {
  makeRequest(): any;
}

//generating a class for logging: Single Responsibility Principle.
//This class logs, SimulatedApi "makes" API calls
class SimulatedApiWithLogging implements MakingSimulatedApiCalls {
  simulatedApi: SimulatedApi;
  startDate: number;
  endDate: number;
  constructor(simulatedApi: SimulatedApi) {
    this.simulatedApi = simulatedApi;
  }
  recordEndDate = () => {
    this.endDate = Date.now();
    console.log("endDate: ", this.endDate);
    return this;
  };

  showDiff = () => {
    console.log("time taken: ", this.endDate - this.startDate);
  };
  fakeResponseData = {
    numbers: [0, 1, 2, 3, 4, 5],
  };
  makePromise(): any {
    // return new Promise((resolve, reject) => {
    //   resolve(this.simulatedApi.makeRequest());
    // });
    return new Promise((resolve) => {
      // simulate a wait of 1500ms, then resolve the promise
      // with fake data
      setTimeout(() => resolve(this.fakeResponseData), 1500);
    });
  }

  public async makeRequest(): Promise<any> {
    this.startDate = Date.now();
    console.log("startDate: ", this.startDate);
    const result = await this.simulatedApi.makeRequest();
    this.recordEndDate();
    console.log(this.showDiff());
    return Promise.resolve(result);
    // this.makePromise()
    //   .then((response) => {
    //     console.log(response);
    //     this.recordEndDate();
    //   })
    //   .then(() => console.log("diff", this.endDate - this.startDate));
    //const pro = this.makePromise();
    //pro.then((result) => this.recordEndDate);
  }
}

let b = new SimulatedApiWithLogging(a);
b.makeRequest();
//--need to add logging, what am I doing wrong?
