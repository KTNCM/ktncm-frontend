import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../destination.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destinations',
  imports: [CommonModule],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css'
})
export class DestinationsComponent implements OnInit{
  destinations: any[] = [];

  constructor(private destinationService: DestinationService) {}

  ngOnInit(): void {
    this.fetchDestinations();
  }

  fetchDestinations(): void {
    this.destinationService.getDestinations().subscribe(
      (response) => {
        this.destinations = response;
        console.log('Destinations:', this.destinations);
      },
      (error) => {
        console.error('Error fetching destinations:', error);
      }
    );
  }
}
