# Firechat

Firechat is a lightweight chat application, bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and custom styling from [Tailwind CSS](https://tailwindcss.com/). A live version of this app is deployed at https://firechat-psi.vercel.app/

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Application Features

### Authentication

User authentication is handled by [Firebase Authention](https://firebase.google.com/docs/auth) using [Google Authentication](https://firebase.google.com/docs/auth/web/google-signin) as an authentication provider. Google Authentication was chosen to simplify the retrieval of profile images for users without requiring additional data storage complexity.

### Data Storage

Data storage is handled by the [Firebase Firestore Database](https://firebase.google.com/docs/firestore). The Firestore Database was chosen to eliminate the need to host a separate database. Firestore also simplifies the implementation of real-time component updates to database events.

### Important Packages

**[Firebase](https://firebase.google.com/docs)**

A module to interact with the Firebase Authentication and Firestore Database apis.

**[React Redux](https://react-redux.js.org/api/hooks)**

A state management library to handle global application state.

**[Redux Persist](https://github.com/rt2zz/redux-persist)**

A storage library to sync the redux store across browser refreshes.

**[React Router Dom](https://reactrouter.com/docs/en/v6/api)**

A routing library to handle client side navigation.

**[Tailwind CSS](https://tailwindcss.com/docs/)**

A CSS utility framework to incorporate css in JSX.

**[React Icons](https://react-icons.github.io/react-icons/)**

A React compatible icon library used throughout the application.
