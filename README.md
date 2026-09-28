# OHTMLT — Organização HTML para Todos

Projeto acadêmico de **Desenvolvimento Front-End**, da **Universidade Cruzeiro do Sul**. A OHTMLT é uma organização fictícia voltada à inclusão e ao aprendizado digital, com propostas para iniciantes e pessoas interessadas em compartilhar conhecimentos.

**Estado: em reconstrução — etapa 5 implementada.** A aplicação é uma SPA com três views: início, projetos e cadastro. A navegação interna atualiza o conteúdo sem recarregar o documento, preservando menus, cards, estados dos controles e modal de limpeza. Templates alimentados por dados, validação personalizada e persistência serão desenvolvidos nas próximas etapas.

[Repositório no GitHub](https://github.com/samuelescoval-tech/ohtmlt-front-end-ATT-Cruzeiro)

## Executar localmente

Requisito: Python 3 e um navegador com suporte a módulos JavaScript. Na raiz do projeto:

```bash
python3 -m http.server 5500 --bind 127.0.0.1
```

Abra **http://127.0.0.1:5500/**. Para encerrar, use `Ctrl+C` no terminal do servidor. Se a porta estiver ocupada, use `5501` no comando e na URL. Não há instalação de dependências nem etapa de build. Use HTTP em vez de abrir por `file://`.

Para obter a versão em desenvolvimento a partir do GitHub:

```bash
git clone --branch develop https://github.com/samuelescoval-tech/ohtmlt-front-end-ATT-Cruzeiro.git
cd ohtmlt-front-end-ATT-Cruzeiro
```

Sem JavaScript, o documento apresenta o projeto e informa a necessidade de ativá-lo. A navegação, os projetos e o formulário da SPA dependem dos módulos.

## Rotas e funcionalidades

| Rota | Conteúdo |
| --- | --- |
| `#inicio` | Apresentação, imagem com texto alternativo, seção “Quem somos” e participação. |
| `#projetos` | Três propostas em cards com imagem, categoria, descrição e link para o cadastro. |
| `#cadastro` | Cinco campos obrigatórios, ajuda, estados de formato e limpeza com confirmação em modal. |

O endereço sem hash abre `#inicio`. Links diretos, recarga e voltar/avançar são suportados. Rotas desconhecidas mostram uma mensagem e um link de retorno. O título do documento e `aria-current="page"` acompanham a tela atual.

O menu mobile abre por “Menu”; “Oficinas” expande links para destinos como `#projetos/html-para-todos`. Enter, Espaço, Tab e Escape permitem operar os componentes. O link de pular conteúdo preserva a rota. Após navegar, o foco vai ao conteúdo ou à oficina escolhida.

As antigas páginas `projetos.html` e `cadastro.html` foram substituídas pelas views. Atualize favoritos antigos para os hashes; a versão anterior permanece no histórico Git. Consulte [a arquitetura, o histórico e o ciclo de eventos](docs/SPA.md).

## Formulário: regras e limites

| Campo | Regra nativa |
| --- | --- |
| Nome | Obrigatório, até 100 caracteres; somente espaços são rejeitados. |
| E-mail | Obrigatório, `type="email"`, até 254 caracteres. |
| Telefone celular | Obrigatório, formato `(11)99999-9999`, sem espaços. |
| CPF | Obrigatório, formato `000.000.000-00`. |
| CEP | Obrigatório, formato `00000-000`. |

Digite a pontuação indicada: `pattern` verifica o formato e não aplica máscaras. O e-mail usa `inputmode="email"`; campos com pontuação manual usam `inputmode="text"` para permitir os separadores. Não há consulta de endereço, confirmação de existência dos dados ou algoritmo de dígitos verificadores do CPF.

**Use somente dados fictícios.** O botão aciona a validação do navegador. Quando os dados são válidos, o formulário ainda usa `GET` para `index.html#cadastro`, recarregando o documento e incluindo os valores na URL. Eles podem aparecer no histórico e no log do servidor local. Essa submissão demonstrativa não realiza inscrição nem cria lista de cadastros; não há backend ou uso de `localStorage`.

Após interação, os campos mostram erro ou formato aceito, conforme a validade nativa. “Limpar campos” pede confirmação; cancelar ou usar Escape preserva os valores. Confirmar reinicia os campos e anuncia a limpeza. Sair da view de cadastro e voltar descarta o preenchimento; selecionar a mesma rota preserva os campos atuais.

O tratamento do envio sem recarga e as mensagens específicas de validação em JavaScript pertencem à etapa 7. A persistência será implementada na etapa 8.

## Estrutura versionada

```text
ohtmlt-front-end-ATT-Cruzeiro/
├── .gitignore
├── README.md
├── index.html
├── css/
│   ├── base.css
│   ├── layout.css
│   └── components.css
├── js/
│   ├── main.js
│   ├── router.js
│   ├── views/
│   │   ├── inicio.js
│   │   ├── projetos.js
│   │   └── cadastro.js
│   └── modules/
│       ├── navigation.js
│       ├── modal.js
│       └── feedback.js
├── assets/
│   └── imagens/
│       └── inclusao-digital.svg
└── docs/
    ├── COMPONENTES.md
    ├── DESIGN-SYSTEM.md
    ├── LAYOUT.md
    ├── SPA.md
    ├── TESTES.md
    └── evidencias/
        ├── etapa-1/
        ├── etapa-2/
        ├── etapa-3/
        ├── etapa-4/
        └── etapa-5/
```

A imagem SVG é local e foi criada para este projeto. As views usam marcação fixa em `<template>`, sem inserir valores digitados ou trechos de URL no HTML. Nenhuma biblioteca, framework ou fonte externa foi instalada. Nenhuma licença de distribuição foi definida.

## Design System e layout

[`css/base.css`](css/base.css) define 12 cores, cinco tamanhos tipográficos e oito passos de espaçamento. [`css/layout.css`](css/layout.css) mantém Grid de doze colunas e cinco breakpoints: 480, 768, 992, 1200 e 1440 px. Os projetos ocupam uma, duas ou três colunas, e o cadastro é limitado a 44 rem.

[`css/components.css`](css/components.css) reúne os componentes, com Flexbox, foco visível e feedback textual. Transições de 150 ms são removidas com preferência por movimento reduzido. Consulte o [Design System](docs/DESIGN-SYSTEM.md), o [layout](docs/LAYOUT.md) e as [regras de uso dos componentes](docs/COMPONENTES.md).

## Verificação

Em 28/09/2026, **187 casos foram aprovados no Chrome**, incluindo rotas, histórico, ausência de recarga nas trocas internas, foco, doze ciclos de montagem/desmontagem e regressões dos componentes. Foram verificadas 57 combinações de rota/largura, texto a 200% e 34 combinações de contraste.

O `index.html` e os documentos extraídos das três views renderizadas passaram no W3C Nu HTML Checker sem erros ou avisos. Os resultados incluem 25 capturas PNG e oito relatórios JSON. Consulte [os casos e limites](docs/TESTES.md) e a [evidência de navegação](docs/evidencias/etapa-5/rotas.json). As etapas anteriores foram preservadas.

Esses resultados não equivalem a uma auditoria completa de acessibilidade ou compatibilidade entre navegadores.

## Versionamento e próximos passos

`main` contém a base documental e receberá versões aprovadas; `develop` integra as etapas; `feature/*` organiza mudanças verificadas em pull requests. Os commits são semânticos. Ainda não há release, tag de versão ou deploy.

A próxima etapa é a de **templates e componentes alimentados por dados**. A exigência de framework na terceira experiência e os enunciados detalhados de acessibilidade, otimização e deploy na quarta experiência ainda precisam ser confirmados antes das entregas correspondentes.
