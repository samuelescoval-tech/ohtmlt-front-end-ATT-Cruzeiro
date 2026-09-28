# Revisão de acessibilidade

A aplicação usa idioma pt-BR, landmarks, hierarquia de títulos, labels, ajuda relacionada aos campos, estado `aria-invalid`, foco visível e regiões de estado. O link de pular conteúdo funciona sem alterar a rota. Menus expõem `aria-expanded`; destinos das oficinas e novas views recebem foco. O modal tem título, descrição, ciclo de Tab, Escape e devolução de foco.

Em 28/09/2026, Chrome 154: 28 verificações funcionais e seis verificações complementares passaram. Teclado real por CDP exercitou Tab, Enter, Espaço e Escape; a árvore de acessibilidade confirmou nome, descrição e estado dos cinco campos inválidos, sem mensagem de sucesso oculta na descrição. Texto a 200% por tamanho raiz foi conferido nas três views em 320, 768 e 1440 px, sem transbordamento horizontal. Em 320 px, títulos longos podem quebrar palavras e exigem rolagem vertical. A preferência por movimento reduzido desativa transições.

Axe-core 4.13.0, executado temporariamente no navegador, examinou início, projetos, cadastro, erros e modal em 375 e 1280 px. Foram usadas regras disponíveis de WCAG 2 A/AA, 2.1 A/AA, 2.2 AA e boas práticas. Não houve violações automáticas nesses dez cenários. A ferramenta não foi adicionada à aplicação. [Resultados completos](evidencias/etapa-9/axe.json).

Três tipos de resultado inconclusivo foram revisados: símbolos dos menus (caracteres não textuais), referência `aria-controls` ao diálogo fechado e contraste da descrição sobre o diálogo. O ID existe e aponta para `dialog`; a descrição cabe no diálogo; medição sRGB dos estilos computados confirmou contraste acima de 4,5:1 nos elementos questionados. Capturas do modal foram inspecionadas. [Medições e verificações](evidencias/etapa-9/revisao-inconclusivos.json).

Não foi necessário alterar componentes nesta rodada. Ela valida os cuidados implementados nas etapas anteriores, sem afirmar certificação ou conformidade integral. Não houve avaliação humana com leitor de tela, teste em todos os navegadores nem rubrica detalhada da instituição. Ampliação do texto raiz não equivale a todos os modos de zoom do navegador. A [documentação do axe-core](https://github.com/dequelabs/axe-core) explica o alcance limitado de verificações automáticas.

[Casos de teclado, foco e ampliação](evidencias/etapa-9/navegador.json) · [árvore dos campos](evidencias/etapa-9/arvore-campos.json) · [modal mobile](evidencias/etapa-9/modal-375.png) · [modal desktop](evidencias/etapa-9/modal-1280.png).
