import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HarnessLoader} from "@angular/cdk/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatButtonHarness} from "@angular/material/button/testing";
import {MatCard} from "@angular/material/card";
import {MatCardHarness} from "@angular/material/card/testing";

describe('AppComponent', () => {

  let loader: HarnessLoader;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent]
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should show a card once we click on the button', async () => {
    const button = await loader.getHarness(MatButtonHarness);

    const card = await loader.getHarnessOrNull(MatCardHarness);
    expect(card).toBeNull();

    await button.click();

    const cardAfterClick = await loader.getHarnessOrNull(MatCardHarness);
    expect(cardAfterClick).not.toBeNull();

  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'vitetest'`, () => {
    expect(component.title).toEqual('vitetest');
  });

});
