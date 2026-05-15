import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

import CaseStudyGap from "./pages/CaseStudyGap.tsx";
import CaseStudySalesforce from "./pages/CaseStudySalesforce.tsx";
import CaseStudyAIReviews from "./pages/CaseStudyAIReviews.tsx";
import { ScrollToTop } from "./components/ScrollToTop.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/work/cross-brand-product-experience" element={<CaseStudyGap />} />
          <Route path="/work/four-brands-one-membership" element={<CaseStudySalesforce />} />
          <Route path="/work/designing-trust-into-ai-feature" element={<CaseStudyAIReviews />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
