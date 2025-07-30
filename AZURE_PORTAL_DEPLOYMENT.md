# 🌐 Azure Portal Deployment Guide

## ✅ Vorbereitung abgeschlossen
- ✅ React-App gebaut (`npm run build`)
- ✅ Build-Ordner erstellt

## 🚀 Azure Portal Deployment

### Schritt 1: Azure Portal öffnen
1. Gehe zu [portal.azure.com](https://portal.azure.com)
2. Melde dich mit deinem Azure-Account an

### Schritt 2: Static Web App erstellen
1. **"Create a resource"** klicken
2. **"Static Web App"** suchen und auswählen
3. **"Create"** klicken

### Schritt 3: Grundlegende Einstellungen
```
Subscription: Dein Azure Subscription
Resource Group: Neue erstellen oder bestehende wählen
Name: "meine-wetter-app" (oder gewünschter Name)
Region: "West Europe" (oder näheste Region)
```

### Schritt 4: Build-Details
```
Build Details:
- Build Preset: "React"
- App location: "/"
- Output location: "build"
- API location: (leer lassen)
```

### Schritt 5: Review & Create
1. **"Review + create"** klicken
2. **"Create"** klicken
3. Warte auf die Bereitstellung (2-3 Minuten)

### Schritt 6: Deployment
1. Nach der Bereitstellung auf **"Go to resource"** klicken
2. Im linken Menü auf **"Source control"** klicken
3. **"Local Git/FTPS credentials"** wählen
4. **"Manage deployment token"** klicken
5. **Token kopieren** (wird für GitHub Actions benötigt)

## 🔧 App konfigurieren

### Schritt 7: App-Einstellungen
1. Im linken Menü auf **"Configuration"** klicken
2. **"Application settings"** Tab
3. **"Add"** klicken für neue Einstellung:
   ```
   Name: REACT_APP_API_BASE_URL
   Value: https://telebing-adekfugzf6dfbme0.canadacentral-01.azurewebsites.net/WeatherForecast
   ```

### Schritt 8: CORS konfigurieren
1. Im linken Menü auf **"API"** klicken
2. **"CORS"** Tab
3. **"Add"** für neue CORS-Regel:
   ```
   Allowed origins: https://meine-wetter-app.azurestaticapps.net
   Allowed methods: GET, POST, PUT, DELETE
   Allowed headers: *
   ```

## 📱 App testen

### Schritt 9: URL finden
1. Im **"Overview"** Tab
2. **"URL"** kopieren (z.B. `https://meine-wetter-app.azurestaticapps.net`)

### Schritt 10: App öffnen
1. URL im Browser öffnen
2. App sollte Wetterdaten von deiner API anzeigen

## 🔄 Automatisches Deployment (Optional)

### GitHub Actions Setup
1. Gehe zu deinem GitHub Repository
2. **Settings** → **Secrets and variables** → **Actions**
3. **"New repository secret"** hinzufügen:
   ```
   Name: AZURE_STATIC_WEB_APPS_API_TOKEN
   Value: [Deployment Token von Schritt 6]
   ```

4. **"New repository secret"** hinzufügen:
   ```
   Name: REACT_APP_API_BASE_URL
   Value: https://telebing-adekfugzf6dfbme0.canadacentral-01.azurewebsites.net/WeatherForecast
   ```

5. Code pushen:
   ```bash
   git add .
   git commit -m "Add Azure deployment configuration"
   git push origin main
   ```

## 🎯 Nächste Schritte

1. ✅ **App ist live**: Deine Wetter-App läuft auf Azure!
2. 🔄 **Custom Domain**: Optional eine eigene Domain hinzufügen
3. 🔄 **SSL**: HTTPS ist automatisch aktiviert
4. 🔄 **Monitoring**: Azure Application Insights hinzufügen

## 🐛 Troubleshooting

### Häufige Probleme:
1. **App lädt nicht**: Build-Ordner überprüfen
2. **API-Fehler**: CORS-Konfiguration prüfen
3. **Deployment-Fehler**: Token und Einstellungen überprüfen

### Debugging:
- **Logs anzeigen**: Static Web App → Monitoring → Logs
- **Build-Logs**: Source control → Build history

---

**🎉 Glückwunsch! Deine React-App läuft jetzt auf Azure!** 