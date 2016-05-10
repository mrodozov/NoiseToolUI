
$(document).ready(function(){

//var nturl="https://rpcbackground.web.cern.ch/rpcbackground/Plots/GR2014/";
var nturl="";

$(".getrunlist").click(function(){
	$.getJSON(nturl+"runlist.json", function(result){
		var items = [];
		$("ul").remove(".runlistul");
		$.each(result, function(key, val){
			items.push( "<li class=\"runlistli\"><button  id='" + key + "'  class=\"runlistb\" >" +key+ "</button></li>" );
			
			console.log("run "+key);
			
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
	$.getJSON(nturl+"/noisetool/data/run"+runn+"/output_strips.json", function(result){
		
		var run_keys = [];   
		$("ul").remove(".run_items_ul");

		$(".run").removeData(".data");
		$.each(result, function(key, val){
			run_keys.push( "<li class=\"run_items_li\"><button  id='" + key + "'  class=\"run_items_b\" >" +key+ "</button></li>"  );
			
			// console.log("<li class=\"run_items_li\"><button  id='" + key + "'  class=\"run_items_b\" >" +key+ "</button></li>");
			// console.log(key+" "+runn);
		    });
		
		
		$( "<ul/>", {
			"class": "run_items_ul",
			    html: run_keys.join( ""  )
			    }).appendTo( ".run" );  
		

		$(".run").data(result);


	    });	

    });

$("div.run").click(function(e){
	var key = e.target.id;
	run_stats = $(".run").data(key);
	//rolls_stats = run_stats.key;
	var list_rolls = [];
	//console.log(run_stats);
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

