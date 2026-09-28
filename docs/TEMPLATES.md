# Templates e dados

`js/data/projetos.js` contém as três propostas demonstrativas. Título, categoria, descrição, público, ação e identificador ficam em uma única lista; `main.js` gera o submenu e `router.js` deriva os destinos válidos dessa lista.

`js/modules/templates.js` cria cards com `createElement` e `textContent`. Textos variáveis nunca são interpretados como HTML. A imagem local e o destino de cadastro são fixos. Os identificadores são dados internos, não entradas de usuários. `forEach` preenche um `DocumentFragment` e `replaceChildren` substitui a renderização anterior, inclusive quando a lista está vazia. Não há listeners por card: os links usam o roteador existente.

`js/views/projetos.js` mantém apenas a introdução fixa em `<template>` e chama o renderizador. Início e cadastro continuam com marcação fixa. Foram preservados conteúdo, classes, imagens, IDs e destinos da versão anterior.

Validação: 29 verificações no Chrome, incluindo ordem, subconjunto, lista vazia, repetição, strings com HTML, quatro ciclos de navegação e 19 larguras de 320 a 1920 px. Três capturas mostram uma, duas e três colunas. Shell e projetos renderizados: W3C sem erros nem avisos. [Evidências](evidencias/etapa-6/navegador.json).
