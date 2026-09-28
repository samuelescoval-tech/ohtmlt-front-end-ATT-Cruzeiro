# Validação do formulário

`validation.js` traduz as restrições nativas em mensagens específicas: obrigatoriedade, nome diferente de espaços, e-mail, formatos de CPF, celular e CEP. O limite de caracteres também é verificado explicitamente, inclusive para valores programáticos. CPF confere apenas formato; não há validação de dígitos nem consulta de existência ou endereço. A pontuação é digitada manualmente.

`form.js` coordena DOM e eventos. `focusout` trata o campo, `input` reavalia campos já tratados e `submit` usa `preventDefault`, valida todos e foca o primeiro erro. O sucesso significa apenas formatos aceitos; ainda não existe armazenamento nesta etapa. `noValidate` é ativado depois da conexão dos eventos para substituir a mensagem nativa pelo feedback acessível da aplicação. As restrições continuam declaradas no HTML.

Os erros estão relacionados ao controle por `aria-describedby`; `aria-invalid` controla borda e mensagem, sem depender apenas de cor. A região `role="status"` anuncia a confirmação. O reset remove estados e erros. `AbortController` desmonta listeners ao sair da view, junto com a limpeza do modal existente.

26 verificações no Chrome: vazio, espaços, formatos, correção durante digitação, limites, primeiro foco, preservação dos valores, URL sem dados, ausência de recarga, Escape, limpeza e descarte de listeners. Cadastro com erros conferido em 320, 375, 768 e 1440 px. [Relatório](evidencias/etapa-7/navegador.json).
