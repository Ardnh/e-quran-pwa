export interface EQuranResponse {
  code: number
  message: string
  data: EQuranSurahItem[]
}

export interface EQuranSurahItem {
  nomor: number
  nama: string
  namaLatin: string
  jumlahAyat: number
  tempatTurun: string
  arti: string
  deskripsi: string
  audioFull: AudioFull
}

export interface AudioFull {
  "01": string
  "02": string
  "03": string
  "04": string
  "05": string
  "06": string
}

//  EQURAN BY ID 
export interface EQuranByIdResponse {
  code: number
  message: string
  data: EQuranById
}

export interface EQuranById {
  nomor: number
  nama: string
  namaLatin: string
  jumlahAyat: number
  tempatTurun: string
  arti: string
  deskripsi: string
  audioFull: AudioFull
  ayat: Ayat[]
  suratSelanjutnya: SuratSelanjutnya
  suratSebelumnya: boolean
}

export interface AudioFull {
  "01": string
  "02": string
  "03": string
  "04": string
  "05": string
  "06": string
}

export interface Ayat {
  nomorAyat: number
  teksArab: string
  teksLatin: string
  teksIndonesia: string
  audio: Audio
}

export interface Audio {
  "01": string
  "02": string
  "03": string
  "04": string
  "05": string
  "06": string
}

export interface SuratSelanjutnya {
  nomor: number
  nama: string
  namaLatin: string
  jumlahAyat: number
}

// EQURAN TAFSIR BY ID
export interface EQuranTafsirByIdResponse {
  code: number
  message: string
  data: EQuranTafsirById
}

export interface EQuranTafsirById {
  nomor: number
  nama: string
  namaLatin: string
  jumlahAyat: number
  tempatTurun: string
  arti: string
  deskripsi: string
  audioFull: AudioFull
  tafsir: Tafsir[]
  suratSelanjutnya: SuratSelanjutnya
  suratSebelumnya: boolean
}

export interface AudioFull {
  "01": string
  "02": string
  "03": string
  "04": string
  "05": string
  "06": string
}

export interface Tafsir {
  ayat: number
  teks: string
}

export interface SuratSelanjutnya {
  nomor: number
  nama: string
  namaLatin: string
  jumlahAyat: number
}
