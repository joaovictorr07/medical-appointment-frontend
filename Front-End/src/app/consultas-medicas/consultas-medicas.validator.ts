import { ConsultaMedicaModel } from './models/consulta-medica.model';
export function isConsultaMedicaValid(
  consultaMedica: ConsultaMedicaModel
): boolean {
  if (
    !consultaMedica.crmMedico ||
    !consultaMedica.dataConsulta ||
    !consultaMedica.horaConsulta ||
    !consultaMedica.nomeMedico ||
    !consultaMedica.nomePaciente ||
    !consultaMedica.salaConsulta
  ) {
    return false;
  }

  return true;
}

