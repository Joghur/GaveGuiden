export type Section = "main" | "guide";
export type LanguageShort = "dk" | "de" | "gb";
export type WishStatus = "bought" | "seekingFunds" | "comment" | "pending";
export type muiColors =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "default"
  | "secondary"
  | "primary"
  | undefined;

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
  id?: string;
  groupId: number;
  titel: string;
  content?: string;
  price?: string;
  status?: WishStatus;
  person?: string;
  giver?: string;
  url?: string;
  imageUri?: string;
  comments: Comment[];
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
