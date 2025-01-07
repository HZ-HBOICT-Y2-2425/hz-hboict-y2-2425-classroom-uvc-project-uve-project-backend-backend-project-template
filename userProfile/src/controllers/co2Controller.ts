import { Request, Response } from "express";
import sqlite3 from "sqlite3";
import db from "../../db";

const sqlite = process.env.DEBUG === "TRUE" ? sqlite3.verbose() : sqlite3;

interface UserCO2Data {
    CO2Prevented: number;
}

interface TotalCO2Data {
    totalCO2: number | null;
}

export const getUserCO2 = (req: Request, res: Response) => {
    const userId = req.user_id;

    const query = `
        SELECT CO2Prevented
        FROM Users
        WHERE id = ?
    `;

    db.get(query, [userId], (err, row: UserCO2Data | undefined) => {
        if (err) {
            console.error("Error retrieving user CO2 data:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }

        if (!row) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.status(200).json({ co2Saved: row.CO2Prevented });
    });
};

export const getTotalCO2 = (_req: Request, res: Response) => {
    const query = `
        SELECT SUM(CO2Prevented) as totalCO2
        FROM Users
    `;

    db.get(query, [], (err, row: TotalCO2Data | undefined) => {
        if (err) {
            console.error("Error retrieving total CO2 data:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }

        res.status(200).json({ totalCO2: row?.totalCO2 || 0 });
    });
};