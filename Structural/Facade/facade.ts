class SoundBooth {
  constructor() {
    console.log("sound booth here");
  }
  setUpSound = (): void => console.log("sound set up");
  tearDownSound = (): void => console.log("sound system put away");
  setUpOnStageMicrophones = (): void => console.log("stage microphones set up");
  tearDownOnStageMicrophones = (): void =>
    console.log("stage microphones tore down");
}

class Auditorium {
  closeDoors = (): void => console.log("doors are closed");
  openDoors = (): void => console.log("doors are open");
  lightingProvider: LightingProvider;
  constructor(lightingProvider: LightingProvider) {
    this.lightingProvider = lightingProvider;
    console.log("auditorium here");
  }

  dimLights = (): void => this.lightingProvider.dimLights();
  brightLights = (): void => this.lightingProvider.brightLights();
}

class LightingProvider {
  constructor() {
    console.log("Lighting Provider initialized");
  }
  dimLights = (): void => console.log("lights dimmed");
  brightLights = (): void => console.log("lights are on 100%");
  setStageLights = (): void => console.log("stage lights are set properly");
}

class StageManager {
  lightingProvider: LightingProvider;
  talentManager: TalentManager;
  ensureActorsReady = (): void => console.log("actors are ready");
  ensureLightIsSet = (): void => this.lightingProvider.setStageLights();

  constructor(
    lightingProvider: LightingProvider,
    talentManager: TalentManager
  ) {
    this.lightingProvider = lightingProvider;
    this.talentManager = talentManager;
    console.log("stage manager is ready");
  }
}

class TalentManager {
  castActors = (): void => console.log("actors cast to roles");
  ensureCastIsReadyForPerformance = (): void =>
    console.log("cast is ready to perform");
  constructor() {
    console.log("talent manager is ready to deal with cast");
  }
}

class Choir {
  constructor() {
    console.log("choir is here");
  }
  prepare = (): void => console.log("choir is ready");
}

class Orchestra {
  constructor() {
    console.log("orchestra is here");
  }
  prepare = (): void => console.log("orchestra is ready");
}

let soundBooth = new SoundBooth();
soundBooth.setUpSound();
soundBooth.setUpOnStageMicrophones();
let lightingProvider = new LightingProvider();
let auditorium = new Auditorium(lightingProvider);
auditorium.openDoors();
let talentManager = new TalentManager();
let stageManager = new StageManager(lightingProvider, talentManager);
stageManager.ensureActorsReady();
stageManager.ensureLightIsSet();
let choir = new Choir();
choir.prepare();
let orchestra = new Orchestra();
orchestra.prepare();
auditorium.dimLights();
