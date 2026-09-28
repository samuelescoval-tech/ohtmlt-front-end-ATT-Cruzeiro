# OHTMLT — Organização HTML para Todos

Projeto acadêmico de **Desenvolvimento Front-End da Universidade Cruzeiro do Sul**, desenvolvido por Samuel Escoval. A OHTMLT é uma organização fictícia de inclusão e aprendizado digital, com propostas para iniciantes e pessoas interessadas em compartilhar conhecimentos.

**Estado: candidata à versão 1.0.0, com funcionalidades implementadas e publicação em preparação.**

[Repositório](https://github.com/samuelescoval-tech/ohtmlt-front-end-ATT-Cruzeiro) · [Testes e evidências](docs/TESTES.md) · [Entrega e versionamento](docs/ENTREGA.md)

## Executar localmente

Requisitos: Python 3 e navegador moderno com módulos JavaScript, `<dialog>` e `localStorage`. Na pasta do projeto:

```bash
python3 -m http.server 5500 --bind 127.0.0.1
```

Abra **http://127.0.0.1:5500/**. Encerre com `Ctrl+C` no terminal do servidor. Se a porta estiver ocupada, use `5501` no comando e na URL; os registros salvos pertencem à origem e não serão compartilhados entre portas. Use HTTP, em vez de abrir por `file://`. Não é necessário instalar pacotes ou executar build.

Para obter a versão em desenvolvimento:

```bash
git clone --branch develop https://github.com/samuelescoval-tech/ohtmlt-front-end-ATT-Cruzeiro.git
cd ohtmlt-front-end-ATT-Cruzeiro
```

Sem JavaScript, o documento apresenta o projeto e orienta a ativação. As views, os menus e o cadastro dependem de JavaScript.

## Funcionalidades e rotas

| Rota | Conteúdo e comportamento |
| --- | --- |
| `#inicio` | Apresentação, imagem com alternativa textual, “Quem somos” e participação. |
| `#projetos` | Três propostas demonstrativas em cards gerados por dados. |
| `#projetos/<id>` | Destino direto de uma oficina, com foco no seu título. |
| `#cadastro` | Validação de cinco campos, gravação local, lista recuperada e ações de limpeza. |

O endereço sem hash abre o início. A navegação mantém o documento, suporta voltar/avançar, links diretos e recarga; atualiza título, descrição e `aria-current`. Rotas desconhecidas oferecem retorno ao início. O cadastro carrega seus módulos sob demanda, com indicação de espera e recuperação em caso de falha.

No celular, “Menu” abre a navegação. “Oficinas” expande os três destinos, derivados da mesma lista dos cards. Enter, Espaço, Tab e Escape permitem operar os componentes. O link de pular conteúdo preserva a rota. As antigas páginas `projetos.html` e `cadastro.html` foram substituídas pelas views: use os hashes para novos favoritos.

## Formulário: regras e limites

**Use somente dados fictícios. Não há inscrição real, backend ou consulta de dados pessoais.**

| Campo | Regra |
| --- | --- |
| Nome | Obrigatório, até 100 caracteres; não aceita somente espaços. |
| E-mail | Obrigatório, formato nativo `type="email"`, até 254 caracteres. |
| Celular | Obrigatório, `(11)99999-9999`, sem espaços. |
| CPF | Obrigatório, `000.000.000-00`. |
| CEP | Obrigatório, `00000-000`. |

A pontuação é digitada manualmente; não há máscara automática. CPF confere apenas formato, sem algoritmo de dígitos verificadores. E-mail, telefone e endereço não têm existência confirmada. Os campos com pontuação usam teclado de texto; e-mail usa `inputmode="email"`.

Ao sair de um campo, a aplicação mostra seu estado. Durante a correção, reavalia os campos já tratados. “Salvar demonstração” impede a submissão padrão, verifica todos, foca o primeiro erro e preserva os valores. Não recarrega a página nem acrescenta dados à URL. Só anuncia salvamento após a gravação efetiva. Cada novo envio válido acrescenta uma demonstração; o formulário permanece preenchido.

“Limpar campos” abre um modal. Cancelar ou Escape preserva o preenchimento; confirmar reinicia os campos e estados. Sair da view descarta valores não salvos; escolher a rota atual preserva o formulário. [Validação e eventos](docs/FORMULARIO.md).

## Armazenamento local

A chave `ohtmlt:cadastros:v1` guarda um array JSON de objetos com `nome`, `cpf`, `email`, `telefone` e `cep`, todos strings. Leitura e escrita usam `try/catch`; a recuperação confere campos esperados, tipos e comprimentos. A lista reaparece ao entrar no cadastro ou recarregar.

“Apagar demonstrações salvas” pede confirmação nativa e remove somente essa chave, preservando os outros dados do navegador e os campos atuais. Falhas de acesso, JSON inválido, estrutura inesperada e quota apresentam mensagens. Conteúdo defeituoso não é sobrescrito por um novo envio; pode ser apagado explicitamente pelo botão.

Os registros pertencem à origem e ao perfil do navegador, sem sincronização com contas ou dispositivos. Podem ser removidos pelas configurações do navegador. Outras abas atualizam a lista pelo evento `storage`, mas escritas simultâneas não têm garantia de transação. [Contrato e tratamento de falhas](docs/PERSISTENCIA.md).

## Tecnologias e organização

HTML semântico, CSS com propriedades customizadas, Grid/Flexbox e módulos JavaScript nativos. Vue **3.5.43**, em distribuição local de produção, controla somente a lista reativa de demonstrações; não há CDN em execução nem compilador de templates. [Propósito, versão, integridade e configuração](docs/FRAMEWORK.md).

| Caminho | Responsabilidade |
| --- | --- |
| `index.html` | Documento único, navegação, conteúdo principal e rodapé. |
| `css/base.css` | Cores, fontes, espaçamento e estilos globais. |
| `css/layout.css` | Grid de doze colunas e cinco breakpoints. |
| `css/components.css` | Menus, cards, formulário, alertas, modal e lista. |
| `js/main.js`, `js/router.js` | Inicialização, rotas, foco, importação sob demanda e desmontagem. |
| `js/data/projetos.js` | As três propostas demonstrativas. |
| `js/views/` | Construção das telas de início, projetos e cadastro. |
| `js/modules/templates.js` | Cards e submenu com DOM, texto seguro e substituição de conteúdo. |
| `js/modules/navigation.js`, `modal.js` | Menus, confirmação e gerenciamento de foco. |
| `js/modules/form.js`, `validation.js` | Eventos, regras e coordenação do cadastro. |
| `js/modules/storage.js`, `feedback.js` | Persistência e mensagens de resultado. |
| `js/modules/cadastros.js` | Componente Vue da lista e seu ciclo de vida. |
| `js/vendor/` | Runtime Vue fixado e sua licença. |
| `assets/imagens/` | SVG local usado na aplicação. |
| `docs/` | Documentação técnica e evidências por etapa. |
| `.nojekyll` | Publicação estática sem processamento Jekyll. |

As views usam marcação fixa em `<template>`. Dados variáveis dos cards usam `textContent`; valores da lista Vue são filhos textuais de `h`. Entradas de usuário não são interpretadas como HTML. [Templates](docs/TEMPLATES.md) e [arquitetura SPA](docs/SPA.md).

## Design, acessibilidade e recursos

O Design System define 12 cores, cinco tamanhos tipográficos e oito passos de espaçamento. O layout mantém doze colunas e breakpoints em 480, 768, 992, 1200 e 1440 px. Os projetos ocupam uma, duas ou três colunas; o cadastro tem largura limitada. [Design System](docs/DESIGN-SYSTEM.md), [layout](docs/LAYOUT.md) e [componentes](docs/COMPONENTES.md).

Há foco visível, labels, ajuda e erros relacionados por `aria-describedby`, estado `aria-invalid`, anúncios de resultado e redução de movimento. A revisão reuniu 34 verificações e dez cenários do axe-core sem violações automáticas; itens inconclusivos foram conferidos separadamente. Isso não certifica conformidade integral. [Método e limites](docs/ACESSIBILIDADE.md).

O cadastro e o Vue só são carregados quando necessários. No ensaio local com cache desabilitado, os recursos de início/projetos passaram de 156.145 para 28.913 bytes, cerca de 81,5% de redução. Não se trata de nota de desempenho ou ganho de tempo medido em conexão real. [Otimização e medições](docs/OTIMIZACAO.md).

## Verificação

As etapas foram testadas em Chrome 154 por HTTP local, com eventos de teclado, inspeção do DOM/árvore acessível, capturas, Resource Timing e W3C Nu HTML Checker. [TESTES.md](docs/TESTES.md) registra cenários, resultados, problemas e limites. Os relatórios e PNGs estão em `docs/evidencias/`.

| Etapa | Verificação registrada |
| --- | --- |
| SPA | 187 casos, 57 pares de rota/largura, 34 combinações de contraste e W3C das três views. |
| Templates | 29 casos, 19 larguras, texto seguro, repetição e W3C. |
| Validação | 26 casos, quatro larguras, foco, mensagens, reset e W3C. |
| Persistência | 35 casos, recuperação real e falhas simuladas de quota/permissão. |
| Vue | 37 verificações após a integração, incluindo desmontagem. |
| Acessibilidade | 28 casos funcionais, seis complementares e dez varreduras automáticas. |
| Otimização | 11 casos, recursos antes/depois, resposta atrasada e falha de carregamento. |

Os números são de rodadas por etapa; não representam uma suíte única cumulativa. Quota/permissões e evento entre abas foram simulados; não houve ensaio humano com leitor de tela ou certificação entre navegadores. As versões e mudanças posteriores devem ser verificadas novamente nos fluxos afetados.

## Entrega, créditos e limitações

GitFlow: `feature/*` recebe cada mudança, PRs integram em `develop`, `release/1.0.0` prepara a versão para `main`, tag e release semântica. `hotfix/*` fica reservado para problemas reais após publicação. Commits usam tipos como `feat`, `perf`, `fix` e `docs`; os merges preservam o histórico. [Procedimento de publicação](docs/ENTREGA.md).

A publicação no GitHub Pages está em preparação. Seu endereço será registrado após verificação. A aplicação é uma demonstração acadêmica; a implementação simples cobre os requisitos disponíveis, sem atestar itens de uma rubrica detalhada não fornecida. Não há autenticação, envio a servidor, validação de documentos reais ou garantia transacional entre abas.

O SVG foi criado para o projeto. Vue mantém sua [licença MIT](js/vendor/vue-LICENSE.txt). Não foi definida licença de distribuição para o código autoral da atividade.
