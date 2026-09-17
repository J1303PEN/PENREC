import Link from "next/link";
import { AuthCard } from "@/components/auth-card";
import { login } from "@/app/auth/actions";

export const metadata = { title: "Sign in | PENREC" };

export default async function LoginPage({searchParams}:{searchParams:Promise<{error?:string;message?:string;next?:string}>}){
 const params=await searchParams;
 return <AuthCard eyebrow="One PENREC account" title="Sign in" intro="One sign-in for PENREC. Your account automatically opens the features and Studio privileges assigned to you.">
  {params.error&&<p className="form-alert form-alert--error">{params.error}</p>}
  {params.message&&<p className="form-alert form-alert--success">{params.message}</p>}
  <form className="auth-form" action={login}>
   <input type="hidden" name="next" value={params.next||"/account"}/>
   <label>Email address<input name="email" type="email" autoComplete="email" required/></label>
   <label>Password<input name="password" type="password" autoComplete="current-password" required/></label>
   <div className="auth-form__row"><Link href="/forgot-password">Forgot password?</Link></div>
   <button className="button" type="submit">Sign in</button>
  </form>
  <div className="auth-card__footer"><p>New to PENREC? <Link href="/register">Create an account</Link></p></div>
 </AuthCard>;
}