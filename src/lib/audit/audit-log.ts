import type { SupabaseClient } from "@supabase/supabase-js"

export type AuditAction = "INSERT" | "UPDATE" | "DELETE" | "ACCESS"

export type AuditLogRow = {
  actor_staff_id?: string | null
  action: AuditAction
  resource_table: string
  resource_id?: string | null
  /** Column / field names only — never pass values */
  field_names: string[]
  /** Non-PII metadata only (e.g. route name, correlation id) */
  context?: Record<string, unknown>
}

/**
 * Write a compliance-oriented audit row: **field names only**, never PHI/PII values.
 */
export async function insertAuditLog(
  supabase: SupabaseClient,
  row: AuditLogRow
): Promise<void> {
  const { error } = await supabase.from("audit_log").insert({
    actor_staff_id: row.actor_staff_id ?? null,
    action: row.action,
    resource_table: row.resource_table,
    resource_id: row.resource_id ?? null,
    field_names: row.field_names,
    context: row.context ?? {},
  })

  if (error) throw error
}
