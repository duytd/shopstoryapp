import React from 'react';

const withDragMixin = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      var placeholder = document.createElement("div");
      placeholder.className = "placeholder";

      this.state = {
        placeholder: placeholder,
      };
    }

    dragStart = (e) => {
      this.dragged = e.currentTarget.parentNode;

      if (typeof e.dataTransfer !== "undefined") {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.currentTarget.parentNode);
      }
    }

    dragEnd = (e) => {
      e.preventDefault();

      if( typeof this.dragged === "undefined" || this.dragged == null) return;
      this.dragged.style.display = "block";

      if (this.dragged.parentNode.querySelectorAll(".placeholder").length == 0) return;
      this.dragged.parentNode.removeChild(this.state.placeholder);

      var from = Number(this.dragged.dataset.index);
      var to = Number(this.over.dataset.index);

      this.dragged = null;
      this.swapItem(from, to, this.props.menu_item);
    }

    dragOver = (e) => {
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

    touchMove = (e) => {
      e.preventDefault();

      if( typeof this.dragged === "undefined" || this.dragged == null) return;
      this.dragged.style.display = "none";
      var location = e.touches.item(0);

      if (this.dragged.className != document.elementFromPoint(location.clientX, location.clientY).className) return;
      this.over = document.elementFromPoint(location.clientX, location.clientY);


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

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
}

export default withFormMixins;
