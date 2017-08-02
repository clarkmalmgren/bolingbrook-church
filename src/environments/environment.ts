// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,

  googleMapsApiKey : 'AIzaSyBlefC4kQQvhmlinHFGFjHdy3XjfpgTRUs',

  useBundledBackgroundVideo: true,

  firebaseConfig : {
    apiKey: 'AIzaSyBq1DN3NMR_8SMdfEYqoMn0xsUbPZoGOuI',
    authDomain: 'bolingbrook-church-beta.firebaseapp.com',
    databaseURL: 'https://bolingbrook-church-beta.firebaseio.com',
    storageBucket: 'bolingbrook-church-beta.appspot.com',
    messagingSenderId: '525536092170'
  }
};
