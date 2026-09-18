"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrganizationContextPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/installations");
  }, [router]);

  return (
    <div className="flex items-center justify-center p-12 text-sm text-muted-foreground">
      Redirecting to Installations...
    </div>
  );
}
