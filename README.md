# 👶 Gêmeos Xavier Calmon - Jogo Interativo de Revelação

[![Demo Online](https://img.shields.io/badge/demo-online-brightgreen)](https://gabriell-oliveira.github.io/gemeos-2/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

Uma experiência interativa baseada na web, projetada para revelar os nomes de bebês gêmeos através de uma série de desafios envolventes. Desenvolvido com JavaScript puro, HTML5 e CSS3.

## 🎮 Funcionalidades

- **4 Desafios Progressivos**: Jogo da memória, associação, quiz relâmpago e caça-palavras
- **Sistema Dinâmico de Progresso**: Acompanha a conclusão e desbloqueia desafios sequencialmente
- **Design Responsivo**: Otimizado para desktop, tablet e dispositivos móveis
- **Feedback Sonoro**: Efeitos sonoros interativos melhoram o engajamento
- **Recompensas Visuais**: Peças de quebra-cabeça animadas coletadas após cada desafio
- **Tema Bíblico**: Santos católicos e referências bíblicas ao longo do jogo

## 🚀 Demo Online

Acesse a aplicação: [gabriell-oliveira.github.io/Revelacao-dos-gemeos](https://gabriell-oliveira.github.io/Revelacao-dos-gemeos/)

## 🎯 Estrutura do Jogo

### Desafio 1: Jogo da Memória 🧠
Combine pares de cartas de santos católicos. Apresenta animações suaves de virada e condições de vitória.

### Desafio 2: Jogo de Associação 🔗
Conecte descrições bíblicas aos livros corretos. Mecânica interativa de arrastar e conectar com feedback visual.

### Desafio 3: Quiz Relâmpago ⚡
Responda uma pergunta bíblica em 30 segundos. Timer circular com estados de urgência codificados por cores.

### Desafio 4: Caça-Palavras 🔍
Encontre termos bíblicos em uma grade 10x10. Suporta interações por mouse e toque com efeitos de destaque.

### Revelação Final: Montagem do Quebra-Cabeça 🧩
Monte as 4 peças conquistadas para revelar os nomes dos gêmeos com uma transição de imagem dramática.

## 🛠️ Implementação Técnica

### Tecnologias Principais
- **HTML5**: Marcação semântica com considerações de acessibilidade
- **CSS3**: Recursos modernos incluindo Grid, Flexbox, animações e backdrop filters
- **JavaScript Puro**: Sem frameworks - manipulação direta do DOM e tratamento de eventos

### Recursos Principais
- **Persistência com LocalStorage**: Salva o progresso do usuário entre sessões
- **API Drag & Drop**: Drag-and-drop nativo HTML5 para montagem do quebra-cabeça
- **API Canvas**: Processamento de imagem para geração de peças do quebra-cabeça
- **Animações CSS**: Transições suaves e efeitos visuais envolventes
- **Layouts Grid Responsivos**: Interface adaptável para todos os tamanhos de tela

### Estrutura de Arquivos
```
Revelacao-dos-gemeos/
├── index.html              # Página inicial principal
├── main.js                 # Lógica de acompanhamento de progresso
├── style.css               # Estilos globais
├── memoria/                # Desafio do jogo da memória
├── associacao/             # Desafio do jogo de associação
├── quiz/                   # Desafio do quiz relâmpago
├── caca-palavras/          # Desafio do caça-palavras
├── quebra-cabeca/          # Montagem final do quebra-cabeça
├── pecas/                  # Páginas de coleta de peças
├── mensagem/               # Transição da mensagem bíblica
├── imagens/                # Assets do jogo
└── audio/                  # Efeitos sonoros
```

## 💻 Instalação e Configuração

### Início Rápido
1. Clone o repositório:
```bash
git clone https://github.com/gabriell-oliveira/Revelacao-dos-gemeos.git
```

2. Navegue até o diretório do projeto:
```bash
cd Revelacao-dos-gemeos
```

3. Abra com um servidor local (recomendado):
```bash
# Usando Python 3
python -m http.server 8000

# Usando http-server do Node.js
npx http-server -p 8000
```

4. Acesse no navegador: `http://localhost:8000`

### Acesso Direto ao Arquivo
Alternativamente, abra o `index.html` diretamente em um navegador moderno (Chrome, Firefox, Safari, Edge).

## 🎨 Destaques do Design

- **Interface Glassmorphism**: Efeitos de vidro fosco com backdrop blur
- **Backgrounds em Gradiente**: Esquemas de cores vibrantes por todo o jogo
- **Micro-interações**: Efeitos hover, transformações de escala e transições suaves
- **Hierarquia Visual**: Tipografia clara e uso estratégico de cores
- **Acessibilidade**: HTML semântico e interações amigáveis ao teclado

## 📱 Compatibilidade de Navegadores

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Navegadores móveis (iOS Safari, Chrome Mobile)

## 🧩 Sistema de Progresso

O jogo implementa um mecanismo de desbloqueio sequencial:
1. Complete o Desafio 1 → Desbloqueie o Desafio 2
2. Complete o Desafio 2 → Desbloqueie o Desafio 3
3. Complete o Desafio 3 → Desbloqueie o Desafio 4
4. Complete o Desafio 4 → Acesse o quebra-cabeça final
5. Resolva o quebra-cabeça → Revele os nomes dos gêmeos

O progresso é persistido usando `localStorage` com as chaves:
- `pecasConquistadas`: Número de peças coletadas (0-4)
- `desafioAtual`: Desafio atual desbloqueado (1-4)

## 🎵 Créditos de Áudio

Arquivos de áudio personalizados incluídos:
- `choro.mp3`: Som de feedback de erro
- `risos.mp3`: Som de colocação de peça do quebra-cabeça
- `final.mp3`: Áudio de revelação dos nomes

## 🤝 Contribuindo

Este é um projeto pessoal para revelação de bebês em família. No entanto, se você quiser usá-lo como modelo ou sugerir melhorias:

1. Faça um Fork do repositório
2. Crie uma branch de feature (`git checkout -b feature/melhoria`)
3. Commit suas mudanças (`git commit -m 'Adiciona melhoria'`)
4. Push para a branch (`git push origin feature/melhoria`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é open source e disponível para uso pessoal. Por favor, forneça atribuição se usar este código como modelo.

## 👨‍💻 Autor

**Gabriel Oliveira**
- GitHub: [@gabriell-oliveira](https://github.com/gabriell-oliveira)

## 🙏 Agradecimentos

- Imagens de santos católicos obtidas de domínio público
- Referências bíblicas do Novo Testamento
- Inspirado por jogos clássicos de memória e quebra-cabeça

---

**Nota**: Este jogo foi criado como uma forma única e envolvente de revelar os nomes de bebês gêmeos para familiares e amigos. Sinta-se à vontade para adaptá-lo para seus próprios anúncios especiais!

