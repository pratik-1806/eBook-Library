import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();

  // Count active requests
  private requestCount = 0;

  show(): void {
    this.requestCount++;
    if (this.requestCount > 0) {
      this._loading.next(true);
    }
  }

  hide(): void {
    if (this.requestCount > 0) {
      this.requestCount--;
    }
    if (this.requestCount === 0) {
      this._loading.next(false);
    }
  }
}
