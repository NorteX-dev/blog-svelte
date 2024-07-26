# Premier Studios Demo Trial project
### Shortened documentation

This project is a demo trial project for Premier Studios. It is a simple blog application that allows users to create posts and view all posts.

### Visit the deployed page
URL: pending

To login on a regular account use,
> Username: demo, Password: demo

To login on an admin account use,
> Username: admin, Password: admin

You can also register an account yourself by visiting `/register` or following the links.

### Technologies used in this trial

- SvelteKit - a full-stack framework handling both back-end work and serving front-end.
- Svelte - syntax to write front-end components.
- TailwindCSS - to simplify styling.
- PostgreSQL - my database of choice, but the app can run on any prisma supported.
- Prisma - database adapter.

## Back-end

The app has two APIs:
- the client-side API that serves the front-end
- a REST api serving JSON-only responses

### Authentication
Both APIs require _session cookie authentication,_ even the JSON one.

Pass the session cookie as a header:

`Cookie = auth_session:tipe3plnyfmhlrxtojjxxxxxxxxxxxxxxx`

You can obtain your auth session cookie from the browser Application tab in DevTools.

### Let me know if you want me to make a better system for authenticating the JSON api, like per-user api keys.

### REST API route table

| Method | URL            | Description               | Requires Auth? | Extras                                     |
|--------|----------------|---------------------------|----------------|--------------------------------------------|
| GET    | /api/posts     | Displays all posts.       | Yes            |                                            |
| GET    | /api/posts/:id | Displays a single post.   | Yes            |                                            |
| POST   | /api/posts     | Creates a new post.       | Yes            | Query param ?reserved=true reverses order. |
| PUT    | /api/posts/:id | Partially updates a post. | Yes            |                                            |
| DELETE | /api/posts/:id | Deletes a post.           | Yes            |                                            |

## Running locally

### Database

1. Set your preferred SQL RDBMS in prisma/schema.prisma. By default it's set to postgres.
2. Supply a DATABASE_URL in the .env file, like `postgresql://username:password@localhost:5432/database_name?schema=public`.
3. Run prisma migrations `npx prisma db push` or `npx prisma migrate dev` to create migrations.

### Front-end

Build the front-end `npm run build`. It works just like any other Vite-bundled project.


### Thank you for considering my application.
