!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=u(n(1)),a=u(n(2)),c=u(n(3)),i=u(n(4)),l=u(n(5));function u(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={labels:[],currentLabel:"",currentColor:"",tracking:!1,seconds:0},n.createLabel=n.createLabel.bind(n),n.changeLabel=n.changeLabel.bind(n),n.trackerSwitch=n.trackerSwitch.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,React.Component),r(t,[{key:"getLabels",value:function(){var e=this;fetch("/get_labels").then(function(e){return e.json()}).then(function(t){e.setState({labels:t.data,currentLabel:t.data[0].name},function(){console.log("Labels set")})}).catch(function(e){console.log(e)})}},{key:"createLabel",value:function(e,t){var n=this;fetch("/create_label",{method:"POST",body:JSON.stringify({name:e,color:t})}).then(function(e){return e.json()}).then(function(r){if("success"==r.status){var o={name:e,color:t};n.setState(function(e){return{labels:[].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(e.labels),[o])}})}})}},{key:"changeLabel",value:function(e,t){var n=this;this.setState({currentLabel:e,currentColor:t},function(){console.log("Label has been changed, new label:",n.state.currentLabel,n.state.currentColor)})}},{key:"storeTimestamp",value:function(){fetch("/store_timestamp",{method:"POST",body:JSON.stringify({label:this.state.currentLabel,color:this.state.currentColor})}).then(function(e){return e.json()}).then(function(e){console.log(e)})}},{key:"endTimestamp",value:function(){fetch("/end_timestamp",{method:"POST"}).then(function(e){return e.json()}).then(function(e){console.log(e)})}},{key:"lastTimestamp",value:function(){var e=this;fetch("/last_timestamp").then(function(e){return e.json()}).then(function(t){if("success"==t.status){var n=t.data;"false"==n.expired&&(console.log(n),e.setState({currentLabel:n.label,currentColor:n.color,tracking:!0,seconds:n.elapsed_secs}))}})}},{key:"trackerSwitch",value:function(){var e=void 0;0==this.state.tracking?(this.storeTimestamp(),e=!0):(this.endTimestamp(),e=!1),this.setState({tracking:e})}},{key:"count",value:function(){1==this.state.tracking&&this.setState(function(e){return{seconds:e.seconds+1}})}},{key:"componentWillMount",value:function(){this.getLabels(),this.lastTimestamp()}},{key:"componentDidMount",value:function(){var e=this;this.interval=setInterval(function(){return e.count()},1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){return[React.createElement("div",{id:"left-box"},React.createElement(l.default,null)),React.createElement("div",{id:"right-box"},React.createElement("div",{id:"label-menus"},React.createElement(o.default,{currentLabel:this.state.currentLabel,labels:this.state.labels,changeLabelEvent:this.changeLabel}),React.createElement(a.default,{createEvent:this.createLabel})),React.createElement("div",{id:"tracker"},React.createElement(c.default,{seconds:this.state.seconds}),React.createElement(i.default,{tracking:this.state.tracking,clickEvent:this.trackerSwitch})))]}}]),t}();ReactDOM.render(React.createElement(s,null),document.getElementById("container"))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,React.Component),r(t,[{key:"render",value:function(){return React.createElement("button",{id:"label-change-btn",onClick:this.props.clickEvent},this.props.currentLabel)}}]),t}(),l=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,React.Component),r(t,[{key:"render",value:function(){return React.createElement("div",{id:"close-btn-container"},React.createElement("button",{className:"close-btn",onClick:this.props.clickEvent},React.createElement("i",{className:"fas fa-times"})))}}]),t}(),u=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,React.Component),r(t,[{key:"render",value:function(){return React.createElement("div",{id:"label-change-header"},React.createElement("h1",{className:"header"},this.props.headerText))}}]),t}(),s=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,React.Component),r(t,[{key:"render",value:function(){var e={backgroundColor:this.props.color};return React.createElement("div",null,React.createElement("button",{className:"label-item",id:this.props.color,value:this.props.name,style:e,onClick:this.props.clickEvent},this.props.name))}}]),t}(),f=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,React.Component),r(t,[{key:"render",value:function(){var e=this,t=this.props.labels.map(function(t){return React.createElement(s,{name:t.name,color:t.color,clickEvent:e.props.clickEvent})});return React.createElement("div",{id:"labels-container"},t)}}]),t}(),p=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={modalStatus:""},n.showOrHideEvent=n.showOrHideEvent.bind(n),n.submitNewLabel=n.submitNewLabel.bind(n),n}return c(t,React.Component),r(t,[{key:"showOrHideEvent",value:function(){this.setState({modalStatus:""===this.state.modalStatus?"modal-active":""})}},{key:"submitNewLabel",value:function(e){this.props.changeLabelEvent(e.target.value,e.target.id),this.showOrHideEvent()}},{key:"render",value:function(){return[React.createElement(i,{clickEvent:this.showOrHideEvent,currentLabel:this.props.currentLabel}),React.createElement("div",{className:"modal "+this.state.modalStatus},React.createElement("div",{className:"modal-content"},React.createElement("div",{id:"label-change-menu"},React.createElement(l,{clickEvent:this.showOrHideEvent}),React.createElement(u,{headerText:"Choose Label"}),React.createElement(f,{labels:this.props.labels,clickEvent:this.submitNewLabel}))))]}}]),t}();t.default=p},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,React.Component),r(t,[{key:"render",value:function(){return React.createElement("button",{id:"label-maker-btn",onClick:this.props.clickEvent},React.createElement("i",{class:"fas fa-tag"}))}}]),t}(),l=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,React.Component),r(t,[{key:"render",value:function(){return React.createElement("div",{id:"close-btn-container"},React.createElement("button",{className:"close-btn",onClick:this.props.clickEvent},React.createElement("i",{className:"fas fa-times"})))}}]),t}(),u=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,React.Component),r(t,[{key:"render",value:function(){return React.createElement("div",{id:"label-maker-header"},React.createElement("h1",{className:"header"},this.props.headerText))}}]),t}(),s=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,React.Component),r(t,[{key:"render",value:function(){return React.createElement("input",{id:"label-maker-input",type:"text",name:"name",onChange:this.props.changeEvent,value:this.props.inputValue})}}]),t}(),f=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,React.Component),r(t,[{key:"getScale",value:function(){return this.props.color===this.props.currentColor?.9:1}},{key:"render",value:function(){var e={backgroundColor:this.props.color,transform:"scale("+this.getScale()+")"};return React.createElement("button",{id:"color-btn",style:e,value:this.props.color,onClick:this.props.clickEvent})}}]),t}(),p=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={colors:["#ff4c4c","#ffc168","#8db9ca","#6a67ce","#01cd74","#2d364c","#685c53","#282828","#774aa4","#ee70a6"]},n}return c(t,React.Component),r(t,[{key:"render",value:function(){var e=this,t=this.state.colors.map(function(t){return React.createElement(f,{color:t,currentColor:e.props.currentColor,clickEvent:e.props.clickEvent})});return React.createElement("div",{id:"colors-container"},t)}}]),t}(),h=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return c(t,React.Component),r(t,[{key:"setClass",value:function(){return this.props.inputValue.length<=0?"create-btn-inactive":"create-btn-active"}},{key:"render",value:function(){var e=this.setClass();return React.createElement("div",{id:"create-btn-container"},React.createElement("button",{className:e,id:"create-btn",onClick:this.props.clickEvent},"Create"))}}]),t}(),b=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={name:"",color:"#8db9ca",modalStatus:""},n.inputChange=n.inputChange.bind(n),n.changeColorEvent=n.changeColorEvent.bind(n),n.showOrHideEvent=n.showOrHideEvent.bind(n),n.internalClickEvent=n.internalClickEvent.bind(n),n.finalClickEvent=n.finalClickEvent.bind(n),n}return c(t,React.Component),r(t,[{key:"inputChange",value:function(e){this.setState({name:e.target.value})}},{key:"changeColorEvent",value:function(e){this.setState({color:e.target.value})}},{key:"internalClickEvent",value:function(){this.setState({name:"",color:"",modalStatus:""})}},{key:"showOrHideEvent",value:function(){this.setState({modalStatus:""===this.state.modalStatus?"modal-active":""})}},{key:"finalClickEvent",value:function(){this.props.createEvent(this.state.name,this.state.color),this.internalClickEvent()}},{key:"render",value:function(){return[React.createElement(i,{clickEvent:this.showOrHideEvent}),React.createElement("div",{className:"modal "+this.state.modalStatus},React.createElement("div",{className:"modal-content"},React.createElement("div",{id:"label-maker-menu"},React.createElement(l,{clickEvent:this.showOrHideEvent}),React.createElement(u,{headerText:"Create Label"}),React.createElement(s,{inputValue:this.state.name,changeEvent:this.inputChange}),React.createElement(p,{clickEvent:this.changeColorEvent,currentColor:this.state.color}),React.createElement(h,{inputValue:this.state.name,clickEvent:this.finalClickEvent}))))]}}]),t}();t.default=b},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var o=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,React.Component),r(t,[{key:"secondsToText",value:function(e){function t(e){return e.toString().length<=1?"0"+e:e}for(var n=0,r=0,o=0,a=e;a>0;)a>3600?(a-=3600,n+=1):a>60&&a<=3600?(a-=60,r+=1):a<=60&&(o+=a,a=0);return t(n)+":"+t(r)+":"+t(o)}},{key:"render",value:function(){var e=this.secondsToText(this.props.seconds);return React.createElement("h3",{id:"tracker-time"},e)}}]),t}();t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var o=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.setBtnText=n.setBtnText.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,React.Component),r(t,[{key:"setBtnText",value:function(){return 0==this.props.tracking?"Start day":"End day"}},{key:"render",value:function(){var e=this.setBtnText();return React.createElement("button",{id:"io-btn",onClick:this.props.clickEvent},e)}}]),t}();t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(e){function t(e){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return c(t,React.Component),r(t,[{key:"render",value:function(){return React.createElement("button",{className:"navbar-element"},this.props.text)}}]),t}(),l=function(e){function t(e){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return c(t,React.Component),r(t,[{key:"render",value:function(){return React.createElement("div",{id:"vertical-navbar"},React.createElement("div",{id:"navbar-logo"},React.createElement("h3",{id:"logo-text"},"Intervals")),React.createElement("div",{id:"navbar-elements"},React.createElement(i,{text:"Daily stats"}),React.createElement(i,{text:"Historic data"})))}}]),t}();t.default=l}]);