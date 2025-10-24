import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { AuthApiService } from './auth-api.service';

describe('AuthService (Jest)', () => {
  let service: AuthService;
  let api: jest.Mocked<AuthApiService>;

  let getItemSpy: jest.SpyInstance;
  let setItemSpy: jest.SpyInstance;
  let removeItemSpy: jest.SpyInstance;
  let clearSpy: jest.SpyInstance;

  const mem: Record<string, string> = {};
  const mockStorage = {
    getItem: (k: string) => (k in mem ? mem[k] : null),
    setItem: (k: string, v: string) => { mem[k] = v; },
    removeItem: (k: string) => { delete mem[k]; },
    clear: () => { Object.keys(mem).forEach(k => delete mem[k]); },
  };

  beforeEach(() => {
    api = {
      login: jest.fn(),
      register: jest.fn(),
      me: jest.fn(),
    } as unknown as jest.Mocked<AuthApiService>;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: AuthApiService, useValue: api }
      ]
    });

    getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(mockStorage.getItem);
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(mockStorage.setItem);
    removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(mockStorage.removeItem);
    clearSpy = jest.spyOn(Storage.prototype, 'clear').mockImplementation(mockStorage.clear);

    mockStorage.clear();
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    mockStorage.clear();
  });

  it('login guarda token y user; isLoggedIn = true', (done) => {
    const email = 'a@a.com';
    const password = '123456';
    const mockResp = { token: 'T', user: { id: '1', name: 'A', email } };

    api.login.mockReturnValue(of(mockResp));

    service.login(email, password).subscribe(() => {
      expect(api.login).toHaveBeenCalledWith(email, password);
      expect(setItemSpy).toHaveBeenCalledTimes(2);
      expect(service.isLoggedIn).toBe(true);
      expect(service.user?.email).toBe(email);
      done();
    });
  });

  it('logout limpia token y user; isLoggedIn = false', () => {
    mockStorage.setItem('token', 'T');
    mockStorage.setItem('user', JSON.stringify({ id: '1' }));

    service.logout();

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(service.isLoggedIn).toBe(false);
    expect(service.user).toBeNull();
  });

  it('me delega en AuthApiService.me()', (done) => {
    const mockUser = { id: '1', name: 'X', email: 'x@x.com' };
    api.me.mockReturnValue(of({ user: mockUser }));

    service.me().subscribe(resp => {
      expect(api.me).toHaveBeenCalled();
      expect(resp).toEqual({ user: mockUser });
      done();
    });
  });
});
