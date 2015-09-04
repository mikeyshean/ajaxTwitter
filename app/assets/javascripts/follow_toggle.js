
(function () {
  $.FollowToggle = function (el) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    this.followState = this.$el.data("initial-follow-state");
    this.render();
    this.$el.on("click", this.handleClick.bind(this));
  };

  $.FollowToggle.prototype.render = function () {
    if (this.followState === "following" || this.followState === "unfollowing") {
      this.$el.prop("disabled", true);
    }
    else if (this.followState === "followed") {
      this.$el.text("Unfollow!");
      this.$el.prop("disabled", false);
    }
    else if (this.followState === "unfollowed") {
      this.$el.text("Follow!");
      this.$el.prop("disabled", false);
    }
  };

  $.FollowToggle.prototype.handleClick = function (e) {
    e.preventDefault();
    var method;

    if (this.followState === "followed") {
      method = "DELETE";
      this.followState = "unfollowing";
    }
    else if (this.followState === "unfollowed") {
      method = "POST";
      this.followState = "following";
    }
    this.render();

    var url = "/users/" + this.userId + "/follow";
    console.log(url);
    console.log(method);
    $.ajax({
      method: method,
      url: url,
      dataType: "json",
      success: (function () {
        if (this.followState === "following") {
          this.followState = "followed";
        }
        else if (this.followState === "unfollowing") {
          this.followState = "unfollowed"
        }
        this.render();
      }.bind(this))
    })

  };

  $.fn.followToggle = function () {
    return this.each(function () {
      new $.FollowToggle(this);
    });
  };
})();
