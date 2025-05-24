import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

export interface User {
  id: number;
  username: string;
  passwordHash: string;
  role: 'candidate' | 'officer';
}

export interface Application {
  id: number;
  userId: number;
  battletag: string;
  charName: string;
  realm: string;
  charClass: string;
  spec: string;
  desiredRole: string;
  experience?: string;
  ui?: string;
  addons?: string;
  availability: string;
  reason: string;
  referral?: string;
  status: string;
  officerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

let db: Database<sqlite3.Database, sqlite3.Statement>;

export const initDb = async () => {
  db = await open({
    filename: path.join(process.cwd(), 'guild.db'),
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      role TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      battletag TEXT NOT NULL,
      charName TEXT NOT NULL,
      realm TEXT NOT NULL,
      charClass TEXT NOT NULL,
      spec TEXT NOT NULL,
      desiredRole TEXT NOT NULL,
      experience TEXT,
      ui TEXT,
      addons TEXT,
      availability TEXT NOT NULL,
      reason TEXT NOT NULL,
      referral TEXT,
      status TEXT NOT NULL,
      officerNotes TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY(userId) REFERENCES users(id)
    );
  `);
};

export const getDb = () => db;
