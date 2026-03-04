/**
 * הרשאות משתמש ב-Firestore
 * Collection: users
 * Field: role
 *
 * "member"  - חבר קהילה (ברירת מחדל בהרשמה)
 * "club"    - חבר מועדון / ריידר (נקבע ידנית או באמצעות תהליך קידום)
 */
export const ROLES = {
  MEMBER: "member",
  CLUB: "club",
} as const;

export type FirestoreRole = (typeof ROLES)[keyof typeof ROLES];
