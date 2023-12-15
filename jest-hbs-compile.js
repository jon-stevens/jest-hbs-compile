import path from 'node:path';
import {readdirSync, statSync, readFileSync} from 'node:fs';
import Handlebars from 'handlebars';
import handlebarsHelpers from './handlebars-helpers';

class TestHelpers {
	constructor() {
		this.partialsDirectory = '/handlebars/partials';
		this.fullPartialsDirectory = './[project]/handlebars/partials';

		Handlebars.registerHelper(handlebarsHelpers);

		this.findAllPartials();
	}

	async compileTemplate(config) {
		return new Promise((resolve, reject) => {
			try {
				const {mainTemplate, model} = config;
				const html = mainTemplate(model);
				resolve(html);
			} catch (error) {
				reject(error);
			}
		});
	}

	findAllPartials(partialsPath) {
		let directory = partialsPath || this.fullPartialsDirectory;
		let partials = readdirSync(directory);

		for (let file of partials) {
			if (statSync(directory + '/' + file).isDirectory()) {
				this.findAllPartials(directory + '/' + file);
			} else {
				const name = path.parse(file);
				Handlebars.registerPartial(
					`${directory.replace('./src/main/resources/', '')}/${name.name}`,
					readFileSync(path.join(directory + '/' + file), 'utf-8')
				);
			}
		}
	}
}

export default TestHelpers;
