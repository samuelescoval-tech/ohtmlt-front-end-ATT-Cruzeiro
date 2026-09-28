export function anunciarSucesso(regiao, mensagem) {
  const alerta = document.createElement('p');
  alerta.className = 'alerta alerta--sucesso';
  alerta.textContent = mensagem;
  regiao.replaceChildren(alerta);
}

export function anunciarErro(regiao, mensagem) {
  const aviso = document.createElement('p');
  aviso.className = 'alerta alerta--erro';
  aviso.textContent = mensagem;
  regiao.replaceChildren(aviso);
}
