import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultasMedicasCadastroComponent } from './consultas-medicas-cadastro.component';
@NgModule({declarations: [ConsultasMedicasCadastroComponent],
imports: [CommonModule, FormsModule, ReactiveFormsModule],
exports: [ConsultasMedicasCadastroComponent]})
export class ConsultasMedicasCadastroModule {}
