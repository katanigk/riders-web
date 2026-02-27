export default function Home() {
  return (
    <main className="relative z-0 min-h-screen bg-[var(--background)] pb-24" dir="ltr">
      <section className="flex flex-col items-center pt-12 px-6 pb-2">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="relative w-[620px] md:w-[800px] aspect-square">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain object-top"
            >
              <source src="/logodark.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="hidden text-base md:text-lg text-gray-400">לוקחים את השליחות ברצינות</p>
        </div>
      </section>

      <section className="w-full bg-gray-950 pt-2 pb-32 px-4 md:px-12 lg:px-24" style={{ display: 'grid', justifyContent: 'center', transform: 'translateY(-100px)' }}>
        <div className="content-block flex flex-col gap-6" dir="rtl">
          <div className="bg-white/5 rounded-xl p-8 flex flex-col">
            <div className="w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-[#EEEEEE] pb-4 mb-6 border-b border-white/20">
              מה זה RIDERS? קהילת שליחי האופניים בפתח תקווה
            </h2>
            <p className="text-xl text-gray-200 mb-4 leading-relaxed font-medium">
              שליח אופניים בפתח תקווה? נמאס לך לעבוד לבד?
            </p>
            <p className="text-xl text-gray-200 mb-6 leading-relaxed">
              RIDERS היא קהילה עירונית של שליחי אופניים בפתח תקווה, הפועלת לחזק את הרוכבים בעיר ברמה המקצועית, הכלכלית והבטיחותית.
            </p>
            <p className="text-xl text-gray-200 mb-6 leading-relaxed">
              אנחנו מאמינים ששליחים לא צריכים לעבוד לבד, לא צריכים להתמודד לבד עם אתגרי השטח, ולא צריכים להרגיש שאין להם גב אמיתי מאחוריהם.
            </p>
            <p className="text-xl text-gray-200 leading-relaxed">
              שליחי אופניים הם חלק בלתי נפרד מהעיר, מניעים את הכלכלה המקומית ופועלים בכל מזג אוויר. הגיע הזמן להתייחס אלינו בהתאם.
            </p>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-8 flex flex-col">
            <div className="w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-[#EEEEEE] pb-4 mb-6 border-b border-white/20">
              מה כוללת קהילת RIDERS בפתח תקווה?
            </h2>
            <ul className="text-xl text-gray-200 mb-6 leading-relaxed space-y-3 list-disc list-inside marker:text-[var(--primary)]">
              <li>קהילה אמיתית לשליחי אופניים בפתח תקווה.</li>
              <li>שיתוף ידע מקצועי מהשטח.</li>
              <li>מערכת חירום לרגעים חשובים.</li>
              <li>ערוץ עדכונים לרוכבים.</li>
              <li>המלצות וציוד לשליחי אופניים.</li>
              <li>וסטנדרט מקצועי חדש בעיר.</li>
            </ul>
            <p className="text-xl text-gray-200 leading-relaxed">
              RIDERS מחברת בין שליחים ויוצרת כוח דרך אחדות, מקצועיות ונוכחות.
            </p>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-8 flex flex-col">
            <div className="w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-[#EEEEEE] pb-4 mb-6 border-b border-white/20">
              למה קהילת שליחי אופניים משנה את כללי המשחק?
            </h2>
            <p className="text-xl text-gray-200 mb-6 leading-relaxed">
              כששליחים מתאגדים, הביטחון בשטח עולה. המקצועיות מתחזקת. וכפועל יוצא, גם ההכנסה משתפרת.
            </p>
            <p className="text-xl text-gray-200 leading-relaxed">
              קהילה יוצרת סטנדרט. סטנדרט יוצר אמון. ואמון מייצר ערך לנו ולעיר כולה.
            </p>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-8 flex flex-col">
            <div className="w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-[#EEEEEE] pb-4 mb-6 border-b border-white/20">
              מועדון RIDERS – מועדון שליחים מקצועיים בפתח תקווה
            </h2>
            <p className="text-xl text-gray-200 mb-6 leading-relaxed">
              בתוך קהילת RIDERS פועל מועדון ליבה מקצועי.
            </p>
            <p className="text-xl text-gray-200 mb-6 leading-relaxed">
              המועדון מיועד לרוכבים שלוקחים את השליחות ברצינות, ששואפים לסטנדרט גבוה בשטח, ושמוכנים להיות חלק מכוח משמעותי בעיר.
            </p>
            <p className="text-xl text-gray-200 mb-6 leading-relaxed">
              הכניסה למועדון מתבצעת בהזמנה, או באמצעות הגשת מועמדות הנבחנת לפי קריטריונים מקצועיים.
            </p>
            <p className="text-xl text-gray-200 leading-relaxed">
              לא כל רוכב הוא חבר מועדון. אבל כל רוכב יכול לשאוף להיות כזה.
            </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-8 flex flex-col mt-8 md:mt-12">
            <div className="w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-[#EEEEEE] pb-4 mb-6 border-b border-white/20">
              אני רוצה להיות חלק – הצטרף ל-RIDERS
            </h2>
            <p className="text-xl text-gray-200 leading-relaxed">
              אם אתה שליח אופניים בפתח תקווה ומחפש קהילה עם גב אמיתי וזהות מקצועית — אנחנו מחכים לך ב-RIDERS.
            </p>
            <p className="text-xl text-gray-200 mt-4 leading-relaxed">
              הצעד הראשון פשוט וחינם — <strong className="text-[var(--primary)]">הצטרף עכשיו</strong>
            </p>
            <p className="text-lg text-gray-400 mt-6">
              מעוניין במועדון? הגשת מועמדות נפתחת רק לנרשמים.
            </p>
            </div>
          </div>
        </div>
      </section>
      <div style={{ height: '120px' }} aria-hidden />
    </main>
  );
}
