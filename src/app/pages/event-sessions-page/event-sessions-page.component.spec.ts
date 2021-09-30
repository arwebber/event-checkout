import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EventSessionsPageComponent } from './event-sessions-page.component';


describe('EventSessionsPageComponent', () => {
  let component: EventSessionsPageComponent;
  let fixture: ComponentFixture<EventSessionsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EventSessionsPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSessionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
