# Appointment Scheduling Frontend

A React prototype for doctor availability and patient appointment workflows.

## What this project demonstrates

Forms, component state and API service separation.

## Run locally

```bash
npm ci
npm start
```

Create React App normally serves the development app at `http://localhost:3000`.
`npm run build` produces a static build. The existing `npm test` script does not by itself establish application test coverage.

## Code guide

`src/Features/Appointments/` contains scheduling views; `src/Services/` wraps appointment and doctor requests; `src/Constants/Constants.js` holds the API configuration.

## Status

Frontend prototype. The backend is not included. Use synthetic appointment data for demonstrations.

Dependencies are recorded in `package-lock.json`. The original framework generation is retained; no claim of a current production dependency audit is made.
