import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
    selector: 'ma-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
    showLoader: boolean = true;

    constructor(private loaderService: LoaderService) {}

    ngOnInit(): void {
        this.loaderService.adjustLoaderVisibilityRequest$
            .pipe(
                tap((visibilityState: boolean) => {
                    this.showLoader = visibilityState;
                })
            )
            .subscribe();
    }
}
