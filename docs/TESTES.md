# Verificações da OHTMLT

## Etapa 1 — estrutura HTML

Data: **28/09/2026**. Branch de implementação: `feature/estrutura-html`. Ambiente: Linux, Python 3 (`http.server`), Chrome/154.0.8037.57 em modo headless, Node.js v22.22.1. Endereço testado: `http://127.0.0.1:5500/`.

A automação acionou o Chrome pelo Chrome DevTools Protocol usando um script temporário, sem instalar dependências no projeto. Os passos abaixo permitem repetir as verificações manualmente. A execução concluída consta no [relatório do navegador](evidencias/etapa-1/navegador.json), com data, 37 casos aprovados e hashes SHA-256 dos HTML testados. O script temporário não é distribuído como suíte de testes do projeto.

### HTML e recursos

Os documentos completos foram enviados por HTTP POST ao [W3C Nu HTML Checker](https://validator.w3.org/nu/) com o tipo `text/html; charset=utf-8`. As respostas JSON originais estão preservadas:

| Documento | Erros | Avisos | Resposta |
| --- | --- | --- | --- |
| `index.html` | 0 | 0 | [W3C — início](evidencias/etapa-1/w3c-index.json) |
| `projetos.html` | 0 | 0 | [W3C — projetos](evidencias/etapa-1/w3c-projetos.json) |
| `cadastro.html` | 0 | 0 | [W3C — cadastro](evidencias/etapa-1/w3c-cadastro.json) |

Todos os links e os recursos referenciados pelas páginas responderam HTTP 200. A imagem carregou e possui texto alternativo. O navegador não registrou exceções JavaScript nem recursos com falha durante os casos executados. Não há scripts da aplicação nesta etapa.

### Casos de navegação e formulário

| Passos para reproduzir | Esperado | Observado |
| --- | --- | --- |
| Abrir cada página e conferir idioma, título e estrutura. | `pt-BR`, título específico, um `h1`, um `main`, IDs únicos. | Aprovado nas três páginas. |
| Conferir o link atual da navegação em cada página. | Apenas um link com `aria-current="page"`, correspondente à página. | Aprovado nas três páginas. |
| Pressionar Tab e Enter no link “Pular para o conteúdo”. | Primeiro foco no link; Enter move o foco ao `main`. | Aprovado. |
| Acionar Projetos por Enter e seguir o link de um projeto. | Carregar Projetos e depois Cadastro. | Aprovado. |
| Conferir rótulos, grupos e descrições dos campos. | Cinco campos obrigatórios com `label` associado; descrições apontam para elementos existentes. | Aprovado. |
| Enviar o formulário vazio. | Navegador bloqueia o envio e foca o nome. | Aprovado; cinco campos com `valueMissing`. |
| Preencher nome apenas com espaços. | Formato rejeitado. | Aprovado: `patternMismatch`. |
| Preencher e-mail com `email-invalido`. | Formato rejeitado. | Aprovado: `typeMismatch`. |
| Usar telefone `00000000000`, CPF `00000000000` ou CEP `00000000`. | Rejeitar ausência da pontuação exigida. | Aprovado: `patternMismatch` nos três campos. |
| Clicar no rótulo CPF. | Focar seu campo. | Aprovado. |
| Preencher os valores fictícios abaixo. | Navegador aceita os formatos; nenhuma verificação de existência. | Aprovado. |
| Pressionar Enter com foco no CEP após preencher os valores válidos. | Envio GET para a mesma página, valores na URL e âncora do formulário. | Aprovado; sem persistência em `localStorage`. |
| Abrir as três páginas com viewport de 320 px. | Largura do documento não excede a largura útil da janela. | Aprovado após ajuste da imagem inicial. |

Valores utilizados no caso válido: nome `Pessoa Demonstração`, e-mail `pessoa@example.com`, telefone `(00)00000-0000`, CPF `000.000.000-00` e CEP `00000-000`. São dados fictícios para verificar formato. A aceitação de `000.000.000-00` confirma que esta etapa não valida dígitos verificadores do CPF.

### Problema observado e correção

**Imagem na tela estreita.** Na primeira verificação de 320 px, a largura do documento excedeu a janela. A imagem tinha largura HTML de 288 px, somada às margens nativas de 40 px do elemento `figure` e às margens do documento. Ajustaram-se os atributos da imagem para 224 × 126 px, preservando a proporção. O reteste não detectou rolagem horizontal em nenhuma das três páginas; `index.html` também foi reenviado ao W3C após a alteração, sem apontamentos.

**Ajustes da automação.** A primeira simulação de Enter não produziu o envio porque o evento de teclado estava sem o texto de retorno de carro (`\r`). A automação foi corrigida e o envio passou, sem alteração no formulário. Na inspeção das capturas, foi corrigida a largura de captura para incluir toda a janela, evitando corte de texto na evidência. Esses ajustes são do procedimento de teste, não falhas de JavaScript da aplicação.

### Capturas

- [Início em desktop](evidencias/etapa-1/index-desktop.png).
- [Projetos em desktop](evidencias/etapa-1/projetos-desktop.png).
- [Cadastro em desktop](evidencias/etapa-1/cadastro-desktop.png).
- [Validação nativa do formulário vazio](evidencias/etapa-1/cadastro-validacao-nativa.png).
- [Início com viewport de 320 px](evidencias/etapa-1/inicio-320px.png).

As capturas foram produzidas no navegador, com conteúdo integral da página. As janelas usadas foram 1280 × 900 e 320 × 900 px; a altura dos PNGs pode ser maior por incluir o conteúdo fora da área inicial.

### Limitações

Não foram executados testes em Firefox, Safari, dispositivos físicos, leitores de tela ou auditorias completas de acessibilidade. A checagem de largura não valida um layout responsivo com breakpoints, pois CSS ainda não foi implementado. Formatos válidos não comprovam existência dos dados. O envio nativo inclui valores na URL e não mantém cadastros; utilizar somente valores fictícios. SPA, máscaras, feedback personalizado, armazenamento, desempenho e deploy não fazem parte desta etapa.


## Etapa 2 — Design System

Data: **28/09/2026**. Branch de implementação: `feature/design-system`. Ambiente: Linux, Python 3 (`http.server`), Chrome 154 em modo headless, Node.js v22.22.1. A automação usou Chrome DevTools Protocol e script temporário, sem instalar dependências. A base de verificação da etapa 1 foi reaplicada ao HTML com CSS.

Foram concluídos **54 casos no navegador** e **22 medições de contraste**. Os arquivos testados e seus hashes SHA-256 estão no [relatório do navegador](evidencias/etapa-2/navegador.json), incluindo `css/base.css`. As medições completas estão em [contraste.json](evidencias/etapa-2/contraste.json).

### Casos acrescentados

| Procedimento | Resultado observado |
| --- | --- |
| Conferir as variáveis e os estilos computados do corpo, títulos, cabeçalho e legenda. | 12 cores distintas, cinco tamanhos de fonte aplicados e oito passos de espaçamento. |
| Usar hover e pressionar a ação principal. | Azul mais escuro com texto branco; contraste preservado. |
| Usar hover na ação secundária e na navegação. | Verde com texto branco na ação de apoio; amarelo no cabeçalho azul. |
| Navegar por Tab no cabeçalho e no formulário. | Contorno de 3 px amarelo no cabeçalho e azul no campo; foco visível. |
| Abrir o formulário sem interagir e depois tentar enviá-lo vazio. | Sem borda de erro inicialmente; borda vermelha e mensagem nativa após a tentativa. |
| Aplicar temporariamente `disabled` ao botão existente no teste. | Estilo desabilitado aplicado, ativação bloqueada e texto legível; atributo removido após a verificação. |
| Ampliar o tamanho raiz do texto para 200% e usar viewport de 320 px nas três páginas. | Sem rolagem horizontal depois da correção de `legend`. |
| Emular `prefers-reduced-motion: reduce`. | Nenhuma animação ou transição ativa. |
| Repetir os casos de navegação, teclado, formulário e carregamento de recursos. | Todos aprovados; nenhuma exceção JavaScript ou recurso HTTP com falha. |

As cores foram lidas dos estilos computados nos estados testados. As razões foram comparadas sem arredondamento com 4,5:1 para texto e 3:1 para bordas e foco. A documentação do [Design System](DESIGN-SYSTEM.md) apresenta as combinações, referências e limites da verificação. O controle desabilitado foi medido voluntariamente; o teste não significa que exista uma regra automática de desabilitação na aplicação.

### HTML após as alterações

Os três documentos foram novamente enviados ao W3C Nu HTML Checker: **zero erros e zero avisos**. Respostas originais: [início](evidencias/etapa-2/w3c-index.json), [projetos](evidencias/etapa-2/w3c-projetos.json) e [cadastro](evidencias/etapa-2/w3c-cadastro.json). Esta submissão valida o HTML; não é um relatório de validação do CSS.

### Problema observado e correção

Com texto em 200% e viewport de 320 px, o cadastro atingiu largura de 359 px para uma área útil de 305 px. Os elementos `legend` “Identificação” e “Contato e localização” ultrapassavam o espaço disponível. O diagnóstico no navegador confirmou o limite direito de aproximadamente 359,25 px do primeiro título.

Foram adicionados `max-inline-size: 100%` e `overflow-wrap: anywhere` a `legend`, mantendo a fonte ampliada. No reteste, as três páginas passaram na comparação entre `scrollWidth` e `clientWidth`. Não foi reduzido o tamanho da fonte para esconder o problema.

### Capturas da etapa

- [Início com CSS em desktop](evidencias/etapa-2/index-desktop.png).
- [Projetos com selo demonstrativo](evidencias/etapa-2/projetos-desktop.png).
- [Cadastro com aviso e campos](evidencias/etapa-2/cadastro-desktop.png).
- [Validação nativa com borda de erro](evidencias/etapa-2/cadastro-validacao-nativa.png).
- [Início em 320 px](evidencias/etapa-2/inicio-320px.png).
- [Foco na navegação](evidencias/etapa-2/foco-menu.png).
- [Foco no campo](evidencias/etapa-2/foco-campo.png).
- [Botão existente temporariamente desabilitado pelo teste](evidencias/etapa-2/botao-desabilitado.png).
- [Texto ampliado a 200% em 320 px](evidencias/etapa-2/inicio-texto-200.png).

As capturas registram os estados indicados. A imagem do botão desabilitado representa um estado aplicado pela automação ao controle real, sem alteração permanente no HTML. As capturas da página inicial em desktop e em 320 px também foram inspecionadas visualmente.

### Limitações desta etapa

A ampliação foi do tamanho raiz do texto via CSS, não um ensaio completo de zoom do navegador. As medições abrangem as 22 combinações registradas e não atestam conformidade completa de acessibilidade. Não foram testados outros navegadores, leitores de tela ou dispositivos físicos. A ausência de rolagem horizontal não comprova Grid ou breakpoints, que ainda não foram implementados. A cor de sucesso continua reservada; não há confirmação de cadastro ou persistência.


## Etapa 3 — layout responsivo

Data: **28/09/2026**. Branch de implementação: `feature/layout-responsivo`. Ambiente: Linux, Python 3 (`http.server`), Chrome 154 headless e Node.js v22.22.1. A automação temporária usa Chrome DevTools Protocol, sem dependências instaladas no projeto.

**123 verificações aprovadas**, incluindo os testes funcionais e visuais anteriores, **57 combinações de página e largura**, texto ampliado e ordem de Tab. O [relatório do navegador](evidencias/etapa-3/navegador.json) contém os casos e os hashes dos três HTML e dos dois CSS testados. As medidas detalhadas estão em [layout.json](evidencias/etapa-3/layout.json).

### Matriz de larguras

As três páginas foram verificadas em cada uma destas 19 larguras: **320, 375, 479, 480, 481, 767, 768, 769, 991, 992, 993, 1199, 1200, 1201, 1280, 1439, 1440, 1441 e 1920 px**. A altura inicial foi de 900 px.

Para cada breakpoint, a matriz cobre um pixel antes, o limite exato e um pixel depois. A altura dos PNGs pode exceder 900 px para preservar o conteúdo integral.

| Verificação | Resultado observado |
| --- | --- |
| Media queries ativas e estilos computados em cada largura. | Os cinco limites responderam como definidos. |
| Quantidade de trilhas em todas as grades. | Doze trilhas em todas as 57 combinações; sem colunas implícitas extras. |
| `scrollWidth` versus `clientWidth` da página e das grades. | Sem corte horizontal nos cenários executados; tolerância de 1 px apenas para arredondamento dentro das grades. |
| Alinhamento dos containers de cabeçalho, conteúdo e rodapé. | Bordas alinhadas em todas as larguras. |
| Margens internas, intervalos e limites máximos. | Valores correspondentes aos breakpoints; container limitado a 1280 px em 1920 px. |
| Quantidade e ocupação dos projetos. | Três projetos mantidos: um por linha abaixo de 768 px, dois a partir de 768 px, três a partir de 992 px. |
| Flexbox interno dos projetos e posição de seus links. | Direção em coluna; links alinhados pela borda inferior nos cards da mesma linha. |
| Formulário e posição de nome/CPF. | Área de até 704 px com raiz de 16 px; campos empilhados no celular e lado a lado a partir de 768 px. |
| Imagem da apresentação. | Proporção original preservada e largura dentro da coluna. |
| Texto ampliado para 200% em 320, 768, 992 e 1440 px. | As três páginas preservaram o conteúdo sem rolagem horizontal nos cenários testados. |
| Tab em 320 e 1440 px. | Ordem: pular conteúdo, Início, Projetos, Cadastro, nome, CPF, e-mail, telefone, CEP e botão de envio. |
| Navegação, campos vazios/inválidos/válidos, envio, foco, hover e estados nativos. | Regressões anteriores aprovadas. |

Para repetir manualmente, inicie o servidor descrito no README, abra cada página no modo responsivo do navegador e informe as larguras da matriz. Compare a quantidade de projetos por linha, a disposição dos campos, o alinhamento e a presença de rolagem horizontal. Use Tab e Shift+Tab para conferir a sequência e a visibilidade do foco. As medições automatizadas da ordem registraram o percurso com Tab; o percurso inverso não foi automatizado nesta etapa.

### HTML, contraste e recursos

As respostas do W3C Nu HTML Checker registraram zero erros e zero avisos: [início](evidencias/etapa-3/w3c-index.json), [projetos](evidencias/etapa-3/w3c-projetos.json) e [cadastro](evidencias/etapa-3/w3c-cadastro.json).

As [22 combinações de contraste](evidencias/etapa-3/contraste.json) foram medidas novamente e passaram. Os links dos projetos agora usam fundo branco, com razão de aproximadamente 11,55:1. Não houve exceções JavaScript ou recursos HTTP com falha nos percursos testados.

### Decisões verificadas

Regras estruturais de `css/base.css` foram transferidas para `css/layout.css` para evitar duplicação de largura, margem e distribuição. Os itens que ocupam as doze colunas não precisam de intervalo horizontal na base; ele começa em 768 px, quando surgem itens lado a lado. O teste de texto ampliado confirmou que essa organização não excedeu as áreas disponíveis.

A execução final não apresentou falhas. Os problemas e correções das etapas anteriores continuam registrados nas suas respectivas seções; não foram atribuídos novamente a esta etapa.

### Capturas

- [Início em desktop](evidencias/etapa-3/index-desktop.png) e [em 320 px](evidencias/etapa-3/inicio-320px.png).
- Projetos: [767 px](evidencias/etapa-3/projetos-767px.png), [768 px](evidencias/etapa-3/projetos-768px.png), [991 px](evidencias/etapa-3/projetos-991px.png) e [992 px](evidencias/etapa-3/projetos-992px.png).
- Telas largas: [1200 px](evidencias/etapa-3/projetos-1200px.png), [1440 px](evidencias/etapa-3/projetos-1440px.png) e [1920 px](evidencias/etapa-3/projetos-1920px.png).
- Cadastro: [375 px](evidencias/etapa-3/cadastro-375px.png), [desktop](evidencias/etapa-3/cadastro-desktop.png), [foco no campo](evidencias/etapa-3/foco-campo.png) e [erro nativo](evidencias/etapa-3/cadastro-validacao-nativa.png).
- [Foco na navegação](evidencias/etapa-3/foco-menu.png), [texto ampliado a 200%](evidencias/etapa-3/inicio-texto-200.png), [estado desabilitado aplicado pelo teste](evidencias/etapa-3/botao-desabilitado.png) e [projetos em desktop](evidencias/etapa-3/projetos-desktop.png).

As capturas de início em desktop, projetos em 768 e 1440 px e cadastro em 375 px também foram inspecionadas visualmente.

### Limitações

Os testes foram executados somente no Chrome headless. Viewports em CSS px não representam todos os dispositivos físicos. A ampliação alterou a fonte raiz, sem constituir uma auditoria completa de zoom. Menus expansíveis e interações de modal ainda não foram implementados. O formulário continua demonstrativo, com envio nativo GET, e deve receber apenas dados fictícios. Nenhuma conformidade completa de acessibilidade ou resultado de deploy é declarado.

## Etapa 4 — componentes visuais

Execução em 28/09/2026 no Chrome 154, via Chrome DevTools Protocol e servidor HTTP local, sem instalar dependências. Esta etapa adiciona JavaScript aos três documentos existentes. A validação nativa e a navegação entre páginas foram verificadas novamente.

### Escopo verificado

- Desktop: submenu começa fechado; Enter e Espaço alternam a abertura; Tab alcança os links; Escape fecha e devolve o foco; saída do foco e clique externo fecham a lista.
- Mobile: hambúrguer começa fechado; os links ocultos ficam fora da sequência de Tab; Escape fecha o submenu antes da navegação; o foco volta ao controle correspondente.
- Mudança entre 767 e 768 px: visibilidade e `aria-expanded` permanecem coerentes, com transferência do foco quando um controle vai ficar oculto.
- Cards: três propostas existentes, mídia proporcional 16:9 e ações alinhadas na mesma linha do Grid.
- Controles: hover, foco, pressionado, botão de limpeza desabilitado, formato aceito e erro nativo com indicação textual. Campo desabilitado aplicado apenas como estado temporário de teste.
- Descrições acessíveis dos campos inspecionadas pela árvore de acessibilidade do Chrome: ajuda inicial sem mensagens ocultas; sucesso e erro aparecem somente no estado correspondente.
- Modal: título e descrição identificados, foco inicial em Cancelar, ciclo de Tab/Shift+Tab, Escape e cancelamento preservando os dados, confirmação limpando os campos e anunciando o resultado em `role="status"`.
- Após a confirmação, o acionador fica desabilitado; o foco vai para Nome. Ao editar novamente, a mensagem anterior é removida.
- Modal em 320 × 480 px e texto a 200% em 320, 768 e 1440 px: limites da janela, rolagem interna e palavras dos botões cabendo na área útil.
- Sem JavaScript: links de navegação permanecem visíveis e controles que dependem de script ficam ocultos. Movimento reduzido: transições desativadas.
- Formatos obrigatórios, envio vazio bloqueado, envio válido por GET e ausência de persistência preservados. Nenhuma máscara ou verificação de existência dos dados foi adicionada.

A matriz de layout repete 19 larguras nas três páginas: **320, 375, 479, 480, 481, 767, 768, 769, 991, 992, 993, 1199, 1200, 1201, 1280, 1439, 1440, 1441 e 1920 px**. Desta vez, as medições incluem os menus abertos. Foram conferidos os doze tracks, as colunas dos cards, suas imagens e a ausência de transbordamento horizontal. As três páginas também foram verificadas com menus abertos e texto a 200% em 320, 768 e 1440 px.

**Resultado final: 147 casos aprovados, 57 combinações de layout, 34 combinações de contraste aprovadas e zero erros ou avisos nos três HTML submetidos ao W3C Nu HTML Checker.** Não foram observadas exceções JavaScript ou falhas de recursos HTTP na rodada final.

### Falhas observadas e correções

| Observação real | Diagnóstico e correção | Reteste |
| --- | --- | --- |
| Tab fechava o submenu durante a transferência do foco. | A leitura de `document.activeElement` em uma microtask de `focusout` podia ocorrer durante a troca, antes de o destino receber foco. O código passou a consultar `event.relatedTarget`. | Enter, Tab entre links, Tab para fora, Escape e foco em mobile aprovados. |
| Shift+Tab na primeira ação do diálogo podia levar o foco à interface do navegador. | O diálogo nativo impedia a interação com o fundo, mas não garantia o ciclo entre as duas ações. Foi acrescentado tratamento de Tab nos extremos. | Tab e Shift+Tab permanecem nos botões; Escape continua funcionando. |
| A borda de um campo válido voltava ao azul quando o ponteiro estava sobre ele. | A especificidade do seletor de hover superava a do estado válido. Os seletores de validade passaram a incluir `:not(:disabled)` e mantêm prioridade pela ordem das regras. | Verde no campo válido sob hover, vermelho no inválido sob hover e contraste reavaliados. |
| A captura do modal a 200% em 320 px mostrava rótulos quebrados em muitas linhas, apesar de não haver rolagem horizontal. | As margens e os preenchimentos consumiam a largura de leitura. Foram reduzidos no modal e em seus botões, com título de 1,25 rem. A medição passou a comparar a largura das palavras com a área de texto. | Palavras dos botões cabem em 320, 768 e 1440 px a 200%; inspeção visual repetida. |

Como medida preventiva, as referências diretas às mensagens ocultas foram substituídas pela referência ao contêiner de estado. A árvore de acessibilidade confirmou a descrição correta nos três estados. Isso não é uma declaração de ensaio com leitor de tela.

A automação também foi ajustada: cliques usam eventos reais de ponteiro; medidas de cor aguardam o fim das transições; capturas usam somente o viewport para não provocar mudanças temporárias de largura que alterem o estado dos menus. Esses ajustes pertencem ao ensaio, não a funcionalidades da aplicação.

### Evidências e limites

| Evidência | Conteúdo |
| --- | --- |
| [navegador.json](evidencias/etapa-4/navegador.json) | Casos aprovados, versão do navegador, hashes dos HTML/CSS/JS e ausência de exceções e falhas de recursos. |
| [layout.json](evidencias/etapa-4/layout.json) | 57 medições de página/largura, com menus abertos. |
| [contraste.json](evidencias/etapa-4/contraste.json) | Cores computadas, método e 34 combinações. |
| [W3C início](evidencias/etapa-4/w3c-index.json), [projetos](evidencias/etapa-4/w3c-projetos.json) e [cadastro](evidencias/etapa-4/w3c-cadastro.json) | Respostas da validação dos HTML finais. |
| [Dropdown desktop](evidencias/etapa-4/dropdown-desktop.png) e [menu mobile](evidencias/etapa-4/menu-mobile-aberto.png) | Listas abertas e foco de teclado. |
| [Cards em 375 px](evidencias/etapa-4/cards-375px.png), [768 px](evidencias/etapa-4/cards-768px.png) e [1440 px](evidencias/etapa-4/cards-1440px.png) | Mídia e distribuição dos projetos. |
| [Campos com sucesso e erro](evidencias/etapa-4/campos-sucesso-erro.png) e [botão ativo](evidencias/etapa-4/botao-ativo.png) | Estados reais após interação. |
| [Botão de limpeza desabilitado](evidencias/etapa-4/cadastro-desabilitado.png) e [campo desabilitado](evidencias/etapa-4/campo-desabilitado.png) | O primeiro é um estado real; o segundo foi aplicado somente durante o teste. |
| [Modal desktop](evidencias/etapa-4/modal-desktop.png), [mobile](evidencias/etapa-4/modal-mobile.png) e [texto a 200%](evidencias/etapa-4/modal-texto-200.png) | Confirmação, foco e adaptação do diálogo. |
| [Mensagem de sucesso](evidencias/etapa-4/alerta-sucesso.png) | Resultado da limpeza efetivamente realizada. |

As 18 capturas PNG mostram viewports reais, algumas com a página ou o diálogo rolados para o componente observado. A validação HTML não representa validação externa do CSS. Os testes não cobrem todos os navegadores, zoom completo, dispositivos físicos ou uso com leitores de tela. A ampliação de texto altera o tamanho raiz para 200%. Não houve backend, persistência, SPA, release ou deploy nesta etapa.

## Etapa 5 — navegação SPA

Execução em 28/09/2026 no Chrome 154, com o mesmo servidor HTTP local e sem instalar dependências. O conteúdo foi migrado para três views, preservando os componentes testados na etapa 4.

**Resultado final: 187 casos aprovados, 57 combinações de rota/largura e 34 combinações de contraste aprovadas.** Não foram observadas exceções JavaScript ou falhas de recursos HTTP na rodada final. O documento principal e três documentos serializados após a renderização das views passaram no W3C Nu HTML Checker: zero erros e zero avisos.

### Casos específicos da SPA

| Caso | Resultado observado |
| --- | --- |
| Abrir sem hash | Normaliza para `#inicio` e renderiza o conteúdo inicial. |
| Navegar por Início, Projetos e Cadastro | Atualiza view, título, descrição, link ativo e foco; preserva as referências do cabeçalho, rodapé e contêiner principal. |
| Ausência de reload nas trocas internas | A marca do documento e `performance.timeOrigin` permanecem iguais; não há nova requisição do tipo Document durante a sequência de navegação e histórico. |
| Voltar e avançar | Recupera as views esperadas no mesmo documento. |
| Selecionar a rota já ativa | Não cria entrada de histórico nem remonta o formulário; valores temporários são preservados. |
| Pular para o conteúdo | Move o foco ao `main` sem mudar a rota ou o histórico. |
| Abrir cada oficina | Usa subdestino de `#projetos`, preserva os cards e foca o título correto. |
| Link direto e recarga das três rotas | Renderiza a view correspondente; a recarga explícita cria um novo documento, como esperado. |
| Rotas desconhecidas | Seis casos, incluindo destino inexistente, segmento extra e caracteres codificados: mensagem segura, sem link ativo incorreto, com retorno funcional ao início. |
| Cliques especiais | Ctrl, Meta, Shift, nova aba, download e link externo não são interceptados pelo roteador. A ação final foi cancelada pelo ensaio para evitar abrir abas ou acessar serviços externos. |
| Doze ciclos entre cadastro e projetos | Não acumula listeners globais; controles da view anterior deixam de executar ações. |
| Sair com diálogo aberto | Fecha o modal removido e posiciona o foco na nova view; o botão voltar produz o mesmo resultado. |
| Cadastro após navegação mobile | Menu fecha, foco alcança o conteúdo e confirmação de limpeza continua funcionando. |
| Sem JavaScript | Apresentação básica e instrução de ativação visíveis; navegação da SPA oculta. |

A prova de ausência de reload usa a mesma instância do documento, e não apenas a aparência da página. O arquivo [rotas.json](evidencias/etapa-5/rotas.json) registra as contagens de requisições, eventos, títulos e foco dessa sequência.

### Regressões verificadas

Foram repetidos os testes de menus por teclado e mouse, transição entre mobile e desktop, foco do modal, limpeza, mensagens e descrições acessíveis, estados nativos dos campos e preferência por movimento reduzido. As restrições `pattern` de nome, CPF, telefone e CEP e a validação de e-mail foram verificadas após a migração para `String.raw` nas views.

O envio vazio continua bloqueado pelo navegador. Um envio válido por Enter ainda executa `GET`, recarrega `index.html#cadastro` com valores fictícios na URL e volta ao formulário vazio. Esse comportamento foi preservado deliberadamente nesta etapa; o tratamento do envio na própria página pertence à etapa 7. Nenhum cadastro foi persistido.

A matriz mantém as 19 larguras anteriores, de 320 a 1920 px, incluindo os pixels imediatamente antes e depois dos cinco breakpoints. Nas três rotas, os menus foram abertos durante as medições. Foram conferidos Grid, cards, mídia, alinhamento e ausência de transbordamento. Texto a 200% foi verificado em 320, 768 e 1440 px, incluindo legibilidade dos botões do modal.

### Diagnóstico e ajustes do ensaio

Não foi observada uma falha da implementação SPA na rodada completa. Durante a preparação dos testes, a automação anterior tratava cada destino como um documento diferente. Na SPA, `Page.navigate` para outro hash pode preservar o documento: os testes de abertura direta passaram a aguardar a atualização do endereço antes de solicitar a recarga explícita. As navegações internas são testadas separadamente com cliques e histórico, sem essa recarga.

A serialização usada somente para obter o HTML renderizado também teve um escape de string corrigido no script de teste. Não se registra esse ajuste como defeito do produto. Os testes subsequentes foram concluídos sem exceções.

Após os testes da migração, `projetos.html` e `cadastro.html` foram removidos, e os links atuais passaram a usar hashes. Os arquivos antigos continuam recuperáveis pelo Git; não foi criado redirecionamento para seus nomes anteriores.

### Evidências e limites

- [navegador.json](evidencias/etapa-5/navegador.json): 187 casos, hashes dos arquivos testados, versão do navegador e resultados de recursos/Console.
- [rotas.json](evidencias/etapa-5/rotas.json): navegação no mesmo documento e contagens de eventos antes/depois dos ciclos.
- [layout.json](evidencias/etapa-5/layout.json): 57 medições nas três rotas; [contraste.json](evidencias/etapa-5/contraste.json): 34 combinações medidas.
- W3C: [documento principal](evidencias/etapa-5/w3c-index.json), [início renderizado](evidencias/etapa-5/w3c-inicio.json), [projetos renderizados](evidencias/etapa-5/w3c-projetos.json) e [cadastro renderizado](evidencias/etapa-5/w3c-cadastro.json).
- Telas: [início](evidencias/etapa-5/rota-inicio.png), [projetos](evidencias/etapa-5/rota-projetos.png), [cadastro](evidencias/etapa-5/rota-cadastro.png), [oficina](evidencias/etapa-5/oficina-direta.png), [rota desconhecida](evidencias/etapa-5/rota-nao-encontrada.png) e [sem JavaScript](evidencias/etapa-5/sem-javascript.png).
- Componentes: [dropdown](evidencias/etapa-5/dropdown-desktop.png), [menu mobile](evidencias/etapa-5/menu-mobile-aberto.png), [modal](evidencias/etapa-5/modal-desktop.png), [texto a 200%](evidencias/etapa-5/modal-texto-200.png) e [limpeza após navegação mobile](evidencias/etapa-5/spa-mobile.png).

São 25 PNGs e oito relatórios JSON. Os nomes de algumas capturas mantêm a nomenclatura dos ensaios anteriores, mas nesta etapa foram capturados em `index.html` com o hash correspondente. Os relatórios e capturas das etapas anteriores não foram alterados.

As verificações se limitam ao Chrome e não constituem auditoria completa de acessibilidade, compatibilidade ou desempenho. A inspeção da árvore de acessibilidade não substitui um leitor de tela. Texto ampliado significa fonte raiz a 200%, não zoom completo. O W3C validou HTML, não o comportamento JavaScript ou o CSS. Framework, persistência, release e deploy permanecem fora desta etapa.

## Etapa 6 — templates

Verificação em 28/09/2026, Chrome 154, servidor Python local. 29 casos aprovados em [navegador.json](evidencias/etapa-6/navegador.json). Comparação com o DOM anterior confirmou textos, ordem, IDs e links; ensaios cobriram listas vazias, subconjuntos, repetição e conteúdo semelhante a HTML tratado literalmente. Foram conferidas 19 larguras entre 320 e 1920 px, três destinos de oficinas, ciclos entre views e o modal. Nenhuma exceção ou falha de recurso observada.

Inspeção visual: [375 px](evidencias/etapa-6/projetos-375.png), [768 px](evidencias/etapa-6/projetos-768.png) e [1440 px](evidencias/etapa-6/projetos-1440.png). W3C: [shell](evidencias/etapa-6/w3c-index.json) e [projetos renderizados](evidencias/etapa-6/w3c-projetos.json), ambos sem erros/avisos. Nenhuma falha funcional observada nesta etapa. Contraste e demais views não foram revalidados integralmente, pois não sofreram alterações visuais.

## Etapa 7 — validação personalizada

Em 28/09/2026, Chrome 154: 26 casos aprovados em [navegador.json](evidencias/etapa-7/navegador.json), incluindo cinco formatos inválidos e respectivas correções, campos vazios, espaços, limites, foco, manutenção dos valores, URL sem dados e documento sem recarga. Reset limpa estados; Escape preserva valores; formulários desmontados não respondem ao submit antigo. Erros sem transbordamento em quatro larguras.

Capturas: [desktop](evidencias/etapa-7/erros-desktop.png), [mobile](evidencias/etapa-7/erros-mobile.png) e [sucesso de validação](evidencias/etapa-7/validacao-sucesso.png). [W3C cadastro](evidencias/etapa-7/w3c-cadastro.json): sem erros/avisos.

A primeira execução do ensaio verificou o foco depois que `open` mudou, mas antes do evento `close` do diálogo. A inspeção posterior confirmou a restauração correta. O teste passou a aguardar também o foco do acionador; a rodada completa passou. Foi um ajuste de sincronização do ensaio, sem mudança na implementação do modal. Não foram realizados testes com leitor de tela nesta etapa.

## Etapa 8 — persistência local

Em 28/09/2026, Chrome 154: [35 casos aprovados](evidencias/etapa-8/navegador.json). Gravação, recuperação após recarga, acréscimo, retorno à view, exclusão confirmada/cancelada e preservação de outra chave foram exercitados no armazenamento real do perfil temporário. Sete conteúdos inválidos foram rejeitados sem sobrescrita. Falhas de quota, leitura, acesso à propriedade e exclusão foram simuladas substituindo temporariamente métodos/propriedade, depois restaurados. Formulário preservado nas falhas; nenhuma confirmação falsa de gravação.

Capturas: [recuperação](evidencias/etapa-8/registros-recuperados.png), [mobile](evidencias/etapa-8/registros-mobile.png), [estrutura inválida](evidencias/etapa-8/falha-estrutura.png) e [falha de gravação](evidencias/etapa-8/falha-gravacao.png). Quatro larguras sem transbordamento. [W3C cadastro](evidencias/etapa-8/w3c-cadastro.json): sem erros/avisos. Nenhuma exceção ou recurso obrigatório com falha na rodada concluída.

O ensaio inicial tentou executar JavaScript enquanto a confirmação nativa estava aberta, bloqueando a automação. O navegador temporário foi reiniciado e o teste passou a responder pelo comando de diálogo do CDP sem avaliar código dentro da página. A rodada completa passou; não houve alteração funcional para contornar o teste. A atualização entre abas foi verificada por evento simulado, sem ensaio de concorrência real entre dois processos. Dados fictícios do ensaio foram removidos ao final.

## Integração básica de framework

Vue 3.5.43: 37 verificações aprovadas no Chrome em 28/09/2026. Os casos de persistência foram repetidos após a troca de renderização, com montagem/desmontagem do componente e versão verificadas. Textos semelhantes a HTML continuaram literais; erros e exclusão mantiveram os resultados esperados. [Relatório](evidencias/framework/navegador.json), [W3C sem erros/avisos](evidencias/framework/w3c-cadastro.json) e [integridade da dependência](evidencias/framework/dependencia.json). As quatro capturas foram renovadas na pasta `framework`.

O teste da atualização por evento passou a aguardar a renderização reativa, que ocorre em microtarefa. Nenhuma falha funcional observada. Não houve adição de ferramenta de build; a distribuição local dispensa rede externa em execução.
