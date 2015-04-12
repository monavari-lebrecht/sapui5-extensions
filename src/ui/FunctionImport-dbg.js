(function ($, sap) {

	$.sap.declare('openui5.extensions.ui.FunctionImport');

	$.sap.require('sap.ui.model.json.JSONModel');
	var metaModel = new sap.ui.model.json.JSONModel();

	/**
	 * resolves path in meta model dependent on given parameters
	 *
	 * @param urlParameters
	 * @param functionImportName
	 * @returns {string}
	 */
	function getPath(urlParameters, functionImportName) {
		return '/' + encodeURI(JSON.stringify(urlParameters) + functionImportName);
	}

	/**
	 * load data for given parameters from function import
	 * @param functionImportName
	 * @param urlParameters
	 * @param model
	 */
	function loadData(functionImportName, urlParameters, model) {
		model.callFunction(functionImportName, {
			urlParameters: urlParameters,
			success      : function (object, response) {
				var path = getPath(urlParameters, functionImportName);
				// check if we got a valid object
				if (object) {
					metaModel.setProperty(path, object[functionImportName]);
				}
				//if not, try to fetch it from xml by hand
				if (response.headers["Content-Type"].indexOf('xml') > -1) {
					var data = {},
						parsedXML = jQuery.parseXML(arguments[1].body);

					// collect all properties from xml
					$('> *', parsedXML).children().each(function () {
						data[this.localName] = $(this).text();
					});

					metaModel.setProperty(path, data);
				}
			}
		});
	}

	/**
	 * @class UI element that assigns a new model to its children where contents of function import will be assigned to in form
	 * of a meta model.
	 *
	 * @example
	 * <openui5.extensions.ui.FunctionImport
	 *                    functionImportName="FunctionName"
	 *                    parameters="{
	 *						Argument1: '1',
	 *						Argument2: '2'
	 *					}"
	 *                    asModelName="FunctionImport"
	 *                    modelName="SourceModel">
	 *        <Text text="{FunctionImport>/Result}"/>
	 * </openui5.extensions.ui.FunctionImport>
	 * @name openui5.extensions.ui.FunctionImport
	 */
	sap.ui.core.Control.extend('openui5.extensions.ui.FunctionImport', /** @lends openui5.extensions.ui.FunctionImport */ {
		metadata: {
			properties        : {
				modelName         : {
					type: 'string'
				},
				functionImportName: {
					type: 'string'
				},
				parameters        : {
					type: 'object'
				},
				asModelName       : {
					type: 'string'
				}
			},
			aggregations      : {
				content: {
					type        : 'sap.ui.core.Control',
					multiple    : true,
					singularName: 'content',
					visibility  : 'public'
				}
			},
			defaultAggregation: 'content'
		},

		/**
		 * Fetches all child content elements
		 *
		 * @name openui5.extensions.ui.FunctionImport#getContent
		 * @public
		 * @function
		 */

		/**
		 * Fetches the parent element in xml view
		 *
		 * @name openui5.extensions.ui.FunctionImport#getParent
		 * @public
		 * @function
		 */

		/**
		 * get model name the function import shall be imported from
		 *
		 * @name openui5.extensions.ui.FunctionImport#getModelName
		 * @public
		 * @function
		 */

		/**
		 * name of function import service of model
		 *
		 * @name openui5.extensions.ui.FunctionImport#getFunctionImportName
		 * @public
		 * @function
		 */

		/**
		 * parameters that shall be given to function import service
		 *
		 * @name openui5.extensions.ui.FunctionImport#getParameters
		 * @public
		 * @function
		 */

		/**
		 * function import data will be assigned to children control elements with this model name
		 *
		 * @name openui5.extensions.ui.FunctionImport#getAsModelName
		 * @public
		 * @function
		 */

		renderer: {
			/**
			 * Render function for control
			 *
			 * @param {sap.ui.core.RenderManager} rm
			 * @param {openui5.extensions.ui.FunctionImport} dataContainer
			 */
			render: function (rm, dataContainer) {
				/**
				 * @type {sap.ui.model.odata.ODataModel}
				 */
				var model = dataContainer.getParent().getModel(dataContainer.getModelName());

				// iterate over url parameters to check if there is a computed value
				var urlParameters = {};
				$.each(dataContainer.getParameters(), function (index, value) {
					if (value.indexOf('{') > -1) {
						var bindingArguments = value.slice(1, value.length - 1).split('>');
						var bindingContext;
						if (bindingArguments.length > 1) {
							bindingContext = dataContainer.getBindingContext(bindingArguments[0]);
						} else {
							bindingContext = dataContainer.getBindingContext();
						}

						if (bindingContext) {
							urlParameters[index] = bindingContext.getProperty(bindingArguments[1]);
						}
					} else
						urlParameters[index] = value;
				});

				var sPath = getPath(urlParameters, dataContainer.getFunctionImportName());

				if (!metaModel.getProperty(sPath)) {
					metaModel.setProperty(sPath, {});

					if (typeof model.callFunction != 'function') {
						if (!model instanceof sap.ui.model.odata.ODataModel) {
							jQuery.sap.log.error('FunctionImport could not be called.', 'The model does not implement "callFunction" method. Is it really an instance of odata model?');
						}
						return;
					}

					// load async data from function import to meta model
					var functionImportName = dataContainer.getFunctionImportName();
					loadData(functionImportName, urlParameters, model);
				}

				// render child elements and assign meta model to it
				dataContainer.getContent().forEach(function (dataObject) {
					if (dataContainer.getAsModelName()) {
						dataObject.setModel(metaModel, dataContainer.getAsModelName());
						dataObject.setBindingContext(new sap.ui.model.Context(metaModel, sPath), dataContainer.getAsModelName());
					} else {
						dataObject.setModel(metaModel);
						dataObject.setBindingContext(new sap.ui.model.Context(metaModel, sPath));
					}

					rm.renderControl(dataObject);
				});
			}
		}
	});

	/**
	 * refresh value for given values
	 *
	 * @param functionImportName
	 * @param parameters
	 * @param model
	 */
	openui5.extensions.ui.FunctionImport.refresh = function (functionImportName, parameters, model) {
		"use strict";
		loadData(functionImportName, parameters, model);
	};
})(jQuery, sap);
