import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RatingPipe } from "./rating.pipe";

@NgModule({
  declarations: [RatingPipe],
  exports: [RatingPipe],
  imports: [CommonModule]
})
export class PipesModule {}
