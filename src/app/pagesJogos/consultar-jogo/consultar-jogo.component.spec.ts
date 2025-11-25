import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarJogoComponent } from './consultar-jogo.component';

describe('ConsultarJogoComponent', () => {
  let component: ConsultarJogoComponent;
  let fixture: ComponentFixture<ConsultarJogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarJogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
