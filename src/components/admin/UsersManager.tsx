import type { Client, User } from "@/db/schema";

export function UsersManager({
  users,
  clients,
}: {
  users: User[];
  clients: Client[];
}) {
  const byId = new Map(clients.map((c) => [c.id, c]));

  return (
    <section className="card">
      <h2 className="font-display text-2xl mb-4">Používatelia</h2>
      {users.length === 0 ? (
        <p className="text-navy/50 text-sm">Žiadni používatelia.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-navy/60 font-mono text-xs uppercase">
                <th className="py-2 pr-3">Email</th>
                <th className="py-2 pr-3">Rola</th>
                <th className="py-2 pr-3">Klient</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-t border-navy/10 align-top"
                >
                  <td className="py-2 pr-3">{u.email}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{u.role}</td>
                  <td className="py-2 pr-3">
                    {u.clientId
                      ? byId.get(u.clientId)?.companyName ?? u.clientId
                      : (
                          <span className="text-navy/40">—</span>
                        )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-4 text-xs text-navy/50">
        Priradenie používateľa ku klientovi alebo nastavenie roly admin sa
        vykonáva priamo v Neon SQL editore.
      </p>
    </section>
  );
}
