import {
  pgTable,
  uuid,
  text,
  timestamp,
  date,
  integer,
} from "drizzle-orm/pg-core";

export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  email: text("email").notNull(),
  role: text("role").notNull().default("client"),
  clientId: uuid("client_id").references(() => clients.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const portalItems = pgTable("portal_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id")
    .notNull()
    .references(() => clients.id),
  sectionType: text("section_type").notNull(),
  title: text("title").notNull(),
  url: text("url"),
  description: text("description"),
  deadlineDate: date("deadline_date"),
  responsiblePerson: text("responsible_person"),
  status: text("status"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type PortalItem = typeof portalItems.$inferSelect;
export type NewPortalItem = typeof portalItems.$inferInsert;

export type SectionType =
  | "quicklink"
  | "deadline"
  | "workflow"
  | "contact"
  | "document";
