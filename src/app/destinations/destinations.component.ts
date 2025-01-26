import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../destination.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destinations',
  imports: [CommonModule],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css'
})
export class DestinationsComponent implements OnInit{
  destinations: any[] = [];

  constructor(private destinationService: DestinationService, private router: Router, private authService: AuthService) {}

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
