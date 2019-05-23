import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from "@angular/core";
import { HomeComponent } from './home.component';
import { Title } from '@angular/platform-browser';

@NgModule({
    declarations: [HomeComponent],
    exports: [HomeComponent],
    imports: [BrowserAnimationsModule],
    providers: [Title],
})
export class HomeModule {}