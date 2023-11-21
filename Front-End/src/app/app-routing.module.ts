import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasMedicasContainerComponent } from './consultas-medicas/consultas-medicas-container/consultas-medicas-container.component';

const routes: Routes = [
  {
    path: 'consultas-medicas',
    component: ConsultasMedicasContainerComponent,
    loadChildren: () => import('./consultas-medicas/consultas-medicas.module').then(m => m.ConsultasMedicasModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
