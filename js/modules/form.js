import { validarCampo } from './validation.js';
import { iniciarLimpeza } from './modal.js';
import { anunciarSucesso, anunciarErro } from './feedback.js';
import { carregarCadastros, salvarCadastro, apagarCadastros, CHAVE_CADASTROS } from './storage.js';
import { iniciarListaCadastros } from './cadastros.js';

export function iniciarFormulario(raiz) {
  const form = raiz.querySelector('#form-cadastro');
  const campos = [...form.querySelectorAll('input')];
  const status = raiz.querySelector('#status-cadastro');
  const controller = new AbortController();
  const opcoes = { signal: controller.signal };
  const tratados = new Set();
  const componenteLista = iniciarListaCadastros(raiz.querySelector('#lista-cadastros'));
  const statusArmazenamento = raiz.querySelector('#status-armazenamento');
  const apagar = raiz.querySelector('#apagar-cadastros');

  function mostrarRegistros(resultado) {
    if (resultado.ok) {
      componenteLista.atualizar(resultado.registros);
      apagar.disabled = resultado.registros.length === 0;
    } else {
      componenteLista.atualizar(null);
      apagar.disabled = false;
      anunciarErro(statusArmazenamento, resultado.mensagem);
    }
  }
  mostrarRegistros(carregarCadastros());
  apagar.addEventListener('click', () => {
    if (!window.confirm('Apagar todas as demonstrações salvas neste navegador? Os campos preenchidos serão mantidos.')) return;
    const resultado = apagarCadastros();
    if (!resultado.ok) {
      anunciarErro(statusArmazenamento, resultado.mensagem);
      return;
    }
    mostrarRegistros(resultado);
    raiz.querySelector('#cadastros-salvos').focus();
    anunciarSucesso(statusArmazenamento, 'Demonstrações salvas apagadas deste navegador.');
  }, opcoes);
  window.addEventListener('storage', event => {
    if (event.key !== CHAVE_CADASTROS && event.key !== null) return;
    try {
      if (event.storageArea !== localStorage) return;
    } catch {
      mostrarRegistros(carregarCadastros());
      return;
    }
    statusArmazenamento.replaceChildren();
    mostrarRegistros(carregarCadastros());
  }, opcoes);
  const desmontarLimpeza = iniciarLimpeza(raiz);

  function atualizar(campo) {
    const erro = validarCampo(campo);
    tratados.add(campo);
    campo.setAttribute('aria-invalid', String(Boolean(erro)));
    raiz.querySelector('#erro-' + campo.id).textContent = erro;
    return erro;
  }

  form.addEventListener('focusout', event => {
    if (campos.includes(event.target)) atualizar(event.target);
  }, opcoes);
  form.addEventListener('input', event => {
    if (tratados.has(event.target)) atualizar(event.target);
  }, opcoes);
  form.addEventListener('reset', () => {
    tratados.clear();
    campos.forEach(campo => {
      campo.removeAttribute('aria-invalid');
      raiz.querySelector('#erro-' + campo.id).textContent = '';
    });
    status.replaceChildren();
  }, opcoes);
  form.addEventListener('submit', event => {
    event.preventDefault();
    status.replaceChildren();
    const invalidos = campos.filter(campo => atualizar(campo));
    if (invalidos.length) {
      invalidos[0].focus();
      return;
    }
    const registro = Object.fromEntries(campos.map(campo => [campo.name, campo.value.trim()]));
    const resultado = salvarCadastro(registro);
    if (!resultado.ok) {
      anunciarErro(status, resultado.mensagem);
      return;
    }
    statusArmazenamento.replaceChildren();
    mostrarRegistros(resultado);
    anunciarSucesso(status, 'Demonstração salva neste navegador. Nenhuma inscrição real foi realizada.');
  }, opcoes);
  // Ativar somente após conectar o tratamento do envio.
  form.noValidate = true;
  return () => {
    controller.abort();
    desmontarLimpeza?.();
    componenteLista.desmontar();
  };
}
