import APIService from "./APIService";

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

class PlayerService extends APIService {
  constructor() {
    super("/players");
  }

  async getAll() {
    const res = await this.api().get();
    if (!res.success)
      throw new Error("Ha occurido un problema al traer los jugadores.");

    return res.data;
  }

  async get(id) {
    const res = await this.api("/" + id).get();
    if (!res.success) throw new Error("Jugador no encontrado.");

    return res.data;
  }

  async create(body) {
    body.birth_day = body.birthday;

    const res = await this.api().post(body);
    if (!res.success)
      throw new Error(
        res.message || "Ha ocurrido un problema al crear el jugador."
      );
  }

  async update(id, body) {
    const res = await this.api("/" + id).put(body);
    if (!res.success)
      throw new Error("Ha ocurrido un problema al modificar el jugador.");
  }

  async delete(id) {
    const res = await this.api("/" + id).delete();
    if (!res.success)
      throw new Error("Ha ocurrido un problema al eliminar el jugador.");
  }
}

export default new PlayerService();
