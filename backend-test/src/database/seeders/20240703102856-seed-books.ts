'use strict';

import { QueryInterface } from 'sequelize';

const books = [
  {
    code: 'JK-45',
    title: 'Harry Potter',
    author: 'J.K Rowling',
    stock: 1,
  },
  {
    code: 'SHR-1',
    title: 'A Study in Scarlet',
    author: 'Arthur Conan Doyle',
    stock: 1,
  },
  {
    code: 'TW-11',
    title: 'Twilight',
    author: 'Stephenie Meyer',
    stock: 1,
  },
  {
    code: 'HOB-83',
    title: 'The Hobbit, or There and Back Again',
    author: 'J.R.R. Tolkien',
    stock: 1,
  },
  {
    code: 'NRN-7',
    title: 'The Lion, the Witch and the Wardrobe',
    author: 'C.S. Lewis',
    stock: 1,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    const modifiedBooks = books.map((book) => ({
      ...book,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('Books', modifiedBooks, {
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface: QueryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await Promise.all(
        books.map((book) => {
          return queryInterface.bulkDelete(
            'Books',
            {
              code: book.code,
              title: book.title,
              author: book.author,
              stock: book.stock,
            },
            { transaction },
          );
        }),
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
