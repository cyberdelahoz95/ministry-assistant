import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    private adjustLoaderVisibilityRequest = new ReplaySubject<boolean>();

    adjustLoaderVisibilityRequest$ =
        this.adjustLoaderVisibilityRequest.asObservable();

    constructor() {}

    adjustLoaderVisibility(visibilityState: boolean) {
        this.adjustLoaderVisibilityRequest.next(visibilityState);
    }
}
