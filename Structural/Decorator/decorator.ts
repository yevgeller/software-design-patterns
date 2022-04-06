//define interface
//change class to implement
//create new class
//add logging

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

console.log(Date.now());
a.makeRequest();
console.log(Date.now());

//extracting Interface
interface MakingSimulatedApiCalls {
  makeRequest(): void;
}

//generating a class for logging: Single Responsibility Principle.
//This class logs, SimulatedApi "makes" API calls
class SimulatedApiWithLogging implements MakingSimulatedApiCalls {
  simulatedApi: SimulatedApi;
  constructor(simulatedApi: SimulatedApi) {
    this.simulatedApi = simulatedApi;
  }

  makeRequest(): void {
    this.simulatedApi.makeRequest();
  }
}
