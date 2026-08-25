import { CustomCursor } from "@/components/shared/CustomCursor"
import { ScrollProgress } from "@/components/shared/ScrollProgress"
import { Navigation } from "@/components/navigation/Navigation"
import { HeroSection } from "@/components/hero/HeroSection"
import { TheQuestionSection, ProblemIntelligenceSection } from "@/components/scroll-story/TheQuestion"
import { HowGramIntelThinks } from "@/components/scroll-story/HowItWorks"
import { MarketIntelligence } from "@/components/market/MarketIntelligence"
import { CompetitorMap } from "@/components/competitor/CompetitorMap"
import { OpportunityDetection } from "@/components/opportunity/OpportunityDetection"
import { ViabilityScore } from "@/components/viability/ViabilityScore"
import { AIReasoningSection, FinancialStory, SchemeRouter, RepaymentSimulation } from "@/components/financial/FinancialSections"
import { MultilingualSection } from "@/components/multilingual/MultilingualSection"
import { FinalCTA } from "@/components/final-cta/FinalCTA"
import { Footer } from "@/components/footer/Footer"

export function App() {
  return (
    <div className="relative min-h-svh bg-background overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <main>
        <HeroSection />
        <TheQuestionSection />
        <ProblemIntelligenceSection />
        <HowGramIntelThinks />
        <MarketIntelligence />
        <CompetitorMap />
        <OpportunityDetection />
        <ViabilityScore />
        <AIReasoningSection />
        <FinancialStory />
        <SchemeRouter />
        <RepaymentSimulation />
        <MultilingualSection />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  )
}

export default App
