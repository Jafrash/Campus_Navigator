# Campus Navigation System

An interactive **indoor navigation system** built with **Flutter Web + Leaflet-style mapping**, designed to help users seamlessly find the **shortest path between rooms across multiple floors**.  
Think of it as **Google Maps for campuses and buildings**, where GPS is unreliable indoors.

---

## ✨ Features
- 🔍 **Room Search** – Search rooms by ID or name with smart matching  
- 🏢 **Multi-Floor Navigation** – Switch between floors (stairs/lifts supported)  
- 📐 **Shortest Path Routing** – Uses **Dijkstra** / **A\*** algorithm for optimal navigation  
- 🗺 **Interactive Map** – Render rooms, hallways, and paths using polygons and polylines  
- 🎨 **Room Highlighting** – Highlights searched rooms dynamically  
- 📊 **Custom JSON Schema** – Flexible structure for rooms, nodes, edges, connectors  
- 🛠 **JSON Map Maker Tool** – Built with **JavaScript + Leaflet** to annotate floorplans and export JSON  
- 📱 **Cross-Platform** – Runs on **Web, Desktop, Mobile browsers** (thanks to Flutter)  
- 📦 **PWA Support** – Installable & works offline with Service Workers  

---

## 🏗 Tech Stack
- **Frontend/UI:** Flutter (Dart), Flutter Web  
- **Mapping:** `flutter_map` (Leaflet-style), CanvasKit (Skia)  
- **Data:** JSON-based floorplans (rooms, nodes, edges)  
- **Algorithms:** Dijkstra’s Algorithm, A* Algorithm, Centroid Projection  
- **Web App (PWA):** Service Worker (`flutter_service_worker.js`), `manifest.json`  
- **Tools:**  
  - JSON Map Maker (JavaScript + Leaflet + HTML/CSS)  
  - Versioning with `version.json`  


---


---

## 🚀 Getting Started

### Prerequisites
- Install [Flutter SDK](https://docs.flutter.dev/get-started/install) (latest stable)  
- Ensure you have `dart` and `flutter` in your PATH  
- Browser (Chrome/Edge/Firefox) for Flutter Web preview  

### Clone Repo
```bash
git clone https://github.com/your-username/campus-navigation-system.git
cd campus-navigation-system
```
### Install Dependencies
```bash
flutter pub get
```

### Run in Debug (Web)
```bash
flutter run -d chrome
```

### flutter build web
```bash
flutter build web
```


