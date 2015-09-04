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
      var userId = user.id;
      var userName = user.username;
      var href = "/users/" + userId;
      var $li = $("<li><a href=\"" + href + "\">" + user.username + "</a></li>");

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
