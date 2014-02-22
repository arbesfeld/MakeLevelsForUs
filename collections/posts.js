Images = new CollectionFS('images');
Posts = new Meteor.Collection('posts');

Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to submit a level.");

    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a level title.');

    if (!postAttributes.hints[0] || !postAttributes.hints[1] || !postAttributes.hints[2]) {
      throw new Meteor.Error(422, 'Please provide 3 hints for how to beat the level.');
    }

    // ensure the post is an image
    if (!postAttributes.fileID)
      throw new Meteor.Error(422, 'Please submit an image only.');

    // pick out the whitelisted keys
    var post = _.extend(_.pick(postAttributes, 'title', 'hints', 'fileID'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    var postId = Posts.insert(post);

    return postId;
  }
});

Images.allow({
  insert: function(userId, doc) {
  // only allow posting if you are logged in
    return !! userId;
  }
});


Images.filter({
    allow: {
        contentTypes: ['image/*']
    }
});