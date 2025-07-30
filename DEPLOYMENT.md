# 🚀 Schritt-für-Schritt Azure Deployment Guide

## Vorbereitung

### 1. Azure CLI installieren
```bash
# Windows
winget install Microsoft.AzureCLI

# Oder von: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
```

### 2. Bei Azure anmelden
```bash
az login
```

## Option A: Azure Static Web Apps (Empfohlen)

### Schritt 1: Resource Group erstellen
```bash
az group create \
  --name "meine-wetter-app-rg" \
  --location "West Europe"
```

### Schritt 2: Static Web App erstellen
```bash
# App bauen
npm run build

# Static Web App erstellen
az staticwebapp create \
  --name "meine-wetter-app" \
  --resource-group "meine-wetter-app-rg" \
  --location "West Europe" \
  --source . \
  --branch main \
  --app-location "/" \
  --output-location "build"
```

### Schritt 3: Deployment Token abrufen
```bash
az staticwebapp secrets set \
  --name "meine-wetter-app" \
  --secret-name "deployment-token" \
  --secret-value "dein-token"
```

## Option B: Azure App Service

### Schritt 1: App Service Plan erstellen
```bash
az appservice plan create \
  --name "meine-wetter-app-plan" \
  --resource-group "meine-wetter-app-rg" \
  --sku B1 \
  --is-linux
```

### Schritt 2: Web App erstellen
```bash
az webapp create \
  --name "meine-wetter-app" \
  --resource-group "meine-wetter-app-rg" \
  --plan "meine-wetter-app-plan" \
  --runtime "NODE|18-lts"
```

### Schritt 3: App deployen
```bash
# Build erstellen
npm run build

# ZIP erstellen
cd build && zip -r ../app.zip . && cd ..

# Deployen
az webapp deployment source config-zip \
  --resource-group "meine-wetter-app-rg" \
  --name "meine-wetter-app" \
  --src app.zip
```

## GitHub Actions Setup

### Schritt 1: Repository Secrets hinzufügen
Gehe zu deinem GitHub Repository → Settings → Secrets and variables → Actions

Füge diese Secrets hinzu:
- `AZURE_STATIC_WEB_APPS_API_TOKEN`: Dein Azure Deployment Token
- `REACT_APP_API_BASE_URL`: Deine API URL

### Schritt 2: Repository pushen
```bash
git add .
git commit -m "Add Azure deployment configuration"
git push origin main
```

## CORS-Konfiguration

Stelle sicher, dass deine Azure API CORS für deine neue App erlaubt:

```json
{
  "AllowedOrigins": [
    "http://localhost:3000",
    "https://meine-wetter-app.azurestaticapps.net",
    "https://meine-wetter-app.azurewebsites.net"
  ],
  "AllowedMethods": ["GET", "POST", "PUT", "DELETE"],
  "AllowedHeaders": ["*"]
}
```

## Testing

### Lokales Testing
```bash
npm start
# Öffne http://localhost:3000
```

### Build Testing
```bash
npm run build
npm install -g serve
serve -s build
# Öffne http://localhost:3000
```

### API Testing
```bash
curl https://telebing-adekfugzf6dfbme0.canadacentral-01.azurewebsites.net/WeatherForecast
```

## Troubleshooting

### Häufige Fehler

1. **CORS-Fehler**: API CORS-Konfiguration überprüfen
2. **Build-Fehler**: Node.js Version und Dependencies prüfen
3. **Deployment-Fehler**: Azure Credentials und Resource Group prüfen

### Debugging Commands
```bash
# Azure CLI Status
az account show

# App Service Logs
az webapp log tail --name "meine-wetter-app" --resource-group "meine-wetter-app-rg"

# Static Web App Logs
az staticwebapp logs show --name "meine-wetter-app" --resource-group "meine-wetter-app-rg"
```

## Nächste Schritte

1. ✅ App lokal testen
2. ✅ Auf Azure deployen
3. 🔄 Custom Domain konfigurieren (optional)
4. 🔄 SSL-Zertifikat einrichten
5. 🔄 Monitoring (Application Insights) hinzufügen
6. 🔄 CI/CD Pipeline optimieren

---

**Deine App sollte jetzt unter `https://meine-wetter-app.azurestaticapps.net` verfügbar sein! 🎉** 