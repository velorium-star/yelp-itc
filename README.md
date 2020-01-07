# Search Yelp!

Mobile first Ionic demo application

## How to run

**npm install** - installs required libraries
**ionic serve** - starts application
**npm run test** - run in different terminal instance to start tests in headless mode.

You can find application deployed at [https://yelp-search-4de3f.firebaseapp.com/](https://yelp-search-4de3f.firebaseapp.com/)

## Notable technical examples

- Ionic framework usage
- Deploying on Firebase
- CodeceptJS tests using protractor and webdriver with headless chromium testing
- Proxy on development environment
- Proxy on production environment (using Heroku proxy to avoid CORS issues)
- RxJS operators
- General error handling
- Http interceptor
- Location api
- Storing data to local storage
- Success and error notifications
- Custom pipes
- Supports positioning and manually selected location
- Infinite virtual scrolling
- Skeleton elements
- Auto search with debouncing
- Async pipe in components

## Remarks

The application works in two modes:

**Current location** uses location API and user will be prompted for permissions. The search hits will be shown according to your current position.

**Custom location** allows the user to give manually location name, for example New York or NYC, and searches will show hits from that location only.

Selected option will be remembered next time the application is started.
