import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { toast } from 'bulma-toast';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  public companies: Observable<any[]>;
  private _companies: BehaviorSubject<any[]>;
  private dataStore: {
    companies: any[]
  }

  constructor(private apiService: ApiService) {
    this.dataStore = {
      companies: []
    };
    this._companies = <BehaviorSubject<any>>new BehaviorSubject([]);
    this.companies = this._companies.asObservable();
  }

  public loadAll() {
    this.apiService.get('/companies')
      .pipe(map(resp => resp['data']))
      .subscribe(data => {
        this.dataStore.companies = data;
        this._companies.next(Object.assign({}, this.dataStore).companies);
      });
  }

  public create(body) {
    this.apiService.post('/companies', body)
      .pipe(map(response => response['data']))
      .subscribe(data => {
        this.dataStore.companies.push(data);
        this._companies.next(Object.assign({}, this.dataStore).companies);
        toast({
          message: `Компания ${data.title} была создана`,
          type: 'is-success',
          duration: 4000,
          position: 'is-bottom is-right'
        });
      }, error => console.log('Could not create company.'));
  }

  public update(companyId, body) {
    this.apiService.put(`/companies/${companyId}`, body)
      .pipe(map(response => response['data']))
      .subscribe(data => {
        this.dataStore.companies.forEach((c, i) => {
          if (c._id === data._id) { this.dataStore.companies[i] = data; }
        });

        this._companies.next(Object.assign({}, this.dataStore).companies);

        toast({
          message: `Компания ${data.title} была обновлена`,
          type: 'is-success',
          duration: 4000,
          position: 'is-bottom is-right'
        });
      }, error => console.log('Could not update company'));
  }

  public delete(companyId) {
    return this.apiService.delete(`/companies/${companyId}`)
      .pipe(map(response => response['data']))
      .subscribe((data) => {
        this.dataStore.companies.forEach((c, i) => {
          if (c._id === companyId) {
            this.dataStore.companies.splice(i, 1);
          }
        });

        this._companies.next(Object.assign({}, this.dataStore).companies);

        toast({
          message: `Компания ${companyId} была удалена`,
          type: 'is-success',
          duration: 4000,
          position: 'is-bottom is-right'
        });
      }, error => console.log('Could not delete company'));
  }
}
