import Image from "next/image";
import bg from "@/public/bg.png";
import LinkButton from "@/components/LinkButton";

export default function Home() {
  return (
    <section className="mt-12 sm:mt-24">
      <Image
        src={bg}
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        quality={80}
        className="object-cover object-top brightness-[.60]"
        alt="Mountains and forests with two cabins"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-primary-950/70 via-transparent to-primary-950/60"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="mb-6 animate-fade-up text-balance text-4xl font-bold tracking-wide text-primary-50 drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-6xl md:text-8xl">
          Welcome to paradise.
        </h1>

        <p className="mb-10 max-w-xl animate-fade-up text-balance text-base text-primary-100/90 [animation-delay:150ms] sm:text-lg">
          Luxury cabins surrounded by mountains and dark forests, your own
          little home away from home.
        </p>

        <LinkButton
          href="/cabins"
          className="animate-fade-up px-6 py-4 text-lg font-semibold shadow-xl [animation-delay:300ms] hover:bg-accent-400 sm:py-5 sm:text-xl"
        >
          Explore luxury cabins
        </LinkButton>
      </div>
    </section>
  );
}
