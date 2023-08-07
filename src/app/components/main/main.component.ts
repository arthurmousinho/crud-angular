import { Component } from '@angular/core';
import { Car } from 'src/app/Car';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {

  constructor(private apiService: ApiService) {  }

  // get by id
  public idInput: string = "";

  // post 
  public newCarNameInput: string = "";
  public newCarBrandInput: string = "";

  // put
  public updateCarIdInput: string = ""
  public updateCarNameInput: string = "";
  public updateCarBrandInput: string = "";

  // delete
  public deleteCarId: string = "";

  public carsArray: Car[] | undefined = [];

  public async getAllCars() {
    const response = this.apiService.getAll()
    response.subscribe((data) => {
      this.carsArray = data
    })
  }

  public reset() {
    this.carsArray = [];
    this.idInput = "";
    this.newCarNameInput = "";
    this.newCarBrandInput = "";
    this.updateCarNameInput = "";
    this.updateCarBrandInput = "";
    this.updateCarIdInput = "";
    this.deleteCarId = "";
  }

  public getById() {

    if (this.idInput.trim() == "") {
      alert("Enter a valid ID input !!")
      return;
    }

    const response = this.apiService.getById(this.idInput)
    response.subscribe((data) => {
      this.carsArray = [ { id: data.id, brand: data.brand, name: data.name } ]
    })
  }

  public addNewCar() {
    if (this.newCarNameInput.trim() === "" || this.newCarBrandInput.trim() === "") {
      alert("Enter a valid Name or Brand")
      return;
    }

    const newCarId  = this.apiService.generateNewId()
    const newCar: Car = {
      name: this.newCarNameInput,
      brand: this.newCarBrandInput,
      id: newCarId
    }  

    this.apiService.post(newCar).subscribe();
    this.getAllCars()
  }

  public updateCar() {
    if (this.updateCarNameInput.trim() === "" || this.updateCarBrandInput.trim() === "" || this.updateCarIdInput.trim() === "") {
      alert("Fill the fields do update a Car")
      return;
    }

    const carToUpdate = {
      id: this.updateCarIdInput,
      name: this.updateCarNameInput,
      brand: this.updateCarBrandInput
    }

    this.apiService.update(carToUpdate).subscribe()
    this.getAllCars()
  }

  public async deleteCar() {
    if (this.deleteCarId.trim() === "") {
      alert("ID field is blank")
      return;
    }
    this.apiService.delete(this.deleteCarId).subscribe()
    this.getAllCars()
  }

}
