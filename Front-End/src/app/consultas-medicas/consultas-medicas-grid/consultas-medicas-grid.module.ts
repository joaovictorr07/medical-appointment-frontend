import { NgModule } from '@angular/core';
import { ConsultasMedicasGridComponent } from './consultas-medicas-grid.component';
import { CommonModule } from '@angular/common';
import { CheckboxControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({declarations: [ConsultasMedicasGridComponent],
imports: [CommonModule, FormsModule, ReactiveFormsModule],
exports: [ConsultasMedicasGridComponent],
providers: [CheckboxControlValueAccessor]})
export class ConsultasMedicasGridModule {}
