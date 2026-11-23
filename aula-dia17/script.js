/* Script inicial: cria um grid simples e esqueleto de lógica
   Aguardo confirmação se devo usar JavaScript (JS) — código atual em JS puro.
*/

const ROWS = 17;
const COLS = 17;

// palavras e pistas (todas em maiúsculas, sem acentos ou espaços no tabuleiro)
const wordsData = [
  {word: 'CPU', clue: 'Parte central que executa instruções do programa'},
  {word: 'ULA', clue: 'Parte da CPU que realiza operações aritméticas e lógicas'},
  {word: 'UC', clue: 'Componente que coordena e controla a CPU'},
  {word: 'REGISTRADORES', clue: 'Pequenas memórias muito rápidas dentro da CPU'},
  {word: 'RAM', clue: 'Memória volátil usada para dados temporários'},
  {word: 'ROM', clue: 'Memória não-volátil com dados gravados permanentemente'},
  {word: 'EEPROM', clue: 'Memória não-volátil regravável eletronicamente'},
  {word: 'FLASH', clue: 'Memória não-volátil usada para armazenamento e atualização'},
  {word: 'CACHE', clue: 'Memória rápida entre CPU e RAM para acelerar acesso'},
  {word: 'MEMORIADEMASSA', clue: 'Armazenamento de grande capacidade para arquivos e programas'},
  {word: 'DMA', clue: 'Mecanismo que transfere dados direto entre dispositivo e memória'},
  {word: 'ADDRESSBUS', clue: 'Conjunto de linhas que transporta endereços entre componentes'},
  {word: 'DATABUS', clue: 'Barramento responsável por transportar dados entre componentes'},
  {word: 'MICROCONTROLADOR', clue: 'Chip que integra CPU, memória e periféricos num só circuito'},
  {word: 'DUALCORE', clue: 'Processador com dois núcleos que executam tarefas em paralelo'},
  {word: 'QUADCORE', clue: 'Processador com quatro núcleos para maior desempenho'}
];

// grid interno: null ou letra
let grid = [];
let placedWords = []; // {word,row,col,dir,num,clue}


const boardEl = document.getElementById('board');
const acrossList = document.getElementById('across-list');
const downList = document.getElementById('down-list');
const checkBtn = document.getElementById('checkBtn');
const resetBtn = document.getElementById('resetBtn');
const scoreEl = document.getElementById('score');

// cria grid com células input ou bloco
function initGrid(){
  grid = Array.from({length: ROWS}, ()=>Array.from({length: COLS}, ()=>null));
}

function createBoardElement(){
  // define colunas via JS para ajustar ao tamanho
  const size = 30;
  boardEl.style.gridTemplateColumns = `repeat(${COLS}, ${size}px)`;
  boardEl.innerHTML = '';
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      const cell = document.createElement('div');
      cell.className = 'cell block';
      boardEl.appendChild(cell);
    }
  }
}

// tenta posicionar todas as palavras garantindo que cada palavra cruze pelo menos uma já existente
function placeAllWords(){
  placedWords = [];
  // copiar e ordenar por comprimento decrescente para facilitar encaixes de longas
  const list = wordsData.slice().sort((a,b)=>b.word.length - a.word.length);

  // coloca a primeira palavra no centro, horizontal
  const first = list.shift();
  const r0 = Math.floor(ROWS/2);
  const c0 = Math.floor((COLS - first.word.length)/2);
  placeWordAt(first.word, r0, c0, 'across', first.clue, 1);

  let nextNum = 2;
  for(const item of list){
    const placed = tryPlaceCrossing(item.word, item.clue, nextNum);
    if(placed) nextNum++;
    else{
      // se não encontrou cruzamento, tenta posição livre horizontal/vertical
      const fallback = tryPlaceAnywhere(item.word, item.clue, nextNum);
      if(fallback) nextNum++;
      else console.warn('Não foi possível posicionar a palavra:', item.word);
    }
  }
}

function placeWordAt(word, row, col, dir, clue, num){
  // escreve letras no grid
  for(let i=0;i<word.length;i++){
    const r = row + (dir === 'down' ? i : 0);
    const c = col + (dir === 'across' ? i : 0);
    grid[r][c] = word[i];
  }
  placedWords.push({word, row, col, dir, num, clue});
}

function tryPlaceCrossing(word, clue, num){
  // para cada posição já preenchida no grid, tenta cruzar
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      const letter = grid[r][c];
      if(!letter) continue;
      for(let i=0;i<word.length;i++){
        if(word[i] !== letter) continue;
        // tentar vertical com cruzamento em (r,c)
        const startRow = r - i;
        if(startRow >= 0 && startRow + word.length <= ROWS){
          // verifica conflito
          let ok = true;
          for(let k=0;k<word.length;k++){
            const rr = startRow + k;
            const cc = c;
            const g = grid[rr][cc];
            if(g && g !== word[k]){ ok = false; break; }
          }
          if(ok){ placeWordAt(word, startRow, c, 'down', clue, num); return true; }
        }
        // tentar horizontal with crossing at (r,c)
        const startCol = c - i;
        if(startCol >= 0 && startCol + word.length <= COLS){
          let ok = true;
          for(let k=0;k<word.length;k++){
            const rr = r;
            const cc = startCol + k;
            const g = grid[rr][cc];
            if(g && g !== word[k]){ ok = false; break; }
          }
          if(ok){ placeWordAt(word, r, startCol, 'across', clue, num); return true; }
        }
      }
    }
  }
  return false;
}

function tryPlaceAnywhere(word, clue, num){
  // tentativa simples: scan all cells for horizontal then vertical placement without conflicts
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      if(c + word.length <= COLS){
        let ok = true;
        for(let k=0;k<word.length;k++){
          const g = grid[r][c+k];
          if(g && g !== word[k]){ ok = false; break; }
        }
        if(ok){ placeWordAt(word, r, c, 'across', clue, num); return true; }
      }
      if(r + word.length <= ROWS){
        let ok = true;
        for(let k=0;k<word.length;k++){
          const g = grid[r+k][c];
          if(g && g !== word[k]){ ok = false; break; }
        }
        if(ok){ placeWordAt(word, r, c, 'down', clue, num); return true; }
      }
    }
  }
  return false;
}

function renderFromGrid(){
  // atualiza elementos do DOM com inputs para células preenchidas
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      const idx = r*COLS + c;
      const cell = boardEl.children[idx];
      const letter = grid[r][c];
      cell.className = letter ? 'cell' : 'cell block';
      cell.innerHTML = '';
      if(letter){
        const input = document.createElement('input');
        input.maxLength = 1;
        input.dataset.r = r; input.dataset.c = c;
        // força uppercase e remove caracteres inválidos
        input.addEventListener('input', e=>{
          e.target.value = (e.target.value || '').toUpperCase().replace(/[^A-Z0-9]/g,'');
        });
        cell.appendChild(input);
      }
    }
  }
}

function renderClues(){
  acrossList.innerHTML = '';
  downList.innerHTML = '';
  // sort placedWords by num
  const byNum = placedWords.slice().sort((a,b)=>a.num - b.num);
  for(const pw of byNum){
    const li = document.createElement('li');
    li.textContent = `${pw.num}. ${pw.clue}`;
    if(pw.dir === 'across') acrossList.appendChild(li);
    else downList.appendChild(li);
  }
}

function readWord(item){
  const letters = [];
  for(let i=0;i<item.word.length;i++){
    const r = item.row + (item.dir==='down'?i:0);
    const c = item.col + (item.dir==='across'?i:0);
    const idx = r*COLS + c;
    const cell = boardEl.children[idx];
    const input = cell.querySelector('input');
    letters.push(input ? (input.value || '').toUpperCase() : '');
  }
  return letters.join('');
}

function checkAll(){
  let correctCount = 0;
  for(const item of placedWords){
    const answer = readWord(item);
    const isOk = answer === item.word;
    for(let i=0;i<item.word.length;i++){
      const r = item.row + (item.dir==='down'?i:0);
      const c = item.col + (item.dir==='across'?i:0);
      const idx = r*COLS + c;
      const cell = boardEl.children[idx];
      cell.classList.toggle('correct', isOk);
      cell.classList.toggle('wrong', !isOk && answer.trim() !== '');
    }
    if(isOk) correctCount++;
  }
  scoreEl.textContent = `${correctCount} de ${placedWords.length} palavras`;
}

function resetBoard(){
  for(const cell of boardEl.children){
    const input = cell.querySelector('input');
    if(input) input.value = '';
    cell.classList.remove('correct','wrong');
  }
  scoreEl.textContent = `0 de ${placedWords.length} palavras`;
}

checkBtn.addEventListener('click',checkAll);
resetBtn.addEventListener('click',resetBoard);

// inicialização
initGrid();
createBoardElement();
placeAllWords();
renderFromGrid();
renderClues();
