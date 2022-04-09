//import { Promise } from "es6-promise";

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

  async makeRequest(): Promise<any> {
    this.startDate = Date.now();
    await this.simulatedApi.makeRequest();
    this.endDate = Date.now();
    console.log("time taken: ", this.endDate - this.startDate);
  }
}

let a = new SimulatedApi();
let b = new SimulatedApiWithLogging(a);
b.makeRequest();
