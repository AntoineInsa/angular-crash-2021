import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css']
})

export class MyMapComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom
    const coordinates = {
      'LaRoche': [46.0675623,6.3016204],
      'Reigner': [46.1256217,6.265347],
      'Annemasse': [46.1992685,6.2342667],
      'Chêne-Bourg': [46.1993006,6.2189458],
      'Genève Eaux Vives': [46.2014445,6.1643964],
      'Genève Champel': [46.1921674,6.1510787],
      'Lancy Bachet': [46.1743208,6.1276681,],
      'Lancy Pont Rouge': [46.1872892,6.1239628,],
      'Genève Cornavin': [46.2105567,6.140830],
      'Zimeysa': [46.2200343,6.0659473],
      'NovelT': [46.218216,6.055424],
    }

    const myMap = L.map('commute-map').setView([46.0667, 6.3167], 10);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Commute Map'
    }).addTo(myMap);


    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });

    // Add
    for (const element in coordinates) {
      console.log(element)
      const value = coordinates[element]
      L.marker([value[0], value[1]], {icon: myIcon}).bindPopup(element).addTo(myMap);
    }

    // create a red polyline from an array of LatLng points
    let line = []
    for (const element in coordinates) {
      line.push(coordinates[element])
    }
    var polyline = L.polyline(line, {color: 'red'}).addTo(myMap);
    myMap.fitBounds(polyline.getBounds());




  }

}
