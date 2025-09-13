import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitch from "./LanguageSwitch";

interface QuestionnaireProps {
  onComplete: (results: any) => void;
  onBack: () => void;
}

export default function Questionnaire({ onComplete, onBack }: QuestionnaireProps) {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});

  // Dynamic questions using translation keys
  const getQuestions = () => [
    {
      id: "data-inventory",
      question: t('questions.data_inventory'),
      category: t('category.data_management'),
      options: [
        { value: "yes_fully", label: t('answers.yes_fully'), weight: 5 },
        { value: "yes_partially", label: t('answers.yes_partially'), weight: 3 },
        { value: "planning", label: t('answers.planning'), weight: 2 },
        { value: "no_not_priority", label: t('answers.no_not_priority'), weight: 1 },
        { value: "unsure", label: t('answers.unsure'), weight: 0 }
      ]
    },
    {
      id: "consent-mechanism",
      question: t('questions.consent_mechanism'),
      category: t('category.consent_rights'),
      options: [
        { value: "yes_fully", label: t('answers.yes_fully'), weight: 5 },
        { value: "yes_partially", label: t('answers.yes_partially'), weight: 3 },
        { value: "planning", label: t('answers.planning'), weight: 2 },
        { value: "no_not_priority", label: t('answers.no_not_priority'), weight: 1 },
        { value: "unsure", label: t('answers.unsure'), weight: 0 }
      ]
    },
    {
      id: "access-controls",
      question: t('questions.access_controls'),
      category: t('category.security'),
      options: [
        { value: "yes_fully", label: t('answers.yes_fully'), weight: 5 },
        { value: "yes_partially", label: t('answers.yes_partially'), weight: 3 },
        { value: "planning", label: t('answers.planning'), weight: 2 },
        { value: "no_not_priority", label: t('answers.no_not_priority'), weight: 1 },
        { value: "unsure", label: t('answers.unsure'), weight: 0 }
      ]
    },
    {
      id: "data-retention",
      question: t('questions.data_retention'),
      category: t('category.data_lifecycle'),
      options: [
        { value: "yes_fully", label: t('answers.yes_fully'), weight: 5 },
        { value: "yes_partially", label: t('answers.yes_partially'), weight: 3 },
        { value: "planning", label: t('answers.planning'), weight: 2 },
        { value: "no_not_priority", label: t('answers.no_not_priority'), weight: 1 },
        { value: "unsure", label: t('answers.unsure'), weight: 0 }
      ]
    },
    {
      id: "incident-response",
      question: t('questions.incident_response'),
      category: t('category.incident_management'),
      options: [
        { value: "yes_fully", label: t('answers.yes_fully'), weight: 5 },
        { value: "yes_partially", label: t('answers.yes_partially'), weight: 3 },
        { value: "planning", label: t('answers.planning'), weight: 2 },
        { value: "no_not_priority", label: t('answers.no_not_priority'), weight: 1 },
        { value: "unsure", label: t('answers.unsure'), weight: 0 }
      ]
    },
    {
      id: "dpo-designation",
      question: t('questions.dpo_designation'),
      category: t('category.governance'),
      options: [
        { value: "yes_fully", label: t('answers.yes_fully'), weight: 5 },
        { value: "yes_partially", label: t('answers.yes_partially'), weight: 3 },
        { value: "planning", label: t('answers.planning'), weight: 2 },
        { value: "no_not_priority", label: t('answers.no_not_priority'), weight: 1 },
        { value: "unsure", label: t('answers.unsure'), weight: 0 }
      ]
    },
    {
      id: "staff-training",
      question: t('questions.staff_training'),
      category: t('category.training_awareness'),
      options: [
        { value: "yes_fully", label: t('answers.yes_fully'), weight: 5 },
        { value: "yes_partially", label: t('answers.yes_partially'), weight: 3 },
        { value: "planning", label: t('answers.planning'), weight: 2 },
        { value: "no_not_priority", label: t('answers.no_not_priority'), weight: 1 },
        { value: "unsure", label: t('answers.unsure'), weight: 0 }
      ]
    }
  ];

  const questions = getQuestions();
  const totalQuestions = questions.length;

  const handleAnswerSelect = (value: string) => {
    const currentQ = questions[currentQuestion];
    const selectedOption = currentQ.options.find(opt => opt.value === value);
    
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        question: currentQ.question,
        answer: value,
        text: selectedOption?.label,
        weight: selectedOption?.weight || 0,
        category: currentQ.category
      }
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Complete the questionnaire
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const isAnswered = answers[questions[currentQuestion]?.id];
  const progress = ((currentQuestion + (isAnswered ? 1 : 0)) / totalQuestions) * 100;

  return (
    <section className="min-h-screen bg-background py-12 relative">
      {/* Language Switch */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageSwitch />
      </div>

      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {t('questionnaire.back')}
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {t('questionnaire.title')}
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            {t('questionnaire.subtitle')}
          </p>
          
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">
                {t('questionnaire.progress').replace('{current}', (currentQuestion + 1).toString()).replace('{total}', totalQuestions.toString())}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 shadow-elegant mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6 leading-relaxed">
            {questions[currentQuestion]?.question}
          </h2>
          
          <RadioGroup 
            value={answers[questions[currentQuestion]?.id]?.answer || ""}
            onValueChange={handleAnswerSelect}
            className="space-y-4"
          >
            {questions[currentQuestion]?.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className="flex-1 cursor-pointer text-foreground"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {t('questionnaire.previous')}
          </Button>
          
          <div className="flex space-x-2">
            {Array.from({ length: totalQuestions }, (_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index < currentQuestion 
                    ? "bg-success" 
                    : index === currentQuestion 
                      ? isAnswered ? "bg-primary" : "bg-muted" 
                      : "bg-muted"
                }`}
              />
            ))}
          </div>
          
          <Button 
            onClick={handleNext}
            disabled={!isAnswered}
            variant={currentQuestion === totalQuestions - 1 ? "hero" : "default"}
            className="flex items-center"
          >
            {currentQuestion === totalQuestions - 1 ? t('questionnaire.complete') : t('questionnaire.next')}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}