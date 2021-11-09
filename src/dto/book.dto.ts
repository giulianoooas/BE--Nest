/* eslint-disable prettier/prettier */
export interface BookDTO {
  bookId?: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  categoryId: number;
  author: string;
  userId: number;
}