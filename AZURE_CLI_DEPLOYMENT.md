# 🚀 Azure CLI Deployment Guide

## ✅ Voraussetzungen
- Azure CLI installiert
- Azure Account
- React-App gebaut (`npm run build`)

## 🔐 Bei Azure anmelden
```bash
az login
```
- Browser öffnet sich automatisch
- Bei Azure anmelden
- Terminal zeigt Subscription-Info

## 📁 Resource Group erstellen
```bash
az group create \
  --name "meine-wetter-app-rg" \
  --location "West Europe"
```

## 🌐 Static Web App erstellen
```bash
az staticwebapp create \
  --name "meine-wetter-app" \
  --resource-group "meine-wetter-app-rg" \
  --location "West Europe" \
  --source . \
  --branch main \
  --app-location "/" \
  --output-location "build"
```

## 🔧 App konfigurieren

### Umgebungsvariable setzen
```bash
az staticwebapp appsettings set \
  --name "meine-wetter-app" \
  --resource-group "meine-wetter-app-rg" \
  --setting-names REACT_APP_API_BASE_URL="https://telebing-adekfugzf6dfbme0.canadacentral-01.azurewebsites.net/WeatherForecast"
```

### Deployment Token abrufen
```bash
az staticwebapp secrets set \
  --name "meine-wetter-app" \
  --resource-group "meine-wetter-app-rg" \
  --secret-name "deployment-token" \
  --secret-value "dein-token-hier"
```

## 📱 App-URL finden
```bash
az staticwebapp show \
  --name "meine-wetter-app" \
  --resource-group "meine-wetter-app-rg" \
  --query "defaultHostname" \
  --output tsv
```

## 🔄 Automatisches Deployment (Optional)

### GitHub Actions Setup
1. Repository Secrets hinzufügen:
   - `AZURE_STATIC_WEB_APPS_API_TOKEN`: Deployment Token
   - `REACT_APP_API_BASE_URL`: API URL

2. Code pushen:
   ```bash
   git add .
   git commit -m "Add Azure deployment"
   git push origin main
   ```

## 🧹 Aufräumen (Optional)
```bash
# Resource Group löschen (Vorsicht!)
az group delete \
  --name "meine-wetter-app-rg" \
  --yes
```

## 📋 Vollständiger Deployment-Befehl
```bash
# 1. Anmelden
az login

# 2. Resource Group erstellen
az group create --name "meine-wetter-app-rg" --location "West Europe"

# 3. Static Web App erstellen
az staticwebapp create \
  --name "meine-wetter-app" \
  --resource-group "meine-wetter-app-rg" \
  --location "West Europe" \
  --source . \
  --branch main \
  --app-location "/" \
  --output-location "build"

# 4. App-URL anzeigen
az staticwebapp show \
  --name "meine-wetter-app" \
  --resource-group "meine-wetter-app-rg" \
  --query "defaultHostname" \
  --output tsv
```

## 🎯 Nach dem Deployment
- App ist unter `https://meine-wetter-app.azurestaticapps.net` verfügbar
- HTTPS ist automatisch aktiviert
- Automatisches Scaling
- Global CDN

## 🐛 Troubleshooting

### Häufige Fehler:
1. **"az not found"**: Azure CLI neu installieren
2. **"Not logged in"**: `az login` ausführen
3. **"Resource group not found"**: Resource Group erstellen
4. **"Name already exists"**: Anderen Namen wählen

### Debugging:
```bash
# Azure CLI Status
az account show

# Resource Groups auflisten
az group list --output table

# Static Web Apps auflisten
az staticwebapp list --output table

# Logs anzeigen
az staticwebapp logs show \
  --name "meine-wetter-app" \
  --resource-group "meine-wetter-app-rg"
```

---

**🎉 Deine App läuft dann auf Azure!** 