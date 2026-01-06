import { Header } from "@/components/Header";
import { FocusScore } from "@/components/FocusScore";
import { FocusTimer } from "@/components/FocusTimer";
import { ScreenTimeChart } from "@/components/ScreenTimeChart";
import { AppUsageList } from "@/components/AppUsageList";
import { StatsGrid } from "@/components/StatsGrid";
import { InsightsPanel } from "@/components/InsightsPanel";
import { QuickActions } from "@/components/QuickActions";
import { WeeklyOverview } from "@/components/WeeklyOverview";
import { NudgeDemo } from "@/components/NudgeToast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
            {/* Welcome message */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="font-display text-3xl lg:text-4xl font-bold mb-3">
                Good afternoon, Alex! 👋
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                You're having a productive day. Keep up the great focus!
              </p>
            </div>
            
            {/* Focus Score */}
            <Card variant="elevated" className="p-6">
              <div className="flex items-center gap-6">
                <FocusScore score={78} size="lg" />
                <div className="text-left">
                  <h3 className="font-display text-lg font-semibold mb-1">Today's Focus Score</h3>
                  <p className="text-sm text-muted-foreground mb-3">Based on focus time & patterns</p>
                  <div className="flex items-center gap-2 text-sm text-success">
                    <Sparkles className="w-4 h-4" />
                    <span>+8 points from yesterday</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="mb-8 animate-slide-in-bottom" style={{ animationDelay: "0.1s" }}>
          <StatsGrid />
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Timer & Quick Actions */}
          <div className="space-y-6 animate-slide-in-bottom" style={{ animationDelay: "0.2s" }}>
            <FocusTimer />
            <QuickActions />
          </div>

          {/* Center Column - Charts */}
          <div className="lg:col-span-2 space-y-6 animate-slide-in-bottom" style={{ animationDelay: "0.3s" }}>
            <ScreenTimeChart />
            <WeeklyOverview />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-in-bottom" style={{ animationDelay: "0.4s" }}>
          <AppUsageList />
          <InsightsPanel />
        </div>
      </main>

      {/* Nudge Toast Demo */}
      <NudgeDemo />
    </div>
  );
};

export default Index;
