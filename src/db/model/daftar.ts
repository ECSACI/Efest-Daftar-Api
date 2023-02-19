import mongoose from "mongoose";

export interface EfestDaftar extends mongoose.Document {
   nama: string,
   kelas: string,
   kelasStr: string,
   jenis: string,
   time: Date,
}

export const model = mongoose.model<EfestDaftar>("EfestDaftar", new mongoose.Schema({
  nama: {
    type: String,
    required: false,
  },
  kelas: {
    type: String,
    required: true,
  },
  kelasStr: {
    type: String,
    required: true,
  },
  jenis: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
    required: false,
  },
}));
