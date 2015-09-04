(function () {
  $.InfiniteTweets = function (el) {
    this.$el = $(el);
    this.$feed = this.$el.find("#feed");
    this.maxCreatedAt = null;
    this.$el.on("click", ".fetch-more", this.fetchTweets.bind(this))
  };

  $.InfiniteTweets.prototype.fetchTweets = function () {
    // var maxCreatedAt;
    // if (this.maxCreatedAt !== null) {
    //   maxCreatedAt
    // }

    $.ajax({
      url: "/feed",
      method: "get",
      // data: maxCreatedAt;
      dataType: "json",
      success: function (tweets) {
        this.renderTweets(tweets);
      }.bind(this)
    })
  };

  $.InfiniteTweets.prototype.renderTweets = function (tweets) {
    // console.log(tweets);
    $(tweets).each(function (index, tweet) {
      var $li = $("<li>" + JSON.stringify(tweet) + "</li>");
      this.$feed.append($li)
    }.bind(this))
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
