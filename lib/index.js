'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Switch() {
  return /*#__PURE__*/React__default['default'].createElement("div", null, "hhhhhh");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var ImgDrawRect = function ImgDrawRect(props, ref) {
  var canvasReft = React.useRef();
  var src = props.src,
      width = props.width,
      height = props.height,
      lineColor = props.lineColor,
      _props$option = props.option,
      option = _props$option === void 0 ? [] : _props$option,
      lineWidth = props.lineWidth,
      WrapperClassName = props.WrapperClassName;

  var _useState = React.useState(option),
      _useState2 = _slicedToArray(_useState, 2),
      boxData = _useState2[0],
      setBoxData = _useState2[1];

  var renderRect = function renderRect(boxData, ctx, img) {
    var arr = [];
    boxData.forEach(function (List) {
      var Cwidth = width / img.width * List.width;
      var Cheight = height / img.height * List.height;
      var Cx = width / img.width * List.left;
      var Cy = height / img.height * List.top;
      arr.push({
        width: Cwidth,
        height: Cheight,
        x: Cx,
        y: Cy
      });
    });
    arr.forEach(function (item) {
      ctx.lineWidth = lineWidth || 2;
      ctx.rect(item.x, item.y, item.width, item.height);
      ctx.strokeStyle = lineColor || "#f40";
      ctx.stroke();
    });
  };

  React.useImperativeHandle(ref, function () {
    return {
      // 获取当前boxs数据
      getData: function getData() {
        return boxData;
      },
      // 设置boxs数据
      setData: function setData(data) {
        setBoxData(data);
      },
      clearRect: function clearRect() {
        var canvas = canvasReft.current;
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
      },
      upload: function upload() {
        var img = new Image();
        img.src = src;

        img.onload = function () {
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          var a = document.createElement("a");
          renderRect(boxData, ctx, img);
          var data = canvas.toDataURL("image/png");
          a.href = data;
          a.download = "测试图片.png";
          a.click();
          a = null;
        };
      }
    };
  }, [boxData]);
  React.useEffect(function () {
    var canvas = canvasReft.current;
    canvas.getContext("2d");
  }, []);
  React.useEffect(function () {
    // 获取图片原始大小,根据当前设置宽高比例计算最后的位置
    var img = new Image();
    img.src = src; //根据最后的位置信息画坐标框

    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext("2d");

    img.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布

      renderRect(boxData, ctx, img);
    };
  }, [props, boxData]);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: WrapperClassName,
    style: {
      position: "relative",
      width: "".concat(width, "px"),
      height: "".concat(height, "px")
    }
  }, /*#__PURE__*/React__default['default'].createElement("img", {
    src: src,
    style: {
      position: "absolute",
      width: "".concat(width, "px"),
      height: "".concat(height, "px")
    }
  }), /*#__PURE__*/React__default['default'].createElement("canvas", {
    id: "canvas",
    style: {
      position: "absolute",
      zIndex: "100"
    },
    ref: canvasReft,
    width: width,
    height: height
  }));
};

var ImgDrawRect$1 = /*#__PURE__*/React.forwardRef(ImgDrawRect);

exports.ImgDrawRect = ImgDrawRect$1;
exports.Switch = Switch;