import { validarCampo } from './validation.js';
import { iniciarLimpeza } from './modal.js';
import { anunciarSucesso } from './feedback.js';

export function iniciarFormulario(raiz) {
  const form = raiz.querySelector('#form-cadastro');
  const campos = [...form.querySelectorAll('input')];
  const status = raiz.querySelector('#status-cadastro');
  const controller = new AbortController();
  const opcoes = { signal: controller.signal };
  const tratados = new Set();
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
    anunciarSucesso(status, 'Formatos verificados. Esta etapa apenas valida a demonstração; os dados ainda não são salvos.');
  }, opcoes);
  // Ativar somente após conectar o tratamento do envio.
  form.noValidate = true;
  return () => {
    controller.abort();
    desmontarLimpeza?.();
  };
}
