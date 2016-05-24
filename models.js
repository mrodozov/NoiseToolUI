
var RunBasicInfo = Backbone.Model.extend ({
	//idAttribute: 'number',

	// idAttribute: "_id",
	defaults:  {
		number:'',
		Type : '',
		duration: '',
		lumisections: {
			all:0,
			good:0
		},
		status: ''
	}

});

var RunlistCollection = Backbone.Collection.extend ({

	model: RunBasicInfo,

	modelId: function(attrs) {
		return attrs.number;
	}

});

var RunDetailsStrips =  Backbone.Model.extend ({
	defaults: {

		dead : {},
		masked:{},
		rates:{},
		tomask: {},
		tounmask : {}
		
	}
});

var RunDetailsStripsCollection =  Backbone.Collection.extend ({
	model: RunDetailsStrips,
	parse: function(response) {
		objects_list = [];
		objects_list.push(response);
		return objects_list;
	},
	
	initialize: function (opts) {
		this.on('reset', function (model, options) {
            console.log('reset called', model, options);
        });
	}
});

