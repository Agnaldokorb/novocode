/**
 * Utilitários para formatação de dados brasileiros
 */

/**
 * Formatar telefone brasileiro
 * @param phone - Número de telefone (somente números)
 * @returns Telefone formatado (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 */
export function formatPhone(phone: string): string {
  if (!phone) return "";
  
  const cleanPhone = phone.replace(/[^\d]/g, "");
  
  if (cleanPhone.length === 10) {
    // (XX) XXXX-XXXX
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 6)}-${cleanPhone.slice(6)}`;
  } else if (cleanPhone.length === 11) {
    // (XX) XXXXX-XXXX
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7)}`;
  }
  
  return phone;
}

/**
 * Remover formatação do telefone
 * @param phone - Telefone formatado
 * @returns Somente números
 */
export function unformatPhone(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

/**
 * Formatar CEP brasileiro
 * @param cep - CEP (somente números)
 * @returns CEP formatado XXXXX-XXX
 */
export function formatCep(cep: string): string {
  if (!cep) return "";
  
  const cleanCep = cep.replace(/[^\d]/g, "");
  
  if (cleanCep.length === 8) {
    return `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}`;
  }
  
  return cep;
}

/**
 * Remover formatação do CEP
 * @param cep - CEP formatado
 * @returns Somente números
 */
export function unformatCep(cep: string): string {
  return cep.replace(/[^\d]/g, "");
}

/**
 * Validar telefone brasileiro
 * @param phone - Telefone para validar
 * @returns true se válido
 */
export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  
  const cleanPhone = unformatPhone(phone);
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
}

/**
 * Validar CEP brasileiro
 * @param cep - CEP para validar
 * @returns true se válido
 */
export function validateCep(cep: string): boolean {
  if (!cep) return false;
  
  const cleanCep = unformatCep(cep);
  return cleanCep.length === 8;
}

/**
 * Formatar CNPJ brasileiro
 * @param cnpj - CNPJ (somente números)
 * @returns CNPJ formatado XX.XXX.XXX/XXXX-XX
 */
export function formatCnpj(cnpj: string): string {
  if (!cnpj) return "";
  
  const cleanCnpj = cnpj.replace(/[^\d]/g, "");
  
  if (cleanCnpj.length === 14) {
    return `${cleanCnpj.slice(0, 2)}.${cleanCnpj.slice(2, 5)}.${cleanCnpj.slice(5, 8)}/${cleanCnpj.slice(8, 12)}-${cleanCnpj.slice(12)}`;
  }
  
  return cnpj;
}

/**
 * Formatar CPF brasileiro
 * @param cpf - CPF (somente números)
 * @returns CPF formatado XXX.XXX.XXX-XX
 */
export function formatCpf(cpf: string): string {
  if (!cpf) return "";
  
  const cleanCpf = cpf.replace(/[^\d]/g, "");
  
  if (cleanCpf.length === 11) {
    return `${cleanCpf.slice(0, 3)}.${cleanCpf.slice(3, 6)}.${cleanCpf.slice(6, 9)}-${cleanCpf.slice(9)}`;
  }
  
  return cpf;
}
