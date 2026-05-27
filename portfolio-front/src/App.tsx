import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Code2, Database } from "lucide-react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <main className="min-h-screen bg-[#F8F6F2] text-zinc-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-violet-500 text-white font-bold shadow-lg">
            JM
          </div>

          <div>
            <h2 className="font-bold text-lg">
              Jonas Mionnet
            </h2>

            <p className="text-sm text-zinc-500">
              Software Engineer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost">
            Projets
          </Button>
          <Link to="/about">
            <Button variant="ghost">À propos</Button>
          </Link>
          <Link to="/contact">
            <Button variant="ghost">
              Contact
            </Button>
          </Link>

          <Link to="/admin/login">
            <Button className="rounded-full bg-zinc-900 hover:bg-zinc-800">
              Connexion Admin
            </Button>
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid min-h-[80vh] max-w-7xl grid-cols-1 items-center gap-12 px-8 lg:grid-cols-2">
        <div>
          <Badge className="rounded-full bg-teal-100 px-4 py-2 text-teal-700 hover:bg-teal-100">
            Ingénierie • Développement • Cybersécurité
          </Badge>

          <h1 className="mt-6 text-6xl font-bold leading-tight tracking-tight">
            Je développe des applications modernes,
            performantes et sécurisées.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Étudiant ingénieur informatique passionné par le
            développement full-stack, les architectures
            microservices, le cloud et la cybersécurité.
          </p>

          <div className="mt-10 flex gap-4">
            <Button
              size="lg"
              className="rounded-full bg-zinc-900 px-8 hover:bg-zinc-800"
            >
              Voir mes projets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full">
                Me contacter
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-12 top-10 h-72 w-72 rounded-full bg-teal-300/30 blur-[100px]" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-300/30 blur-[100px]" />

          <Card className="relative rounded-[2rem] border-0 bg-white/70 p-8 shadow-2xl backdrop-blur-xl">
            <div className="space-y-6">
              <div className="flex items-center gap-4 rounded-3xl bg-zinc-50 p-5">
                <Code2 className="text-violet-500" />
                <div>
                  <h3 className="font-semibold">
                    Développement moderne
                  </h3>
                  <p className="text-sm text-zinc-500">
                    React, TypeScript, .NET Aspire
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-3xl bg-zinc-50 p-5">
                <Database className="text-teal-500" />
                <div>
                  <h3 className="font-semibold">
                    Architecture & Data
                  </h3>
                  <p className="text-sm text-zinc-500">
                    MongoDB, BI, APIs, Microservices
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-3xl bg-zinc-50 p-5">
                <Shield className="text-emerald-500" />
                <div>
                  <h3 className="font-semibold">
                    Sécurité
                  </h3>
                  <p className="text-sm text-zinc-500">
                    JWT, Auth, Cybersecurity
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}