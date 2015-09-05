(function () {
  $.InfiniteTweets = function (el) {
    this.$el = $(el);
    this.$feed = this.$el.find("#feed");
    this.maxCreatedAt = null;
    this.feedHtml = this.$el.find("#feed-script")
    this.$el.on("click", ".fetch-more", this.fetchTweets.bind(this))
    this.$feed.on("custom", this.renderTweets.bind(this))
  };

  $.InfiniteTweets.prototype.fetchTweets = function () {
    var fetchOptions = {
      url: "/feed",
      method: "get",
      dataType: "json",
      success: function (tweets) {
        this.renderTweets(this, tweets);

        if (tweets.length) {
          this.maxCreatedAt = tweets[tweets.length - 1].created_at;
        } else if (tweets.length < 20) {
          this.$el.find("a").remove()
          this.$el.append("<p>No more tweets :(</p>")
        }
      }.bind(this)
    }

    var maxCreatedAt;

    if (this.maxCreatedAt !== null) {
      fetchOptions.data = { "max_created_at": this.maxCreatedAt };
    }

    $.ajax(fetchOptions);
  };

  $.InfiniteTweets.prototype.renderTweets = function (context, tweets, position) {
    var templateFn = _.template(this.feedHtml.html());
    if (position === "prepend") {
      this.$feed.prepend(templateFn({ tweets: tweets }));
    } else {
      this.$feed.append(templateFn({ tweets: tweets }));
    }

  };


  $.fn.infiniteTweets = function () {
    return this.each(function () {
      new $.InfiniteTweets(this);
    });
  };

})();

$(function () {
  $(".infinite-tweets").infiniteTweets();
});
