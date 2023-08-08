import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/Car';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent {

  carSearched: Car = {
    name: "",
    brand: "",
    id: ""
  }

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.getCarFromApi();
  }

  public getCarFromApi() {
    const idByRoute = this.route.snapshot.paramMap.get("id")
    const response = this.apiService.getById(`${idByRoute}`)
    response.subscribe(data => {
      this.carSearched.name = data.name
      this.carSearched.brand = data.brand
      this.carSearched.id = data.id
    })
  }

}
