// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';

// import './main.html';




// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(5);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
Images = new Mongo.Collection("images");

var image_data = [
	{
		img_src:"1.jpg",
		img_alt:"Red Converse"
	},
	{
		img_src:"2.jpg",
		img_alt:"Black Converse"
	},
	{
		img_src:"3.jpg",
		img_alt:"Converse"
	},
	{
		img_src:"4.jpg",
		img_alt:"Converse"
	}
];

// Template.images.helpers({images:image_data});

	console.log(Images.find().count());

Accounts.ui.config({
	passwordSignupFields:"USERNAME_AND_EMAIL"
});


Template.images.helpers({
	images:function(){
		if(Session.get('userFilter')){
			return Images.find({createdBy:Session.get('userFilter')},{sort:{createdOnd:-1,rating:-1}});
		}else
		{
			return Images.find({},{sort:{createdOnd:-1,rating:-1}});
		}
	},
	getUser:function(user_id){
		var userName = Meteor.users.findOne({_id:user_id})
		if(userName){
			return userName.username;
		}else
			return "AnyOne";
	}
});


Template.body.helpers({
username:function(){
	if(Meteor.user())
	{
		return Meteor.user().username;
	}else{
		return "AnyOne";
	}
}
});

Template.images.events({
	'click .js-image ':function(event){
		alert("Hello n template events");
	},
	'click .js-delete-btn' :function(event){
		var img_id = this._id;
		$("#"+img_id).hide('slow',function(){
			Images.remove({"_id":img_id});
		});
	},
	'click .js-show-modal' :function(event){		
		$("#add_image").modal('show');
	},
	'click .js-get-images' :function(event){		
		Session.set('userFilter',this.createdBy);
		console.log(Session.get('userFilter'));
		return false;

	}
});
Template.add_image.events({
	'submit .js-add-img':function(event){
		console.log(event.target.image_src.value +" "+event.target.image_alt.value);
		// var un = Meteor.user().username; esay way to get name 
		// console.log(un);
		if(Meteor.user()){
			Images.insert({
				img_src:event.target.image_src.value,
				img_alt:event.target.image_alt.value,
				createdOn:Date(),
				createdBy:Meteor.user()._id
			});
		}
			$("#add_image").modal('hide');
		return false;
	}
});

Template.rating.onRendered(function() {
  this.$('.ui.rating')
      .rating({
          interactive: true,
          maxRating: 5,
          onRate:function(value){
          	var id = this.id;
			Images.update({_id:id},{$set: {rating:value}});
          }
      });
  });


