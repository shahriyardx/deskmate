"use client";

import { authClient } from "@/lib/auth/auth-client";

const Page = () => {
  const data = authClient.useSession();
  console.log(data);
  return (
    <div>
      <button
        onClick={() =>
          authClient.signIn.social({
            provider: "discord",
            callbackURL: "/",
          })
        }
        type="button"
      >Click Me</button>
    </div>
  );
};

export default Page;
