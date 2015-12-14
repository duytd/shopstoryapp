if (typeof Dropzone != "undefined") {
  Dropzone.prototype._getParamName = function(n) {
    if (typeof this.options.paramName === "function") {
      return this.options.paramName(n);
    } else {
      return "" + this.options.paramName1 + (this.options.uploadMultiple ? "[" + n + "]" : "") + this.options.paramName2 + "";
    }
  };
}

function openDaumPostcode(callback) {
  new daum.Postcode({
    oncomplete: function(data) {
      callback(data);
    }
  }).open();
}
