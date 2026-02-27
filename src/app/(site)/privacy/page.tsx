import Link from "next/link";

export const metadata = {
  title: "מדיניות פרטיות ותנאי שימוש | RIDERS",
  description:
    "מדיניות הפרטיות ותנאי השימוש של אתר ואפליקציית RIDERS – קהילת שליחי האופניים",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] pt-8 pb-24" dir="rtl">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <Link href="/" className="text-[var(--primary)] hover:underline text-sm mb-8 inline-block">
          ← חזרה לדף הבית
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-white/20 pb-4">
          מדיניות פרטיות ותנאי שימוש
        </h1>

        <div className="prose prose-invert max-w-none text-gray-200 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-white mt-8 mb-4">מבוא</h2>
            <p className="leading-relaxed">
              ברוכים הבאים לאתר RIDERS (להלן: &quot;האתר&quot;) ולאפליקציית RIDERS (להלן: &quot;האפליקציה&quot;).
              האתר והאפליקציה מופעלים על ידי RIDERS (להלן: &quot;הנהלת האתר&quot;).
            </p>
            <p className="leading-relaxed">
              השימוש באתר, בפורום, באפליקציה ובשירותים המוצעים כפוף לתנאים המפורטים להלן.
              עצם השימוש באתר מהווה הסכמה מלאה לתנאים אלה.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-10 mb-4">מדיניות פרטיות</h2>
            <h3 className="text-lg font-semibold text-white mt-6 mb-2">אילו מידע נאסף</h3>
            <p className="leading-relaxed">בעת שימוש באתר ובאפליקציה אנו עשויים לאסוף:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 mr-4">
              <li>שם מלא</li>
              <li>כתובת דוא&quot;ל</li>
              <li>מספר טלפון</li>
              <li>פרטי פרופיל משתמש</li>
              <li>כתובת IP</li>
              <li>נתוני גלישה</li>
              <li>נתוני מיקום (במסגרת האפליקציה)</li>
              <li>תוכן שמועלה על ידי המשתמש</li>
            </ul>
            <p className="leading-relaxed mt-2">המידע נאסף במסגרת הרשמה, שימוש בפורום, שימוש באפליקציה או יצירת קשר.</p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">מטרות השימוש במידע</h3>
            <p className="leading-relaxed">המידע משמש לצורך:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 mr-4">
              <li>ניהול הקהילה והפורום</li>
              <li>מתן שירותי האפליקציה</li>
              <li>תפעול מערכת SOS</li>
              <li>שיפור השירות</li>
              <li>אבטחת מידע</li>
              <li>מניעת שימוש לרעה</li>
              <li>יצירת קשר עם המשתמש</li>
              <li>ניהול מועדון הרוכבים</li>
              <li>שליחת עדכונים (בהתאם להסכמה)</li>
            </ul>
            <p className="leading-relaxed mt-2">המידע לא יימכר לצדדים שלישיים.</p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">נתוני מיקום (אפליקציה)</h3>
            <p className="leading-relaxed">השימוש באפליקציית RIDERS כולל עיבוד נתוני מיקום בזמן אמת לצורך: תפעול אירועי חירום, זיהוי קרבה לרוכבים אחרים, ותיעוד אירועים. המשתמש רשאי להפסיק שיתוף מיקום דרך הגדרות המכשיר. המשתמש רשאי לבקש מחיקת נתוניו בכל עת.</p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">שמירת מידע</h3>
            <p className="leading-relaxed">המידע יישמר לפרק הזמן הנדרש לצורך מטרותיו, או כנדרש לפי דין.</p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">אבטחת מידע</h3>
            <p className="leading-relaxed">אנו נוקטים באמצעים סבירים להגנת המידע בהתאם לנהוג בתעשייה. עם זאת, אין באפשרותנו להבטיח אבטחה מוחלטת.</p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">זכויות המשתמש</h3>
            <p className="leading-relaxed">למשתמש הזכות:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 mr-4">
              <li>לעיין במידע אודותיו</li>
              <li>לבקש תיקון מידע</li>
              <li>לבקש מחיקה</li>
              <li>לבטל הרשמה</li>
            </ul>
            <p className="leading-relaxed mt-2">פניות ייעשו באמצעות טופס יצירת קשר באתר.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-10 mb-4">תנאי שימוש</h2>
            <h3 className="text-lg font-semibold text-white mt-6 mb-2">שימוש מותר</h3>
            <p className="leading-relaxed">השימוש באתר ובפורום מיועד לשיח מקצועי, קהילתי ומכבד בלבד. אין לפרסם: תוכן פוגעני, לשון הרע, איומים, תוכן בלתי חוקי, מידע שקרי ביודעין.</p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">אחריות לתוכן משתמשים</h3>
            <p className="leading-relaxed">התוכן המפורסם על ידי משתמשים הוא באחריותם הבלעדית. הנהלת האתר אינה אחראית לתוכן שפורסם על ידי צדדים שלישיים. הנהלת האתר רשאית להסיר תוכן, לחסום משתמשים או להגביל גישה לפי שיקול דעתה הבלעדי.</p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">מנגנון דיווח</h3>
            <p className="leading-relaxed">כל אדם הסבור כי פורסם תוכן הפוגע בו רשאי לפנות אלינו. פניות ייבחנו באופן ענייני ובתום לב.</p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">אחריות מקצועית</h3>
            <p className="leading-relaxed">המידע באתר, לרבות מדריכים, המלצות ציוד ותכנים מקצועיים, נועד למטרות מידע כללי בלבד ואינו מהווה ייעוץ מקצועי, בטיחותי או משפטי. השימוש במידע נעשה באחריות המשתמש בלבד.</p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">אפיליאייט ושיתופי פעולה</h3>
            <p className="leading-relaxed">באתר עשויים להופיע קישורים מסחריים או שיתופי פעולה. ייתכן שהאתר יקבל עמלה בגין רכישות דרך קישורים אלה.</p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">הגבלת אחריות</h3>
            <p className="leading-relaxed">הנהלת האתר לא תישא באחריות לכל נזק ישיר או עקיף הנובע משימוש באתר, באפליקציה או בתכנים המפורסמים בו.</p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">מועדון RIDERS</h3>
            <p className="leading-relaxed">הצטרפות למועדון כפופה לשיקול דעת הנהלת האתר. חברות במועדון אינה מקנה זכויות קנייניות או משפטיות כלשהן. הנהלת האתר רשאית לשלול חברות בכל עת.</p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">אפליקציית SOS</h3>
            <p className="leading-relaxed">האפליקציה נועדה לסיוע קהילתי בלבד ואינה מהווה שירות חירום רשמי. האפליקציה אינה מחליפה משטרה, מד&quot;א או כל גורם מוסמך אחר.</p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">שינוי תנאים</h3>
            <p className="leading-relaxed">הנהלת האתר רשאית לעדכן תנאים אלה מעת לעת. המשך שימוש באתר מהווה הסכמה לנוסח המעודכן.</p>

            <h3 className="text-lg font-semibold text-white mt-6 mb-2">סמכות שיפוט</h3>
            <p className="leading-relaxed">על תנאים אלה יחולו דיני מדינת ישראל. סמכות השיפוט הבלעדית תהא לבתי המשפט בפתח תקווה.</p>
          </section>

          <p className="text-gray-400 text-sm mt-12">לאחרונה עודכן: {new Date().toLocaleDateString("he-IL")}</p>
        </div>
      </div>
    </main>
  );
}
