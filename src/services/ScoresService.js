import APIService from "./APIService";

class ScoresService extends APIService {
  constructor() {
    super("/scores");
  }

  async get(player, stage) {
    const data = await this.api(`?player=${player}&stage=${stage}`).get();
    if (data.length === 0)
      return await this.api().post({
        player,
        stage,
        strokes: [],
      });
    return data[0];
  }

  async save(id, body) {
    return await this.api("/" + id).patch(body);
  }
}

export default new ScoresService();
