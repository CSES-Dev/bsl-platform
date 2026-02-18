export type Application = {
  id: number | string;
  name: string;
  email: string;
  role: string;
  status: string;
  phone?: string;
  location?: string;
  createdAt?: string;
  resumeUrl?: string;
  portfolio?: string;
  answers?: Record<string, string>;
  notes?: string;
};

const applications: Application[] = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane@example.com",
    role: "Frontend Engineer",
    status: "Pending",
    phone: "+1 (555) 111-2222",
    location: "Austin, TX",
    createdAt: "2026-02-10T14:23:00Z",
    resumeUrl: "https://example.com/resume/jane.pdf",
    portfolio: "https://jane.design",
    answers: {
      "Why BSL?": "I love the mission and the stack.",
      "Experience": "3 years React/Next.js",
    },
    notes: "Strong UI skills. Follow up for take-home.",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@example.com",
    role: "Backend Engineer",
    status: "Accepted",
    phone: "+1 (555) 333-4444",
    location: "Seattle, WA",
    createdAt: "2026-02-08T09:12:00Z",
    resumeUrl: "https://example.com/resume/john.pdf",
    portfolio: "https://github.com/johnsmith",
    answers: {
      "Why BSL?": "Distributed systems interest.",
      "Experience": "5 years Node/MongoDB",
    },
    notes: "Great match for backend role.",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Product Designer",
    status: "Rejected",
    phone: "+1 (555) 555-6666",
    location: "Remote",
    createdAt: "2026-01-21T17:45:00Z",
    resumeUrl: "https://example.com/resume/alice.pdf",
    portfolio: "https://alice.design",
    answers: {
      "Why BSL?": "Product-led growth excites me.",
      "Experience": "4 years design systems",
    },
    notes: "Not the right seniority level for current opening.",
  },
];

export function getApplications(): Application[] {
  return applications;
}

export function getApplicationById(id: string | number): Application | null {
  const sId = String(id);
  const found = applications.find((a) => String(a.id) === sId);
  return found ?? null;
}
