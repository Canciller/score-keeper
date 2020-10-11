import APIService from "./APIService";

class ScoreService extends APIService {
  constructor() {
    super("/scores");
  }

  async get(player, stage) {
    const res = await this.api(`/stage/${stage}/player/${player}`).get();

    let strokes = [];

    let score = {
      player: {
        id: player
      },
      stage: {
        id: stage
      },
      strokes
    };
    if(res.success) {
      score = res.data;
    } else {
      for(let i = 1; i <= 9; i++)
        strokes.push({
          holeNumber: i,
          stroke: 10
        });

      const res = await this.api().post(score);
      if(!res.success) throw new Error('Ha ocurrido un problema al crear el score.');
      score = res.data;
    }

    return score;
  }

  async save(id, body) {
    const res = await this.api("/" + id).put(body);
    if(!res.success) throw new Error('Ha ocurrido un problema al salvar el score.');
  }
}

export default new ScoreService;
