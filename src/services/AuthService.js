import APIService from './APIService';

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

class AuthService extends APIService {
  constructor() {
    super('/users');
  }

  async signIn(username, password) {
    const data = await this.api(`/?username=${username}&password=${password}`).get();
    if(data.length === 0)
      throw new UnauthorizedError('El nombre de usuario o contraseña son incorrectos.');
    return data[0];
  }
}

export default new AuthService;