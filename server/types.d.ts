// -----------------------------------------------------------------------------
// Augment ServerOptions để chấp nhận sessionStore
// -----------------------------------------------------------------------------
import "@mathigon/studio/server/interfaces";
import MongoStore = require("connect-mongo");  // CommonJS import

type MongoSessionStore = ReturnType<typeof MongoStore.create>; // ✅

declare module "@mathigon/studio/server/interfaces" {
  interface ServerOptions {
    /** Optional session store (connect‑mongo) */
    sessionStore?: MongoSessionStore;
  }
}
