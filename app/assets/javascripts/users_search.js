(function () {
  $.UsersSearch = function (el) {
    this.$el = $(el);
    this.$input = this.$el.find(".search-box");
    this.$users = this.$el.find(".users");
    this.$el.on("input", this.handleInput.bind(this));
    // install listener
  }

  $.UsersSearch.prototype.handleInput = function (e) {
    var queryParam = this.$input.val();
    var url = "/users/search";

    $.ajax({
      method: "get",
      url: "/users/search",
      dataType: "json",
      data: { "query": queryParam },
      success: function(data) {
        this.renderResults(data);
      }.bind(this)

    });
  }

  $.UsersSearch.prototype.renderResults = function(response) {
    this.$users.empty();
    response.forEach(function (user) {
      // console.log(user);
      var userId = user.id;
      var userName = user.username;
      var followState = user.followed ? "followed" : "unfollowed"

      var options = {userId: userId, followState: followState}

      var href = "/users/" + userId;
      var $li = $("<li><a href=\"" + href + "\">" + userName + "</a></li>");
      var $button = $("<button class=\"follow-toggle\"></button>");

      $li.append($button.followToggle(options));

      this.$users.append($li);
    }.bind(this));

  };

  $.fn.usersSearch = function () {
    return this.each(function () {
      new $.UsersSearch(this);
    });
  };
})();

$(function () {
  $(".users-search").usersSearch();
});
