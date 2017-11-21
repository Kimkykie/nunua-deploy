const config = {
  apiKey: 'AIzaSyCNanfZEbn0m0PNRE-UxkwIrDFiCDWfRF8',
  authDomain: 'nunua-bet.firebaseapp.com',
  databaseURL: 'https://nunua-bet.firebaseio.com',
  projectId: 'nunua-bet',
  storageBucket: 'nunua-bet.appspot.com',
  messagingSenderId: '515605342765',
};
firebase.initializeApp(config);

const uiConfig = {
  signInSuccessUrl: '/register',
  signInOptions: [
    {
      // Leave the lines as is for the providers you want to offer your users.
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        size: 'normal', // 'invisible' or 'compact'
        badge: 'bottomleft', // ' bottomright' or 'inline' applies to invisible.
      },
      defaultCountry: 'KE', // Set default country to the United Kingdom (+44).
    },
  ],
  // Terms of service url.
  tosUrl: 'https://nunuatips.com/terms',
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);
