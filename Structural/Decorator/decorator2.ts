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
    //console.log("delay (ms): ", Math.round(delay * 1000));
    return delay;
  };
}

interface IMakingSimulatedApiCalls {
  makeRequest(): Promise<any>;
}

//generating a class for logging: Single Responsibility Principle.
//This class logs, SimulatedApi "makes" API calls
class SimulatedApiWithLogging implements IMakingSimulatedApiCalls {
  simulatedApi: IMakingSimulatedApiCalls;
  startDate: number;
  endDate: number;
  constructor(simulatedApi: IMakingSimulatedApiCalls) {
    this.simulatedApi = simulatedApi;
  }

  async makeRequest(): Promise<any> {
    this.startDate = Date.now();
    const responseData = await this.simulatedApi.makeRequest();
    this.endDate = Date.now();
    console.log("time taken: ", this.endDate - this.startDate);
    //console.log("response", responseData);
    return new Promise((resolve) => resolve(responseData));
  }
}

let a = new SimulatedApi();
let b = new SimulatedApiWithLogging(a);
// b.makeRequest();

interface ICacheAccessor {
  setCache([]: any): void;
  getCache(): [];
}

class SimulatedApiWithCaching implements IMakingSimulatedApiCalls {
  data: any[] = [];
  api: IMakingSimulatedApiCalls;
  cacheAccessor: ICacheAccessor;

  constructor(api: IMakingSimulatedApiCalls, cacheAccessor: ICacheAccessor) {
    this.api = api;
    this.cacheAccessor = cacheAccessor;
  }

  async makeRequest(): Promise<any> {
    if (this.data.length === 0) {
      console.log("actually making a request");
      const result = await this.api.makeRequest();
      this.data.push(result);
      console.log("data is set: ", this.data);
    } else {
      console.log("from cache");
      console.log(this.data);
      return this.data;
    }
  }
}

let c = new SimulatedApiWithCaching(b);
console.log("---  request 1 ---");
c.makeRequest();
//console.log("result1", result1);
setTimeout(() => {
  console.log("---  request 2 ---");
  c.makeRequest();
  // console.log("result2", result2);
}, 5000);
// console.log("request 3");
// c.makeRequest();
