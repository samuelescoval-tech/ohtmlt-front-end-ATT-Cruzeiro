export const CHAVE_CADASTROS = 'ohtmlt:cadastros:v1';
const limites = { nome: 100, cpf: 14, email: 254, telefone: 14, cep: 9 };

function registroValido(registro) {
  return registro !== null && typeof registro === 'object' && !Array.isArray(registro) &&
    Object.keys(registro).length === Object.keys(limites).length &&
    Object.entries(limites).every(([campo, limite]) =>
      typeof registro[campo] === 'string' && registro[campo].trim().length > 0 && registro[campo].length <= limite);
}

export function carregarCadastros() {
  try {
    const texto = localStorage.getItem(CHAVE_CADASTROS);
    if (texto === null) return { ok: true, registros: [] };
    const registros = JSON.parse(texto);
    if (!Array.isArray(registros) || !registros.every(registroValido)) {
      return { ok: false, mensagem: 'Os dados salvos têm uma estrutura inválida. Você pode apagá-los para iniciar outra demonstração.' };
    }
    return { ok: true, registros };
  } catch (erro) {
    return { ok: false, mensagem: erro instanceof SyntaxError
      ? 'Não foi possível interpretar os dados salvos. Você pode apagá-los para iniciar outra demonstração.'
      : 'Não foi possível acessar o armazenamento deste navegador. Confira as permissões e tente novamente.' };
  }
}

export function salvarCadastro(registro) {
  if (!registroValido(registro)) return { ok: false, mensagem: 'Não foi possível salvar: os dados têm uma estrutura inválida.' };
  // Ler novamente evita substituir uma lista atualizada desde a entrada na view.
  const atual = carregarCadastros();
  if (!atual.ok) return atual;
  const registros = [...atual.registros, registro];
  try {
    localStorage.setItem(CHAVE_CADASTROS, JSON.stringify(registros));
    return { ok: true, registros };
  } catch {
    return { ok: false, mensagem: 'Não foi possível salvar neste navegador. O espaço pode estar cheio ou o armazenamento bloqueado. Seus campos foram preservados.' };
  }
}

export function apagarCadastros() {
  try {
    localStorage.removeItem(CHAVE_CADASTROS);
    return { ok: true, registros: [] };
  } catch {
    return { ok: false, mensagem: 'Não foi possível apagar as demonstrações. Confira as permissões do navegador e tente novamente.' };
  }
}
