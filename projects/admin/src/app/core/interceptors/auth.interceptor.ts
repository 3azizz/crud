import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';


 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}



  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request);

    // Example usage of HttpHeaders to set headers
    const newHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

    const newRequest = request.clone({
      headers: newHeaders
    });

    console.log(newRequest);

    return next.handle(newRequest);
  }



  // -----------------------------------------------

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
  //   console.log(request);
    
  //   const newRequest = request.clone({
 


  //   headers : request.headers.append('authorization' ,'Bearer  ' + localStorage.getItem('token')),

    
    
  // })
  // console.log('this is token'+ (localStorage.getItem('token')) );
  

    
    
  //  console.log('this is new requestttt'+ newRequest);
    
  //   return next.handle(newRequest);

  // }
}
