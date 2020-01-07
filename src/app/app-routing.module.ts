import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./pages/search/search.module").then(m => m.SearchPageModule)
  },
  {
    path: "details/:id",
    loadChildren: () => import("./pages/details/details.module").then(m => m.DetailsPageModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
