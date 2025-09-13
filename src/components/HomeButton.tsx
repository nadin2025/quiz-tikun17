import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HomeButton() {
  const { t } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      asChild
      className="flex items-center gap-2"
    >
      <a
        href="https://www.gdpr.co.il"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Home className="w-4 h-4" />
        {t('common.home')}
      </a>
    </Button>
  );
}