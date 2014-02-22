Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
});

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 18,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.postsLimit()};
  },
  waitOn: function() {
    return Meteor.subscribe('posts', this.findOptions());
  },
  data: function() {
    return {
      posts: Posts.find({}, this.findOptions()),
      nextPath: this.route.path({postsLimit: this.postsLimit() + this.increment})
    };
  }
});

Router.map(function() {
  this.route('postPage', {
    path: '/posts/:_id',
    waitOn: function() {
      return Meteor.subscribe('singlePost', this.params._id);
    },
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('help', {
    path: '/help'
  });

  this.route('postSubmit', {
    path: '/submit',
    disableProgress: true
  });

  this.route('postsList', {
    path: '/:postsLimit?',
    controller: PostsListController
  });
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    this.stop();
  }
};

Router.before(requireLogin, {only: 'postSubmit'});
Router.before(function() { clearErrors(); });

if (Meteor.isClient) {
  Router.after(GAnalytics.pageView);
}