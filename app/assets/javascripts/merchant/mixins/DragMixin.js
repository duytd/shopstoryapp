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

    var data = this.state.items;
    var from = Number(this.dragged.dataset.index);
    var to = Number(this.over.dataset.index);

    data.splice(to, 0, data.splice(from, 1)[0]);

    this.setState({items: data}, this.submitDraggable);
  },
  dragOver: function(e) {
    e.preventDefault();

    this.dragged.style.display = "none";

    if (e.target.className != "draggable-item") return;
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
