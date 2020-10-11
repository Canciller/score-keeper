import APIService from "./APIService";

class TournamentService extends APIService {
  constructor() {
    super("/tournaments");
  }

  async getAll() {
    const res = await this.api().get();
    if (!res.success)
      throw new Error("Ha ocurrido un problema al traer los torneos.");
    return res.tournaments;
  }

  async get(id) {
    const tournament = await this.api("/" + id).get();
    if (!tournament.success) throw new Error("Torneo no encontrado.");

    const stages = await this.getStages(id);

    const data = tournament.data;

    return {
      ...data,
      _stages: stages,
    };
  }

  async delete(id) {
    const res = await this.api("/" + id).delete();

    if (!res.success)
      throw new Error("Ha ocurrido un problema al eliminar el torneo.");
  }

  async update(id, body) {
    const res = await this.api("/" + id).put({
      holes: 9,
      ...body,
    });

    if (!res.success)
      throw new Error("Ha ocurrido un problema al modificar el torneo.");
  }

  async create(body) {
    const res = await this.api().post({
      holes: 9,
      ...body,
    });

    //await StageService.create(tournament.id, tournament.maxStages);
    if (!res.success)
      throw new Error("Ha ocurrido un problema al crear el torneo.");

    return res.tournament;
  }

  async setLocked(id, locked) {
    let res = {
      success: false,
    };

    if (locked) {
      res = await this.api("/block/" + id).put();
    } else {
      res = await this.api("/unblock/" + id).put();
    }

    if (!res.success) throw new Error("Torneo no encontrado.");
  }

  async getStages(id) {
    const res = await this.api("/" + id + "/stages").get();
    if (!res.success) throw new Error("Torneo no encontrado.");

    return res.data;
  }
}

export default new TournamentService();
