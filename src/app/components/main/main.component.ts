import { Component } from '@angular/core';
import { Car } from 'src/app/Car';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {

  constructor(private apiService: ApiService) { 
    this.getAllCars()
  }

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

  public getAllCars() {
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
      alert("Digite o ID para buscar")
      return;
    }

    const response = this.apiService.getById(this.idInput)
    response.subscribe((data) => {
      this.carsArray = [ { id: data.id, brand: data.brand, name: data.name } ]
    })
  }

  public addNewCar() {
    if (this.newCarNameInput.trim() === "" || this.newCarBrandInput.trim() === "") {
      alert("Os campos de NOME e MARCA são obrigatórios para adicionar")
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
      alert("Preencha todos os campos para atulizar")
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

  public deleteCar() {
    if (this.deleteCarId.trim() === "") {
      alert("Campo de ID está vazio, tente novamente")
      return;
    }
    this.apiService.delete(this.deleteCarId).subscribe()
    this.getAllCars()
  }

}
