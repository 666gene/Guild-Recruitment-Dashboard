import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { initDb, getDb, User, Application } from './db';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

app.use(cors());
app.use(express.json());

const authMiddleware = (roles?: string[]) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'Missing token' });
    const token = auth.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
      (req as any).user = decoded;
      if (roles && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing fields' });
  const db = getDb();
  const existing = await db.get<User>('SELECT * FROM users WHERE username = ?', username);
  if (existing) return res.status(409).json({ message: 'User exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await db.run('INSERT INTO users (username, passwordHash, role) VALUES (?,?,?)', username, passwordHash, 'candidate');
  const user = { id: result.lastID!, username, role: 'candidate' };
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const db = getDb();
  const user = await db.get<User>('SELECT * FROM users WHERE username = ?', username);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

app.post('/api/applications', authMiddleware(), async (req, res) => {
  const user = (req as any).user as User;
  const data = req.body as Partial<Application>;
  const db = getDb();
  const now = new Date().toISOString();
  const result = await db.run(
    `INSERT INTO applications (userId, battletag, charName, realm, charClass, spec, desiredRole, experience, ui, addons, availability, reason, referral, status, createdAt, updatedAt)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    user.id,
    data.battletag,
    data.charName,
    data.realm,
    data.charClass,
    data.spec,
    data.desiredRole,
    data.experience || null,
    data.ui || null,
    data.addons || null,
    data.availability,
    data.reason,
    data.referral || null,
    'New',
    now,
    now,
  );
  const appId = result.lastID!;
  const application = await db.get<Application>('SELECT * FROM applications WHERE id = ?', appId);
  res.json(application);
});

app.get('/api/applications', authMiddleware(['officer']), async (req, res) => {
  const db = getDb();
  const apps = await db.all<Application[]>('SELECT * FROM applications');
  res.json(apps);
});

app.put('/api/applications/:id/status', authMiddleware(['officer']), async (req, res) => {
  const { id } = req.params;
  const { status, officerNotes } = req.body;
  const db = getDb();
  await db.run('UPDATE applications SET status = ?, officerNotes = ?, updatedAt = ? WHERE id = ?', status, officerNotes || null, new Date().toISOString(), id);
  const application = await db.get<Application>('SELECT * FROM applications WHERE id = ?', id);
  res.json(application);
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
