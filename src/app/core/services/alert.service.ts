import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  confirm(message: string, extraParams: object = {}) {
    let params = {
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: 'Cancel'
    };
    return Swal.fire(_.assignIn(params, extraParams));
  }

  warning(message: string, extraParams: object = {}) {
    let params = {
      title: "Warning",
      text: message,
      icon: "warning",
      showCancelButton: false,
      confirmButtonText: "OK"
    };
    return Swal.fire(_.assignIn(params, extraParams));
  }

  success(message: string, extraParams: object = {}) {
    let params = {
      title: "Success",
      text: message,
      icon: "success",
      showCancelButton: false,
      confirmButtonText: "OK"
    };
    return Swal.fire(_.assignIn(params, extraParams));
  }
  error(message: string, extraParams: object = {}) {
    let params = {
      title: "Error",
      text: message,
      icon: "error",
      showCancelButton: false,
      confirmButtonText: "OK"
    };
    return Swal.fire(_.assignIn(params, extraParams));
  }
}