import { AuthCard } from "@/components/auth-card";
import { TokenPasswordForm } from "@/components/token-form";

export const metadata = { title: "Choose new password | PENREC" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <AuthCard eyebrow="Account security" title="Choose a new password" intro="Your new password must contain at least 8 characters.">
      {params.error && <p className="form-alert form-alert--error">{params.error}</p>}
      <TokenPasswordForm />
    </AuthCard>
  );
}
