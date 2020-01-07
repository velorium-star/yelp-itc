import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LocationSettingsComponent } from "./location-settings/location-settings.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [LocationSettingsComponent],
  exports: [LocationSettingsComponent],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  entryComponents: [LocationSettingsComponent]
})
export class DialogsModule {}
