import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  CheckCircle, 
  Mail, 
  FileText, 
  Shield,
  Users,
  Database,
  Settings,
  Download
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitch from "./LanguageSwitch";

interface ResultsProps {
  answers: { [key: string]: any };
  onStartOver: () => void;
  onContact: () => void;
}

const categoryIcons: { [key: string]: any } = {
  "Data Management": Database,
  "Consent & Rights": Users,
  "Security": Shield,
  "Data Lifecycle": Settings,
  "Incident Management": AlertTriangle,
  "Governance": FileText,
  "Training & Awareness": Users
};

export default function Results({ answers, onStartOver, onContact }: ResultsProps) {
  const { t } = useLanguage();
  // Calculate overall score
  const totalWeight = Object.values(answers).reduce((sum: number, answer: any) => sum + answer.weight, 0);
  const maxPossibleScore = Object.keys(answers).length * 5;
  const overallScore = Math.round((totalWeight / maxPossibleScore) * 100);

  // Get score level and recommendations
  const getScoreLevel = (score: number) => {
    if (score >= 80) return { level: "Excellent", color: "success", description: "Your privacy practices are strong" };
    if (score >= 60) return { level: "Good", color: "primary", description: "You have solid foundations with room for improvement" };
    if (score >= 40) return { level: "Needs Improvement", color: "warning", description: "Several areas require attention" };
    return { level: "Critical", color: "destructive", description: "Immediate action required to ensure compliance" };
  };

  const scoreLevel = getScoreLevel(overallScore);

  // Group answers by category
  const categoryScores = Object.values(answers).reduce((acc: any, answer: any) => {
    if (!acc[answer.category]) {
      acc[answer.category] = { total: 0, count: 0, answers: [] };
    }
    acc[answer.category].total += answer.weight;
    acc[answer.category].count += 1;
    acc[answer.category].answers.push(answer);
    return acc;
  }, {});

  // Get recommendations based on low scores
  const getRecommendations = () => {
    const recommendations = [];
    
    Object.entries(categoryScores).forEach(([category, data]: [string, any]) => {
      const categoryScore = (data.total / (data.count * 5)) * 100;
      if (categoryScore < 60) {
        switch (category) {
          case "Data Management":
            recommendations.push("Implement a comprehensive data inventory system to track all personal data");
            break;
          case "Consent & Rights":
            recommendations.push("Establish clear consent mechanisms and user rights management");
            break;
          case "Security":
            recommendations.push("Strengthen access controls and implement role-based permissions");
            break;
          case "Data Lifecycle":
            recommendations.push("Create automated data retention and deletion policies");
            break;
          case "Incident Management":
            recommendations.push("Develop and test a comprehensive incident response plan");
            break;
          case "Governance":
            recommendations.push("Designate a Data Protection Officer or privacy responsible person");
            break;
          case "Training & Awareness":
            recommendations.push("Implement regular privacy training for all staff members");
            break;
        }
      }
    });

    return recommendations;
  };

  const recommendations = getRecommendations();

  const downloadAssessmentCSV = () => {
    const csvData = [
      ['Assessment Results - תיקון 17 Privacy Compliance'],
      ['Generated on', new Date().toISOString()],
      ['Overall Score', `${overallScore}%`],
      ['Assessment Level', scoreLevel.level],
      [''],
      ['Question', 'Answer', 'Category', 'Weight', 'Score'],
      ...Object.entries(answers).map(([question, answer]: [string, any]) => [
        question,
        answer.text || 'N/A',
        answer.category,
        answer.weight.toString(),
        `${Math.round((answer.weight / 5) * 100)}%`
      ]),
      [''],
      ['Category Scores'],
      ['Category', 'Score'],
      ...Object.entries(categoryScores).map(([category, data]: [string, any]) => [
        category,
        `${Math.round((data.total / (data.count * 5)) * 100)}%`
      ]),
      [''],
      ['Recommendations'],
      ...recommendations.map((rec, index) => [`${index + 1}`, rec])
    ];

    const csvContent = csvData.map(row => 
      Array.isArray(row) 
        ? row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
        : `"${String(row).replace(/"/g, '""')}"`
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `privacy-assessment-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Your Privacy Compliance Assessment Results
          </h1>
          <p className="text-muted-foreground">
            Based on your responses, here's how your business stands regarding תיקון 17 compliance
          </p>
        </div>

        {/* Overall Score Card */}
        <Card className="p-8 mb-8 shadow-elegant text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-primary mb-2">{overallScore}%</div>
            <Badge 
              variant={scoreLevel.color === "success" ? "default" : scoreLevel.color === "warning" ? "secondary" : "destructive"}
              className="text-lg px-4 py-2"
            >
              {scoreLevel.level}
            </Badge>
            <p className="text-muted-foreground mt-4 text-lg">
              {scoreLevel.description}
            </p>
          </div>
          <Progress value={overallScore} className="w-full max-w-md mx-auto h-4" />
        </Card>

        {/* Category Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {Object.entries(categoryScores).map(([category, data]: [string, any]) => {
            const categoryScore = Math.round((data.total / (data.count * 5)) * 100);
            const IconComponent = categoryIcons[category] || FileText;
            
            return (
              <Card key={category} className="p-6">
                <div className="flex items-center mb-4">
                  <IconComponent className="w-6 h-6 text-primary mr-3" />
                  <h3 className="font-semibold text-foreground">{category}</h3>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-foreground">{categoryScore}%</span>
                  {categoryScore >= 80 ? (
                    <CheckCircle className="w-6 h-6 text-success" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-warning" />
                  )}
                </div>
                <Progress value={categoryScore} className="w-full" />
              </Card>
            );
          })}
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <Card className="p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 text-warning mr-3" />
              Priority Recommendations
            </h3>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-secondary/50 rounded-lg">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-foreground">{rec}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="p-8 text-center bg-gradient-subtle">
          <h3 className="text-2xl font-semibold mb-4">Ready to Improve Your Compliance?</h3>
          <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
            Our privacy experts can help you implement these recommendations and ensure full 
            compliance with תיקון 17. Get personalized guidance tailored to your business needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onContact}
              variant="hero" 
              size="lg"
              className="text-lg px-8"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Our Privacy Experts
            </Button>
            
            <Button 
              onClick={downloadAssessmentCSV}
              variant="secondary" 
              size="lg"
              className="text-lg px-8"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Results (CSV)
            </Button>
            
            <Button 
              onClick={onStartOver}
              variant="outline" 
              size="lg"
              className="text-lg px-8"
            >
              Retake Assessment
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Email: <span className="font-medium">ciso@thedayafter.co.il</span>
          </p>
        </Card>
      </div>
    </section>
  );
}