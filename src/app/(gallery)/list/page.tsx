import { redirect } from "next/navigation";

export default function ListRedirect() {
  redirect("/gallery?view=list");
}
