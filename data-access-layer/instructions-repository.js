const { Op } = require('sequelize');
let Instructions;
let moduleError;

try {
  const db = require('../models');
  ({ Instructions } = db);
  if (Instructions === undefined) {
    moduleError = 'It looks like you need to generate the Instruction model.';
  }
} catch (e) {
  console.error(e);
  if (e.message.includes('Cannot find module')) {
    moduleError = 'It looks like you need initialize your project.';
  } else {
    moduleError = `An error was raised "${e.message}". Check the console for details.`;
  }
}
/* Don't change code above this line ******************************************/



async function createNewInstruction(specification, recipeId) {
  // Use the findAll method of the Instruction object to find all the
  // instructions for the specified recipe.
  //
  // Use the create method of the Instruction object to create a new object and
  // return it using the maximum listOrder from the query just before this.
  //
  // Docs: https://sequelize.org/v5/manual/instances.html#creating-persistent-instances
  const currentInstructions = await Instructions.findAll({
    where: {
      recipeId
    }
  })

  const listOrders = currentInstructions.map(i => i.listOrder).concat(0);
  await Instructions.create({
    specification,
    recipeId,
    listOrder: Math.max(...listOrders) + 1

  })

}



/* Don't change code below this line ******************************************/
module.exports = {
  createNewInstruction,
  loadingDbError: moduleError,
};
