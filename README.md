# OHTMLT — Organização HTML para Todos

Projeto acadêmico de **Desenvolvimento Front-End**, da **Universidade Cruzeiro do Sul**. A OHTMLT é uma organização fictícia voltada à inclusão e ao aprendizado digital, com propostas para iniciantes e pessoas interessadas em compartilhar conhecimentos.

**Estado: em reconstrução — etapa 3 implementada.** A aplicação tem três páginas HTML estáticas com apresentação, projetos demonstrativos e formulário com validação nativa. O Design System aplica cores, tipografia, espaçamentos e estilos básicos. O layout usa Grid de doze colunas, Flexbox e cinco breakpoints. Menus interativos, JavaScript, SPA e persistência serão desenvolvidos nas próximas etapas.

[Repositório no GitHub](https://github.com/samuelescoval-tech/ohtmlt-front-end-ATT-Cruzeiro)

## Executar localmente

Requisito: Python 3 e um navegador. Na raiz do projeto:

```bash
python3 -m http.server 5500 --bind 127.0.0.1
```

Abra **http://127.0.0.1:5500/**. Para encerrar, use `Ctrl+C` no terminal do servidor. Se a porta estiver ocupada, use `5501` no comando e na URL. Não há instalação de dependências nem etapa de build.

Para obter a versão em desenvolvimento a partir do GitHub:

```bash
git clone --branch develop https://github.com/samuelescoval-tech/ohtmlt-front-end-ATT-Cruzeiro.git
cd ohtmlt-front-end-ATT-Cruzeiro
```

Também é possível abrir os arquivos HTML diretamente no navegador nesta fase estática. As verificações registradas foram executadas pelo servidor HTTP acima.

## Páginas e funcionalidades

| Página | Conteúdo |
| --- | --- |
| `index.html` | Apresentação, imagem com texto alternativo, seção “Quem somos” e formas de participação. |
| `projetos.html` | Três propostas demonstrativas, organizadas em artigos com links para o cadastro. |
| `cadastro.html` | Formulário com cinco campos obrigatórios, rótulos, grupos e instruções de formato. |

A navegação entre as páginas é estática, com carregamento de um novo documento. Cada página identifica o link atual com `aria-current="page"` e oferece um link para pular ao conteúdo principal. Não há ofertas, turmas ou inscrições reais.

## Formulário: regras e limites

| Campo | Regra nativa |
| --- | --- |
| Nome | Obrigatório, até 100 caracteres; somente espaços são rejeitados. |
| E-mail | Obrigatório, `type="email"`, até 254 caracteres. |
| Telefone celular | Obrigatório, formato `(11)99999-9999`, sem espaços. |
| CPF | Obrigatório, formato `000.000.000-00`. |
| CEP | Obrigatório, formato `00000-000`. |

Digite a pontuação indicada: `pattern` verifica o formato e não aplica máscaras. O e-mail usa `inputmode="email"`; os campos com pontuação manual usam `inputmode="text"` para permitir a digitação dos separadores. Não há consulta de endereço, confirmação de existência dos dados ou algoritmo de dígitos verificadores do CPF.

**Use somente dados fictícios.** O botão aciona a validação do navegador. Quando os dados são válidos, o formulário usa `GET` para retornar a `cadastro.html#formulario`, incluindo os valores na URL. Esses valores podem aparecer no histórico do navegador e no log do servidor local. Esse envio não realiza uma inscrição e não cria uma lista de cadastros. Não há backend de cadastro ou uso de `localStorage`. As mensagens de validação são fornecidas pelo navegador e podem variar com seu idioma.

Nas etapas de JavaScript, o envio será tratado na própria página e a simulação local receberá validação e feedback específicos.

## Estrutura versionada

```text
ohtmlt-front-end-ATT-Cruzeiro/
├── .gitignore
├── README.md
├── index.html
├── projetos.html
├── cadastro.html
├── css/
│   ├── base.css
│   └── layout.css
├── assets/
│   └── imagens/
│       └── inclusao-digital.svg
└── docs/
    ├── DESIGN-SYSTEM.md
    ├── LAYOUT.md
    ├── TESTES.md
    └── evidencias/
        ├── etapa-1/
        ├── etapa-2/
        └── etapa-3/
```

A imagem SVG foi criada para este projeto e é usada na apresentação e como ícone das páginas. Não depende de serviços externos. As evidências de navegador são arquivos PNG; os relatórios são JSON. Não há bibliotecas, frameworks ou fontes externas. Nenhuma licença de distribuição foi definida.

## Design System

[`css/base.css`](css/base.css) define 12 cores distintas, cinco tamanhos tipográficos e oito passos de espaçamento baseados em 4 px. A base usa fontes do sistema, links sublinhados, foco visível, ações primária e secundária, aviso demonstrativo, selo e borda de erro após interação. A cor de sucesso está reservada para uma futura confirmação; nenhum cadastro é salvo nesta etapa.

As [regras de uso](docs/DESIGN-SYSTEM.md) explicam quando aplicar cada cor e estilo, com exemplos presentes no código e medidas de contraste. Não há animações nesta base.

## Layout responsivo

[`css/layout.css`](css/layout.css) organiza o conteúdo em doze colunas, com limites explícitos de 480, 768, 992, 1200 e 1440 px. Os três projetos aparecem em uma, duas ou três colunas conforme a largura. Cabeçalho, navegação, ações, rodapé e conteúdo interno dos projetos usam Flexbox. A área do cadastro permanece limitada a 44 rem; os campos se reorganizam preservando a ordem de teclado.

Consulte [as regras de layout, os seletores e as medidas](docs/LAYOUT.md). A navegação continua sempre visível; menus expansíveis serão acrescentados na etapa de componentes.

## Verificação

Em 28/09/2026, após o layout responsivo, as três páginas passaram novamente no W3C Nu HTML Checker sem erros ou avisos. No Chrome, 123 verificações foram aprovadas, incluindo 57 combinações das três páginas em 19 larguras, com medidas imediatamente antes, no limite e depois de cada breakpoint. O texto ampliado a 200%, a ordem de teclado e as 22 combinações de contraste também passaram. Os relatórios das etapas anteriores foram preservados.

Consulte [os casos, a correção observada e as evidências](docs/TESTES.md). Esses resultados não equivalem a uma auditoria completa de acessibilidade ou compatibilidade entre navegadores.

## Versionamento e próximos passos

`main` contém a base documental e receberá versões aprovadas; `develop` integra as etapas de desenvolvimento; `feature/*` organiza mudanças verificadas em pull requests. O padrão de commits é semântico. Ainda não há release, tag de versão ou deploy.

A próxima etapa é a de **componentes visuais**: menus, evolução dos cards, estados dos controles, alertas e modal, incluindo teclado e foco. A exigência de framework na terceira experiência e os enunciados detalhados de acessibilidade, otimização e deploy na quarta experiência ainda precisam ser confirmados.
