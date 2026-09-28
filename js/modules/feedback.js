export function anunciarSucesso(regiao, mensagem) {
  const alerta = document.createElement('p');
  alerta.className = 'alerta alerta--sucesso';
  alerta.textContent = mensagem;
  regiao.replaceChildren(alerta);
}
