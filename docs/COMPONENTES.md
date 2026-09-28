# Componentes visuais da OHTMLT

A etapa 4 acrescenta navegação expansível, mídia e badges nos cards, estados dos controles e confirmação de limpeza do formulário. A ordem dos estilos é `base.css`, `layout.css` e `components.css`. Os módulos JavaScript são carregados por `js/main.js`, via HTTP local, sem dependências externas.

## Navegação e condições de abertura

A navegação é uma lista de links de páginas, sem o papel ARIA `menu`. O link “Projetos” continua abrindo a página; o botão “Oficinas” controla três links para as seções existentes. A página atual usa `aria-current="page"`.

| Elemento | Regra real |
| --- | --- |
| `.menu-toggle` | Botão hambúrguer abaixo de 768 px, com `aria-controls="menu-principal"`. Começa fechado; clique, Enter e Espaço alternam a lista. |
| `#menu-principal.nav-list` | Coluna no mobile; linha com quebra a partir de 768 px. O módulo controla `hidden`; links ocultos não entram na ordem de Tab. |
| `.submenu-toggle` | Controle “Oficinas”, ligado a `#submenu-oficinas` por `aria-controls`. Clique, Enter e Espaço alternam o submenu. |
| `.submenu` | Fechado após a inicialização. No mobile, ocupa espaço no fluxo. Em desktop, fica posicionado abaixo do grupo “Projetos / Oficinas”, com largura de até 18 rem e limite de 80 vw. |
| `[data-menu-ativo]` | Marca a navegação inicializada. O posicionamento absoluto do dropdown depende dessa marca para preservar os links no fluxo quando JavaScript não executa. |
| `[hidden]` | `display: none !important` impede que as regras Flexbox voltem a mostrar um elemento oculto. |

`navigation.js` altera `hidden` e `aria-expanded` na mesma operação. `:hover` e `:focus-within` destacam o controle do submenu; eles não abrem a lista separadamente. Isso evita um submenu visível com `aria-expanded="false"` e permite fechar por Escape mesmo com o ponteiro sobre o grupo.

Escape fecha primeiro o submenu e devolve o foco a “Oficinas”. Um segundo Escape no mobile fecha a navegação e devolve o foco a “Menu”. Clique externo ou saída do foco também fecham as listas; ao seguir um link, o fechamento acompanha a navegação. O tratamento de `focusout` consulta `event.relatedTarget`, que identifica o destino do foco.

Ao cruzar 768 px, o submenu fecha e o estado mobile é reiniciado. Se o elemento focado vai ficar oculto, o foco passa para um controle visível: o hambúrguer ao reduzir ou o primeiro link ao ampliar. Não há altura fixa nos menus.

Sem JavaScript, a lista principal e os links das oficinas ficam visíveis; os controles de expansão ficam ocultos. O conteúdo e a navegação entre documentos permanecem utilizáveis.

## Cards, mídia e badges

Cada proposta usa `article.projeto.col-4` com imagem, badge, título `h3`, descrição, público e link de participação. A distribuição de uma, duas ou três colunas permanece no Grid. O interior do card usa Flexbox em coluna, intervalo de 1 rem e `margin-block-start: auto` no link para alinhar as ações de uma mesma linha.

`.projeto__imagem` ocupa a largura do card, mantém proporção 16:9 e usa `object-fit: contain`. As três propostas reutilizam a ilustração local de colaboração digital. Nos cards ela é decorativa (`alt=""`), pois não acrescenta informação aos textos; na apresentação continua com alternativa descritiva. Largura e altura intrínsecas são declaradas e o carregamento dos cards é adiado com `loading="lazy"`.

Os badges `.selo` classificam o conteúdo como “Iniciação digital”, “Criação de páginas” ou “Colaboração”. Eles têm texto branco sobre verde, não são controles e não indicam inscrições abertas. O aviso geral de propostas demonstrativas foi preservado.

## Estados dos controles

| Estado | Aplicação e significado |
| --- | --- |
| Padrão | `.botao` identifica a ação principal; `.botao--secundario` identifica ações de apoio. Campos têm borda cinza e fundo branco. |
| Hover | A ação principal escurece; a secundária fica verde com texto branco; campos recebem borda azul. |
| Foco | `:focus-visible` mantém contorno azul de 3 px, com afastamento de 4 px; no cabeçalho o contorno é amarelo. |
| Ativo | Botões pressionados recebem contorno interno, além da cor de interação. A borda de um campo pressionado fica azul quando não há indicação de validade; erro e sucesso mantêm prioridade. |
| Desabilitado | `:disabled` usa fundo claro, texto suave e cursor de indisponibilidade. “Limpar campos” começa desabilitado e só habilita quando algum campo contém um valor. |
| Sucesso de formato | `input:user-valid` usa borda verde e mostra “Formato aceito pelo navegador.” após interação. Não comprova existência dos dados nem inscrição. |
| Erro de formato | `input:user-invalid` usa borda vermelha e mostra “Preencha este campo conforme a instrução acima.” O navegador também apresenta sua mensagem nativa específica. |

A ajuda de cada campo permanece visível. O atributo `aria-describedby` referencia essa ajuda e o contêiner `.campo-status`; dentro dele, somente a mensagem do estado atual fica visível. A descrição inicial, a válida e a inválida foram inspecionadas pela árvore de acessibilidade do Chrome. Não se referencia diretamente uma mensagem oculta, evitando anúncios contraditórios.

Os estados de formato usam as restrições HTML já existentes; não há rotina própria de validação ou de envio nesta etapa. O envio válido continua sendo `GET` para a própria página. As mensagens específicas de validação em JavaScript pertencem à etapa 7.

O estado de campo desabilitado existe no CSS, mas nenhum campo é desabilitado pela lógica da aplicação. A captura correspondente aplica temporariamente o atributo ao campo Nome durante o teste. Já o botão de limpeza desabilitado é um estado real da interface.

## Modal e mensagem de conclusão

“Limpar campos” abre `dialog#modal-limpeza` por `showModal()`. O título e a descrição estão ligados por `aria-labelledby` e `aria-describedby`. O foco inicial vai para “Cancelar e voltar”, que também funciona como botão de fechar.

- **Cancelar ou Escape:** fecha o diálogo, preserva os valores e devolve o foco a “Limpar campos”.
- **Confirmar limpeza:** executa `form.reset()`, fecha o diálogo e anuncia “Campos limpos. Você pode iniciar outra demonstração.”
- **Após confirmar:** o acionador fica desabilitado porque não há valores; o foco segue para Nome, onde a pessoa pode retomar o preenchimento. Esse é o destino alternativo quando não se pode voltar ao acionador desabilitado.

Tab e Shift+Tab circulam entre os dois botões do modal. O diálogo nativo impede interação com o conteúdo de fundo. O backdrop escurece a página; clicar nele não confirma nem cancela. O modal tem limites de largura e altura relativos à janela e rolagem interna para telas baixas ou texto ampliado. Usa preenchimento de 0,75 rem, título de 1,25 rem e preenchimento lateral de 0,5 rem nos botões para preservar palavras legíveis em 320 px com texto a 200%.

A confirmação usa `#status-cadastro[role="status"][aria-atomic="true"]`, que existe vazio desde o carregamento. `feedback.js` insere um parágrafo `.alerta.alerta--sucesso` com `textContent`. A mensagem descreve apenas a limpeza realizada; ela não declara que um cadastro foi salvo. Ao editar novamente um campo, a mensagem anterior é removida.

O aviso amarelo `.aviso` continua estático, com a instrução para usar dados fictícios; não recebe `role="alert"`. Erros de formato têm mensagem junto ao campo e indicação nativa, sem anúncios interruptivos desnecessários.

## Transições e limites

Botões, links de navegação e campos usam transições de cor, fundo e borda de 150 ms. A seta de “Oficinas” gira em 150 ms conforme `aria-expanded`. A consulta `prefers-reduced-motion: reduce` remove essas transições. A abertura e a ocultação em si são imediatas, mantendo foco e estado anunciado sincronizados.

A implementação usa módulos ES, `<dialog>`, `:user-valid` e `:user-invalid`. As verificações foram feitas no Chrome; não demonstram cobertura de todos os navegadores ou leitores de tela. Sem suporte ao diálogo, a ação de limpeza não é exibida. Sem suporte aos pseudoestados, a validação nativa continua disponível, mas a indicação adicional de formato pode não aparecer.

Resultados, correções e capturas estão em [TESTES.md](TESTES.md). Cores e regras gerais estão no [Design System](DESIGN-SYSTEM.md).
