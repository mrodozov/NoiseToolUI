

$(document).ready(function(){

//var nturl="https://rpcbackground.web.cern.ch/rpcbackground/Plots/GR2014/";
var nturl="";


$(".getrunlist").click(function(){
	$.getJSON(nturl+"runlist.json", function(result){
		var items = [];
		$("ul").remove(".runlistul");

		var coll_array =[];

		$.each(result, function(key, val){			
			var runobj = val;
			runobj["number"] = 'run'+key;
			coll_array.push(runobj);
			//console.log(runobj);

		});

		var rlist = new RunlistCollection(coll_array);
		rlist.forEach(function(model){
			//console.log(model.get('number'));
			//console.log(model.get('duration');
		});
		console.log(rlist);

		$.each(result, function(key, val){


			var details = new RunBasicInfo({
				number: ''+key,
				Type: result[key]["Type"],
				lumisections : result[key]["lumisections"],
				duration: result[key]["duration"],
				status: result[key]["status"]
			});

			items.push( "<li class=\"runlistli\"><button  id='" + details.get("number") + "'  class=\"runlistb\" >" +key+ "</button></li>" );
			//console.log(details);
			//console.log("run "+details.get("Type")+" "+details.get("duration")+ " " + details.get("status"));
			
		    });
				
		//items = items.slice(Math.max(items.length - 5, 1));
		
		$( "<ul/>", {
			
			"class": "runlistul",
			    html: items.join( ""  )
			    }).appendTo( ".runlist" );
		
		
	    });
    });

$("div.runlist").click(function(e){
	
	var runn = e.target.id;

	var runDetailsStripsColl = new RunDetailsStripsCollection();

	runDetailsStripsColl.url = nturl+"/noisetool/data/run"+runn+"/output_strips.json";

	runDetailsStripsColl.on('add', function (models, options){ console.log(models, options, 'add fired, fetch finished'); } );

	runDetailsStripsColl.fetch();

	console.log(runDetailsStripsColl, 'not ready'); // not ready

	$.getJSON(nturl+"/noisetool/data/run"+runn+"/output_strips.json", function(result){

		$("ul").remove(".run_items_ul");

		$(".run").removeData(".data");

		var run_keys = []; 
		for (var model_key in runDetailsStripsColl.at(0).attributes){
			console.log(model_key);
			run_keys.push( "<li class=\"run_items_li\"><button  id='" + model_key + "'  class=\"run_items_b\" >" +model_key+ "</button></li>"  );
		}
		
		$( "<ul/>", {
			"class": "run_items_ul",
			    html: run_keys.join( ""  )
			    }).appendTo( ".run" );  
		
		$(".run").data(result);

	    });	

    });

$("div.run").click(function(e){
	var key = e.target.id;
	var run_stats = $(".run").data(key);
	//console.log(key);
	//console.log(run_stats);
	
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
	
	console.log(key);
	$(".roll_list").removeData(".data");
	$(".roll_list").data("key",key);
	
    });


$("div.roll_list").click(function(e){
	var roll_name = e.target.id;
	var ke = $(".roll_list").data("key");
	console.log(ke+" "+roll_name);
	run_stats_strips = $(".run").data(ke);
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
                    html: ke + " in " + roll_name + "<br><br>" + ul_s.join( ""  )
                    }).appendTo( ".roll_stats" );
	

    });


});

