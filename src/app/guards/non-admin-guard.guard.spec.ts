import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { NonAdminGuard } from './non-admin-guard.guard';

describe('NonAdminGuard', () => {
  let guard: NonAdminGuard;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('StorageService', ['getUser']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        NonAdminGuard,
        { provide: StorageService, useValue: storageSpy },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(NonAdminGuard);
    storageServiceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('✅ devrait autoriser un utilisateur non-admin', () => {
    storageServiceSpy.getUser.and.returnValue({ roles: ['ROLE_USER'] });

    const result = guard.canActivate();

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('🚫 devrait bloquer un admin et le rediriger vers /dashboard1', () => {
    storageServiceSpy.getUser.and.returnValue({ roles: ['ROLE_ADMIN'] });

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard1']);
  });
});
