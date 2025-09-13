import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, FileText, Users, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitch from "./LanguageSwitch";

interface HeroProps {
  onStartAssessment: () => void;
}

export default function Hero({ onStartAssessment }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen bg-gradient-subtle flex items-center relative">
      {/* Language Switch */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageSwitch />
      </div>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Title */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>
          </div>

          {/* Key Points */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-card shadow-soft border-border">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('hero.features.comprehensive')}</h3>
              <p className="text-muted-foreground">{t('hero.features.comprehensive.desc')}</p>
            </Card>
            
            <Card className="p-6 bg-card shadow-soft border-border">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('hero.features.instant')}</h3>
              <p className="text-muted-foreground">{t('hero.features.instant.desc')}</p>
            </Card>
            
            <Card className="p-6 bg-card shadow-soft border-border">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('hero.features.expert')}</h3>
              <p className="text-muted-foreground">{t('hero.features.expert.desc')}</p>
            </Card>
          </div>

          {/* Benefits List */}
          <div className="bg-card rounded-lg p-8 shadow-soft mb-12 text-left max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-center">Why This Assessment Matters</h3>
            <div className="space-y-4">
              {[
                "Avoid costly compliance violations and penalties",
                "Build customer trust with proper data protection",
                "Streamline your privacy processes and procedures",
                "Get expert recommendations tailored to your business"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Button 
              onClick={onStartAssessment}
              variant="hero" 
              size="lg"
              className="text-lg px-12 py-6 h-auto"
            >
              {t('hero.cta')}
            </Button>
            <p className="text-sm text-muted-foreground">
              Takes 5-7 minutes • Get instant results • No commitment required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}