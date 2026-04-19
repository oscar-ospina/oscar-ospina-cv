import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-4xl font-semibold">404</h1>
      <p className="text-(--color-ink-3)">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="underline text-(--color-accent)">
        Back home
      </Link>
    </div>
  );
}
