import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import data from '../data/form.json';
import lang from '../data/lang.json';
import { formObject, labels } from 'src/model/formStructure';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  signup(user: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${this.baseUrl}/users/signup`, user, {headers: headers});
  }

  login(credentials: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post(`${this.baseUrl}/users/login`, credentials, {headers: headers});
  }

  // Replace this with your actual authentication logic
  isUserLoggedIn(): boolean {
    // Example: Check if there is a token in local storage
    return localStorage.getItem('token') != null;
  }

  getUserInfo(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  updateUserInfo(email: string, newData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${email}`, newData);
  }

  //DELETE USER NOT IMPLIMENTED
  


  getForms(userId: string): Observable<any> {
    console.log(userId);
    return this.http.get(`${this.baseUrl}/forms/getAll/${userId}`);
  }
  
  getOneForm(id:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/forms/getOne/${id}`);
  }

  postForm(formData : any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post(`${this.baseUrl}/forms/post`, formData,  {headers: headers});
  }

  patchForm(id:string, formData : any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.patch(`${this.baseUrl}/forms/patch/${id}`, formData,  {headers: headers});
  }

  removeForm(id : string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/forms/delete/${id}`);
  }

  getClassLabels(classValue: string): string {
    let formobj: formObject[] = data;
    const windowData = formobj.find(item => item.class.value === classValue);
    if (windowData && windowData.class.labels) {
      const langIndex  = +localStorage.getItem('langIndex')!  || 0;
      const selectedLang = lang.at(langIndex)?.value as keyof labels;
      return windowData.class.labels[selectedLang] ?? windowData.class.labels.default;
    }
    return classValue;
  }

  getPropertyLabels(classValue: string, propValue: string): string {
    let formobj: formObject[] = data;
    const windowData = formobj.find(item => item.class.value === classValue);
    const propData = windowData?.properties.find(item => item.property.value === propValue);
    if (propData && propData.property.labels) {
      const langIndex  = +localStorage.getItem('langIndex')!  || 0;
      const selectedLang = lang.at(langIndex)?.value as keyof labels;
      return propData.property.labels[selectedLang] ?? propData.property.labels.default;
    }
    return propValue;
  }
  getPropertyValueLabels(classValue: string, propLabel: string , propValue:string): string {
    let formobj: formObject[] = data;
    const windowData = formobj.find(item => item.class.value === classValue);
    const propData = windowData?.properties.find(item => item.property.value === propLabel);
    const propValueData = propData?.values?.find(item => item.value === propValue);
    if (propValueData && propValueData.labels) {
      const langIndex  = +localStorage.getItem('langIndex')!  || 0;
      const selectedLang = lang.at(langIndex)?.value as keyof labels;
      return propValueData.labels[selectedLang] ?? propValueData.labels.default;
    }
    return propValue;
  }
}