import Link from "next/link";

export default function LoginMessage() {
  return (
    <div className="grid bg-primary-800">
      <p className="self-center py-12 text-center text-xl">
        Please{" "}
        <Link href="/login" className="font-semibold text-accent-500 underline">
          Login
        </Link>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}
