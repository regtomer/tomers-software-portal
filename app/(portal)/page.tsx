export default function HomePage() {
  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-20 sm:px-8 sm:py-28"
    >
      <div className="mb-6 h-px w-12 bg-accent" aria-hidden="true" />
      <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        Tomer&apos;s Software Portal
      </h1>
      <p className="mt-4 text-lg text-muted sm:text-xl">
        One place for the software I ship.
      </p>
      <p className="mt-8 max-w-prose text-base leading-relaxed text-foreground/85">
        This is the hub. Open the menu to move around — more apps will show up
        there as they ship.
      </p>
    </main>
  );
}
