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
	},
	{
		img_src:"5.jpg",
		img_alt:"Converse"
	}
];

Template.images.helpers({images:image_data});
