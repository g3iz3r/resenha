# 🍎 Resenha OS // SENAC Palmas
### Edição Especial: Aniversário do Professor João Pedro 🎂🍕

Um portal interativo de fofocas, cultura pop e bastidores acadêmicos com estética moderna inspirada no **macOS Sequoia / Sonoma**, desenvolvido pela turma do **Técnico em Desenvolvimento de Sistemas (TDS) do SENAC Palmas** para celebrar o aniversário do nosso mestre e orientador, **Professor João Pedro** (23 de Novembro de 2026).

---

## 📸 Demonstração do Projeto

O sistema simula um ambiente de trabalho macOS completo no navegador, com janelas translúcidas em glassmorphism, menu bar superior, widgets dinâmicos de desktop, terminal integrado e dock inferior flutuante com magnificação.

---

## ✨ Funcionalidades e Janelas

### 1. 🌐 Safari — "Plantão Exclusivo"
- **Manchete Principal:** Cobertura do aniversário do Professor João Pedro e a grande rodada de pizzas realizada no próprio pátio do SENAC Palmas.
- **Moldura Polaroid (macOS Photos):** Exibe a **foto real** da turma reunida no evento anterior com o professor, refrigerantes e caixas de pizza no banco de madeira.
- **macOS Quick Look:** Ao clicar na foto ou pressionar a tecla <kbd>Barra de Espaço</kbd>, a imagem se abre em tela cheia com visualização rápida translúcida.
- **Botão "Mandar Hype 🔥":** Contador em tempo real com efeitos comemorativos.

### 2. 📝 Notas — "Bafafá da Turma" (Split View)
- Layout clássico com barra lateral de categorias e painel de leitura.
- Filtro rápido por tags:
  - `Todas`: Visão geral de todos os fuxicos.
  - `#ModaDev`: *O Mistério das Camisetas Personalizadas* e a saga do chute no portão da confecção.
  - `#ClimaPalmas`: *Tempestade em Palmas*, o clássico pânico de chuva e as perguntas de "vai ter aula?".
  - `#Bastidores`: *Vazou o código-fonte do parabéns!*, a entrega do projeto comemorativo sob pressão.
- Botões de reações interativas (😂, 🔥, 👏) com contadores individuais.

### 3. 🧩 Widgets Flutuantes (macOS Sonoma Desktop)
- **Palavra do Ano 2026 (Spotify Wrapped):** Homenagem ao termo oficial mais proferido nas aulas: **"CABEÇÃO"**, acompanhado do botão interativo *"Medir Nível de Cabeção 🧠"* que sorteia diagnósticos bem-humorados.
- **Clima • Palmas, TO (Apple Weather):** Temperatura de 28°C, previsão de *"Chuva de Código e Mussarela"* e barra de métricas com *"Produtividade pós-pizza: 0%"*.
- **Mural Ao Vivo da Turma:** Feed de mensagens com recados nominais dos alunos (**Eduardo, Yasmin, Arthur, Rafael, Isaque, Daniel, Hatus, Gabriel, Mariana, Enzo e Geizer**), com formulário instantâneo para envio de novos recados.

### 4. 💻 Terminal Modal (`zsh — parabens.sh`)
- Terminal macOS com tema escuro executando o script comemorativo:
  ```bash
  sudo parabens --prof="João Pedro" --turma="Dev SENAC"
  ```
- Exibição de logs em tempo real, status de entrega das pizzas no SENAC e arte ASCII celebrando o aniversário.

### 5. 🖥️ Menu Bar Superior & Dock Inferior
- **Menu Bar (28px):** Menu Apple, itens de navegação (*Arquivo*, *Editar*, *Fofocas*, *Janela*), busca Spotlight interativa e relógio com data e hora.
- **Dock Flutuante:** Ícones com efeitos suaves de ampliação (*magnification*) no hover, indicadores luminosos de app ativo e controle de janelas.
- **Gerenciador de Janelas:** Suporte a foco dinâmico (`z-index`), minimizar, expandir e fechar via botões semáforo (*traffic lights*).
- **Chuva de Confetes:** Motor de partículas em Canvas 100% nativo.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico:** Estruturação acessível e modular.
- **CSS3 Moderno:**
  - Glassmorphism com `backdrop-filter: blur(28px)`.
  - Gradiente abstrato Mesh de alta definição.
  - CSS Grid e Flexbox para layouts responsivos estilo Stage Manager.
  - Variáveis CSS customizadas para cores do sistema macOS.
- **JavaScript Vanilla:**
  - Gerenciamento dinâmico de janelas e estados do Dock.
  - Atalhos de teclado (Quick Look via <kbd>Space</kbd> e <kbd>Esc</kbd>).
  - Sistema de filtros de notas e reações em tempo real.
  - Motor de partículas de confetes em Canvas nativo.
  - Sem bibliotecas externas pesadas ou dependências de build.

---

## 🚀 Como Executar o Projeto

1. Baixe ou clone os arquivos na sua máquina local:
   - `index.html`
   - `style.css`
   - `script.js`
   - `foto-turma.jpg`
2. Dê um duplo clique no arquivo **`index.html`** ou abra-o em qualquer navegador web moderno (Google Chrome, Microsoft Edge, Safari, Firefox, Opera).
3. O projeto funciona **100% offline**, sem necessidade de servidores Node.js, Apache ou internet.

---

## 📁 Estrutura de Arquivos

```text
resenha/
├── index.html        # Estrutura HTML do sistema operacional e janelas
├── style.css         # Folha de estilos macOS (Glassmorphism, Dock, Widgets)
├── script.js         # Lógica de janelas, Quick Look, reações e confetes
├── foto-turma.jpg    # Registro fotográfico oficial da resenha da turma
└── README.md         # Documentação oficial do projeto
```

---

## 🎓 Mensagem ao Professor João Pedro

> *"Brincadeiras, memes e 'cabeções' à parte, hoje a turma do Técnico em Desenvolvimento de Sistemas faz uma pausa na zoeira para registrar o que realmente importa. Professor João Pedro, sua paciência, didática e parceria transformam cada aula em um passo real rumo ao nosso futuro na tecnologia. Mais do que códigos e sistemas, você nos ensina a pensar e a não desistir diante de um erro de compilação. Feliz aniversário! Que seu novo ciclo seja repleto de saúde, conquistas e muitos motivos para sorrir!"*
> 
> — **Turma de Técnico em Desenvolvimento de Sistemas • SENAC Palmas • 2026**
