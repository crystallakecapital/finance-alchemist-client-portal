import { SignIn } from "@clerk/nextjs";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-10">
      <div className="mb-8">
        <Logo />
      </div>
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/login"
        forceRedirectUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "bg-white border-hairline border-navy/10 shadow-sm rounded-xl",
            headerTitle: "font-display text-navy",
            headerSubtitle: "text-navy/70",
            socialButtonsBlockButton: "hidden",
            socialButtonsRoot: "hidden",
            dividerRow: "hidden",
            formButtonPrimary:
              "bg-amber hover:bg-amber/90 text-navy normal-case font-medium",
            formFieldInput:
              "border-hairline border-navy/15 focus:border-amber focus:ring-amber/30",
            footerActionLink: "text-amber hover:text-amber/80",
          },
          layout: {
            socialButtonsVariant: "iconButton",
          },
        }}
      />
    </main>
  );
}
