import { useState } from "react";
import Hero from "@/components/Hero";
import Questionnaire from "@/components/Questionnaire";
import Results from "@/components/Results";
import ContactForm from "@/components/ContactForm";

type Page = "hero" | "questionnaire" | "results" | "contact";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("hero");
  const [assessmentResults, setAssessmentResults] = useState<any>(null);

  const handleStartAssessment = () => {
    setCurrentPage("questionnaire");
  };

  const handleQuestionnaireComplete = (results: any) => {
    setAssessmentResults(results);
    setCurrentPage("results");
  };

  const handleBackToHome = () => {
    setCurrentPage("hero");
  };

  const handleContact = () => {
    setCurrentPage("contact");
  };

  const handleBackToResults = () => {
    setCurrentPage("results");
  };

  const handleStartOver = () => {
    setAssessmentResults(null);
    setCurrentPage("hero");
  };

  return (
    <div className="min-h-screen">
      {currentPage === "hero" && (
        <Hero onStartAssessment={handleStartAssessment} />
      )}
      
      {currentPage === "questionnaire" && (
        <Questionnaire 
          onComplete={handleQuestionnaireComplete}
          onBack={handleBackToHome}
        />
      )}
      
      {currentPage === "results" && assessmentResults && (
        <Results 
          answers={assessmentResults}
          onStartOver={handleStartOver}
          onContact={handleContact}
        />
      )}
      
      {currentPage === "contact" && (
        <ContactForm 
          onBack={handleBackToResults}
          assessmentData={assessmentResults}
        />
      )}
    </div>
  );
};

export default Index;
