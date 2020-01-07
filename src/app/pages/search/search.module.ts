import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SearchPage } from "./search.page";
import { PipesModule } from "src/app/pipes/pipes.module";
import { DialogsModule } from "src/app/dialogs/dialogs.module";
import { ComponentsModule } from "src/app/components/components.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: "", component: SearchPage }]),
    IonicModule,
    PipesModule,
    DialogsModule,
    ComponentsModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
