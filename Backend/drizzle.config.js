import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './Model/Database/drizzle',
  schema: './Model/Database/dbase/schema.js',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  studioPort:process.env.STUDIO_PORT
});