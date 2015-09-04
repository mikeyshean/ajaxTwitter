(function () {
  $.TweetCompose = function (el) {
    this.$el = $(el);
    this.$feed = $(this.$el.data("tweets-ul"))
    this.$el.on("submit", this.submit.bind(this));
  };

  $.TweetCompose.prototype.submit = function (e) {
    // var params = $.
    e.preventDefault();
    var inputs = $(e.currentTarget).find(":input").serializeJSON();
    this.$el.find(":input").prop("disabled", true);

    $.ajax({
      url: "/tweets",
      method: "post",
      data: inputs,
      dataType: "json",
      success: function (tweet) {
        this.handleSuccess(tweet);
      }.bind(this)
    })
  };

  $.TweetCompose.prototype.handleSuccess = function (tweet) {
    var $li = $("<li>" + JSON.stringify(tweet) + "</li>")
    this.$feed.prepend($li);
    this.clearInput();
  };

  $.TweetCompose.prototype.clearInput = function () {
    this.$el.find(":input").val("")
  };

  $.fn.tweetCompose = function () {
    return this.each(function () {
      new $.TweetCompose(this);
    });
  };
})();

$(function() {
  $(".tweet-compose").tweetCompose();
});
