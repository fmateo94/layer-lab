import { redirect } from "next/navigation";

export default function MainPage() {
    // Redirect to collection as the main entry point
    redirect("/collection");
}
