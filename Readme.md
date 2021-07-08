# Basic Fit App

## Setup

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app), using a typescript template: `react-native-template-typescript`

## Terminal command

### `npm install`

Installs package dependencies


## Available Scripts

### `npm run start`

Runs metro server

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator.


## Writing and Running Tests

### Unit/Integration testing

####`npm run test`


### End to End testing

#### Build

IOS: `npm run detox-ios-build`
\
\
Android: `npm run detox-android-build`

#### Run

IOS: `npm run detox-ios`
\
\
Android: `npm run detox-android`


## Tips (development)

### Attach debugger (VSCode)

- Start metro server -> `npm run start`.
- Launch the app -> `npm run ios/android` or launching it throught Android Studio or XCode.
- VSCode - debug -> run `Attach debugger` config.
- Open `React Native Debug Menu` in your simulator/device.
- Click the option `Debug`.
- Debug your code!.