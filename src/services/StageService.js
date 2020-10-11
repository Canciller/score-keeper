import APIService from "./APIService";

class StageService extends APIService {
  constructor() {
    super("/stages");
  }
}

export default new StageService();
