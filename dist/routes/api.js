import * as Express from "express";
import * as csv from "fast-csv";
const router = Express.Router();
import { model } from "../db/model/daftar.js";
router.post("/absen", async function (req, res) {
    try {
        console.log(req.body);
        const { nama, kelas, jenis, kelasStr } = req.body;
        if (!nama || !kelas || !kelasStr || !jenis)
            throw new Error("Invalid Input");
        const absenModel = new model({ nama, kelas, jenis, kelasStr, time: Date.now() });
        await absenModel.save();
        res.json({ status: 200, message: `Success ${nama}, ${kelas}${kelasStr.toUpperCase()}, Daftar ${jenis}` });
    }
    catch (err) {
        res.json({ status: 401, message: err.message });
    }
});
router.get("/showabsen", async function (req, res) {
    try {
        const manusia = await model.find();
        console.log(manusia);
        res.json({ status: 200, message: JSON.stringify(manusia) });
    }
    catch (err) {
        res.json({ status: 401, message: err.message });
    }
});
router.get("/ping", async function (req, res) {
    res.json({ status: 200, message: "pong" });
});
router.post("/checkAuthority", async function (req, res) {
    const { token } = req.body;
    try {
        if (token !== process.env.TOKENLOGIN) {
            throw Error("Unauthorized Access Token");
        }
        res.json({ status: 200, message: "Authorized" });
    }
    catch (err) {
        res.json({ status: 400, message: err.message });
    }
});
router.delete("/deleteAbsen", async function (req, res) {
    try {
        if (req.body.token !== process.env.TOKENLOGIN) {
            throw new Error("Invalid Token");
        }
        const id = req.body.id;
        await model.deleteOne({ _id: id });
        res.json({ status: 200, message: "Successfully deleted the document" });
    }
    catch (err) {
        res.json({ status: 401, message: err.message });
    }
});
router.get("/export", async function (req, res) {
    model.find({}).lean().exec((err, absenRPLs) => {
        if (err)
            throw err;
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=" + "Daftar.csv");
        csv.write(absenRPLs, { headers: true }).pipe(res);
    });
});
export default router;
