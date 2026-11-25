import { auth } from "@/auth";
import AppLayout from "@/app/(protected)/AppLayout";

export default async function layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  const userName = session?.user?.name ?? null;
  const userImage = session?.user?.image ?? null;

  return (
    <AppLayout userName={userName} userImage={userImage}>
      {children}
    </AppLayout>
  );
}
