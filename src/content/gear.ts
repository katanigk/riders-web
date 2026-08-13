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
};

export const clothingSeasons: ClothingSeason[] = [
  {
    slug: "kayitz",
    title: "קיץ",
    image: "/gear/bigud-kayitz-pov.png",
  },
  {
    slug: "choref",
    title: "חורף",
    image: "/gear/bigud-choref-pov.png",
  },
];
