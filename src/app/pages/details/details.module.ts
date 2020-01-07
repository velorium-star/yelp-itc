import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DetailsPageRoutingModule } from "./details-routing.module";

import { DetailsPage } from "./details.page";
import { PipesModule } from "src/app/pipes/pipes.module";
import { ComponentsModule } from "src/app/components/components.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DetailsPageRoutingModule, PipesModule, ComponentsModule],
  declarations: [DetailsPage]
})
export class DetailsPageModule {}
