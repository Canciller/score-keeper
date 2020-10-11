import { api } from "config";

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

export default class {
  constructor(resource) {
    this._url = `${api.url}${api.prefix}${resource}`;
  }

  setToken(token) {
    if (!token) {
      this.clearToken();
    } else {
      localStorage.setItem("token", token);
    }
  }

  getToken() {
    return localStorage.getItem("token");
  }

  clearToken() {
    localStorage.removeItem("token");
  }

  api(endpoint) {
    const token = this.getToken();

    const http = async (method, endpoint, body, options) => {
      let opts = {};
      if (options) opts = options;

      opts.body = JSON.stringify(body);
      opts.method = method;

      if (method === "POST" || method === "PUT" || method === "PATCH") {
        opts.headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };
      }

      if (token) {
        opts.headers = {
          ...opts.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      let url = this._url;
      if (endpoint) url += endpoint;

      try {
        const res = await fetch(url, opts);
        if (res.status === 404)
          throw new NotFoundError("Recurso no encontrado.");

        const json = await res.json();
        if (json.error) throw json.error;
        return json;
      } catch (err) {
        if (err.name === "SyntaxError")
          throw new Error(
            `Ha ocurrido un problema inténtalo de nuevo más tarde.`
          );

        console.error(err);
        throw err;
      }
    };

    return {
      get: async (options) => await http("GET", endpoint, undefined, options),
      post: async (body, options) =>
        await http("POST", endpoint, body, options),
      put: async (body, options) => await http("PUT", endpoint, body, options),
      patch: async (body, options) =>
        await http("PATCH", endpoint, body, options),
      delete: async (options) =>
        await http("DELETE", endpoint, undefined, options),
    };
  }
}
