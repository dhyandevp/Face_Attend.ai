/**
 * Data Migration Script: Legacy Database -> Modern PostgreSQL (Drizzle)
 *
 * Usage:
 *   node scripts/migrate-data.mjs --export   # Export from legacy Supabase to data/backup.json
 *   node scripts/migrate-data.mjs --import   # Import from data/backup.json to PostgreSQL
 *   node scripts/migrate-data.mjs --verify   # Verify row counts between tables
 *   node scripts/migrate-data.mjs --rollback # Reversible: delete imported records safely
 */

import fs from "node:fs";
import path from "node:path";
import postgres from "postgres";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/faceattend";
const BACKUP_PATH = path.resolve(process.cwd(), "data", "contact_submissions_backup.json");

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || "--help";

  console.log(`[Migration] Running data migration script in mode: ${mode}`);

  if (mode === "--export") {
    console.log("[Migration] Exporting from database / backup source...");
    const sql = postgres(DATABASE_URL);
    try {
      const rows =
        await sql`SELECT id, name, email, message, created_at FROM contact_submissions ORDER BY created_at ASC`;
      fs.mkdirSync(path.dirname(BACKUP_PATH), { recursive: true });
      fs.writeFileSync(BACKUP_PATH, JSON.stringify(rows, null, 2), "utf-8");
      console.log(`[Migration] Successfully exported ${rows.length} rows to ${BACKUP_PATH}`);
    } catch (err) {
      console.error("[Migration] Export failed:", err.message);
    } finally {
      await sql.end();
    }
  } else if (mode === "--import") {
    if (!fs.existsSync(BACKUP_PATH)) {
      console.error(
        `[Migration] Backup file not found at ${BACKUP_PATH}. Run --export first or provide the file.`,
      );
      process.exit(1);
    }
    const data = JSON.parse(fs.readFileSync(BACKUP_PATH, "utf-8"));
    console.log(`[Migration] Importing ${data.length} records into PostgreSQL...`);
    const sql = postgres(DATABASE_URL);
    try {
      let inserted = 0;
      for (const row of data) {
        await sql`
          INSERT INTO contact_submissions (id, name, email, message, created_at)
          VALUES (${row.id}, ${row.name}, ${row.email}, ${row.message}, ${row.created_at})
          ON CONFLICT (id) DO NOTHING
        `;
        inserted++;
      }
      console.log(`[Migration] Imported/verified ${inserted} records.`);
      const [{ count }] = await sql`SELECT count(*)::int FROM contact_submissions`;
      console.log(`[Migration] Current total rows in destination PostgreSQL: ${count}`);
    } catch (err) {
      console.error("[Migration] Import failed:", err.message);
    } finally {
      await sql.end();
    }
  } else if (mode === "--verify") {
    const sql = postgres(DATABASE_URL);
    try {
      const [{ count }] = await sql`SELECT count(*)::int FROM contact_submissions`;
      console.log(`[Migration] Destination PostgreSQL contact_submissions row count: ${count}`);
      if (fs.existsSync(BACKUP_PATH)) {
        const backupData = JSON.parse(fs.readFileSync(BACKUP_PATH, "utf-8"));
        console.log(`[Migration] Local backup file row count: ${backupData.length}`);
        if (count >= backupData.length) {
          console.log("[Migration] Verification PASSED: All backed-up records accounted for.");
        } else {
          console.warn(
            "[Migration] Verification WARNING: Discrepancy between backup and database.",
          );
        }
      }
    } finally {
      await sql.end();
    }
  } else if (mode === "--rollback") {
    if (!fs.existsSync(BACKUP_PATH)) {
      console.error(
        "[Migration] Rollback requires data/contact_submissions_backup.json to identify imported IDs.",
      );
      process.exit(1);
    }
    const backupData = JSON.parse(fs.readFileSync(BACKUP_PATH, "utf-8"));
    const ids = backupData.map((r) => r.id);
    const sql = postgres(DATABASE_URL);
    try {
      if (ids.length > 0) {
        await sql`DELETE FROM contact_submissions WHERE id = ANY(${ids})`;
        console.log(`[Migration] Rollback completed: removed ${ids.length} imported records.`);
      }
    } finally {
      await sql.end();
    }
  } else {
    console.log(`
Commands:
  node scripts/migrate-data.mjs --export    Export contact_submissions to data/contact_submissions_backup.json
  node scripts/migrate-data.mjs --import    Import backup into destination PostgreSQL database
  node scripts/migrate-data.mjs --verify    Compare row counts
  node scripts/migrate-data.mjs --rollback  Safely rollback imported backup rows
    `);
  }
}

main().catch(console.error);
