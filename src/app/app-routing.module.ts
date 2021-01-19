import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/recordings-list/recordings-list.module').then( m => m.RecordingsListPageModule)
  },
  {
    path: 'record',
    loadChildren: () => import('./pages/record/record.module').then( m => m.RecordPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
