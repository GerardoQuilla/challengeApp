import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { MainComponent } from './pages/main/main.component';
import {MatTab, MatTabContent, MatTabGroup} from '@angular/material/tabs';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { UpdateComponent } from './components/update/update.component';
import { DeleteComponent } from './components/delete/delete.component';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {provideHttpClient} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {MatOptionModule, provideNativeDateAdapter} from '@angular/material/core';
import {MatIcon} from '@angular/material/icon';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MainComponent,
    CreateComponent,
    ListComponent,
    UpdateComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabGroup,
    MatTab,
    FormsModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatTabContent,
    MatIcon,

    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
  ],
  providers: [
    DatePipe,
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
