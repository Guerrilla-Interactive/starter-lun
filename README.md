# Setup

1. Deploy to Vercel by clicking on the button below. This creates a git repo, connects it to vercel and creates the sanity project. 

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=http%3A%2F%2Fgithub.com%2FGuerrilla-Interactive%2Fstarter-lun&env=NEXT_PUBLIC_SITE_NAME&envDescription=You%20may%20set%20this%20to%20some%20random%20value%20and%20correct%20it%20when%20you%20need%20the%20appropriate%20service%20to%20work&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx)

1. Run `pnpm install` to install dependencies.

1. Clone the repo thus created. Run `vercel link` then `vercel env pull` to download the environment file.

1. Run `pnpm install` to install dependecies.

1. Run `pnpn dev` to start development server.

1. This project uses Tailwind and Typescript, with optional TRPC setup for API routes. See setup info for those below.

## Prettier

Open VSCode settings via `cmd+shift+p` and search for (`cmd+f`) `editor.formatOnSave` if found, make sure it's set to `true`. If not set, add it to the bottom of the settings object like this: `"editor.formatOnSave": true`

To test, try opening a file and do some changes and it should format it on save. If not seek more help :)

## ESlint

Open VSCode settings again via `cmd+shift+p` and search for (`cmd+f`) `editor.codeActionsOnSave`. Update or add the value to:

```
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "typescript"]
```

# Env

Enviroment variables are validated at build time. When adding enviroment variables you must update the schema in `/src/env/schema.mjs`

In order for preview to work you need to connfigure a Sanity token with read and write permissions.

To setup fathom simply add `NEXT_PUBLIC_FATHOM_ID` and `NEXT_PUBLIC_FATHOM_SITES` in your env file. The sites variable should be a url or comma separated list of urls like: `www.kult.design,kult.design`.

# Errors?

Wierd errors happen quite often, try to do a hard refresh and then restart the server before asking for help.

# Email

To display email templates run `pnpm email`. Note that, if you're running this for the first time, be patient with it as it might take longer than expected. Also note running `pnpm email` dowloads and sets up
a nextjs repo at `.react-email` at the root. You'll have to add the following lines to `.react-email/next.config.js` as follows:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    externalDir: true // compile files that are located next to the .react-email directory

    // 
    //  ADDED 
    // 
    serverComponentsExternalPackages: [
      '@react-email/components',
      '@react-email/render',
      '@react-email/tailwind',
    ],


  },
};

module.exports = nextConfig;
```


