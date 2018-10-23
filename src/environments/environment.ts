// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:3000/api',
  firebase: {
    apiKey: 'AIzaSyCPbhq6xRhiEA43f0jCQx54CsadqXhneBg',
    authDomain: 'angular-demo-20e7e.firebaseapp.com',
    databaseURL: 'https://angular-demo-20e7e.firebaseio.com',
    projectId: 'angular-demo-20e7e',
    storageBucket: 'angular-demo-20e7e.appspot.com',
    messagingSenderId: '587592630640'
  },
  DEFAULT_IMAGE_URL: 'https://firebasestorage.googleapis.com/v0/b/sweetpay-admin.appspot.com/o/images%2fdefault.png?alt=media&token=1819147e-7463-416c-b51a-11fde83353f1'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
