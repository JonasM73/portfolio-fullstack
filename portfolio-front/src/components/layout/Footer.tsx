import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative  overflow-hidden border-t border-zinc-200 bg-white">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-teal-300/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-300/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-8 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-violet-500 text-lg font-bold text-white shadow-lg">
                JM
              </div>

              <div>
                <h2 className="text-xl font-bold text-zinc-900">
                  Jonas Mionnet
                </h2>

                <p className="text-sm text-zinc-500">
                  Étudiant ingénieur informatique
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm leading-7 text-zinc-600">
              Passionné par le développement logiciel, la data,
              les architectures modernes et les projets ayant
              un impact concret.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="https://www.linkedin.com/in/jonas-mionnet-5339012a0"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-3 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
              >
                <LinkedInIcon />
                <span className="font-medium text-zinc-700 transition group-hover:text-zinc-950">
                  LinkedIn
                </span>
              </a>

              <a
                href="https://github.com/JonasM73"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-3 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
              >
                <GitHubIcon />
                <span className="font-medium text-zinc-700 transition group-hover:text-zinc-950">
                  GitHub
                </span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-zinc-900">
              Navigation
            </h3>

            <div className="mt-5 flex flex-col gap-4">
              <FooterLink to="/">
                Accueil
              </FooterLink>

              <FooterLink to="/about">
                À propos
              </FooterLink>

              <FooterLink to="/contact">
                Contact
              </FooterLink>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-zinc-900">
              Portfolio
            </h3>

            <div className="mt-5 flex flex-col gap-4 text-sm text-zinc-500">
              <p>Développement</p>
              <p>Data & BI</p>
              <p>Cybersécurité</p>
              <p>Architecture logicielle</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-zinc-900">
              Informations
            </h3>

            <div className="mt-5 flex flex-col gap-4">
              <FooterLink to="/mentions-legales">
                Mentions légales
              </FooterLink>

              <FooterLink to="/confidentialite">
                Confidentialité
              </FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 text-sm text-zinc-400 md:flex-row">
          <p>
            © 2026 Jonas Mionnet. Tous droits réservés.
          </p>


        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="text-sm text-zinc-500 transition hover:text-zinc-900"
    >
      {children}
    </Link>
  );
}

function LinkedInIcon() {
  return (
    <svg
      className="h-5 w-5 text-[#0077B5]"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.943v5.663H9.351V9h3.414v1.561h.047c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.371 4.268 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.559V9h3.555v11.452z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      className="h-5 w-5 text-zinc-900"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.15c-3.2.7-3.88-1.38-3.88-1.38-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.08.79 2.18v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}