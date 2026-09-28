# OHTMLT — Organização HTML para Todos

Projeto acadêmico de **Desenvolvimento Front-End**, da **Universidade Cruzeiro do Sul**. A OHTMLT é uma organização fictícia voltada à inclusão e ao aprendizado digital, com propostas para iniciantes e pessoas interessadas em compartilhar conhecimentos.

**Estado: em reconstrução — etapa de framework implementada.** A aplicação é uma SPA com três views: início, projetos e cadastro. A navegação interna atualiza o conteúdo sem recarregar o documento, preservando menus, cards, estados dos controles e modal de limpeza. Cards, menu de oficinas e destinos compartilham os dados de `js/data/projetos.js`; a construção dos componentes usa DOM e texto seguro. A validação apresenta mensagens específicas e bloqueia o envio sem recarregar a página. Demonstrações podem ser salvas, recuperadas e apagadas no navegador, com tratamento de falhas.

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

**Use somente dados fictícios.** “Salvar demonstração” valida os cinco campos e grava a lista local sem recarregar a página ou incluir os valores na URL. A confirmação só aparece após a gravação. Não há backend nem inscrições reais. O preenchimento permanece após salvar; cada novo envio válido acrescenta uma demonstração.

Ao sair de um campo, a validade é apresentada por texto e cor. Durante a correção, `input` revalida os campos já tratados. No envio, todos são verificados e o primeiro inválido recebe foco. Os valores são preservados. `aria-invalid` acompanha o resultado e `aria-describedby` relaciona a ajuda e o estado.

“Limpar campos” pede confirmação; cancelar ou usar Escape preserva o preenchimento. Confirmar remove valores e estados e anuncia a limpeza. Sair da view e voltar cria formulário vazio; selecionar a mesma rota mantém o preenchimento. Consulte [validação e eventos](docs/FORMULARIO.md).

## Armazenamento local

A chave `ohtmlt:cadastros:v1` contém um array JSON de objetos com `nome`, `cpf`, `email`, `telefone` e `cep`, todos textos. A leitura confere estrutura, campos esperados e limites de comprimento. Os registros aparecem novamente ao entrar no cadastro ou recarregar. Eles pertencem à origem (protocolo, domínio e porta) e ao perfil deste navegador; não há sincronização com contas ou outros dispositivos.

“Limpar campos” afeta apenas o formulário. “Apagar demonstrações salvas” pede confirmação e remove somente a chave da aplicação, mantendo outros dados do navegador e o formulário. JSON inválido, estrutura inesperada, bloqueio de acesso e falha de gravação apresentam mensagens; conteúdo defeituoso não é sobrescrito pelo envio. Consulte [contrato e limitações](docs/PERSISTENCIA.md).

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
│   ├── vendor/ (Vue e sua licença)
│   ├── data/projetos.js
│   ├── router.js
│   ├── views/
│   │   ├── inicio.js
│   │   ├── projetos.js
│   │   └── cadastro.js
│   └── modules/
│       ├── cadastros.js
│       ├── form.js
│       ├── validation.js
│       ├── storage.js
│       ├── templates.js
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
        ├── etapa-5/
        ├── etapa-6/
        ├── etapa-7/
        └── etapa-8/
```

A imagem SVG é local e foi criada para este projeto. As views usam marcação fixa em `<template>`, sem inserir valores digitados ou trechos de URL no HTML. O Vue 3.5.43 controla a lista de demonstrações. Sua distribuição de produção está incluída localmente, com licença MIT preservada; não há CDN em execução nem ferramenta de build. Nenhuma licença de distribuição foi definida.

## Design System e layout

[`css/base.css`](css/base.css) define 12 cores, cinco tamanhos tipográficos e oito passos de espaçamento. [`css/layout.css`](css/layout.css) mantém Grid de doze colunas e cinco breakpoints: 480, 768, 992, 1200 e 1440 px. Os projetos ocupam uma, duas ou três colunas, e o cadastro é limitado a 44 rem.

[`css/components.css`](css/components.css) reúne os componentes, com Flexbox, foco visível e feedback textual. Transições de 150 ms são removidas com preferência por movimento reduzido. Consulte o [Design System](docs/DESIGN-SYSTEM.md), o [layout](docs/LAYOUT.md) e as [regras de uso dos componentes](docs/COMPONENTES.md).

## Verificação

Em 28/09/2026, **187 casos foram aprovados no Chrome**, incluindo rotas, histórico, ausência de recarga nas trocas internas, foco, doze ciclos de montagem/desmontagem e regressões dos componentes. Foram verificadas 57 combinações de rota/largura, texto a 200% e 34 combinações de contraste.

O `index.html` e os documentos extraídos das três views renderizadas passaram no W3C Nu HTML Checker sem erros ou avisos. Os resultados incluem 25 capturas PNG e oito relatórios JSON. Consulte [os casos e limites](docs/TESTES.md) e a [evidência de navegação](docs/evidencias/etapa-5/rotas.json). As etapas anteriores foram preservadas.

Na etapa 6, 29 verificações adicionais passaram: preservação dos cards, texto seguro, renderização repetida, destinos, modal e 19 larguras. O shell e a view de projetos passaram novamente no W3C sem erros ou avisos. Consulte [templates](docs/TEMPLATES.md) e [resultados](docs/evidencias/etapa-6/navegador.json).

Na etapa 7, 26 verificações de formulário passaram no Chrome e o cadastro renderizado passou no W3C sem erros ou avisos. [Resultados](docs/evidencias/etapa-7/navegador.json).

Na etapa 8, 35 verificações passaram: persistência real no navegador, recuperação, exclusão restrita, texto seguro e falhas simuladas de quota/permissão. Cadastro no W3C sem erros ou avisos. [Resultados](docs/evidencias/etapa-8/navegador.json).

Após integrar o Vue, 37 verificações passaram, incluindo as regressões da persistência e a desmontagem do componente ao sair da tela. [Integração e dependência](docs/FRAMEWORK.md).

Esses resultados não equivalem a uma auditoria completa de acessibilidade ou compatibilidade entre navegadores.

## Versionamento e próximos passos

`main` contém a base documental e receberá versões aprovadas; `develop` integra as etapas; `feature/*` organiza mudanças verificadas em pull requests. Os commits são semânticos. Ainda não há release, tag de versão ou deploy.

A próxima etapa é a **revisão de acessibilidade**. A integração básica de framework, acessibilidade, otimização e publicação terão implementação simples; não há rubrica detalhada disponível para certificar exigências adicionais.
