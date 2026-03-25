function t(t,e,i,n){var r,s=arguments.length,o=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(s<3?r(o):s>3?r(e,i,o):r(e,i))||o);return s>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=new WeakMap,i=t=>"function"==typeof t&&e.has(t),n=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,r=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},s={},o={},a=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${a}--\x3e`,d=new RegExp(`${a}|${c}`),l="$lit$";class h{constructor(t,e){this.parts=[],this.element=e;const i=[],n=[],r=document.createTreeWalker(e.content,133,null,!1);let s=0,o=-1,c=0;const{strings:h,values:{length:p}}=t;for(;c<p;){const t=r.nextNode();if(null!==t){if(o++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let n=0;for(let t=0;t<i;t++)u(e[t].name,l)&&n++;for(;n-- >0;){const e=h[c],i=g.exec(e)[2],n=i.toLowerCase()+l,r=t.getAttribute(n);t.removeAttribute(n);const s=r.split(d);this.parts.push({type:"attribute",index:o,name:i,strings:s}),c+=s.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),r.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(a)>=0){const n=t.parentNode,r=e.split(d),s=r.length-1;for(let e=0;e<s;e++){let i,s=r[e];if(""===s)i=m();else{const t=g.exec(s);null!==t&&u(t[2],l)&&(s=s.slice(0,t.index)+t[1]+t[2].slice(0,-l.length)+t[3]),i=document.createTextNode(s)}n.insertBefore(i,t),this.parts.push({type:"node",index:++o})}""===r[s]?(n.insertBefore(m(),t),i.push(t)):t.data=r[s],c+=s}}else if(8===t.nodeType)if(t.data===a){const e=t.parentNode;null!==t.previousSibling&&o!==s||(o++,e.insertBefore(m(),t)),s=o,this.parts.push({type:"node",index:o}),null===t.nextSibling?t.data="":(i.push(t),o--),c++}else{let e=-1;for(;-1!==(e=t.data.indexOf(a,e+1));)this.parts.push({type:"node",index:-1}),c++}}else r.currentNode=n.pop()}for(const t of i)t.parentNode.removeChild(t)}}const u=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},p=t=>-1!==t.index,m=()=>document.createComment(""),g=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class _{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=n?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,r=document.createTreeWalker(t,133,null,!1);let s,o=0,a=0,c=r.nextNode();for(;o<i.length;)if(s=i[o],p(s)){for(;a<s.index;)a++,"TEMPLATE"===c.nodeName&&(e.push(c),r.currentNode=c.content),null===(c=r.nextNode())&&(r.currentNode=e.pop(),c=r.nextNode());if("node"===s.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,s.name,s.strings,this.options));o++}else this.__parts.push(void 0),o++;return n&&(document.adoptNode(t),customElements.upgrade(t)),t}}const b=` ${a} `;class f{constructor(t,e,i,n){this.strings=t,this.values=e,this.type=i,this.processor=n}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let n=0;n<t;n++){const t=this.strings[n],r=t.lastIndexOf("\x3c!--");i=(r>-1||i)&&-1===t.indexOf("--\x3e",r+1);const s=g.exec(t);e+=null===s?t+(i?b:c):t.substr(0,s.index)+s[1]+s[2]+l+s[3]+a}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const y=t=>null===t||!("object"==typeof t||"function"==typeof t),v=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class x{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new w(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let n=0;n<e;n++){i+=t[n];const e=this.parts[n];if(void 0!==e){const t=e.value;if(y(t)||!v(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class w{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===s||y(t)&&t===this.value||(this.value=t,i(t)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const t=this.value;this.value=s,t(this)}this.value!==s&&this.committer.commit()}}class S{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(m()),this.endNode=t.appendChild(m())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=m()),t.__insert(this.endNode=m())}insertAfterPart(t){t.__insert(this.startNode=m()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=s,t(this)}const t=this.__pendingValue;t!==s&&(y(t)?t!==this.value&&this.__commitText(t):t instanceof f?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):v(t)?this.__commitIterable(t):t===o?(this.value=o,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof _&&this.value.template===e)this.value.update(t.values);else{const i=new _(e,t.processor,this.options),n=i._clone();i.update(t.values),this.__commitNode(n),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,n=0;for(const r of t)void 0===(i=e[n])&&(i=new S(this.options),e.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(e[n-1])),i.setValue(r),i.commit(),n++;n<e.length&&(e.length=n,this.clear(i&&i.endNode))}clear(t=this.startNode){r(this.startNode.parentNode,t.nextSibling,this.endNode)}}class ${constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=s,t(this)}if(this.__pendingValue===s)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=s}}class k extends x{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new A(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class A extends w{}let C=!1;try{const t={get capture(){return C=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class E{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=s,t(this)}if(this.__pendingValue===s)return;const t=this.__pendingValue,e=this.value,n=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),r=null!=t&&(null==e||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=N(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=s}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const N=t=>t&&(C?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const P=new class{handleAttributeExpressions(t,e,i,n){const r=e[0];if("."===r){return new k(t,e.slice(1),i).parts}return"@"===r?[new E(t,e.slice(1),n.eventContext)]:"?"===r?[new $(t,e.slice(1),i)]:new x(t,e,i).parts}handleTextExpression(t){return new S(t)}};function T(t){let e=F.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},F.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const n=t.strings.join(a);return void 0===(i=e.keyString.get(n))&&(i=new h(t,t.getTemplateElement()),e.keyString.set(n,i)),e.stringsArray.set(t.strings,i),i}const F=new Map,O=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const V=(t,...e)=>new f(t,e,"html",P),j=133;function z(t,e){const{element:{content:i},parts:n}=t,r=document.createTreeWalker(i,j,null,!1);let s=U(n),o=n[s],a=-1,c=0;const d=[];let l=null;for(;r.nextNode();){a++;const t=r.currentNode;for(t.previousSibling===l&&(l=null),e.has(t)&&(d.push(t),null===l&&(l=t)),null!==l&&c++;void 0!==o&&o.index===a;)o.index=null!==l?-1:o.index-c,o=n[s=U(n,s)]}d.forEach(t=>t.parentNode.removeChild(t))}const R=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,j,null,!1);for(;i.nextNode();)e++;return e},U=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(p(e))return i}return-1};const H=(t,e)=>`${t}--${e}`;let M=!0;void 0===window.ShadyCSS?M=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),M=!1);const B=t=>e=>{const i=H(e.type,t);let n=F.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},F.set(i,n));let r=n.stringsArray.get(e.strings);if(void 0!==r)return r;const s=e.strings.join(a);if(void 0===(r=n.keyString.get(s))){const i=e.getTemplateElement();M&&window.ShadyCSS.prepareTemplateDom(i,t),r=new h(e,i),n.keyString.set(s,r)}return n.stringsArray.set(e.strings,r),r},L=["html","svg"],D=new Set,I=(t,e,i)=>{D.add(t);const n=i?i.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:s}=r;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(n,t);const o=document.createElement("style");for(let t=0;t<s;t++){const e=r[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{L.forEach(e=>{const i=F.get(H(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),z(t,i)})})})(t);const a=n.content;i?function(t,e,i=null){const{element:{content:n},parts:r}=t;if(null==i)return void n.appendChild(e);const s=document.createTreeWalker(n,j,null,!1);let o=U(r),a=0,c=-1;for(;s.nextNode();){for(c++,s.currentNode===i&&(a=R(e),i.parentNode.insertBefore(e,i));-1!==o&&r[o].index===c;){if(a>0){for(;-1!==o;)r[o].index+=a,o=U(r,o);return}o=U(r,o)}}}(i,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(n,t);const c=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)e.insertBefore(c.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),z(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const q={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},W=(t,e)=>e!==t&&(e==e||t==t),J={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:W},Y=Promise.resolve(!0),X=1,G=4,K=8,Q=16,Z=32,tt="finalized";class et extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=Y,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const n=this._attributeNameForProperty(i,e);void 0!==n&&(this._attributeToPropertyMap.set(n,i),t.push(n))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=J){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[i]},set(e){const n=this[t];this[i]=e,this._requestUpdate(t,n)},configurable:!0,enumerable:!0})}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(tt)||t.finalize(),this[tt]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=W){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,n=e.converter||q,r="function"==typeof n?n:n.fromAttribute;return r?r(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,n=e.converter;return(n&&n.toAttribute||q.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Z,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=J){const n=this.constructor,r=n._attributeNameForProperty(t,i);if(void 0!==r){const t=n._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|K,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=this._updateState&~K}}_attributeToProperty(t,e){if(this._updateState&K)return;const i=this.constructor,n=i._attributeToPropertyMap.get(t);if(void 0!==n){const t=i._classProperties.get(n)||J;this._updateState=this._updateState|Q,this[n]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~Q}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const n=this.constructor,r=n._classProperties.get(t)||J;n._valueHasChanged(this[t],e,r.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==r.reflect||this._updateState&Q||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,r))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|G;const i=this._updatePromise;this._updatePromise=new Promise((i,n)=>{t=i,e=n});try{await i}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Z}get _hasRequestedUpdate(){return this._updateState&G}get hasUpdated(){return this._updateState&X}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&X||(this._updateState=this._updateState|X,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~G}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}et[tt]=!0;const it=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:n}=e;return{kind:i,elements:n,finisher(e){window.customElements.define(t,e)}}})(t,e),nt=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}}:Object.assign({},e,{finisher(i){i.createProperty(e.key,t)}}),rt=(t,e,i)=>{e.constructor.createProperty(i,t)};function st(t){return(e,i)=>void 0!==i?rt(t,e,i):nt(t,e)}const ot="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,at=Symbol();class ct{constructor(t,e){if(e!==at)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(ot?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const dt=(t,...e)=>{const i=e.reduce((e,i,n)=>e+(t=>{if(t instanceof ct)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[n+1],t[0]);return new ct(i,at)};(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const lt=t=>t.flat?t.flat(1/0):function t(e,i=[]){for(let n=0,r=e.length;n<r;n++){const r=e[n];Array.isArray(r)?t(r,i):i.push(r)}return i}(t);class ht extends et{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){lt(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?ot?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof f&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}var ut,pt,mt;function gt(t){return t.substr(0,t.indexOf("."))}ht.finalized=!0,ht.render=(t,e,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,s=O.has(e),o=M&&11===e.nodeType&&!!e.host,a=o&&!D.has(n),c=a?document.createDocumentFragment():e;if(((t,e,i)=>{let n=O.get(e);void 0===n&&(r(e,e.firstChild),O.set(e,n=new S(Object.assign({templateFactory:T},i))),n.appendInto(e)),n.setValue(t),n.commit()})(t,c,Object.assign({templateFactory:B(n)},i)),a){const t=O.get(c);O.delete(c);const i=t.value instanceof _?t.value.template:void 0;I(n,c,i),r(e,e.firstChild),e.appendChild(c),O.set(e,t)}!s&&o&&window.ShadyCSS.styleElement(e.host)},(mt=ut||(ut={})).language="language",mt.system="system",mt.comma_decimal="comma_decimal",mt.decimal_comma="decimal_comma",mt.space_comma="space_comma",mt.none="none",function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(pt||(pt={}));var _t=["closed","locked","off"],bt=function(t,e,i,n){n=n||{},i=null==i?{}:i;var r=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return r.detail=i,t.dispatchEvent(r),r},ft={alert:"mdi:alert",automation:"mdi:playlist-play",calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:google-pages",script:"mdi:file-document",sensor:"mdi:eye",simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weblink:"mdi:open-in-new"};function yt(t,e){if(t in ft)return ft[t];switch(t){case"alarm_control_panel":switch(e){case"armed_home":return"mdi:bell-plus";case"armed_night":return"mdi:bell-sleep";case"disarmed":return"mdi:bell-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:bell"}case"binary_sensor":return e&&"off"===e?"mdi:radiobox-blank":"mdi:checkbox-marked-circle";case"cover":return"closed"===e?"mdi:window-closed":"mdi:window-open";case"lock":return e&&"unlocked"===e?"mdi:lock-open":"mdi:lock";case"media_player":return e&&"off"!==e&&"idle"!==e?"mdi:cast-connected":"mdi:cast";case"zwave":switch(e){case"dead":return"mdi:emoticon-dead";case"sleeping":return"mdi:sleep";case"initializing":return"mdi:timer-sand";default:return"mdi:z-wave"}default:return console.warn("Unable to find icon for domain "+t+" ("+e+")"),"mdi:bookmark"}}var vt=function(t){bt(window,"haptic",t)},xt=function(t,e){return function(t,e,i){void 0===i&&(i=!0);var n,r=gt(e),s="group"===r?"homeassistant":r;switch(r){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}return t.callService(s,n,{entity_id:e})}(t,e,_t.includes(t.states[e].state))},wt=function(t,e,i,n){if(n||(n={action:"more-info"}),!n.confirmation||n.confirmation.exemptions&&n.confirmation.exemptions.some(function(t){return t.user===e.user.id})||(vt("warning"),confirm(n.confirmation.text||"Are you sure you want to "+n.action+"?")))switch(n.action){case"more-info":(i.entity||i.camera_image)&&bt(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":n.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),bt(window,"location-changed",{replace:i})}(0,n.navigation_path);break;case"url":n.url_path&&window.open(n.url_path);break;case"toggle":i.entity&&(xt(e,i.entity),vt("success"));break;case"call-service":if(!n.service)return void vt("failure");var r=n.service.split(".",2);e.callService(r[0],r[1],n.service_data,n.target),vt("success");break;case"fire-dom-event":bt(t,"ll-custom",n)}};function St(t){return void 0!==t&&"none"!==t.action}function $t(...t){const e=t=>t&&"object"==typeof t;return t.reduce((t,i)=>(Object.keys(i).forEach(n=>{const r=t[n],s=i[n];Array.isArray(r)&&Array.isArray(s)?t[n]=r.concat(...s):e(r)&&e(s)?t[n]=$t(r,s):t[n]=s}),t),{})}function kt(t,e,i){if(e.has("config")||i)return!0;const n=["entity","min","max","target"];for(const i of t._configArray){const r=e.get("hass");if(!r)return!0;for(const e of n){const n=i[e],s=n&&"object"==typeof n&&n.entity?n.entity:n;if("string"==typeof s&&r.states[s]!==t.hass.states[s])return!0}}return!1}function At(t,e,i){const n=t[e],r=t.slice();return r.splice(e,1),r.splice(i,0,n),r}const Ct=[{label:"Right",value:"right"},{label:"Up",value:"up"}],Et=[{label:"Default",value:""},{label:"Inside",value:"inside"},{label:"Outside",value:"outside"},{label:"Off",value:"off"}],Nt=["icon","indicator","name","minmax","value"],Pt=[{label:"None",value:""},{label:"Info",value:"more-info"},{label:"Toggle",value:"toggle"},{label:"Navigate",value:"navigate"},{label:"URL",value:"url"},{label:"Service",value:"call-service"}],Tt={tap_action:"Tap",hold_action:"Hold",double_tap_action:"Double tap"},Ft={entities:!0,card:!0,bar:!1,value:!1,positions:!1,severity:!1,animation:!1,actions:!1};let Ot=class extends ht{constructor(){super(...arguments),this._config={},this._configArray=[],this._sections=Object.assign({},Ft),this._entityOpen=[],this._addEntity=()=>{this._configArray=[...this._configArray,{entity:""}],this._entityOpen=[...this._entityOpen,!0],this._syncAndEmit()}}shouldUpdate(t){return kt(this,t,!0)}setConfig(t){this._config=Object.assign({},t),this._config.entity||this._config.entities||(this._config.entities=[{entity:""}]),this._config.entity&&(this._config.entities=[{entity:this._config.entity}],delete this._config.entity),this._configArray=function(t){const e=[];if(t.entities){for(const i of t.entities)if("string"==typeof i){const t=$t({},{entity:i});e.push(t)}else if("object"==typeof i){const t=$t({},i);e.push(t)}}else e.push(t);return e}(this._config),0===this._configArray.length&&(this._configArray=[{entity:""}]),this._entityOpen=this._configArray.map((t,e)=>0===e),this._sections=Object.assign({},Ft),this._syncAndEmit()}render(){return this.hass?V`
      <div class="editor-shell">
        <div class="editor-note">
          <div class="note-title">Rebuilt editor</div>
          <div class="note-body">
            This version intentionally uses simpler Home Assistant-style form patterns and fewer custom controls so it
            renders reliably in the dialog.
          </div>
        </div>

        ${this._renderPanel("entities","Entities","Manage card entities and per-entity overrides.",this._renderEntitiesPanel())}
        ${this._renderPanel("card","Card Defaults","Apply shared card settings like title, columns, and entity row behavior.",this._renderCardDefaults())}
        ${this._renderPanel("bar","Bar Defaults","Shared name, icon, size, color, and direction defaults for all entities.",this._renderBarSettings(this._config,!0))}
        ${this._renderPanel("value","Value Defaults","Global formatting, min/max/target, and attribute defaults.",this._renderValueSettings(this._config))}
        ${this._renderPanel("positions","Position Defaults","Choose where icon, name, values, and indicators render by default.",this._renderPositionsSettings(this._config))}
        ${this._renderPanel("severity","Severity Defaults","Map ranges to colors, icons, or hidden states.",this._renderSeveritySettings(this._config,null))}
        ${this._renderPanel("animation","Animation Defaults","Set shared animation behavior for all bars.",this._renderAnimationSettings(this._config))}
        ${this._renderPanel("actions","Action Defaults","Configure shared tap, hold, and double-tap actions.",this._renderActionSettings(this._config))}
      </div>
    `:V``}_renderPanel(t,e,i,n){const r=this._sections[t];return V`
      <section class="panel">
        <button class="panel-header" type="button" @click=${()=>this._toggleSection(t)}>
          <div>
            <div class="panel-title">${e}</div>
            <div class="panel-description">${i}</div>
          </div>
          <ha-icon .icon=${r?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </button>
        ${r?V`
              <div class="panel-body">${n}</div>
            `:V``}
      </section>
    `}_renderEntitiesPanel(){return V`
      <div class="entity-list">
        ${this._configArray.map((t,e)=>this._renderEntityCard(t,e))}
      </div>
      <div class="toolbar end">
        <button class="add-button" type="button" @click=${this._addEntity}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          <span>Add entity</span>
        </button>
      </div>
    `}_renderEntityCard(t,e){const i=!!this._entityOpen[e],n=t.name||t.entity||`Entity ${e+1}`,r=this._getEntityHint(t);return V`
      <article class="entity-card">
        <div class="entity-header">
          <button class="entity-summary" type="button" @click=${()=>this._toggleEntity(e)}>
            <div class="entity-title-row">
              <div class="entity-title">${n}</div>
              <ha-icon .icon=${i?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
            </div>
            <div class="entity-subtitle">${r}</div>
          </button>
          <div class="icon-actions">
            <button
              class="icon-button"
              type="button"
              ?disabled=${0===e}
              @click=${()=>this._moveEntity(e,-1)}
            >
              <ha-icon .icon=${"mdi:arrow-up"}></ha-icon>
            </button>
            <button
              class="icon-button"
              type="button"
              ?disabled=${e===this._configArray.length-1}
              @click=${()=>this._moveEntity(e,1)}
            >
              <ha-icon .icon=${"mdi:arrow-down"}></ha-icon>
            </button>
            <button class="icon-button danger" type="button" @click=${()=>this._removeEntity(e)}>
              <ha-icon .icon=${"mdi:delete-outline"}></ha-icon>
            </button>
          </div>
        </div>

        ${i?V`
              <div class="entity-body">
                ${this._renderEntityBasics(t)} ${this._renderSubheading("Bar")}
                ${this._renderBarSettings(t,!1)} ${this._renderSubheading("Value")}
                ${this._renderValueSettings(t)} ${this._renderSubheading("Positions")}
                ${this._renderPositionsSettings(t)} ${this._renderSubheading("Severity")}
                ${this._renderSeveritySettings(t,e)} ${this._renderSubheading("Animation")}
                ${this._renderAnimationSettings(t)} ${this._renderSubheading("Actions")}
                ${this._renderActionSettings(t)}
              </div>
            `:V``}
      </article>
    `}_renderEntityBasics(t){return V`
      <div class="group-grid two-col">
        ${this._renderTextField("Entity ID",t.entity,e=>this._setField(t,"entity",e))}
        ${this._renderTextField("Friendly Name",t.name,e=>this._setField(t,"name",e))}
      </div>
      ${this._renderHint(this._getEntityHint(t))}
    `}_renderCardDefaults(){return V`
      <div class="group-grid two-col">
        ${this._renderTextField("Header Title",this._config.title,t=>this._setField(this._config,"title",t))}
        ${this._renderNumberField("Columns",this._config.columns,t=>this._setField(this._config,"columns",t))}
      </div>
      ${this._renderChoiceField("Stack",[{label:"None",value:""},{label:"Horizontal",value:"horizontal"}],this._config.stack,t=>this._setField(this._config,"stack",t))}
      <div class="toggle-grid">
        ${this._renderCheckbox("Entity Row",!!this._config.entity_row,t=>this._setBoolean(this._config,"entity_row",t))}
        ${this._renderCheckbox("Entity Config",!!this._config.entity_config,t=>this._setBoolean(this._config,"entity_config",t))}
      </div>
      ${this._renderHint("These settings are similar to the shared top-level controls used in Home Assistant card editors.")}
    `}_renderBarSettings(t,e){return V`
      <div class="group-grid two-col">
        ${e?V``:this._renderTextField("Label",t.name,e=>this._setField(t,"name",e))}
        ${this._renderTextField("Icon",t.icon,e=>this._setField(t,"icon",e))}
        ${this._renderTextField("Height",t.height,e=>this._setField(t,"height",e))}
        ${this._renderTextField("Width",t.width,e=>this._setField(t,"width",e))}
        ${this._renderTextField("Color",t.color,e=>this._setField(t,"color",e))}
      </div>
      ${this._renderChoiceField("Direction",Ct,t.direction||"right",e=>this._setField(t,"direction",e))}
      ${this._renderHint("Use theme colors or CSS values. This is intentionally flatter and simpler than the previous custom layout.")}
    `}_renderValueSettings(t){return V`
      <div class="toggle-grid">
        ${this._renderCheckbox("Limit Value",!!t.limit_value,e=>this._setBoolean(t,"limit_value",e))}
        ${this._renderCheckbox("Complementary",!!t.complementary,e=>this._setBoolean(t,"complementary",e))}
      </div>
      <div class="group-grid three-col">
        ${this._renderNumberField("Decimal",t.decimal,e=>this._setField(t,"decimal",e))}
        ${this._renderNumberField("Min",t.min,e=>this._setField(t,"min",e))}
        ${this._renderNumberField("Max",t.max,e=>this._setField(t,"max",e))}
        ${this._renderNumberField("Target",t.target,e=>this._setField(t,"target",e))}
      </div>
      <div class="group-grid two-col">
        ${this._renderTextField("Unit of Measurement",t.unit_of_measurement,e=>this._setField(t,"unit_of_measurement",e))}
        ${this._renderTextField("Attribute",t.attribute,e=>this._setField(t,"attribute",e))}
      </div>
      ${this._renderHint("Use YAML for advanced object-style min/max sources. The visual editor focuses on common number-based editing.")}
    `}_renderPositionsSettings(t){const e=this._ensurePositions(t);return V`
      <div class="positions-grid">
        ${Nt.map(i=>this._renderChoiceField(i,Et,e[i]||"",e=>{this._setPosition(t,i,e)}))}
      </div>
      ${this._renderHint("This mirrors the compact segmented-choice pattern common in Home Assistant editors.")}
    `}_renderSeveritySettings(t,e){const i=t.severity||[];return V`
      ${0===i.length?this._renderEmptyState("No severity rules yet","Add rules to map ranges to colors, icons, or hidden states."):V`
            <div class="severity-list">
              ${i.map((e,i)=>this._renderSeverityRule(t,e,i))}
            </div>
          `}
      <div class="toolbar end">
        <button class="add-button" type="button" @click=${()=>this._addSeverity(t,e)}>
          <ha-icon .icon=${"mdi:plus"}></ha-icon>
          <span>Add severity rule</span>
        </button>
      </div>
    `}_renderSeverityRule(t,e,i){const n=t.severity||[];return V`
      <div class="rule-card">
        <div class="rule-header">
          <div class="rule-title">Rule ${i+1}</div>
          <div class="icon-actions">
            <button
              class="icon-button"
              type="button"
              ?disabled=${0===i}
              @click=${()=>this._moveSeverity(t,i,-1)}
            >
              <ha-icon .icon=${"mdi:arrow-up"}></ha-icon>
            </button>
            <button
              class="icon-button"
              type="button"
              ?disabled=${i===n.length-1}
              @click=${()=>this._moveSeverity(t,i,1)}
            >
              <ha-icon .icon=${"mdi:arrow-down"}></ha-icon>
            </button>
            <button
              class="icon-button danger"
              type="button"
              @click=${()=>this._removeSeverity(t,i)}
            >
              <ha-icon .icon=${"mdi:delete-outline"}></ha-icon>
            </button>
          </div>
        </div>
        <div class="group-grid two-col">
          ${this._renderNumberField("From",e.from,e=>this._setSeverityField(t,i,"from",e))}
          ${this._renderNumberField("To",e.to,e=>this._setSeverityField(t,i,"to",e))}
          ${this._renderTextField("Color",e.color,e=>this._setSeverityField(t,i,"color",e))}
          ${this._renderTextField("Icon",e.icon,e=>this._setSeverityField(t,i,"icon",e))}
        </div>
        ${this._renderCheckbox("Hide bar for this range",!!e.hide,e=>this._setSeverityBoolean(t,i,"hide",e))}
      </div>
    `}_renderAnimationSettings(t){const e=this._ensureAnimation(t);return V`
      ${this._renderChoiceField("Animation State",[{label:"Off",value:"off"},{label:"On",value:"on"}],e.state||"off",e=>this._setAnimationField(t,"state",e))}
      <div class="group-grid two-col">
        ${this._renderTextField("Speed (seconds)",e.speed,e=>this._setAnimationField(t,"speed",e))}
      </div>
    `}_renderActionSettings(t){return V`
      <div class="actions-list">
        ${["tap_action","hold_action","double_tap_action"].map(e=>this._renderActionCard(t,e))}
      </div>
      ${this._renderHint("This follows the same simple action selection flow used by many stable third-party cards: pick an action, then fill only the fields it needs.")}
    `}_renderActionCard(t,e){const i=this._getAction(t,e),n=i.action||"",r=Tt[e];return V`
      <div class="rule-card">
        <div class="rule-title">${r}</div>
        ${this._renderChoiceField(`${r} action`,Pt,n,i=>this._setActionField(t,e,"action",i))}
        ${"navigate"===n?this._renderTextField("Navigation Path",i.navigation_path,i=>this._setActionField(t,e,"navigation_path",i)):V``}
        ${"url"===n?this._renderTextField("URL",i.url_path,i=>this._setActionField(t,e,"url_path",i)):V``}
        ${"call-service"===n?this._renderTextField("Service",i.service,i=>this._setActionField(t,e,"service",i)):V``}
      </div>
    `}_renderSubheading(t){return V`
      <div class="subheading">${t}</div>
    `}_renderTextField(t,e,i){return V`
      <label class="field">
        <span class="field-label">${t}</span>
        <input
          class="field-input"
          .value=${this._stringValue(e)}
          @input=${t=>i(this._inputValue(t))}
        />
      </label>
    `}_renderNumberField(t,e,i){return V`
      <label class="field">
        <span class="field-label">${t}</span>
        <input
          class="field-input"
          type="number"
          .value=${this._stringValue(e)}
          @input=${t=>i(this._inputValue(t))}
        />
      </label>
    `}_renderCheckbox(t,e,i){return V`
      <label class="checkbox-card">
        <input type="checkbox" .checked=${e} @change=${t=>i(this._checkedValue(t))} />
        <span>${t}</span>
      </label>
    `}_renderChoiceField(t,e,i,n){const r=i||"";return V`
      <div class="field">
        <div class="field-label">${t}</div>
        <div class="choice-group">
          ${e.map(t=>V`
              <button
                class="choice-button ${r===t.value?"selected":""}"
                type="button"
                @click=${()=>n(t.value)}
              >
                ${t.label}
              </button>
            `)}
        </div>
      </div>
    `}_renderEmptyState(t,e){return V`
      <div class="empty-state">
        <div class="empty-title">${t}</div>
        <div class="empty-description">${e}</div>
      </div>
    `}_renderHint(t){return V`
      <div class="hint">${t}</div>
    `}_toggleSection(t){this._sections=Object.assign(Object.assign({},this._sections),{[t]:!this._sections[t]})}_toggleEntity(t){this._entityOpen=this._entityOpen.map((e,i)=>i===t?!e:e)}_moveEntity(t,e){const i=t+e;i<0||i>=this._configArray.length||(this._configArray=At(this._configArray,t,i),this._entityOpen=At(this._entityOpen,t,i),this._syncAndEmit())}_removeEntity(t){this._configArray=this._configArray.filter((e,i)=>i!==t),this._entityOpen=this._entityOpen.filter((e,i)=>i!==t),0===this._configArray.length&&(this._configArray=[{entity:""}],this._entityOpen=[!0]),this._syncAndEmit()}_addSeverity(t,e){t.severity=[...t.severity||[],{from:"",to:"",color:"",icon:"",hide:!1}],null!==e&&(this._entityOpen[e]=!0),this._syncAndEmit()}_moveSeverity(t,e,i){if(!t.severity)return;const n=e+i;n<0||n>=t.severity.length||(t.severity=At(t.severity,e,n),this._syncAndEmit())}_removeSeverity(t,e){t.severity&&(t.severity=t.severity.filter((t,i)=>i!==e),this._syncAndEmit())}_setField(t,e,i){""===i?delete t[e]:t[e]=i,this._syncAndEmit()}_setBoolean(t,e,i){i?t[e]=i:delete t[e],this._syncAndEmit()}_setPosition(t,e,i){const n=this._ensurePositions(t);""===i?delete n[e]:n[e]=i,this._syncAndEmit()}_setAnimationField(t,e,i){const n=this._ensureAnimation(t);""===i?delete n[e]:n[e]=i,this._syncAndEmit()}_setActionField(t,e,i,n){const r=this._getAction(t,e);if("action"===i&&""===n)return delete t[e],void this._syncAndEmit();""===n?delete r[i]:r[i]=n,r.action||delete t[e],this._syncAndEmit()}_setSeverityField(t,e,i,n){t.severity&&(""===n?delete t.severity[e][i]:t.severity[e][i]=n,this._syncAndEmit())}_setSeverityBoolean(t,e,i,n){t.severity&&(n?t.severity[e][i]=n:delete t.severity[e][i],this._syncAndEmit())}_ensurePositions(t){return t.positions||(t.positions={}),t.positions}_ensureAnimation(t){return t.animation||(t.animation={}),t.animation}_getAction(t,e){return t[e]||(t[e]={}),t[e]}_syncAndEmit(){this._config=Object.assign(Object.assign({},this._config),{entities:this._configArray.map(t=>this._cleanConfig(t))}),this._emitConfigChanged(),this.requestUpdate()}_emitConfigChanged(){bt(this,"config-changed",{config:this._cleanConfig(this._config)})}_cleanConfig(t){const e=Object.assign({},t);if(delete e.entity,void 0!==t.entity&&(e.entity=t.entity),e.positions){const t=Object.assign({},e.positions);Object.keys(t).forEach(e=>{""!==t[e]&&void 0!==t[e]||delete t[e]}),e.positions=Object.keys(t).length>0?t:void 0}if(e.animation){const t=Object.assign({},e.animation);t.state||delete t.state,t.speed||delete t.speed,e.animation=Object.keys(t).length>0?t:void 0}if(e.severity){const t=e.severity.map(t=>{const e=Object.assign({},t);return e.from||0===e.from||delete e.from,e.to||0===e.to||delete e.to,e.color||delete e.color,e.icon||delete e.icon,e.hide||delete e.hide,e}).filter(t=>Object.keys(t).length>0);e.severity=t.length>0?t:void 0}return["tap_action","hold_action","double_tap_action"].forEach(t=>{const i=e[t];if(!i)return;const n=Object.assign({},i);n.action?(n.navigation_path||delete n.navigation_path,n.url_path||delete n.url_path,n.service||delete n.service,e[t]=n):delete e[t]}),e.entities&&(e.entities=e.entities.map(t=>this._cleanConfig(t))),Object.keys(e).forEach(t=>{const i=e[t];""!==i&&void 0!==i||delete e[t]}),e}_getEntityHint(t){if(!this.hass||!t.entity)return"Enter an entity id, then tune only the overrides you need.";const e=this.hass.states[t.entity];return e?`${e.attributes.friendly_name||t.entity}: ${e.state}`:"Entity not found yet in Home Assistant. Double-check the entity id."}_inputValue(t){return t.currentTarget.value}_checkedValue(t){return t.currentTarget.checked}_stringValue(t){return null==t?"":String(t)}static get styles(){return dt`
      :host {
        display: block;
      }
      .editor-shell {
        display: grid;
        gap: 16px;
      }
      .editor-note,
      .panel,
      .entity-card,
      .rule-card {
        background: var(--ha-card-background, var(--card-background-color));
        border: 1px solid var(--divider-color);
        border-radius: 16px;
      }
      .editor-note {
        padding: 14px 16px;
      }
      .note-title,
      .panel-title,
      .entity-title,
      .rule-title,
      .subheading {
        font-weight: 600;
        color: var(--primary-text-color);
      }
      .note-body,
      .panel-description,
      .entity-subtitle,
      .hint,
      .empty-description {
        color: var(--secondary-text-color);
        line-height: 1.45;
      }
      .panel-header,
      .entity-summary,
      .icon-button,
      .choice-button,
      .add-button {
        font: inherit;
      }
      .panel-header,
      .entity-summary {
        width: 100%;
        background: transparent;
        border: 0;
        color: inherit;
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
        cursor: pointer;
      }
      .panel-body,
      .entity-body {
        padding: 0 16px 16px;
        display: grid;
        gap: 14px;
      }
      .entity-header,
      .rule-header,
      .toolbar,
      .entity-title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .entity-header {
        padding-right: 12px;
      }
      .icon-actions {
        display: flex;
        gap: 6px;
      }
      .icon-button {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        border: 1px solid var(--divider-color);
        background: transparent;
        color: var(--primary-text-color);
        cursor: pointer;
      }
      .icon-button[disabled] {
        opacity: 0.35;
        cursor: default;
      }
      .icon-button.danger {
        color: var(--error-color);
      }
      .subheading {
        padding-top: 4px;
        border-top: 1px solid var(--divider-color);
      }
      .field {
        display: grid;
        gap: 6px;
        min-width: 0;
      }
      .field-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .field-input {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
        color: var(--primary-text-color);
        padding: 12px;
        font: inherit;
      }
      .group-grid {
        display: grid;
        gap: 12px;
      }
      .group-grid.two-col {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .group-grid.three-col {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .toggle-grid,
      .positions-grid,
      .entity-list,
      .severity-list,
      .actions-list {
        display: grid;
        gap: 12px;
      }
      .toggle-grid {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      }
      .positions-grid {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
      .checkbox-card {
        display: flex;
        gap: 10px;
        align-items: center;
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        padding: 12px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
      }
      .choice-group {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .choice-button,
      .add-button {
        border: 1px solid var(--divider-color);
        border-radius: 999px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
        color: var(--primary-text-color);
        padding: 8px 12px;
        cursor: pointer;
      }
      .choice-button.selected,
      .add-button {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      }
      .add-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .toolbar.end {
        justify-content: flex-end;
      }
      .hint {
        font-size: 12px;
      }
      .empty-state {
        padding: 16px;
        border: 1px dashed var(--divider-color);
        border-radius: 12px;
        text-align: center;
      }
      .empty-title {
        font-weight: 600;
        margin-bottom: 4px;
      }
      @media (max-width: 700px) {
        .group-grid.two-col,
        .group-grid.three-col {
          grid-template-columns: 1fr;
        }
        .entity-header,
        .rule-header {
          align-items: flex-start;
          flex-direction: column;
        }
        .icon-actions {
          align-self: flex-end;
        }
      }
    `}};t([st()],Ot.prototype,"hass",void 0),t([st()],Ot.prototype,"_config",void 0),t([st()],Ot.prototype,"_toggle",void 0),Ot=t([it("bar-card-editor")],Ot),window.customCards=window.customCards||[],window.customCards.push({type:"bar-card",name:"Bar Card",preview:!1,description:"A customizable bar card."});const Vt="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;customElements.define("action-handler-bar",class extends HTMLElement{constructor(){super(),this.holdTime=500,this.ripple=document.createElement("mwc-ripple"),this.timer=void 0,this.held=!1,this.cooldownStart=!1,this.cooldownEnd=!1}connectedCallback(){Object.assign(this.style,{position:"absolute",width:Vt?"100px":"50px",height:Vt?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(t=>{document.addEventListener(t,()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0},{passive:!0})})}bind(t,e){if(t.actionHandler)return;t.actionHandler=!0,t.addEventListener("contextmenu",t=>{const e=t||window.event;e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1});const i=t=>{if(this.cooldownStart)return;let e,i;this.held=!1,t.touches?(e=t.touches[0].pageX,i=t.touches[0].pageY):(e=t.pageX,i=t.pageY),this.timer=window.setTimeout(()=>{this.startAnimation(e,i),this.held=!0},this.holdTime),this.cooldownStart=!0,window.setTimeout(()=>this.cooldownStart=!1,100)},n=i=>{this.cooldownEnd||["touchend","touchcancel"].includes(i.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?bt(t,"action",{action:"hold"}):e.hasDoubleTap?1===i.detail||"keyup"===i.type?this.dblClickTimeout=window.setTimeout(()=>{bt(t,"action",{action:"tap"})},250):(clearTimeout(this.dblClickTimeout),bt(t,"action",{action:"double_tap"})):bt(t,"action",{action:"tap"}),this.cooldownEnd=!0,window.setTimeout(()=>this.cooldownEnd=!1,100))};t.addEventListener("touchstart",i,{passive:!0}),t.addEventListener("touchend",n),t.addEventListener("touchcancel",n),t.addEventListener("keyup",t=>{if(13===t.keyCode)return n(t)}),/iPhone OS 13_/.test(window.navigator.userAgent)||(t.addEventListener("mousedown",i,{passive:!0}),t.addEventListener("click",n))}startAnimation(t,e){Object.assign(this.style,{left:`${t}px`,top:`${e}px`,display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}});const jt=(t,e)=>{const i=(()=>{const t=document.body;if(t.querySelector("action-handler-bar"))return t.querySelector("action-handler-bar");const e=document.createElement("action-handler-bar");return t.appendChild(e),e})();i&&i.bind(t,e)},zt=(t=>(...i)=>{const n=t(...i);return e.set(n,!0),n})((t={})=>e=>{jt(e.committer.element,t)});var Rt={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",entity_not_available:"Entity not available"},Ut={common:Rt},Ht={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},Mt={common:Ht},Bt={en:Object.freeze({__proto__:null,common:Rt,default:Ut}),nb:Object.freeze({__proto__:null,common:Ht,default:Mt})};function Lt(t,e="",i=""){const n=t.split(".")[0],r=t.split(".")[1],s=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");var o;try{o=Bt[s][n][r]}catch(t){o=Bt.en[n][r]}return void 0===o&&(o=Bt.en[n][r]),""!==e&&""!==i&&(o=o.replace(e,i)),o}const Dt=V`
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
`;console.info(`%c  BAR-CARD \n%c  ${Lt("common.version")} 3.1.7    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");let It=class extends ht{constructor(){super(...arguments),this._configArray=[],this._stateArray=[],this._animationState=[],this._rowAmount=1}static async getConfigElement(){return document.createElement("bar-card-editor")}static getStubConfig(){return{type:"custom:bar-card",entity:"sensor.example"}}shouldUpdate(t){return kt(this,t,!1)}setConfig(t){if(!t)throw new Error(Lt("common.invalid_configuration"));this._config=$t({animation:{state:"off",speed:5},color:"var(--bar-card-color, var(--primary-color))",columns:1,direction:"right",max:100,min:0,positions:{icon:"outside",indicator:"outside",name:"inside",minmax:"off",value:"inside"}},t),"horizontal"==this._config.stack&&(this._config.columns=this._config.entities.length),this._configArray=function(t){const e=[];if(t.entities){for(const i of t.entities)if("string"==typeof i){const n=$t({},t);delete n.entities;const r=$t(n,{entity:i});e.push(r)}else if("object"==typeof i){const n=$t({},t);delete n.entities;const r=$t(n,i);e.push(r)}}else e.push(t);return e}(this._config),this._rowAmount=this._configArray.length/this._config.columns}render(){return this._config&&this.hass?V`
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
      ${Dt}
    `:V``}_createBarArray(){const t=[];for(let e=0;e<this._configArray.length;e++)(t.length+1)*this._config.columns==e&&t.push(this._config.columns),this._configArray.length==e+1&&t.push(this._configArray.length-t.length*this._config.columns);const e=[];for(let i=0;i<t.length;i++){const n=[];for(let e=0;e<t[i];e++){const t=i*this._config.columns+e,r=this._configArray[t],s=this.hass.states[r.entity];if(!s){n.push(V`
            <div class="warning" style="margin-bottom: 8px;">
              ${Lt("common.entity_not_available")}: ${r.entity}
            </div>
          `);continue}let o;if(o=r.attribute?s.attributes[r.attribute]:s.state,r.severity&&this._computeSeverityVisibility(o,t))continue;const a=this._computeConfigNumber(r.min,0),c=this._computeConfigNumber(r.max,100);r.limit_value&&(o=Math.min(o,c),o=Math.max(o,a)),isNaN(Number(o))||(0==r.decimal?o=Number(o).toFixed(0):r.decimal&&(o=Number(o).toFixed(r.decimal)));let d=40;r.height&&(d=r.height);let l,h,u,p="stretch",m="0px 0px 0px 13px",g="right",_="row",b="left",f="height: 100%; width: 2px;";switch(r.direction){case"right":g="right",b="left";break;case"up":m="0px",g="top",_="column-reverse",b="bottom",f="height: 2px; width: 100%;"}switch(u=this._computeSeverityIcon(o,t)?this._computeSeverityIcon(o,t):r.icon?r.icon:s.attributes.icon?s.attributes.icon:yt(gt(r.entity),o),r.positions.icon){case"outside":l=V`
              <bar-card-iconbar>
                <ha-icon icon="${u}"></ha-icon>
              </bar-card-iconbar>
            `;break;case"inside":h=V`
              <bar-card-iconbar>
                <ha-icon icon="${u}"></ha-icon>
              </bar-card-iconbar>
            `,m="0px";break;case"off":m="0px"}const y=r.name?r.name:s.attributes.friendly_name;let v,x,w,S,$,k,A;switch(r.positions.name){case"outside":v=V`
              <bar-card-name
                class="${r.entity_row?"name-outside":""}"
                style="${"up"==r.direction?"":r.width?`width: calc(100% - ${r.width});`:""}"
                >${y}</bar-card-name
              >
            `,m="0px";break;case"inside":x=V`
              <bar-card-name>${y}</bar-card-name>
            `}switch(w=isNaN(Number(o))?"":r.unit_of_measurement?r.unit_of_measurement:s.attributes.unit_of_measurement,r.positions.minmax){case"outside":S=V`
              <bar-card-min>${a}${w}</bar-card-min>
              <bar-card-divider>/</bar-card-divider>
              <bar-card-max>${c}${w}</bar-card-max>
            `;break;case"inside":$=V`
              <bar-card-min class="${"up"==r.direction?"min-direction-up":"min-direction-right"}"
                >${a}${w}</bar-card-min
              >
              <bar-card-divider>/</bar-card-divider>
              <bar-card-max> ${c}${w}</bar-card-max>
            `}switch(r.positions.value){case"outside":k=V`
              <bar-card-value class="${"up"==r.direction?"value-direction-up":"value-direction-right"}"
                >${r.complementary?c-o:o} ${w}</bar-card-value
              >
            `;break;case"inside":A=V`
              <bar-card-value
                class="${"inside"==r.positions.minmax?"":"up"==r.direction?"value-direction-up":"value-direction-right"}"
                >${r.complementary?c-o:o} ${w}</bar-card-value
              >
            `;break;case"off":m="0px"}let C="";o>this._stateArray[t]?(C="▲","up"==r.direction?this._animationState[t]="animation-increase-vertical":this._animationState[t]="animation-increase"):o<this._stateArray[t]?(C="▼","up"==r.direction?this._animationState[t]="animation-decrease-vertical":this._animationState[t]="animation-decrease"):this._animationState[t]=this._animationState[t],isNaN(Number(o))&&(C="");const E=this._computeBarColor(o,t);let N,P;switch(r.positions.indicator){case"outside":N=V`
              <bar-card-indicator
                class="${"up"==r.direction?"":"indicator-direction-right"}"
                style="--bar-color: ${E};"
                >${C}</bar-card-indicator
              >
            `;break;case"inside":P=V`
              <bar-card-indicator style="--bar-color: ${E};">${C}</bar-card-indicator>
            `}const T=this._computePercent(o,t),F=this._computePercent(r.target,t);let O=T,j=this._computePercent(r.target,t);j<O&&(O=j,j=T);let z="";r.width&&(p="center",z=`width: ${r.width}`);const R=this._animationState[t];let U="right",H=100*T,M="animationbar-horizontal";"animation-increase-vertical"!=R&&"animation-decrease-vertical"!=R||(U="bottom",M="animationbar-vertical",H=100*(100-T)),n.push(V`
          <bar-card-card
            style="flex-direction: ${_}; align-items: ${p};"
            @action=${this._handleAction}
            .config=${r}
            .actionHandler=${zt({hasHold:St(r.hold_action),hasDoubleClick:St(r.double_tap_action)})}
          >
            ${l} ${N} ${v}
            <bar-card-background
              style="margin: ${m}; height: ${d}${"number"==typeof d?"px":""}; ${z}"
            >
              <bar-card-backgroundbar style="--bar-color: ${E};"></bar-card-backgroundbar>
              ${"on"==r.animation.state?V`
                    <bar-card-animationbar
                      style="animation: ${R} ${r.animation.speed}s infinite ease-out; --bar-percent: ${H}%; --bar-color: ${E}; --animation-direction: ${U};"
                      class="${M}"
                    ></bar-card-animationbar>
                  `:""}
              <bar-card-currentbar
                style="--bar-color: ${E}; --bar-percent: ${T}%; --bar-direction: ${g}"
              ></bar-card-currentbar>
              ${r.target?V`
                    <bar-card-targetbar
                      style="--bar-color: ${E}; --bar-percent: ${O}%; --bar-target-percent: ${j}%; --bar-direction: ${g};"
                    ></bar-card-targetbar>
                    <bar-card-markerbar
                      style="--bar-color: ${E}; --bar-target-percent: ${F}%; ${b}: calc(${F}% - 1px); ${f}}"
                    ></bar-card-markerbar>
                  `:""}
              <bar-card-contentbar
                class="${"up"==r.direction?"contentbar-direction-up":"contentbar-direction-right"}"
              >
                ${h} ${P} ${x} ${$} ${A}
              </bar-card-contentbar>
            </bar-card-background>
            ${S} ${k}
          </bar-card-card>
        `),o!==this._stateArray[t]&&(this._stateArray[t]=o)}e.push(n)}let i="column";(this._config.columns||this._config.stack)&&(i="row");const n=[];for(const t of e)n.push(V`
        <bar-card-row style="flex-direction: ${i};">${t}</bar-card-row>
      `);return n}_computeBarColor(t,e){const i=this._configArray[e];let n;return n=i.severity?this._computeSeverityColor(t,e):"unavailable"==t?`var(--bar-card-disabled-color, ${i.color})`:i.color}_computeSeverityColor(t,e){const i=this._configArray[e],n=Number(t),r=i.severity;let s;return isNaN(n)?r.forEach(e=>{t==e.text&&(s=e.color)}):r.forEach(t=>{n>=t.from&&n<=t.to&&(s=t.color)}),null==s&&(s=i.color),s}_computeSeverityVisibility(t,e){const i=this._configArray[e],n=Number(t),r=i.severity;let s=!1;return isNaN(n)?r.forEach(e=>{t==e.text&&(s=e.hide)}):r.forEach(t=>{n>=t.from&&n<=t.to&&(s=t.hide)}),s}_computeSeverityIcon(t,e){const i=this._configArray[e],n=Number(t),r=i.severity;let s=!1;return!!r&&(isNaN(n)?r.forEach(e=>{t==e.text&&(s=e.icon)}):r.forEach(t=>{n>=t.from&&n<=t.to&&(s=t.icon)}),s)}_computePercent(t,e){const i=this._configArray[e],n=Number(t),r=this._computeConfigNumber(i.min,0),s=this._computeConfigNumber(i.max,100);if("unavailable"==t)return 0;if(isNaN(n))return 100;if(s==r)return 0;switch(i.direction){case"right-reverse":case"left-reverse":case"up-reverse":case"down-reverse":return 100-100*(n-r)/(s-r);default:return 100*(n-r)/(s-r)}}_computeConfigNumber(t,e){const i=t=>{if("number"==typeof t)return t;if("string"==typeof t){const e=t.trim();return""==e?NaN:Number.parseFloat(e)}return NaN},n=i(t);if(!isNaN(n))return n;const r=(t,e)=>{if(!this.hass||!this.hass.states[t])return NaN;const n=this.hass.states[t],r=e?n.attributes[e]:n.state;return i(r)};if("string"==typeof t){const e=r(t);if(!isNaN(e))return e}if(t&&"object"==typeof t){const e=t;if(e.entity){const t=r(e.entity,e.attribute);if(!isNaN(t))return t}}return e}_handleAction(t){this.hass&&t.target.config&&t.detail.action&&function(t,e,i,n){var r;"double_tap"===n&&i.double_tap_action?r=i.double_tap_action:"hold"===n&&i.hold_action?r=i.hold_action:"tap"===n&&i.tap_action&&(r=i.tap_action),wt(t,e,i,r)}(this,this.hass,t.target.config,t.detail.action)}getCardSize(){if(this._config.height){const t=this._config.height.toString();return Math.trunc(Number(t.replace("px",""))/50*this._rowAmount)+1}return this._rowAmount+1}};t([st()],It.prototype,"hass",void 0),t([st()],It.prototype,"_config",void 0),t([st()],It.prototype,"_configArray",void 0),It=t([it("bar-card")],It);export{It as BarCard};
