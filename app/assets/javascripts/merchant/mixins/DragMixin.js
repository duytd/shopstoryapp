/* To use this mixin, an items state and submit method must be set */
var DragMixin = {
  getInitialState: function() {
    var placeholder = document.createElement("div");
    placeholder.className = "placeholder";

    return {
      placeholder: placeholder,
    }
  },
  dragStart: function(e) {
    this.dragged = e.currentTarget;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget);
  },
  dragEnd: function(e) {
    e.preventDefault();

    this.dragged.style.display = "block";

    if (this.dragged.parentNode.querySelectorAll(".placeholder").length == 0) return;

    this.dragged.parentNode.removeChild(this.state.placeholder);

    var from = Number(this.dragged.dataset.index);
    var to = Number(this.over.dataset.index);

    this.swapItem(from, to, this.props.menu_item);
  },
  dragOver: function(e) {
    e.preventDefault();

    this.dragged.style.display = "none";

    if (this.dragged.className != e.target.className) return;
    this.over = e.target;

    var from = Number(this.dragged.dataset.index);
    var to = Number(this.over.dataset.index);
    var parent = e.target.parentNode;

    if (from < to) {
      this.nodePlacement = "after";
      parent.insertBefore(this.state.placeholder, e.target.nextElementSibling);
    }
    else if (from > to) {
      this.nodePlacement = "before";
      parent.insertBefore(this.state.placeholder, e.target);
    }
  }
}
