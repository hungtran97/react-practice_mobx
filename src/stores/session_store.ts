import { observable, action, makeObservable } from 'mobx';
import { setTimeout } from 'timers';

class SessionStore {
  @observable isLogin: boolean;
  @observable type: string;
  @observable message: string;

  constructor() {
    makeObservable(this);
    this.isLogin = false;
    this.type = '';
    this.message = '';
  }

  @action
  setAlert = (type: string, message: string) => {
    this.type = type;
    this.message = message;
  };

  @action
  public async login(email: string, password: string) {
    try {
      let res = await this.fakeLogin(email, password);
      localStorage.setItem('email', email);
      this.isLogin = true;
      return res;
    } catch (error) {
      return error;
    }
  }

  @action
  logout = () => {
    this.isLogin = false;
    this.setAlert('success', 'Logout successfully!');

    localStorage.setItem('email', '');
  };

  private async fakeLogin(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
          reject({
            type: 'error',
            target: 'email',
            message: 'Email Invalid!',
          });
        }

        if (password !== 'ows') {
          reject({
            type: 'error',
            target: 'password',
            message: 'Password Invalid!',
          });
        }

        resolve({
          type: 'success',
          target: '',
          message: 'Login Successfully!',
        });
      }, 2000);
    });
  }
}

export default SessionStore;
