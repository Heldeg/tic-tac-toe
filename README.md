# 🎮 Tic-Tac-Toe (Triqui) - React Native

Minijuego multiplataforma desarrollado con React Native y Expo. Este proyecto implementa una partida clásica de Tres en Raya con 3 niveles de dificultad, gestión de perfiles de usuario y configuración, todo persistido localmente.

## 🚀 Características Principales

- **Juego Interactivo:** 3 niveles de dificultad para desafiar al jugador.
- **Navegación Avanzada:** Uso de `Expo Router` implementando navegación por pestañas (Tabs) y apilamiento (Stack).
- **Persistencia de Datos:** Uso de `expo-sqlite` para almacenar las preferencias de dificultad y el perfil del usuario.
- **Arquitectura Limpia:** Estructura modular separando la capa de presentación (UI) de la lógica de dominio y datos.

## 📁 Estructura del Proyecto

El proyecto sigue principios de Clean Architecture:

- `/app`: Rutas y vistas de la aplicación (UI) utilizando Expo Router.
- `/components`: Componentes visuales reutilizables.
- `/domain`: Lógica de negocio y acceso a datos.
  - `/data`: DAOs, Entidades, Configuración local de SQLite y Mappers.
  - `/model`: Modelos puros de dominio.
  - `/repository`: Interfaces y abstracción del acceso a datos.
- `/hooks`: Custom hooks de React para encapsular lógica compleja.

## 🛠️ Requisitos Previos

- [Node.js](https://nodejs.org/) instalado.
- Aplicación **Expo Go** instalada en tu dispositivo móvil (Android/iOS) para pruebas.

## 🏃‍♂️ Instrucciones de Instalación y Uso

1. Instala las dependencias del proyecto:

   ```bash
   npm install

```bash

2. Inicia el servidor de desarrollo:

```bash
npx expo start

```

3. Escanea el código QR que aparece en la terminal con la aplicación **Expo Go** en tu dispositivo móvil.