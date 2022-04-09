//import { Promise } from "es6-promise";

class SimulatedApi {
  makeRequest = async (): Promise<any> =>
    new Promise((resolve) =>
      setTimeout(() => resolve(this.getData()), this.getTimeout() * 1000)
    );

  getData = () => [
    { name: "John Johnson", age: 32 },
    { name: "Jane Johnson", age: 32 },
    { name: "Jim Johnson", age: 10 },
  ];

  getTimeout = () => {
    const delay = Math.random() * (5 - 1) + 1;
    console.log("delay (ms): ", delay * 1000);
    return delay;
  };
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
    const responseData = await this.simulatedApi.makeRequest();
    this.endDate = Date.now();
    console.log("time taken: ", this.endDate - this.startDate);
    console.log(responseData);
  }
}

let a = new SimulatedApi();
let b = new SimulatedApiWithLogging(a);
b.makeRequest();
