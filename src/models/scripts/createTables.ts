import { db } from "../config.js";
import path from "path";
import fs from "fs";
import url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// SQL queries
const createUsersTableQuery = fs.readFileSync(
    path.join(__dirname, "../users/user.sql"),
    "utf8"
);

// add automatic updatedAt update script
const addUpdatedAtTriggerFunctionQuery = fs.readFileSync(
    path.join(__dirname, "../scripts/update_updated_at.sql"),
    "utf8"
);

// add to updatedAt script to users table
const addUsersUpdatedAtTriggerQuery = fs.readFileSync(
    path.join(__dirname, "../scripts/trigger_users.sql"),
    "utf8"
);

export async function initializeSchema() {
    const queries = [
        createUsersTableQuery,
        createCarpoolsTableQuery,
        createPassengersTableQuery,
        addUpdatedAtTriggerFunctionQuery,
        addUsersUpdatedAtTriggerQuery,
        addCarpoolsUpdatedAtTriggerQuery,
        addPassengersUpdatedAtTriggerQuery,
    ];

    for (const query of queries) {
        await executeSQLScript(query);
    }
}

async function executeSQLScript(query: string, retries = 5): Promise<void> {
    try {
        await db.query(query);
        console.log("Query executed successfully");
    } catch (err) {
        if (err.message.startsWith("trigger")) {
            return;
        }
        console.error("Error executing query", err);
        if (retries > 0) {
            console.log(`Retrying in 5 seconds... (Retries left: ${retries})`);
            await new Promise((resolve) => setTimeout(resolve, 5000));
            return executeSQLScript(query, retries - 1);
        } else {
            console.error("Max retries reached, unable to create table.");
            throw err; // Propagate error
        }
    }
}
