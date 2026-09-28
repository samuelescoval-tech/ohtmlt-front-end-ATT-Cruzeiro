function elemento(tag, texto, classe) {
  const node = document.createElement(tag);
  if (texto !== undefined) node.textContent = texto;
  if (classe) node.className = classe;
  return node;
}

export function criarCardProjeto(projeto) {
  const card = elemento('article', undefined, 'projeto col-4');
  card.setAttribute('aria-labelledby', projeto.id);
  const imagem = elemento('img', undefined, 'projeto__imagem');
  imagem.src = 'assets/imagens/inclusao-digital.svg';
  imagem.width = 224;
  imagem.height = 126;
  imagem.loading = 'lazy';
  imagem.alt = '';
  const categoria = elemento('p');
  categoria.append(elemento('span', projeto.categoria, 'selo'));
  const titulo = elemento('h3', projeto.titulo);
  titulo.id = projeto.id;
  titulo.tabIndex = -1;
  const publico = elemento('p');
  publico.append(elemento('strong', 'Público da proposta:'), document.createTextNode(' ' + projeto.publico));
  const link = elemento('a', projeto.textoAcao);
  link.href = '#cadastro';
  card.append(imagem, categoria, titulo, elemento('p', projeto.descricao), publico, link);
  return card;
}

export function renderizarProjetos(container, projetos) {
  const fragmento = document.createDocumentFragment();
  const titulo = elemento('h2', 'Oficinas propostas', 'col-12');
  titulo.id = 'oficinas';
  fragmento.append(titulo);
  projetos.forEach(projeto => fragmento.append(criarCardProjeto(projeto)));
  container.replaceChildren(fragmento);
}

export function renderizarMenuProjetos(container, projetos) {
  const fragmento = document.createDocumentFragment();
  projetos.forEach(projeto => {
    const item = elemento('li');
    const link = elemento('a', projeto.titulo);
    link.href = '#projetos/' + projeto.id;
    item.append(link);
    fragmento.append(item);
  });
  container.replaceChildren(fragmento);
}
