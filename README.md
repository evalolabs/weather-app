# 🌤️ Wetter App - Azure Deployment Tutorial

Diese React-App ist eine Wetter-Anwendung, die mit einer Azure API (TeleBing) kommuniziert. Das Projekt dient dazu, zu lernen, wie man React-Apps auf Azure veröffentlicht.

## 🚀 Features

- **Wettervorhersage**: Zeigt Wetterdaten von der Azure API an
- **Responsive Design**: Funktioniert auf Desktop und Mobile
- **Real-time Updates**: Aktualisieren der Daten per Button
- **Error Handling**: Benutzerfreundliche Fehlermeldungen
- **Moderne UI**: Glassmorphism Design mit Gradienten

## 🔗 API-Verbindung

Die App ist mit deiner Azure API verbunden:
- **Endpoint**: `https://telebing-adekfugzf6dfbme0.canadacentral-01.azurewebsites.net/WeatherForecast`
- **Methode**: GET
- **Datenformat**: JSON mit `date` und `temperatureC` Feldern

## 🛠️ Lokale Entwicklung

### Voraussetzungen
- Node.js (Version 14 oder höher)
- npm oder yarn

### Installation
```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm start
```

Die App läuft dann unter `http://localhost:3000`

## ☁️ Azure Deployment

### Option 1: Azure Static Web Apps (Empfohlen)

1. **Azure CLI installieren** (falls noch nicht vorhanden):
   ```bash
   # Windows
   winget install Microsoft.AzureCLI
   
   # Oder von https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
   ```

2. **Bei Azure anmelden**:
   ```bash
   az login
   ```

3. **Static Web App erstellen**:
   ```bash
   # App bauen
   npm run build
   
   # Static Web App erstellen
   az staticwebapp create \
     --name "meine-wetter-app" \
     --resource-group "meine-resource-group" \
     --location "West Europe" \
     --source .
   ```

### Option 2: Azure App Service

1. **App bauen**:
   ```bash
   npm run build
   ```

2. **Azure App Service erstellen** (über Azure Portal):
   - Gehe zu Azure Portal
   - Erstelle eine neue "Web App"
   - Wähle "Static Web App" oder "Web App"
   - Lade den `build` Ordner hoch

3. **Deployment über Azure CLI**:
   ```bash
   # App Service erstellen
   az webapp create \
     --name "meine-wetter-app" \
     --resource-group "meine-resource-group" \
     --plan "mein-app-service-plan" \
     --runtime "NODE|18-lts"
   
   # App deployen
   az webapp deployment source config-zip \
     --resource-group "meine-resource-group" \
     --name "meine-wetter-app" \
     --src build.zip
   ```

### Option 3: GitHub Actions (Automatisches Deployment)

1. **Repository auf GitHub pushen**

2. **GitHub Actions Workflow erstellen** (`.github/workflows/azure-deploy.yml`):
   ```yaml
   name: Deploy to Azure
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
       - uses: actions/checkout@v2
       
       - name: Setup Node.js
         uses: actions/setup-node@v2
         with:
           node-version: '18'
           
       - name: Install dependencies
         run: npm install
         
       - name: Build app
         run: npm run build
         
       - name: Deploy to Azure Static Web Apps
         uses: Azure/static-web-apps-deploy@v1
         with:
           azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
           repo_token: ${{ secrets.GITHUB_TOKEN }}
           action: "upload"
           app_location: "/" 
           output_location: "build"
   ```

## 🔧 Konfiguration

### Umgebungsvariablen
Erstelle eine `.env` Datei für lokale Entwicklung:
```env
REACT_APP_API_BASE_URL=https://telebing-adekfugzf6dfbme0.canadacentral-01.azurewebsites.net
```

### CORS-Konfiguration
Stelle sicher, dass deine Azure API CORS für deine React-App erlaubt:
```json
{
  "AllowedOrigins": [
    "http://localhost:3000",
    "https://deine-app.azurewebsites.net"
  ]
}
```

## 📱 Testing

### Lokales Testing
```bash
# Tests ausführen
npm test

# Build testen
npm run build
npm install -g serve
serve -s build
```

### API Testing
```bash
# API direkt testen
curl https://telebing-adekfugzf6dfbme0.canadacentral-01.azurewebsites.net/WeatherForecast
```

## 🎯 Nächste Schritte

1. **App lokal testen**: `npm start`
2. **Build erstellen**: `npm run build`
3. **Auf Azure deployen** (siehe oben)
4. **Domain konfigurieren** (optional)
5. **Monitoring einrichten** (Azure Application Insights)

## 📚 Nützliche Links

- [Azure Static Web Apps Dokumentation](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Azure CLI Dokumentation](https://docs.microsoft.com/en-us/cli/azure/)

## 🐛 Troubleshooting

### Häufige Probleme

1. **CORS-Fehler**: Stelle sicher, dass deine Azure API CORS für deine Domain erlaubt
2. **Build-Fehler**: Überprüfe Node.js Version und Dependencies
3. **Deployment-Fehler**: Überprüfe Azure Credentials und Resource Group

### Debugging
```bash
# Azure CLI Status prüfen
az account show

# App Service Logs anzeigen
az webapp log tail --name "meine-app" --resource-group "meine-rg"
```

---

**Viel Erfolg beim Deployment! 🚀**
