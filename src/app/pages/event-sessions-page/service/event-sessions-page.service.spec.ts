import { TestBed } from '@angular/core/testing';
import { EventSessionsPageService } from './event-sessions-page.service';


describe('EventSessionsPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventSessionsPageService = TestBed.get(EventSessionsPageService);
    expect(service).toBeTruthy();
  });
});
