# Task Management App with Ionic and Angular

This project is a task management application built using Ionic and Angular frameworks, integrated with Firebase for authentication and data storage.

The Task Management App allows users to create, update, and delete tasks, providing a seamless and efficient way to organize daily activities. It leverages the power of Ionic for cross-platform mobile development and Angular for robust web application architecture.

## Git and GitHub Workflow

This section explains how to work with Git and GitHub for the Task Management App repository: https://github.com/JuanseSues/TaskApp

### Cloning the Repository

To get started with the project, clone the repository to your local machine:

```
git clone https://github.com/JuanseSues/TaskApp.git
cd TaskApp
```


### Creating a Pull Request

1. Go to the GitHub repository page: https://github.com/JuanseSues/TaskApp
2. Click on "Pull requests" and then "New pull request"


## Repository Structure

```
.
├── src/
│   ├── app/
│   │   ├── guards/
│   │   ├── models/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── shared/
│   │   └── utils/
│   ├── environments/
│   └── theme/
├── android/
├── ios/
├── angular.json
├── capacitor.config.ts
├── ionic.config.json
├── karma.conf.js
├── package.json
└── tsconfig.json
```

### Key Files

- `src/main.ts`: Entry point of the application
- `src/app/app.module.ts`: Main Angular module with Firebase configuration
- `src/environments/environment.ts`: Environment configuration file
- `angular.json`: Angular CLI configuration file
- `ionic.config.json`: Ionic configuration file

### Important Integration Points

- Firebase Authentication: Integrated in `src/app/app.module.ts`
- Firestore Database: Used for storing and retrieving tasks

## Usage Instructions

### Installation

Prerequisites:
- Node.js (v14.x or later)
- npm (v6.x or later)
- Ionic CLI (v6.x or later)

Steps:
1. Clone the repository
2. Run `npm install` to install dependencies
3. Set up a Firebase project and update the configuration in `src/environments/environment.ts`

### Getting Started

1. Run `ionic serve` to start the development server
2. Navigate to `http://localhost:8100` in your browser

### Configuration Options

- Firebase configuration: Update `firebaseConfig` in `src/environments/environment.ts`
- Ionic configuration: Modify `ionic.config.json` for project-specific settings

### Common Use Cases

1. Adding a new task:
```typescript
addOrUpdateTask() {
  // Implementation in src/app/pages/tabs/home/home.page.ts
}
```

2. Deleting a task:
```typescript
deleteTask(task: Task) {
  // Implementation in src/app/pages/tabs/home/home.page.ts
}
```

### Testing & Quality

Run `ng test` to execute the unit tests via Karma.

## Compiling and Executing the App

### Android

#### Compiling for Android

1. Ensure you have Android Studio and the Android SDK installed.
2. Run `ionic capacitor add android` to add the Android platform if not already added.
3. Run `ionic capacitor sync android` to sync your app with the Android project.
4. Run `ionic capacitor build android` to compile the app for Android.

#### Running on Android Emulator

1. Open Android Studio and launch an emulator.
2. Run `ionic capacitor run android` to build and run the app on the emulator.

#### Running on Android Device

1. Enable USB debugging on your Android device.
2. Connect your device to your computer via USB.
3. Run `ionic capacitor run android --device` to build and run the app on your connected device.

### iOS

#### Compiling for iOS

1. Ensure you have Xcode installed (Mac only).
2. Run `ionic capacitor add ios` to add the iOS platform if not already added.
3. Run `ionic capacitor sync ios` to sync your app with the iOS project.
4. Run `ionic capacitor build ios` to compile the app for iOS.

#### Running on iOS Simulator

1. Run `ionic capacitor run ios` to build and run the app on the iOS simulator.

#### Running on iOS Device

1. Open the iOS project in Xcode by running `ionic capacitor open ios`.
2. In Xcode, select your connected iOS device as the run target.
3. Click the play button or press Cmd+R to build and run the app on your device.

Note: For iOS, you'll need an Apple Developer account to run the app on a physical device.

### Troubleshooting

1. Firebase Authentication Issues:
   - Problem: User unable to sign in
   - Error message: "Firebase: Error (auth/invalid-credential)"
   - Diagnostic process:
     1. Check Firebase configuration in `environment.ts`
     2. Verify Firebase project settings in Firebase Console
   - Debug mode: Enable verbose logging in Firebase by adding `firebase.setLogLevel('debug')` in `app.module.ts`
   - Expected outcome: Successful user authentication

2. Task List Not Updating:
   - Problem: New tasks not appearing in the list
   - Diagnostic process:
     1. Check Firestore rules in Firebase Console
     2. Verify `getTasks()` method in `home.page.ts`
   - Debug steps:
     1. Add console logs in `getTasks()` method
     2. Check browser console for any errors
   - Expected outcome: Real-time updates of task list

### Performance Optimization

- Metrics to monitor:
  1. Initial load time
  2. Task list rendering time
- Profiling command: `ionic serve --prod`
- Baseline expectations:
  - Initial load: < 3 seconds
  - Task list update: < 500ms
- Common bottlenecks:
  1. Excessive Firebase reads
  2. Large image assets
  
Solutions:
- Implement lazy loading for pages
- Use Firebase query limits and pagination

## Data Flow

The Task Management App follows a unidirectional data flow pattern. Here's an overview of how data flows through the application:

1. User Authentication:
   - User credentials -> Firebase Auth -> User object
   - User object stored in local storage

2. Task Management:
   - Create/Update Task:
     User input -> Component -> Firebase Service -> Firestore
   - Read Tasks:
     Firestore -> Firebase Service -> Component -> View
   - Delete Task:
     User action -> Component -> Firebase Service -> Firestore

3. State Management:
   - Application state managed by Angular services
   - Real-time updates using Firestore listeners

```
[User Interface] <-> [Angular Components] <-> [Services] <-> [Firebase/Firestore]
       ^                     |                   ^
       |                     v                   |
    [Local Storage]    [State Management]   [Environment Config]
```

Note: Ensure proper error handling and loading states are implemented throughout the data flow to enhance user experience.

## Infrastructure

The application utilizes Firebase for backend services. Key infrastructure components include:

- Firebase Authentication:
  - Type: Authentication service
  - Purpose: Manage user authentication and session handling

- Firestore:
  - Type: NoSQL database
  - Purpose: Store and sync task data in real-time

- Angular Fire:
  - Type: Angular library
  - Purpose: Provides Angular bindings for Firebase services

These components are configured in the `AppModule` (`src/app/app.module.ts`):

```typescript
@NgModule({
  // ...
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  // ...
})
export class AppModule {}
```

Ensure that the Firebase configuration in `src/environments/environment.ts` is correctly set up for the application to function properly.

## Enlaces de descarga de APK

Puedes descargar el archivo APK desde el siguiente enlace:

- [Descargar APK para Android](https://drive.google.com/file/d/1HL-Kj7nmMRPBqDUbBZ4IYO2OkJcX9Vbz/view?usp=sharing)


## Respuestas a las siguientes preguntas:
o ¿Cuáles fueron los principales desafíos que enfrentaste al implementar
las nuevas funcionalidades?

Primero debo decir que tuve problemas personales.

Feature Flag Implementation:
Poca familiaridad con este feature, sin embargo, lo que más se me complicó fue que nunca había manejado ionic, aún así, aprendí, no me pareció tan difícil y lo implemente correctamente.

IOS
No tengo máquina para generar el IPA.

No quiero generar excusas, quiero ser absolutamente sincero, porque creo que tengo las ha+ábilidades para realizar cualquier tipo de proyecto y de no tenerlas, considero también que soy una persona que me gusta aprender y aprendo muy bien y de forma rápida.


o ¿Qué técnicas de optimización de rendimiento aplicaste y por qué?

Uso de Observables y operadores de RxJS:
Se utiliza el operador map de RxJS para transformar el estado de autenticación obtenido de this.firebaseSvc.getAuthState(). Esto permite manejar de manera eficiente los flujos de datos asíncronos y realizar transformaciones sin bloquear el hilo principal.

Carga perezosa (Lazy Loading):

El uso de RouterModule.forChild(routes) permite que el módulo de enrutamiento de la página de registro (SignUpPage) se cargue solo cuando se navega a esa ruta específica. Esto reduce el tiempo de carga inicial de la aplicación al cargar solo los módulos necesarios en el momento adecuado.

Modularización:

Al definir rutas específicas en un módulo separado (SignUpPageRoutingModule), se mejora la organización del código y se facilita el mantenimiento. Esto también permite que Angular optimice la carga de módulos y componentes de manera más eficiente.

Validación de formularios reactivos:

Se utiliza FormGroup y FormControl para definir y gestionar el formulario de registro de manera reactiva. Esto permite una validación eficiente y en tiempo real de los campos del formulario, mejorando la experiencia del usuario al proporcionar retroalimentación inmediata.
Validadores personalizados:

La implementación de validadores personalizados, como el validador de confirmación de contraseña, asegura que las reglas de validación específicas se apliquen correctamente. Esto reduce la necesidad de validaciones adicionales en el backend, mejorando el rendimiento general de la aplicación.
Inyección de dependencias:

El uso de la inyección de dependencias para servicios como FirebaseService y UtilsService permite una gestión eficiente de los servicios y facilita la reutilización del código. Esto mejora la modularidad y mantenibilidad del código.

Operaciones asíncronas con async/await:

El uso de async/await para manejar operaciones asíncronas, como la presentación del modal, asegura que el código sea más legible y manejable. Esto también permite una mejor gestión de las promesas y evita bloqueos en el hilo principal.

o ¿Cómo aseguraste la calidad y mantenibilidad del código?

Documentación y comentarios:

Se incluyen comentarios detallados y documentación para los métodos, explicando su propósito y los parámetros que reciben. Esto mejora la comprensión del código y facilita su mantenimiento.

Tipado estricto:

Se utilizan tipos estrictos para los parámetros y los valores de retorno de los métodos ejemplo (Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree>), lo que ayuda a prevenir errores y mejora la robustez del código.

Modularización de métodos:

Se han definido métodos específicos para cada funcionalidad (getUser, getPercetage, addOrUpdateTask). Esto mejora la claridad y la organización del código, facilitando su mantenimiento y comprensión.
Uso de servicios utilitarios:

Se utiliza utilSvc para manejar operaciones comunes como obtener elementos del almacenamiento local y calcular porcentajes. Esto promueve la reutilización del código y reduce la duplicación, facilitando el mantenimiento.


## Git and GitHub Workflow

This section explains how to work with Git and GitHub for the Task Management App repository: https://github.com/JuanseSues/TaskApp

### Cloning the Repository

To get started with the project, clone the repository to your local machine:

```
git clone https://github.com/JuanseSues/TaskApp.git
cd TaskApp
```


### Creating a Pull Request

1. Go to the GitHub repository page: https://github.com/JuanseSues/TaskApp
2. Click on "Pull requests" and then "New pull request"


