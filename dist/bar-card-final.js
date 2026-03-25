function e(e,t,i,n){var r,o=arguments.length,s=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o<3?r(s):o>3?r(t,i,s):r(t,i))||s);return o>3&&s&&Object.defineProperty(t,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=new WeakMap,i=e=>"function"==typeof e&&t.has(e),n=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,r=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},o={},s={},a=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${a}--\x3e`,l=new RegExp(`${a}|${c}`),d="$lit$";class h{constructor(e,t){this.parts=[],this.element=t;const i=[],n=[],r=document.createTreeWalker(t.content,133,null,!1);let o=0,s=-1,c=0;const{strings:h,values:{length:u}}=e;for(;c<u;){const e=r.nextNode();if(null!==e){if(s++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let n=0;for(let e=0;e<i;e++)p(t[e].name,d)&&n++;for(;n-- >0;){const t=h[c],i=m.exec(t)[2],n=i.toLowerCase()+d,r=e.getAttribute(n);e.removeAttribute(n);const o=r.split(l);this.parts.push({type:"attribute",index:s,name:i,strings:o}),c+=o.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),r.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(a)>=0){const n=e.parentNode,r=t.split(l),o=r.length-1;for(let t=0;t<o;t++){let i,o=r[t];if(""===o)i=g();else{const e=m.exec(o);null!==e&&p(e[2],d)&&(o=o.slice(0,e.index)+e[1]+e[2].slice(0,-d.length)+e[3]),i=document.createTextNode(o)}n.insertBefore(i,e),this.parts.push({type:"node",index:++s})}""===r[o]?(n.insertBefore(g(),e),i.push(e)):e.data=r[o],c+=o}}else if(8===e.nodeType)if(e.data===a){const t=e.parentNode;null!==e.previousSibling&&s!==o||(s++,t.insertBefore(g(),e)),o=s,this.parts.push({type:"node",index:s}),null===e.nextSibling?e.data="":(i.push(e),s--),c++}else{let t=-1;for(;-1!==(t=e.data.indexOf(a,t+1));)this.parts.push({type:"node",index:-1}),c++}}else r.currentNode=n.pop()}for(const e of i)e.parentNode.removeChild(e)}}const p=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},u=e=>-1!==e.index,g=()=>document.createComment(""),m=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class f{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=n?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,r=document.createTreeWalker(e,133,null,!1);let o,s=0,a=0,c=r.nextNode();for(;s<i.length;)if(o=i[s],u(o)){for(;a<o.index;)a++,"TEMPLATE"===c.nodeName&&(t.push(c),r.currentNode=c.content),null===(c=r.nextNode())&&(r.currentNode=t.pop(),c=r.nextNode());if("node"===o.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,o.name,o.strings,this.options));s++}else this.__parts.push(void 0),s++;return n&&(document.adoptNode(e),customElements.upgrade(e)),e}}const v=` ${a} `;class y{constructor(e,t,i,n){this.strings=e,this.values=t,this.type=i,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let n=0;n<e;n++){const e=this.strings[n],r=e.lastIndexOf("\x3c!--");i=(r>-1||i)&&-1===e.indexOf("--\x3e",r+1);const o=m.exec(e);t+=null===o?e+(i?v:c):e.substr(0,o.index)+o[1]+o[2]+d+o[3]+a}return t+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}const _=e=>null===e||!("object"==typeof e||"function"==typeof e),b=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class x{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new $(this)}_getValue(){const e=this.strings,t=e.length-1;let i="";for(let n=0;n<t;n++){i+=e[n];const t=this.parts[n];if(void 0!==t){const e=t.value;if(_(e)||!b(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class ${constructor(e){this.value=void 0,this.committer=e}setValue(e){e===o||_(e)&&e===this.value||(this.value=e,i(e)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const e=this.value;this.value=o,e(this)}this.value!==o&&this.committer.commit()}}class w{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(g()),this.endNode=e.appendChild(g())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=g()),e.__insert(this.endNode=g())}insertAfterPart(e){e.__insert(this.startNode=g()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=o,e(this)}const e=this.__pendingValue;e!==o&&(_(e)?e!==this.value&&this.__commitText(e):e instanceof y?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):b(e)?this.__commitIterable(e):e===s?(this.value=s,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof f&&this.value.template===t)this.value.update(e.values);else{const i=new f(t,e.processor,this.options),n=i._clone();i.update(e.values),this.__commitNode(n),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,n=0;for(const r of e)void 0===(i=t[n])&&(i=new w(this.options),t.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(t[n-1])),i.setValue(r),i.commit(),n++;n<t.length&&(t.length=n,this.clear(i&&i.endNode))}clear(e=this.startNode){r(this.startNode.parentNode,e.nextSibling,this.endNode)}}class S{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=o,e(this)}if(this.__pendingValue===o)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=o}}class k extends x{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new A(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class A extends ${}let C=!1;try{const e={get capture(){return C=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class E{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=o,e(this)}if(this.__pendingValue===o)return;const e=this.__pendingValue,t=this.value,n=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),r=null!=e&&(null==t||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=T(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=o}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const T=e=>e&&(C?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);const N=new class{handleAttributeExpressions(e,t,i,n){const r=t[0];if("."===r){return new k(e,t.slice(1),i).parts}return"@"===r?[new E(e,t.slice(1),n.eventContext)]:"?"===r?[new S(e,t.slice(1),i)]:new x(e,t,i).parts}handleTextExpression(e){return new w(e)}};function P(e){let t=O.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},O.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const n=e.strings.join(a);return void 0===(i=t.keyString.get(n))&&(i=new h(e,e.getTemplateElement()),t.keyString.set(n,i)),t.stringsArray.set(e.strings,i),i}const O=new Map,j=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const V=(e,...t)=>new y(e,t,"html",N),I=133;function z(e,t){const{element:{content:i},parts:n}=e,r=document.createTreeWalker(i,I,null,!1);let o=U(n),s=n[o],a=-1,c=0;const l=[];let d=null;for(;r.nextNode();){a++;const e=r.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(l.push(e),null===d&&(d=e)),null!==d&&c++;void 0!==s&&s.index===a;)s.index=null!==d?-1:s.index-c,s=n[o=U(n,o)]}l.forEach(e=>e.parentNode.removeChild(e))}const M=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,I,null,!1);for(;i.nextNode();)t++;return t},U=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(u(t))return i}return-1};const H=(e,t)=>`${e}--${t}`;let R=!0;void 0===window.ShadyCSS?R=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),R=!1);const F=e=>t=>{const i=H(t.type,e);let n=O.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},O.set(i,n));let r=n.stringsArray.get(t.strings);if(void 0!==r)return r;const o=t.strings.join(a);if(void 0===(r=n.keyString.get(o))){const i=t.getTemplateElement();R&&window.ShadyCSS.prepareTemplateDom(i,e),r=new h(t,i),n.keyString.set(o,r)}return n.stringsArray.set(t.strings,r),r},L=["html","svg"],B=new Set,D=(e,t,i)=>{B.add(e);const n=i?i.element:document.createElement("template"),r=t.querySelectorAll("style"),{length:o}=r;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(n,e);const s=document.createElement("style");for(let e=0;e<o;e++){const t=r[e];t.parentNode.removeChild(t),s.textContent+=t.textContent}(e=>{L.forEach(t=>{const i=O.get(H(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),z(e,i)})})})(e);const a=n.content;i?function(e,t,i=null){const{element:{content:n},parts:r}=e;if(null==i)return void n.appendChild(t);const o=document.createTreeWalker(n,I,null,!1);let s=U(r),a=0,c=-1;for(;o.nextNode();){for(c++,o.currentNode===i&&(a=M(t),i.parentNode.insertBefore(t,i));-1!==s&&r[s].index===c;){if(a>0){for(;-1!==s;)r[s].index+=a,s=U(r,s);return}s=U(r,s)}}}(i,s,a.firstChild):a.insertBefore(s,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,e);const c=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)t.insertBefore(c.cloneNode(!0),t.firstChild);else if(i){a.insertBefore(s,a.firstChild);const e=new Set;e.add(s),z(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const q={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},W=(e,t)=>t!==e&&(t==t||e==e),J={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:W},K=Promise.resolve(!0),Y=1,X=4,G=8,Q=16,Z=32,ee="finalized";class te extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=K,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const n=this._attributeNameForProperty(i,t);void 0!==n&&(this._attributeToPropertyMap.set(n,i),e.push(n))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=J){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`;Object.defineProperty(this.prototype,e,{get(){return this[i]},set(t){const n=this[e];this[i]=t,this._requestUpdate(e,n)},configurable:!0,enumerable:!0})}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(ee)||e.finalize(),this[ee]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=W){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,n=t.converter||q,r="function"==typeof n?n:n.fromAttribute;return r?r(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,n=t.converter;return(n&&n.toAttribute||q.toAttribute)(e,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Z,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=J){const n=this.constructor,r=n._attributeNameForProperty(e,i);if(void 0!==r){const e=n._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=this._updateState|G,null==e?this.removeAttribute(r):this.setAttribute(r,e),this._updateState=this._updateState&~G}}_attributeToProperty(e,t){if(this._updateState&G)return;const i=this.constructor,n=i._attributeToPropertyMap.get(e);if(void 0!==n){const e=i._classProperties.get(n)||J;this._updateState=this._updateState|Q,this[n]=i._propertyValueFromAttribute(t,e),this._updateState=this._updateState&~Q}}_requestUpdate(e,t){let i=!0;if(void 0!==e){const n=this.constructor,r=n._classProperties.get(e)||J;n._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||this._updateState&Q||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){let e,t;this._updateState=this._updateState|X;const i=this._updatePromise;this._updatePromise=new Promise((i,n)=>{e=i,t=n});try{await i}catch(e){}this._hasConnected||await new Promise(e=>this._hasConnectedResolver=e);try{const e=this.performUpdate();null!=e&&await e}catch(e){t(e)}e(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Z}get _hasRequestedUpdate(){return this._updateState&X}get hasUpdated(){return this._updateState&Y}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{(e=this.shouldUpdate(t))&&this.update(t)}catch(t){throw e=!1,t}finally{this._markUpdated()}e&&(this._updateState&Y||(this._updateState=this._updateState|Y,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~X}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0)}updated(e){}firstUpdated(e){}}te[ee]=!0;const ie=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:n}=t;return{kind:i,elements:n,finisher(t){window.customElements.define(e,t)}}})(e,t),ne=(e,t)=>"method"!==t.kind||!t.descriptor||"value"in t.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}}:Object.assign({},t,{finisher(i){i.createProperty(t.key,e)}}),re=(e,t,i)=>{t.constructor.createProperty(i,e)};function oe(e){return(t,i)=>void 0!==i?re(e,t,i):ne(e,t)}const se="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ae=Symbol();class ce{constructor(e,t){if(t!==ae)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(se?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const le=(e,...t)=>{const i=t.reduce((t,i,n)=>t+(e=>{if(e instanceof ce)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[n+1],e[0]);return new ce(i,ae)};(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const de=e=>e.flat?e.flat(1/0):function e(t,i=[]){for(let n=0,r=t.length;n<r;n++){const r=t[n];Array.isArray(r)?e(r,i):i.push(r)}return i}(e);class he extends te{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const e=this.styles,t=[];if(Array.isArray(e)){de(e).reduceRight((e,t)=>(e.add(t),e),new Set).forEach(e=>t.unshift(e))}else e&&t.push(e);return t}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?se?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){super.update(e);const t=this.render();t instanceof y&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){}}var pe,ue,ge;function me(e){return e.substr(0,e.indexOf("."))}he.finalized=!0,he.render=(e,t,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,o=j.has(t),s=R&&11===t.nodeType&&!!t.host,a=s&&!B.has(n),c=a?document.createDocumentFragment():t;if(((e,t,i)=>{let n=j.get(t);void 0===n&&(r(t,t.firstChild),j.set(t,n=new w(Object.assign({templateFactory:P},i))),n.appendInto(t)),n.setValue(e),n.commit()})(e,c,Object.assign({templateFactory:F(n)},i)),a){const e=j.get(c);j.delete(c);const i=e.value instanceof f?e.value.template:void 0;D(n,c,i),r(t,t.firstChild),t.appendChild(c),j.set(t,e)}!o&&s&&window.ShadyCSS.styleElement(t.host)},(ge=pe||(pe={})).language="language",ge.system="system",ge.comma_decimal="comma_decimal",ge.decimal_comma="decimal_comma",ge.space_comma="space_comma",ge.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(ue||(ue={}));var fe=["closed","locked","off"],ve=function(e,t,i,n){n=n||{},i=null==i?{}:i;var r=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return r.detail=i,e.dispatchEvent(r),r},ye={alert:"mdi:alert",automation:"mdi:playlist-play",calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:google-pages",script:"mdi:file-document",sensor:"mdi:eye",simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weblink:"mdi:open-in-new"};function _e(e,t){if(e in ye)return ye[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"mdi:bell-plus";case"armed_night":return"mdi:bell-sleep";case"disarmed":return"mdi:bell-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:bell"}case"binary_sensor":return t&&"off"===t?"mdi:radiobox-blank":"mdi:checkbox-marked-circle";case"cover":return"closed"===t?"mdi:window-closed":"mdi:window-open";case"lock":return t&&"unlocked"===t?"mdi:lock-open":"mdi:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"mdi:cast-connected":"mdi:cast";case"zwave":switch(t){case"dead":return"mdi:emoticon-dead";case"sleeping":return"mdi:sleep";case"initializing":return"mdi:timer-sand";default:return"mdi:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),"mdi:bookmark"}}var be=function(e){ve(window,"haptic",e)},xe=function(e,t){return function(e,t,i){void 0===i&&(i=!0);var n,r=me(t),o="group"===r?"homeassistant":r;switch(r){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}return e.callService(o,n,{entity_id:t})}(e,t,fe.includes(e.states[t].state))},$e=function(e,t,i,n){if(n||(n={action:"more-info"}),!n.confirmation||n.confirmation.exemptions&&n.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(be("warning"),confirm(n.confirmation.text||"Are you sure you want to "+n.action+"?")))switch(n.action){case"more-info":(i.entity||i.camera_image)&&ve(e,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":n.navigation_path&&function(e,t,i){void 0===i&&(i=!1),i?history.replaceState(null,"",t):history.pushState(null,"",t),ve(window,"location-changed",{replace:i})}(0,n.navigation_path);break;case"url":n.url_path&&window.open(n.url_path);break;case"toggle":i.entity&&(xe(t,i.entity),be("success"));break;case"call-service":if(!n.service)return void be("failure");var r=n.service.split(".",2);t.callService(r[0],r[1],n.service_data,n.target),be("success");break;case"fire-dom-event":ve(e,"ll-custom",n)}};function we(e){return void 0!==e&&"none"!==e.action}function Se(...e){const t=e=>e&&"object"==typeof e;return e.reduce((e,i)=>(Object.keys(i).forEach(n=>{const r=e[n],o=i[n];Array.isArray(r)&&Array.isArray(o)?e[n]=r.concat(...o):t(r)&&t(o)?e[n]=Se(r,o):e[n]=o}),e),{})}function ke(e,t,i){if(t.has("config")||i)return!0;const n=["entity","min","max","target"];for(const i of e._configArray){const r=t.get("hass");if(!r)return!0;for(const t of n){const n=i[t],o=n&&"object"==typeof n&&n.entity?n.entity:n;if("string"==typeof o&&r.states[o]!==e.hass.states[o])return!0}}return!1}function Ae(e,t,i){const n=e[t],r=e.slice();return r.splice(t,1),r.splice(i,0,n),r}let Ce=class extends he{constructor(){super(...arguments),this._config={},this._configArray=[],this._entityOptionsArray=[]}shouldUpdate(e){return ke(this,e,!0)}setConfig(e){this._config=Object.assign({},e),this._configArray=[],this._entityOptionsArray=[],e.entity||e.entities||(this._config.entity="none"),this._config.entity&&(this._configArray.push({entity:e.entity}),this._config.entities=[{entity:e.entity}],delete this._config.entity),this._configArray=function(e){const t=[];if(e.entities){for(const i of e.entities)if("string"==typeof i){const e=Se({},{entity:i});t.push(e)}else if("object"==typeof i){const e=Se({},i);t.push(e)}}else t.push(e);return t}(this._config),this._config.animation&&0===Object.entries(this._config.animation).length&&(delete this._config.animation,this._emitConfigChanged()),this._config.positions&&0===Object.entries(this._config.positions).length&&(delete this._config.positions,this._emitConfigChanged());for(const e of this._configArray)e.animation&&0===Object.entries(e.animation).length&&delete e.animation,e.positions&&0===Object.entries(e.positions).length&&delete e.positions;this._config.entities=this._configArray,this._emitConfigChanged();const t={icon:"format-list-numbered",name:"Bar",secondary:"Bar settings.",show:!1},i={icon:"numeric",name:"Value",secondary:"Value settings.",show:!1},n={icon:"arrow-expand-horizontal",name:"Positions",secondary:"Set positions of card elements.",show:!1},r={icon:"gesture-tap",name:"Actions",secondary:"Configure tap, hold and double tap actions.",show:!1},o={icon:"exclamation-thick",name:"Severity",secondary:"Define bar colors based on value.",show:!1},s={icon:"animation",name:"Animation",secondary:"Define animation settings.",show:!1},a={show:!1,options:{positions:Object.assign({},n),bar:Object.assign({},t),value:Object.assign({},i),severity:Object.assign({},o),actions:Object.assign({},r),animation:Object.assign({},s)}};this._configArray.forEach(()=>{this._entityOptionsArray.push(Object.assign({},a))}),this._options={entities:{icon:"tune",name:"Entities",secondary:"Manage card entities.",show:!0,options:{entities:this._entityOptionsArray}},appearance:{icon:"palette",name:"Appearance",secondary:"Customize the global name, icon, etc.",show:!1,options:{positions:n,bar:t,value:i,card:{icon:"card-bulleted",name:"Card",secondary:"Card settings.",show:!1},severity:o,animation:s,actions:r}}}}render(){return V`
      <div class="editor-shell">${this._createEntitiesElement()} ${this._createAppearanceElement()}</div>
    `}_emitConfigChanged(){ve(this,"config-changed",{config:this._config})}_getEntityHint(e){if(!this.hass||!e.entity)return"Choose an entity id to configure bar-specific settings.";const t=this.hass.states[e.entity];return t?`${t.attributes.friendly_name||e.entity}: ${t.state}`:"Entity not found in Home Assistant yet. Verify the entity id."}_renderHelperText(e){return V`
      <div class="helper-text">${e}</div>
    `}_renderEmptyState(e,t){return V`
      <div class="empty-state">
        <div class="empty-title">${e}</div>
        <div class="empty-description">${t}</div>
      </div>
    `}_toInputValue(e){return null==e?"":String(e)}_renderConfigInput(e,t,i,n,r="text",o){return V`
      <div class="editor-field">
        <label class="select-label">${e}</label>
        <input
          class="editor-input"
          .value=${this._toInputValue(n)}
          type=${r}
          .configObject=${t}
          .configAttribute=${i}
          .configAdd=${o}
          @input=${this._valueChanged}
        />
      </div>
    `}_renderSeverityInput(e,t,i,n,r,o="text"){return V`
      <div class="editor-field">
        <label class="select-label">${e}</label>
        <input
          class="editor-input"
          .value=${this._toInputValue(r)}
          type=${o}
          .severityAttribute=${t}
          .index=${i}
          .severityIndex=${n}
          @input=${this._updateSeverity}
        />
      </div>
    `}_renderChoiceField(e,t,i,n,r,o=!1,s){return V`
      <div class="editor-field">
        <label class="select-label">${e}</label>
        <div class="choice-group">
          ${t.map(e=>V`
              <button
                class="choice-button ${String(i||"")===e.value?"selected":""}"
                type="button"
                .value=${e.value}
                .configObject=${n}
                .configAttribute=${r}
                .configAdd=${s}
                .ignoreNull=${o}
                @click=${this._valueChanged}
              >
                ${e.label}
              </button>
            `)}
        </div>
      </div>
    `}_renderAddButton(e,t,i,n){return V`
      <button class="add-button" type="button" @click=${i} .index=${n}>
        <ha-icon .icon=${t}></ha-icon>
        <span>${e}</span>
      </button>
    `}_renderToggleField(e,t,i){const n=!!t[i];return V`
      <div class="toggle-card">
        <ha-formfield .label=${e}>
          <ha-switch
            ?checked=${n}
            .configAttribute=${i}
            .configObject=${t}
            .value=${!n}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>
      </div>
    `}_renderChevron(e){return V`
      <ha-icon class="chevron" .icon=${e?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
    `}_renderFieldAction(e,t){const i=t[e.key]?t[e.key].action:"";return V`
      <div class="field-card action-card">
        <div class="action-stack">
          <div class="editor-field">
            <label class="select-label">${e.label} Action</label>
            <div class="choice-group">
              ${[{label:"None",value:""},{label:"Info",value:"more-info"},{label:"Toggle",value:"toggle"},{label:"Navigate",value:"navigate"},{label:"URL",value:"url"},{label:"Service",value:"call-service"}].map(n=>V`
                  <button
                    class="choice-button ${i===n.value?"selected":""}"
                    type="button"
                    .value=${n.value}
                    .configObject=${t}
                    .actionKey=${e.key}
                    .actionAttribute=${"action"}
                    @click=${this._updateAction}
                  >
                    ${n.label}
                  </button>
                `)}
            </div>
          </div>
          ${t[e.key]?V`
                <ha-icon
                  class="ha-icon-large clear-icon"
                  icon="mdi:close"
                  @click=${this._updateAction}
                  .value=${""}
                  .configObject=${t}
                  .actionKey=${e.key}
                  .actionAttribute=${"action"}
                ></ha-icon>
              `:V`
                <span class="action-spacer"></span>
              `}
        </div>
        ${t[e.key]&&"navigate"===t[e.key].action?V`
              <div class="editor-field">
                <label class="select-label">${e.label} Navigation Path</label>
                <input
                  class="editor-input"
                  .value=${this._toInputValue(t[e.key].navigation_path)}
                  .configObject=${t}
                  .actionKey=${e.key}
                  .actionAttribute=${"navigation_path"}
                  @input=${this._updateAction}
                />
              </div>
            `:""}
        ${t[e.key]&&"url"===t[e.key].action?V`
              <div class="editor-field">
                <label class="select-label">${e.label} URL</label>
                <input
                  class="editor-input"
                  .value=${this._toInputValue(t[e.key].url_path)}
                  .configObject=${t}
                  .actionKey=${e.key}
                  .actionAttribute=${"url_path"}
                  @input=${this._updateAction}
                />
              </div>
            `:""}
        ${t[e.key]&&"call-service"===t[e.key].action?V`
              <div class="editor-field">
                <label class="select-label">${e.label} Service</label>
                <input
                  class="editor-input"
                  .value=${this._toInputValue(t[e.key].service)}
                  .configObject=${t}
                  .actionKey=${e.key}
                  .actionAttribute=${"service"}
                  @input=${this._updateAction}
                />
              </div>
            `:""}
      </div>
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
            ${this._renderChevron(i.show)}
          </div>
          <div class="secondary">${i.secondary}</div>
        </div>
        ${i.show?V`
              <div class="value">
                ${this._renderHelperText("Actions inherit Home Assistant behavior. Leave them empty to keep defaults.")}
                ${[{key:"tap_action",label:"Tap"},{key:"hold_action",label:"Hold"},{key:"double_tap_action",label:"Double Tap"}].map(e=>this._renderFieldAction(e,t))}
              </div>
            `:""}
      </div>
    `}_createEntitiesValues(){if(!this.hass||!this._config)return[V``];const e=this._options.entities,t=this._config.entities||this._configArray,i=[];for(const n of this._configArray){const r=this._configArray.indexOf(n);i.push(V`
        <div class="sub-category entity-row field-card entity-card">
          <div class="entity-toggle">
            <div
              class="entity-meta-toggle"
              @click=${this._toggleThing}
              .options=${e.options.entities[r]}
              .optionsTarget=${e.options.entities}
              .index=${r}
            >
              settings
            </div>
            <ha-icon
              icon="mdi:chevron-${e.options.entities[r].show?"up":"down"}"
              @click=${this._toggleThing}
              class="chevron entity-chevron"
              .options=${e.options.entities[r]}
              .optionsTarget=${e.options.entities}
              .index=${r}
            ></ha-icon>
          </div>
          <div class="value entity-main-field">
            ${this._renderConfigInput("Entity",this._configArray[r],"entity",n.entity)}
            ${this._renderHelperText(this._getEntityHint(n))}
          </div>
          <div class="stack-actions icon-group">
            ${0!==r?V`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-up"
                    @click=${this._moveEntity}
                    .configDirection=${"up"}
                    .configArray=${t}
                    .arrayAttribute=${"entities"}
                    .arraySource=${this._config}
                    .index=${r}
                  ></ha-icon>
                `:V`
                  <ha-icon icon="mdi:arrow-up" class="ha-icon-large muted-icon"></ha-icon>
                `}
            ${r!==this._configArray.length-1?V`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-down"
                    @click=${this._moveEntity}
                    .configDirection=${"down"}
                    .configArray=${t}
                    .arrayAttribute=${"entities"}
                    .arraySource=${this._config}
                    .index=${r}
                  ></ha-icon>
                `:V`
                  <ha-icon icon="mdi:arrow-down" class="ha-icon-large muted-icon"></ha-icon>
                `}
            <ha-icon
              class="ha-icon-large"
              icon="mdi:close"
              @click=${this._removeEntity}
              .configAttribute=${"entity"}
              .configArray=${"entities"}
              .configIndex=${r}
            ></ha-icon>
          </div>
        </div>
        ${e.options.entities[r].show?V`
              <div class="options nested-options">
                ${this._createBarElement(r)} ${this._createValueElement(r)}
                ${this._createPositionsElement(r)} ${this._createSeverityElement(r)}
                ${this._createAnimationElement(r)} ${this._createActionsElement(r)}
              </div>
            `:""}
      `)}return i}_createEntitiesElement(){if(!this.hass||!this._config)return V``;const e=this._options.entities;return V`
      <div class="card-config">
        <div class="option" @click=${this._toggleThing} .options=${e} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
            <div class="title">${e.name}</div>
            ${this._renderChevron(e.show)}
          </div>
          <div class="secondary">${e.secondary}</div>
        </div>
        ${e.show?V`
              <div class="card-background section-scroll">
                ${this._configArray.length>0?this._createEntitiesValues():this._renderEmptyState("No entities yet","Add your first entity to start configuring bars.")}
                <div class="sub-category add-row">
                  <button
                    class="add-button"
                    type="button"
                    @click=${this._addEntity}
                    .configArray=${this._configArray}
                    .configAddValue=${"entity"}
                    .sourceArray=${this._config.entities}
                  >
                    <ha-icon .icon=${"mdi:plus"}></ha-icon>
                    <span>Add entity</span>
                  </button>
                </div>
              </div>
            `:""}
      </div>
    `}_createAppearanceElement(){if(!this.hass)return V``;const e=this._options.appearance;return V`
      <div class="card-config">
        <div class="option" @click=${this._toggleThing} .options=${e} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
            <div class="title">${e.name}</div>
            ${this._renderChevron(e.show)}
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
      </div>
    `}_createBarElement(e){let t,i;return null!==e?(t=this._options.entities.options.entities[e].options.bar,i=this._configArray[e]):(t=this._options.appearance.options.bar,i=this._config),V`
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
            ${this._renderChevron(t.show)}
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?V`
              <div class="value">
                ${this._renderHelperText("Use CSS values like 40px, 100%, or theme colors to fine-tune the bar.")}
                ${this._renderChoiceField("Direction",[{label:"Right",value:"right"},{label:"Up",value:"up"}],i.direction||"right",i,"direction",!0)}
                ${null!==e?this._renderConfigInput("Name",i,"name",i.name):""}
                ${this._renderConfigInput("Icon",i,"icon",i.icon)}
                ${this._renderConfigInput("Height",i,"height",i.height)}
                ${this._renderConfigInput("Width",i,"width",i.width)}
                ${this._renderConfigInput("Color",i,"color",i.color)}
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
            ${this._renderChevron(t.show)}
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?i.animation?V`
                <div class="value">
                  ${this._renderHelperText("Animation can be turned on globally or per entity. Speed is in seconds.")}
                  ${this._renderChoiceField("State",[{label:"On",value:"on"},{label:"Off",value:"off"}],i.animation.state||"off",i.animation,"state",!0)}
                  ${this._renderConfigInput("Speed",i.animation,"speed",i.animation.speed)}
                </div>
              `:V`
                <div class="value">
                  ${this._renderHelperText("Set a state to create the animation block, then fine-tune the speed.")}
                  ${this._renderChoiceField("State",[{label:"On",value:"on"},{label:"Off",value:"off"}],"",i,"state",!0,"animation")}
                  ${this._renderConfigInput("Speed",i,"speed","","text","animation")}
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
            ${this._renderChevron(t.show)}
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?V`
              <div class="card-background section-scroll severity-scroll">
                ${n>0?V`
                      ${this._createSeverityValues(e)}
                    `:this._renderEmptyState("No severity rules","Add ranges to map values to colors, icons, or hide rules.")}
                <div class="sub-category add-row">
                  ${this._renderAddButton("Add severity rule","mdi:plus",this._addSeverity,e)}
                </div>
              </div>
            `:""}
      </div>
    `}_createSeverityValues(e){let t;t=null===e?this._config:this._configArray[e];const i=[];for(const n of t.severity){const r=t.severity.indexOf(n);i.push(V`
        <div class="sub-category severity-row field-card">
          <div class="value severity-fields">
            <div class="inline-fields">
              ${this._renderSeverityInput("From","from",e,r,n.from,"number")}
              ${this._renderSeverityInput("To","to",e,r,n.to,"number")}
            </div>
            <div class="inline-fields">
              ${this._renderSeverityInput("Color","color",e,r,n.color)}
              ${this._renderSeverityInput("Icon","icon",e,r,n.icon)}
            </div>
            <div class="toggle-card compact-toggle">
              <ha-formfield label="Hide">
                <ha-switch
                  ?checked=${!!n.hide}
                  .severityAttribute=${"hide"}
                  .index=${e}
                  .severityIndex=${r}
                  .value=${!n.hide}
                  @change=${this._updateSeverity}
                ></ha-switch>
              </ha-formfield>
            </div>
          </div>
          <div class="stack-actions icon-group">
            ${0!==r?V`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-up"
                    @click=${this._moveSeverity}
                    .configDirection=${"up"}
                    .index=${e}
                    .severityIndex=${r}
                  ></ha-icon>
                `:V`
                  <ha-icon icon="mdi:arrow-up" class="ha-icon-large muted-icon"></ha-icon>
                `}
            ${r!==t.severity.length-1?V`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-down"
                    @click=${this._moveSeverity}
                    .configDirection=${"down"}
                    .index=${e}
                    .severityIndex=${r}
                  ></ha-icon>
                `:V`
                  <ha-icon icon="mdi:arrow-down" class="ha-icon-large muted-icon"></ha-icon>
                `}
            <ha-icon
              class="ha-icon-large"
              icon="mdi:close"
              @click=${this._removeSeverity}
              .index=${e}
              .severityIndex=${r}
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
            ${this._renderChevron(t.show)}
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?V`
              <div class="value-container">
                ${this._renderHelperText("Card-level settings apply to the whole stack and work best when shared across entities.")}
                ${this._renderConfigInput("Header Title",e,"title",e.title)}
                ${this._renderConfigInput("Columns",e,"columns",e.columns,"number")}
                ${this._renderChoiceField("Stack",[{label:"None",value:""},{label:"Horizontal",value:"horizontal"}],e.stack,e,"stack")}
                <div class="toggle-grid">
                  ${this._renderToggleField("Entity Row",e,"entity_row")}
                  ${this._renderToggleField("Entity Config",e,"entity_config")}
                </div>
              </div>
            `:""}
      </div>
    `}_createPositionsValues(e){let t;(t=null===e?this._config:this._configArray[e]).positions=Object.assign({},t.positions);const i=[],n=Object.keys({icon:"outside",indicator:"outside",name:"inside",minmax:"off",value:"inside"});for(const e of n)t.positions[e]?i.push(V`
          <div class="value field-card compact-field-card">
            ${this._renderChoiceField(e,[{label:"Inside",value:"inside"},{label:"Outside",value:"outside"},{label:"Off",value:"off"}],t.positions[e],t.positions,e,!0)}
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
          <div class="value field-card compact-field-card">
            ${this._renderChoiceField(e,[{label:"Default",value:""},{label:"Inside",value:"inside"},{label:"Outside",value:"outside"},{label:"Off",value:"off"}],"",t.positions,e)}
          </div>
        `);return i}_createPositionsElement(e){if(!this.hass)return V``;let t;return t=null===e?this._options.appearance.options.positions:this._options.entities.options.entities[e].options.positions,V`
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
            ${this._renderChevron(t.show)}
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?V`
              <div class="positions-grid">${this._createPositionsValues(e)}</div>
              ${this._renderHelperText("For advanced combinations, YAML still supports values beyond these quick presets.")}
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
            ${this._renderChevron(t.show)}
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?V`
              <div class="value">
                ${this._renderHelperText("Min, max, and target support simple numbers here. Use YAML for entity-driven objects.")}
                <div class="toggle-grid">
                  ${this._renderToggleField("Limit Value",i,"limit_value")}
                  ${this._renderToggleField("Complementary",i,"complementary")}
                </div>
                ${this._renderConfigInput("Decimal",i,"decimal",i.decimal,"number")}
                ${this._renderConfigInput("Min",i,"min",i.min,"number")}
                ${this._renderConfigInput("Max",i,"max",i.max,"number")}
                ${this._renderConfigInput("Target",i,"target",i.target,"number")}
                ${this._renderConfigInput("Unit of Measurement",i,"unit_of_measurement",i.unit_of_measurement)}
                ${this._renderConfigInput("Attribute",i,"attribute",i.attribute)}
              </div>
            `:""}
      </div>
    `}_updateAction(e){if(!this._config||!this.hass)return;const t=e.currentTarget||e.target,i=t.configObject,n=t.actionKey,r=t.actionAttribute;i&&n&&r&&(i[n]||(i[n]={}),""===t.value?delete i[n][r]:i[n][r]=t.value,0===Object.keys(i[n]).length&&delete i[n],this._config.entities=this._configArray,this._emitConfigChanged())}_toggleThing(e){const t=e.currentTarget||e.target,i=t.options,n=!i.show;if(t.optionsTarget)if(Array.isArray(t.optionsTarget))for(const e of t.optionsTarget)e.show=!1;else for(const[e]of Object.entries(t.optionsTarget))t.optionsTarget[e].show=!1;i.show=n,this._toggle=!this._toggle}_addEntity(e){if(!this._config||!this.hass)return;const t=e.currentTarget||e.target;let i;i=t.configAddObject?t.configAddObject:{[t.configAddValue]:""};const n=t.configArray.slice();n.push(i),this._config.entities=n,this._emitConfigChanged()}_moveEntity(e){if(!this._config||!this.hass)return;const t=e.currentTarget||e.target;let i=t.configArray.slice();"up"==t.configDirection?i=Ae(i,t.index,t.index-1):"down"==t.configDirection&&(i=Ae(i,t.index,t.index+1)),this._config.entities=i,this._emitConfigChanged()}_removeEntity(e){if(!this._config||!this.hass)return;const t=e.currentTarget||e.target,i=[];let n=0;for(const e of this._configArray)t.configIndex!==n&&i.push(e),n++;const r={[t.configArray]:i};this._config=Object.assign(this._config,r),this._emitConfigChanged()}_addSeverity(e){if(!this._config||!this.hass)return;const t=e.currentTarget||e.target;let i;(i=null===t.index?this._config.severity:this._config.entities?this._config.entities[t.index].severity:void 0)||(i=[]);const n=i.slice();n.push({from:"",to:"",color:""}),null===t.index?this._config.severity=n:this._configArray[t.index].severity=n,this._config.entities=this._configArray,this._emitConfigChanged()}_moveSeverity(e){if(!this._config||!this.hass)return;const t=e.currentTarget||e.target;let i;if(!(i=null===t.index?this._config.severity:this._config.entities?this._config.entities[t.index].severity:void 0))return;let n=i.slice();"up"==t.configDirection?n=Ae(n,t.severityIndex,t.severityIndex-1):"down"==t.configDirection&&(n=Ae(n,t.severityIndex,t.severityIndex+1)),null===t.index?this._config.severity=n:this._configArray[t.index].severity=n,this._config.entities=this._configArray,this._emitConfigChanged()}_removeSeverity(e){if(!this._config||!this.hass)return;const t=e.currentTarget||e.target;let i;const n=(i=null===t.index?this._config.severity:this._configArray[t.index].severity).slice(),r=[];let o=0;for(const e of n)t.severityIndex!==o&&r.push(e),o++;null===t.index?0===r.length?delete this._config.severity:this._config.severity=r:0===r.length?delete this._configArray[t.index].severity:this._configArray[t.index].severity=r,this._config.entities=this._configArray,this._emitConfigChanged()}_updateSeverity(e){const t=e.currentTarget||e.target;let i;i=null===t.index?this._config.severity:this._configArray[t.index].severity;const n=[];for(const e in i)if(t.severityIndex==e){const r=Object.assign({},i[e]),o={[t.severityAttribute]:t.value},s=Object.assign(r,o);""==t.value&&delete s[t.severityAttribute],n.push(s)}else n.push(i[e]);null===t.index?this._config.severity=n:this._configArray[t.index].severity=n,this._config.entities=this._configArray,this._emitConfigChanged()}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.currentTarget||e.target;if(t.configObject[t.configAttribute]!=t.value){if(t.configAdd&&""!==t.value&&(t.configObject=Object.assign(t.configObject,{[t.configAdd]:{[t.configAttribute]:t.value}})),t.configAttribute&&t.configObject&&!t.configAdd)if(""==t.value||!1===t.value){if(1==t.ignoreNull)return;delete t.configObject[t.configAttribute]}else t.configObject[t.configAttribute]=t.value;this._config.entities=this._configArray,this._emitConfigChanged()}}static get styles(){return le`
      .editor-shell {
        display: grid;
        gap: 16px;
      }
      .option {
        padding: 14px 16px;
        cursor: pointer;
        border-radius: 14px;
        background: var(--ha-card-background, var(--paper-card-background-color));
        border: 1px solid var(--divider-color);
        box-shadow: var(--ha-card-box-shadow, none);
      }
      .options {
        background: var(--primary-background-color);
        border-radius: 14px;
        padding: 12px;
        margin-top: 10px;
      }
      .sub-category {
        cursor: pointer;
        border-radius: 12px;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 12px;
        pointer-events: none;
      }
      .chevron {
        margin-left: auto;
      }
      .title {
        font-weight: 600;
        pointer-events: none;
      }
      .secondary {
        padding-left: 36px;
        color: var(--secondary-text-color);
        margin-top: 4px;
        pointer-events: none;
      }
      .value {
        padding: 10px 8px 2px;
        display: grid;
        gap: 10px;
      }
      .value-container {
        padding: 10px 8px 2px;
        display: grid;
        gap: 10px;
      }
      .value-number {
        max-width: 160px;
      }
      ha-fab {
        margin: 8px;
      }
      ha-switch {
        padding: 6px 0;
      }
      .card-background {
        background: var(--ha-card-background, var(--paper-card-background-color));
        border-radius: 16px;
        padding: 12px;
        border: 1px solid var(--divider-color);
        margin-top: 10px;
      }
      .category {
        background: #0000;
        margin-top: 8px;
      }
      .ha-icon-large {
        cursor: pointer;
        margin: 0px 4px;
      }
      .editor-select {
        width: 100%;
        box-sizing: border-box;
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        color: var(--primary-text-color);
        padding: 8px;
        margin: 6px 0 0;
      }
      .editor-input {
        width: 100%;
        box-sizing: border-box;
        background: var(--card-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 10px;
        color: var(--primary-text-color);
        padding: 10px 12px;
        font: inherit;
      }
      .editor-field {
        display: grid;
        gap: 6px;
        min-width: 0;
      }
      .choice-group {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .choice-button {
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
        border-radius: 999px;
        padding: 8px 12px;
        font: inherit;
        cursor: pointer;
      }
      .choice-button.selected {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .select-label {
        display: block;
        color: var(--secondary-text-color);
        font-size: 12px;
        margin-bottom: 4px;
      }
      .helper-text {
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.45;
      }
      .empty-state {
        padding: 18px 16px;
        border: 1px dashed var(--divider-color);
        border-radius: 12px;
        text-align: center;
        color: var(--secondary-text-color);
      }
      .empty-title {
        color: var(--primary-text-color);
        font-weight: 600;
        margin-bottom: 4px;
      }
      .empty-description {
        font-size: 13px;
        line-height: 1.45;
      }
      .card-config {
        display: block;
      }
      .nested-options {
        margin: 10px 0 0 12px;
      }
      .field-card {
        background: color-mix(
          in srgb,
          var(--secondary-background-color, var(--primary-background-color)) 78%,
          transparent
        );
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        padding: 12px;
      }
      .entity-card,
      .severity-row,
      .action-card {
        margin-bottom: 10px;
      }
      .entity-row,
      .severity-row {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: 10px;
        padding: 8px 0;
      }
      .entity-toggle {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 32px;
      }
      .entity-meta-toggle {
        font-size: 10px;
        line-height: 1;
        opacity: 0.6;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin-bottom: 4px;
      }
      .entity-main-field {
        min-width: 0;
      }
      .action-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(160px, 220px) auto;
        align-items: end;
        gap: 8px;
      }
      .action-spacer {
        width: 24px;
        height: 24px;
      }
      .action-stack {
        display: grid;
        gap: 10px;
      }
      .clear-icon {
        align-self: end;
      }
      .positions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 8px 12px;
      }
      .inline-fields {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }
      .stack-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .icon-group {
        gap: 4px;
        padding-left: 8px;
        border-left: 1px solid var(--divider-color);
      }
      .toggle-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 10px;
      }
      .toggle-card {
        padding: 10px 12px;
        border-radius: 12px;
        background: color-mix(in srgb, var(--primary-background-color) 70%, transparent);
        border: 1px solid var(--divider-color);
      }
      .compact-toggle {
        max-width: 140px;
      }
      .severity-fields {
        padding: 0;
      }
      .compact-field-card {
        padding: 10px;
      }
      .muted-icon {
        opacity: 0.25;
      }
      .add-row {
        display: flex;
        justify-content: flex-end;
      }
      .section-scroll {
        max-height: 420px;
        overflow: auto;
      }
      .severity-scroll {
        max-height: 460px;
      }
      .add-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: 1px solid var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 16%, transparent);
        color: var(--primary-text-color);
        border-radius: 999px;
        padding: 10px 14px;
        font: inherit;
        cursor: pointer;
      }
      @media (max-width: 600px) {
        .entity-row,
        .severity-row,
        .action-row {
          grid-template-columns: 1fr;
        }
        .entity-toggle,
        .stack-actions {
          justify-self: start;
          align-items: flex-start;
        }
        .inline-fields {
          grid-template-columns: 1fr;
        }
        .icon-group {
          border-left: 0;
          padding-left: 0;
        }
      }
    `}};e([oe()],Ce.prototype,"hass",void 0),e([oe()],Ce.prototype,"_config",void 0),e([oe()],Ce.prototype,"_toggle",void 0),Ce=e([ie("bar-card-editor")],Ce),window.customCards=window.customCards||[],window.customCards.push({type:"bar-card",name:"Bar Card",preview:!1,description:"A customizable bar card."});const Ee="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;customElements.define("action-handler-bar",class extends HTMLElement{constructor(){super(),this.holdTime=500,this.ripple=document.createElement("mwc-ripple"),this.timer=void 0,this.held=!1,this.cooldownStart=!1,this.cooldownEnd=!1}connectedCallback(){Object.assign(this.style,{position:"absolute",width:Ee?"100px":"50px",height:Ee?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(e=>{document.addEventListener(e,()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0},{passive:!0})})}bind(e,t){if(e.actionHandler)return;e.actionHandler=!0,e.addEventListener("contextmenu",e=>{const t=e||window.event;t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.cancelBubble=!0,t.returnValue=!1});const i=e=>{if(this.cooldownStart)return;let t,i;this.held=!1,e.touches?(t=e.touches[0].pageX,i=e.touches[0].pageY):(t=e.pageX,i=e.pageY),this.timer=window.setTimeout(()=>{this.startAnimation(t,i),this.held=!0},this.holdTime),this.cooldownStart=!0,window.setTimeout(()=>this.cooldownStart=!1,100)},n=i=>{this.cooldownEnd||["touchend","touchcancel"].includes(i.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?ve(e,"action",{action:"hold"}):t.hasDoubleTap?1===i.detail||"keyup"===i.type?this.dblClickTimeout=window.setTimeout(()=>{ve(e,"action",{action:"tap"})},250):(clearTimeout(this.dblClickTimeout),ve(e,"action",{action:"double_tap"})):ve(e,"action",{action:"tap"}),this.cooldownEnd=!0,window.setTimeout(()=>this.cooldownEnd=!1,100))};e.addEventListener("touchstart",i,{passive:!0}),e.addEventListener("touchend",n),e.addEventListener("touchcancel",n),e.addEventListener("keyup",e=>{if(13===e.keyCode)return n(e)}),/iPhone OS 13_/.test(window.navigator.userAgent)||(e.addEventListener("mousedown",i,{passive:!0}),e.addEventListener("click",n))}startAnimation(e,t){Object.assign(this.style,{left:`${e}px`,top:`${t}px`,display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}});const Te=(e,t)=>{const i=(()=>{const e=document.body;if(e.querySelector("action-handler-bar"))return e.querySelector("action-handler-bar");const t=document.createElement("action-handler-bar");return e.appendChild(t),t})();i&&i.bind(e,t)},Ne=(e=>(...i)=>{const n=e(...i);return t.set(n,!0),n})((e={})=>t=>{Te(t.committer.element,e)});var Pe={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",entity_not_available:"Entity not available"},Oe={common:Pe},je={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},Ve={common:je},Ie={en:Object.freeze({__proto__:null,common:Pe,default:Oe}),nb:Object.freeze({__proto__:null,common:je,default:Ve})};function ze(e,t="",i=""){const n=e.split(".")[0],r=e.split(".")[1],o=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");var s;try{s=Ie[o][n][r]}catch(e){s=Ie.en[n][r]}return void 0===s&&(s=Ie.en[n][r]),""!==t&&""!==i&&(s=s.replace(t,i)),s}const Me=V`
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
`;console.info(`%c  BAR-CARD \n%c  ${ze("common.version")} 3.1.7    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");let Ue=class extends he{constructor(){super(...arguments),this._configArray=[],this._stateArray=[],this._animationState=[],this._rowAmount=1}static async getConfigElement(){return document.createElement("bar-card-editor")}static getStubConfig(){return{type:"custom:bar-card",entity:"sensor.example"}}shouldUpdate(e){return ke(this,e,!1)}setConfig(e){if(!e)throw new Error(ze("common.invalid_configuration"));this._config=Se({animation:{state:"off",speed:5},color:"var(--bar-card-color, var(--primary-color))",columns:1,direction:"right",max:100,min:0,positions:{icon:"outside",indicator:"outside",name:"inside",minmax:"off",value:"inside"}},e),"horizontal"==this._config.stack&&(this._config.columns=this._config.entities.length),this._configArray=function(e){const t=[];if(e.entities){for(const i of e.entities)if("string"==typeof i){const n=Se({},e);delete n.entities;const r=Se(n,{entity:i});t.push(r)}else if("object"==typeof i){const n=Se({},e);delete n.entities;const r=Se(n,i);t.push(r)}}else t.push(e);return t}(this._config),this._rowAmount=this._configArray.length/this._config.columns}render(){return this._config&&this.hass?V`
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
    `:V``}_createBarArray(){const e=[];for(let t=0;t<this._configArray.length;t++)(e.length+1)*this._config.columns==t&&e.push(this._config.columns),this._configArray.length==t+1&&e.push(this._configArray.length-e.length*this._config.columns);const t=[];for(let i=0;i<e.length;i++){const n=[];for(let t=0;t<e[i];t++){const e=i*this._config.columns+t,r=this._configArray[e],o=this.hass.states[r.entity];if(!o){n.push(V`
            <div class="warning" style="margin-bottom: 8px;">
              ${ze("common.entity_not_available")}: ${r.entity}
            </div>
          `);continue}let s;if(s=r.attribute?o.attributes[r.attribute]:o.state,r.severity&&this._computeSeverityVisibility(s,e))continue;const a=this._computeConfigNumber(r.min,0),c=this._computeConfigNumber(r.max,100);r.limit_value&&(s=Math.min(s,c),s=Math.max(s,a)),isNaN(Number(s))||(0==r.decimal?s=Number(s).toFixed(0):r.decimal&&(s=Number(s).toFixed(r.decimal)));let l=40;r.height&&(l=r.height);let d,h,p,u="stretch",g="0px 0px 0px 13px",m="right",f="row",v="left",y="height: 100%; width: 2px;";switch(r.direction){case"right":m="right",v="left";break;case"up":g="0px",m="top",f="column-reverse",v="bottom",y="height: 2px; width: 100%;"}switch(p=this._computeSeverityIcon(s,e)?this._computeSeverityIcon(s,e):r.icon?r.icon:o.attributes.icon?o.attributes.icon:_e(me(r.entity),s),r.positions.icon){case"outside":d=V`
              <bar-card-iconbar>
                <ha-icon icon="${p}"></ha-icon>
              </bar-card-iconbar>
            `;break;case"inside":h=V`
              <bar-card-iconbar>
                <ha-icon icon="${p}"></ha-icon>
              </bar-card-iconbar>
            `,g="0px";break;case"off":g="0px"}const _=r.name?r.name:o.attributes.friendly_name;let b,x,$,w,S,k,A;switch(r.positions.name){case"outside":b=V`
              <bar-card-name
                class="${r.entity_row?"name-outside":""}"
                style="${"up"==r.direction?"":r.width?`width: calc(100% - ${r.width});`:""}"
                >${_}</bar-card-name
              >
            `,g="0px";break;case"inside":x=V`
              <bar-card-name>${_}</bar-card-name>
            `}switch($=isNaN(Number(s))?"":r.unit_of_measurement?r.unit_of_measurement:o.attributes.unit_of_measurement,r.positions.minmax){case"outside":w=V`
              <bar-card-min>${a}${$}</bar-card-min>
              <bar-card-divider>/</bar-card-divider>
              <bar-card-max>${c}${$}</bar-card-max>
            `;break;case"inside":S=V`
              <bar-card-min class="${"up"==r.direction?"min-direction-up":"min-direction-right"}"
                >${a}${$}</bar-card-min
              >
              <bar-card-divider>/</bar-card-divider>
              <bar-card-max> ${c}${$}</bar-card-max>
            `}switch(r.positions.value){case"outside":k=V`
              <bar-card-value class="${"up"==r.direction?"value-direction-up":"value-direction-right"}"
                >${r.complementary?c-s:s} ${$}</bar-card-value
              >
            `;break;case"inside":A=V`
              <bar-card-value
                class="${"inside"==r.positions.minmax?"":"up"==r.direction?"value-direction-up":"value-direction-right"}"
                >${r.complementary?c-s:s} ${$}</bar-card-value
              >
            `;break;case"off":g="0px"}let C="";s>this._stateArray[e]?(C="▲","up"==r.direction?this._animationState[e]="animation-increase-vertical":this._animationState[e]="animation-increase"):s<this._stateArray[e]?(C="▼","up"==r.direction?this._animationState[e]="animation-decrease-vertical":this._animationState[e]="animation-decrease"):this._animationState[e]=this._animationState[e],isNaN(Number(s))&&(C="");const E=this._computeBarColor(s,e);let T,N;switch(r.positions.indicator){case"outside":T=V`
              <bar-card-indicator
                class="${"up"==r.direction?"":"indicator-direction-right"}"
                style="--bar-color: ${E};"
                >${C}</bar-card-indicator
              >
            `;break;case"inside":N=V`
              <bar-card-indicator style="--bar-color: ${E};">${C}</bar-card-indicator>
            `}const P=this._computePercent(s,e),O=this._computePercent(r.target,e);let j=P,I=this._computePercent(r.target,e);I<j&&(j=I,I=P);let z="";r.width&&(u="center",z=`width: ${r.width}`);const M=this._animationState[e];let U="right",H=100*P,R="animationbar-horizontal";"animation-increase-vertical"!=M&&"animation-decrease-vertical"!=M||(U="bottom",R="animationbar-vertical",H=100*(100-P)),n.push(V`
          <bar-card-card
            style="flex-direction: ${f}; align-items: ${u};"
            @action=${this._handleAction}
            .config=${r}
            .actionHandler=${Ne({hasHold:we(r.hold_action),hasDoubleClick:we(r.double_tap_action)})}
          >
            ${d} ${T} ${b}
            <bar-card-background
              style="margin: ${g}; height: ${l}${"number"==typeof l?"px":""}; ${z}"
            >
              <bar-card-backgroundbar style="--bar-color: ${E};"></bar-card-backgroundbar>
              ${"on"==r.animation.state?V`
                    <bar-card-animationbar
                      style="animation: ${M} ${r.animation.speed}s infinite ease-out; --bar-percent: ${H}%; --bar-color: ${E}; --animation-direction: ${U};"
                      class="${R}"
                    ></bar-card-animationbar>
                  `:""}
              <bar-card-currentbar
                style="--bar-color: ${E}; --bar-percent: ${P}%; --bar-direction: ${m}"
              ></bar-card-currentbar>
              ${r.target?V`
                    <bar-card-targetbar
                      style="--bar-color: ${E}; --bar-percent: ${j}%; --bar-target-percent: ${I}%; --bar-direction: ${m};"
                    ></bar-card-targetbar>
                    <bar-card-markerbar
                      style="--bar-color: ${E}; --bar-target-percent: ${O}%; ${v}: calc(${O}% - 1px); ${y}}"
                    ></bar-card-markerbar>
                  `:""}
              <bar-card-contentbar
                class="${"up"==r.direction?"contentbar-direction-up":"contentbar-direction-right"}"
              >
                ${h} ${N} ${x} ${S} ${A}
              </bar-card-contentbar>
            </bar-card-background>
            ${w} ${k}
          </bar-card-card>
        `),s!==this._stateArray[e]&&(this._stateArray[e]=s)}t.push(n)}let i="column";(this._config.columns||this._config.stack)&&(i="row");const n=[];for(const e of t)n.push(V`
        <bar-card-row style="flex-direction: ${i};">${e}</bar-card-row>
      `);return n}_computeBarColor(e,t){const i=this._configArray[t];let n;return n=i.severity?this._computeSeverityColor(e,t):"unavailable"==e?`var(--bar-card-disabled-color, ${i.color})`:i.color}_computeSeverityColor(e,t){const i=this._configArray[t],n=Number(e),r=i.severity;let o;return isNaN(n)?r.forEach(t=>{e==t.text&&(o=t.color)}):r.forEach(e=>{n>=e.from&&n<=e.to&&(o=e.color)}),null==o&&(o=i.color),o}_computeSeverityVisibility(e,t){const i=this._configArray[t],n=Number(e),r=i.severity;let o=!1;return isNaN(n)?r.forEach(t=>{e==t.text&&(o=t.hide)}):r.forEach(e=>{n>=e.from&&n<=e.to&&(o=e.hide)}),o}_computeSeverityIcon(e,t){const i=this._configArray[t],n=Number(e),r=i.severity;let o=!1;return!!r&&(isNaN(n)?r.forEach(t=>{e==t.text&&(o=t.icon)}):r.forEach(e=>{n>=e.from&&n<=e.to&&(o=e.icon)}),o)}_computePercent(e,t){const i=this._configArray[t],n=Number(e),r=this._computeConfigNumber(i.min,0),o=this._computeConfigNumber(i.max,100);if("unavailable"==e)return 0;if(isNaN(n))return 100;if(o==r)return 0;switch(i.direction){case"right-reverse":case"left-reverse":case"up-reverse":case"down-reverse":return 100-100*(n-r)/(o-r);default:return 100*(n-r)/(o-r)}}_computeConfigNumber(e,t){const i=e=>{if("number"==typeof e)return e;if("string"==typeof e){const t=e.trim();return""==t?NaN:Number.parseFloat(t)}return NaN},n=i(e);if(!isNaN(n))return n;const r=(e,t)=>{if(!this.hass||!this.hass.states[e])return NaN;const n=this.hass.states[e],r=t?n.attributes[t]:n.state;return i(r)};if("string"==typeof e){const t=r(e);if(!isNaN(t))return t}if(e&&"object"==typeof e){const t=e;if(t.entity){const e=r(t.entity,t.attribute);if(!isNaN(e))return e}}return t}_handleAction(e){this.hass&&e.target.config&&e.detail.action&&function(e,t,i,n){var r;"double_tap"===n&&i.double_tap_action?r=i.double_tap_action:"hold"===n&&i.hold_action?r=i.hold_action:"tap"===n&&i.tap_action&&(r=i.tap_action),$e(e,t,i,r)}(this,this.hass,e.target.config,e.detail.action)}getCardSize(){if(this._config.height){const e=this._config.height.toString();return Math.trunc(Number(e.replace("px",""))/50*this._rowAmount)+1}return this._rowAmount+1}};e([oe()],Ue.prototype,"hass",void 0),e([oe()],Ue.prototype,"_config",void 0),e([oe()],Ue.prototype,"_configArray",void 0),Ue=e([ie("bar-card")],Ue);export{Ue as BarCard};
