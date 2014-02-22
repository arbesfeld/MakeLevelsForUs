Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var file = e.target.file.files[0];

    if (!file) {
      return throwError("Please include a file.");
    }

    var title = $(e.target).find('[name=title]').val();
    var hint1 = $(e.target).find('[name=hint1]').val();
    var hint2 = $(e.target).find('[name=hint2]').val();
    var hint3 = $(e.target).find('[name=hint3]').val();

    if (file.size >= 1000000) {
      return throwError("File size must be smaller than 1mb.");
    }
    var fileID = Images.storeFile(file);

    var post = {
      title: title,
      hints: [hint1, hint2, hint3],
      author: this.userId,
      fileID: fileID
    };

    Meteor.call('post', post, function(error, id) {
      if (error)
        return alert(error.reason);

      Router.go('postPage', {_id: id});
    });
  }
});