
# Documentação do Jogo da Bisseção

## Visão Geral

Este projeto é um jogo educativo interativo que ensina o método da bisseção para encontrar raízes de funções matemáticas. O método da bisseção é uma técnica fundamental de cálculo numérico que permite localizar zeros de funções contínuas.

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

- `src/pages/`: Contém as páginas principais da aplicação
  - `Index.tsx`: Página inicial que apresenta o jogo
  - `BisectionGame.tsx`: Implementação do jogo da bisseção
  - `NotFound.tsx`: Página de erro 404

- `src/components/ui/`: Componentes de interface reutilizáveis (botões, cards, etc.)

## Tecnologias Utilizadas

- React: Biblioteca para construção de interfaces
- TypeScript: Linguagem de programação tipada baseada em JavaScript
- Tailwind CSS: Framework de CSS utilitário
- shadcn/ui: Biblioteca de componentes de interface
- React Router: Gerenciamento de rotas
- React Query: Gerenciamento de estado e requisições

## Funcionalidades Principais

O jogo da bisseção implementa as seguintes funcionalidades:

1. Visualização interativa do processo de bisseção
2. Diferentes níveis de dificuldade
3. Feedback instantâneo para o usuário
4. Interface intuitiva e responsiva

## Como o Método da Bisseção Funciona

O método da bisseção é implementado seguindo estes passos:

1. O usuário escolhe um intervalo [a, b] onde f(a) e f(b) têm sinais opostos
2. O algoritmo calcula o ponto médio c = (a + b) / 2
3. Se f(c) = 0 ou está próximo o suficiente de zero, c é a raiz
4. Se f(c) tem o mesmo sinal que f(a), então a raiz está em [c, b], então a = c
5. Se f(c) tem o mesmo sinal que f(b), então a raiz está em [a, c], então b = c
6. O processo é repetido até que a tolerância desejada seja atingida

## Versão Mobile

O projeto foi configurado com Capacitor para permitir a exportação para aplicativos móveis nativos (Android e iOS).
