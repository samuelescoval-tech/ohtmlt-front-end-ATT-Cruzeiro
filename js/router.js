import { projetos } from './data/projetos.js';
import { criarInicio } from './views/inicio.js';
import { criarProjetos } from './views/projetos.js';

const rotas = new Map([
  ['inicio', {
    titulo: 'Início | OHTMLT',
    descricao: 'Conheça a OHTMLT, organização fictícia de inclusão e aprendizado digital.',
    criar: criarInicio,
  }],
  ['projetos', {
    titulo: 'Projetos | OHTMLT',
    descricao: 'Explore as propostas demonstrativas de inclusão digital da OHTMLT.',
    criar: criarProjetos,
  }],
  ['cadastro', {
    titulo: 'Cadastro demonstrativo | OHTMLT',
    descricao: 'Experimente o formulário demonstrativo da OHTMLT usando somente dados fictícios.',
    async carregar() {
      const [view, formulario] = await Promise.all([
        import('./views/cadastro.js'), import('./modules/form.js'),
      ]);
      return { criar: view.criarCadastro, montar: formulario.iniciarFormulario };
    },
  }],
]);

const oficinas = new Set(projetos.map(projeto => projeto.id));

function criarNaoEncontrada() {
  const fragmento = document.createDocumentFragment();
  const titulo = document.createElement('h1');
  titulo.textContent = 'Página não encontrada';
  const texto = document.createElement('p');
  texto.textContent = 'Escolha uma opção da navegação ou volte ao início.';
  const link = document.createElement('a');
  link.href = '#inicio';
  link.textContent = 'Voltar ao início';
  fragmento.append(titulo, texto, link);
  return fragmento;
}

const naoEncontrada = {
  titulo: 'Página não encontrada | OHTMLT',
  descricao: 'O endereço solicitado não corresponde a uma página da OHTMLT.',
  criar: criarNaoEncontrada,
};

function resolverRota(hash) {
  const partes = hash.slice(1).split('/');
  const [nome, destino] = partes;
  const valida = rotas.has(nome) && (partes.length === 1 ||
    (partes.length === 2 && nome === 'projetos' && oficinas.has(destino)));
  return valida ? { nome, destino, view: rotas.get(nome) } :
    { nome: 'nao-encontrada', view: naoEncontrada };
}

export function iniciarRoteador({ fecharMenus }) {
  const app = document.querySelector('#app');
  const conteudo = document.querySelector('#conteudo');
  const descricao = document.querySelector('meta[name="description"]');
  let rotaAtual;
  let desmontar;
  let versaoRenderizacao = 0;

  function focarConteudo(destino) {
    const alvo = destino ? document.getElementById(destino) : conteudo;
    alvo.focus({ preventScroll: true });
    alvo.scrollIntoView({ block: 'start' });
  }

  async function renderizar({ inicial = false } = {}) {
    const versao = ++versaoRenderizacao;
    if (!location.hash) {
      history.replaceState(history.state, '', location.pathname + location.search + '#inicio');
    }
    const rota = resolverRota(location.hash);
    fecharMenus();
    if (rota.nome !== rotaAtual) {
      desmontar?.();
      desmontar = undefined;
      rotaAtual = undefined;
      try {
        let view = rota.view;
        if (view.carregar) {
          const mensagem = document.createElement('p');
          mensagem.setAttribute('role', 'status');
          mensagem.textContent = 'Carregando cadastro…';
          app.replaceChildren(mensagem);
          app.dataset.rota = 'carregando';
          app.setAttribute('aria-busy', 'true');
          view = await view.carregar();
          // Uma navegação mais recente tem prioridade sobre este carregamento.
          if (versao !== versaoRenderizacao) return;
        }
        app.replaceChildren(view.criar());
        desmontar = view.montar?.(app);
        rotaAtual = rota.nome;
        app.dataset.rota = rota.nome;
      } catch {
        if (versao !== versaoRenderizacao) return;
        const titulo = document.createElement('h1');
        titulo.textContent = 'Não foi possível abrir esta tela';
        const mensagem = document.createElement('p');
        mensagem.textContent = 'Recarregue a página para tentar novamente ou escolha outra opção do menu.';
        const recarregar = document.createElement('button');
        recarregar.type = 'button';
        recarregar.className = 'botao';
        recarregar.textContent = 'Recarregar página';
        recarregar.addEventListener('click', () => location.reload(), { once: true });
        app.replaceChildren(titulo, mensagem, recarregar);
        app.dataset.rota = 'falha';
        document.title = 'Falha ao carregar | OHTMLT';
        descricao.content = 'Não foi possível carregar a tela solicitada.';
        document.querySelectorAll('nav [aria-current]').forEach(link => link.removeAttribute('aria-current'));
        focarConteudo();
        return;
      } finally {
        if (versao === versaoRenderizacao) app.removeAttribute('aria-busy');
      }
    }
    document.title = rota.view.titulo;
    descricao.content = rota.view.descricao;
    document.querySelectorAll('nav a[data-rota]').forEach(link => {
      if (link.dataset.rota === rota.nome) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    if (!inicial || rota.destino) focarConteudo(rota.destino);
  }

  window.addEventListener('hashchange', () => renderizar());
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey ||
        event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname ||
        url.search !== location.search) return;
    if (link.classList.contains('pular-conteudo')) {
      event.preventDefault();
      focarConteudo();
    } else if (url.hash === location.hash) {
      // O mesmo hash não emite hashchange; apenas reposiciona o foco, sem remontar a view.
      event.preventDefault();
      renderizar();
    }
  });
  renderizar({ inicial: true });
}
