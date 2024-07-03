'use strict';

import { QueryInterface } from 'sequelize';

const members = [
  {
    code: 'M001',
    name: 'Angga',
  },
  {
    code: 'M002',
    name: 'Ferry',
  },
  {
    code: 'M003',
    name: 'Putri',
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    const modifiedMembers = members.map((member) => ({
      ...member,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('Members', modifiedMembers, {
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
        members.map((member) => {
          return queryInterface.bulkDelete(
            'Members',
            {
              code: member.code,
              name: member.name,
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
