import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isEmpty } from 'lodash-es';
import { SettingsService } from './settings.service';
import { RequestParams } from '../models/request-param.model';
import { ApiLabel } from '../models/api-route.model';
import { FakeData } from '../../../fakes/fake.data';
import { tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { Deserialize, INewable } from 'cerialize';

export type Serializable = Function | INewable<any>;

@Injectable({
  providedIn: 'root'
})
export class ServerHttpService {

  constructor(private readonly http: HttpClient,
              private readonly settingsService: SettingsService,
              private readonly spinnerService: SpinnerService) {
  }

  private get baseUrl(): string {
    return this.settingsService.serverBaseUrl;
  }

  private get oauthServerBaseUrl(): string {
    return this.settingsService.authServerBaseUrl;
  }

  postAuthWithLabel<T>(type: Serializable, apiLabel: ApiLabel, body: any, params?: RequestParams, query?: RequestParams, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    return this.postWithLabel<T>(type, this.oauthServerBaseUrl, apiLabel, body, params, query, headers);
  }

  getApiWithLabel<T>(type: Serializable, apiLabel: ApiLabel, params?: RequestParams, query?: RequestParams, headers?: HttpHeaders): Observable<T> {
    return this.getWithLabel<T>(type, this.baseUrl, apiLabel, params, query, headers);
  }

  postApiWithLabel<T>(type: Serializable, apiLabel: ApiLabel, body: any, params?: RequestParams, query?: RequestParams, headers?: HttpHeaders): Observable<T> {
    return this.postWithLabel<T>(type, this.baseUrl, apiLabel, body, params, query, headers);
  }

  private getWithLabel<T>(type: Serializable, baseUrl: string, apiLabel: ApiLabel, params?: RequestParams, query?: RequestParams, headers?: HttpHeaders): Observable<T> {
    const urlTemplate = this.settingsService.getServerApi(apiLabel);
    if (this.settingsService.isFakeApiEnabled()) {
      return this.doFakeRequest<T>(apiLabel, query);
    }
    // return this.get(baseUrl, urlTemplate, params, query, headers);
    return this.get(baseUrl, urlTemplate, params, query, headers).pipe(map(json => Deserialize(json, type)));
  }

  private postWithLabel<T>(type: Serializable, baseUrl: string, apiLabel: ApiLabel, body: any, params?: RequestParams, query?: RequestParams, headers?: HttpHeaders): Observable<T> {
    const urlTemplate = this.settingsService.getServerApi(apiLabel);
    if (this.settingsService.isFakeApiEnabled()) {
      return this.doFakeRequest<T>(apiLabel);
    }
    // return this.post(baseUrl, urlTemplate, body, params, query, headers);
    return this.post(baseUrl, urlTemplate, body, params, query, headers).pipe(map(json => Deserialize(json, type)));
  }

  private get<T>(baseUrl: string, pathTemplate: string, params?: RequestParams, query?: RequestParams, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    const path = this.buildPath(pathTemplate, params, query);
    const url = this.joinPathParts(baseUrl, path);
    return this.http.get<T>(url, { headers });
  }

  private post<T>(baseUrl: string, pathTemplate: string, body: any, params?: RequestParams, query?: RequestParams, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    const path = this.buildPath(pathTemplate, params, query);
    const url = this.joinPathParts(baseUrl, path);
    return this.http.post<T>(url, body, { headers });
  }

  private buildPath(url: string, params?: RequestParams, query?: RequestParams): string {
    const parameters = params?.getAll() ?? [];
    const queryParams = query?.getAll() ?? [];
    const urlWithParams = parameters.reduce((workingUrl, param) =>
      workingUrl.replace(`:${param.name}`, param.value), url);
    const queryTail = queryParams.map(param => `${param.name}=${param.value}`).join('&');
    return isEmpty(queryTail) ? urlWithParams : `${urlWithParams}?${queryTail}`;
  }

  private joinPathParts(...parts: string[]): string {
    if (isEmpty(parts)) {
      return '';
    }
    const firstPart = parts[0].replace(/(?<=.)\/$/, '');
    const items = parts.slice(1).map(item => item.replace(/^\/|\/$/g, ''));
    items.unshift(firstPart);
    return items.filter(item => !isEmpty(item)).join('/');
  }

  private doFakeRequest<T>(apiLabel: ApiLabel, query?: RequestParams): Observable<T> {
    const time = this.settingsService.fakeApiDelay();
    return of(FakeData.handleApiLabel(apiLabel, query)).pipe(
      tap(() => this.spinnerService.showFor(time)),
      delay(time)
    );
  }

}
