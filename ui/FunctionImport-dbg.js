(function ($, sap) {

	$.sap.declare('sap.extensions.ui.FunctionImport'); 

	/**
	 * @class UI element that assigns a new model to its children where contents of function import will be assigned to in form
	 * of a meta model.
	 * 
	 * @example
	 * <sap.extensions.ui.FunctionImport 
	 * 					functionImportName="FunctionName" 
	 * 					parameters="{
	 *						Argument1: '1',
	 *						Argument2: '2'
	 *					}" 
	 *					asModelName="FunctionImport" 
	 *					modelName="SourceModel">
	 * 		<Text text="{FunctionImport>/Result}"/>
	 * </sap.extensions.ui.FunctionImport>
	 *
	 * @name sap.extensions.ui.FunctionImport
	 */
	sap.ui.core.Control.extend('sap.extensions.ui.FunctionImport', /** @lends sap.extensions.ui.FunctionImport */ {
		metadata: {
			properties: {
				modelName: {
					type: 'string'
				},
				functionImportName: {
					type: 'string'
				},
				parameters: {
					type: 'object'
				},
				asModelName: {
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
		 * @name sap.extensions.ui.FunctionImport#getContent
		 * @public
		 * @function
		 */

		/**
		 * Fetches the parent element in xml view
		 *
		 * @name sap.extensions.ui.FunctionImport#getParent
		 * @public
		 * @function
		 */
		
		/**
		 * get model name the function import shall be imported from
		 *
		 * @name sap.extensions.ui.FunctionImport#getModelName
		 * @public
		 * @function
		 */
		
		/**
		 * name of function import service of model
		 *
		 * @name sap.extensions.ui.FunctionImport#getFunctionImportName
		 * @public
		 * @function
		 */

		/**
		 * parameters that shall be given to function import service
		 *
		 * @name sap.extensions.ui.FunctionImport#getParameters
		 * @public
		 * @function
		 */

		/**
		 * function import data will be assigned to children control elements with this model name
		 *
		 * @name sap.extensions.ui.FunctionImport#getAsModelName
		 * @public
		 * @function
		 */
			
		renderer: {
			/**
			 * Render function for control
			 *
			 * @param {sap.ui.core.RenderManager} rm
			 * @param {sap.extensions.ui.FunctionImport} dataContainer
			 */
			render: function (rm, dataContainer) {
				/**
				 * @type {sap.ui.model.odata.ODataModel}
				 */
				var model = dataContainer.getParent().getModel(dataContainer.getModelName());

				var metaModel = new sap.ui.model.json.JSONModel();

				// render child elements and assign meta model to it
				dataContainer.getContent().forEach(function (dataObject) {
					if(dataContainer.getAsModelName()) {
						dataObject.setModel(metaModel, dataContainer.getAsModelName());
					} else {
						dataObject.setModel(metaModel);
					}
					
					rm.renderControl(dataObject);
				});

				// load async data from function import to meta model
				model.callFunction(dataContainer.getFunctionImportName(), {
					urlParameters: dataContainer.getParameters(),
					success      : function () {
						var data = {},
							parsedXML = jQuery.parseXML(arguments[1].body);

						// collect all properties from xml
						$('> *', parsedXML).children().each(function () {
							data[this.localName] = $(this).text();
						});

						metaModel.setData(data);
					}
				});
			}
		}
	});
})(jQuery, sap);
