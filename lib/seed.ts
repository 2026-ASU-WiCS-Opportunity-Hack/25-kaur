/**
 * Seed AidBridge demo data into Supabase.
 *
 * Prerequisites:
 * 1. Run `supabase/migrations/20260330140000_aidbridge_core_and_audit.sql` in your project (SQL Editor or `supabase db push`).
 * 2. Set env vars (e.g. in `.env.local`):
 *    - NEXT_PUBLIC_SUPABASE_URL
 *    - SUPABASE_SERVICE_ROLE_KEY
 *
 * Run: npm run db:seed
 *    or: npx ts-node --project tsconfig.seed.json lib/seed.ts
 */

import { config } from "dotenv"
import { createClient } from "@supabase/supabase-js"
import { resolve } from "path"

config({ path: resolve(process.cwd(), ".env.local") })
config({ path: resolve(process.cwd(), ".env") })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Copy .env.example and fill values."
  )
  process.exit(1)
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

/** When RPC reset fails (e.g. older `seed_reset` used bare DELETE), clear via REST + filtered DELETE. */
async function clearTablesForReseed() {
  const order = ["service_entries", "audit_log", "clients", "app_staff"] as const
  for (const table of order) {
    const { error } = await supabase
      .from(table)
      .delete()
      .gte("created_at", "1970-01-01T00:00:00Z")
    if (error) throw new Error(`${table}: ${error.message}`)
  }
}

const SERVICE_TYPES = [
  "Case Management — Housing",
  "Therapy Session",
  "Intake Evaluation",
  "Resource Navigation",
  "Food Pantry Referral",
  "SNAP Assistance",
]

async function main() {
  console.log("Resetting seed tables via seed_reset_aidbridge()...")
  const { error: resetErr } = await supabase.rpc("seed_reset_aidbridge")
  if (resetErr) {
    console.warn("RPC reset failed:", resetErr.message)
    console.log("Falling back to filtered DELETE via service role (same as migration fix)...")
    try {
      await clearTablesForReseed()
    } catch (e) {
      console.error(
        "Could not clear tables. Run supabase/migrations/20260330160000_fix_seed_reset_and_reload_schema.sql in the SQL Editor, then retry."
      )
      console.error(e)
      process.exit(1)
    }
  }

  const staffRows = [
    {
      email: "case.manager@aidbridge-seed.local",
      full_name: "Jordan Case",
      role: "staff" as const,
    },
    {
      email: "admin@aidbridge-seed.local",
      full_name: "Riley Admin",
      role: "admin" as const,
    },
  ]

  const { data: staffInserted, error: staffErr } = await supabase
    .from("app_staff")
    .insert(staffRows)
    .select("id,email")

  if (staffErr) throw staffErr
  if (!staffInserted || staffInserted.length !== 2) throw new Error("Expected 2 staff users")

  const staffByEmail = Object.fromEntries(staffInserted.map((s) => [s.email, s.id])) as Record<
    string,
    string
  >

  const clientSpecs = [
    { client_code: "19402", first_name: "Maria", last_name: "Garcia", dob: "1980-05-14", status: "Active" as const },
    { client_code: "87345", first_name: "John", last_name: "Doe", dob: "1992-11-03", status: "Active" as const },
    { client_code: "11003", first_name: "Elena", last_name: "Rostova", dob: "1975-02-21", status: "Inactive" as const },
    { client_code: "22001", first_name: "Samantha", last_name: "Robles", dob: "1994-08-22", status: "Active" as const },
    { client_code: "22002", first_name: "James", last_name: "Chen", dob: "1988-01-10", status: "Active" as const },
    { client_code: "22003", first_name: "Aisha", last_name: "Patel", dob: "1991-07-19", status: "Active" as const },
    { client_code: "22004", first_name: "Robert", last_name: "Nguyen", dob: "1965-12-02", status: "Active" as const },
    { client_code: "22005", first_name: "Keisha", last_name: "Washington", dob: "1978-03-25", status: "Active" as const },
    { client_code: "22006", first_name: "Diego", last_name: "Morales", dob: "2001-09-14", status: "Active" as const },
    { client_code: "22007", first_name: "Fatima", last_name: "Hassan", dob: "1996-11-30", status: "Inactive" as const },
  ]

  const { data: clients, error: clientsErr } = await supabase
    .from("clients")
    .insert(
      clientSpecs.map((c, i) => ({
        ...c,
        phone: `555-01${String(i).padStart(2, "0")}0`,
        email: `${c.first_name.toLowerCase()}.${c.last_name.toLowerCase().replace(/[^a-z]/g, "")}@example.com`,
        last_visit: "2023-10-12",
      }))
    )
    .select("id,client_code")

  if (clientsErr) throw clientsErr
  if (!clients || clients.length !== 10) throw new Error("Expected 10 clients")

  const clientIds = clients.map((c) => c.id)
  const caseManagerId = staffByEmail["case.manager@aidbridge-seed.local"]
  const adminId = staffByEmail["admin@aidbridge-seed.local"]

  const serviceInserts = Array.from({ length: 30 }, (_, i) => {
    const client_id = clientIds[i % clientIds.length]!
    const staff_id = i % 3 === 0 ? adminId : caseManagerId
    const d = new Date(2023, 8, 1 + (i % 28))
    return {
      client_id,
      staff_id,
      service_type: SERVICE_TYPES[i % SERVICE_TYPES.length]!,
      notes: `Demo service note ${i + 1} (seeded).`,
      logged_on: d.toISOString().slice(0, 10),
    }
  })

  const { error: svcErr } = await supabase.from("service_entries").insert(serviceInserts)
  if (svcErr) throw svcErr

  // Sample audit rows: field NAMES only (no values)
  const demoClientId = clients.find((c) => c.client_code === "19402")!.id
  const { error: auditErr } = await supabase.from("audit_log").insert([
    {
      actor_staff_id: caseManagerId,
      action: "INSERT",
      resource_table: "clients",
      resource_id: demoClientId,
      field_names: ["first_name", "last_name", "dob", "client_code"],
      context: { source: "seed", note: "field names only; values intentionally omitted" },
    },
    {
      actor_staff_id: adminId,
      action: "ACCESS",
      resource_table: "clients",
      resource_id: demoClientId,
      field_names: ["id"],
      context: { source: "seed", route: "dashboard/clients" },
    },
    {
      actor_staff_id: caseManagerId,
      action: "UPDATE",
      resource_table: "clients",
      resource_id: demoClientId,
      field_names: ["last_visit", "updated_at"],
      context: { source: "seed" },
    },
  ])

  if (auditErr) throw auditErr

  console.log("Seed complete:")
  console.log("  • 2 app_staff users (case.manager@ / admin@ … @aidbridge-seed.local)")
  console.log("  • 10 clients")
  console.log("  • 30 service_entries")
  console.log("  • 3 sample audit_log rows (field_names only)")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
