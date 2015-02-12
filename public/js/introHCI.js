'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);
	var url = "/project/"
	url = url + idNumber;
	$.get(url,callBack);
	console.log("Calling " + url);
	console.log("User clicked on project " + idNumber);
}

function callBack(result){
	console.log(result);
	var projectHTML = '<a href="#" class="thumbnail">' +
		'<img src="' + result['image'] + '" class="img">' +
		'<p>' + result['title'] + '</p>' +
		'<p><small>' + result['date'] + '</small></p><br>' +
		'<p><small>' + result['summary'] + '</small></p></a>';
	
	//$("#project-container").html(projectHTML);
	//$("#project-description").html(result['summary']);
	
	$('.details').html(projectHTML);
}
/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	
	e.preventDefault();
	
	var url = "/palette";
	$.get(url,colorCallBack);
}

function colorCallBack(result){
	var colors = result['colors'].hex;
	//console.log(colors[0]);
	//console.log(colors[1]);
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}