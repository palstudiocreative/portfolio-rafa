import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import ProjectGrid from "./components/ProjectGrid";
import Profile from "./components/Profile";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Manifesto />
        <Profile />
        <ProjectGrid />
      </main>
      <SiteFooter />
    </div>
  );
}
