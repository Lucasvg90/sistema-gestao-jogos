import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarJogoComponent } from './alterar-jogo.component';

describe('AlterarJogoComponent', () => {
  let component: AlterarJogoComponent;
  let fixture: ComponentFixture<AlterarJogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterarJogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterarJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
