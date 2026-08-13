export type GearDepartment = {
  slug: string;
  title: string;
  description: string;
};

export const gearDepartments: GearDepartment[] = [
  {
    slug: "bigud",
    title: "ביגוד",
    description: "ביגוד לשליחים שעובדים בשטח בכל מזג אוויר.",
  },
  {
    slug: "migun",
    title: "מיגון",
    description: "מיגון ששומר עליך בנסיעות הארוכות בעיר.",
  },
  {
    slug: "tosafot",
    title: "תוספות",
    description: "תוספות וציוד משלים שמשפרים את העבודה על האופניים.",
  },
];

export function getGearDepartments() {
  return gearDepartments;
}

export function getGearDepartment(slug: string) {
  return gearDepartments.find((d) => d.slug === slug) ?? null;
}

export type ClothingSeason = {
  slug: string;
  title: string;
  image: string;
  description: string;
};

export const clothingSeasons: ClothingSeason[] = [
  {
    slug: "kayitz",
    title: "בגדי קיץ",
    image: "/gear/bigud-kayitz-pov.png",
    description:
      "ביגוד קיץ לשליחי אופניים שעובדים בחום הישראלי: בגדים קלים שנושמים, מנדפים זיעה, ולא נדבקים לגוף ברכיבה ארוכה. כאן תמצאו פריטים ליום חם בעיר – נוחים, עמידים, ומותאמים לשעות על האופניים.",
  },
  {
    slug: "choref",
    title: "בגדי חורף",
    image: "/gear/bigud-choref-pov.png",
    description:
      "ביגוד חורף לשליחי אופניים שעובדים בגשם, בבוץ ובקור. שכבות שמגינות בלי להכביד, בגדים שנשארים יבשים ככל האפשר, ופריטים שמחזיקים מעמד במשמרות ארוכות בשטח. כאן נרכז את מה שעובד בחורף הישראלי – לא שלג, אלא רטיבות אמיתית.",
  },
];

export function getClothingSeasons() {
  return clothingSeasons;
}

export function getClothingSeason(slug: string) {
  return clothingSeasons.find((s) => s.slug === slug) ?? null;
}
