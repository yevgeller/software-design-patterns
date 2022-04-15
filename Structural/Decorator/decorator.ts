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
    console.log("time taken (ms): ", this.endDate - this.startDate);
    return new Promise((resolve) => resolve(responseData));
  }
}

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
    if (!this.cacheAccessor.hasData()) {
      console.log("reaching out to API");
      const result = await this.api.makeRequest();
      this.cacheAccessor.setCache(result);
      console.log("data:", this.cacheAccessor.showData());
    } else {
      console.log("data (from cache):", this.cacheAccessor.showData());
      return this.cacheAccessor.showData();
    }
  }
}

let simpleApiAccessor = new SimulatedApi();
let apiAccessorWithLogging = new SimulatedApiWithLogging(simpleApiAccessor);
let cacheAccessor = new SimpleCacheAccessor();
let apiAccessorWithLoggingWithCaching = new SimulatedApiWithCaching(
  apiAccessorWithLogging,
  cacheAccessor
);
console.log("---  request 1 ---");
apiAccessorWithLoggingWithCaching.makeRequest();
setTimeout(() => {
  console.log("---  request 2 ---");
  apiAccessorWithLoggingWithCaching.makeRequest();
}, 5000);
