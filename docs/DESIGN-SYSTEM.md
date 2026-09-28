# Design System da OHTMLT

## Estado e finalidade

A base visual comum às três páginas estáticas foi aplicada na etapa 2, integrada ao layout responsivo na etapa 3 e ampliada com componentes interativos na etapa 4. [`css/base.css`](../css/base.css) mantém variáveis, tipografia e estilos globais; [`css/layout.css`](../css/layout.css) define a distribuição das páginas; [`css/components.css`](../css/components.css) reúne menus, cards, controles, mensagens e modal, sendo carregado por último.

As regras de layout estão em [LAYOUT.md](LAYOUT.md). Seletores, condições de abertura, foco, transições e exemplos de uso dos componentes estão em [COMPONENTES.md](COMPONENTES.md).

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
| `--cor-erro` | `#B42318` | Borda e mensagem de erro após interação, com `input:user-invalid`. A instrução junto ao campo e a mensagem nativa indicam o problema. |
| `--cor-sucesso` | `#166534` | Borda e texto de formato aceito após interação; mensagem que confirma a limpeza efetivamente concluída. Nenhum cadastro é salvo. |
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

O envio permanece habilitado para que a validação nativa possa orientar o preenchimento. O botão secundário “Limpar campos” é desabilitado enquanto todos os campos estão vazios; quando há valores, abre um modal de confirmação. O estado ativo dos botões também recebe contorno interno perceptível.

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

### Campos, erro e formato aceito

`label` aparece acima da entrada; `small` apresenta a ajuda associada por `aria-describedby`. Os grupos usam `fieldset` e `legend`. Campos têm fundo branco, texto escuro e borda visível, mantendo espaço suficiente para o foco.

`input:user-invalid:not(:disabled)` usa borda vermelha e mostra a instrução de erro; `input:user-valid:not(:disabled)` usa borda verde e a mensagem “Formato aceito pelo navegador.” Os campos vazios na primeira visita não aparecem como erro. A indicação textual e a borda de validade têm prioridade sobre o hover; a cor não é a única informação.

```html
<input id="nome" name="nome" required aria-describedby="ajuda-nome estado-nome">
<small id="ajuda-nome">Digite um nome fictício.</small>
<span id="estado-nome" class="campo-status">
  <small class="campo-feedback campo-feedback--erro">Preencha este campo conforme a instrução acima.</small>
  <small class="campo-feedback campo-feedback--sucesso">Formato aceito pelo navegador.</small>
</span>
```

O exemplo reduzido reproduz a relação entre campo, ajuda e mensagens de `cadastro.html`; as restrições completas estão no arquivo. O contêiner de estado é referenciado, e seus descendentes ocultos não entram na descrição acessível observada no Chrome. As verificações atuais usam as regras nativas. Rotinas próprias e mensagens específicas por tipo de erro serão desenvolvidas na etapa de validação.

Um formato válido não comprova existência de CPF, endereço ou e-mail, nem conclui uma inscrição. O campo desabilitado usa fundo claro e texto suave; essa variante foi testada temporariamente, sem desabilitar campos no fluxo publicado.

### Aviso e selo

`.aviso` é o aviso estático existente no cadastro. Usar texto escuro sobre amarelo e iniciar com uma instrução explícita. Esse aviso explica o uso de dados fictícios; ele não é um alerta dinâmico e não recebe `role="alert"` nesta etapa.

```html
<p id="aviso-demonstracao" class="aviso"><strong>Use somente dados fictícios.</strong> Este formulário é uma demonstração acadêmica: não realiza inscrições nem mantém uma lista de cadastros.</p>
```

`.selo` identifica conteúdo com uma frase curta. O exemplo em `projetos.html` é:

```html
<span class="selo">Propostas demonstrativas</span>
```

Preservar o texto explicativo mesmo quando uma cor já foi escolhida. Não transformar o selo em link ou botão sem uma ação real. Os cards também usam badges de categoria. O modal confirma a limpeza dos campos; o alerta verde em `role="status"` anuncia somente essa operação concluída, sem afirmar que houve cadastro. Consulte [o fluxo e o tratamento do foco](COMPONENTES.md).

## Contraste medido

As cores foram obtidas por `getComputedStyle()` no Chrome, respeitando o fim das transições de 150 ms. O cálculo usa luminância relativa sRGB e `(Lmaior + 0.05) / (Lmenor + 0.05)`, sem arredondar antes da comparação.

Foram adotados 4,5:1 para todos os textos medidos, incluindo títulos, e 3:1 para bordas de campos e indicadores de foco, tomando como referência [contraste de texto — WCAG 2.2, 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) e [contraste não textual — WCAG 2.2, 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). Os números abaixo são arredondados somente para apresentação.

| Combinação observada | Contraste | Mínimo adotado |
| --- | --- | --- |
| Texto geral | 13.14:1 | 4.5:1 |
| Título | 10.76:1 | 4.5:1 |
| Texto complementar | 7.04:1 | 4.5:1 |
| Marca | 11.55:1 | 4.5:1 |
| Navegação | 11.55:1 | 4.5:1 |
| Botão primário | 11.55:1 | 4.5:1 |
| Botão secundário | 7.12:1 | 4.5:1 |
| Rodapé | 7.56:1 | 4.5:1 |
| Controle do submenu | 11.55:1 | 4.5:1 |
| Botão primário em hover | 14.80:1 | 4.5:1 |
| Botão primário ativo | 14.80:1 | 4.5:1 |
| Botão secundário em hover | 7.12:1 | 4.5:1 |
| Navegação em hover | 6.52:1 | 4.5:1 |
| Link do submenu | 11.55:1 | 4.5:1 |
| Foco no submenu | 6.52:1 | 3:1 |
| Badge do card | 7.12:1 | 4.5:1 |
| Ação do card | 11.55:1 | 4.5:1 |
| Hambúrguer | 11.55:1 | 4.5:1 |
| Foco no hambúrguer | 6.52:1 | 3:1 |
| Botão limpar desabilitado | 7.04:1 | 4.5:1 |
| Aviso estático | 7.97:1 | 4.5:1 |
| Campo | 14.10:1 | 4.5:1 |
| Ajuda | 7.56:1 | 4.5:1 |
| Borda padrão | 4.83:1 | 3:1 |
| Borda do campo em hover | 11.55:1 | 3:1 |
| Foco do campo | 6.70:1 | 3:1 |
| Borda válida | 7.13:1 | 3:1 |
| Texto de formato aceito | 7.13:1 | 4.5:1 |
| Borda inválida | 6.57:1 | 3:1 |
| Texto de erro | 6.57:1 | 4.5:1 |
| Texto do modal | 14.10:1 | 4.5:1 |
| Título do modal | 11.55:1 | 4.5:1 |
| Mensagem de limpeza concluída | 7.13:1 | 4.5:1 |
| Campo desabilitado (aplicado no teste) | 7.04:1 | 4.5:1 |

O relatório completo está em [contraste.json](evidencias/etapa-4/contraste.json). O campo desabilitado foi aplicado somente no teste; o botão de limpeza desabilitado é um estado real. Controles inativos têm exceção nos critérios de contraste, mas foram medidos também.

Esses resultados cobrem as combinações registradas, não uma auditoria completa de conformidade. O teste de texto a 200% altera o tamanho raiz; não substitui zoom completo, dispositivos físicos ou leitores de tela. A preferência por movimento reduzido remove as transições, conforme verificado no navegador.

## Evidências e evolução

As verificações, correções reais e capturas estão em [TESTES.md](TESTES.md). Regras específicas dos componentes estão em [COMPONENTES.md](COMPONENTES.md). A próxima etapa migrará a navegação para SPA.
