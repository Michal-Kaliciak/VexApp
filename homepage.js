
var url = "http://alaro.usermd.net/web/vex_mail.php";
//ready script in PHP on server(Apache)/ i dont know how to set/create apache server so im using one from friend.

jQuery(document).ready(function(){

	//funtion to change the body of the page everytime a link it's clicked
	$('body').on('click','.openNewPage',function(){

		$.get( $(this).attr('href') , function(data) {
			$('#contentMain').html(data);
			$('.ma-backdrop').trigger('click');
			$('.main-menu li').removeClass('active');
			$(this).parents('li').addClass('active');
		}); 
		return false;
	});

	//by default, load home.html at the start
	$.get('home.html', function(data) {
		$('#contentMain').html(data);
	});
});


//funtion to control the sending of emails from the app
$('body').on('click', '#formcontact', function() {

    var title = document.forms["contactus"]["title"].value;
    var email = document.forms["contactus"]["usr"].value;
    var content = document.forms["contactus"]["textarea"].value;
    var type = document.forms["contactus"]["type"].value;
    
    regExpEmpty = /^\s*$/;

    if ( (title=="" || title.length<=0) || (email=="" || email.length<=0) || (content=="" || content.length<=0) ) {
    	
    } else if ( regExpEmpty.test(title) || regExpEmpty.test(email) || regExpEmpty.test(content)) {
    	
    } else {
    	SendInfo(title, email, content, type);
    	return false;
    }
});
	
//funtion to send the email
function SendInfo(title, email, content, type){
	jQuery.ajax({
		method: "POST",
		url: url,
		data: {'title' : title, 'email' : email, 'content' : content, 'type' : type},
		async: true
	})
	.done(function(data) {
		console.log(data)
		$.get('thankyou.html', function(page) {
			$('#contentMain').html(page);
		});
	});
}