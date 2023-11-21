import { NgModule } from '@angular/core';
import { ConsultasMedicasContainerComponent } from './consultas-medicas-container/consultas-medicas-container.component';
import { CommonModule } from '@angular/common';
import { ConsultasMedicasCadastroModule } from './consultas-medicas-cadastro/consultas-medicas-cadastro.module';
import { ConsultasMedicasGridModule } from './consultas-medicas-grid/consultas-medicas-grid.module';
@NgModule({declarations: [ConsultasMedicasContainerComponent],
imports: [CommonModule, ConsultasMedicasCadastroModule, ConsultasMedicasGridModule],
exports: [ConsultasMedicasContainerComponent]})
export class ConsultasMedicasModule {}
