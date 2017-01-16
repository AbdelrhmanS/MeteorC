Images = new Mongo.Collection("images");


if(Meteor.isServer){
	console.log("I'm a server");
	console.log(Images.find().count());
	Meteor.startup(function(){
		if(Images.find().count() == 0){
			for(var i = 1 ; i <= 5 ;i++)
			{
				Images.insert(
					{
						img_src: i+".jpg",
						img_alt:"Red Converse"
					}
				);
			}
		}
	});
}