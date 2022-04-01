"use strict";var t=require("bitcoin-computer-bitcore");require("ses");var e=require("axios");var n=require("crypto");var r=require("crypto-js");var s=require("eciesjs");var o=require("http");var i=require("https");var c=require("url");function a(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}function u(t){if(t&&t.__esModule)return t;var e=Object.create(null);return t&&Object.keys(t).forEach((function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:function(){return t[n]}})}})),e.default=t,Object.freeze(e)}require("util");var d=a(e);var l=a(n);var h=a(r);var p=u(s);var f=a(o);var g=a(i);var v=a(c);function b(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]])}return n}function _(t,e,n,r){var s,o=arguments.length,i=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i}function m(t,e,n,r){return new(n||(n=Promise))((function(s,o){function i(t){try{a(r.next(t))}catch(t){o(t)}}function c(t){try{a(r.throw(t))}catch(t){o(t)}}function a(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,c)}a((r=r.apply(t,e||[])).next())}))}const w=t=>new Compartment({}).evaluate(t);const y=(t,e,n)=>new Compartment({target:t,thisArgument:e,argumentsList:n}).evaluate("Reflect.apply(target, thisArgument, argumentsList)");const O=(t,e)=>new Compartment({target:t,argumentsList:e}).evaluate(`Reflect.construct(${t}, argumentsList)`);const{crypto:S}=t.Bitcoin;const x=(t,e)=>{const n=Date.now();const r=S.Hash.sha256(Buffer.from(e+n));const s=[S.ECDSA.sign(r,t,"big").toString("hex"),t.publicKey.toString(),n];return`Bearer ${Buffer.from(s.join(":")).toString("base64")}`};const{Transaction:j}=t.Bitcoin;function E(t){return m(this,void 0,void 0,(function*(){if(!function(t){return void 0!==t.config}(t))throw new Error("Unknown error");const{message:e,config:n,response:r}=t;const s=function(t){try{const e=JSON.parse(t);if("object"!=typeof e)throw new Error("Invalid object");if("string"!=typeof e.txhex)throw new Error("Invalid object");return new j(e.txhex)}catch(t){return null}}(null==n?void 0:n.data);const o=`message\t${e}`;const i=`request\t${null==n?void 0:n.method} ${null==n?void 0:n.url}`;const c=s?`transaction\t ${JSON.stringify(s.toJSON(),null,2)}`:"";const a="post"===(null==n?void 0:n.method)?`data\t${null==n?void 0:n.data}`:"";const u=r?`response\t${JSON.stringify(r.data)}`:"";const d=s?c:a;throw t.message=`\n    Communication Error\n    ${o}\n    ${i}\n    ${d}\n    ${u}`,t}))}class C{constructor(t,e,n={}){this.baseUrl=t,this.headers=n,this.privateKey=e}get(t){return m(this,void 0,void 0,(function*(){const e=`${this.baseUrl}${t}`;try{let t={};return this.privateKey&&(t={Authentication:x(this.privateKey,this.baseUrl)}),(yield d.default.get(e,{headers:Object.assign(Object.assign({},this.headers),t)})).data}catch(t){return E(t)}}))}post(t,e){return m(this,void 0,void 0,(function*(){const n=`${this.baseUrl}${t}`;try{let t={};return this.privateKey&&(t={Authentication:x(this.privateKey,this.baseUrl)}),(yield d.default.post(n,e,{headers:Object.assign(Object.assign({},this.headers),t)})).data}catch(t){return E(t)}}))}delete(t){return m(this,void 0,void 0,(function*(){const e=`${this.baseUrl}${t}`;try{let t={};return this.privateKey&&(t={Authentication:x(this.privateKey,this.baseUrl)}),(yield d.default.delete(e,{headers:Object.assign(Object.assign({},this.headers),t)})).data}catch(t){return E(t)}}))}}const{PrivateKey:T,Transaction:B}=t.Bitcoin;function N(t){if(!/^[0-9A-Fa-f]{64}$/.test(t))throw new Error(`Invalid txId: ${t}`)}function R(t){if(!/^[0-9A-Fa-f]{64}\/\d+$/.test(t))throw new Error(`Invalid outId: ${t}`)}function P(t){R(t);const[e,n]=t.split("/");return{txId:e,outputIndex:parseInt(n,10)}}let A=class{constructor(t,e=new T){this.nodeConfig=t,this.bcn=new C(t.url,e)}get chain(){return this.nodeConfig.chain}get network(){return this.nodeConfig.network}getBalance(t){return m(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return yield this.bcn.get(`/v1/${e}/${n}/address/${t}/balance`)}))}getTransaction(t){return m(this,void 0,void 0,(function*(){return new B(yield this.getRawTx(t))}))}getRawTx(t){return m(this,void 0,void 0,(function*(){N(t);const{chain:e,network:n}=this;return this.bcn.get(`/v1/${e}/${n}/tx/${t}`)}))}getRawTxData(t){return m(this,void 0,void 0,(function*(){N(t);const{chain:e,network:n}=this;return this.bcn.get(`/v1/${e}/${n}/tx-data/${t}`)}))}getTransactions(t){return m(this,void 0,void 0,(function*(){return(yield this.getRawTxs(t)).map((t=>new B(t)))}))}getRawTxs(t){return m(this,void 0,void 0,(function*(){t.map(N);const{chain:e,network:n}=this;return this.bcn.post(`/v1/${e}/${n}/tx/bulk/`,{txIds:t})}))}sendTransaction(t){return m(this,void 0,void 0,(function*(){return this.bcn.post(`/v1/${this.chain}/${this.network}/tx/send`,{rawTx:t})}))}getUtxosFromAddress(t){return m(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return this.bcn.get(`/v1/${e}/${n}/wallet/${t.toString()}/utxos`)}))}postNonStandardUtxo(t){return m(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return this.bcn.post(`/v1/${e}/${n}/non-standard-utxo`,t)}))}getOwnedRevs(t){return m(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return this.bcn.get(`/v1/${e}/${n}/wallet/${t.toString()}/non-standard-utxos`)}))}queryRevs(t){return m(this,void 0,void 0,(function*(){const{publicKey:e,contractName:n,contractHash:r}=t;if(void 0===e&&void 0===n&&void 0===r)throw new Error("Filter parameter for queryRevs endpoint cannot be empty.");let s="";e&&(s+=`?publicKey=${e}`),n&&(s+=0===s.length?"?":"&",s+=`contractName=${n}`),r&&(s+=0===s.length?"?":"&",s+=`contractHash=${r}`);const{chain:o,network:i}=this;return this.bcn.get(`/v1/${o}/${i}/non-standard-utxos${s}`)}))}getLatestRev(t){return m(this,void 0,void 0,(function*(){R(t);const{chain:e,network:n}=this;const[{rev:r}]=yield this.bcn.get(`/v1/${e}/${n}/rev/${t}`);return r}))}getLatestRevs(t){return m(this,void 0,void 0,(function*(){t.map(R),t.map(R);const{chain:e,network:n}=this;return yield this.bcn.post(`/v1/${e}/${n}/revs`,{ids:t})}))}static getSecretOutput({_url:t,privateKey:e}){return m(this,void 0,void 0,(function*(){const n=t.split("/");const r=n[n.length-1];const s=n.slice(0,-2).join("/");const o=new C(s,e);return{host:s,data:yield o.get(`/v1/store/${r}`)}}))}static setSecretOutput({secretOutput:t,host:e,privateKey:n}){return m(this,void 0,void 0,(function*(){return new C(e,n).post("/v1/store/",t)}))}static deleteSecretOutput({_url:t,privateKey:e}){return m(this,void 0,void 0,(function*(){const n=t.split("/");const r=n[n.length-1];const s=n.slice(0,-2).join("/");const o=new C(s,e);yield o.delete(`/v1/store/${r}`)}))}};A=_([t=>t],A);const I=["_id","_rev","_owners","_amount","_readers","_url","__vouts","__func","__index","__args"];const $=t=>(Object.prototype.toString.call(t).match(/\s([a-zA-Z]+)/)||[])[1];const U=t=>"object"==typeof t?$(t):$(t).toLowerCase();const k=t=>["number","string","boolean","undefined","Null"].includes(U(t));const K=t=>"Array"===U(t);const D=t=>"Object"===U(t);const M=t=>k(t)||["Array","Object"].includes(U(t));const H=(t,e)=>{if(!M(t)||!M(e))throw new Error(`Unsupported data types for deep equals: ${U(t)} & ${U(e)}`);if(U(t)!==U(e))return!1;if(k(t)&&k(e))return t===e;const n=(t,e)=>Object.entries(t).every((([t,n])=>H(e[t],n)));return t&&e&&n(t,e)&&n(e,t)};const L=t=>{if(k(t))return t;if(K(t))return t.map(L);if(D(t)){const e=Object.keys(t).reduce(((e,n)=>(e[n]=L(t[n]),e)),{});const n=Object.create(Object.getPrototypeOf(t));return Object.assign(n,e)}throw new Error(`Unsupported data type for clone: ${U(t)}`)};const F=(t,e)=>Object.fromEntries(Object.entries(t).map((t=>e(t))));const W=(t,e)=>F(t,(([t,n])=>[t,e(n)]));const G=(t,e)=>Object.fromEntries(Object.entries(t).filter((t=>e(t))));const q=(t,e,n,r)=>{if(k(t))return t;if(K(t))return t.map((t=>q(t,e,n,r)));if(D(t)){t._rev=`${r}/${n}`;const s=e[n];return Object.entries(t).forEach((([n,o])=>{"object"==typeof s&&Object.keys(s).includes(n)&&(t[n]=q(o,e,s[n],r))})),t}throw new Error(`Unsupported type ${U(t)} in deep.updateRev`)};const J=(t,e)=>{if(k(t))return t;if(K(t))return t.map((t=>J(t,e)));if(D(t))return t._id=!t._id||t._id.startsWith("__temp__")?t._rev:t._id,t._root=t._root||e,Object.entries(t).forEach((([n,r])=>{t[n]=J(r,e)})),t;throw new Error(`Unsupported type ${U(t)} in deep.addId`)};const z=t=>{if(k(t))return t;if(K(t))return t.map((t=>z(t)));if(D(t)){const e=`__temp__/${Math.random()}`;return t._id=t._id||e,t._rev=t._rev||e,Object.values(t).map((t=>z(t))),t}throw new Error(`Unsupported type ${U(t)} in addRandomId`)};const Y=t=>{if(k(t))return t;if(K(t))return t.map((t=>Y(t)));if(D(t))return F(t,(([t,e])=>["_owners","_readers"].includes(t)?[t,JSON.stringify(e)]:k(e)?[t,e]:[t,Y(e)]));throw new Error(`Unexpected type ${U(t)} in stringifyOwners`)};const Z=t=>(t._owners&&(t._owners=JSON.parse(t._owners)),t._readers&&(t._readers=JSON.parse(t._readers)),t);const V=t=>{if(k(t))return t;if(K(t)||D(t))return Object.entries(t).reduce(((t,[e,n])=>{const r=V(n);return(t=>"Object"===U(t)&&Object.keys(t).every((t=>!Number.isNaN(parseInt(t,10)))))(r)?Object.entries(r).forEach((([n,r])=>{t[`${e}_${n}`]=r})):t[e]=r,t}),{});throw new Error(`Unsupported type ${U(t)} in encodeArraysAsObjects`)};const X=t=>{const e={[t._id]:Object.entries(t).reduce(((t,[e,n])=>I.includes(e)?Object.assign(Object.assign({},t),{[e]:n}):k(n)?Object.assign(Object.assign({},t),{[`__basic__${e}`]:n}):Object.assign(Object.assign({},t),{[e]:n._id})),{})};return Object.values(t).filter((t=>!k(t))).reduce(((t,e)=>Object.assign(Object.assign({},t),X(e))),e)};const Q=t=>G(t,(([t])=>!t.startsWith("__basic__")));const tt=(t,e)=>{const n=t[e];return n.__contains=Object.entries(n).reduce(((e,[n,r])=>["__contains",...I].includes(n)?e:"__change"===n?"new"===r||"diff"===r||e:tt(t,r)[r].__contains||e),!1),t};const et=(t,e)=>t.map((t=>Object.entries(t).reduce(((t,[n,r])=>{const s="string"==typeof r&&"undefined"!==U(e[r])?e[r]:r;return Object.assign(Object.assign({},t),{[n]:s})}),{})));class nt{constructor(t){this.db=t}get(t){return m(this,void 0,void 0,(function*(){const{txId:e,outputIndex:n}=P(t);const{inRevs:r,outData:s}=yield this.db.fromTxId(e);if(!Array.isArray(r)||!Array.isArray(s)||0===s.length)return;const o=s[0].__index||{};const i=s[o.obj].__cls||"";const c=s[o.obj].__func||"";const a=s[o.obj].__args||[];const u=yield Promise.all(Object.values(o).map((t=>{const e=r[t];return e?this.get(e):Promise.resolve({})})));const d=Object.keys(o).map(((t,e)=>[t,u[e]]));const l=Object.fromEntries(d);let h=l.obj;delete l.obj;const p=Object.entries(l).reduce(((t,[e,n])=>{const r=parseInt(e,10);return Number.isNaN(r)||(t[r]=n),t}),[]);const f=function(t,e){let n=0;return e.map((e=>"__"===e?t[n++]:e))}(p,a);let g;if("constructor"===c){const t=w(`(${i})`);h=O(t,f)}else g=y(h[c].bind(h),h,f);Object.entries(o).forEach((([t,n])=>{const r=parseInt(t,10);let o=p[r];"obj"===t?o=h:"res"===t&&(o=g),q(o,s,n,e)}));const v=h._root||`${e}/${o.obj}`;return J([g,h,...p],v),[...p,h,g][n]}))}}function rt(t){return{smartArgs:t.filter((t=>t._rev)),dumbArgs:t.map((t=>t._rev?"__":t))}}class st{constructor(t){this.db=t,st.proxyDepth=st.proxyDepth||0}static getUpdate(t){return m(this,void 0,void 0,(function*(){let e;let n;let r;let s;let o;let i;let c;if("Cls"in t){const{Cls:a}=t;const u=t.args||[];e=a.toString(),n=null,r=O(a,u),s=L(u),o=u,i=null,c=void 0}else{const{target:a,property:u,args:d}=t;e=null,n=L(a),r=a,s=L(d),o=d,i=u,this.proxyDepth+=1,c=y(a[u],a,o),this.proxyDepth-=1}const{smartArgs:a,dumbArgs:u}=rt(s);const{smartArgs:d}=rt(o);const l=Object.assign(Object.assign(Object.assign({},a),{obj:n}),{_id:"index"});const h=Object.assign(Object.assign(Object.assign({},d),{obj:r}),{_id:"index"});["Object","Array"].includes(U(c))&&(h.res=c);const[p,f,g]=((t,e)=>{const n=z(e);const r=n._id;const s=L(t);const o=L(n);const i=Y(s);const c=Y(o);const a=V(i);const u=V(c);const d=((t,e)=>F(e,(([e,n])=>{const r=t[e];var s;return n.__change=(s=r)?H(s,n)?"same":"diff":"new",[e,n]})))(X(a),X(u));const l=W(d,Q);const h=tt(l,r);const p=h[r];delete h[r];const f=W(h,(t=>t._rev));const g=(v=t=>t.__contains||Object.values(p).includes(t._id),G(h,(([,t])=>v(t))));var v;const _=Object.values(g);const[m,w]=(y=t=>"new"===t.__change,_.reduce((([t,e],n,r)=>y(n)?[[...t,n],e]:[t,[...e,n]]),[[],[]]));var y;const O=[...w,...m];const S=(t=>t.reduce(((t,e,n)=>Object.assign(Object.assign({},t),{[e._id]:n})),{}))(O);const x=et(O,S);const[j]=et([p],S);const E=w.map((t=>t._rev));const[C,...T]=((t,e)=>[e,...t].map((t=>{const e=b(t,["_id","_rev","__change","__contains"]);return G(e,(([t,e])=>I.includes(t)||"number"==typeof e))})))(x,j);return[E,T.map(Z).map((t=>Object.entries(t).reduce(((t,[e,n])=>Object.assign(Object.assign({},t),{[e]:f[n]||n})),{}))),C]})(l,h);void 0!==f[0]&&(f[0].__index=g);const v=g.obj;void 0!==f[v]&&(null!==e&&(f[v].__cls=e),f[v].__func=null===i?"constructor":String(i),f[v].__args=u);const _=g.res;return void 0!==f[_]&&"function Object() { [native code] }"!==c.constructor.toString()&&(f[_].__cls=c.constructor.toString()),[p,f,r,d,c,g]}))}allocate(t,e){return m(this,void 0,void 0,(function*(){const[n,r,s,o,,i]=yield st.getUpdate({Cls:t,args:e});const[c]=yield this.db.update(n,r);const{txId:a}=P(c);Object.entries(i).forEach((([t,e])=>{const n=parseInt(t,10);let i=o[n];"obj"===t&&(i=s),q(i,r,e,a)}));const u=`${a}/${i.obj}`;return J([s,...o],u),s}))}update(t,e,n){return m(this,void 0,void 0,(function*(){const[r,s,,o,i,c]=yield st.getUpdate({target:t,property:e,args:n});const[a]=yield this.db.update(r,s);const{txId:u}=P(a);Object.entries(c).forEach((([e,n])=>{const r=parseInt(e,10);let c=o[r];"obj"===e?c=t:"res"===e&&(c=i),q(c,s,n,u)}));const d="string"==typeof t._root?t._root:`${u}/${c.obj}`;return J([i,t,...o],d),i}))}get(t,e){return st.proxyDepth>0||"function"!=typeof t[e]?Reflect.get(t,e):(...n)=>this.update(t,e,n)}}const ot=process.env.CHAIN||"LTC";const ct=process.env.NETWORK||"testnet";const at=process.env.BCN_URL||"https://node.bitcoincomputer.io";const ut=parseInt(process.env.BC_DUST_LIMIT||"",10)||1546;const dt=parseInt(process.env.BC_DEFAULT_FEE||"",10)||2500;var lt={CHAIN:ot,NETWORK:ct,BCN_URL:at,MIN_NON_DUST_AMOUNT:ut,SCRIPT_CHUNK_SIZE:parseInt(process.env.BC_SCRIPT_CHUNK_SIZE||"",10)||479,DEFAULT_FEE:dt,SIGHASH_ALL:1,FEE_PER_KB:2e4,PUBLIC_KEY_SIZE:65,ANYONE_CAN_SPEND_SEED:"replace this seed",PASSPHRASE:"",ENCODING_LENGTH:3,ENCODING_NUMBER_LENGTH:3,MAX_PUBKEYS_PER_SCRIPT:3,OP_RETURN_SIZE:80};const{PublicKey:ht,crypto:pt}=t.Bitcoin;const{Point:ft}=pt;function gt(t){return Buffer.from(t,"hex").toString().replace(/\0/g,"")}function vt(t,e){return t.slice(e)+t.slice(0,e)}function bt(t,e,n){if(t.length*Math.log2(e)>53)throw new Error(`Input too large ${t.length} ${Math.log2(e)}`);if(![2,10,16].includes(e)||![2,10,16].includes(n))throw new Error("ToBase or FromBase invalid in covertNumber.");if(2===e&&t.length%8!=0)throw new Error("Binary strings must be byte aligned.");if(16===e&&t.length%2!=0)throw new Error("Hex strings must be of even length.");const r=parseInt(t,e).toString(n);return 2===n?r.padStart(8*Math.ceil(r.length/8),"0"):16===n?r.padStart(2*Math.ceil(r.length/2),"0"):r}function _t(t,e){const n=new RegExp(`.{1,${e}}`,"g");return t.match(n)||[]}function mt(t){return _t(t,2).map((t=>bt(t,16,2))).join("")}function wt(t){return _t(t,8).map((t=>bt(t,2,16))).join("")}function yt(t){return t.toString(16).padStart(lt.ENCODING_NUMBER_LENGTH,"0")}function Ot(t){return parseInt(t,16)}function St(t){if(62!==t.length)throw new Error("Input to hexToPublicKey must be of length 62");let e=!1;let n=0;let r;for(;!e;){if(n>=256)throw new Error("Something went wrong storing data");const s=n.toString(16).padStart(2,"0")+wt(vt(mt(t).padStart(64,"0"),n));try{r=ft.fromX(!1,s),e=!0}catch(t){n+=1}}if(!r)throw new Error("Something went wrong storing data");return new ht(r)}function xt(t){const e=t.point.getX().toString("hex").padStart(64,"0");const n=bt(e.slice(0,2),16,10);return wt((s=parseInt(n,10),(r=mt(e.slice(2))).slice(-s)+r.slice(0,-s)));var r,s}function jt(t,e){return`m/44'/${function(t,e){if("testnet"===e||"regtest"===e)return"1";if("BTC"===t)return"0";if("LTC"===t)return"2";if("DOGE"===t)return"3";if("BCH"===t)return"145";if("BSV"===t)return"236";throw new Error(`Unsupported chain ${t}`)}(t,e)}'/0'/0/0`}const{PublicKey:Et,Script:Ct}=t.Bitcoin;function Tt(t){if(t.length>lt.MAX_PUBKEYS_PER_SCRIPT)throw new Error("Too many owners");return function(t){const e=new Ct;return e.add("OP_1"),t.forEach((t=>{e.add(t)})),e.add(`OP_${t.length}`),e.add("OP_CHECKMULTISIG"),e}(t.map((t=>t.toBuffer())))}function Bt(t){return function(t){return t.chunks.filter((t=>t.buf)).map((t=>t.buf))}(t).map((t=>Et.fromBuffer(t)))}function Nt(t){return Buffer.from(h.default.SHA256(t).toString(),"hex").toString("hex").substr(0,4)}function Rt(t){return`${Nt(t)};${t}`}function Pt(t){const e=t.substr(0,4);const n=t.substr(5);if(!function(t,e){return Nt(t)===e}(n,e))throw new Error("Decryption failure");return n}function At(t){if(void 0!==t._readers){const{_readers:e,_url:n,_owners:r,_amount:s}=t,o=b(t,["_readers","_url","_owners","_amount"]);const i=function(t,e){const n=l.default.randomBytes(32).toString("hex");const r=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid secret");const n=Buffer.from(e,"hex").toString("binary");const r=Rt(t);return h.default.AES.encrypt(r,n).toString()}(t,n);const s=e.map((t=>function(t,e){if(!/^0[2-3][0-9a-f]{64}|04[0-9a-f]{128}$/.test(e))throw new Error("Invalid publicKey");const n=Rt(t);return p.encrypt(e,Buffer.from(n,"utf8")).toString("base64")}(n,t)));return{__cypher:r,__secrets:s}}(JSON.stringify(o),e);return void 0!==n&&(i._url=n),void 0!==r&&(i._owners=r),void 0!==s&&(i._amount=s),i}return t}const{Transaction:It}=t.Bitcoin;const{Output:$t}=It;const{UnspentOutput:Ut}=It;let kt=class{constructor(t,e,n){const r=new It(n);r.feePerKb(lt.FEE_PER_KB),this.nodeConfig=t,this.tx=r,this.outData=[],this.privateKey=e}get txId(){return this.tx.id}get chain(){return this.nodeConfig.chain}get network(){return this.nodeConfig.network}get restClient(){return new A(this.nodeConfig,this.privateKey)}get inputs(){return this.tx.inputs.map((t=>`${t.prevTxId.toString("hex")}/${t.outputIndex}`))}get inRevs(){const{enc:t}=this;let[e]=t;return e=Number.isFinite(e)?e:0,this.tx.inputs.slice(0,e).map((({prevTxId:t,outputIndex:e})=>`${t.toString("hex")}/${e}`))}get outRevs(){const{enc:t}=this;let[,e]=t;return e=Number.isFinite(e)?e:0,Array.from(Array(e).keys()).map((t=>`${this.tx.id}/${t}`))}get opReturns(){try{const{outputs:t}=this.tx;return t.filter((({script:t})=>t.isDataOut())).map((({script:t})=>t.getData())).map((t=>t.toString())).join()}catch(t){return""}}get enc(){return _t(this.opReturns.slice(0,lt.ENCODING_LENGTH*lt.ENCODING_NUMBER_LENGTH),lt.ENCODING_NUMBER_LENGTH).map(Ot)}get dataPrefix(){return this.opReturns.slice(9)}getOwnerOutputs(){const{enc:t}=this;const[,e=0]=t;return this.tx.outputs.slice(0,e)}getDataOutputs(){const{enc:t}=this;const[,e,n]=t;return this.tx.outputs.slice(e,n)}getOutData(t){return m(this,void 0,void 0,(function*(){try{const e=this.getDataOutputs().map((t=>t.script)).map((t=>Bt(t))).flat().map(xt).map(gt).join("");const{dataPrefix:n}=this;const r=JSON.parse(n+e);const s=t.toBuffer().toString("hex");const o=this.getOwnerOutputs();if(o.length!==r.length)throw new Error("Inconsistent state");const i=o.map(((t,e)=>Object.assign(Object.assign({},r[e]),{_owners:Bt(t.script).map((t=>t.toString())),_amount:t.satoshis})));return Promise.all(i.map((e=>m(this,void 0,void 0,(function*(){try{const n=yield function(t){return e=>m(this,void 0,void 0,(function*(){if(function(t){return void 0!==t._url}(e)){const{_url:n}=e,r=b(e,["_url"]);const{host:s,data:o}=yield A.getSecretOutput({_url:n,privateKey:t});return Object.assign(Object.assign(Object.assign({},r),JSON.parse(o)),{_url:s})}return e}))}(t)(e);return function(t,e){if(function(t){return void 0!==t.__cypher&&void 0!==t.__secrets}(t)){const{__cypher:n,__secrets:r}=t,s=b(t,["__cypher","__secrets"]);return Object.assign(Object.assign(Object.assign({},s),JSON.parse(function({__cypher:t,__secrets:e},n){let r="";if(n.forEach((n=>{e.forEach((e=>{try{const s=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid privateKey");return Pt(p.decrypt(e,Buffer.from(t,"base64")).toString("utf8"))}(e,n);r=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid secret");const n=Buffer.from(e,"hex").toString("binary");return Pt(h.default.AES.decrypt(t,n).toString(h.default.enc.Utf8))}(t,s)}catch(t){const e=["Decryption failure","Unsupported state or unable to authenticate data"];if(t instanceof Error&&!e.includes(t.message))throw t}}))})),r)return r;throw new Error("Decryption failure")}({__cypher:n,__secrets:r},e))),{_readers:[]})}return t}(n,[s])}catch(t){return null}})))))}catch(t){return[]}}))}getOwners(){return this.getOwnerOutputs().map((t=>Bt(t.script).map((t=>t.toString()))))}getAmounts(){return this.getOwnerOutputs().map((t=>t.satoshis))}spendFromData(e){return m(this,void 0,void 0,(function*(){if(!e.length)return;const n=e.map(P);const r=n.map((t=>t.txId));const s=yield this.restClient.getTransactions(r);for(let e=0;e<n.length;e+=1){const{txId:r,outputIndex:o}=n[e];const{outputs:i}=s[e];const c=i[o];const a=Math.round(c.satoshis);const u=new t.Bitcoin.Script(c.script);const d=new Ut({txId:r,outputIndex:o,satoshis:a,script:u});const l=Bt(u).map((t=>t.toString()));this.tx.from([d],l,1)}}))}createOpReturnOut(t){this.tx.addData(JSON.stringify(t))}createDataOuts(e){e.forEach((({_amount:e,_owners:n=[]})=>{if(Array.isArray(n)&&n.length>lt.MAX_PUBKEYS_PER_SCRIPT)throw new Error("Too many owners.");const r=n.map((e=>t.Bitcoin.PublicKey.fromString(e)));const s=e||lt.MIN_NON_DUST_AMOUNT;const o=Tt(r);this.tx.addOutput(new $t({script:o,satoshis:s}))}));const n=e.map((t=>b(t,["_amount","_owners"])));const r=lt.MIN_NON_DUST_AMOUNT;const s=JSON.stringify(n);const o=lt.OP_RETURN_SIZE-lt.ENCODING_LENGTH*lt.ENCODING_NUMBER_LENGTH;const i=s.slice(0,o);const c=function(t){var e;return function(t,e){const n=[];for(let r=0;r<t.length;r+=e)n.push(t.slice(r,r+e));return n}(_t((e=t,Buffer.from(e).toString("hex")),62).map((t=>t.padStart(62,"0"))).map(St),lt.MAX_PUBKEYS_PER_SCRIPT).map((t=>Tt(t)))}(s.slice(o));const a=yt(this.tx.inputs.length)+yt(this.tx.outputs.length)+yt(this.tx.outputs.length+c.length);c.forEach((t=>{this.tx.addOutput(new $t({script:t,satoshis:r}))})),this.tx.addData(a+i)}static fromTxHex(t,e,n){return m(this,void 0,void 0,(function*(){const r=new this(e,n);r.tx.fromString(t);const s=yield r.getOutData(n);const o=r.getOwners();const i=r.getAmounts();return r.outData=s.map(((t,e)=>Object.assign(Object.assign({},t),{_owners:o[e],_amount:i[e]}))),r}))}static fromTxId(t,e,n){return m(this,void 0,void 0,(function*(){const r=new A(e,n);const s=yield r.getRawTx(t);return this.fromTxHex(s,e,n)}))}};kt=_([t=>t],kt);class Kt{constructor(t){this.wallet=t}get chain(){return this.wallet.chain}get network(){return this.wallet.network}get nodeConfig(){return this.wallet.nodeConfig}fromTxHex(t){return m(this,void 0,void 0,(function*(){const{wallet:e,nodeConfig:n}=this;const r=e.getPrivateKey();return kt.fromTxHex(t,n,r)}))}fromTxId(t){return m(this,void 0,void 0,(function*(){const{wallet:e,nodeConfig:n}=this;const r=new A(n,e.getPrivateKey());const s=yield r.getRawTx(t);return this.fromTxHex(s)}))}get(t){return m(this,void 0,void 0,(function*(){const e=t.map(P);return Promise.all(e.map((({txId:t,outputIndex:e})=>m(this,void 0,void 0,(function*(){const{outData:n}=yield this.fromTxId(t);if(e>n.length)throw new Error("Index out of bounds");return n[e]})))))}))}put(t){return this.update([],t)}createTx(t,e){return m(this,void 0,void 0,(function*(){const{wallet:n,nodeConfig:r}=this;const s=n.getPrivateKey();const o=new kt(r,s);const i=e.map((t=>{var{_owners:e}=t,n=b(t,["_owners"]);return Object.assign({_owners:e||[this.wallet.getPublicKey().toString()]},n)})).map(At);const c=yield Promise.all(i.map(function(t){return e=>m(this,void 0,void 0,(function*(){if(void 0!==e._url){const{_url:n,_owners:r,_amount:s}=e,o=b(e,["_url","_owners","_amount"]);const i=yield A.setSecretOutput({host:n,secretOutput:{data:JSON.stringify(o)},privateKey:t});return void 0!==r&&(i._owners=r),void 0!==s&&(i._amount=s),i}return e}))}(s)));return yield o.spendFromData(t),yield o.createDataOuts(c),o}))}update(t,e){return m(this,void 0,void 0,(function*(){const n=yield this.createTx(t,e);return yield this.wallet.fundAndSendTransaction(n),n.outRevs}))}}class Dt{constructor(t,e,n={}){const{chain:r,network:s}=e;const{path:o=jt(r,s),passphrase:i=""}=n;let c=t.toHDPrivateKey(i,s);o&&(c=c.derive(o));const a=c.publicKey.toAddress(s);this.mnemonic=t,this.restClient=e,this.path=o,this.passphrase=i,this.hdPrivateKey=c,this.address=a}get chain(){return this.restClient.chain}get network(){return this.restClient.network}get nodeConfig(){return this.restClient.nodeConfig}getMnemonic(){return this.mnemonic}derive(t="0"){const e=`${this.path}${this.path.length>0?"/":""}${t}`;return new Dt(this.mnemonic,this.restClient,{path:e})}getPrivateKey(){return this.hdPrivateKey.privateKey}getPublicKey(){return this.hdPrivateKey.publicKey}getAddress(){return this.address}getBalance(){return m(this,void 0,void 0,(function*(){return this.restClient.getBalance(this.getAddress())}))}getUtxos(t=this.getAddress()){return m(this,void 0,void 0,(function*(){return this.restClient.getUtxosFromAddress(t)}))}selectUtxos(t,e){let n=0;const r=[];!function(t){const e=t;for(let t=e.length-1;t>0;t-=1){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}}(t);for(let s=0;s<t.length;s+=1){const o=t[s];if(n+=1e8*o.amount,r.push(o),n>=e)return r}const{network:s,chain:o}=this.restClient.nodeConfig;throw new Error(`Insufficient balance in address ${this.getAddress().toString()} on ${s} ${o}. Found ${n}, required ${e}.`)}fundAndSendTransaction(e){return m(this,void 0,void 0,(function*(){e.tx.feePerKb(lt.FEE_PER_KB);const{chain:n,network:r}=this.nodeConfig;const s=e.tx._estimateFee()*function(t){if("LTC"===t)return 1;if("BTC"===t)return.01;if("DOGE"===t)return.3;if("BCH"===t)return 1;throw new Error(`Unsupported chain ${t}`)}(n);const o=.001*e.tx._getOutputAmount();const i=Math.max(lt.MIN_NON_DUST_AMOUNT,s+o);e.tx.to(function(t,e){const n={"any-testnet":"gLjNGbKQzxqKA9bv2nhn1Ewf7rxYVXgrtR","BTC-mainnet":"84ZHRqRPTcUv6AFGMVC1KmSUeC9Y8SNfMm","LTC-mainnet":"mov5ivrsqWut5ffZhiz18uAkwy2D4y98iz","DOGE-mainnet":"1MVukPYmWdbEoxy3Sqq1ES4nYqDfpB5e68","BCH-mainnet":"P9CmJszhvARfQc8YjUW1K2oBnus1ZQWEqk","BSV-mainnet":"G2wxQ74zX48WMo7sfiX1faGGNQB8ebVth"};return vt("testnet"===e||"regtest"===e?n["any-testnet"]:n[`${t}-${e}`],19)}(n,r),Math.round(i));let c=e.tx._getInputAmount();const a=e.tx._getOutputAmount();const u=e.tx._estimateFee();let d=a-c+Math.round(u);for(;d>0;){const n=yield this.getUtxos(this.getAddress());this.selectUtxos(n,d).forEach((n=>{e.tx.from([new t.Bitcoin.Transaction.UnspentOutput(n)])})),c=e.tx._getInputAmount(),d=a-c+Math.round(e.tx._estimateFee())}e.tx.change(this.getAddress()),e.tx.sign(this.getPrivateKey(),lt.SIGHASH_ALL);const l=yield this.restClient.sendTransaction(e.tx.toString());return yield this.storeResult(l,e),l}))}storeResult(t,e){return m(this,void 0,void 0,(function*(){const{inputs:n,inRevs:r,outRevs:s}=e;const o=yield e.getOutData(this.getPrivateKey());const i=JSON.stringify(o);yield this.restClient.postNonStandardUtxo({outData:i,txId:t,inputs:n,inRevs:r,outRevs:s})}))}send(t,e){return m(this,void 0,void 0,(function*(){const n=new kt(this.restClient.nodeConfig,this.getPrivateKey());return n.tx.to(e,t),this.fundAndSendTransaction(n)}))}}class Mt extends class{constructor(t,e){this.chain=t,this.network=e}}{constructor(t,e,n){super(t,e),this.url=n}}const{Mnemonic:Ht,PublicKey:Lt}=t.Bitcoin;var Ft=f.default;var Wt=g.default;var Gt=v.default;function qt(t){"string"==typeof t&&(t=function(t){var e=Gt.parse(t);var n=e.hostname;var r=parseInt(e.port,10);var s=e.protocol;s=s.substring(0,s.length-1);var o=e.auth.split(":");return{host:n,port:r,protocol:s,user:o[0]?decodeURIComponent(o[0]):null,pass:o[1]?decodeURIComponent(o[1]):null}}(t)),t=t||{},this.host=t.host||"127.0.0.1",this.port=t.port||8332,this.user=t.user||"user",this.pass=t.pass||"pass",this.protocol="http"===t.protocol?Ft:Wt,this.batchedCalls=null,this.disableAgent=t.disableAgent||!1;var e=void 0!==t.rejectUnauthorized;this.rejectUnauthorized=!e||t.rejectUnauthorized,qt.config.log?this.log=qt.config.log:this.log=qt.loggers[qt.config.logger||"normal"]}var Jt=console.log.bind(console);var zt=function(){};function Yt(t,e){var n=this;t=JSON.stringify(t);var r=this.user+":"+this.pass;var s=Buffer.from&&Buffer.from!==Uint8Array.from?Buffer.from(r):new Buffer(r);this.auth=s.toString("base64");var o={host:n.host,path:"/",method:"POST",port:n.port,rejectUnauthorized:n.rejectUnauthorized,agent:!n.disableAgent&&void 0};if(n.httpOptions)for(var i in n.httpOptions)o[i]=n.httpOptions[i];var c=!1;var a="Bitcoin JSON-RPC: ";var u=this.protocol.request(o,(function(t){var r="";t.on("data",(function(t){r+=t})),t.on("end",(function(){if(!c)if(c=!0,401!==t.statusCode)if(403!==t.statusCode){if(500===t.statusCode&&"Work queue depth exceeded"===r.toString("utf8")){var s=new Error("Bitcoin JSON-RPC: "+r.toString("utf8"));return s.code=429,void e(s)}var o;try{o=JSON.parse(r)}catch(s){n.log.err(s.stack),n.log.err(r),n.log.err("HTTP Status code:"+t.statusCode);var i=new Error(a+"Error Parsing JSON: "+s.message);return void e(i)}e(o.error,o)}else e(new Error(a+"Connection Rejected: 403 Forbidden"));else e(new Error(a+"Connection Rejected: 401 Unnauthorized"))}))}));u.on("error",(function(t){var n=new Error(a+"Request Error: "+t.message);c||(c=!0,e(n))})),u.setHeader("Content-Length",t.length),u.setHeader("Content-Type","application/json"),u.setHeader("Authorization","Basic "+n.auth),u.write(t),u.end()}qt.loggers={none:{info:zt,warn:zt,err:zt,debug:zt},normal:{info:Jt,warn:Jt,err:Jt,debug:zt},debug:{info:Jt,warn:Jt,err:Jt,debug:Jt}},qt.config={logger:"normal"},qt.prototype.batch=function(t,e){this.batchedCalls=[],t(),Yt.call(this,this.batchedCalls,e),this.batchedCalls=null},qt.callspec={abandonTransaction:"str",abortRescan:"",addMultiSigAddress:"",addNode:"",analyzePSBT:"str",backupWallet:"",bumpFee:"str",clearBanned:"",combinePSBT:"obj",combineRawTransaction:"obj",convertToPSBT:"str",createMultiSig:"",createPSBT:"obj",createRawTransaction:"obj obj",createWallet:"str",decodePSBT:"str",decodeScript:"str",decodeRawTransaction:"",deriveAddresses:"str",disconnectNode:"",dumpPrivKey:"",dumpWallet:"str",encryptWallet:"",enumerateSigners:"",estimateFee:"",estimateSmartFee:"int str",estimatePriority:"int",generate:"int",generateBlock:"str obj",generateToAddress:"int str",generateToDescriptor:"int str",getAccount:"",getAccountAddress:"str",getAddedNodeInfo:"",getAddressMempool:"obj",getAddressUtxos:"obj",getAddressBalance:"obj",getAddressDeltas:"obj",getAddressesByLabel:"str",getAddressInfo:"str",getAddressTxids:"obj",getAddressesByAccount:"",getBalance:"str int",getBalances:"",getBestBlockHash:"",getBlockDeltas:"str",getBlock:"str int",getBlockchainInfo:"",getBlockCount:"",getBlockFilter:"str",getBlockHashes:"int int obj",getBlockHash:"int",getBlockHeader:"str",getBlockNumber:"",getBlockStats:"str",getBlockTemplate:"",getConnectionCount:"",getChainTips:"",getChainTxStats:"",getDescriptorInfo:"str",getDifficulty:"",getGenerate:"",getHashesPerSec:"",getIndexInfo:"",getInfo:"",getMemoryInfo:"",getMemoryPool:"",getMemPoolAncestors:"str",getMemPoolDescendants:"str",getMemPoolEntry:"str",getMemPoolInfo:"",getMiningInfo:"",getNetTotals:"",getNetworkHashPS:"",getNetworkInfo:"",getNewAddress:"str str",getNodeAddresses:"",getPeerInfo:"",getRawChangeAddress:"",getRawMemPool:"bool",getRawTransaction:"str int",getReceivedByAccount:"str int",getReceivedByAddress:"str int",getReceivedByLabel:"str",getRpcInfo:"",getSpentInfo:"obj",getTransaction:"",getTxOut:"str int bool",getTxOutProof:"",getTxOutSetInfo:"",getUnconfirmedBalance:"",getWalletInfo:"",getWork:"",getZmqNotifications:"",finalizePSBT:"str",fundRawTransaction:"str",help:"",importAddress:"str str bool",importDescriptors:"str",importMulti:"obj obj",importPrivKey:"str str bool",importPrunedFunds:"str, str",importPubKey:"str",importWallet:"str",invalidateBlock:"str",joinPSBTs:"obj",keyPoolRefill:"",listAccounts:"int",listAddressGroupings:"",listBanned:"",listDescriptors:"",listLabels:"",listLockUnspent:"bool",listReceivedByAccount:"int bool",listReceivedByAddress:"int bool",listReceivedByLabel:"",listSinceBlock:"str int",listTransactions:"str int int",listUnspent:"int int",listWalletDir:"",listWallets:"",loadWallet:"str",lockUnspent:"",logging:"",move:"str str float int str",ping:"",preciousBlock:"str",prioritiseTransaction:"str float int",pruneBlockChain:"int",psbtBumpFee:"str",removePrunedFunds:"str",reScanBlockChain:"",saveMemPool:"",send:"obj",setHDSeed:"",setLabel:"str str",setWalletFlag:"str",scanTxOutSet:"str",sendFrom:"str str float int str str",sendMany:"str obj int str",sendRawTransaction:"str",sendToAddress:"str float str str",setAccount:"",setBan:"str str",setNetworkActive:"bool",setGenerate:"bool int",setTxFee:"float",signMessage:"",signMessageWithPrivKey:"str str",signRawTransaction:"",signRawTransactionWithKey:"str obj",signRawTransactionWithWallet:"str",stop:"",submitBlock:"str",submitHeader:"str",testMemPoolAccept:"obj",unloadWallet:"",upgradeWallet:"",uptime:"",utxoUpdatePSBT:"str",validateAddress:"",verifyChain:"",verifyMessage:"",verifyTxOutProof:"str",walletCreateFundedPSBT:"",walletDisplayAddress:"str",walletLock:"",walletPassPhrase:"string int",walletPassphraseChange:"",walletProcessPSBT:"str"};var Zt=function(t,e,n){return Array.prototype.slice.call(t,e,n)};function Vt(){return parseInt(1e5*Math.random())}!function(t,e,n){function r(t,e){return function(){var r=arguments.length-1;this.batchedCalls&&(r=arguments.length);for(var s=0;s<r;s++)e[s]&&(arguments[s]=e[s](arguments[s]));this.batchedCalls?this.batchedCalls.push({jsonrpc:"2.0",method:t,params:Zt(arguments),id:Vt()}):n.call(this,{method:t,params:Zt(arguments,0,arguments.length-1),id:Vt()},arguments[arguments.length-1])}}var s={str:function(t){return t.toString()},int:function(t){return parseFloat(t)},float:function(t){return parseFloat(t)},bool:function(t){return!0===t||"1"==t||"true"==t||"true"==t.toString().toLowerCase()},obj:function(t){return"string"==typeof t?JSON.parse(t):t}};for(var o in e){var i=[];if(e[o].length){i=e[o].split(" ");for(var c=0;c<i.length;c++)s[i[c]]?i[c]=s[i[c]]:i[c]=s.str}var a=o.toLowerCase();t.prototype[o]=r(a,i),t.prototype[a]=t.prototype[o]}}(qt,qt.callspec,Yt);const Xt=["travel upgrade inside soda birth essence junk merit never twenty system opinion","hover harsh text dice wealth pill across trade soccer olive view acquire","damp comfort scan couple absurd enter slogan cheap ketchup print syrup hurdle one document diamond","notable rose silver indicate wreck mean raise together jar fish seat air","lens release coil rain forward lemon cube satisfy inject visa ring segment"];const{CHAIN:Qt="LTC",NETWORK:te="regtest",RPC_USER:ee,RPC_PASSWORD:ne,RPC_HOST:re}=process.env;const se="LTC"===process.env.CHAIN?19332:8332;var oe=Object.assign(Object.assign({},lt),{CHAIN:Qt,NETWORK:te,BCN_URL:"http://127.0.0.1:3000",RPC_PROTOCOL:"http",RPC_USER:ee,RPC_PASSWORD:ne,RPC_HOST:re,RPC_PORT:se,TEST_ADDRESSES:"moMoH1vTgCc2dkDfGSKYPnafxy22wSqgrr;mmQEk8VwtSehRryLF8jhVapYg553hJGhNa;miKQVhZbFKSsJcQZ8eXwBQ89xNyetpN34q;mzoGRNh55y9j57TPdwRGi3nt9X4CFwpqUS;n1X6JFDyxibtdhYrc7mrkuft6o168ELFNW;mjLcig6eTZVJkgRgJFMkwrYHpfMnZ1t4kk;mfYkMQAe7afeRSkgLxAtwnMVryjLTfr95Q"});const{PrivateKey:ie,Opcode:ce,Script:ae,Mnemonic:ue,crypto:de,Transaction:le,encoding:he}=t.Bitcoin;new Mt(oe.CHAIN,oe.NETWORK,oe.BCN_URL);const pe={mnemonic:function(t=0){return new ue(Xt[t])}(1),chain:oe.CHAIN,network:oe.NETWORK,path:""};const fe=new class{constructor(t={}){var e,n;const{seed:r}=t;const s=(null===(e=t.chain)||void 0===e?void 0:e.toUpperCase())||lt.CHAIN;const o=(null===(n=t.network)||void 0===n?void 0:n.toLowerCase())||lt.NETWORK;const i=t.url||lt.BCN_URL;const c=t.passphrase||lt.PASSPHRASE;const a=t.path||jt(s,o);const u=t.mnemonic||new Ht(r);if(!s||!["BTC","LTC","DOGE","BCH","BSV"].includes(s.toUpperCase()))throw new Error("We are currently only supporting 'BTC', 'LTC', 'DOGE', 'BCH', and 'BSV'");if(!o||!["mainnet","testnet","regtest"].includes(o.toLowerCase()))throw new Error("Please set 'network' to 'testnet', or 'regtest'");const d=((t,e,n={})=>{const{path:r,passphrase:s}=n;let o=t.toHDPrivateKey(s,e);return r&&(o=o.derive(r)),o.privateKey})(u,o,{path:a,passphrase:c});const l=new Mt(s,o,i);const h=new A(l,d);this.db=t.db||new Kt(new Dt(u,h,{path:a,passphrase:c}))}get chain(){return this.db.chain}get network(){return this.db.network}parseContract(t){const e=t.startsWith("export ")?t.slice(7):t;const n=e.startsWith("default ")?e.slice(8):e;return w(`(${n})`)}new(t,e){return m(this,void 0,void 0,(function*(){const n=t.toString();const r=yield this.parseContract(n);const s=new st(this.db);const o=yield s.allocate(r,e);return new Proxy(o,s)}))}sync(t){return m(this,void 0,void 0,(function*(){R(t);const e=new nt(this.db);const n=new st(this.db);const r=yield e.get(t);return new Proxy(r,n)}))}getOwnedRevs(t=this.db.wallet.getPublicKey()){return this.db.wallet.restClient.getOwnedRevs(t)}queryRevs(t){return m(this,void 0,void 0,(function*(){const{publicKey:e,contractName:n,contractHash:r}=t;const s=e?new Lt(e):void 0;return this.db.wallet.restClient.queryRevs({publicKey:s,contractName:n,contractHash:r})}))}getRevs(t=this.db.wallet.getPublicKey()){return m(this,void 0,void 0,(function*(){return(yield this.getOwnedRevs(t)).map((({rev:t})=>t))}))}getLatestRev(t){return m(this,void 0,void 0,(function*(){return this.db.wallet.restClient.getLatestRev(t)}))}getLatestRevs(t){return m(this,void 0,void 0,(function*(){return this.db.wallet.restClient.getLatestRevs(t)}))}}(pe);const ge=t=>{const[e,n]=t.split("/");const r=parseFloat(n);return[64,65].includes(e.length)&&!Number.isNaN(r)&&Number.isFinite(r)};describe("App",(()=>{describe("Should work for a token",(()=>{class t{constructor(t,e,n){this.coins=e,this._owners=[t],this.name=n}send(e,n,r){if(this.coins<e)throw new Error;return this.coins-=e,new t(n,e,r)}}let e=null;let n=null;let r=!1;const s=fe.db.wallet.getPublicKey().toString();beforeAll((()=>m(void 0,void 0,void 0,(function*(){e=e||(yield fe.new(t,[s,10,"T"])),r||(n=yield e.send(2,"028df471f7539662dacb98bc409785ebee1c7e1147c6529d1175a2a5c3674699e8"),r=!0)}))),1e4),it("Should set the number of coins",(()=>m(void 0,void 0,void 0,(function*(){expect(e).toEqual({coins:8,name:expect.any(String),_owners:[expect.any(String)],_id:expect.any(String),_rev:expect.any(String),_root:expect.any(String)}),expect(n).toEqual({coins:2,_owners:[expect.any(String)],_id:expect.any(String),_rev:expect.any(String),_root:expect.any(String)})})))),it("should set the location",(()=>m(void 0,void 0,void 0,(function*(){expect(ge(e._id)).toBe(!0),expect(ge(e._rev)).toBe(!0),expect(ge(e._root)).toBe(!0),expect(ge(n._id)).toBe(!0),expect(ge(n._rev)).toBe(!0),expect(ge(n._root)).toBe(!0),expect(e._id).not.toBe(e._rev),expect(e._id).toBe(e._root),expect(n._id).toBe(n._rev),expect(n._id).not.toBe(n._root),expect(n._root).toBe(e._root)}))))}))}));
