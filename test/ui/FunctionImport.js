/**
 * Created by constantin on 11.11.14.
 */

(function ($, sap, assert, expect, mock, stub) {
	'use strict';

	jQuery.sap.registerModulePath("test", "base/test");
	jQuery.sap.registerModulePath("sap.extensions", "base/src");
	jQuery.sap.require('sap.ui.model.odata.ODataModel');

	describe('Function Import', function () {
		it('should exist', function () {
			assert.isDefined(sap.extensions.ui.FunctionImport, 'sap.extensions.ui.FunctionImport doesn\'t exist');
			assert.isFunction(sap.extensions.ui.FunctionImport, 'sap.extensions.ui.FunctionImport should be a function');
		});

		describe('in a view', function () {
			var stubController, fragmentFixture, stubModel;
			
			beforeEach(function () {
				// generate an odata mock object

				stubModel = sinon.createStubInstance(sap.ui.model.odata.ODataModel);
				
				// generate a sample fragment with the function import element in it
				stubController = sinon.stub();

				// before each test, we create a fragment with the ui element in it
				if(fragmentFixture) {
					fragmentFixture.destroy();
				}

				fragmentFixture = sap.ui.xmlfragment("test.resources.fragments.Example", stubController);
				fragmentFixture.setModel(stubModel, 'MyModel');
			});
			
			it('should accept multiple controls for aggregation "content"', function () {
				assert.isFunction(fragmentFixture.getContent, 'Can not fetch aggregation for "content".');
				assert.isArray(fragmentFixture.getContent(), 'Can not fetch aggregation for "content".');
				expect(fragmentFixture.getContent().length).to.be.at.least(2);
			});

			it('should accept a string for "modelName" property.', function () {
				assert.isString(fragmentFixture.getModelName(), '"modelName" is not a string or property is undefined');
			});

			it('should be possible to get a model instance for the given "modelName"', function () {
				assert.isObject(fragmentFixture.getModel('MyModel'), 'Fetched model for name "modelName" is not an object');
			});
			
			it('should accept a string for "functionImportName" property.', function () {
				assert.isString(fragmentFixture.getFunctionImportName(), '"functionImport" is not a string or property is undefined');
			});

			it('should accept a object for "parameters" property.', function () {
				assert.isObject(fragmentFixture.getParameters(), '"parameters" is not a object or could not be transformed to an object or property is undefined. Is Binding syntax set to complex?');
			});

			it('should accept a string for "asModelName" property.', function () {
				assert.isString(fragmentFixture.getAsModelName(), '"asModelName" is not a string or property is undefined');
			});
		});
		
	});

})(jQuery, sap, chai.assert, chai.expect, sinon.mock, sinon.stub);
