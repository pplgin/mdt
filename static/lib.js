import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "body": {
        "width": "100%",
        "overflowX": "hidden",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "font": "14px/1.3 arial,\"Hiragino Sans GB\",\"Microsoft Yahei\",\\5b8b\\4f53,Tahoma,Arial,Helvetica,STHeiti",
        "color": "#333",
        "WebkitUserSelect": "none",
        "WebkitTextSizeAdjust": "100%",
        "MsTextSizeAdjust": "100%",
        "textSizeAdjust": "100%",
        "WebkitBackfaceVisibility": "hidden"
    },
    "html": {
        "width": "100%",
        "overflowX": "hidden"
    },
    "article": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "aside": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "blockquote": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "button": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "font": "14px/1.3 arial,\"Hiragino Sans GB\",\"Microsoft Yahei\",\\5b8b\\4f53,Tahoma,Arial,Helvetica,STHeiti",
        "color": "#333"
    },
    "code": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "dd": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "details": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "div": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "dl": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "dt": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "fieldset": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "boder": 0
    },
    "figcaption": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "figure": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "footer": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "form": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "h1": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "fontSize": "100%",
        "fontWeight": "500"
    },
    "h2": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "fontSize": "100%",
        "fontWeight": "500"
    },
    "h3": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "fontSize": "100%",
        "fontWeight": "500"
    },
    "h4": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "fontSize": "100%",
        "fontWeight": "500"
    },
    "h5": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "fontSize": "100%",
        "fontWeight": "500"
    },
    "h6": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "fontSize": "100%",
        "fontWeight": "500"
    },
    "header": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "hgroup": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "hr": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "input": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "font": "14px/1.3 arial,\"Hiragino Sans GB\",\"Microsoft Yahei\",\\5b8b\\4f53,Tahoma,Arial,Helvetica,STHeiti",
        "color": "#333",
        "fontSize": "100%"
    },
    "legend": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "li": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "menu": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "nav": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "ol": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "listStyle": "none"
    },
    "p": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "pre": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "section": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "td": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "textarea": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "font": "14px/1.3 arial,\"Hiragino Sans GB\",\"Microsoft Yahei\",\\5b8b\\4f53,Tahoma,Arial,Helvetica,STHeiti",
        "color": "#333",
        "fontSize": "100%"
    },
    "th": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "textAlign": "left"
    },
    "ul": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "listStyle": "none"
    },
    "select": {
        "font": "14px/1.3 arial,\"Hiragino Sans GB\",\"Microsoft Yahei\",\\5b8b\\4f53,Tahoma,Arial,Helvetica,STHeiti",
        "color": "#333",
        "fontSize": "100%"
    },
    "a": {
        "WebkitTouchCallout": "none",
        "textDecoration": "none",
        "background": "0 0",
        "WebkitTapHighlightColor": "transparent"
    },
    "img": {
        "WebkitTouchCallout": "none",
        "boder": 0,
        "display": "block",
        "width": "100%\\9",
        "maxWidth": "100%"
    },
    "table": {
        "borderCollapse": "collapse",
        "borderSpacing": 0
    },
    "del": {
        "textDecoration": "line-through"
    },
    "caption": {
        "textAlign": "left"
    },
    "a:hover": {
        "textDecoration": "none",
        "outline": 0
    },
    "ins": {
        "textDecoration": "none"
    },
    "l": {
        "float": "left"
    },
    "r": {
        "float": "right"
    },
    "border": {
        "height": 1,
        "backgroundRepeat": "no-repeat",
        "backgroundPosition": "bottom",
        "border": "none",
        "backgroundImage": "-webkit-linear-gradient(bottom,rgba(0,0,0,.12) ,rgba(0,0,0,.12) 50%,transparent 50%)",
        "backgroundSize": "100% 1px"
    },
    "v-l": {
        "height": 1,
        "backgroundRepeat": "no-repeat",
        "backgroundPosition": "bottom",
        "backgroundImage": "linear-gradient(to bottom,transparent 50%,rgba(0,0,0,.12) 100%)",
        "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#1F000000', GradientType=0)",
        "backgroundSize": "100% 2px"
    },
    "a:active": {
        "outline": 0
    },
    "i": {
        "fontStyle": "normal"
    },
    "input:-ms-clear": {
        "display": "none"
    },
    "clr:after": {
        "content": " ",
        "display": "table"
    },
    "clr:before": {
        "content": " ",
        "display": "table"
    },
    "text-hide": {
        "font": "0/0 a",
        "color": "transparent",
        "textShadow": "none",
        "backgroundColor": "transparent",
        "border": 0
    },
    "btndefault": {
        "display": "block",
        "marginTop": 0,
        "marginRight": 12,
        "marginBottom": 12,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 9,
        "paddingBottom": 0,
        "paddingLeft": 9,
        "border": "1px solid #e0e0e0",
        "borderRadius": 4,
        "fontSize": 14,
        "lineHeight": 34
    },
    "circle-icon": {
        "borderRadius": "50%"
    },
    "f12": {
        "fontSize": 12
    },
    "f13": {
        "fontSize": 13
    },
    "f14": {
        "fontSize": 14
    },
    "f15": {
        "fontSize": 15
    },
    "f16": {
        "fontSize": 16
    },
    "f17": {
        "fontSize": 17
    },
    "f18": {
        "fontSize": 18
    },
    "f19": {
        "fontSize": 19
    },
    "f20": {
        "fontSize": 20
    },
    "gray-a": {
        "color": "#333"
    },
    "gray-b": {
        "color": "#666"
    },
    "gray-c": {
        "color": "#999"
    },
    "gray-d": {
        "color": "#bbb"
    },
    "block-title-0": {
        "position": "relative",
        "paddingTop": 24,
        "paddingRight": 24,
        "paddingBottom": 24,
        "paddingLeft": 24,
        "backgroundImage": "url(http://img5.duitang.com/uploads/item/201407/28/20140728222732_uSLMF.thumb.600_0_g.png)",
        "backgroundSize": "cover"
    },
    "block-title-0 backend": {
        "zIndex": 0,
        "position": "absolute",
        "top": 0,
        "left": 0,
        "width": "100%",
        "height": "100%",
        "backgroundColor": "#000",
        "opacity": 0.35,
        "filter": "alpha(opacity=35)"
    },
    "block-title-0 content": {
        "zIndex": 1,
        "position": "relative",
        "textAlign": "center"
    },
    "block-title-0 content avatar": {
        "overflow": "hidden",
        "display": "inline-block",
        "width": 60,
        "height": 60,
        "marginBottom": 9,
        "border": "2px solid #fff",
        "borderRadius": 4,
        "backgroundImage": "url(http://cdn.duitang.com/uploads/blog/201409/13/20140913220729_NJQii.jpeg)",
        "backgroundSize": "100% auto"
    },
    "block-title-0 content desc h1": {
        "marginBottom": 14,
        "fontSize": 17,
        "fontWeight": "700",
        "color": "#fff"
    },
    "block-title-0 content desc p": {
        "marginBottom": 16,
        "color": "#fff"
    },
    "block-title-0 content info": {
        "fontSize": 0
    },
    "block-title-0 content info a": {
        "position": "relative",
        "display": "inline-block",
        "paddingTop": 0,
        "paddingRight": 6,
        "paddingBottom": 0,
        "paddingLeft": 6,
        "border": "1px solid rgba(255,255,255,.12)",
        "borderRadius": 4,
        "fontSize": 12,
        "lineHeight": 30,
        "color": "#fff"
    },
    "block-title-0 content info a backend": {
        "opacity": 0.1,
        "filter": "alpha(opacity=10)"
    },
    "block-title-0 content info a:last-child": {
        "marginLeft": 10
    },
    "block-title-1": {
        "height": 200,
        "backgroundImage": "url(http://img5.duitang.com/uploads/item/201312/22/20131222190132_B4iie.thumb.712_445_c.jpeg)",
        "backgroundSize": "cover"
    },
    "block-title-2": {
        "position": "relative",
        "paddingTop": 15,
        "paddingRight": 12,
        "paddingBottom": 12,
        "paddingLeft": 82,
        "backgroundColor": "#fff",
        "borderBottom": "1px solid #e0e0e0",
        "lineHeight": 10
    },
    "block-title-2 img": {
        "position": "absolute",
        "top": 15,
        "left": 12,
        "width": 60,
        "height": 60
    },
    "block-title-2 h1": {
        "fontSize": 14,
        "lineHeight": 1.5,
        "color": "#333"
    },
    "block-title-2 a": {
        "display": "block",
        "marginTop": 10,
        "border": "1px solid #e0e0e0",
        "WebkitBorderRadius": 4,
        "borderRadius": 4,
        "fontSize": 13,
        "textAlign": "center",
        "lineHeight": 30,
        "color": "#999"
    },
    "block-title-3": {
        "position": "relative",
        "paddingTop": 21,
        "paddingRight": 24,
        "paddingBottom": 21,
        "paddingLeft": 24,
        "backgroundSize": "cover",
        "textAlign": "center"
    },
    "block-title-3 backend": {
        "zIndex": 0,
        "position": "absolute",
        "top": 0,
        "left": 0,
        "width": "100%",
        "height": "100%",
        "backgroundColor": "#000",
        "opacity": 0.35,
        "filter": "alpha(opacity=35)"
    },
    "block-title-3 content": {
        "position": "relative",
        "zIndex": 1
    },
    "block-title-3 h1": {
        "marginTop": 0,
        "marginRight": 48,
        "marginBottom": 6,
        "marginLeft": 48,
        "fontSize": 17,
        "fontWeight": "700",
        "lineHeight": 1.2,
        "color": "#fff",
        "overflow": "hidden",
        "textOverflow": "ellipsis",
        "whiteSpace": "nowrap",
        "textAlign": "center"
    },
    "block-title-3 h2": {
        "fontSize": 12,
        "color": "#fff",
        "marginBottom": 16
    },
    "block-title-3 p": {
        "fontSize": 12,
        "color": "#fff"
    },
    "block-title-3 v-l": {
        "display": "inline-block",
        "width": 164,
        "marginBottom": 18,
        "backgroundImage": "linear-gradient(to bottom,transparent 50%,rgba(255,255,255,.6) 100%)",
        "backgroundRepeat": "repeat-x",
        "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#99FFFFFF', GradientType=0)"
    },
    "block-title-3 author": {
        "marginBottom": 10,
        "marginLeft": -10,
        "fontSize": 0
    },
    "block-title-3 author a": {
        "display": "inline-block",
        "width": 36,
        "height": 36,
        "marginLeft": 10,
        "backgroundSize": "100% auto",
        "borderRadius": "100%"
    },
    "block-title-4": {
        "position": "relative",
        "paddingTop": 60,
        "paddingRight": 12,
        "paddingBottom": 12,
        "paddingLeft": 12,
        "background": "url(http://img5.duitang.com/uploads/files/201409/10/20140910114331_KxHRd.thumb.600_0_g.jpeg)",
        "backgroundSize": "cover",
        "color": "#fff",
        "textAlign": "center"
    },
    "block-title-4 backend": {
        "zIndex": 0,
        "position": "absolute",
        "top": 0,
        "left": 0,
        "width": "100%",
        "height": "100%",
        "backgroundColor": "#000",
        "opacity": 0.35,
        "filter": "alpha(opacity=35)"
    },
    "block-title-4 content": {
        "position": "relative",
        "zIndex": 1
    },
    "block-title-4 avatar": {
        "display": "inline-block",
        "width": 66,
        "height": 66,
        "paddingTop": 2,
        "paddingRight": 2,
        "paddingBottom": 2,
        "paddingLeft": 2,
        "backgroundImage": "url(http://img5.duitang.com/uploads/item/201407/28/20140728222732_uSLMF.png)",
        "backgroundSize": "100% auto",
        "borderRadius": "100%"
    },
    "block-title-4 name": {
        "marginTop": 15,
        "fontSize": 17,
        "fontWeight": "700"
    },
    "block-title-4 like": {
        "marginTop": 8,
        "fontSize": 12
    },
    "block-title-4 like i-star": {
        "display": "inline-block",
        "width": 12,
        "height": 12,
        "background": "url(http://img5.duitang.com/uploads/people/201409/10/20140910112454_CGmsL.png)",
        "backgroundSize": "100% auto"
    },
    "block-title-4 follow": {
        "position": "relative",
        "display": "inline-block",
        "backgroundColor": "#49CD76",
        "width": 72,
        "marginTop": 15,
        "borderRadius": 4,
        "color": "#fff",
        "lineHeight": 34,
        "fontSize": 14
    },
    "block-title-4 follow txt": {
        "display": "block"
    },
    "block-title-4 related": {
        "marginTop": 60
    },
    "block-title-4 related a": {
        "float": "left",
        "position": "relative",
        "display": "block",
        "width": "25%",
        "fontSize": 12,
        "color": "#fff"
    },
    "block-title-4 related a span": {
        "display": "inline-block",
        "marginBottom": 4,
        "fontSize": 14
    },
    "block-title-4 related br": {
        "position": "absolute",
        "width": 1,
        "height": 30,
        "top": 5,
        "right": 0,
        "backgroundColor": "#bdb7b1"
    },
    "block-title-5": {
        "paddingTop": 12,
        "paddingRight": 12,
        "paddingBottom": 0,
        "paddingLeft": 12,
        "fontSize": 15
    },
    "block-title-5 span": {
        "display": "inline-block",
        "width": 4,
        "height": 16,
        "marginTop": 0,
        "marginRight": 6,
        "marginBottom": -3,
        "marginLeft": 0,
        "backgroundColor": "#e74c45"
    },
    "woo-form-list": {
        "display": "none"
    },
    "woo-pager li": {
        "display": "none"
    },
    "list-people-1 info amore": {
        "position": "absolute",
        "top": 18,
        "right": 12,
        "background": "url(http://img5.duitang.com/uploads/people/201409/23/20140923140122_kjK2X.png)",
        "backgroundSize": "66px auto"
    },
    "woo-holder": {
        "paddingTop": 12,
        "paddingRight": 0,
        "paddingBottom": 12,
        "paddingLeft": 0
    },
    "woo-loading": {
        "height": 40,
        "background": "url(http://cdn.duitang.com/uploads/people/201307/30/20130730175612_KU2dF.gif) center 12px no-repeat"
    },
    "woo-pcont": {
        "height": 0
    },
    "woo-masned": {
        "zoom": 1,
        "overflow": "hidden",
        "visibility": "hidden",
        "marginLeft": "auto",
        "marginRight": "auto"
    },
    "woo-masned woo": {
        "position": "absolute",
        "top": -6000
    },
    "woo-pager": {
        "marginTop": 18,
        "marginRight": 12,
        "marginBottom": 18,
        "marginLeft": 12
    },
    "woo-pager ul": {
        "display": "block",
        "textAlign": "center"
    },
    "woo-pager ul woo-nxt": {
        "display": "inline-block",
        "width": "50%"
    },
    "woo-pager ul woo-pre": {
        "display": "inline-block",
        "width": "50%"
    },
    "woo-pager ul woo-nxt a": {
        "display": "block",
        "marginRight": 1,
        "paddingTop": 12,
        "paddingRight": 0,
        "paddingBottom": 12,
        "paddingLeft": 0,
        "backgroundColor": "#fff",
        "color": "#999"
    },
    "woo-pager ul woo-pre a": {
        "display": "block",
        "marginRight": 1,
        "paddingTop": 12,
        "paddingRight": 0,
        "paddingBottom": 12,
        "paddingLeft": 0,
        "backgroundColor": "#fff",
        "color": "#999"
    },
    "woo-blog-0": {
        "backgroundColor": "#fff",
        "border": "1px solid #e0e0e0",
        "borderBottomWidth": 2,
        "fontSize": 12,
        "wordBreak": "break-all"
    },
    "woo-blog-0 a": {
        "display": "inline-block"
    },
    "woo-blog-0 h1": {
        "paddingTop": 8,
        "paddingRight": 8,
        "paddingBottom": 5,
        "paddingLeft": 8,
        "color": "#333"
    },
    "woo-blog-0 info": {
        "position": "relative",
        "paddingTop": 0,
        "paddingRight": 8,
        "paddingBottom": 5,
        "paddingLeft": 8
    },
    "woo-blog-0 info count": {
        "color": "#999"
    },
    "woo-blog-0 info price": {
        "color": "#e74c45"
    },
    "woo-blog-0 info hr": {
        "position": "absolute",
        "left": 0,
        "bottom": 0,
        "width": "100%",
        "height": 1,
        "backgroundImage": "linear-gradient(to bottom,transparent 50%,rgba(0,0,0,.12) 100%)",
        "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#1F000000', GradientType=0)",
        "backgroundRepeat": "no-repeat",
        "backgroundSize": "100% 2px",
        "backgroundPosition": "bottom"
    },
    "woo-blog-0 album": {
        "position": "relative",
        "paddingTop": 8,
        "paddingRight": 8,
        "paddingBottom": 8,
        "paddingLeft": 46,
        "lineHeight": 30
    },
    "woo-blog-0 album avatar": {
        "overflow": "hidden",
        "position": "absolute",
        "top": 8,
        "left": 8,
        "width": 30,
        "height": 30,
        "background": "url(http://img5.duitang.com/uploads/files/201409/09/20140909171211_LMUT8.thumb.224_224_c.jpeg)",
        "backgroundSize": "100% auto",
        "WebkitBorderRadius": "100%",
        "borderRadius": "100%"
    },
    "woo-blog-0 album sender": {
        "display": "inline-block",
        "lineHeight": 1.5
    },
    "woo-blog-0 album sender name": {
        "color": "#3498db"
    },
    "woo-blog-0 album sender album-name": {
        "color": "#333"
    },
    "woo-album-0 a": {
        "position": "relative",
        "display": "block",
        "backgroundColor": "#fff",
        "border": "1px solid #e0e0e0",
        "borderBottomWidth": 2
    },
    "woo-album-0 img": {
        "position": "relative",
        "display": "block",
        "paddingTop": "50%",
        "paddingRight": 0,
        "paddingBottom": "50%",
        "paddingLeft": 0,
        "overflow": "hidden"
    },
    "woo-album-0 img img": {
        "position": "absolute",
        "top": 0,
        "left": 0,
        "minWidth": "100%",
        "minHeight": "100%"
    },
    "woo-album-0 info": {
        "display": "block",
        "height": 54,
        "paddingTop": 8,
        "paddingRight": 8,
        "paddingBottom": 6,
        "paddingLeft": 8,
        "overflow": "hidden"
    },
    "woo-album-0 info h1": {
        "overflow": "hidden",
        "maxHeight": 32,
        "color": "#333",
        "lineHeight": 16,
        "fontSize": 13,
        "fontWeight": "700"
    },
    "woo-album-0 info p": {
        "marginTop": 6,
        "lineHeight": 16,
        "fontSize": 12,
        "color": "#999"
    },
    "woo-album-0 count": {
        "backgroundColor": "#e74c45",
        "fontSize": 12,
        "color": "#fff",
        "position": "absolute",
        "top": -4,
        "left": -6,
        "paddingTop": 0,
        "paddingRight": 6,
        "paddingBottom": 0,
        "paddingLeft": 6,
        "lineHeight": 18,
        "border": "1px solid #fff",
        "borderRadius": 12
    },
    "woo-album-0 type span": {
        "backgroundColor": "#e74c45",
        "fontSize": 12,
        "color": "#fff",
        "display": "inline-block",
        "paddingTop": 4,
        "paddingRight": 4,
        "paddingBottom": 4,
        "paddingLeft": 4,
        "textAlign": "center",
        "lineHeight": 16
    },
    "woo-album-0 type": {
        "display": "block",
        "paddingTop": 0,
        "paddingRight": 8,
        "paddingBottom": 9,
        "paddingLeft": 8
    },
    "hr-line": {
        "height": 1,
        "width": "100%",
        "border": "none",
        "backgroundRepeat": "no-repeat",
        "backgroundSize": "100% 1px"
    },
    "hr-t": {
        "backgroundPosition": "top",
        "backgroundImage": "-webkit-linear-gradient(top, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12) 50%, transparent 50%)",
        "zIndex": 2
    },
    "hr-b": {
        "backgroundPosition": "bottom",
        "backgroundImage": "-webkit-linear-gradient(bottom, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12) 50%, transparent 50%)",
        "zIndex": 2
    },
    "vt-line": {
        "position": "absolute",
        "top": 0,
        "width": 1,
        "height": "100%",
        "border": "none",
        "backgroundRepeat": "no-repeat",
        "backgroundSize": "1px 100%"
    },
    "vt-l": {
        "left": 0,
        "backgroundPosition": "left",
        "backgroundImage": "-webkit-linear-gradient(left, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12) 50%, transparent 50%)",
        "zIndex": 2
    },
    "vt-r": {
        "right": 0,
        "backgroundPosition": "right",
        "backgroundImage": "-webkit-linear-gradient(right, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12) 50%, transparent 50%)",
        "zIndex": 2
    },
    "*": {
        "boxSizing": "border-box",
        "WebkitBoxSizing": "border-box",
        "MozBoxSizing": "border-box"
    },
    "container": {
        "maxWidth": 640,
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto"
    }
});