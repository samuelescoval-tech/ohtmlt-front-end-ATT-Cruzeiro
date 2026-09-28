import { anunciarSucesso } from './feedback.js';

export function iniciarLimpeza(raiz = document) {
  const form = raiz.querySelector('#form-cadastro');
  if (!form) return;
  const modal = raiz.querySelector('#modal-limpeza');
  if (typeof modal.showModal !== 'function') return;
  const abrir = raiz.querySelector('#abrir-limpeza');
  const cancelar = raiz.querySelector('#cancelar-limpeza');
  const confirmar = raiz.querySelector('#confirmar-limpeza');
  const status = raiz.querySelector('#status-cadastro');
  const campos = [...form.querySelectorAll('input')];
  let confirmou = false;
  const controller = new AbortController();
  const opcoes = { signal: controller.signal };

  function atualizarDisponibilidade() {
    abrir.disabled = campos.every(campo => campo.value === '');
  }

  abrir.hidden = false;
  raiz.querySelector('#ajuda-limpeza').hidden = false;
  atualizarDisponibilidade();
  window.addEventListener('pageshow', atualizarDisponibilidade, opcoes);
  form.addEventListener('input', () => {
    atualizarDisponibilidade();
    status.replaceChildren();
  }, opcoes);
  abrir.addEventListener('click', () => {
    confirmou = false;
    modal.showModal();
    cancelar.focus();
  }, opcoes);
  modal.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    if (event.shiftKey && document.activeElement === cancelar) {
      event.preventDefault();
      confirmar.focus();
    } else if (!event.shiftKey && document.activeElement === confirmar) {
      event.preventDefault();
      cancelar.focus();
    }
  }, opcoes);
  cancelar.addEventListener('click', () => modal.close(), opcoes);
  confirmar.addEventListener('click', () => {
    confirmou = true;
    form.reset();
    modal.close();
  }, opcoes);
  modal.addEventListener('close', () => {
    // Devolver o foco antes de recalcular o estado desabilitado do acionador.
    abrir.focus();
    atualizarDisponibilidade();
    if (confirmou) {
      campos[0].focus();
      anunciarSucesso(status, 'Campos limpos. Você pode iniciar outra demonstração.');
    }
  }, opcoes);
  return function desmontarLimpeza() {
    controller.abort();
    if (modal.open) modal.close();
  };
}
