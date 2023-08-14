import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConversacionPage } from './conversacion.page';

describe('ConversacionPage', () => {
  let component: ConversacionPage;
  let fixture: ComponentFixture<ConversacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConversacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
