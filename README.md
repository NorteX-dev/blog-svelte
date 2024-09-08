### Shortened documentation:

This project is a simple blog application that allows users to create posts and view all posts.

### Stack used:

- SvelteKit - a full-stack framework handling both back-end work and serving front-end.
- Svelte - syntax to write front-end components.
- TailwindCSS - to simplify styling.
- PostgreSQL - my database of choice, but the app can run on any prisma supported.
- Prisma - database adapter.

## Back-end

The app has two APIs:
- The internal client-side API that serves the front-end. It is meant to be used client-side-only and is CSRF protected.
- A REST api serving JSON-only responses to external sources.


### Authentication
The rest API requires _bearer authentication_.

Pass the session cookie as a header:

`Authorization: Bearer yourauthkey`

You can obtain your authorization from the user dashboard, at the bottom of the page.

### REST API route table

| Method | URL            | Description               | Requires Auth? | Body                                                   | Extras                                      |
|--------|----------------|---------------------------|----------------|--------------------------------------------------------|---------------------------------------------|
| GET    | /api/posts     | Displays all posts.       | Yes            | n/a                                                    | Query param `?reverse=true` reverses order. |
| GET    | /api/posts/:id | Displays a single post.   | Yes            | n/a                                                    | -                                           |
| POST   | /api/posts     | Creates a new post.       | Yes            | `{ title: string; body: string; imageBase64: string?`  | -                                           |
| PUT    | /api/posts/:id | Partially updates a post. | Yes            | `{ title: string; body: string; imageBase64: string ?` | -                                           |
| DELETE | /api/posts/:id | Deletes a post.           | Yes            | n/a                                                    | -                                           |

## Running locally

### Set .env variables
Set all .env variables as applicable. They are:
- Discord OAuth2 key pair.
- Prisma DATABASE_URL.
- URL of the production app.

### Database

1. Set your preferred SQL RDBMS in prisma/schema.prisma. By default it's set to postgres.
2. Supply a DATABASE_URL in the .env file, like `postgresql://username:password@localhost:5432/database_name?schema=public`.
3. Run prisma migrations `npx prisma db push` or `npx prisma migrate dev` to create migrations.

### Make sure to add the return URL to the discord OAuth2 settings.
Go to https://discord.dev -> Applications -> Your app -> OAuth2 -> Redirects -> Add the production URL of your app + /login/discord/callback at the end.

### Front-end

Build the front-end `npm run build`. It works just like any other Vite-bundled project.
