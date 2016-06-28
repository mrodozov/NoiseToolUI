


//var nturl="https://rpcbackground.web.cern.ch/rpcbackground/Plots/GR2014/";
var nturl="/noisetool";
var runsCollection = new RunlistCollection();
runsCollection.url = nturl+'/runlist.json';
runsCollection.fetch();

console.log(runsCollection);

var runDetailsStripsColl = new RunDetailsStripsCollection();



$(document).ready(function(){

$(".getrunlist").click(function(){

	$("ul").remove(".runlistul");
	var items = [];
	runsCollection.forEach(function(model){
			//console.log(model.attributes.number, model.get('number'), model.id); // working now
			items.push("<li class=\"runlistli\"><button  id='" + model.id + "'  class=\"runlistb\" >" +model.id+ "</button></li>");
	});

	$( "<ul/>", {	
		"class": "runlistul",
	    html: items.join( ""  )

    }).appendTo( ".runlist" );
		
	
});

$("div.runlist").click(function(e){
	
	var runn = e.target.id;

	runDetailsStripsColl.url = nturl+"/data/run"+runn+"/output_strips.json";

	//runDetailsStripsColl.on('add', function (models, options){ console.log(models, options, 'add fired, fetch finished'); } );

	runDetailsStripsColl.fetch();

	console.log(runDetailsStripsColl, 'not ready'); // not ready

	var run_keys = []; 

	runDetailsStripsColl.on('add', function (models, options){
		for (var model_key in runDetailsStripsColl.at(0).attributes){
			console.log(model_key);
			run_keys.push( "<li class=\"run_items_li\"><button  id='" + model_key + "'  class=\"run_items_b\" >" +model_key+ "</button></li>"  );
		}
		$(".run").removeData(".data");
		$("ul").remove(".run_items_ul");

		$( "<ul/>", {
			"class": "run_items_ul",
	    	html: run_keys.join( ""  )
    	}).appendTo( ".run" );

    	console.log(runDetailsStripsColl.at(0));
		$(".run").data(runDetailsStripsColl.at(0).attributes);

	});


    });

$("div.run").click(function(e){
	
	var run_stats = $(".run").data(e.target.id);
	
	console.log(run_stats);
	
	//rolls_stats = run_stats.key;
	var list_rolls = [];
	$("ul").remove(".roll_list_ul");



	$.each(run_stats, function(k,v){
		
		list_rolls.push("<li class=\"roll_list_li\" ><button id='" + k + "'  class=\"roll_list_b\" >" +k+ "</button>  </li>");
		$("")
		console.log(k);
	    });
	
	$( "<ul/>", {
		"class": "roll_list_ul",
		    html: list_rolls.join( ""  )
		    }).appendTo( ".roll_list" );
	
	console.log(e.target.id);
	$(".roll_list").removeData(".data");
	$(".roll_list").data("key",e.target.id);
	
    });


$("div.roll_list").click(function(e){
	var roll_name = e.target.id;
	var key = $(".roll_list").data("key");
	console.log(key+" "+roll_name);
	run_stats_strips = $(".run").data(key);
	rdata = run_stats_strips[roll_name];
	console.log(roll_name+" "+rdata);
	var obj_keys = [];
	var channels = rdata["channels"];
	for (var k in rdata) obj_keys.push(k);
	console.log(obj_keys);
	
	var ul_s = [];
	


	for (var kk in obj_keys){
	    var li_s = [];
	    console.log(kk,obj_keys[kk]);
	    var o_key = obj_keys[kk];
	    li_s.push(o_key);
	    for (var item in rdata[o_key]){
		li_s.push("<li class="+ o_key +">" + rdata[o_key][item] + "</li>");
		
	    }
	    alist = "<ul class=ul_"+o_key+"> "+ li_s.join("") + " </ul>";
	    ul_s.push(alist);
	}
	
	$("ul").remove(".roll_stats_ul");
	
	
	$(  "<ul/>", {
                "class": "roll_stats_ul",
                    html: key + " in " + roll_name + "<br><br>" + ul_s.join( ""  )
                    }).appendTo( ".roll_stats" );
	

    });


});

