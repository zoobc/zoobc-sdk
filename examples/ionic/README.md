# ionic

## Project setup
```
yarn install
```

## Running in Browser
From root of project :

```
cd examples\ionic\
ionic serve
```

## Running in Device using Ionic DevApp
First, download the Ionic DevApp. It is available in the iOS App Store as well as Google Play.
With DevApp installed, sign up or login to an Ionic Account.
Make sure the device running DevApp and the computer are on the same network, then run :

```
cd examples\ionic\
ionic cordova prepare
ionic serve --devapp
```