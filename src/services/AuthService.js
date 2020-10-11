import APIService from "./APIService";

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

class AuthService extends APIService {
  constructor() {
    super("/auth");
  }

  async signIn(username, password) {
    try {
      const auth = await this.api("/login").post({
        username,
        password,
      });

      this.setToken(auth.accessToken);

      return auth;
    } catch (err) {
      if (err === "Unauthorized")
        throw new UnauthorizedError(
          "El nombre de usuario o contraseña son incorrectos."
        );
      throw new Error("Ha ocurrido un problema intentalo de nuevo mas tarde.");
    }
  }

  signOut() {
    this.clearToken();
  }
}

export default new AuthService();
