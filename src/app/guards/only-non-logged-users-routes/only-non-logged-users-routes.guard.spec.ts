import { TestBed } from '@angular/core/testing';

import { OnlyNonLoggedUsersRoutesGuard } from './only-non-logged-users-routes.guard';

describe('OnlyNonLoggedUsersRoutesGuard', () => {
  let guard: OnlyNonLoggedUsersRoutesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyNonLoggedUsersRoutesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
