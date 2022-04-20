export type Section = "main" | "guide" | "invitation";
export type LanguageShort = "dk" | "de" | "gb";
export type WishStatus = "bought" | "seekingFunds" | undefined;
export type WishPerson = "Esther" | "Isabel";

// type DbDate = { seconds: number; nanoseconds: number };

export interface Comment {
  commenter: string;
  comment: string;
  createdAt: any;
}

// export interface DbComment {
//   commenter: string;
//   comment: string;
//   createdAt: DbDate;
// }

export interface Wish extends WishBase {
  createdAt: any;
  updatedAt?: any;
}

// export interface DbWish extends WishBase {
//   createdAt: DbDate;
//   updatedAt?: DbDate;
// }

export interface WishBase {
  groupId: number;
  titel: string;
  content?: string;
  price?: string;
  status?: WishStatus;
  person: WishPerson;
  url?: string;
  imageUri?: string;
  comments?: Comment[];
}

export interface MainPost {
  title: string;
  image: string;
  imageLabel: string;
}

export interface Post extends MainPost {
  description: string;
  link: Section;
}
