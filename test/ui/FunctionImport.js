/**
 * Created by constantin on 11.11.14.
 */

(function ($, sap) {
	'use strict';

	jQuery.sap.require('openui5.extensions.ui.FunctionImport');
	jQuery.sap.require('sap.ui.model.odata.ODataModel');

	module('Function Import');

	test('should exist', function (assert) {
		assert.ok(openui5.extensions.ui.FunctionImport, 'openui5.extensions.ui.FunctionImport doesn\'t exist');
		assert.equal(typeof openui5.extensions.ui.FunctionImport, 'function', 'openui5.extensions.ui.FunctionImport should be a function');
	});

	var stubController, fragmentFixture, stubModel;
	module('Function Import in a view', {
		setup: function () {
			// generate an odata mock object
			stubModel = sinon.create(sap.ui.model.odata.ODataModel);

			// generate a sample fragment with the function import element in it
			stubController = sinon.stub();

			// before each test, we create a fragment with the ui element in it
			if (fragmentFixture) {
				fragmentFixture.destroy();
			}

			fragmentFixture = sap.ui.xmlfragment("test.resources.fragments.Example", stubController);
			fragmentFixture.setModel(stubModel, 'MyModel');
		}
	});



})(jQuery, sap);
