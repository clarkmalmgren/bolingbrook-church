import { PageEvent }            from '@angular/material'
import { FirebaseDatabase }     from './firebase.service';
import { Observable, Observer } from './observable';

export abstract class Pager<T> {

  itemsPerPage: number = 25;

  protected items: T[];
  protected observer: Observer<T[]>;

  constructor(protected source: Observable<T[]>) {
    source.subscribe((items) => {
      this.items = items;
      this.emit();
    })
  }

  observe(): Observable<T[]> {
    return Observable.create((observer: Observer<T[]>) => {
      this.observer = observer;
      this.emit();
    });
  }

  close(): void {
    this.observer.complete();
    this.observer = undefined;
  }

  get length(): number {
    return this.items ? this.items.length : 0;
  }

  get pages(): number {
    return Math.ceil(this.length / this.itemsPerPage);
  }

  page(index: number): T[] {
    const min = index * this.itemsPerPage;
    return this.items.slice(min, min + this.itemsPerPage);
  }

  protected abstract emit(): void;
}

export class PaginatedPager<T> extends Pager<T> {

  currentPage: number = 0;

  constructor(source: Observable<T[]>) {
    super(source);
  }

  protected emit(): void {
    if (this.observer && this.items) {
      this.observer.next(this.page(this.currentPage));
    }
  }

  update(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.emit();
  }
}

export class LinearPager<T> extends Pager<T> {

  currentPage: number = 0;

  constructor(source: Observable<T[]>) {
    super(source);
  }

  protected emit(): void {
    if (this.observer && this.items && this.currentPage <= this.pages) {
      this.observer.next(this.page(this.currentPage));
      this.currentPage++;
    }
  }

  next(): void {
    this.emit();
  }
}
