
# Instruções para Exportação do APK

Para exportar este projeto como um aplicativo Android (APK), siga os passos abaixo:

## Pré-requisitos

1. Node.js e npm instalados
2. Android Studio instalado (para compilação Android)
3. JDK 11 ou superior

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

4. **Adicionar a plataforma Android**
   ```bash
   npx cap add android
   ```

5. **Compilar o projeto web**
   ```bash
   npm run build
   ```

6. **Sincronizar os arquivos com o projeto nativo**
   ```bash
   npx cap sync android
   ```

7. **Abrir o projeto no Android Studio**
   ```bash
   npx cap open android
   ```

8. **Compilar o APK no Android Studio**
   - No Android Studio, vá em Build > Build Bundle(s) / APK(s) > Build APK(s)
   - O APK será gerado em `android/app/build/outputs/apk/debug/app-debug.apk`

9. **Execução rápida em um dispositivo conectado**
   ```bash
   npx cap run android
   ```

## Notas adicionais

- Para atualizar o aplicativo após mudanças no código:
  ```bash
  npm run build
  npx cap sync android
  ```

- Para desenvolvimento com live reload (hot reload):
  ```bash
  npm run dev
  npx cap run android -l --external
  ```
