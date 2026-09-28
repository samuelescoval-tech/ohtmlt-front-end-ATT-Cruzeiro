const mensagens = {
  nome: { vazio: 'Digite um nome fictício; somente espaços não são aceitos.' },
  email: { vazio: 'Digite um e-mail fictício.', formato: 'Use um e-mail no formato pessoa@example.com.' },
  telefone: { vazio: 'Digite um telefone fictício.', formato: 'Use o formato (11)99999-9999, sem espaços.' },
  cpf: { vazio: 'Digite um CPF fictício.', formato: 'Use o formato 000.000.000-00, com pontos e hífen.' },
  cep: { vazio: 'Digite um CEP fictício.', formato: 'Use o formato 00000-000, com hífen.' },
};

// As regras nativas continuam no HTML; este módulo traduz seus resultados.
export function validarCampo(campo) {
  const regra = mensagens[campo.name];
  if (!campo.value.trim()) return regra.vazio;
  if (campo.maxLength > 0 && campo.value.length > campo.maxLength) {
    return `Use no máximo ${campo.maxLength} caracteres.`;
  }
  if (campo.validity.typeMismatch || campo.validity.patternMismatch) return regra.formato || regra.vazio;
  return '';
}
