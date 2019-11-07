module.exports = function (optimist) {
	optimist
		.boolean('help').alias('help', 'h').describe('help')
		.string('init').describe('init  init a project template with specfic name')
		.string('run').describe('run project   dev|build|start')
};
