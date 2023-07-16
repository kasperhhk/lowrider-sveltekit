export interface User {
  username: string;
  password: string;
}

export interface Session {
  sessionId: string;
  username: string;
}

export const users: User[] = [
  { username: 'ellie', password: 'iamcute' },
  { username: 'kasper', password: 'iampog' }
];

let nextId = 1;
const sessions: Session[] = [];

export function createSession(user: User) {
  const sessionId = nextId++;
  const session: Session = { sessionId: sessionId.toString(), username: user.username };
  sessions.push(session);

  return session;
}

export function getSession(sessionId: string) {
  return sessions.find(_ => _.sessionId == sessionId);
}

export function deleteSession(sessionId?: string) {
  if (sessionId) {
    const idx = sessions.findIndex(_ => _.sessionId === sessionId);
    if (idx !== -1) {
      sessions.splice(idx, 1);
    }
  }
}