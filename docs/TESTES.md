# Verificações da OHTMLT

## Etapa 1 — estrutura HTML

Data: **28/09/2026**. Branch de implementação: `feature/estrutura-html`. Ambiente: Linux, Python 3 (`http.server`), Chrome/154.0.8037.57 em modo headless, Node.js v22.22.1. Endereço testado: `http://127.0.0.1:5500/`.

A automação acionou o Chrome pelo Chrome DevTools Protocol usando um script temporário, sem instalar dependências no projeto. Os passos abaixo permitem repetir as verificações manualmente. A execução concluída consta no [relatório do navegador](evidencias/etapa-1/navegador.json), com data, 37 casos aprovados e hashes SHA-256 dos HTML testados. O script temporário não é distribuído como suíte de testes do projeto.

### HTML e recursos

Os documentos completos foram enviados por HTTP POST ao [W3C Nu HTML Checker](https://validator.w3.org/nu/) com o tipo `text/html; charset=utf-8`. As respostas JSON originais estão preservadas:

| Documento | Erros | Avisos | Resposta |
| --- | --- | --- | --- |
| `index.html` | 0 | 0 | [W3C — início](evidencias/etapa-1/w3c-index.json) |
| `projetos.html` | 0 | 0 | [W3C — projetos](evidencias/etapa-1/w3c-projetos.json) |
| `cadastro.html` | 0 | 0 | [W3C — cadastro](evidencias/etapa-1/w3c-cadastro.json) |

Todos os links e os recursos referenciados pelas páginas responderam HTTP 200. A imagem carregou e possui texto alternativo. O navegador não registrou exceções JavaScript nem recursos com falha durante os casos executados. Não há scripts da aplicação nesta etapa.

### Casos de navegação e formulário

| Passos para reproduzir | Esperado | Observado |
| --- | --- | --- |
| Abrir cada página e conferir idioma, título e estrutura. | `pt-BR`, título específico, um `h1`, um `main`, IDs únicos. | Aprovado nas três páginas. |
| Conferir o link atual da navegação em cada página. | Apenas um link com `aria-current="page"`, correspondente à página. | Aprovado nas três páginas. |
| Pressionar Tab e Enter no link “Pular para o conteúdo”. | Primeiro foco no link; Enter move o foco ao `main`. | Aprovado. |
| Acionar Projetos por Enter e seguir o link de um projeto. | Carregar Projetos e depois Cadastro. | Aprovado. |
| Conferir rótulos, grupos e descrições dos campos. | Cinco campos obrigatórios com `label` associado; descrições apontam para elementos existentes. | Aprovado. |
| Enviar o formulário vazio. | Navegador bloqueia o envio e foca o nome. | Aprovado; cinco campos com `valueMissing`. |
| Preencher nome apenas com espaços. | Formato rejeitado. | Aprovado: `patternMismatch`. |
| Preencher e-mail com `email-invalido`. | Formato rejeitado. | Aprovado: `typeMismatch`. |
| Usar telefone `00000000000`, CPF `00000000000` ou CEP `00000000`. | Rejeitar ausência da pontuação exigida. | Aprovado: `patternMismatch` nos três campos. |
| Clicar no rótulo CPF. | Focar seu campo. | Aprovado. |
| Preencher os valores fictícios abaixo. | Navegador aceita os formatos; nenhuma verificação de existência. | Aprovado. |
| Pressionar Enter com foco no CEP após preencher os valores válidos. | Envio GET para a mesma página, valores na URL e âncora do formulário. | Aprovado; sem persistência em `localStorage`. |
| Abrir as três páginas com viewport de 320 px. | Largura do documento não excede a largura útil da janela. | Aprovado após ajuste da imagem inicial. |

Valores utilizados no caso válido: nome `Pessoa Demonstração`, e-mail `pessoa@example.com`, telefone `(00)00000-0000`, CPF `000.000.000-00` e CEP `00000-000`. São dados fictícios para verificar formato. A aceitação de `000.000.000-00` confirma que esta etapa não valida dígitos verificadores do CPF.

### Problema observado e correção

**Imagem na tela estreita.** Na primeira verificação de 320 px, a largura do documento excedeu a janela. A imagem tinha largura HTML de 288 px, somada às margens nativas de 40 px do elemento `figure` e às margens do documento. Ajustaram-se os atributos da imagem para 224 × 126 px, preservando a proporção. O reteste não detectou rolagem horizontal em nenhuma das três páginas; `index.html` também foi reenviado ao W3C após a alteração, sem apontamentos.

**Ajustes da automação.** A primeira simulação de Enter não produziu o envio porque o evento de teclado estava sem o texto de retorno de carro (`\r`). A automação foi corrigida e o envio passou, sem alteração no formulário. Na inspeção das capturas, foi corrigida a largura de captura para incluir toda a janela, evitando corte de texto na evidência. Esses ajustes são do procedimento de teste, não falhas de JavaScript da aplicação.

### Capturas

- [Início em desktop](evidencias/etapa-1/index-desktop.png).
- [Projetos em desktop](evidencias/etapa-1/projetos-desktop.png).
- [Cadastro em desktop](evidencias/etapa-1/cadastro-desktop.png).
- [Validação nativa do formulário vazio](evidencias/etapa-1/cadastro-validacao-nativa.png).
- [Início com viewport de 320 px](evidencias/etapa-1/inicio-320px.png).

As capturas foram produzidas no navegador, com conteúdo integral da página. As janelas usadas foram 1280 × 900 e 320 × 900 px; a altura dos PNGs pode ser maior por incluir o conteúdo fora da área inicial.

### Limitações

Não foram executados testes em Firefox, Safari, dispositivos físicos, leitores de tela ou auditorias completas de acessibilidade. A checagem de largura não valida um layout responsivo com breakpoints, pois CSS ainda não foi implementado. Formatos válidos não comprovam existência dos dados. O envio nativo inclui valores na URL e não mantém cadastros; utilizar somente valores fictícios. SPA, máscaras, feedback personalizado, armazenamento, desempenho e deploy não fazem parte desta etapa.


## Etapa 2 — Design System

Data: **28/09/2026**. Branch de implementação: `feature/design-system`. Ambiente: Linux, Python 3 (`http.server`), Chrome 154 em modo headless, Node.js v22.22.1. A automação usou Chrome DevTools Protocol e script temporário, sem instalar dependências. A base de verificação da etapa 1 foi reaplicada ao HTML com CSS.

Foram concluídos **54 casos no navegador** e **22 medições de contraste**. Os arquivos testados e seus hashes SHA-256 estão no [relatório do navegador](evidencias/etapa-2/navegador.json), incluindo `css/base.css`. As medições completas estão em [contraste.json](evidencias/etapa-2/contraste.json).

### Casos acrescentados

| Procedimento | Resultado observado |
| --- | --- |
| Conferir as variáveis e os estilos computados do corpo, títulos, cabeçalho e legenda. | 12 cores distintas, cinco tamanhos de fonte aplicados e oito passos de espaçamento. |
| Usar hover e pressionar a ação principal. | Azul mais escuro com texto branco; contraste preservado. |
| Usar hover na ação secundária e na navegação. | Verde com texto branco na ação de apoio; amarelo no cabeçalho azul. |
| Navegar por Tab no cabeçalho e no formulário. | Contorno de 3 px amarelo no cabeçalho e azul no campo; foco visível. |
| Abrir o formulário sem interagir e depois tentar enviá-lo vazio. | Sem borda de erro inicialmente; borda vermelha e mensagem nativa após a tentativa. |
| Aplicar temporariamente `disabled` ao botão existente no teste. | Estilo desabilitado aplicado, ativação bloqueada e texto legível; atributo removido após a verificação. |
| Ampliar o tamanho raiz do texto para 200% e usar viewport de 320 px nas três páginas. | Sem rolagem horizontal depois da correção de `legend`. |
| Emular `prefers-reduced-motion: reduce`. | Nenhuma animação ou transição ativa. |
| Repetir os casos de navegação, teclado, formulário e carregamento de recursos. | Todos aprovados; nenhuma exceção JavaScript ou recurso HTTP com falha. |

As cores foram lidas dos estilos computados nos estados testados. As razões foram comparadas sem arredondamento com 4,5:1 para texto e 3:1 para bordas e foco. A documentação do [Design System](DESIGN-SYSTEM.md) apresenta as combinações, referências e limites da verificação. O controle desabilitado foi medido voluntariamente; o teste não significa que exista uma regra automática de desabilitação na aplicação.

### HTML após as alterações

Os três documentos foram novamente enviados ao W3C Nu HTML Checker: **zero erros e zero avisos**. Respostas originais: [início](evidencias/etapa-2/w3c-index.json), [projetos](evidencias/etapa-2/w3c-projetos.json) e [cadastro](evidencias/etapa-2/w3c-cadastro.json). Esta submissão valida o HTML; não é um relatório de validação do CSS.

### Problema observado e correção

Com texto em 200% e viewport de 320 px, o cadastro atingiu largura de 359 px para uma área útil de 305 px. Os elementos `legend` “Identificação” e “Contato e localização” ultrapassavam o espaço disponível. O diagnóstico no navegador confirmou o limite direito de aproximadamente 359,25 px do primeiro título.

Foram adicionados `max-inline-size: 100%` e `overflow-wrap: anywhere` a `legend`, mantendo a fonte ampliada. No reteste, as três páginas passaram na comparação entre `scrollWidth` e `clientWidth`. Não foi reduzido o tamanho da fonte para esconder o problema.

### Capturas da etapa

- [Início com CSS em desktop](evidencias/etapa-2/index-desktop.png).
- [Projetos com selo demonstrativo](evidencias/etapa-2/projetos-desktop.png).
- [Cadastro com aviso e campos](evidencias/etapa-2/cadastro-desktop.png).
- [Validação nativa com borda de erro](evidencias/etapa-2/cadastro-validacao-nativa.png).
- [Início em 320 px](evidencias/etapa-2/inicio-320px.png).
- [Foco na navegação](evidencias/etapa-2/foco-menu.png).
- [Foco no campo](evidencias/etapa-2/foco-campo.png).
- [Botão existente temporariamente desabilitado pelo teste](evidencias/etapa-2/botao-desabilitado.png).
- [Texto ampliado a 200% em 320 px](evidencias/etapa-2/inicio-texto-200.png).

As capturas registram os estados indicados. A imagem do botão desabilitado representa um estado aplicado pela automação ao controle real, sem alteração permanente no HTML. As capturas da página inicial em desktop e em 320 px também foram inspecionadas visualmente.

### Limitações desta etapa

A ampliação foi do tamanho raiz do texto via CSS, não um ensaio completo de zoom do navegador. As medições abrangem as 22 combinações registradas e não atestam conformidade completa de acessibilidade. Não foram testados outros navegadores, leitores de tela ou dispositivos físicos. A ausência de rolagem horizontal não comprova Grid ou breakpoints, que ainda não foram implementados. A cor de sucesso continua reservada; não há confirmação de cadastro ou persistência.
