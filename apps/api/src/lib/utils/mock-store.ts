// noinspection JSUnusedGlobalSymbols

import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(__dirname, '..', 'data.json');
let memoryStore: MockStoreEntry[] = [];

if (fs.existsSync(DATA_FILE)) {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    memoryStore = JSON.parse(raw);
  } catch {
    memoryStore = [];
  }
}

const saveToDisk = () => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(memoryStore, null, 3), 'utf-8');
};

export const MockStore = {
  add(record: MockStoreEntry) {
    memoryStore.push(record);
    saveToDisk();
  },

  getAll(): MockStoreEntry[] {
    return memoryStore;
  },

  getByImageId(id: string): MockStoreEntry[] {
    return memoryStore.filter((record) => record.imageId === id) || [];
  },

  clear() {
    memoryStore = [];
    saveToDisk();
  },
};
