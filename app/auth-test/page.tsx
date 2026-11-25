import { auth } from "@/auth";

export default async function AuthTestPage() {
  const session = await auth();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Auth Test</h1>

      <pre className="mt-6 rounded-lg bg-gray-900 p-4 text-white">{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
