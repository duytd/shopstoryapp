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
    this.dragged = e.currentTarget.parentNode;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget.parentNode);
  },
  dragEnd: function(e) {
    e.preventDefault();

    if( typeof this.dragged === "undefined" || this.dragged == null) return;
    this.dragged.style.display = "block";

    if (this.dragged.parentNode.querySelectorAll(".placeholder").length == 0) return;
    this.dragged.parentNode.removeChild(this.state.placeholder);

    var from = Number(this.dragged.dataset.index);
    var to = Number(this.over.dataset.index);

    this.dragged = null;
    this.swapItem(from, to, this.props.menu_item);
  },
  dragOver: function(e) {
    e.preventDefault();

    if( typeof this.dragged === "undefined" || this.dragged == null) return;
    this.dragged.style.display = "none";

    if (this.dragged.className != e.target.parentNode.className) return;
    this.over = e.target.parentNode;

    var from = Number(this.dragged.dataset.index);
    var to = Number(this.over.dataset.index);
    var parent = this.over.parentNode;

    if (from < to) {
      this.nodePlacement = "after";
      parent.insertBefore(this.state.placeholder, this.over.nextElementSibling);
    }
    else if (from > to) {
      this.nodePlacement = "before";
      parent.insertBefore(this.state.placeholder, this.over);
    }
  }
}
