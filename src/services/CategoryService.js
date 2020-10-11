import APIService from "./APIService";

class CategoryService extends APIService {
  constructor() {
    super("/categories");
  }

  async getAll() {
    const res = await this.api().get();
    if (!res.success)
      throw new Error("Ha ocurrido un problema al traer las categorias.");

    return res.data;
  }
}

export default new CategoryService();
