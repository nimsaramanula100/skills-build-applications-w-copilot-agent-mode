# OctoFit Tracker presentation tier

The presentation tier uses React 19, Vite, React Router, and Bootstrap.

## API configuration

Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` when
running the frontend in GitHub Codespaces:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite reads this value through `import.meta.env.VITE_CODESPACE_NAME`; the frontend
uses it to call `https://<codespace-name>-8000.app.github.dev`. If it is unset
(or is not a valid Codespace name), the API URL safely falls back to
`http://localhost:8000` for local development. Restart the Vite dev server after
changing the environment file.
