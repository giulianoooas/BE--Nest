/* eslint-disable prettier/prettier */
export interface BookDTO {
  bookId?: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  categoryId: number;
  author: string;
  userId: number;
}