const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");

const HttpError = require("./HttpError");
const asyncHandler = require("./asyncHandler");

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    projectId: "banking-app-40444",
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
});

const firebaseAuthMiddleware = () =>
  asyncHandler(async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || "";
      const [type, idToken] = authHeader.split(" ");

      if (type !== "Bearer") {
        throw new Error("Invalid token in authorization header");
      }

      const decodedToken = await getAuth().verifyIdToken(idToken);

      // check if user exists
      await getAuth().getUserByEmail(decodedToken.email);

      req.user = decodedToken;

      next();
    } catch (err) {
      console.log(err);
      next(new HttpError("Unauthenticated", 401), req, res, next);
    }
  });

module.exports = { firebaseAuthMiddleware };
