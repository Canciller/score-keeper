import APIService from "./APIService";

class TournamentService extends APIService {
  constructor() {
    super("/tournaments");
  }

  async getAll() {
    return await this.api().get();
  }

  async get(id) {
    return await this.api("/" + id).get();
  }

  async delete(id) {
    return await this.api("/" + id).delete();
  }

  async update(id, body) {
    return await this.api("/" + id).patch(body);
  }

  async create(body) {
    return await this.api().post(body);
  }

  async setLocked(id, locked) {
    return await this.update(id, {
      locked: locked,
    });
  }
}

export default new TournamentService();
