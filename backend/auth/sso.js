// Import necessary modules
const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

// Define the configuration for the Microsoft strategy
const config = {
  identityMetadata: 'https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration',
  clientID: process.env.CLIENT_ID,
  responseType: 'code id_token',
  responseMode: 'form_post',
  redirectUrl: process.env.REDIRECT_URL,
  allowHttpForRedirectUrl: true,
  clientSecret: process.env.CLIENT_SECRET,
  validateIssuer: false,
  passReqToCallback: false,
  scope: ['profile', 'offline_access', 'https://graph.microsoft.com/mail.read'],
  loggingLevel: 'info',
  nonceLifetime: null,
  nonceMaxAmount: 5,
  useCookieInsteadOfSession: true,
  cookieEncryptionKeys: [
    { 'key': '12345678901234567890123456789012', 'iv': '123456789012' },
    { 'key': 'abcdefghijklmnopqrstuvwxyzabcdef', 'iv': 'abcdefghijkl' }
  ],
  clockSkew: null,
};

// Use the OIDC strategy
passport.use(new OIDCStrategy(config,
  function(iss, sub, profile, accessToken, refreshToken, done) {
    if (!profile) {
      return done(new Error("No profile found"), null);
    }
    // Here you would typically find or create a user in your database
    return done(null, profile);
  }
));

// Serialize user into the sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});

// Deserialize user from the sessions
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Export the configured passport
module.exports = passport;
