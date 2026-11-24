import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "@/pages/Home";

// Lazy-load sub-pages to reduce initial bundle size
const Press = lazy(() => import("@/pages/Press"));
const Events = lazy(() => import("@/pages/Events"));
const YouthCoaching = lazy(() => import("@/pages/coaching/YouthCoaching"));
const ScholasticCoaching = lazy(() => import("@/pages/coaching/ScholasticCoaching"));
const CollegiateCoaching = lazy(() => import("@/pages/coaching/CollegiateCoaching"));
const EarnCEU = lazy(() => import("@/pages/coaching/EarnCEU"));
const CoachingResources = lazy(() => import("@/pages/coaching/CoachingResources"));
const Rankings = lazy(() => import("@/pages/Rankings"));
const WomensWrestling = lazy(() => import("@/pages/WomensWrestling"));
// About page (unified — all sections on one page with anchors)
const AboutNWCA = lazy(() => import("@/pages/about/AboutNWCA"));
// Grow the Sport sub-pages
const WhereToWrestle = lazy(() => import("@/pages/grow/WhereToWrestle"));
const CareerCenter = lazy(() => import("@/pages/grow/CareerCenter"));
const StartAProgram = lazy(() => import("@/pages/grow/StartAProgram"));
const ParticipationData = lazy(() => import("@/pages/grow/ParticipationData"));
const MatStatsShow = lazy(() => import("@/pages/grow/MatStatsShow"));
const WhyWrestle = lazy(() => import("@/pages/grow/WhyWrestle"));
const Join = lazy(() => import("@/pages/Join"));
const Donate = lazy(() => import("@/pages/Donate"));
const SLAApply = lazy(() => import("@/pages/coaching/SLAApply"));
const DivisionPage = lazy(() => import("@/pages/DivisionPage"));
const Shop = lazy(() => import("@/pages/Shop"));
const ScholasticStateMap = lazy(() => import("@/pages/ScholasticStateMap"));
const NewsArticle = lazy(() => import("@/pages/NewsArticle"));
const Checkout = lazy(() => import("@/pages/Checkout"));

// Simple full-page loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0f1420] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#C41E3A] border-t-transparent rounded-full animate-spin" />
        <p className="font-condensed text-xs tracking-widest uppercase text-[#c8cdd6]">Loading</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/press"} component={Press} />
        <Route path={"/events"} component={Events} />
        {/* Coaching sub-pages */}
        <Route path={"/coaching/youth"} component={YouthCoaching} />
        <Route path={"/coaching/scholastic"} component={ScholasticCoaching} />
        <Route path={"/coaching/collegiate"} component={CollegiateCoaching} />
        <Route path={"/coaching/ceu"} component={EarnCEU} />
        <Route path={"/coaching/resources"} component={CoachingResources} />
        {/* About page — unified, all sections accessible via anchors */}
        <Route path={"/about"} component={AboutNWCA} />
        {/* Rankings page */}
        <Route path={"/rankings"} component={Rankings} />
        {/* Women's Wrestling page */}
        <Route path={"/womens-wrestling"} component={WomensWrestling} />
        {/* Scholastic State Profile Map */}
        <Route path={'/grow/state-map'} component={ScholasticStateMap} />
        {/* Grow the Sport sub-pages */}
        <Route path={"/grow/where-to-wrestle"} component={WhereToWrestle} />
        <Route path={"/grow/career-center"} component={CareerCenter} />
        <Route path={"/grow/start-a-program"} component={StartAProgram} />
        <Route path={"/grow/participation-data"} component={ParticipationData} />
        <Route path={"/grow/mat-stats-show"} component={MatStatsShow} />
        <Route path={"/grow/why-wrestle"} component={WhyWrestle} />
        {/* Shop / Gear Store */}
        <Route path={"/shop"} component={Shop} />
        {/* Membership-first commerce and registration */}
        <Route path={"/checkout"} component={Checkout} />
        {/* Join / Membership page */}
        <Route path={"/join"} component={Join} />
        {/* Donate page */}
        <Route path={"/donate"} component={Donate} />
        {/* SLA Application form */}
        <Route path={"/coaching/scholastic/apply"} component={SLAApply} />
        {/* Division pages — all 12 divisions */}
        <Route path="/divisions/ncaa-d1-men">{() => <DivisionPage slug="ncaa-d1-men" />}</Route>
        <Route path="/divisions/ncaa-d2-men">{() => <DivisionPage slug="ncaa-d2-men" />}</Route>
        <Route path="/divisions/ncaa-d3-men">{() => <DivisionPage slug="ncaa-d3-men" />}</Route>
        <Route path="/divisions/naia-men">{() => <DivisionPage slug="naia-men" />}</Route>
        <Route path="/divisions/njcaa-men">{() => <DivisionPage slug="njcaa-men" />}</Route>
        <Route path="/divisions/ncwa-men">{() => <DivisionPage slug="ncwa-men" />}</Route>
        <Route path="/divisions/cccaa-men">{() => <DivisionPage slug="cccaa-men" />}</Route>
        <Route path="/divisions/ncaa-women">{() => <DivisionPage slug="ncaa-women" />}</Route>
        <Route path="/divisions/naia-women">{() => <DivisionPage slug="naia-women" />}</Route>
        <Route path="/divisions/njcaa-women">{() => <DivisionPage slug="njcaa-women" />}</Route>
        <Route path="/divisions/ncwa-women">{() => <DivisionPage slug="ncwa-women" />}</Route>
        <Route path="/divisions/cccaa-women">{() => <DivisionPage slug="cccaa-women" />}</Route>
        {/* News article detail pages */}
        <Route path="/news/:slug" component={NewsArticle} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
