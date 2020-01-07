import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReviewComponent } from "./review/review.component";
import { IonicModule } from "@ionic/angular";
import { PipesModule } from "../pipes/pipes.module";
import { BusinessComponent } from "./business/business.component";
import { BusinessSkeletonComponent } from "./business-skeleton/business-skeleton.component";
import { ReviewSkeletonComponent } from "./review-skeleton/review-skeleton.component";

@NgModule({
  declarations: [ReviewComponent, BusinessComponent, BusinessSkeletonComponent, ReviewSkeletonComponent],
  exports: [ReviewComponent, BusinessComponent, BusinessSkeletonComponent, ReviewSkeletonComponent],
  imports: [CommonModule, IonicModule, PipesModule]
})
export class ComponentsModule {}
