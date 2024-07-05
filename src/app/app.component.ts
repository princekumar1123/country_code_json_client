import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { country } from './sourceData';

interface IData {
  name: string,
  code: string
}
const filteredNameArray: string[] = []

const countries:IData[]=country

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title!: string
  displayedColumns: string[] = ['name', 'code'];
  dataSource = new MatTableDataSource(countries);
  countryNames: string[] = ['']
  statusVariable: boolean = false
  newestData!: IData[]

  success(Filtername: string): void {
    if (!filteredNameArray.includes(Filtername)) {
      filteredNameArray.push(Filtername)
    }
    else if (filteredNameArray.includes(Filtername)) {
      filteredNameArray.indexOf(Filtername) !== -1 && filteredNameArray.splice(filteredNameArray.indexOf(Filtername), 1)
    }
    this.countryNames = filteredNameArray
    this.statusVariable = !this.statusVariable
  } 

  applyFilter(event: Event) {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.newestData = countries.filter((e: IData): IData | void => {
      if ((e.code.toLowerCase().includes(filterValue.trim().toLowerCase())) && (!this.countryNames.includes(e.name)) || (e.name.toLowerCase().includes(filterValue.trim().toLowerCase())) && (!this.countryNames.includes(e.name))) {
        return e
      }
    })

    if (filterValue != '') {
      this.dataSource = new MatTableDataSource(this.newestData)
    }
    else {
      this.dataSource = new MatTableDataSource(countries)

    }
  }
}