
# Instruções para Gerar Executável

Para gerar um executável desktop do Jogo da Bisseção, siga os passos abaixo:

## Pré-requisitos

1. Node.js e npm instalados
2. Git instalado (para clonar o repositório)

## Passo a passo

1. **Transferir o projeto para seu próprio repositório GitHub**
   - Use o botão "Export to Github" no Lovable para transferir o projeto

2. **Clonar o projeto localmente**
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd bissecaojogo
   ```

3. **Instalar as dependências**
   ```bash
   npm install
   ```

4. **Executar em modo de desenvolvimento**
   ```bash
   npm run electron:dev
   ```

5. **Construir o executável**
   ```bash
   npm run electron:build
   ```
   
   O executável será gerado na pasta `build` do projeto:
   - Windows: arquivo `.exe` na pasta `build/win-unpacked`
   - macOS: arquivo `.dmg` na pasta `build/mac`
   - Linux: arquivo `.AppImage` na pasta `build/linux-unpacked`

## Sistemas operacionais suportados

- Windows (64-bit)
- macOS
- Linux

## Notas adicionais

- Ao distribuir o executável, é necessário também distribuir todos os arquivos gerados na pasta de build do respectivo sistema operacional.
- Para personalizar o ícone da aplicação, substitua o arquivo `public/favicon.ico` por seu próprio ícone.
- Para modificar configurações de build, edite o arquivo `electron-builder.json`.
