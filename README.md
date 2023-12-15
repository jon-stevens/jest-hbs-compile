Import the helpers and call compileTemplate, passing in the hbs file, and the model. It will automatically register any partials it finds.

import Helpers from './test-helpers';

describe('test block', () => {
  const helpers = new Helpers();
  	
   const buildTemplate = async (page, model) => {
  		return await helpers.compileTemplate({
  			mainTemplate: page,
  			model
  		});
  };

};
  
