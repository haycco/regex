/***********************************************************************
 * Copyright (C) haycco All rights reserved.
 * @author: haycco
 * Date: 2012/12/12
 **********************************************************************/
/*
########################################################################
### Generic element functions ##########################################
########################################################################
*/

/* -------------------------------------------------------------- */

function gebid() {
	if (arguments.length==1)
		return document.getElementById(arguments[0]);
	else {
		var ids=Array();
		for (var i=0;i<arguments.length;i++) {
			ids.push(document.getElementById(argument[i]));
		}
		return ids;
	}			
}

/* -------------------------------------------------------------- */	


/*
########################################################################
### DHTML Show/Hide Elements ###########################################
########################################################################
*/

/* -------------------------------------------------------------- */	

function show(frm,ht,spd) {                        
	var f=gebid(frm);        
	f.style.display="block";
	var distance=ht-f.offsetHeight;
	if (distance>spd) {
		f.style.height=f.offsetHeight+spd+"px";       
		setTimeout("show('"+frm+"',"+ht+","+spd+")",10);     
	} else {            
		f.style.height=ht+"px";
	}        
}

/* -------------------------------------------------------------- */    

function hide(frm,spd) {       
	var f=gebid(frm);                
	var distance=f.offsetHeight;        
	if (distance>=spd) {
		f.style.height=f.offsetHeight-spd+"px";       
		setTimeout("hide('"+frm+"',"+spd+")",10);     
	} else {            
		f.style.height="0px";       
		f.style.display="none";
		
	}            
}	

/* -------------------------------------------------------------- */    

/*
########################################################################
### Add Event Function #################################################
########################################################################
*/	

/* -------------------------------------------------------------- */  

function addEvent(elm,evType,fn,useCapture) {
	if (elm.addEventListener) {
		elm.addEventListener(evType,fn,useCapture);
		return true;
	} else if (elm.attachEvent) {
		var r = elm.attachEvent('on'+evType,fn);
		return r;
	} else {
		alert("Browser Does Not Full Support Event Handling");		
		return true;
	}
}

/* -------------------------------------------------------------- */  	

function addEvents(e) {
	addEvent(gebid("txtTest1"),'keyup',validate,false);	
	addEvent(gebid("txtTest2"),'keyup',validate,false);
	addEvent(gebid("txtREGEX"),'keyup',validate,false);					
	addEvent(gebid("chkIgnoreCase"),'click',validate,false);				
	/*addEvent(gebid("lnkLibrary"),'click',toggleLibrary,false);						
	addEvent(gebid("lnkResources"),'click',toggleResources,false);								
	addEvent(gebid("lnkHelp"),'click',showHelp,false);												
	addEvent(gebid("lnkHideHelp"),'click',hideHelp,false);*/				
}	

/* -------------------------------------------------------------- */  		

function toggleLibrary() {
	if (gebid('library').offsetHeight<=0) {
		gebid('library').style.display=="block";
		show('library',libraryHeight,spd);	
		gebid('imgLibrary').src='images/arrow-down.jpg';
	} else {
		hide('library',spd*2);
		gebid('imgLibrary').src='images/arrow-right.jpg';
	}
}

/* -------------------------------------------------------------- */  		

function toggleResources() {
	if (gebid('resources').offsetHeight<=0) {
		gebid('resources').style.display=="block";
		show('resources',linksHeight,spd);
		gebid('imgResource').src='images/arrow-down.jpg';
	} else {
		hide('resources',spd*2);
		gebid('imgResource').src='images/arrow-right.jpg';					
	}
}	

/* -------------------------------------------------------------- */  		

/*
########################################################################
### REGEXP Validationn #################################################
########################################################################
*/	

/* -------------------------------------------------------------- */  
	
function validate() {  
	var strPattern = document.getElementById('txtREGEX').value;                
	var oTest1 = document.getElementById('txtTest1');
	var oTest2  = document.getElementById('txtTest2');                
	var ignoreCase = document.getElementById('chkIgnoreCase').checked;
		
	var strOptions="";
	
	if (ignoreCase)
		strOptions+="i";				

	var oREGEXP = new RegExp(strPattern,strOptions);
	
	if (oREGEXP.test(oTest1.value))
		setStatus(1,'txtTest1');
	else
		setStatus(0,'txtTest1');
	
	if (oREGEXP.test(oTest2.value))
		setStatus(1,'txtTest2');
	else
		setStatus(0,'txtTest2');
	  
}

/* -------------------------------------------------------------- */  	

function setStatus(sts,elm) {
	if (sts==1)
		gebid(elm).className="ok";
	else
		gebid(elm).className="fail";
}

/* -------------------------------------------------------------- */  	

function setREGEXP(regexp,ex) {
	gebid('txtREGEX').value=regexp;
	gebid('txtTest1').value=ex;
	gebid('txtTest2').value='';				
	validate();
	gebid('txtTest1').focus();
}

/* -------------------------------------------------------------- */  	

function hideHelp() {
	gebid('help').style.display="none";
}

/* -------------------------------------------------------------- */  				

function showHelp() {
	gebid('help').style.display="block";
	hide('resources',spd*2);
	hide('library',spd*2);	
	gebid('imgLibrary').src='images/arrow-right.jpg';
	gebid('imgResource').src='images/arrow-right.jpg';			
}			

/* -------------------------------------------------------------- */  				
			
/*-- Adds events on window load --*/
addEvent(window, 'load', addEvents, false);	

var libraryHeight=250;
var linksHeight=150;
var spd = 20;