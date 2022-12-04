## Feed On Their Blood

### How to run
* `npm run dev` in root directory to run backend with hot-reloading
* `npm start` in `client` to run frontend



### Supabase
* Must set app url and public anon key in `client/.env`
* Link project: `npx supabase link --project-ref jgezxyzuccoxqonyqone`  (project id from url at supabase homepage)
* Generate types: `npx supabase gen types typescript --linked > src/lib/database.types.ts`
  