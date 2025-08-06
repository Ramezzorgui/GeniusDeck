import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('StorageService', ['isLoggedIn']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: StorageService, useValue: storageSpy },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    storageServiceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access if user is logged in', () => {
    storageServiceSpy.isLoggedIn.and.returnValue(true);

    const canActivate = guard.canActivate();

    expect(canActivate).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to /home if user is not logged in', () => {
    storageServiceSpy.isLoggedIn.and.returnValue(false);

    const canActivate = guard.canActivate();

    expect(canActivate).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});
