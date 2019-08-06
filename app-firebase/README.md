# Owl Firebase Application Template

This is a very basic skeleton to start an Owl application. This includes:

- _owl_ (until it is available on `npm`),
- a dev server,
- webpack configuration
- live reload
- a test suite
- various authentication routes
- a full working authentication flow with Firebase

## Getting started

1. copy this template wherever you need it
2. edit the `package.json` file with proper name, author, description, ...
3. `npm install` to install every dependency needed
4. Create a firebase application on Google
5. Copy the firebase API keys in a `.env` file:

```
    API_KEY=XXXXXXXXXXXXXXXXXXXX
    AUTH_DOMAIN=XXXXXXXXXXXXXXXXXXXX
    DATABASE_URL=https://XXXXXXXXXXXXXXXXXXXX.firebaseio.com
    PROJECT_ID=XXXXXXXXXXXXXXXXXXXX
    STORAGE_BUCKET=XXXXXXXXXXXXXXXXXXXX
    MESSAGING_SENDER_ID=XXXXXXXXXXXXXXXXXXXX
    APP_ID=XXXXXXXXXXXXXXXXXXXX
```

Then you can run the `build` or `dev` scripts...

## Scripts

| Command         | Description                               |
| --------------- | ----------------------------------------- |
| `npm run build` | build the application (in `dist/` folder) |
| `npm run dev`   | starts a dev server                       |
| `npm run test`  | run the jest test suite                   |
