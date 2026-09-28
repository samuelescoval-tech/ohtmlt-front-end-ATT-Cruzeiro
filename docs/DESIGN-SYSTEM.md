# Design System da OHTMLT

## Estado e finalidade

A base visual comum às três páginas estáticas foi aplicada na etapa 2 e integrada ao layout responsivo na etapa 3. Cores, tipografia e aparência estão em [`css/base.css`](../css/base.css); containers, colunas e breakpoints estão em [`css/layout.css`](../css/layout.css), carregado em seguida. A paleta, a hierarquia e as regras abaixo são as escolhas desta implementação.

O objetivo é manter a leitura, a identificação das ações e o foco consistentes. A base já oferece os estilos de ações primária e secundária, links, campos, aviso e selo. Grid, Flexbox e cinco breakpoints já estão implementados; suas regras estão em [LAYOUT.md](LAYOUT.md). Menus expansíveis, evolução dos cards, modal e feedback JavaScript pertencem às próximas etapas.

## Cores e regras de uso

| Variável | Valor | Uso nesta base |
| --- | --- | --- |
| `--cor-primaria` | `#0B3C5D` | Cabeçalho, títulos, links de conteúdo e ação principal. Usar texto branco sobre o preenchimento azul. |
| `--cor-primaria-hover` | `#072A42` | Hover e estado pressionado da ação principal; hover de links no conteúdo. |
| `--cor-secundaria` | `#146356` | Contorno e texto da ação de apoio, além do selo demonstrativo. No hover da ação secundária, preencher de verde e usar texto branco. |
| `--cor-destaque` | `#F4B942` | Fundo do aviso com texto escuro, hover de links e contorno de foco sobre o cabeçalho azul. |
| `--cor-fundo` | `#F5F7FA` | Fundo geral e estado desabilitado do botão. |
| `--cor-superficie` | `#FFFFFF` | Campos, grupos do formulário, rodapé e fundo da ação secundária. Também é a cor do texto sobre azul e verde. |
| `--cor-texto` | `#172B4D` | Texto principal, conteúdo dos campos e texto sobre o amarelo do aviso. |
| `--cor-texto-suave` | `#4B5563` | Ajuda, legenda da imagem, rodapé e texto do botão desabilitado. Não reduzir sua opacidade. |
| `--cor-borda` | `#6B7280` | Limites visíveis dos campos, grupos e cards de projetos, além da separação do rodapé. |
| `--cor-erro` | `#B42318` | Borda de `input:user-invalid`, depois da interação que torna o campo inválido. A mensagem nativa do navegador informa o problema em texto. |
| `--cor-sucesso` | `#166534` | Reserva para confirmação textual de uma operação concluída. Ainda não aplicada a mensagens: nesta versão nenhum cadastro é salvo. |
| `--cor-foco` | `#1D4ED8` | Contorno de foco sobre os fundos claros. No cabeçalho, usar o amarelo de destaque para manter contraste. |

São **12 cores distintas**. Alterações nas combinações exigem uma nova medição. Evitar texto branco sobre amarelo e não usar cor como única explicação de erro, sucesso ou estado. O selo descreve a natureza demonstrativa do conteúdo; ele não anuncia uma operação concluída.

## Tipografia

A família é `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Não há fonte baixada de serviço externo. O tamanho raiz do navegador não é fixado em pixels.

| Variável | Tamanho | Com raiz de 16 px | Aplicação |
| --- | --- | --- | --- |
| `--fonte-pequena` | `0.875rem` | 14 px | `small`, `figcaption`, selo e rodapé. |
| `--fonte-corpo` | `1rem` | 16 px | Corpo, links, botões e entradas. |
| `--fonte-subtitulo` | `1.25rem` | 20 px | `h3`, `legend` e identificação no cabeçalho. |
| `--fonte-secao` | `1.75rem` | 28 px | `h2`. |
| `--fonte-titulo` | `2.5rem` | 40 px | `h1`. |

A hierarquia usa cinco tamanhos. A entrelinha é 1,6 no corpo, 1,2 nos títulos e 1,5 nas ações. Usar títulos conforme a estrutura do conteúdo, sem escolher um nível apenas pelo tamanho desejado. O texto do corpo continua com 1 rem; a escala pequena atende somente ao conteúdo complementar.

## Espaçamento e dimensões básicas

| Variável | Valor | Com raiz de 16 px |
| --- | --- | --- |
| `--espaco-1` | `0.25rem` | 4 px |
| `--espaco-2` | `0.5rem` | 8 px |
| `--espaco-3` | `0.75rem` | 12 px |
| `--espaco-4` | `1rem` | 16 px |
| `--espaco-5` | `1.5rem` | 24 px |
| `--espaco-6` | `2rem` | 32 px |
| `--espaco-7` | `3rem` | 48 px |
| `--espaco-8` | `4rem` | 64 px |

A escala usa múltiplos de 4 px como referência, expressos em rem. Aplicações existentes: 8 px entre rótulo e entrada; 12 × 24 px de preenchimento nas ações; 24 px entre parágrafos corridos; 32 px antes das seções de projetos e cadastro; 48 px de respiro vertical no conteúdo principal. Em telas a partir de 1440 px, esse respiro usa o passo de 64 px. Nas grades, os intervalos respondem aos breakpoints documentados.

O raio base é `--raio: 0.5rem`. As bordas de 1 e 2 px e o contorno de foco de 3 px são espessuras de indicação, não intervalos de espaçamento. O foco tem afastamento de 4 px. Links usam `text-underline-offset: 0.2em`, que acompanha a tipografia.

O layout limita o container a 64, 76 ou 80 rem conforme a largura, e a área do cadastro a 44 rem. Os parágrafos corridos têm limite de 70 ch; os textos dos cards são limitados pela coluna disponível. Imagens mantêm proporção e não excedem a área disponível. Os títulos dos grupos usam `max-inline-size: 100%` e `overflow-wrap: anywhere` para acomodar texto ampliado. Consulte [os seletores e breakpoints](LAYOUT.md).

## Regras por elemento

### Ação principal e ação de apoio

Usar `.botao` para a ação principal do contexto. No cadastro, ela aciona o envio demonstrativo do formulário. Na página inicial, o link para o cadastro recebe a mesma hierarquia visual. Usar `.botao--secundario` para navegação de apoio, como conhecer os projetos.

Exemplos presentes em `cadastro.html` e `index.html`:

```html
<button type="submit" class="botao">Verificar e enviar demonstração</button>
<a class="botao botao--secundario" href="projetos.html">Conhecer os projetos</a>
```

Manter a semântica: `a` navega; `button` executa uma ação. A aparência de botão não muda essa responsabilidade. Evitar várias ações primárias competindo no mesmo grupo.

`.botao:hover:not(:disabled)` e `.botao:active:not(:disabled)` escurecem a ação principal. A variante secundária recebe preenchimento verde e texto branco nesses estados. `:focus-visible` mantém o contorno, inclusive sobre as ações. `button.botao:disabled` usa fundo claro, texto suave e cursor de indisponibilidade; o atributo nativo impede a ativação. Não aplicar `disabled` a links: ele não desabilita um elemento `a`.

O formulário publicado mantém o envio habilitado para que a validação nativa possa orientar quem o preenche. O estado desabilitado foi aplicado temporariamente ao botão existente durante o teste; não há regra automática de desabilitação nesta etapa.

### Links, página atual e foco

Links de texto permanecem sublinhados, inclusive na navegação. O link da página atual usa `aria-current="page"`, peso 700 e sublinhado de 3 px. Assim, sua identificação não depende apenas de cor.

O link de pular conteúdo fica visível antes do cabeçalho e leva o foco ao `main`. O foco de teclado usa contorno azul de 3 px, afastado 4 px; dentro do cabeçalho o contorno é amarelo. Não remover o contorno nem substituí-lo apenas por uma mudança de texto ou fundo.

```css
:focus-visible {
  outline: 3px solid var(--cor-foco);
  outline-offset: 4px;
}

header :focus-visible {
  outline-color: var(--cor-destaque);
}
```

### Campos e erro

`label` aparece acima da entrada; `small` apresenta a instrução associada por `aria-describedby`. Os grupos usam `fieldset` e `legend`. Usar branco no campo, texto escuro e borda visível, mantendo espaço suficiente para o foco.

`input:user-invalid` muda a borda para `--cor-erro` após a interação apropriada. Os campos vazios na primeira visita não aparecem como erro. O navegador fornece a mensagem textual e bloqueia o envio quando necessário. Não se usa `:invalid` indiscriminadamente para pintar todos os campos obrigatórios antes de qualquer interação.

As mensagens persistentes junto aos campos, `aria-invalid` controlado por JavaScript e o feedback de sucesso serão acrescentados na etapa de validação. Não declarar uma inscrição concluída apenas porque o formato dos campos é válido.

### Aviso e selo

`.aviso` é o aviso estático existente no cadastro. Usar texto escuro sobre amarelo e iniciar com uma instrução explícita. Esse aviso explica o uso de dados fictícios; ele não é um alerta dinâmico e não recebe `role="alert"` nesta etapa.

```html
<p id="aviso-demonstracao" class="aviso"><strong>Use somente dados fictícios.</strong> Este formulário é uma demonstração acadêmica: não realiza inscrições nem mantém uma lista de cadastros.</p>
```

`.selo` identifica conteúdo com uma frase curta. O exemplo em `projetos.html` é:

```html
<span class="selo">Propostas demonstrativas</span>
```

Preservar o texto explicativo mesmo quando uma cor já foi escolhida. Não transformar o selo em link ou botão sem uma ação real. Modal, alertas dinâmicos e confirmação de operações ainda não estão implementados.

## Contraste medido

As cores foram obtidas por `getComputedStyle()` no Chrome, incluindo hover, foco, estado pressionado e borda inválida. O cálculo usa luminância relativa sRGB e `(Lmaior + 0.05) / (Lmenor + 0.05)`, sem arredondar antes da comparação.

Foram adotados 4,5:1 para todos os textos medidos, incluindo títulos, e 3:1 para bordas de campos e indicadores de foco, tomando como referência [contraste de texto — WCAG 2.2, 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) e [contraste não textual — WCAG 2.2, 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). Os números da tabela são arredondados somente para apresentação.

| Combinação observada | Contraste | Mínimo adotado |
| --- | --- | --- |
| Texto no fundo geral | 13.14:1 | 4.5:1 |
| Título no fundo geral | 10.76:1 | 4.5:1 |
| Texto complementar no fundo geral | 7.04:1 | 4.5:1 |
| Texto no cabeçalho | 11.55:1 | 4.5:1 |
| Link da navegação | 11.55:1 | 4.5:1 |
| Ação primária | 11.55:1 | 4.5:1 |
| Ação secundária | 7.12:1 | 4.5:1 |
| Texto do rodapé | 7.56:1 | 4.5:1 |
| Ação primária em hover | 14.80:1 | 4.5:1 |
| Ação primária pressionada | 14.80:1 | 4.5:1 |
| Ação secundária em hover | 7.12:1 | 4.5:1 |
| Navegação em hover | 6.52:1 | 4.5:1 |
| Foco no cabeçalho | 6.52:1 | 3:1 |
| Selo demonstrativo | 7.12:1 | 4.5:1 |
| Link no conteúdo | 11.55:1 | 4.5:1 |
| Aviso de demonstração | 7.97:1 | 4.5:1 |
| Texto do campo | 14.10:1 | 4.5:1 |
| Ajuda do campo | 7.56:1 | 4.5:1 |
| Borda de campo | 4.83:1 | 3:1 |
| Foco no campo | 6.70:1 | 3:1 |
| Borda do campo inválido | 6.57:1 | 3:1 |
| Botão desabilitado (estado aplicado no teste) | 7.04:1 | 4.5:1 |

As 22 combinações foram medidas novamente após a etapa 3 e passaram. Os links dos projetos agora ficam sobre superfície branca. A cor de sucesso é apenas uma reserva; não há mensagem de sucesso para medir nesta etapa. O botão desabilitado foi medido como estado de teste, embora controles inativos tenham exceção nos critérios de contraste. O relatório completo está em [contraste.json](evidencias/etapa-3/contraste.json).

Esses resultados cobrem as combinações registradas, não uma auditoria completa de conformidade. O teste de ampliação alterou o tamanho raiz para 200%; não substitui testes de zoom, dispositivos físicos ou leitores de tela. Não há animação ou transição nesta base, inclusive quando o navegador informa preferência por movimento reduzido.

## Evidências e evolução

Os testes, a correção de quebra dos títulos do formulário e as capturas estão em [TESTES.md](TESTES.md). O layout implementado está documentado em [LAYOUT.md](LAYOUT.md). A próxima etapa ampliará os componentes visuais e suas interações.
