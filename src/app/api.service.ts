import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Car } from './Car';
import { Observable } from 'rxjs';

const API = "http://localhost:3000"

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${API}/carros`)
  }

  public getById(id: string): Observable<Car> {
    return this.httpClient.get<Car>(`${API}/carros/${id}`)
  }
  

  public post(newCar: Car): Observable<Car> {
    return this.httpClient.post<Car>(`${API}/carros`, newCar)
  }

  public generateNewId(): string {
    const response = this.getAll()
    response.subscribe(data => {
      const length = data.length
      if (length != undefined) {
        const id = length + 1
        return id.toString();
      }
      return "";
    })
    return "";
  } 

  public update(car: Car): Observable<Car> {
    return this.httpClient.put<Car>(`${API}/carros/${car.id}`, car)
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${API}/carros/${id}`)
  }
}
