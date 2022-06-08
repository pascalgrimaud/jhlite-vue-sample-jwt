import { Login } from '@/common/domain/Login';
import { RestLogin, toRestLogin } from '@/common/secondary/RestLogin';

import { AxiosHttp } from '@/http/AxiosHttp';
import { AuthenticationService } from '@/common/domain/AuthenticationService';
import { User } from '../domain/User';
import { toUser, UserDTO } from './UserDTO';
import { Pinia } from 'pinia';
import { jwtStore } from '@/common/domain/JWTStoreService';

export default class AuthenticationRepository implements AuthenticationService {
  constructor(private axiosHttp: AxiosHttp, private piniaInstance: Pinia) {}

  async authenticate(): Promise<User> {
    return this.axiosHttp
      .get<UserDTO>('/api/account', { headers: { Authorization: 'Bearer ' + this.getJwtToken() } })
      .then(response => toUser(response.data));
  }

  async login(login: Login): Promise<void> {
    const restLogin: RestLogin = toRestLogin(login);
    await this.axiosHttp
      .post<any, RestLogin>('/api/authenticate', restLogin)
      .then(response => this.saveJwtTokenIntoStore(this.parseAuthorisationHeaders(response)));
  }

  logout(): void {
    this.removeToken();
  }

  private saveJwtTokenIntoStore = (token: string): void => jwtStore(this.piniaInstance).setToken(token);

  private getJwtToken = (): string => jwtStore(this.piniaInstance).token;

  private removeToken = (): void => jwtStore(this.piniaInstance).removeToken();

  parseAuthorisationHeaders(response: any): string {
    const bearerToken = response.headers.authorization;
    if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
      return bearerToken.slice(7, bearerToken.length);
    } else {
      return '';
    }
  }
}
