# Layout responsivo da OHTMLT

A etapa 3 organiza as três páginas por uma abordagem mobile first. Na etapa 4, [`css/base.css`](../css/base.css) mantém variáveis e estilos globais; [`css/layout.css`](../css/layout.css) define containers, Grid, Flexbox, larguras e breakpoints; [`css/components.css`](../css/components.css) reúne a aparência e a distribuição interna dos componentes. A visibilidade dos menus passa a ser controlada por JavaScript, conforme [COMPONENTES.md](COMPONENTES.md).

## Grid de doze colunas

`.grade` usa `display: grid`, `grid-template-columns: repeat(12, minmax(0, 1fr))` e intervalos da escala de espaçamento. O Grid mantém doze trilhas em todas as larguras; a quantidade de trilhas ocupada por cada item é que muda.

| Classe do item | Abaixo de 768 px | De 768 até 991 px | A partir de 992 px | Uso real |
| --- | --- | --- | --- | --- |
| `.col-12` | 12 colunas | 12 colunas | 12 colunas | Título das oficinas e campo de e-mail. |
| `.col-6` | 12 colunas | 6 colunas | 6 colunas | Apresentação, imagem, seções de início e campos do formulário. |
| `.col-4` | 12 colunas | 6 colunas | 4 colunas | Os três artigos de projetos. |

O contêiner `.apresentacao` aproxima texto e imagem e usa `align-items: center` no Grid. `.secoes-inicio` organiza “Quem somos” e “Como participar”. A seção `.projetos-grade` contém o título de largura inteira e os três projetos. Dentro dos `fieldset`, `.campos` organiza os campos sem mudar sua ordem no HTML.

Os filhos da grade recebem `min-inline-size: 0`; as trilhas usam `minmax(0, 1fr)` para permitir redução de largura. Até 767 px, todos os itens ocupam a linha inteira, por isso o intervalo entre colunas é zero e o intervalo entre linhas continua ativo. Isso também evita que onze intervalos internos consumam a largura de uma tela pequena quando o texto é ampliado. A partir de 768 px, os intervalos entre linhas e colunas usam o mesmo valor da escala.

## Cinco breakpoints explícitos

Os valores em pixels abaixo consideram fonte raiz de 16 px. Margens, intervalos e limites são expressos em rem por meio de variáveis; as media queries usam os limites explícitos em px.

| Condição | Mudança aplicada |
| --- | --- |
| Base, abaixo de 480 px | Preenchimento lateral de 16 px; intervalo vertical da grade de 16 px; itens em largura inteira. |
| `min-width: 480px` | Preenchimento lateral e intervalo vertical passam a 24 px. |
| `min-width: 768px` | `.col-6` e `.col-4` passam a ocupar seis colunas; dois projetos por linha. Cabeçalho e rodapé usam Flexbox em linha com quebra. O intervalo horizontal da grade passa a 24 px. |
| `min-width: 992px` | `.col-4` passa a ocupar quatro colunas, com três projetos por linha. |
| `min-width: 1200px` | Limite do container passa de 64 para 76 rem; preenchimento lateral e intervalos passam a 32 px. |
| `min-width: 1440px` | Limite do container passa a 80 rem; preenchimento lateral e intervalos passam a 48 px; respiro vertical do conteúdo principal passa de 48 para 64 px. |

Há três projetos na aplicação. Eles permanecem distribuídos em três colunas nas telas largas; nenhum quarto projeto foi acrescentado para preencher a grade. A classe `.col-3` não é necessária neste conjunto de conteúdo.

## Containers e largura de leitura

`.container` centraliza e limita a largura do conteúdo, com `inline-size: 100%`, `max-inline-size`, `margin-inline: auto` e preenchimento lateral compartilhado. A mesma classe é usada no cabeçalho, no `main` e no rodapé, alinhando suas bordas.

O limite do container é de 64 rem na base, 76 rem a partir de 1200 px e 80 rem a partir de 1440 px. Em uma janela de 1920 px, o limite continua sendo 1280 px com raiz de 16 px. O espaço restante fica nas margens externas.

`.cadastro-conteudo` limita a área do cadastro a 44 rem e a centraliza. O e-mail ocupa doze colunas; os pares nome/CPF e telefone/CEP ficam lado a lado a partir de 768 px. Abaixo disso, os cinco campos ficam empilhados. Os títulos dos grupos continuam com quebra de palavras e limite de largura para aceitar ampliação do texto.

A imagem da apresentação mantém seu tamanho máximo de 32 rem, a proporção original e `max-inline-size: 100%`. O conteúdo não é escondido para evitar rolagem horizontal.

## Flexbox nos componentes internos

| Seletor | Direção e quebra | Alinhamento e distribuição | Intervalo |
| --- | --- | --- | --- |
| `.cabecalho-conteudo` | `column` na base; `row` e `wrap` a partir de 768 px. | `align-items: flex-start` na base; `center` e `justify-content: space-between` em telas maiores. A marca usa `flex: 1 1 20rem` a partir de 768 px. | 24 px. |
| `.rodape-conteudo` | `column` na base; `row` e `wrap` a partir de 768 px. | Mesmas regras de alinhamento do cabeçalho. Os parágrafos recebem bases flexíveis de 20 e 26 rem em telas maiores. | 24 px. |
| `.nav-list` | Coluna na base; linha a partir de 768 px, com `flex-wrap: wrap`. | `align-items: flex-start` na base e `center` no desktop; links na ordem do HTML. | 8 px. |
| `.acoes` | Linha, direção padrão, com `flex-wrap: wrap`. | `align-items: center`; ações quebram de linha quando não cabem. | 16 px. |
| `.projeto` | `flex-direction: column`. | `align-items: flex-start`; o link usa `margin-block-start: auto` para chegar ao fim do card. | 16 px. |

Os intervalos referem-se à raiz padrão de 16 px e acompanham as variáveis em rem. Os itens flexíveis usam largura mínima zero quando necessário, permitindo quebra do conteúdo. O Grid iguala a altura dos projetos da mesma linha; a margem automática do link alinha as ações inferiores sem fixar a altura dos textos.

Desde a etapa 4, a lista mobile depende do botão hambúrguer; o submenu usa um controle próprio. As regras internas dos cards foram movidas para `components.css`, preservando as colunas do Grid. Consulte [as condições de abertura e foco](COMPONENTES.md).

## Medidas registradas na etapa 3

A matriz completa cobre as três páginas em 19 larguras: 320, 375, 479, 480, 481, 767, 768, 769, 991, 992, 993, 1199, 1200, 1201, 1280, 1439, 1440, 1441 e 1920 px. Foram medidos os doze tracks, a ocupação dos itens, os intervalos, os limites de leitura, os alinhamentos e a ausência de corte horizontal.

Recorte dos resultados da página de projetos:

| Viewport | Container observado | Projetos na primeira linha | Preenchimento lateral | Intervalo linha / coluna |
| --- | --- | --- | --- | --- |
| 320 px | 305 px | 1 | 16 px | 16 / 0 px |
| 479 px | 464 px | 1 | 16 px | 16 / 0 px |
| 480 px | 465 px | 1 | 24 px | 24 / 0 px |
| 767 px | 752 px | 1 | 24 px | 24 / 0 px |
| 768 px | 753 px | 2 | 24 px | 24 / 24 px |
| 991 px | 976 px | 2 | 24 px | 24 / 24 px |
| 992 px | 977 px | 3 | 24 px | 24 / 24 px |
| 1199 px | 1024 px | 3 | 24 px | 24 / 24 px |
| 1200 px | 1185 px | 3 | 32 px | 32 / 32 px |
| 1439 px | 1216 px | 3 | 32 px | 32 / 32 px |
| 1440 px | 1280 px | 3 | 48 px | 48 / 48 px |
| 1920 px | 1280 px | 3 | 48 px | 48 / 48 px |

A barra de rolagem vertical ocupou 15 px nas medições. Por isso, um viewport de 768 px apresentou área útil de 753 px. As media queries responderam à largura do viewport; a checagem de corte comparou `scrollWidth` com `clientWidth`.

Os 57 pares de página e largura passaram. O texto a 200% foi verificado em 320, 768, 992 e 1440 px nas três páginas. A ordem de Tab foi confirmada em 320 e 1440 px. O relatório [layout.json](evidencias/etapa-3/layout.json) contém as medidas; [TESTES.md](TESTES.md) reúne resultados e capturas.

Os ensaios foram realizados no Chrome em modo headless. A ampliação alterou a fonte raiz e não substitui uma verificação completa de zoom do navegador, dispositivos físicos ou outros navegadores.

Na etapa 4, a mesma matriz de 57 pares foi repetida com os menus abertos e a mídia dos cards. As medidas estão em [etapa-4/layout.json](evidencias/etapa-4/layout.json).
