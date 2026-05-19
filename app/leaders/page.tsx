import { permanentRedirect, redirect } from "next/navigation";

export default function LeadersPage() {
  permanentRedirect("/about");
}