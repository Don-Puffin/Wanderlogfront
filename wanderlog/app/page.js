import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="opacity-90 w-64 bg-slate-200 rounded-2xl m-5 h-96"></div>
    <div className="opacity-90 w-64 bg-slate-200 rounded-2xl m-5 h-96"></div>
  <div className="opacity-90 w-64 bg-slate-200 rounded-2xl m-5 h-96"></div>
  <div className="opacity-90 w-64 bg-slate-200 rounded-2xl m-5 h-96"></div>

    {/* if not logged in, return Login from login.js,
      (within login.js, option to return Register from register.jsx)

      if logged in, default to returning feed full of post.jsxs,

      if "profile" clicked, return profile instead of feed */}

    </main>
  );
}
