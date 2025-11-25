import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirJogoComponent } from './excluir-jogo.component';

describe('ExcluirJogoComponent', () => {
  let component: ExcluirJogoComponent;
  let fixture: ComponentFixture<ExcluirJogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcluirJogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcluirJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
