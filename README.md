# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `firebase init`

Initializes Firebase app. Choose "Firestore", "Hosting" and "Storage" for correct work.\
Pick the `build` folder except the `public` one.\

## Do not accept overwriting of `index.html` !!!

### `firebase deploy` 

Deploys your app to Firebase hosting.

### `npm run deploy`

You can use this script after initializing your Firebase app. This script includes `npm run build` and `firebase deploy`.
