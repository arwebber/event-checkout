import { TestBed } from '@angular/core/testing';
import { EventsPageService } from './events-page.service';


describe('EventsPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventsPageService = TestBed.get(EventsPageService);
    expect(service).toBeTruthy();
  });
});
