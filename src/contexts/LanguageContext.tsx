import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Hero Section
    'hero.title': 'Privacy Compliance Assessment',
    'hero.subtitle': 'Evaluate your business readiness for Israel Privacy Law Amendment 17',
    'hero.description': 'Get instant insights into your privacy compliance gaps and receive expert recommendations to ensure full compliance with תיקון 17 regulations.',
    'hero.cta': 'Start Free Assessment',
    'hero.features.comprehensive': 'Comprehensive Assessment',
    'hero.features.comprehensive.desc': '7 key areas of privacy compliance',
    'hero.features.instant': 'Instant Results',
    'hero.features.instant.desc': 'Immediate gap analysis and recommendations',
    'hero.features.expert': 'Expert Guidance',
    'hero.features.expert.desc': 'Professional privacy consultation available',

    // Questionnaire
    'questionnaire.title': 'Privacy Compliance Assessment',
    'questionnaire.subtitle': 'Answer the following questions to evaluate your תיקון 17 readiness',
    'questionnaire.progress': 'Question {current} of {total}',
    'questionnaire.next': 'Next Question',
    'questionnaire.previous': 'Previous',
    'questionnaire.complete': 'Complete Assessment',
    'questionnaire.back': 'Back to Home',

    // Questions
    'questions.data_inventory': 'Does your organization maintain a comprehensive inventory of all personal data you collect, process, and store?',
    'questions.consent_mechanism': 'Do you have clear and documented consent mechanisms for data collection from individuals?',
    'questions.access_controls': 'Are there proper access controls and user permissions in place for accessing personal data?',
    'questions.data_retention': 'Do you have documented data retention and deletion policies that are actively enforced?',
    'questions.incident_response': 'Is there a formal incident response plan for data breaches or privacy violations?',
    'questions.dpo_designation': 'Have you designated a Data Protection Officer or privacy-responsible person?',
    'questions.staff_training': 'Do your employees receive regular training on privacy laws and data protection practices?',

    // Answer options
    'answers.yes_fully': 'Yes, fully implemented',
    'answers.yes_partially': 'Yes, partially implemented',
    'answers.planning': 'Planning to implement',
    'answers.no_not_priority': 'No, not a current priority',
    'answers.unsure': 'Unsure/Need guidance',

    // Results
    'results.title': 'Your Privacy Compliance Assessment Results',
    'results.subtitle': 'Based on your responses, here\'s how your business stands regarding תיקון 17 compliance',
    'results.excellent': 'Excellent',
    'results.excellent.desc': 'Your privacy practices are strong',
    'results.good': 'Good',
    'results.good.desc': 'You have solid foundations with room for improvement',
    'results.needs_improvement': 'Needs Improvement',
    'results.needs_improvement.desc': 'Several areas require attention',
    'results.critical': 'Critical',
    'results.critical.desc': 'Immediate action required to ensure compliance',
    'results.recommendations': 'Priority Recommendations',
    'results.next_steps': 'Ready to Improve Your Compliance?',
    'results.next_steps.desc': 'Our privacy experts can help you implement these recommendations and ensure full compliance with תיקון 17. Get personalized guidance tailored to your business needs.',
    'results.contact_experts': 'Contact Our Privacy Experts',
    'results.download_csv': 'Download Results (CSV)',
    'results.retake': 'Retake Assessment',
    'results.email': 'Email',

    // Contact Form
    'contact.title': 'Contact Our Privacy Experts',
    'contact.subtitle': 'Get personalized guidance for תיקון 17 compliance',
    'contact.back': 'Back to Results',
    'contact.form.title': 'Send Us a Message',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.company': 'Company Name',
    'contact.form.phone': 'Phone Number',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'Tell us about your privacy compliance needs or any specific questions you have about תיקון 17...',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.required': '*',
    'contact.info.title': 'Get in Touch',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',
    'contact.info.phone.desc': 'Available upon request',
    'contact.info.location': 'Location',
    'contact.info.location.desc': 'Israel',
    'contact.why_choose': 'Why Choose Our Experts?',
    'contact.assessment_summary': 'Assessment Summary',
    'contact.assessment_summary.desc': 'We have your assessment results and will provide personalized recommendations based on your responses.',
    'contact.success.title': 'Contact Request Saved',
    'contact.success.desc': 'Your data has been downloaded as CSV. We\'ll contact you within 24 hours.',

    // Categories
    'category.data_management': 'Data Management',
    'category.consent_rights': 'Consent & Rights',
    'category.security': 'Security',
    'category.data_lifecycle': 'Data Lifecycle',
    'category.incident_management': 'Incident Management',
    'category.governance': 'Governance',
    'category.training_awareness': 'Training & Awareness',

    // Recommendations
    'rec.data_management': 'Implement a comprehensive data inventory system to track all personal data',
    'rec.consent_rights': 'Establish clear consent mechanisms and user rights management',
    'rec.security': 'Strengthen access controls and implement role-based permissions',
    'rec.data_lifecycle': 'Create automated data retention and deletion policies',
    'rec.incident_management': 'Develop and test a comprehensive incident response plan',
    'rec.governance': 'Designate a Data Protection Officer or privacy responsible person',
    'rec.training_awareness': 'Implement regular privacy training for all staff members',

    // Common
    'common.language': 'Language',
    'common.english': 'English',
    'common.hebrew': 'עברית',
    'common.home': 'Home',
  },
  he: {
    // Hero Section
    'hero.title': 'הערכת ציות לפרטיות',
    'hero.subtitle': 'הערכת מוכנות העסק שלך לתיקון 17 לחוק הגנת הפרטיות',
    'hero.description': 'קבל תובנות מיידיות על פערי הציות לפרטיות שלך וקבל המלצות מומחים להבטחת ציות מלא לתקנות תיקון 17.',
    'hero.cta': 'התחל הערכה חינמית',
    'hero.features.comprehensive': 'הערכה מקיפה',
    'hero.features.comprehensive.desc': '7 תחומי מפתח של ציות לפרטיות',
    'hero.features.instant': 'תוצאות מיידיות',
    'hero.features.instant.desc': 'ניתוח פערים והמלצות מיידיות',
    'hero.features.expert': 'הדרכת מומחים',
    'hero.features.expert.desc': 'ייעוץ פרטיות מקצועי זמין',

    // Questionnaire
    'questionnaire.title': 'הערכת ציות לפרטיות',
    'questionnaire.subtitle': 'ענה על השאלות הבאות כדי להעריך את המוכנות שלך לתיקון 17',
    'questionnaire.progress': 'שאלה {current} מתוך {total}',
    'questionnaire.next': 'השאלה הבאה',
    'questionnaire.previous': 'חזרה',
    'questionnaire.complete': 'השלם הערכה',
    'questionnaire.back': 'חזרה לעמוד הבית',

    // Questions
    'questions.data_inventory': 'האם הארגון שלך מתחזק מלאי מקיף של כל הנתונים האישיים שאתם אוספים, מעבדים ומאחסנים?',
    'questions.consent_mechanism': 'האם יש לכם מנגנוני הסכמה ברורים ומתועדים לאיסוף נתונים מאנשים?',
    'questions.access_controls': 'האם קיימים בקרת גישה והרשאות משתמש מתאימות לגישה לנתונים אישיים?',
    'questions.data_retention': 'האם יש לכם מדיניות שמירה ומחיקת נתונים מתועדת שנאכפת באופן פעיל?',
    'questions.incident_response': 'האם קיימת תוכנית תגובה פורמלית לאירועי הפרת נתונים או הפרות פרטיות?',
    'questions.dpo_designation': 'האם מיניתם קצין הגנת נתונים או אדם אחראי על פרטיות?',
    'questions.staff_training': 'האם העובדים שלכם מקבלים הכשרה סדירה על חוקי פרטיות ושיטות הגנת נתונים?',

    // Answer options
    'answers.yes_fully': 'כן, מיושם במלואו',
    'answers.yes_partially': 'כן, מיושם חלקית',
    'answers.planning': 'מתכננים ליישם',
    'answers.no_not_priority': 'לא, לא עדיפות נוכחית',
    'answers.unsure': 'לא בטוח/זקוק להנחיה',

    // Results
    'results.title': 'תוצאות הערכת הציות לפרטיות שלך',
    'results.subtitle': 'בהתבסס על התשובות שלך, כך עומד העסק שלך ביחס לציות תיקון 17',
    'results.excellent': 'מעולה',
    'results.excellent.desc': 'שיטות הפרטיות שלך חזקות',
    'results.good': 'טוב',
    'results.good.desc': 'יש לך יסודות איתנים עם מקום לשיפור',
    'results.needs_improvement': 'זקוק לשיפור',
    'results.needs_improvement.desc': 'מספר תחומים דורשים תשומת לב',
    'results.critical': 'קריטי',
    'results.critical.desc': 'נדרשת פעולה מיידית להבטחת ציות',
    'results.recommendations': 'המלצות עדיפות',
    'results.next_steps': 'מוכן לשפר את הציות שלך?',
    'results.next_steps.desc': 'מומחי הפרטיות שלנו יכולים לעזור לך ליישם את ההמלצות הללו ולהבטיח ציות מלא לתיקון 17. קבל הדרכה מותאמת אישית לצרכי העסק שלך.',
    'results.contact_experts': 'צור קשר עם מומחי הפרטיות שלנו',
    'results.download_csv': 'הורד תוצאות (CSV)',
    'results.retake': 'בצע הערכה מחדש',
    'results.email': 'אימייל',

    // Contact Form
    'contact.title': 'צור קשר עם מומחי הפרטיות שלנו',
    'contact.subtitle': 'קבל הדרכה מותאמת אישית לציות תיקון 17',
    'contact.back': 'חזרה לתוצאות',
    'contact.form.title': 'שלח לנו הודעה',
    'contact.form.name': 'שם מלא',
    'contact.form.email': 'כתובת אימייל',
    'contact.form.company': 'שם החברה',
    'contact.form.phone': 'מספר טלפון',
    'contact.form.message': 'הודעה',
    'contact.form.message.placeholder': 'ספר לנו על צרכי ציות הפרטיות שלך או שאלות ספציפיות שיש לך על תיקון 17...',
    'contact.form.send': 'שלח הודעה',
    'contact.form.sending': 'שולח...',
    'contact.form.required': '*',
    'contact.info.title': 'יצירת קשר',
    'contact.info.email': 'אימייל',
    'contact.info.phone': 'טלפון',
    'contact.info.phone.desc': 'זמין לפי בקשה',
    'contact.info.location': 'מיקום',
    'contact.info.location.desc': 'ישראל',
    'contact.why_choose': 'למה לבחור במומחים שלנו?',
    'contact.assessment_summary': 'סיכום הערכה',
    'contact.assessment_summary.desc': 'יש לנו את תוצאות ההערכה שלך ונספק המלצות מותאמות אישית בהתבסס על התשובות שלך.',
    'contact.success.title': 'בקשת קשר נשמרה',
    'contact.success.desc': 'הנתונים שלך הורדו כ-CSV. ניצור איתך קשר תוך 24 שעות.',

    // Categories
    'category.data_management': 'ניהול נתונים',
    'category.consent_rights': 'הסכמה וזכויות',
    'category.security': 'אבטחה',
    'category.data_lifecycle': 'מחזור חיי נתונים',
    'category.incident_management': 'ניהול אירועים',
    'category.governance': 'ממשל',
    'category.training_awareness': 'הכשרה ומודעות',

    // Recommendations
    'rec.data_management': 'יישום מערכת מלאי נתונים מקיפה למעקב אחר כל הנתונים האישיים',
    'rec.consent_rights': 'הקמת מנגנוני הסכמה ברורים וניהול זכויות משתמשים',
    'rec.security': 'חיזוק בקרת גישה ויישום הרשאות מבוססות תפקיד',
    'rec.data_lifecycle': 'יצירת מדיניות שמירה ומחיקת נתונים אוטומטית',
    'rec.incident_management': 'פיתוח ובדיקה של תוכנית תגובה מקיפה לאירועים',
    'rec.governance': 'מינוי קצין הגנת נתונים או אדם אחראי על פרטיות',
    'rec.training_awareness': 'יישום הכשרת פרטיות סדירה לכל חברי הצוות',

    // Common
    'common.language': 'שפה',
    'common.english': 'English',
    'common.hebrew': 'עברית',
    'common.home': 'בית',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const isRTL = language === 'he';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-hebrew' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};