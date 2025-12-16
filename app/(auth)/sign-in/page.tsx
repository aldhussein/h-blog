import SignInForm from "@/components/signin-form";
import { requireNoAuth } from "@/lib/auth-utils";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  await requireNoAuth();
  return <SignInForm />;
}
