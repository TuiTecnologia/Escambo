const steps = [
  {
    n: "01",
    title: "Publique",
    text: "Cadastre um produto ou serviço que você tem, com o que você gostaria de receber em troca.",
  },
  {
    n: "02",
    title: "Encontre matches",
    text: "O algoritmo cruza proximidade, valor estimado e interesse mútuo e mostra um % de compatibilidade.",
  },
  {
    n: "03",
    title: "Combine a troca",
    text: "Converse pelo chat interno, aceite, recuse ou faça uma contraproposta até fechar os detalhes.",
  },
  {
    n: "04",
    title: "Confirme e avalie",
    text: "As duas partes confirmam que a troca aconteceu e se avaliam, construindo reputação na plataforma.",
  },
];

const differentiators = [
  {
    title: "Troca pura, sem dinheiro",
    text: "Sem comissão, sem preço de venda. O valor estimado só serve para calcular compatibilidade entre ofertas.",
  },
  {
    title: "Score de compatibilidade",
    text: "Veja o quanto duas ofertas combinam antes de trocar uma mensagem sequer.",
  },
  {
    title: "Foco hiperlocal",
    text: "Raio de distância configurável por você, pensado para troca presencial.",
  },
  {
    title: "Produtos e serviços no mesmo lugar",
    text: "Troque um notebook por um celular, ou horas de consultoria por um site novo.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
          <span className="text-lg font-semibold tracking-tight">Escambo</span>
          <nav className="hidden gap-8 text-sm text-muted sm:flex">
            <a href="#como-funciona" className="hover:text-foreground">
              Como funciona
            </a>
            <a href="#diferenciais" className="hover:text-foreground">
              Diferenciais
            </a>
            <a href="#contato" className="hover:text-foreground">
              Contato
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-5xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <p className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
            Marketplace de troca
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Troque produtos e serviços — sem dinheiro no meio.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            O que você tem parado pode ser exatamente o que outra pessoa está
            procurando. O Escambo encontra ofertas compatíveis por proximidade,
            valor estimado e interesse mútuo — e mostra a compatibilidade antes
            de qualquer contato.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:contato@escambo.app?subject=Quero%20ser%20avisado%20no%20lan%C3%A7amento"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Quero ser avisado no lançamento
            </a>
            <a
              href="#como-funciona"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-surface"
            >
              Como funciona
            </a>
          </div>
        </section>

        <section id="como-funciona" className="border-t border-border bg-surface">
          <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
            <h2 className="text-2xl font-semibold tracking-tight">
              Como funciona
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.n}>
                  <span className="font-mono text-sm text-accent">{step.n}</span>
                  <h3 className="mt-2 font-medium">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="diferenciais" className="border-t border-border">
          <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
            <h2 className="text-2xl font-semibold tracking-tight">
              Por que o Escambo é diferente
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {differentiators.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-border bg-surface p-6"
                >
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="border-t border-border bg-surface">
          <div className="mx-auto w-full max-w-5xl px-6 py-16 text-center sm:py-20">
            <h2 className="text-2xl font-semibold tracking-tight">
              A plataforma está em construção
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Estamos montando o MVP do Escambo. Deixe seu e-mail para ser
              avisado assim que abrirmos as primeiras trocas na cidade-piloto.
            </p>
            <a
              href="mailto:contato@escambo.app?subject=Quero%20ser%20avisado%20no%20lan%C3%A7amento"
              className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              contato@escambo.app
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto w-full max-w-5xl px-6 py-8 text-sm text-muted">
          © {new Date().getFullYear()} Escambo. Troca direta, sem dinheiro.
        </div>
      </footer>
    </div>
  );
}
