// ========== VARIÁVEIS DO JOGO ==========
let pecasEncaixadas = 0;
const TOTAL_PECAS = 4;
let imagemCarregada = false;
let pecasData = []; // Armazena os dados das peças recortadas

// ========== ÁUDIO ==========
const audioRiso = new Audio('../audio/risos.mp3');
const audioRevelacao = new Audio('../audio/final.mp3');

const pecasEncaixadasEl = document.getElementById('pecas-encaixadas');
const statusMessageEl = document.getElementById('status-message');
const confettiContainer = document.getElementById('confetti');
const puzzleBoard = document.getElementById('puzzle-board');
const finalReveal = document.getElementById('final-reveal');

// ========== CARREGAR E PROCESSAR IMAGEM ==========
function carregarImagemERecortar() {
  const img = new Image();
  img.crossOrigin = "anonymous"; // Para evitar problemas de CORS
  
  img.onload = function() {
    const canvas = document.getElementById('image-processor');
    const ctx = canvas.getContext('2d');
    
    // Definir tamanho do canvas igual à imagem
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Desenhar imagem completa
    ctx.drawImage(img, 0, 0);
    
    // Calcular dimensões de cada peça (2x2)
    const pieceWidth = img.width / 2;
    const pieceHeight = img.height / 2;
    
    // Recortar e armazenar cada peça
    const posicoes = [
      { pos: 1, x: 0, y: 0 }, // Superior esquerdo
      { pos: 2, x: pieceWidth, y: 0 }, // Superior direito
      { pos: 3, x: 0, y: pieceHeight }, // Inferior esquerdo
      { pos: 4, x: pieceWidth, y: pieceHeight } // Inferior direito
    ];
    
    posicoes.forEach(({ pos, x, y }) => {
      // Criar canvas temporário para cada peça
      const pieceCanvas = document.createElement('canvas');
      pieceCanvas.width = pieceWidth;
      pieceCanvas.height = pieceHeight;
      const pieceCtx = pieceCanvas.getContext('2d');
      
      // Recortar a peça
      pieceCtx.drawImage(
        canvas,
        x, y, pieceWidth, pieceHeight, // área de origem
        0, 0, pieceWidth, pieceHeight  // área de destino
      );
      
      // Converter para data URL
      const dataURL = pieceCanvas.toDataURL('image/png');
      
      pecasData.push({
        posicao: pos,
        imagem: dataURL,
        x: x,
        y: y,
        width: pieceWidth,
        height: pieceHeight
      });
    });
    
    imagemCarregada = true;
    criarPecasEmbaralhadas();
  };
  
  img.onerror = function() {
    console.error('Erro ao carregar imagem. Usando fallback...');
    criarPecasFallback();
  };
  
  img.src = '../imagens/bebes.png';
}

// ========== CRIAR PEÇAS EMBARALHADAS ==========
function criarPecasEmbaralhadas() {
  const container = document.getElementById('pieces-container');
  container.innerHTML = '';
  
  // Embaralhar as peças
  const pecasEmbaralhadas = [...pecasData].sort(() => Math.random() - 0.5);
  
  pecasEmbaralhadas.forEach((peca, index) => {
    const divPeca = document.createElement('div');
    divPeca.className = 'puzzle-piece';
    divPeca.draggable = true;
    divPeca.dataset.piece = peca.posicao;
    
    divPeca.innerHTML = `
      <div class="piece-content">
        <span class="piece-number-display">${peca.posicao}</span>
      </div>
    `;
    
    divPeca.addEventListener('dragstart', drag);
    container.appendChild(divPeca);
    
    // Animação de entrada
    setTimeout(() => {
      divPeca.style.opacity = '1';
      divPeca.style.transform = 'scale(1)';
    }, 200 + (index * 150));
  });
}

// ========== CRIAR PEÇAS FALLBACK (SE IMAGEM NÃO CARREGAR) ==========
function criarPecasFallback() {
  const container = document.getElementById('pieces-container');
  container.innerHTML = '';
  
  for (let i = 1; i <= 4; i++) {
    const divPeca = document.createElement('div');
    divPeca.className = 'puzzle-piece';
    divPeca.draggable = true;
    divPeca.dataset.piece = i;
    
    divPeca.innerHTML = `
      <div class="piece-content">
        <span class="piece-number-display">${i}</span>
      </div>
    `;
    
    divPeca.addEventListener('dragstart', drag);
    container.appendChild(divPeca);
    
    setTimeout(() => {
      divPeca.style.opacity = '1';
      divPeca.style.transform = 'scale(1)';
    }, 200 + ((i-1) * 150));
  }
}

// ========== FUNÇÃO: TOCAR SOM DE RISO ==========
function tocarSomRiso() {
  audioRiso.currentTime = 0;
  audioRiso.play().catch(err => {
    console.log('Erro ao tocar áudio:', err);
  });
}

function tocarSomVitoria() {
  // Som de vitória já existe no código original
  // Mantendo a função para compatibilidade
}

// ========== FUNÇÕES DE DRAG & DROP ==========
function allowDrop(event) {
  event.preventDefault();
  const slot = event.target.closest('.puzzle-slot');
  if (slot && !slot.classList.contains('filled')) {
    slot.classList.add('drag-over');
  }
}

function drag(event) {
  event.dataTransfer.setData('piece', event.target.dataset.piece);
  event.target.classList.add('dragging');
}

function drop(event) {
  event.preventDefault();
  
  const slot = event.target.closest('.puzzle-slot');
  if (!slot) return;
  
  slot.classList.remove('drag-over');
  
  if (slot.classList.contains('filled')) return;
  
  const pieceNumber = parseInt(event.dataTransfer.getData('piece'));
  const slotPosition = parseInt(slot.dataset.pos);
  
  if (pieceNumber === slotPosition) {
    encaixarPeca(slot, pieceNumber);
  } else {
    slot.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
      slot.style.animation = '';
    }, 500);
  }
}

// ========== ENCAIXAR PEÇA (COM ÁUDIO DE RISO!) ==========
function encaixarPeca(slot, pieceNumber) {
  // TOCAR SOM DE RISO DO SEU SOBRINHO!
  tocarSomRiso();
  
  // Ocultar peça original
  const originalPiece = document.querySelector(`.pieces-container .puzzle-piece[data-piece="${pieceNumber}"]`);
  originalPiece.classList.add('hidden');
  
  // Encontrar dados da peça
  const dadosPeca = pecasData.find(p => p.posicao === pieceNumber);
  
  // Criar peça no slot com imagem
  const newPiece = document.createElement('div');
  newPiece.className = 'puzzle-piece filled-piece';
  
  if (dadosPeca && imagemCarregada) {
    newPiece.innerHTML = `
      <div class="piece-content">
        <img src="${dadosPeca.imagem}" 
             alt="Peça ${pieceNumber}" 
             class="piece-image">
      </div>
    `;
  } else {
    newPiece.innerHTML = `
      <div class="piece-content">
        <span class="piece-number-display">${pieceNumber}</span>
      </div>
    `;
  }
  
  slot.innerHTML = '';
  slot.appendChild(newPiece);
  slot.classList.add('filled');
  
  // Animação de encaixe
  newPiece.style.animation = 'pieceSnap 0.6s ease-out';
  
  pecasEncaixadas++;
  atualizarContador();
  
  if (pecasEncaixadas === TOTAL_PECAS) {
    setTimeout(mostrarVitoria, 800);
  }
}

function atualizarContador() {
  pecasEncaixadasEl.textContent = `${pecasEncaixadas} / ${TOTAL_PECAS}`;
  
  if (pecasEncaixadas === TOTAL_PECAS) {
    pecasEncaixadasEl.style.color = '#4CAF50';
    pecasEncaixadasEl.style.textShadow = '0 0 20px rgba(76, 175, 80, 0.8)';
  }
}

function criarConfetes() {
  const cores = ['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#4CAF50', '#FF69B4'];
  
  for (let i = 0; i < 150; i++) {
    const confete = document.createElement('div');
    confete.className = 'confetti';
    confete.style.left = Math.random() * 100 + '%';
    confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
    confete.style.animationDelay = Math.random() * 0.5 + 's';
    confete.style.animationDuration = (Math.random() * 2 + 2) + 's';
    
    if (Math.random() > 0.5) {
      confete.style.borderRadius = '50%';
    }
    
    confettiContainer.appendChild(confete);
  }
}

// ========== MOSTRAR VITÓRIA COM TRANSIÇÃO ==========
function mostrarVitoria() {
  tocarSomVitoria();
  criarConfetes();
  
  statusMessageEl.textContent = '🎉 PARABÉNS! Você revelou os nomes dos gêmeos! 🎉';
  statusMessageEl.className = 'status-message success';
  
  // Após 2 segundos, fazer transição para imagem completa
  setTimeout(() => {
    revelarImagemCompleta();
  }, 2000);
}

// ========== REVELAR IMAGEM COMPLETA (REMOVE GRADE) ==========
function revelarImagemCompleta() {
  // Fade out do tabuleiro
  puzzleBoard.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
  puzzleBoard.style.opacity = '0';
  puzzleBoard.style.transform = 'scale(0.9)';
  
  // Esconder contador e área de peças
  document.querySelector('.pieces-counter').style.opacity = '0';
  document.querySelector('.pieces-area').style.opacity = '0';
  
  setTimeout(() => {
    puzzleBoard.style.display = 'none';
    document.querySelector('.pieces-counter').style.display = 'none';
    document.querySelector('.pieces-area').style.display = 'none';
    
    // Mostrar imagem final completa
    finalReveal.style.display = 'flex';
    
    setTimeout(() => {
      finalReveal.style.opacity = '1';
      finalReveal.style.transform = 'scale(1)';
    }, 100);

    // TOCAR ÁUDIO DO JOSÉ REVELANDO OS NOMES!
    setTimeout(() => {
      audioRevelacao.play().catch(err => {
        console.log('Erro ao tocar áudio de revelação:', err);
      });
    }, 500);
    
    // Atualizar mensagem
    setTimeout(() => {
      statusMessageEl.innerHTML = `
        <div style="text-align: center; line-height: 1.8;">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">👶 ANDRÉ e PEDRO 👶</div>
          <div style="font-size: 1.3rem; margin-bottom: 0.5rem;">Os Gêmeos Xavier Calmon</div>
          <div style="font-size: 1rem; opacity: 0.9;">✨ Bem-vindos ao mundo! ✨</div>
        </div>
      `;
    }, 1000);
    
  }, 1500);
}

// ========== REMOVER CLASSE DE DRAGGING ==========
document.addEventListener('dragend', (event) => {
  if (event.target.classList.contains('puzzle-piece')) {
    event.target.classList.remove('dragging');
  }
});

document.addEventListener('dragleave', (event) => {
  const slot = event.target.closest('.puzzle-slot');
  if (slot) {
    slot.classList.remove('drag-over');
  }
});

// ========== INICIALIZAR ==========
window.addEventListener('DOMContentLoaded', () => {
  atualizarContador();
  carregarImagemERecortar();

  // Adicionar animação CSS para os nomes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes nomesPulse {
      0%, 100% {
        transform: scale(1);
        filter: drop-shadow(0 5px 15px rgba(255, 215, 0, 0.3));
      }
      50% {
        transform: scale(1.05);
        filter: drop-shadow(0 8px 25px rgba(255, 215, 0, 0.6));
      }
    }
  `;
  document.head.appendChild(style);
});