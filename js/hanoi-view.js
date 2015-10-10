(function () {
  window.Hanoi = window.Hanoi || {};

  var View = Hanoi.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.startMove = null;
    this.setupTowers();
    this.render();
    this.setupHandlers();
  };

  View.prototype.setupTowers = function () {
    for (var i = 0; i < 3; i++) {
      var $ul = $("<ul class='hanoi-tower group'></ul>");
      $ul.data('id', i);
      this.$el.append($ul);
    }
    for (var j = 2; j >= 0; j--) {
      var $li = $("<li></li>");
      $li.data('id', j);
      $("ul").append($li);
    }
  };

  View.prototype.render = function () {
    var towers = this.game.towers;
    $(".hanoi-tower").each(function () {
      var tower = towers[$(this).data('id')];
      $(this).find("li").each(function () {
        var discSpace = tower[$(this).data('id')];
        $(this).attr('id', "disc" + discSpace);
      });
    });
  };

  View.prototype.setupHandlers = function () {
    this.$el.on("click", "ul", function(e){
      var move = $(e.currentTarget);

      this.move(move);

      this.render();

      if (this.game.isWon()) {
        this.$el.off('click');
        alert("Well done!");
      }
    }.bind(this));
  };

  View.prototype.move = function (move) {
    if (this.startMove !== null) {
      if (this.game.isValidMove(this.startMove.data("id"), move.data("id"))){
        this.game.move(this.startMove.data("id"), move.data("id"));
      } else {
        alert("Invalid move!");
      }
      this.startMove.toggleClass('selected');
      this.startMove = null;
    } else {
      this.startMove = move;
      this.startMove.toggleClass('selected');
    }
  };


})();
