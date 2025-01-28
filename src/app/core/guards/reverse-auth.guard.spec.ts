import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { reverseAuthGuard } from './reverse-auth.guard';
import { AuthService } from '../services/auth.service';

describe('reverseAuthGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => reverseAuthGuard(...guardParameters));

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    });

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow navigation if the user is not logged in', () => {
      authService.isLoggedIn.and.returnValue(true);

      const mockRoute = {} as ActivatedRouteSnapshot;
      const mockState = {} as RouterStateSnapshot;
      const result = executeGuard(mockRoute, mockState);

      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/destinations']);
  });

  it('should block navigation and redirect to login if the user is logged in', () => {
    authService.isLoggedIn.and.returnValue(false);

    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;
    const result = executeGuard(mockRoute, mockState);

    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
