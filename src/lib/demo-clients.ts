/** Static demo data only — no database. */

export type DemoClientRow = {
  id: number
  name: string
  dob: string
  status: "Active" | "Inactive"
  lastVisit: string
}

export type DemoServiceEntry = {
  id: number
  date: string
  service: string
  staff: string
  notes: string
}

export type DemoClientProfile = {
  id: number
  name: string
  dob: string
  phone: string
  email: string
  status: "Active" | "Inactive"
  history: DemoServiceEntry[]
}

export const DEMO_CLIENTS: DemoClientRow[] = [
  { id: 19402, name: "Maria Garcia", dob: "1980-05-14", status: "Active", lastVisit: "2023-10-12" },
  { id: 87345, name: "John Doe", dob: "1992-11-03", status: "Active", lastVisit: "2023-10-10" },
  { id: 11003, name: "Elena Rostova", dob: "1975-02-21", status: "Inactive", lastVisit: "2023-08-01" },
  { id: 22001, name: "Samantha Robles", dob: "1994-08-22", status: "Active", lastVisit: "2023-10-08" },
  { id: 22002, name: "James Chen", dob: "1988-01-10", status: "Active", lastVisit: "2023-09-30" },
  { id: 22003, name: "Aisha Patel", dob: "1991-07-19", status: "Active", lastVisit: "2023-10-05" },
  { id: 22004, name: "Robert Nguyen", dob: "1965-12-02", status: "Active", lastVisit: "2023-09-18" },
  { id: 22005, name: "Keisha Washington", dob: "1978-03-25", status: "Active", lastVisit: "2023-10-14" },
  { id: 22006, name: "Diego Morales", dob: "2001-09-14", status: "Inactive", lastVisit: "2023-07-22" },
  { id: 22007, name: "Fatima Hassan", dob: "1996-11-30", status: "Inactive", lastVisit: "2023-06-10" },
  { id: 22008, name: "Marcus Webb", dob: "1983-04-05", status: "Active", lastVisit: "2023-10-11" },
  { id: 22009, name: "Priya Singh", dob: "1990-12-18", status: "Active", lastVisit: "2023-10-09" },
]

const h = (
  id: number,
  date: string,
  service: string,
  staff: string,
  notes: string
): DemoServiceEntry => ({ id, date, service, staff, notes })

export const DEMO_CLIENT_PROFILES: Record<string, DemoClientProfile> = {
  "19402": {
    id: 19402,
    name: "Maria Garcia",
    dob: "1980-05-14",
    phone: "555-0102",
    email: "maria.g@example.com",
    status: "Active",
    history: [
      h(101, "2023-10-12", "Therapy Session", "Dr. Smith", "Discussed anxiety regarding housing stability."),
      h(102, "2023-09-28", "Intake Evaluation", "Case Manager Jane", "Initial intake; housing support requested."),
    ],
  },
  "87345": {
    id: 87345,
    name: "John Doe",
    dob: "1992-11-03",
    phone: "555-0188",
    email: "john.d@example.com",
    status: "Active",
    history: [
      h(201, "2023-10-10", "Case Review", "Case Manager Lee", "Reviewed transportation and food support needs."),
      h(202, "2023-09-22", "Resource Navigation", "Dr. Smith", "Provided pantry list and SNAP referral info."),
    ],
  },
  "11003": {
    id: 11003,
    name: "Elena Rostova",
    dob: "1975-02-21",
    phone: "555-0144",
    email: "elena.r@example.com",
    status: "Inactive",
    history: [
      h(301, "2023-08-01", "Follow-up Call", "Case Manager Lee", "Client declined further services at this time."),
    ],
  },
  "22001": {
    id: 22001,
    name: "Samantha Robles",
    dob: "1994-08-22",
    phone: "555-0201",
    email: "s.robles@example.com",
    status: "Active",
    history: [
      h(401, "2023-10-08", "Housing Assessment", "Jordan Case", "Completed housing readiness questionnaire."),
      h(402, "2023-09-15", "Benefits Screening", "Riley Admin", "Screened for rental assistance programs."),
    ],
  },
  "22002": {
    id: 22002,
    name: "James Chen",
    dob: "1988-01-10",
    phone: "555-0202",
    email: "j.chen@example.com",
    status: "Active",
    history: [
      h(501, "2023-09-30", "Employment Coaching", "Jordan Case", "Resume workshop and job fair referral."),
    ],
  },
  "22003": {
    id: 22003,
    name: "Aisha Patel",
    dob: "1991-07-19",
    phone: "555-0203",
    email: "a.patel@example.com",
    status: "Active",
    history: [
      h(601, "2023-10-05", "Family Support", "Dr. Smith", "Discussed childcare resources and scheduling."),
      h(602, "2023-09-12", "Intake", "Jordan Case", "Initial needs assessment completed."),
    ],
  },
  "22004": {
    id: 22004,
    name: "Robert Nguyen",
    dob: "1965-12-02",
    phone: "555-0204",
    email: "r.nguyen@example.com",
    status: "Active",
    history: [
      h(701, "2023-09-18", "Medicare Counseling", "Riley Admin", "Explained Part D enrollment window."),
    ],
  },
  "22005": {
    id: 22005,
    name: "Keisha Washington",
    dob: "1978-03-25",
    phone: "555-0205",
    email: "k.washington@example.com",
    status: "Active",
    history: [
      h(801, "2023-10-14", "Case Management", "Jordan Case", "Coordinated utility assistance application."),
      h(802, "2023-10-01", "Check-in", "Case Manager Lee", "Short wellness check; no new barriers."),
    ],
  },
  "22006": {
    id: 22006,
    name: "Diego Morales",
    dob: "2001-09-14",
    phone: "555-0206",
    email: "d.morales@example.com",
    status: "Inactive",
    history: [
      h(901, "2023-07-22", "Youth Program", "Dr. Smith", "Completed summer workshop series."),
    ],
  },
  "22007": {
    id: 22007,
    name: "Fatima Hassan",
    dob: "1996-11-30",
    phone: "555-0207",
    email: "f.hassan@example.com",
    status: "Inactive",
    history: [
      h(1001, "2023-06-10", "Referral Out", "Riley Admin", "Referred to regional partner agency."),
    ],
  },
  "22008": {
    id: 22008,
    name: "Marcus Webb",
    dob: "1983-04-05",
    phone: "555-0208",
    email: "m.webb@example.com",
    status: "Active",
    history: [
      h(1101, "2023-10-11", "Legal Aid Intake", "Jordan Case", "Landlord dispute documentation started."),
    ],
  },
  "22009": {
    id: 22009,
    name: "Priya Singh",
    dob: "1990-12-18",
    phone: "555-0209",
    email: "p.singh@example.com",
    status: "Active",
    history: [
      h(1201, "2023-10-09", "Language Access", "Case Manager Lee", "Interpreter scheduled for next visit."),
      h(1202, "2023-09-20", "Food Pantry", "Riley Admin", "First-time pantry registration."),
    ],
  },
}

export function getDemoProfile(id: string): DemoClientProfile {
  return DEMO_CLIENT_PROFILES[id] ?? DEMO_CLIENT_PROFILES["19402"]!
}
