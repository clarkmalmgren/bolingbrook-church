import { PageEvent }            from '@angular/material'
import { FirebaseDatabase }     from './firebase.service';
import { Observable, Observer } from './observable';

export class Pager<T> {

  itemsPerPage: number = 25;
  currentPage: number = 0;

  private items: T[];
  private observer: Observer<T[]>

  constructor(private source: Observable<T[]>) {
    source.subscribe((items) => {
      this.items = items;
      this.emit();
    })
  }

  get length(): number {
    return this.items.length;
  }

  observe(): Observable<T[]> {
    return Observable.create((observer: Observer<T[]>) => {
      this.observer = observer;
      this.emit();
    });
  }

  private emit(): void {
    if (this.observer && this.items) {
      const min = this.currentPage * this.itemsPerPage;
      this.observer.next(this.items.slice(min, this.itemsPerPage));
    }
  }

  update(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.emit();
  }

}
