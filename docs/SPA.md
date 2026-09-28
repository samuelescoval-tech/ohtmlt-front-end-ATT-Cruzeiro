# Navegação SPA da OHTMLT

A etapa 5 reúne a aplicação em `index.html`. Cabeçalho, navegação, rodapé, `main#conteudo` e `div#app` permanecem no documento; o roteador substitui somente o conteúdo de `#app` quando a view muda. Os arquivos estáticos anteriores podem ser recuperados pelo histórico Git.

## Rotas e entrada direta

| Hash | Conteúdo | Título do documento |
| --- | --- | --- |
| `#inicio` | Apresentação, quem somos e participação. | Início \| OHTMLT |
| `#projetos` | Três propostas, com mídia, categoria e links de interesse. | Projetos \| OHTMLT |
| `#cadastro` | Formulário nativo e modal de limpeza. | Cadastro demonstrativo \| OHTMLT |
| `#projetos/primeiros-passos` | Projetos, com foco na primeira oficina. | Projetos \| OHTMLT |
| `#projetos/html-para-todos` | Projetos, com foco na oficina de HTML. | Projetos \| OHTMLT |
| `#projetos/aprender-em-rede` | Projetos, com foco na oficina de colaboração. | Projetos \| OHTMLT |
| Outros hashes | Mensagem “Página não encontrada”, com link de retorno. | Página não encontrada \| OHTMLT |

O roteador também atualiza a descrição da página e `aria-current="page"` no link principal correspondente. Na rota desconhecida, nenhum desses links recebe estado ativo. O conteúdo do hash não é inserido como HTML nem exibido na mensagem.

Sem hash, `history.replaceState()` normaliza o endereço para `#inicio`, preservando caminho e query existentes e sem acrescentar uma entrada ao histórico. Abrir `http://127.0.0.1:5500/#cadastro` ou recarregar esse endereço monta diretamente o cadastro. As rotas por hash funcionam pelo servidor estático usado no projeto, sem regras de redirecionamento do servidor.

## Fluxo e responsabilidades

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Documento principal, recursos, cabeçalho, área de conteúdo e rodapé. |
| `js/main.js` | Inicializar navegação e roteador uma única vez. |
| `js/router.js` | Resolver hashes permitidos, trocar views, atualizar metadados, link ativo, foco e ciclo de vida. |
| `js/views/inicio.js` | Criar o fragmento da apresentação. |
| `js/views/projetos.js` | Criar o fragmento das propostas existentes. |
| `js/views/cadastro.js` | Criar o fragmento do formulário e do diálogo. |
| `js/modules/navigation.js` | Controlar os menus persistentes e fornecer `fecharMenus()` ao roteador. |
| `js/modules/modal.js` | Montar os eventos da limpeza e devolver uma função de desmontagem. |

As três views usam um elemento `<template>` criado no módulo, preenchido com uma string de marcação fixa, e retornam seu `DocumentFragment`. `String.raw` preserva as barras dos `pattern` do formulário. Nenhum valor digitado ou trecho de URL é interpolado nessa marcação. A página desconhecida usa `createElement()` e `textContent` para suas mensagens fixas.

O módulo de cards alimentados por dados será desenvolvido na etapa 6. Nesta etapa, as views apenas transferem os conteúdos existentes, sem criar uma nova lista de dados ou antecipar a persistência.

A primeira renderização acontece na inicialização. Nas trocas seguintes, `hashchange` resolve a rota e chama `app.replaceChildren()` somente se o nome da view mudou. Trocar o destino de uma oficina mantém os mesmos cards; selecionar a rota atual mantém os mesmos campos e valores. Sair do cadastro e voltar cria um formulário novo e vazio. Não há cache de preenchimento ou armazenamento local.

## Links, teclado e histórico

Links internos usam hashes e deixam o navegador atualizar a URL e o histórico. Voltar e avançar acionam `hashchange`, atualizam a tela e preservam o documento. O roteador trata explicitamente dois cliques que não precisam alterar o hash:

- O link “Pular para o conteúdo” foca e posiciona `main#conteudo`, preservando a rota e o histórico.
- Um link para o hash que já está ativo reposiciona o foco sem recriar a view nem acrescentar histórico.

Esse tratamento só alcança cliques sem modificadores, para o mesmo documento, sem `download` e sem destino para outra aba. Ctrl, Meta, Shift, Alt, links externos e `target="_blank"` mantêm o comportamento padrão. A verificação de cliques especiais interceptou apenas a ação final no ensaio para não abrir abas ou visitar destinos externos.

Após uma navegação interna, o foco vai para `main#conteudo`, que possui `tabindex="-1"`. Ao seguir uma oficina, ele vai ao `h3` correspondente, também com `tabindex="-1"`, e o título é trazido para a área visível. Na primeira carga de uma rota principal, não há transferência automática do foco. A entrada direta em uma oficina posiciona seu título.

Os menus são fechados também nas mudanças de rota originadas pelo histórico. Teclado, estado anunciado e visibilidade continuam sob responsabilidade do módulo de navegação.

## Montagem e desmontagem

Os menus são inicializados uma única vez porque pertencem ao cabeçalho persistente. O roteador também registra apenas um `hashchange` e um listener delegado de clique.

Cada montagem do cadastro chama `iniciarLimpeza(app)`. O módulo usa `AbortController` nos eventos de campos, botões, diálogo e `pageshow`. Antes de remover a view, o roteador chama a função de desmontagem: aborta os listeners e fecha o diálogo, caso esteja aberto. Assim, um evento de fechamento de um diálogo removido não devolve o foco a um controle antigo.

O teste alternou projetos e cadastro doze vezes, comparou as contagens de eventos globais e acionou referências a controles já removidos. Também verificou a mudança de rota e o botão voltar enquanto o modal estava aberto.

## Formulário nesta etapa

As regras HTML de obrigatoriedade, tipos, limites e formatos foram preservadas. O formulário válido continua usando `GET`, agora com `action="index.html#cadastro"`: essa submissão explícita recarrega o documento, inclui os valores fictícios na URL e volta ao cadastro vazio. A navegação interna entre as views é que ocorre sem recarga.

Não existe `preventDefault()` para substituir o envio nesta etapa. Rotinas de validação e envio na própria página serão implementadas na etapa 7; persistência, na etapa 8. O modal de limpeza permanece funcional após cada montagem e só anuncia sucesso depois de limpar os campos.

## Execução e limites

Use o servidor HTTP descrito no [README](../README.md), pois a aplicação depende de módulos JavaScript. Sem JavaScript, o documento mostra uma apresentação básica e uma instrução para ativá-lo; a navegação da SPA permanece oculta. O fallback não oferece as outras views.

As páginas redundantes `projetos.html` e `cadastro.html` foram removidas após a verificação da migração. Os links atuais usam hashes. Favoritos com esses nomes antigos precisam ser atualizados; não há redirecionamento de compatibilidade ou deploy nesta etapa.

Os resultados e os limites dos ensaios estão em [TESTES.md](TESTES.md), com [evidência da navegação e do ciclo de eventos](evidencias/etapa-5/rotas.json).
