import { anunciarSucesso } from './feedback.js';

export function iniciarLimpeza() {
  const form = document.querySelector('#form-cadastro');
  if (!form) return;
  const modal = document.querySelector('#modal-limpeza');
  if (typeof modal.showModal !== 'function') return;
  const abrir = document.querySelector('#abrir-limpeza');
  const cancelar = document.querySelector('#cancelar-limpeza');
  const confirmar = document.querySelector('#confirmar-limpeza');
  const status = document.querySelector('#status-cadastro');
  const campos = [...form.querySelectorAll('input')];
  let confirmou = false;

  function atualizarDisponibilidade() {
    abrir.disabled = campos.every(campo => campo.value === '');
  }

  abrir.hidden = false;
  document.querySelector('#ajuda-limpeza').hidden = false;
  atualizarDisponibilidade();
  window.addEventListener('pageshow', atualizarDisponibilidade);
  form.addEventListener('input', () => {
    atualizarDisponibilidade();
    status.replaceChildren();
  });
  abrir.addEventListener('click', () => {
    confirmou = false;
    modal.showModal();
    cancelar.focus();
  });
  modal.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    if (event.shiftKey && document.activeElement === cancelar) {
      event.preventDefault();
      confirmar.focus();
    } else if (!event.shiftKey && document.activeElement === confirmar) {
      event.preventDefault();
      cancelar.focus();
    }
  });
  cancelar.addEventListener('click', () => modal.close());
  confirmar.addEventListener('click', () => {
    confirmou = true;
    form.reset();
    modal.close();
  });
  modal.addEventListener('close', () => {
    // Devolver o foco antes de recalcular o estado desabilitado do acionador.
    abrir.focus();
    atualizarDisponibilidade();
    if (confirmou) {
      campos[0].focus();
      anunciarSucesso(status, 'Campos limpos. Você pode iniciar outra demonstração.');
    }
  });
}
