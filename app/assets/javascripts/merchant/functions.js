String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.trimToLength = function(m) {
  return (this.length > m)
    ? jQuery.trim(this).substring(0, m).split(" ").slice(0, -1).join(" ") + "..."
    : this;
}

String.prototype.toKoreanFormat = function() {
  return I18n.toNumber(this.toString(), {delimiter: ",", precision: 0});
}

String.prototype.addParams = function(key, value) {
  var regex = new RegExp("([?&])" + key + "=[^&#]*", "i");
  if (regex.test(this)) {
    return this.replace(regex, "$1" + key + "=" + value);
  } else {
    var matchData = this.match(/^([^#]*)(#.*)?$/);
    var separator = /\?/.test(this) ? "&" : "?";
    return matchData[0] + separator + key + "=" + value;
  }
}

Array.prototype.clean = function(deletedValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deletedValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
}

Function.prototype.localize = function(param1, param2) {
  if (typeof param1 == "undefined") {
    return this.call(this, {"locale": I18n.locale});
  }
  else if (typeof param2 == "undefined") {
    return this.call(this, param1, {"locale": I18n.locale});
  }
  else {
    return this.call(this, param1, param2, {"locale": I18n.locale});
  }
}

function translate(object, attribute) {
  if (I18n.locale == "ko") {
    return object[attribute + "_ko"]
  }
  else {
    return object[attribute + "_en"]
  }
}

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
