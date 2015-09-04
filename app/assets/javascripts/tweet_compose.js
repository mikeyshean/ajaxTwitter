(function () {
  $.TweetCompose = function (el) {
    this.$el = $(el);
    this.$feed = $(this.$el.data("tweets-ul"))
    this.$el.on("submit", this.submit.bind(this));

    this.$charsLeft = this.$el.find(".chars-left");
    this.$charsLeft.text(140);

    this.$textarea = this.$el.find("textarea");
    this.$textarea.on("input", this.counter.bind(this));
  };

  $.TweetCompose.prototype.counter = function (e) {
    var input = this.$textarea.val();

    var currentLength = input.length;
    this.$charsLeft.text(140 - currentLength);
  }

  $.TweetCompose.prototype.submit = function (e) {

    e.preventDefault();
    var inputs = $(e.currentTarget).serializeJSON();
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
    this.$el.find(":input").prop("disabled", false);
  };

  $.TweetCompose.prototype.clearInput = function () {
    var inputs = this.$el.find(":input")
    inputs.each(function () {
      if (this.type !== "submit") {
        $(this).val("");
      }
    });

    this.$charsLeft.text(140);
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
