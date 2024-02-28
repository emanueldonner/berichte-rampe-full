# API-Routen Dokumentation

## POST /upload - Dokument hochladen

**Beschreibung:**  
Diese Route ermöglicht das Hochladen von Dokumenten. Es werden nur Word-Dokumente (`application/vnd.openxmlformats-officedocument.wordprocessingml.document`) akzeptiert.

### Anfrage:

- **Body** (`multipart/form-data`): Enthält das zu hochladende Dateiobjekt.

### Antworten:

- **200 OK** - Dokument erfolgreich hochgeladen.
  - **Body**:
    ```json
    {
    	"message": "Dokument erfolgreich hochgeladen.",
    	"status": "success",
    	"path": "Pfad, unter dem das Dokument gespeichert wurde",
    	"filename": "Name der hochgeladenen Datei"
    }
    ```
- **500 Internal Server Error** - Fehler beim Hochladen.
  - **Body**:
    ```json
    {
    	"message": "Beschreibung des aufgetretenen Fehlers"
    }
    ```

---

## POST /parse - Dokument parsen und verarbeiten

**Beschreibung:**  
Verarbeitet hochgeladene Dokumente, indem es sie parsed und für die weitere Verarbeitung vorbereitet. Unterstützt die Modi "preview" und "build".

### Anfrage:

- **Body** (`application/json`):
  ```json
  {
  	"mode": "Modus der Verarbeitung, entweder 'preview' oder 'build'",
  	"filename": "Name der Datei, die verarbeitet werden soll",
  	"dirPath": "Pfad zum Verzeichnis, in dem das Dokument gespeichert ist und verarbeitet wird"
  }
  ```

### Antworten:

- **200 OK** - Dokument erfolgreich verarbeitet.
  - **Body**:
    ```json
    {
    	"message": "Dokument erfolgreich verarbeitet.",
    	"status": "success",
    	"path": "Pfad des Verarbeitungsverzeichnisses",
    	"pathName": "Basisname des Verarbeitungspfades"
    }
    ```
- **500 Internal Server Error** - Fehler bei der Verarbeitung.
  - **Body**:
    ```json
    {
    	"message": "Beschreibung des aufgetretenen Fehlers"
    }
    ```

## GET /preview/:report/\* - Spezifischen Bericht vorschauen

**Beschreibung:**  
Stellt eine Vorschau eines spezifischen Berichts zur Verfügung. Unterstützt das Durchsuchen von Unterpfaden innerhalb des Berichtsverzeichnisses.

### Anfrage:

- **Parameter**:
  - `report`: Identifikator des Berichts.
  - `*`: Optionaler Unterpfad innerhalb des Berichtsverzeichnisses. Wenn nicht angegeben, wird standardmäßig `index.html` verwendet.

### Antworten:

- **200 OK** - Erfolgreiche Vorschau des Berichts.
  - **Body**: Inhalt der angeforderten Datei mit entsprechendem MIME-Type.
- **404 Not Found** - Bericht oder spezifizierte Datei nicht gefunden.
  - **Body**:
    ```json
    {
    	"error": "File not found"
    }
    ```
- **500 Internal Server Error** - Fehler bei der Verarbeitung der Anfrage.
  - **Body**:
    ```json
    {
    	"error": "Beschreibung des aufgetretenen Fehlers"
    }
    ```

## POST /compress - Verzeichnisse komprimieren

**Beschreibung:**  
Startet die Komprimierung eines spezifischen Verzeichnisses in eine ZIP-Datei.

### Anfrage:

- **Body** (`application/json`):
  - `path`: Vollständiger Pfad des zu komprimierenden Verzeichnisses.

### Antworten:

- **200 OK** - ZIP-Komprimierung erfolgreich.
  - **Body**:
    ```json
    {
    	"message": "Zip-Datei erfolgreich erstellt.",
    	"zipUrl": "Pfad der erstellten Zip-Datei"
    }
    ```
- **500 Internal Server Error** - Fehler bei der Komprimierung.
  - **Body**:
    ```json
    {
    	"error": "ZIP-Komprimierung fehlgeschlagen."
    }
    ```

## GET /download - Erstellte ZIP-Datei herunterladen

**Beschreibung:**  
Ermöglicht den Download einer zuvor erstellten ZIP-Datei.

### Anfrage:

- **Query Parameters**:
  - `zipLocation`: Standort der zu herunterladenden ZIP-Datei.

### Antworten:

- **200 OK** - Startet den Download der ZIP-Datei.
- **404 Not Found** - ZIP-Datei nicht gefunden.
  - **Body**:
    ```json
    {
    	"error": "File not found."
    }
    ```
- **500 Internal Server Error** - Fehler beim Download.
  - **Body**:
    ```json
    {
    	"error": "Failed to download the file."
    }
    ```
