import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export function Layout() {
  return (
    <>
      <h1>Mini Blog</h1>
      <Navigation />
      <main style={{ border: "1px solid #ddd", padding: "2rem" }}>
        <Outlet />
      </main>
    </>
  );
}