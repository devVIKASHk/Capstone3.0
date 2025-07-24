import { int, mysqlTable, serial, varchar,boolean ,timestamp,text,bigint, mysqlEnum} from 'drizzle-orm/mysql-core';
import {env} from '../../../zodValidation/envValidation.js';

export const usersTable = mysqlTable(env.REGISTRATION_TABLE_NAME, {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }),
  isEmailVerified: boolean('is_email_verified').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),

});





export const sessionTable = mysqlTable(env.SESSIONID_TABLE_NAME,{
  id:serial('_id').primaryKey(),
  valid:boolean().default(true).notNull(),
  ipAddress:varchar('ip_address',{length:45}).notNull(),
  userAgent:text('user_agent').notNull(),
  userId:bigint('user_id',{mode: 'number',unsigned:true}).references(()=>usersTable.id,{onDelete:'cascade',onUpdate:'cascade'}).notNull(),
  createdAt:timestamp('created_at').defaultNow().notNull(),
  updatedAt:timestamp('updated_at').onUpdateNow().defaultNow().notNull()

})

export const googleAuthTable = mysqlTable(env.GOOGLE_AUTH_TABLE,
  {
    id:serial('_id').primaryKey(),
    provider:mysqlEnum('auth_provider',['google','github','facebook']).notNull(),
    providerId:varchar('provider_id',{length:255}).unique().notNull(),
    userId:bigint('user_id',{mode:'number',unsigned:true}).references(()=>usersTable.id,{onDelete:'cascade',onUpdate:'cascade'}).notNull(),
    createdAt:timestamp('created_at').defaultNow().notNull(),
  }
)

