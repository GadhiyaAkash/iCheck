import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { HttpExtraParams } from './../interfaces/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(
    private http: HttpClient,
  ) { }

  getHeaders(extraParams: any = {}, hasCustomHeader: boolean = false) {
    let headers = {};
    if (!hasCustomHeader) {
      headers = {
        'Content-Type': HttpHeadersEnum.APPLICATION_JSON,
        'Accept': HttpHeadersEnum.APPLICATION_JSON
      }
    }
    if (extraParams.hideLoader) {
      headers['hide-loader'] = HttpHeadersEnum.HIDE_LOADER;
    }
    if (extraParams.params && extraParams.params.headers) {
      extraParams.params.headers.forEach((o:any) => {
        headers[o.key] = o.value;
      });
    }
    return {
      headers: new HttpHeaders(headers)
    };
  }

  get(path: string, params: URLSearchParams = new URLSearchParams(), hideLoader: boolean = false): Observable<any> {
    const httpParams = Object.assign(this.getHeaders({ hideLoader: hideLoader }), {
      params: new HttpParams({ fromString: this.createGetParams(params) })
    });
    return this.http.get(`${path}`, httpParams)
      .pipe(map((res) => res));
  }

  post(path: string, body: Object = {}, hideLoader: boolean = false): Observable<any> {
    return this.http.post(
      `${path}`,
      JSON.stringify(body),
      this.getHeaders({ hideLoader: hideLoader })
    ).pipe(map((res: Response) => res));

  }

  delete(path: string, params: URLSearchParams = new URLSearchParams(), hideLoader: boolean = false): Observable<any> {
    const httpParams = Object.assign(this.getHeaders({ hideLoader: hideLoader }), {
      params: new HttpParams({ fromString: this.createGetParams(params) })
    });
    return this.http.delete(`${path}`, httpParams)
      .pipe(map((res) => res));
  }

  postForm(path: string, body: Object = {}, hideLoader: boolean = false): Observable<any> {
    return this.http.post(
      `${path}`,
      body,
      this.getHeaders({
        hideLoader: hideLoader,
        params: <HttpExtraParams>{
          headers: [

          ]
        }
      },true)
    ).pipe(map((res: Response) => res));

  }
  postEncodedForm(path: string, body: Object = {}, hideLoader: boolean = false): Observable<any> {
    return this.http.post(
      `${path}`,
      new HttpParams({ fromString: this.createGetParams(body) }),
      this.getHeaders({
        hideLoader: hideLoader,
        params: <HttpExtraParams>{
          headers: [
            {
              key: "Content-Type",
              value: HttpHeadersEnum.APPLICATION_X_WWW_FORM_URLENCODED
            }
          ]
        }
      })
    ).pipe(map((res: Response) => res));

  }

  createGetParams(requestParams) {
    let s = [];
    let add = (k: string, v: any) => {
      v = typeof v === 'function' ? v() : v;
      v = v === null ? '' : v === undefined ? '' : v;
      s.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
    };
    let buildParams = (prefix: string, obj: any) => {
      if (prefix) {
        if (Array.isArray(obj)) {
          obj.forEach((v, i) => buildParams(prefix + '[' + (typeof v === 'object' && v ? i : '') + ']', v));
        } else if (String(obj) === '[object Object]') {
          Object.keys(obj)
            .forEach(key => buildParams(prefix + '[' + key + ']', obj[key]));
        } else {
          add(prefix, obj);
        }
      } else if (Array.isArray(obj)) {
        obj.forEach(v => add(v.name, v.value));
      } else {
        Object.keys(obj)
          .forEach(key => buildParams(key, obj[key]));
      }
      return s;
    };
    return buildParams(null, requestParams).join('&');
  }
  private formatErrors(error: any) {
    return Observable.throw(error);
  }
}


export enum HttpHeadersEnum {
  APPLICATION_JSON = 'application/json',
  HIDE_LOADER = 'true',
  APPLICATION_X_WWW_FORM_URLENCODED = 'application/x-www-form-urlencoded'
}