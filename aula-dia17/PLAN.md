Plano de Ação — Cruzadinha (mini site)

Objetivo
- Construir um mini site (jogo de cruzadinha) que roda no navegador seguindo os requisitos do PDF em `base/base.pdf`.

Tecnologias
- HTML, CSS, JavaScript (por favor confirme se "java" no pedido era JavaScript; se realmente for Java, me avise).

Entrega esperada
- Projeto com arquivos: index.html, style.css, script.js, README.md na raiz da pasta do projeto.
- Funcionalidades mínimas: tabuleiro com >=12 palavras, entrada nas casas, botão "Conferir", contador de acertos, botão "Reiniciar", pistas horizontais/verticais.

Cronograma e commits sugeridos
- Dia 1 — Planejamento e esqueleto
  - commit feat: adiciona esqueleto do projeto (index, css, js, README)
- Dia 2 — Layout e tabuleiro estático com palavras
  - commit feat: adiciona tabuleiro estático com 12 palavras
- Dia 3 — Interatividade (digitar nas células, reiniciar, conferir)
  - commit feat: implementa verificação e contador
- Dia 4 — Ajustes visuais e validação
  - commit style: melhora estilos responsivos
  - commit fix: corrige verificações e bugs
  - commit docs: atualiza README com instruções e link do site

Observação: são necessários no mínimo 6 commits em pelo menos 2 dias diferentes — anote cada etapa e commit enquanto desenvolve.

Plano técnico (passo a passo)
1. Escolher 12+ palavras da lista fornecida no PDF (posso escolher para você se preferir).
2. Desenhar o tabuleiro em papel / planilha e anotar coordenadas (recomendado). Vou propor um layout simples 12x12 que acomoda as palavras.
3. Criar o HTML:
   - grid de divs/inputs representando as casas do tabuleiro
   - área lateral com as pistas separadas: Horizontais e Verticais, numeradas
   - botões: Conferir, Reiniciar
4. CSS:
   - estilos para casas, células selecionadas, correta/incorreta
   - layout responsivo simples para mobile
5. JavaScript:
   - modelo dos itens do jogo: palavra, direção, coordenadas iniciais, número da pista
   - preencher o tabuleiro com inputs (atributo maxlength=1)
   - função conferir(): combina as letras por palavra e valida com as respostas; marca visualmente as palavras corretas/erradas e atualiza contador
   - função reiniciar(): limpa inputs e estados
6. Testes manuais: testar entradas, cruzamentos, bordas e contagem
7. Publicação: instruções para publicar no GitHub Pages (README)

Critérios de aceitação (checklist)
- [ ] 12+ palavras usadas e cruzadas
- [ ] Pistas mostradas e numeradas separadas em horizontais/verticais
- [ ] Jogador digita nas casas
- [ ] Botão Conferir que mostra correção por palavra
- [ ] Contador de acertos visível
- [ ] Botão Reiniciar funcional
- [ ] Projeto com index.html na raiz

Dúvidas rápidas para você (responda aqui):
1) Você quis dizer JavaScript (JS) ou Java? Recomendo JS (puro) para esse exercício.
2) Quer que eu escolha automaticamente as 12 palavras do PDF ou você prefere indicar quais usar?
3) Preferência de paleta de cores ou tema (claro, escuro, cores da SP Tech)?

Próximo passo que farei depois da sua confirmação
- se confirmar JS: implemento o tabuleiro básico e a lógica de conferir/reiniciar; enviarei para você testar e pedirei feedback iterativo.
