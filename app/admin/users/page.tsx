import Link from "next/link";
import { changeRole } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { getAdminProfiles } from "@/lib/admin";

export const metadata = { title: "Customers | PENREC Studio" };
const roles = ["customer", "staff", "admin", "super_admin"];

export default async function UsersPage() {
  const { role } = await requireAdmin();
  const profiles = await getAdminProfiles();
  const canEdit = ["admin", "super_admin"].includes(role);
  return <main id="content" className="admin-page shell inside">
    <p className="eyebrow">PENREC Studio / Customers</p>
    <h1>Account directory</h1>
    <p className="admin-intro">Review customer accounts and assign access levels. Super-admin access can only be granted by another super-admin.</p>
    <div className="user-table" role="table" aria-label="PENREC accounts">
      <div className="user-table__row user-table__head" role="row"><span>Name</span><span>Role</span><span>Joined</span></div>
      {profiles.map((profile) => <div className="user-table__row" role="row" key={profile.id}>
        <span>{profile.display_name || "Unnamed account"}<small>{profile.id.slice(0,8)}…</small></span>
        <span>{canEdit ? <form action={changeRole}><input type="hidden" name="id" value={profile.id}/><select name="role" defaultValue={profile.role} aria-label={`Role for ${profile.display_name || "account"}`}>
          {roles.map((value) => <option key={value} value={value} disabled={value === "super_admin" && role !== "super_admin"}>{value.replaceAll("_"," ")}</option>)}
        </select><button className="text-button" type="submit">Save</button></form> : profile.role.replaceAll("_"," ")}</span>
        <span>{new Date(profile.created_at).toLocaleDateString("en-GB")}</span>
      </div>)}
    </div>
    <p className="form-help"><Link href="/admin">← Back to control room</Link></p>
  </main>;
}
