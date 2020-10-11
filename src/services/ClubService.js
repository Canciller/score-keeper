import APIService from "./APIService";

class ClubService extends APIService {
  constructor() {
    super("/clubs");
  }

  async getAll() {
    const res = await this.api().get();
    if (!res.success)
      throw new Error("Ha ocurrido un problema al traer los clubs.");

    return res.data;
  }
}

export default new ClubService();
