import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinationsComponent } from './destinations.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DestinationsComponent', () => {
  let component: DestinationsComponent;
  let fixture: ComponentFixture<DestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationsComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
