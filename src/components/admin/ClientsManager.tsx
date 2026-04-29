import type { Client } from "@/db/schema";
import {
  createClient,
  deleteClient,
  updateClient,
} from "@/app/admin/actions";
import { ConfirmSubmit } from "./ConfirmSubmit";
import { Collapsible } from "./Collapsible";

export function ClientsManager({ clients }: { clients: Client[] }) {
  return (
    <section className="card">
      <h2 className="font-display text-2xl mb-4">Správa klientov</h2>

      {clients.length === 0 ? (
        <p className="text-navy/50 text-sm mb-4">Žiadni klienti.</p>
      ) : (
        <ul className="space-y-2 mb-4">
          {clients.map((client) => (
            <li
              key={client.id}
              className="border-hairline border-navy/10 rounded-lg p-3"
            >
              <Collapsible title={`${client.companyName} — ${client.contactName}`}>
                <form action={updateClient} className="space-y-3">
                  <input type="hidden" name="id" value={client.id} />
                  <div>
                    <label className="label">Názov firmy</label>
                    <input
                      name="companyName"
                      defaultValue={client.companyName}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Kontaktná osoba</label>
                    <input
                      name="contactName"
                      defaultValue={client.contactName}
                      className="input"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="btn-amber">
                      Uložiť
                    </button>
                    <p className="text-xs font-mono text-navy/40 self-center">
                      ID: {client.id}
                    </p>
                  </div>
                </form>
                <form action={deleteClient} className="mt-4 pt-4 border-t border-navy/10">
                  <input type="hidden" name="id" value={client.id} />
                  <ConfirmSubmit
                    message="Naozaj zmazať tohto klienta? Všetky jeho položky budú odstránené."
                    className="btn-danger"
                  >
                    Zmazať klienta
                  </ConfirmSubmit>
                </form>
              </Collapsible>
            </li>
          ))}
        </ul>
      )}

      <Collapsible title="+ Pridať nového klienta">
        <form action={createClient} className="space-y-3">
          <div>
            <label className="label">Názov firmy</label>
            <input name="companyName" className="input" required />
          </div>
          <div>
            <label className="label">Kontaktná osoba</label>
            <input name="contactName" className="input" required />
          </div>
          <button type="submit" className="btn-amber">
            Vytvoriť
          </button>
        </form>
      </Collapsible>
    </section>
  );
}
