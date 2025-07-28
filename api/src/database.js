import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const filePath = join(__dirname, '../../data/users.json');

const adapter = new JSONFile(filePath);

export const db = new Low(adapter, {});

await db.read();
console.log(db.data);

