## Feed On Their Blood

### How to run
* `npm run dev` in root directory to run backend with hot-reloading
* `npm start` in `frontend` to run frontend



### Supabase
* Must set app url and public anon key in `frontend/.env`
* Run docker (for WSL, start Docker for Windows on Windows) & start supabase with `npx supabase start`
* Link project: `npx supabase link --project-ref jgezxyzuccoxqonyqone`  (project id from url at supabase homepage)
* Generate types: `npx supabase gen types typescript --linked > src/api/database.types.ts` (run from /frontend)
  

### Planned features:
* Fighting NPCs (make use of HP and blood?)  [NPC vampires, werewolfs?, vampire hunters?]
* Fighting other Clans
* Add meaning to upgrading your lair
* Add coteries that give you passive income
