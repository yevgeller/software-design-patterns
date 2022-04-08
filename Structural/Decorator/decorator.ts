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
    console.log("in recordEndDate");
    console.log("endDate: ", this.endDate);
    return this;
  };
  // reject = () => new Error("makeRequest did not work!");

  // requestPromise = new Promise(function (resolve, reject) {
  //   this.simulatedApi.makeRequest();
  // });

  makePromise(): any {
    return new Promise((resolve, reject) => {
      resolve(this.simulatedApi.makeRequest());
    });
  }

  makeRequest(): any {
    console.log("before pro");
    this.startDate = Date.now();
    console.log("startDate: ", this.startDate);
    const pro = this.makePromise();
    pro.then(this.recordEndDate).then(() => console.log("after pro")); //why is this not being called?
  }

  // makeRequest2(): any {
  //   const promise = new Promise((resolve, reject) => {
  //     this.simulatedApi.makeRequest();
  //   })
  //     //.then(this.resolve)
  //     .then(() => console.log("endDate finished: ", this.endDate));
  //   promise.then(() => (this.endDate = Date.now()));
  //   console.log("endDate: ", this.endDate);
  // }
}

let b = new SimulatedApiWithLogging(a);
b.makeRequest();
//--need to add logging, what am I doing wrong?
