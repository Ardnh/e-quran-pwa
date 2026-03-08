import type { Table } from 'dexie'
import Dexie from 'dexie';
import type { EQuranById, EQuranSurahItem, EQuranTafsirById } from '~/models/equran.models';

export interface SyncMeta {
    key: string;
    lastSync: number;
}

class AppDatabase extends Dexie {
    equranSurah!: Table<EQuranSurahItem>
    equranSurahById!: Table<EQuranById>
    equranTafsirById!: Table<EQuranTafsirById>
    meta!: Table<SyncMeta, string>

    constructor() {
        super('AppDatabase')
        this.version(1).stores({
            equranSurah: 'nomor, nama',
            equranSurahById: 'nomor',
            equranTafsirById: 'nomor',
            meta: 'key',
        })
    }
}

export const db = new AppDatabase()