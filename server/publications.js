Meteor.publish('posts', function(options) {
  console.log(options);
  return Posts.find({}, options);
});

Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id);
});