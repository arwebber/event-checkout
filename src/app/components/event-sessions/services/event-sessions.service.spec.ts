import { TestBed } from '@angular/core/testing';
import { EventSessionsService } from './event-sessions.service';


describe('EventSessionsService', () => {
  let service: EventSessionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventSessionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
