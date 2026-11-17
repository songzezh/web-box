import { Box, CodeXml, Feather, ShieldCheck } from 'lucide-react'

function BrandHeader() {
  return (
    <header className="page-grid flex min-h-20 flex-wrap items-center justify-between gap-4 border-b border-divider py-4">
      <div className="flex items-center gap-3 text-xl">
        <Box aria-hidden="true" className="size-8 text-accent" strokeWidth={1.5} />
        <span>Web Box</span>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="page-grid py-16 md:py-24">
      <p className="caption mb-8 flex items-center gap-3 text-accent">
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        Simple. Local. Private.
      </p>
      <h1 id="hero-title" className="text-[2rem] leading-[1.25] font-normal md:text-[2.625rem] md:leading-[1.19] md:font-light lg:text-[3.75rem] lg:leading-[1.17]">
        <span className="block">Your daily tools.</span>
        <span className="block">One simple workspace.</span>
      </h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
      </div>
    </section>
  )
}

const principles = [
  { number: '01', title: 'Privacy First', description: 'Your data stays in your browser.', icon: ShieldCheck },
  { number: '02', title: 'Lightweight', description: 'Fast, focused, and easy to use.', icon: Feather },
  { number: '03', title: 'Open Source', description: 'Built openly, designed to evolve.', icon: CodeXml },
]

function PrinciplesSection() {
  return (
    <section aria-label="Core principles" className="page-grid pb-12">
      <div className="grid gap-8 md:grid-cols-3">
        {principles.map(({ number, title, description, icon: Icon }) => (
          <article key={number} className="border-t border-divider pt-4 pb-4">
            <div className="mb-8 flex items-center justify-between">
              <span className="caption text-secondary">{number} /</span>
              <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
            </div>
            <h2 className="mb-2 text-2xl leading-[1.33]">{title}</h2>
            <p className="text-secondary">{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function DevelopmentSection() {
  return (
    <section aria-labelledby="development-title" className="bg-layer">
      <div className="page-grid grid gap-8 py-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="caption mb-8 flex items-center gap-2 text-accent">
            <span aria-hidden="true" className="size-2 bg-accent" />
            In development
          </p>
          <h2 id="development-title" className="text-[2rem] leading-[1.25]">Building something useful.</h2>
        </div>
        <p className="max-w-lg text-secondary lg:self-end">
          Web Box is taking shape. A collection of practical, browser-based utilities is on the way.
        </p>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-divider">
      <div className="page-grid caption flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-8 text-secondary">
        <span>Web Box</span>
        <span className="mr-auto">Simple. Local. Private.</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <BrandHeader />
      <main>
        <HeroSection />
        <PrinciplesSection />
        <DevelopmentSection />
      </main>
      <SiteFooter />
    </>
  )
}

export default App
