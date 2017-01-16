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

Template.images.helpers({
	images:Images.find({},
		{
			sort:{rating:-1}
		})
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


