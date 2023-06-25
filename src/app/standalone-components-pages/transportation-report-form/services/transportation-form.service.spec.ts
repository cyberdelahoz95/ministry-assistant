import { TestBed } from '@angular/core/testing';

import { TransportationFormService } from './transportation-form.service';

describe('TransportationFormService', () => {
    let service: TransportationFormService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TransportationFormService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
