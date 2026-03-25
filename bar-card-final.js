function e(e,t,i,n){var a,o=arguments.length,r=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(o<3?a(r):o>3?a(t,i,r):a(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const t=new WeakMap,i=e=>"function"==typeof e&&t.has(e),n=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,a=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},o={},r={},s=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${s}--\x3e`,l=new RegExp(`${s}|${c}`),d="$lit$";class h{constructor(e,t){this.parts=[],this.element=t;const i=[],n=[],a=document.createTreeWalker(t.content,133,null,!1);let o=0,r=-1,c=0;const{strings:h,values:{length:u}}=e;for(;c<u;){const e=a.nextNode();if(null!==e){if(r++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let n=0;for(let e=0;e<i;e++)p(t[e].name,d)&&n++;for(;n-- >0;){const t=h[c],i=m.exec(t)[2],n=i.toLowerCase()+d,a=e.getAttribute(n);e.removeAttribute(n);const o=a.split(l);this.parts.push({type:"attribute",index:r,name:i,strings:o}),c+=o.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),a.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(s)>=0){const n=e.parentNode,a=t.split(l),o=a.length-1;for(let t=0;t<o;t++){let i,o=a[t];if(""===o)i=g();else{const e=m.exec(o);null!==e&&p(e[2],d)&&(o=o.slice(0,e.index)+e[1]+e[2].slice(0,-d.length)+e[3]),i=document.createTextNode(o)}n.insertBefore(i,e),this.parts.push({type:"node",index:++r})}""===a[o]?(n.insertBefore(g(),e),i.push(e)):e.data=a[o],c+=o}}else if(8===e.nodeType)if(e.data===s){const t=e.parentNode;null!==e.previousSibling&&r!==o||(r++,t.insertBefore(g(),e)),o=r,this.parts.push({type:"node",index:r}),null===e.nextSibling?e.data="":(i.push(e),r--),c++}else{let t=-1;for(;-1!==(t=e.data.indexOf(s,t+1));)this.parts.push({type:"node",index:-1}),c++}}else a.currentNode=n.pop()}for(const e of i)e.parentNode.removeChild(e)}}const p=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},u=e=>-1!==e.index,g=()=>document.createComment(""),m=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class f{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=n?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,a=document.createTreeWalker(e,133,null,!1);let o,r=0,s=0,c=a.nextNode();for(;r<i.length;)if(o=i[r],u(o)){for(;s<o.index;)s++,"TEMPLATE"===c.nodeName&&(t.push(c),a.currentNode=c.content),null===(c=a.nextNode())&&(a.currentNode=t.pop(),c=a.nextNode());if("node"===o.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return n&&(document.adoptNode(e),customElements.upgrade(e)),e}}const v=` ${s} `;class b{constructor(e,t,i,n){this.strings=e,this.values=t,this.type=i,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let n=0;n<e;n++){const e=this.strings[n],a=e.lastIndexOf("\x3c!--");i=(a>-1||i)&&-1===e.indexOf("--\x3e",a+1);const o=m.exec(e);t+=null===o?e+(i?v:c):e.substr(0,o.index)+o[1]+o[2]+d+o[3]+s}return t+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}const _=e=>null===e||!("object"==typeof e||"function"==typeof e),y=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class ${constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new w(this)}_getValue(){const e=this.strings,t=e.length-1;let i="";for(let n=0;n<t;n++){i+=e[n];const t=this.parts[n];if(void 0!==t){const e=t.value;if(_(e)||!y(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class w{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===o||_(e)&&e===this.value||(this.value=e,i(e)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const e=this.value;this.value=o,e(this)}this.value!==o&&this.committer.commit()}}class x{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(g()),this.endNode=e.appendChild(g())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=g()),e.__insert(this.endNode=g())}insertAfterPart(e){e.__insert(this.startNode=g()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=o,e(this)}const e=this.__pendingValue;e!==o&&(_(e)?e!==this.value&&this.__commitText(e):e instanceof b?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):y(e)?this.__commitIterable(e):e===r?(this.value=r,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof f&&this.value.template===t)this.value.update(e.values);else{const i=new f(t,e.processor,this.options),n=i._clone();i.update(e.values),this.__commitNode(n),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,n=0;for(const a of e)void 0===(i=t[n])&&(i=new x(this.options),t.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(t[n-1])),i.setValue(a),i.commit(),n++;n<t.length&&(t.length=n,this.clear(i&&i.endNode))}clear(e=this.startNode){a(this.startNode.parentNode,e.nextSibling,this.endNode)}}class A{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=o,e(this)}if(this.__pendingValue===o)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=o}}class S extends ${constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new k(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class k extends w{}let C=!1;try{const e={get capture(){return C=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class E{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=o,e(this)}if(this.__pendingValue===o)return;const e=this.__pendingValue,t=this.value,n=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),a=null!=e&&(null==t||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),a&&(this.__options=N(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=o}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const N=e=>e&&(C?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);const O=new class{handleAttributeExpressions(e,t,i,n){const a=t[0];if("."===a){return new S(e,t.slice(1),i).parts}return"@"===a?[new E(e,t.slice(1),n.eventContext)]:"?"===a?[new A(e,t.slice(1),i)]:new $(e,t,i).parts}handleTextExpression(e){return new x(e)}};function j(e){let t=P.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},P.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const n=e.strings.join(s);return void 0===(i=t.keyString.get(n))&&(i=new h(e,e.getTemplateElement()),t.keyString.set(n,i)),t.stringsArray.set(e.strings,i),i}const P=new Map,T=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const V=(e,...t)=>new b(e,t,"html",O),z=133;function I(e,t){const{element:{content:i},parts:n}=e,a=document.createTreeWalker(i,z,null,!1);let o=R(n),r=n[o],s=-1,c=0;const l=[];let d=null;for(;a.nextNode();){s++;const e=a.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(l.push(e),null===d&&(d=e)),null!==d&&c++;void 0!==r&&r.index===s;)r.index=null!==d?-1:r.index-c,r=n[o=R(n,o)]}l.forEach(e=>e.parentNode.removeChild(e))}const M=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,z,null,!1);for(;i.nextNode();)t++;return t},R=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(u(t))return i}return-1};const U=(e,t)=>`${e}--${t}`;let L=!0;void 0===window.ShadyCSS?L=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),L=!1);const B=e=>t=>{const i=U(t.type,e);let n=P.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},P.set(i,n));let a=n.stringsArray.get(t.strings);if(void 0!==a)return a;const o=t.strings.join(s);if(void 0===(a=n.keyString.get(o))){const i=t.getTemplateElement();L&&window.ShadyCSS.prepareTemplateDom(i,e),a=new h(t,i),n.keyString.set(o,a)}return n.stringsArray.set(t.strings,a),a},D=["html","svg"],H=new Set,q=(e,t,i)=>{H.add(e);const n=i?i.element:document.createElement("template"),a=t.querySelectorAll("style"),{length:o}=a;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(n,e);const r=document.createElement("style");for(let e=0;e<o;e++){const t=a[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}(e=>{D.forEach(t=>{const i=P.get(U(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),I(e,i)})})})(e);const s=n.content;i?function(e,t,i=null){const{element:{content:n},parts:a}=e;if(null==i)return void n.appendChild(t);const o=document.createTreeWalker(n,z,null,!1);let r=R(a),s=0,c=-1;for(;o.nextNode();){for(c++,o.currentNode===i&&(s=M(t),i.parentNode.insertBefore(t,i));-1!==r&&a[r].index===c;){if(s>0){for(;-1!==r;)a[r].index+=s,r=R(a,r);return}r=R(a,r)}}}(i,r,s.firstChild):s.insertBefore(r,s.firstChild),window.ShadyCSS.prepareTemplateStyles(n,e);const c=s.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)t.insertBefore(c.cloneNode(!0),t.firstChild);else if(i){s.insertBefore(r,s.firstChild);const e=new Set;e.add(r),I(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const F={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},W=(e,t)=>t!==e&&(t==t||e==e),J={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:W},K=Promise.resolve(!0),X=1,Y=4,G=8,Q=16,Z=32,ee="finalized";class te extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=K,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const n=this._attributeNameForProperty(i,t);void 0!==n&&(this._attributeToPropertyMap.set(n,i),e.push(n))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=J){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`;Object.defineProperty(this.prototype,e,{get(){return this[i]},set(t){const n=this[e];this[i]=t,this._requestUpdate(e,n)},configurable:!0,enumerable:!0})}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(ee)||e.finalize(),this[ee]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=W){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,n=t.converter||F,a="function"==typeof n?n:n.fromAttribute;return a?a(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,n=t.converter;return(n&&n.toAttribute||F.toAttribute)(e,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Z,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=J){const n=this.constructor,a=n._attributeNameForProperty(e,i);if(void 0!==a){const e=n._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=this._updateState|G,null==e?this.removeAttribute(a):this.setAttribute(a,e),this._updateState=this._updateState&~G}}_attributeToProperty(e,t){if(this._updateState&G)return;const i=this.constructor,n=i._attributeToPropertyMap.get(e);if(void 0!==n){const e=i._classProperties.get(n)||J;this._updateState=this._updateState|Q,this[n]=i._propertyValueFromAttribute(t,e),this._updateState=this._updateState&~Q}}_requestUpdate(e,t){let i=!0;if(void 0!==e){const n=this.constructor,a=n._classProperties.get(e)||J;n._valueHasChanged(this[e],t,a.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==a.reflect||this._updateState&Q||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,a))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){let e,t;this._updateState=this._updateState|Y;const i=this._updatePromise;this._updatePromise=new Promise((i,n)=>{e=i,t=n});try{await i}catch(e){}this._hasConnected||await new Promise(e=>this._hasConnectedResolver=e);try{const e=this.performUpdate();null!=e&&await e}catch(e){t(e)}e(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Z}get _hasRequestedUpdate(){return this._updateState&Y}get hasUpdated(){return this._updateState&X}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{(e=this.shouldUpdate(t))&&this.update(t)}catch(t){throw e=!1,t}finally{this._markUpdated()}e&&(this._updateState&X||(this._updateState=this._updateState|X,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Y}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0)}updated(e){}firstUpdated(e){}}te[ee]=!0;const ie=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:n}=t;return{kind:i,elements:n,finisher(t){window.customElements.define(e,t)}}})(e,t),ne=(e,t)=>"method"!==t.kind||!t.descriptor||"value"in t.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}}:Object.assign({},t,{finisher(i){i.createProperty(t.key,e)}}),ae=(e,t,i)=>{t.constructor.createProperty(i,e)};function oe(e){return(t,i)=>void 0!==i?ae(e,t,i):ne(e,t)}const re="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,se=Symbol();class ce{constructor(e,t){if(t!==se)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(re?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const le=(e,...t)=>{const i=t.reduce((t,i,n)=>t+(e=>{if(e instanceof ce)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[n+1],e[0]);return new ce(i,se)};(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const de=e=>e.flat?e.flat(1/0):function e(t,i=[]){for(let n=0,a=t.length;n<a;n++){const a=t[n];Array.isArray(a)?e(a,i):i.push(a)}return i}(e);class he extends te{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const e=this.styles,t=[];if(Array.isArray(e)){de(e).reduceRight((e,t)=>(e.add(t),e),new Set).forEach(e=>t.unshift(e))}else e&&t.push(e);return t}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?re?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){super.update(e);const t=this.render();t instanceof b&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){}}var pe,ue,ge;function me(e){return e.substr(0,e.indexOf("."))}he.finalized=!0,he.render=(e,t,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,o=T.has(t),r=L&&11===t.nodeType&&!!t.host,s=r&&!H.has(n),c=s?document.createDocumentFragment():t;if(((e,t,i)=>{let n=T.get(t);void 0===n&&(a(t,t.firstChild),T.set(t,n=new x(Object.assign({templateFactory:j},i))),n.appendInto(t)),n.setValue(e),n.commit()})(e,c,Object.assign({templateFactory:B(n)},i)),s){const e=T.get(c);T.delete(c);const i=e.value instanceof f?e.value.template:void 0;q(n,c,i),a(t,t.firstChild),t.appendChild(c),T.set(t,e)}!o&&r&&window.ShadyCSS.styleElement(t.host)},(ge=pe||(pe={})).language="language",ge.system="system",ge.comma_decimal="comma_decimal",ge.decimal_comma="decimal_comma",ge.space_comma="space_comma",ge.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(ue||(ue={}));var fe=["closed","locked","off"],ve=function(e,t,i,n){n=n||{},i=null==i?{}:i;var a=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return a.detail=i,e.dispatchEvent(a),a},be={alert:"mdi:alert",automation:"mdi:playlist-play",calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:google-pages",script:"mdi:file-document",sensor:"mdi:eye",simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weblink:"mdi:open-in-new"};function _e(e,t){if(e in be)return be[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"mdi:bell-plus";case"armed_night":return"mdi:bell-sleep";case"disarmed":return"mdi:bell-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:bell"}case"binary_sensor":return t&&"off"===t?"mdi:radiobox-blank":"mdi:checkbox-marked-circle";case"cover":return"closed"===t?"mdi:window-closed":"mdi:window-open";case"lock":return t&&"unlocked"===t?"mdi:lock-open":"mdi:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"mdi:cast-connected":"mdi:cast";case"zwave":switch(t){case"dead":return"mdi:emoticon-dead";case"sleeping":return"mdi:sleep";case"initializing":return"mdi:timer-sand";default:return"mdi:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),"mdi:bookmark"}}var ye=function(e){ve(window,"haptic",e)},$e=function(e,t){return function(e,t,i){void 0===i&&(i=!0);var n,a=me(t),o="group"===a?"homeassistant":a;switch(a){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}return e.callService(o,n,{entity_id:t})}(e,t,fe.includes(e.states[t].state))},we=function(e,t,i,n){if(n||(n={action:"more-info"}),!n.confirmation||n.confirmation.exemptions&&n.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(ye("warning"),confirm(n.confirmation.text||"Are you sure you want to "+n.action+"?")))switch(n.action){case"more-info":(i.entity||i.camera_image)&&ve(e,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":n.navigation_path&&function(e,t,i){void 0===i&&(i=!1),i?history.replaceState(null,"",t):history.pushState(null,"",t),ve(window,"location-changed",{replace:i})}(0,n.navigation_path);break;case"url":n.url_path&&window.open(n.url_path);break;case"toggle":i.entity&&($e(t,i.entity),ye("success"));break;case"call-service":if(!n.service)return void ye("failure");var a=n.service.split(".",2);t.callService(a[0],a[1],n.service_data,n.target),ye("success");break;case"fire-dom-event":ve(e,"ll-custom",n)}};function xe(e){return void 0!==e&&"none"!==e.action}function Ae(...e){const t=e=>e&&"object"==typeof e;return e.reduce((e,i)=>(Object.keys(i).forEach(n=>{const a=e[n],o=i[n];Array.isArray(a)&&Array.isArray(o)?e[n]=a.concat(...o):t(a)&&t(o)?e[n]=Ae(a,o):e[n]=o}),e),{})}function Se(e,t,i){if(t.has("config")||i)return!0;const n=["entity","min","max","target"];for(const i of e._configArray){const a=t.get("hass");if(!a)return!0;for(const t of n){const n=i[t],o=n&&"object"==typeof n&&n.entity?n.entity:n;if("string"==typeof o&&a.states[o]!==e.hass.states[o])return!0}}return!1}function ke(e,t,i){const n=e[t],a=e.slice();return a.splice(t,1),a.splice(i,0,n),a}let Ce=class extends he{constructor(){super(...arguments),this._configArray=[],this._entityOptionsArray=[]}shouldUpdate(e){return Se(this,e,!0)}setConfig(e){this._config=Object.assign({},e),this._configArray=[],this._entityOptionsArray=[],this._options=void 0,e.entity||e.entities||(this._config.entity="none"),this._config.entity&&(this._configArray.push({entity:e.entity}),this._config.entities=[{entity:e.entity}],delete this._config.entity),this._configArray=function(e){const t=[];if(e.entities){for(const i of e.entities)if("string"==typeof i){const e=Ae({},{entity:i});t.push(e)}else if("object"==typeof i){const e=Ae({},i);t.push(e)}}else t.push(e);return t}(this._config),this._config.animation&&0===Object.entries(this._config.animation).length&&(delete this._config.animation,ve(this,"config-changed",{config:this._config})),this._config.positions&&0===Object.entries(this._config.positions).length&&(delete this._config.positions,ve(this,"config-changed",{config:this._config}));for(const e of this._configArray)e.animation&&0===Object.entries(e.animation).length&&delete e.animation,e.positions&&0===Object.entries(e.positions).length&&delete e.positions;this._config.entities=this._configArray,ve(this,"config-changed",{config:this._config});const t={icon:"format-list-numbered",name:"Bar",secondary:"Bar settings.",show:!1},i={icon:"numeric",name:"Value",secondary:"Value settings.",show:!1},n={icon:"card-bulleted",name:"Card",secondary:"Card settings.",show:!1},a={icon:"arrow-expand-horizontal",name:"Positions",secondary:"Set positions of card elements.",show:!1},o={icon:"gesture-tap",name:"Actions",secondary:"Configure tap, hold and double tap actions.",show:!1},r={icon:"exclamation-thick",name:"Severity",secondary:"Define bar colors based on value.",show:!1},s={icon:"animation",name:"Animation",secondary:"Define animation settings.",show:!1},c={show:!1,options:{positions:Object.assign({},a),bar:Object.assign({},t),value:Object.assign({},i),severity:Object.assign({},r),actions:Object.assign({},o),animation:Object.assign({},s)}};for(const e of this._configArray)this._entityOptionsArray.push(Object.assign({},c));this._options||(this._options={entities:{icon:"tune",name:"Entities",secondary:"Manage card entities.",show:!0,options:{entities:this._entityOptionsArray}},appearance:{icon:"palette",name:"Appearance",secondary:"Customize the global name, icon, etc.",show:!1,options:{positions:a,bar:t,value:i,card:n,severity:r,animation:s,actions:o}}})}render(){return V`
      ${this._createEntitiesElement()} ${this._createAppearanceElement()}
    `}_createActionsElement(e){let t,i;null===e?(i=this._options.appearance.options.actions,t=this._config):(i=this._options.entities.options.entities[e].options.actions,t=this._configArray[e]);return V`
      <div class="category">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${i}
          .optionsTarget=${this._options.appearance.options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${i.icon}`}></ha-icon>
            <div class="title">${i.name}</div>
            <ha-icon .icon=${i.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${i.secondary}</div>
        </div>
        ${i.show?V`
              <div class="value">
                ${[{key:"tap_action",label:"Tap"},{key:"hold_action",label:"Hold"},{key:"double_tap_action",label:"Double Tap"}].map(e=>V`
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <paper-dropdown-menu
                        label="${e.label} Action"
                        @selected-item-changed=${this._updateAction}
                        .configObject=${t}
                        .actionKey=${e.key}
                        .actionAttribute=${"action"}
                      >
                        <paper-listbox
                          slot="dropdown-content"
                          attr-for-selected="item-name"
                          selected="${t[e.key]?t[e.key].action:""}"
                        >
                          <paper-item item-name="">none</paper-item>
                          <paper-item item-name="more-info">more-info</paper-item>
                          <paper-item item-name="toggle">toggle</paper-item>
                          <paper-item item-name="navigate">navigate</paper-item>
                          <paper-item item-name="url">url</paper-item>
                          <paper-item item-name="call-service">call-service</paper-item>
                        </paper-listbox>
                      </paper-dropdown-menu>
                      ${t[e.key]?V`
                            <ha-icon
                              class="ha-icon-large"
                              icon="mdi:close"
                              @click=${this._updateAction}
                              .value=${""}
                              .configObject=${t}
                              .actionKey=${e.key}
                              .actionAttribute=${"action"}
                            ></ha-icon>
                          `:""}
                    </div>
                    ${t[e.key]&&"navigate"===t[e.key].action?V`
                          <paper-input
                            label="${e.label} Navigation Path"
                            .value="${t[e.key].navigation_path?t[e.key].navigation_path:""}"
                            editable
                            .configObject=${t}
                            .actionKey=${e.key}
                            .actionAttribute=${"navigation_path"}
                            @value-changed=${this._updateAction}
                          ></paper-input>
                        `:""}
                    ${t[e.key]&&"url"===t[e.key].action?V`
                          <paper-input
                            label="${e.label} URL"
                            .value="${t[e.key].url_path?t[e.key].url_path:""}"
                            editable
                            .configObject=${t}
                            .actionKey=${e.key}
                            .actionAttribute=${"url_path"}
                            @value-changed=${this._updateAction}
                          ></paper-input>
                        `:""}
                    ${t[e.key]&&"call-service"===t[e.key].action?V`
                          <paper-input
                            label="${e.label} Service"
                            .value="${t[e.key].service?t[e.key].service:""}"
                            editable
                            .configObject=${t}
                            .actionKey=${e.key}
                            .actionAttribute=${"service"}
                            @value-changed=${this._updateAction}
                          ></paper-input>
                        `:""}
                  `)}
              </div>
            `:""}
      </div>
    `}_createEntitiesValues(){if(!this.hass||!this._config)return[V``];const e=this._options.entities,t=[];for(const i of this._configArray){const n=this._configArray.indexOf(i);t.push(V`
        <div class="sub-category" style="display: flex; flex-direction: row; align-items: center;">
          <div style="display: flex; align-items: center; flex-direction: column;">
            <div
              style="font-size: 10px; margin-bottom: -8px; opacity: 0.5;"
              @click=${this._toggleThing}
              .options=${e.options.entities[n]}
              .optionsTarget=${e.options.entities}
              .index=${n}
            >
              options
            </div>
            <ha-icon
              icon="mdi:chevron-${e.options.entities[n].show?"up":"down"}"
              @click=${this._toggleThing}
              .options=${e.options.entities[n]}
              .optionsTarget=${e.options.entities}
              .index=${n}
            ></ha-icon>
          </div>
          <div class="value" style="flex-grow: 1;">
            <paper-input
              label="Entity"
              @value-changed=${this._valueChanged}
              .configAttribute=${"entity"}
              .configObject=${this._configArray[n]}
              .value=${i.entity}
            >
            </paper-input>
          </div>
          ${0!==n?V`
                <ha-icon
                  class="ha-icon-large"
                  icon="mdi:arrow-up"
                  @click=${this._moveEntity}
                  .configDirection=${"up"}
                  .configArray=${this._config.entities}
                  .arrayAttribute=${"entities"}
                  .arraySource=${this._config}
                  .index=${n}
                ></ha-icon>
              `:V`
                <ha-icon icon="mdi:arrow-up" style="opacity: 25%;" class="ha-icon-large"></ha-icon>
              `}
          ${n!==this._configArray.length-1?V`
                <ha-icon
                  class="ha-icon-large"
                  icon="mdi:arrow-down"
                  @click=${this._moveEntity}
                  .configDirection=${"down"}
                  .configArray=${this._config.entities}
                  .arrayAttribute=${"entities"}
                  .arraySource=${this._config}
                  .index=${n}
                ></ha-icon>
              `:V`
                <ha-icon icon="mdi:arrow-down" style="opacity: 25%;" class="ha-icon-large"></ha-icon>
              `}
          <ha-icon
            class="ha-icon-large"
            icon="mdi:close"
            @click=${this._removeEntity}
            .configAttribute=${"entity"}
            .configArray=${"entities"}
            .configIndex=${n}
          ></ha-icon>
        </div>
        ${e.options.entities[n].show?V`
              <div class="options">
                ${this._createBarElement(n)} ${this._createValueElement(n)}
                ${this._createPositionsElement(n)} ${this._createSeverityElement(n)}
                ${this._createAnimationElement(n)} ${this._createActionsElement(n)}
              </div>
            `:""}
      `)}return t}_createEntitiesElement(){if(!this.hass||!this._config)return V``;const e=this._options.entities;return V`
      <div class="card-config">
        <div class="option" @click=${this._toggleThing} .options=${e} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
            <div class="title">${e.name}</div>
            <ha-icon .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${e.secondary}</div>
        </div>
        ${e.show?V`
              <div class="card-background" style="max-height: 400px; overflow: auto;">
                ${this._createEntitiesValues()}
                <div class="sub-category" style="display: flex; flex-direction: column; align-items: flex-end;">
                  <ha-fab
                    mini
                    icon="mdi:plus"
                    @click=${this._addEntity}
                    .configArray=${this._configArray}
                    .configAddValue=${"entity"}
                    .sourceArray=${this._config.entities}
                  ></ha-fab>
                </div>
              </div>
            `:""}
      </div>
    `}_createAppearanceElement(){if(!this.hass)return V``;const e=this._options.appearance;return V`
        <div class="option" @click=${this._toggleThing} .options=${e} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
            <div class="title">${e.name}</div>
            <ha-icon
              .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"}
              style="margin-left: auto;"
            ></ha-icon>
          </div>
          <div class="secondary">${e.secondary}</div>
        </div>
        ${e.show?V`
                <div class="card-background">
                  ${this._createCardElement()} ${this._createBarElement(null)} ${this._createValueElement(null)}
                  ${this._createPositionsElement(null)} ${this._createSeverityElement(null)}
                  ${this._createAnimationElement(null)} ${this._createActionsElement(null)}
                </div>
              `:""}
      </div>`}_createBarElement(e){let t,i;return null!==e?(t=this._options.entities.options.entities[e].options.bar,i=this._configArray[e]):(t=this._options.appearance.options.bar,i=this._config),V`
      <div class="category" id="bar">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${t}
          .optionsTarget=${this._options.appearance.options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
            <div class="title">${t.name}</div>
            <ha-icon .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?V`
              <div class="value">
                <div>
                  <paper-dropdown-menu
                    label="Direction"
                    @selected-item-changed=${this._valueChanged}
                    .configObject=${i}
                    .configAttribute=${"direction"}
                    .ignoreNull=${!0}
                  >
                    <paper-listbox
                      slot="dropdown-content"
                      attr-for-selected="item-name"
                      selected="${i.direction?i.direction:null}"
                    >
                      <paper-item item-name="right">right</paper-item>
                      <paper-item item-name="up">up</paper-item>
                    </paper-listbox>
                  </paper-dropdown-menu>
                  ${i.direction?V`
                        <ha-icon
                          class="ha-icon-large"
                          icon="mdi:close"
                          @click=${this._valueChanged}
                          .value=${""}
                          .configAttribute=${"direction"}
                          .configObject=${i}
                        ></ha-icon>
                      `:""}
                </div>
                ${null!==e?V`
                      <paper-input
                        label="Name"
                        .value="${i.name?i.name:""}"
                        editable
                        .configAttribute=${"name"}
                        .configObject=${i}
                        @value-changed=${this._valueChanged}
                      ></paper-input>
                    `:""}
                <paper-input
                  label="Icon"
                  .value="${i.icon?i.icon:""}"
                  editable
                  .configAttribute=${"icon"}
                  .configObject=${i}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Height"
                  .value="${i.height?i.height:""}"
                  editable
                  .configAttribute=${"height"}
                  .configObject=${i}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Width"
                  .value="${i.width?i.width:""}"
                  editable
                  .configAttribute=${"width"}
                  .configObject=${i}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Color"
                  .value="${i.color?i.color:""}"
                  editable
                  .configAttribute=${"color"}
                  .configObject=${i}
                  @value-changed=${this._valueChanged}
                ></paper-input>
              </div>
            `:""}
      </div>
    `}_createAnimationElement(e){let t,i;return null!==e?(t=this._options.entities.options.entities[e].options.animation,i=this._configArray[e]):(t=this._options.appearance.options.animation,i=this._config),i.animation=Object.assign({},i.animation),V`
      <div class="category" id="bar">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${t}
          .optionsTarget=${this._options.appearance.options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
            <div class="title">${t.name}</div>
            <ha-icon .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?i.animation?V`
                <div class="value">
                  <div>
                    <paper-dropdown-menu
                      label="State"
                      @selected-item-changed=${this._valueChanged}
                      .configAttribute=${"state"}
                      .configObject=${i.animation}
                      .index=${e}
                      .ignoreNull=${!0}
                    >
                      <paper-listbox
                        slot="dropdown-content"
                        attr-for-selected="item-name"
                        selected="${i.animation.state?i.animation.state:null}"
                      >
                        <paper-item item-name="on">on</paper-item>
                        <paper-item item-name="off">off</paper-item>
                      </paper-listbox>
                    </paper-dropdown-menu>
                    ${i.animation.state?V`
                          <ha-icon
                            class="ha-icon-large"
                            icon="mdi:close"
                            @click=${this._valueChanged}
                            .value=${""}
                            .configAttribute=${"state"}
                            .configObject=${i.animation}
                            .index=${e}
                          ></ha-icon>
                        `:""}
                  </div>
                  <paper-input
                    label="Speed"
                    .value="${i.animation.speed?i.animation.speed:""}"
                    editable
                    @value-changed=${this._valueChanged}
                    .configAttribute=${"speed"}
                    .configObject=${i.animation}
                    .index=${e}
                  ></paper-input>
                </div>
              `:V`
                <div class="value">
                  <div>
                    <paper-dropdown-menu
                      label="State"
                      @selected-item-changed=${this._valueChanged}
                      .configObject=${i}
                      .configAttribute=${"state"}
                      .configAdd=${"animation"}
                      .index=${e}
                      .ignoreNull=${!0}
                    >
                      <paper-listbox slot="dropdown-content" attr-for-selected="item-name">
                        <paper-item item-name="on">on</paper-item>
                        <paper-item item-name="off">off</paper-item>
                      </paper-listbox>
                    </paper-dropdown-menu>
                  </div>
                  <paper-input
                    label="Speed"
                    editable
                    .value=${""}
                    @value-changed=${this._valueChanged}
                    .configAttribute=${"speed"}
                    .configObject=${i}
                    .configAdd=${"animation"}
                    .index=${e}
                  ></paper-input>
                </div>
              `:""}
      </div>
    `}_createSeverityElement(e){let t,i;null!==e?(t=this._options.entities.options.entities[e].options.severity,i=this._configArray[e]):(t=this._options.appearance.options.severity,i=this._config);const n=i.severity?i.severity.length:0;return V`
      <div class="category" id="bar">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${t}
          .optionsTarget=${this._options.appearance.options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
            <div class="title">${t.name}</div>
            <ha-icon .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?V`
              <div class="card-background" style="overflow: auto; max-height: 420px;">
                ${n>0?V`
                      ${this._createSeverityValues(e)}
                    `:""}
                <div class="sub-category" style="display: flex; flex-direction: column; align-items: flex-end;">
                  <ha-fab mini icon="mdi:plus" @click=${this._addSeverity} .index=${e}></ha-fab>
                </div>
              </div>
            `:""}
      </div>
    `}_createSeverityValues(e){let t;t=null===e?this._config:this._configArray[e];const i=[];for(const n of t.severity){const a=t.severity.indexOf(n);i.push(V`
        <div class="sub-category" style="display: flex; flex-direction: row; align-items: center;">
          <div class="value">
            <div style="display:flex;">
              <paper-input
                label="From"
                type="number"
                .value="${n.from||0===n.from?n.from:""}"
                editable
                .severityAttribute=${"from"}
                .index=${e}
                .severityIndex=${a}
                @value-changed=${this._updateSeverity}
              ></paper-input>
              <paper-input
                label="To"
                type="number"
                .value="${n.to?n.to:""}"
                editable
                .severityAttribute=${"to"}
                .index=${e}
                .severityIndex=${a}
                @value-changed=${this._updateSeverity}
              ></paper-input>
            </div>
            <div style="display:flex;">
              <paper-input
                label="Color"
                .value="${n.color?n.color:""}"
                editable
                .severityAttribute=${"color"}
                .index=${e}
                .severityIndex=${a}
                @value-changed=${this._updateSeverity}
              ></paper-input>
              <paper-input
                label="Icon"
                .value="${n.icon?n.icon:""}"
                editable
                .severityAttribute=${"icon"}
                .index=${e}
                .severityIndex=${a}
                @value-changed=${this._updateSeverity}
              ></paper-input>
            </div>
            ${n.hide?V`
                  <ha-switch
                    checked
                    .severityAttribute=${"hide"}
                    .index=${e}
                    .severityIndex=${a}
                    .value=${!n.hide}
                    @change=${this._updateSeverity}
                    >Hide</ha-switch
                  >
                `:V`
                  <ha-switch
                    unchecked
                    .severityAttribute=${"hide"}
                    .index=${e}
                    .severityIndex=${a}
                    .value=${!n.hide}
                    @change=${this._updateSeverity}
                    >Hide</ha-switch
                  >
                `}
          </div>
          <div style="display: flex;">
            ${0!==a?V`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-up"
                    @click=${this._moveSeverity}
                    .configDirection=${"up"}
                    .index=${e}
                    .severityIndex=${a}
                  ></ha-icon>
                `:V`
                  <ha-icon icon="mdi:arrow-up" style="opacity: 25%;" class="ha-icon-large"></ha-icon>
                `}
            ${a!==t.severity.length-1?V`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-down"
                    @click=${this._moveSeverity}
                    .configDirection=${"down"}
                    .index=${e}
                    .severityIndex=${a}
                  ></ha-icon>
                `:V`
                  <ha-icon icon="mdi:arrow-down" style="opacity: 25%;" class="ha-icon-large"></ha-icon>
                `}
            <ha-icon
              class="ha-icon-large"
              icon="mdi:close"
              @click=${this._removeSeverity}
              .index=${e}
              .severityIndex=${a}
            ></ha-icon>
          </div>
        </div>
      `)}return i}_createCardElement(){if(!this.hass)return V``;const e=this._config,t=this._options.appearance.options.card;return V`
      <div class="category" id="card">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${t}
          .optionsTarget=${this._options.appearance.options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
            <div class="title">${t.name}</div>
            <ha-icon .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?V`
              <div class="value-container">
                <paper-input
                  editable
                  label="Header Title"
                  .value="${e.title?e.title:""}"
                  .configObject=${e}
                  .configAttribute=${"title"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  class="value-number"
                  type="number"
                  label="Columns"
                  .value=${e.columns?e.columns:""}
                  .configObject=${e}
                  .configAttribute=${"columns"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <div>
                  <paper-dropdown-menu
                    label="Stack"
                    @selected-item-changed=${this._valueChanged}
                    .configObject=${e}
                    .configAttribute=${"stack"}
                  >
                    <paper-listbox
                      slot="dropdown-content"
                      attr-for-selected="item-name"
                      selected="${e.stack||""}"
                    >
                      <paper-item item-name="">none</paper-item>
                      <paper-item item-name="horizontal">horizontal</paper-item>
                    </paper-listbox>
                  </paper-dropdown-menu>
                </div>
                <div>
                  ${e.entity_row?V`
                        <ha-switch
                          checked
                          .configAttribute=${"entity_row"}
                          .configObject=${e}
                          .value=${!e.entity_row}
                          @change=${this._valueChanged}
                          >Entity Row</ha-switch
                        >
                      `:V`
                        <ha-switch
                          unchecked
                          .configAttribute=${"entity_row"}
                          .configObject=${e}
                          .value=${!e.entity_row}
                          @change=${this._valueChanged}
                          >Entity Row</ha-switch
                        >
                      `}
                </div>
                <div>
                  ${e.entity_config?V`
                        <ha-switch
                          checked
                          .configAttribute=${"entity_config"}
                          .configObject=${e}
                          .value=${!e.entity_config}
                          @change=${this._valueChanged}
                          >Entity Config</ha-switch
                        >
                      `:V`
                        <ha-switch
                          unchecked
                          .configAttribute=${"entity_config"}
                          .configObject=${e}
                          .value=${!e.entity_config}
                          @change=${this._valueChanged}
                          >Entity Config</ha-switch
                        >
                      `}
                </div>
              </div>
            `:""}
      </div>
    `}_createPositionsValues(e){let t;(t=null===e?this._config:this._configArray[e]).positions=Object.assign({},t.positions);const i=[],n=Object.keys({icon:"outside",indicator:"outside",name:"inside",minmax:"off",value:"inside"});for(const e of n)t.positions[e]?i.push(V`
          <div class="value">
            <paper-dropdown-menu
              label="${e}"
              @value-changed=${this._valueChanged}
              .configAttribute=${e}
              .configObject=${t.positions}
              .ignoreNull=${!0}
            >
              <paper-listbox
                slot="dropdown-content"
                attr-for-selected="item-name"
                .selected=${t.positions[e]}
              >
                <paper-item item-name="inside">inside</paper-item>
                <paper-item item-name="outside">outside</paper-item>
                <paper-item item-name="off">off</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>
            <ha-icon
              class="ha-icon-large"
              icon="mdi:close"
              @click=${this._valueChanged}
              .value=${""}
              .configAttribute=${e}
              .configObject=${t.positions}
            ></ha-icon>
          </div>
        `):i.push(V`
          <div class="value">
            <paper-dropdown-menu
              label="${e}"
              @value-changed=${this._valueChanged}
              .configAttribute=${e}
              .configObject=${t.positions}
            >
              <paper-listbox slot="dropdown-content" .selected=${null}>
                <paper-item>inside</paper-item>
                <paper-item>outside</paper-item>
                <paper-item>off</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>
          </div>
        `);return i}_createPositionsElement(e){if(!this.hass)return V``;let t,i;return null===e?(t=this._options.appearance.options.positions,i=this._config):(t=this._options.entities.options.entities[e].options.positions,i=this._configArray[e]),V`
      <div class="category">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${t}
          .optionsTarget=${this._options.appearance.options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
            <div class="title">${t.name}</div>
            <ha-icon .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?V`
              ${this._createPositionsValues(e)}
            `:""}
      </div>
    `}_createValueElement(e){if(!this.hass)return V``;let t,i;return null!==e?(t=this._options.entities.options.entities[e].options.value,i=this._configArray[e]):(t=this._options.appearance.options.value,i=this._config),V`
      <div class="category" id="value">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${t}
          .optionsTarget=${this._options.appearance.options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
            <div class="title">${t.name}</div>
            <ha-icon .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?V`
              <div class="value">
                ${i.limit_value?V`
                      <ha-switch
                        checked
                        .configAttribute=${"limit_value"}
                        .configObject=${i}
                        .value=${!i.limit_value}
                        @change=${this._valueChanged}
                        >Limit Value</ha-switch
                      >
                    `:V`
                      <ha-switch
                        unchecked
                        .configObject=${i}
                        .configAttribute=${"limit_value"}
                        .value=${!i.limit_value}
                        @change=${this._valueChanged}
                        >Limit Value</ha-switch
                      >
                    `}
                ${i.complementary?V`
                      <ha-switch
                        checked
                        .configAttribute=${"complementary"}
                        .configObject=${i}
                        .value=${!i.complementary}
                        @change=${this._valueChanged}
                        >Complementary</ha-switch
                      >
                    `:V`
                      <ha-switch
                        unchecked
                        .configObject=${i}
                        .configAttribute=${"complementary"}
                        .value=${!i.complementary}
                        @change=${this._valueChanged}
                        >Complementary</ha-switch
                      >
                    `}
                <paper-input
                  class="value-number"
                  label="Decimal"
                  type="number"
                  .value="${i.decimal?i.decimal:""}"
                  editable
                  .configAttribute=${"decimal"}
                  .configObject=${i}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  class="value-number"
                  type="number"
                  label="Min"
                  .value="${i.min?i.min:""}"
                  editable
                  .configAttribute=${"min"}
                  .configObject=${i}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  class="value-number"
                  type="number"
                  label="Max"
                  .value="${i.max?i.max:""}"
                  editable
                  .configAttribute=${"max"}
                  .configObject=${i}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  class="value-number"
                  type="number"
                  label="Target"
                  .value="${i.target?i.target:""}"
                  editable
                  .configAttribute=${"target"}
                  .configObject=${i}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Unit of Measurement"
                  .value="${i.unit_of_measurement?i.unit_of_measurement:""}"
                  editable
                  .configAttribute=${"unit_of_measurement"}
                  .configObject=${i}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  label="Attribute"
                  .value="${i.attribute?i.attribute:""}"
                  editable
                  .configAttribute=${"attribute"}
                  .configObject=${i}
                  @value-changed=${this._valueChanged}
                ></paper-input>
              </div>
            `:""}
      </div>
    `}_updateAction(e){if(!this._config||!this.hass)return;const t=e.target,i=t.configObject,n=t.actionKey,a=t.actionAttribute;i&&n&&a&&(i[n]||(i[n]={}),""===t.value?delete i[n][a]:i[n][a]=t.value,0===Object.keys(i[n]).length&&delete i[n],this._config.entities=this._configArray,ve(this,"config-changed",{config:this._config}))}_toggleThing(e){const t=e.target.options,i=!t.show;if(e.target.optionsTarget)if(Array.isArray(e.target.optionsTarget))for(const t of e.target.optionsTarget)t.show=!1;else for(const[t]of Object.entries(e.target.optionsTarget))e.target.optionsTarget[t].show=!1;t.show=i,this._toggle=!this._toggle}_addEntity(e){if(!this._config||!this.hass)return;const t=e.target;let i;i=t.configAddObject?t.configAddObject:{[t.configAddValue]:""};const n=t.configArray.slice();n.push(i),this._config.entities=n,ve(this,"config-changed",{config:this._config})}_moveEntity(e){if(!this._config||!this.hass)return;const t=e.target;let i=t.configArray.slice();"up"==t.configDirection?i=ke(i,t.index,t.index-1):"down"==t.configDirection&&(i=ke(i,t.index,t.index+1)),this._config.entities=i,ve(this,"config-changed",{config:this._config})}_removeEntity(e){if(!this._config||!this.hass)return;const t=e.target,i=[];let n=0;for(const e of this._configArray)t.configIndex!==n&&i.push(e),n++;const a={[t.configArray]:i};this._config=Object.assign(this._config,a),ve(this,"config-changed",{config:this._config})}_addSeverity(e){if(!this._config||!this.hass)return;const t=e.target;let i;(i=null===t.index?this._config.severity:this._config.entities[t.index].severity)||(i=[]);const n=i.slice();n.push({from:"",to:"",color:""}),null===t.index?this._config.severity=n:this._configArray[t.index].severity=n,this._config.entities=this._configArray,ve(this,"config-changed",{config:this._config})}_moveSeverity(e){if(!this._config||!this.hass)return;const t=e.target;let i,n=(i=null===t.index?this._config.severity:this._config.entities[t.index].severity).slice();"up"==t.configDirection?n=ke(n,t.severityIndex,t.severityIndex-1):"down"==t.configDirection&&(n=ke(n,t.severityIndex,t.severityIndex+1)),null===t.index?this._config.severity=n:this._configArray[t.index].severity=n,this._config.entities=this._configArray,ve(this,"config-changed",{config:this._config})}_removeSeverity(e){if(!this._config||!this.hass)return;const t=e.target;let i;const n=(i=null===t.index?this._config.severity:this._configArray[t.index].severity).slice(),a=[];let o=0;for(const e of n)t.severityIndex!==o&&a.push(n[o]),o++;null===t.index?0===a.length?delete this._config.severity:this._config.severity=a:0===a.length?delete this._configArray[t.index].severity:this._configArray[t.index].severity=a,this._config.entities=this._configArray,ve(this,"config-changed",{config:this._config})}_updateSeverity(e){const t=e.target;let i;i=null===t.index?this._config.severity:this._configArray[t.index].severity;const n=[];for(const e in i)if(t.severityIndex==e){const a=Object.assign({},i[e]),o={[t.severityAttribute]:t.value},r=Object.assign(a,o);""==t.value&&delete r[t.severityAttribute],n.push(r)}else n.push(i[e]);null===t.index?this._config.severity=n:this._configArray[t.index].severity=n,this._config.entities=this._configArray,ve(this,"config-changed",{config:this._config})}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target;if(t.configObject[t.configAttribute]!=t.value){if(t.configAdd&&""!==t.value&&(t.configObject=Object.assign(t.configObject,{[t.configAdd]:{[t.configAttribute]:t.value}})),t.configAttribute&&t.configObject&&!t.configAdd)if(""==t.value||!1===t.value){if(1==t.ignoreNull)return;delete t.configObject[t.configAttribute]}else console.log(t.configObject),t.configObject[t.configAttribute]=t.value;this._config.entities=this._configArray,ve(this,"config-changed",{config:this._config})}}static get styles(){return le`
      .option {
        padding: 4px 0px;
        cursor: pointer;
      }
      .options {
        background: var(--primary-background-color);
        border-radius: var(--ha-card-border-radius);
        cursor: pointer;
        padding: 8px;
      }
      .sub-category {
        cursor: pointer;
      }
      .row {
        display: flex;
        margin-bottom: -14px;
        pointer-events: none;
        margin-top: 14px;
      }
      .title {
        padding-left: 16px;
        margin-top: -6px;
        pointer-events: none;
      }
      .secondary {
        padding-left: 40px;
        color: var(--secondary-text-color);
        pointer-events: none;
      }
      .value {
        padding: 0px 8px;
      }
      .value-container {
        padding: 0px 8px;
        transition: all 0.5s ease-in-out;
      }
      .value-container:target {
        height: 50px;
      }
      .value-number {
        width: 100px;
      }
      ha-fab {
        margin: 8px;
      }
      ha-switch {
        padding: 16px 0;
      }
      .card-background {
        background: var(--paper-card-background-color);
        border-radius: var(--ha-card-border-radius);
        padding: 8px;
      }
      .category {
        background: #0000;
      }
      .ha-icon-large {
        cursor: pointer;
        margin: 0px 4px;
      }
    `}};e([oe()],Ce.prototype,"hass",void 0),e([oe()],Ce.prototype,"_config",void 0),e([oe()],Ce.prototype,"_toggle",void 0),Ce=e([ie("bar-card-editor")],Ce),window.customCards=window.customCards||[],window.customCards.push({type:"bar-card",name:"Bar Card",preview:!1,description:"A customizable bar card."});const Ee="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;customElements.define("action-handler-bar",class extends HTMLElement{constructor(){super(),this.holdTime=500,this.ripple=document.createElement("mwc-ripple"),this.timer=void 0,this.held=!1,this.cooldownStart=!1,this.cooldownEnd=!1}connectedCallback(){Object.assign(this.style,{position:"absolute",width:Ee?"100px":"50px",height:Ee?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(e=>{document.addEventListener(e,()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0},{passive:!0})})}bind(e,t){if(e.actionHandler)return;e.actionHandler=!0,e.addEventListener("contextmenu",e=>{const t=e||window.event;t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.cancelBubble=!0,t.returnValue=!1});const i=e=>{if(this.cooldownStart)return;let t,i;this.held=!1,e.touches?(t=e.touches[0].pageX,i=e.touches[0].pageY):(t=e.pageX,i=e.pageY),this.timer=window.setTimeout(()=>{this.startAnimation(t,i),this.held=!0},this.holdTime),this.cooldownStart=!0,window.setTimeout(()=>this.cooldownStart=!1,100)},n=i=>{this.cooldownEnd||["touchend","touchcancel"].includes(i.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?ve(e,"action",{action:"hold"}):t.hasDoubleTap?1===i.detail||"keyup"===i.type?this.dblClickTimeout=window.setTimeout(()=>{ve(e,"action",{action:"tap"})},250):(clearTimeout(this.dblClickTimeout),ve(e,"action",{action:"double_tap"})):ve(e,"action",{action:"tap"}),this.cooldownEnd=!0,window.setTimeout(()=>this.cooldownEnd=!1,100))};e.addEventListener("touchstart",i,{passive:!0}),e.addEventListener("touchend",n),e.addEventListener("touchcancel",n),e.addEventListener("keyup",e=>{if(13===e.keyCode)return n(e)}),/iPhone OS 13_/.test(window.navigator.userAgent)||(e.addEventListener("mousedown",i,{passive:!0}),e.addEventListener("click",n))}startAnimation(e,t){Object.assign(this.style,{left:`${e}px`,top:`${t}px`,display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}});const Ne=(e,t)=>{const i=(()=>{const e=document.body;if(e.querySelector("action-handler-bar"))return e.querySelector("action-handler-bar");const t=document.createElement("action-handler-bar");return e.appendChild(t),t})();i&&i.bind(e,t)},Oe=(e=>(...i)=>{const n=e(...i);return t.set(n,!0),n})((e={})=>t=>{Ne(t.committer.element,e)});var je={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",entity_not_available:"Entity not available"},Pe={common:je},Te={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},Ve={common:Te},ze={en:Object.freeze({__proto__:null,common:je,default:Pe}),nb:Object.freeze({__proto__:null,common:Te,default:Ve})};function Ie(e,t="",i=""){const n=e.split(".")[0],a=e.split(".")[1],o=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");var r;try{r=ze[o][n][a]}catch(e){r=ze.en[n][a]}return void 0===r&&(r=ze.en[n][a]),""!==t&&""!==i&&(r=r.replace(t,i)),r}const Me=V`
  <style>
    .warning {
      display: block;
      color: black;
      background-color: #fce588;
      padding: 8px;
    }
    #states {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    #states > * {
      margin-bottom: 8px;
    }
    #states > :last-child {
      margin-top: 0px;
      margin-bottom: 0px;
    }
    #states > :first-child {
      margin-top: 0px;
    }
    ha-card {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    bar-card-row {
      display: flex;
      flex-grow: 1;
    }
    bar-card-row > div {
      flex-basis: 100%;
    }
    bar-card-row:empty {
      display: none;
    }
    bar-card-card {
      display: flex;
      flex-basis: 100%;
      flex-direction: row;
      margin-right: 8px;
    }
    bar-card-card:last-child {
      margin-right: 0px;
    }
    bar-card-background {
      cursor: pointer;
      flex-grow: 1;
      position: relative;
    }
    bar-card-iconbar {
      color: var(--icon-color, var(--paper-item-icon-color));
      align-items: center;
      align-self: center;
      display: flex;
      height: 40px;
      justify-content: center;
      position: relative;
      width: 40px;
    }
    bar-card-currentbar,
    bar-card-backgroundbar,
    bar-card-contentbar,
    bar-card-targetbar,
    bar-card-animationbar {
      position: absolute;
      height: 100%;
      width: 100%;
      border-radius: var(--bar-card-border-radius, var(--ha-card-border-radius));
    }
    bar-card-contentbar {
      align-items: center;
      color: var(--primary-text-color);
      display: flex;
      justify-content: flex-start;
    }
    .contentbar-direction-right {
      flex-direction: row;
    }
    .contentbar-direction-up {
      flex-direction: column;
    }
    bar-card-backgroundbar {
      background: var(--bar-color);
      filter: brightness(0.5);
      opacity: 0.25;
    }
    bar-card-currentbar {
      background: linear-gradient(
        to var(--bar-direction),
        var(--bar-color) var(--bar-percent),
        #0000 var(--bar-percent),
        #0000 var(--bar-percent)
      );
    }
    bar-card-targetbar {
      background: linear-gradient(
        to var(--bar-direction),
        #0000 var(--bar-percent),
        var(--bar-color) var(--bar-percent),
        var(--bar-color) var(--bar-target-percent),
        #0000 var(--bar-target-percent)
      );
      display: var(--target-display);
      filter: brightness(0.66);
      opacity: 0.33;
    }
    bar-card-markerbar {
      background: var(--bar-color);
      filter: brightness(0.75);
      opacity: 50%;
      position: absolute;
    }
    bar-card-animationbar {
      background-repeat: no-repeat;
      filter: brightness(0.75);
      opacity: 0%;
    }
    .animationbar-horizontal {
      background: linear-gradient(to var(--animation-direction), var(--bar-color) 0%, var(--bar-color) 1%, #0000 1%);
    }
    .animationbar-vertical {
      background: linear-gradient(to var(--animation-direction), #0000 0%, #0000 1%, var(--bar-color) 1%);
    }
    @keyframes animation-increase {
      0% {
        opacity: 50%;
        background-size: var(--bar-percent) 100%;
      }
      100% {
        opacity: 0%;
        background-size: 10000% 100%;
      }
    }
    @keyframes animation-decrease {
      0% {
        opacity: 0%;
        background-size: 10000%;
      }
      100% {
        opacity: 50%;
        background-size: var(--bar-percent);
      }
    }
    @keyframes animation-increase-vertical {
      0% {
        opacity: 50%;
        background-size: 100% var(--bar-percent);
      }
      100% {
        background-size: 100% 0%;
        opacity: 0%;
      }
    }
    @keyframes animation-decrease-vertical {
      0% {
        background-size: 100% 100%;
        opacity: 0%;
      }
      100% {
        opacity: 50%;
        background-size: 100% var(--bar-percent);
      }
    }
    bar-card-indicator {
      align-self: center;
      color: var(--bar-color);
      filter: brightness(0.75);
      height: 16px;
      width: 16px;
      position: relative;
      text-align: center;
    }
    .indicator-direction-right {
      margin-right: -16px;
      left: -6px;
    }
    .indicator-direction-up {
      margin: 4px;
    }
    bar-card-name {
      align-items: center;
      align-self: center;
      justify-content: center;
      margin: 4px;
      overflow: hidden;
      position: relative;
      text-align: left;
      text-overflow: ellipsis;
    }
    .name-outside {
      margin-left: 16px;
    }
    bar-card-value,
    bar-card-min,
    bar-card-max,
    bar-card-divider {
      align-self: center;
      position: relative;
    }
    bar-card-min,
    bar-card-max,
    bar-card-divider {
      font-size: 10px;
      margin: 2px;
      opacity: 0.5;
    }
    .min-direction-up {
      margin-top: auto;
    }
    .min-direction-right {
      margin-left: auto;
    }
    bar-card-divider {
      margin-left: 0px;
      margin-right: 0px;
    }
    bar-card-value {
      white-space: nowrap;
      margin: 4px;
    }
    .value-direction-right {
      margin-left: auto;
    }
    .value-direction-up {
      margin-top: auto;
    }
  </style>
`;console.info(`%c  BAR-CARD \n%c  ${Ie("common.version")} 3.1.7    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");let Re=class extends he{constructor(){super(...arguments),this._configArray=[],this._stateArray=[],this._animationState=[],this._rowAmount=1}static async getConfigElement(){return document.createElement("bar-card-editor")}static getStubConfig(){return{type:"custom:bar-card",entity:"sensor.example"}}shouldUpdate(e){return Se(this,e,!1)}setConfig(e){if(!e)throw new Error(Ie("common.invalid_configuration"));this._config=Ae({animation:{state:"off",speed:5},color:"var(--bar-card-color, var(--primary-color))",columns:1,direction:"right",max:100,min:0,positions:{icon:"outside",indicator:"outside",name:"inside",minmax:"off",value:"inside"}},e),"horizontal"==this._config.stack&&(this._config.columns=this._config.entities.length),this._configArray=function(e){const t=[];if(e.entities){for(const i of e.entities)if("string"==typeof i){const n=Ae({},e);delete n.entities;const a=Ae(n,{entity:i});t.push(a)}else if("object"==typeof i){const n=Ae({},e);delete n.entities;const a=Ae(n,i);t.push(a)}}else t.push(e);return t}(this._config),this._rowAmount=this._configArray.length/this._config.columns}render(){return this._config&&this.hass?V`
      <ha-card
        .header=${this._config.title?this._config.title:null}
        style="${this._config.entity_row?"background: #0000; box-shadow: none;":""}"
      >
        <div
          id="states"
          class="card-content"
          style="${this._config.entity_row?"padding: 0px;":""} ${"up"==this._config.direction?"":"flex-grow: 0;"}"
        >
          ${this._createBarArray()}
        </div>
      </ha-card>
      ${Me}
    `:V``}_createBarArray(){const e=[];for(let t=0;t<this._configArray.length;t++)(e.length+1)*this._config.columns==t&&e.push(this._config.columns),this._configArray.length==t+1&&e.push(this._configArray.length-e.length*this._config.columns);const t=[];for(let i=0;i<e.length;i++){const n=[];for(let t=0;t<e[i];t++){const e=i*this._config.columns+t,a=this._configArray[e],o=this.hass.states[a.entity];if(!o){n.push(V`
            <div class="warning" style="margin-bottom: 8px;">
              ${Ie("common.entity_not_available")}: ${a.entity}
            </div>
          `);continue}let r;if(r=a.attribute?o.attributes[a.attribute]:o.state,a.severity&&this._computeSeverityVisibility(r,e))continue;const s=this._computeConfigNumber(a.min,0),c=this._computeConfigNumber(a.max,100);a.limit_value&&(r=Math.min(r,c),r=Math.max(r,s)),isNaN(Number(r))||(0==a.decimal?r=Number(r).toFixed(0):a.decimal&&(r=Number(r).toFixed(a.decimal)));let l=40;a.height&&(l=a.height);let d,h,p,u="stretch",g="0px 0px 0px 13px",m="right",f="row",v="left",b="height: 100%; width: 2px;";switch(a.direction){case"right":m="right",v="left";break;case"up":g="0px",m="top",f="column-reverse",v="bottom",b="height: 2px; width: 100%;"}switch(p=this._computeSeverityIcon(r,e)?this._computeSeverityIcon(r,e):a.icon?a.icon:o.attributes.icon?o.attributes.icon:_e(me(a.entity),r),a.positions.icon){case"outside":d=V`
              <bar-card-iconbar>
                <ha-icon icon="${p}"></ha-icon>
              </bar-card-iconbar>
            `;break;case"inside":h=V`
              <bar-card-iconbar>
                <ha-icon icon="${p}"></ha-icon>
              </bar-card-iconbar>
            `,g="0px";break;case"off":g="0px"}const _=a.name?a.name:o.attributes.friendly_name;let y,$,w,x,A,S,k;switch(a.positions.name){case"outside":y=V`
              <bar-card-name
                class="${a.entity_row?"name-outside":""}"
                style="${"up"==a.direction?"":a.width?`width: calc(100% - ${a.width});`:""}"
                >${_}</bar-card-name
              >
            `,g="0px";break;case"inside":$=V`
              <bar-card-name>${_}</bar-card-name>
            `}switch(w=isNaN(Number(r))?"":a.unit_of_measurement?a.unit_of_measurement:o.attributes.unit_of_measurement,a.positions.minmax){case"outside":x=V`
              <bar-card-min>${s}${w}</bar-card-min>
              <bar-card-divider>/</bar-card-divider>
              <bar-card-max>${c}${w}</bar-card-max>
            `;break;case"inside":A=V`
              <bar-card-min class="${"up"==a.direction?"min-direction-up":"min-direction-right"}"
                >${s}${w}</bar-card-min
              >
              <bar-card-divider>/</bar-card-divider>
              <bar-card-max> ${c}${w}</bar-card-max>
            `}switch(a.positions.value){case"outside":S=V`
              <bar-card-value class="${"up"==a.direction?"value-direction-up":"value-direction-right"}"
                >${a.complementary?c-r:r} ${w}</bar-card-value
              >
            `;break;case"inside":k=V`
              <bar-card-value
                class="${"inside"==a.positions.minmax?"":"up"==a.direction?"value-direction-up":"value-direction-right"}"
                >${a.complementary?c-r:r} ${w}</bar-card-value
              >
            `;break;case"off":g="0px"}let C="";r>this._stateArray[e]?(C="▲","up"==a.direction?this._animationState[e]="animation-increase-vertical":this._animationState[e]="animation-increase"):r<this._stateArray[e]?(C="▼","up"==a.direction?this._animationState[e]="animation-decrease-vertical":this._animationState[e]="animation-decrease"):this._animationState[e]=this._animationState[e],isNaN(Number(r))&&(C="");const E=this._computeBarColor(r,e);let N,O;switch(a.positions.indicator){case"outside":N=V`
              <bar-card-indicator
                class="${"up"==a.direction?"":"indicator-direction-right"}"
                style="--bar-color: ${E};"
                >${C}</bar-card-indicator
              >
            `;break;case"inside":O=V`
              <bar-card-indicator style="--bar-color: ${E};">${C}</bar-card-indicator>
            `}const j=this._computePercent(r,e),P=this._computePercent(a.target,e);let T=j,z=this._computePercent(a.target,e);z<T&&(T=z,z=j);let I="";a.width&&(u="center",I=`width: ${a.width}`);const M=this._animationState[e];let R="right",U=100*j,L="animationbar-horizontal";"animation-increase-vertical"!=M&&"animation-decrease-vertical"!=M||(R="bottom",L="animationbar-vertical",U=100*(100-j)),n.push(V`
          <bar-card-card
            style="flex-direction: ${f}; align-items: ${u};"
            @action=${this._handleAction}
            .config=${a}
            .actionHandler=${Oe({hasHold:xe(a.hold_action),hasDoubleClick:xe(a.double_tap_action)})}
          >
            ${d} ${N} ${y}
            <bar-card-background
              style="margin: ${g}; height: ${l}${"number"==typeof l?"px":""}; ${I}"
            >
              <bar-card-backgroundbar style="--bar-color: ${E};"></bar-card-backgroundbar>
              ${"on"==a.animation.state?V`
                    <bar-card-animationbar
                      style="animation: ${M} ${a.animation.speed}s infinite ease-out; --bar-percent: ${U}%; --bar-color: ${E}; --animation-direction: ${R};"
                      class="${L}"
                    ></bar-card-animationbar>
                  `:""}
              <bar-card-currentbar
                style="--bar-color: ${E}; --bar-percent: ${j}%; --bar-direction: ${m}"
              ></bar-card-currentbar>
              ${a.target?V`
                    <bar-card-targetbar
                      style="--bar-color: ${E}; --bar-percent: ${T}%; --bar-target-percent: ${z}%; --bar-direction: ${m};"
                    ></bar-card-targetbar>
                    <bar-card-markerbar
                      style="--bar-color: ${E}; --bar-target-percent: ${P}%; ${v}: calc(${P}% - 1px); ${b}}"
                    ></bar-card-markerbar>
                  `:""}
              <bar-card-contentbar
                class="${"up"==a.direction?"contentbar-direction-up":"contentbar-direction-right"}"
              >
                ${h} ${O} ${$} ${A} ${k}
              </bar-card-contentbar>
            </bar-card-background>
            ${x} ${S}
          </bar-card-card>
        `),r!==this._stateArray[e]&&(this._stateArray[e]=r)}t.push(n)}let i="column";(this._config.columns||this._config.stack)&&(i="row");const n=[];for(const e of t)n.push(V`
        <bar-card-row style="flex-direction: ${i};">${e}</bar-card-row>
      `);return n}_computeBarColor(e,t){const i=this._configArray[t];let n;return n=i.severity?this._computeSeverityColor(e,t):"unavailable"==e?`var(--bar-card-disabled-color, ${i.color})`:i.color}_computeSeverityColor(e,t){const i=this._configArray[t],n=Number(e),a=i.severity;let o;return isNaN(n)?a.forEach(t=>{e==t.text&&(o=t.color)}):a.forEach(e=>{n>=e.from&&n<=e.to&&(o=e.color)}),null==o&&(o=i.color),o}_computeSeverityVisibility(e,t){const i=this._configArray[t],n=Number(e),a=i.severity;let o=!1;return isNaN(n)?a.forEach(t=>{e==t.text&&(o=t.hide)}):a.forEach(e=>{n>=e.from&&n<=e.to&&(o=e.hide)}),o}_computeSeverityIcon(e,t){const i=this._configArray[t],n=Number(e),a=i.severity;let o=!1;return!!a&&(isNaN(n)?a.forEach(t=>{e==t.text&&(o=t.icon)}):a.forEach(e=>{n>=e.from&&n<=e.to&&(o=e.icon)}),o)}_computePercent(e,t){const i=this._configArray[t],n=Number(e),a=this._computeConfigNumber(i.min,0),o=this._computeConfigNumber(i.max,100);if("unavailable"==e)return 0;if(isNaN(n))return 100;if(o==a)return 0;switch(i.direction){case"right-reverse":case"left-reverse":case"up-reverse":case"down-reverse":return 100-100*(n-a)/(o-a);default:return 100*(n-a)/(o-a)}}_computeConfigNumber(e,t){const i=e=>{if("number"==typeof e)return e;if("string"==typeof e){const t=e.trim();return""==t?NaN:Number.parseFloat(t)}return NaN},n=i(e);if(!isNaN(n))return n;const a=(e,t)=>{if(!this.hass||!this.hass.states[e])return NaN;const n=this.hass.states[e],a=t?n.attributes[t]:n.state;return i(a)};if("string"==typeof e){const t=a(e);if(!isNaN(t))return t}if(e&&"object"==typeof e){const t=e;if(t.entity){const e=a(t.entity,t.attribute);if(!isNaN(e))return e}}return t}_handleAction(e){this.hass&&e.target.config&&e.detail.action&&function(e,t,i,n){var a;"double_tap"===n&&i.double_tap_action?a=i.double_tap_action:"hold"===n&&i.hold_action?a=i.hold_action:"tap"===n&&i.tap_action&&(a=i.tap_action),we(e,t,i,a)}(this,this.hass,e.target.config,e.detail.action)}getCardSize(){if(this._config.height){const e=this._config.height.toString();return Math.trunc(Number(e.replace("px",""))/50*this._rowAmount)+1}return this._rowAmount+1}};e([oe()],Re.prototype,"hass",void 0),e([oe()],Re.prototype,"_config",void 0),e([oe()],Re.prototype,"_configArray",void 0),Re=e([ie("bar-card")],Re);export{Re as BarCard};
