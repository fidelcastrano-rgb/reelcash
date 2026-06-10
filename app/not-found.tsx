import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#0A0B0E] text-white">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <Link href="/" className="ml-4 text-emerald-500 hover:text-emerald-400">Return Home</Link>
    </div>
  );
}
