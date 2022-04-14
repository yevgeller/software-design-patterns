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
    return new Promise((resolve) => resolve(responseData));
  }
}

let a = new SimulatedApi();
let b = new SimulatedApiWithLogging(a);

interface ICacheAccessor {
  setCache(incomingData: Array<{}>): void;
  getCache: () => Array<{}>;
  hasData(): boolean;
  showData(): any[];
}

class SimpleCacheAccessor implements ICacheAccessor {
  setCache(incomingData: {}[]): void {
    this.data = incomingData;
  }
  getCache = () => this.data;
  data: any[] = [];
  showData = () => this.data;
  hasData(): boolean {
    return this.data.length > 0;
  }
}

class SimulatedApiWithCaching implements IMakingSimulatedApiCalls {
  api: IMakingSimulatedApiCalls;
  cacheAccessor: ICacheAccessor;

  constructor(api: IMakingSimulatedApiCalls, cacheAccessor: ICacheAccessor) {
    this.api = api;
    this.cacheAccessor = cacheAccessor;
  }

  async makeRequest(): Promise<any> {
    console.log("cacheAccessor has data", this.cacheAccessor.hasData());
    if (!this.cacheAccessor.hasData()) {
      console.log("need to reach out to API");
      const result = await this.api.makeRequest();
      this.cacheAccessor.setCache(result);
      console.log("data is set: ", this.cacheAccessor.showData());
    } else {
      console.log("data is coming from cache");
      console.log(this.cacheAccessor.showData());
      return this.cacheAccessor.showData();
    }
  }
}

let cacheAccessor = new SimpleCacheAccessor();
let c = new SimulatedApiWithCaching(b, cacheAccessor);
console.log("---  request 1 ---");
c.makeRequest();
setTimeout(() => {
  console.log("---  request 2 ---");
  c.makeRequest();
}, 5000);
