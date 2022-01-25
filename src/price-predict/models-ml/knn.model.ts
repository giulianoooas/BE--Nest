/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Book } from 'src/entities/book.entity';

@Injectable()
export class KnnUnsupervised {
  /*
        I will make a knn unsupervised to predict books to be shown for a user after he will visit a page.
    */
  private trainingData: Book[] = [];

  public setTrainingData(trainingData: Book[]) {
    this.trainingData = trainingData;
  }

  public predictBooks(bookId: number): Book[] {
    let book: Book;
    for (const trainingBook of this.trainingData) {
      if (bookId == trainingBook.bookId) {        
        book = trainingBook;        
        break;
      }
    }

    const data = this.calculateDistance(book);
    data.sort((a, b) => {
      return a.distance - b.distance;
    });

    const length = Math.min(data.length, 3);
    const books: Book[] = [];
    for (let i = 0; i < length; i++) {
      if (bookId === data[i].bookId) {
        continue;
      }
      for (const book of this.trainingData) {
        if (book.bookId === data[i].bookId) {
          books.push(book);
        }
      }
    }
    return books;
  }

  private calculateDistance(book: Book): {
    bookId: number;
    distance: number;
  }[] {
    /*
            Distance will be k * abs(price_book - price_book_to_verify)
            k will be 1 if category is book.category, 2 otherwise
    */
    const data: { bookId: number; distance: number }[] = [];
    for (const trainingBook of this.trainingData) {
      let k = 2;
      if (book.categoryId === trainingBook.categoryId) {
        k = 1;
      }
      data.push({
        bookId: trainingBook.bookId,
        distance: k * Math.abs(book.price - trainingBook.price),
      });
    }
    return data;
  }
}
