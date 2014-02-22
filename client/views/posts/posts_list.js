var ROW_SIZE = 6;

Template.postsList.helpers({
  breakPosts: function () {
      all = this.posts.fetch();
      chunks = [];
      size = ROW_SIZE;
      while (all.length > ROW_SIZE) {
          chunks.push({ row: all.slice(0, ROW_SIZE)});
          all = all.slice(ROW_SIZE);
      }
      chunks.push({row: all});
      return chunks;
  },
  breakTimeReset: function () {
      Template.postsList.doCount = 0;
  },
  breakTime: function () {
      count = Template.postsList.doCount + 1;
      Template.postsList.doCount = count;

      if (count % ROW_SIZE === 0)
          return "</div><!-- why? --><div class='row'>";
      else
          return "";
  },
  hasMorePosts: function() {
    this.posts.rewind();
    return Router.current().postsLimit() === this.posts.fetch().length;
  }
});