var t=function(t,e,n,r,s,o){"use strict";function i(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}function c(t){if(t&&t.__esModule)return t;var e=Object.create(null);return t&&Object.keys(t).forEach((function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:function(){return t[n]}})}})),e.default=t,Object.freeze(e)}var a=i(n);var u=i(r);var d=i(s);var h=c(o);
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function l(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]])}return n}function f(t,e,n,r){var s,o=arguments.length,i=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i}function p(t,e,n,r){return new(n||(n=Promise))((function(s,o){function i(t){try{a(r.next(t))}catch(t){o(t)}}function c(t){try{a(r.throw(t))}catch(t){o(t)}}function a(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,c)}a((r=r.apply(t,e||[])).next())}))}const v=(t,n)=>{const r=Date.now();const s=e.crypto.Hash.sha256(Buffer.from(n+r));const o=[e.crypto.ECDSA.sign(s,t,"big").toString("hex"),t.publicKey.toString(),r];return`Bearer ${Buffer.from(o.join(":")).toString("base64")}`};const g=(t,e,n={})=>{const{path:r="m/44'/0'/0'/0",passphrase:s=""}=n;let o=t.toHDPrivateKey(s,e);return r&&(o=o.derive(r)),o.privateKey};function _(t){try{const n=JSON.parse(t);if("object"!=typeof n)throw new Error("Invalid object");if("string"!=typeof n.txhex)throw new Error("Invalid object");return new e.Transaction(n.txhex)}catch(t){return null}}function b(t){return void 0!==t.config}function w(t){return p(this,void 0,void 0,(function*(){if(!b(t))throw new Error("Unknown error");const{message:e,config:n,response:r}=t;const s=_(null==n?void 0:n.data);const o=`message\t${e}`;const i=`request\t${null==n?void 0:n.method} ${null==n?void 0:n.url}`;const c=s?`transaction\t ${JSON.stringify(s.toJSON(),null,2)}`:"";const a="post"===(null==n?void 0:n.method)?`data\t${null==n?void 0:n.data}`:"";const u=r?`response\t${JSON.stringify(r.data)}`:"";const d=s?c:a;throw t.message=`\n    Communication Error\n    ${o}\n    ${i}\n    ${d}\n    ${u}`,t}))}class y{constructor(t,e={},n){this.baseUrl=t,this.headers=e,this.privateKey=n}get(t){return p(this,void 0,void 0,(function*(){const e=`${this.baseUrl}${t}`;try{let t={};return this.privateKey&&(t={Authentication:v(this.privateKey,this.baseUrl)}),(yield a.default.get(e,{headers:Object.assign(Object.assign({},this.headers),t)})).data}catch(t){return w(t)}}))}post(t,e){return p(this,void 0,void 0,(function*(){const n=`${this.baseUrl}${t}`;try{let t={};return this.privateKey&&(t={Authentication:v(this.privateKey,this.baseUrl)}),(yield a.default.post(n,e,{headers:Object.assign(Object.assign({},this.headers),t)})).data}catch(t){return w(t)}}))}delete(t){return p(this,void 0,void 0,(function*(){const e=`${this.baseUrl}${t}`;try{let t={};return this.privateKey&&(t={Authentication:v(this.privateKey,this.baseUrl)}),(yield a.default.delete(e,{headers:Object.assign(Object.assign({},this.headers),t)})).data}catch(t){return w(t)}}))}}function m(t){return void 0!==t._url}function O(t){return void 0!==t.__cypher&&void 0!==t.__secrets}const x=()=>t=>t;function S(t){if(!/^[0-9A-Fa-f]{64}$/.test(t))throw new Error(`Invalid txId: ${t}`)}function j(t){if(!/^[0-9A-Fa-f]{64}:\d+$/.test(t))throw new Error(`Invalid outId: ${t}`)}function $(t){j(t);const[e,n]=t.split(":");return{txId:e,outIndex:parseInt(n,10)}}let I=class{constructor(t,n=new e.PrivateKey){this.nodeConfig=t,this.bbs=new y(t.url,{},n)}get chain(){return this.nodeConfig.chain}get network(){return this.nodeConfig.network}getBalance(t){return p(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return yield this.bbs.get(`/v1/${e}/${n}/address/${t}/balance`)}))}getTransaction(t){return p(this,void 0,void 0,(function*(){return new e.Transaction(yield this.getRawTx(t))}))}getRawTx(t){return p(this,void 0,void 0,(function*(){S(t);const{chain:e,network:n}=this;return this.bbs.get(`/v1/${e}/${n}/tx/${t}`)}))}getRawTxData(t){return p(this,void 0,void 0,(function*(){S(t);const{chain:e,network:n}=this;return this.bbs.get(`/v1/${e}/${n}/tx-data/${t}`)}))}getTransactions(t){return p(this,void 0,void 0,(function*(){return(yield this.getRawTxs(t)).map((t=>new e.Transaction(t)))}))}getRawTxs(t){return p(this,void 0,void 0,(function*(){t.map(S);const{chain:e,network:n}=this;return this.bbs.post(`/v1/${e}/${n}/tx/bulk/`,{txIds:t})}))}sendTransaction(t){return p(this,void 0,void 0,(function*(){return this.bbs.post(`/v1/${this.chain}/${this.network}/tx/send`,{rawTx:t})}))}getUtxosFromAddress(t){return p(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return this.bbs.get(`/v1/${e}/${n}/wallet/${t.toString()}/utxos`)}))}postOutData(t){return p(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return this.bbs.post(`/v1/${e}/${n}/out-data`,t)}))}getOutData(t){return p(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return this.bbs.get(`/v1/${e}/${n}/out-data/${t}`)}))}getOwnedRevs(t){return p(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return this.bbs.get(`/v1/${e}/${n}/wallet/${t.toString()}/non-standard-utxos`)}))}queryRevs(t){return p(this,void 0,void 0,(function*(){const{publicKey:e,contractName:n,contractHash:r}=t;if(void 0===e&&void 0===n&&void 0===r)throw new Error("Filter parameter for queryRevs endpoint cannot be empty.");let s="";e&&(s+=`?publicKey=${e}`),n&&(s+=0===s.length?"?":"&",s+=`contractName=${n}`),r&&(s+=0===s.length?"?":"&",s+=`contractHash=${r}`);const{chain:o,network:i}=this;return this.bbs.get(`/v1/${o}/${i}/non-standard-utxos${s}`)}))}getLatestRev(t){return p(this,void 0,void 0,(function*(){j(t);const{chain:e,network:n}=this;const[{rev:r}]=yield this.bbs.get(`/v1/${e}/${n}/rev/${t}`);return r}))}getLatestRevs(t){return p(this,void 0,void 0,(function*(){t.map(j),t.map(j);const{chain:e,network:n}=this;return yield this.bbs.post(`/v1/${e}/${n}/revs`,{ids:t})}))}static getSecretOutput({_url:t,privateKey:e}){return p(this,void 0,void 0,(function*(){const n=t.split("/");const r=n[n.length-1];const s=n.slice(0,-2).join("/");const o=new y(s,{},e);return{host:s,data:yield o.get(`/v1/store/${r}`)}}))}static setSecretOutput({secretOutput:t,host:e,privateKey:n}){return p(this,void 0,void 0,(function*(){return new y(e,{},n).post("/v1/store/",t)}))}static deleteSecretOutput({_url:t,privateKey:e}){return p(this,void 0,void 0,(function*(){const n=t.split("/");const r=n[n.length-1];const s=n.slice(0,-2).join("/");const o=new y(s,{},e);yield o.delete(`/v1/store/${r}`)}))}};I=f([x()],I);const C=()=>`__temp__:${Math.random()}`;const E=["_id","_rev","_owners","_amount","_readers","_url","__vouts","__func","__index","__args"];const R=(t,e)=>t.length===e.length&&t.every(((t,n)=>t===e[n]));const D=t=>(Object.prototype.toString.call(t).match(/\s([a-zA-Z]+)/)||[])[1];const A=t=>"object"==typeof t?D(t):D(t).toLowerCase();const B=t=>["number","string","boolean","undefined","Null"].includes(A(t));const K=t=>"Array"===A(t);const P=t=>"Object"===A(t);const T=t=>B(t)||["Array","Object"].includes(A(t));const k=t=>"Object"===A(t)&&Object.keys(t).every((t=>!Number.isNaN(parseInt(t,10))));const N=(t,e)=>{if(!T(t)||!T(e))throw new Error(`Unsupported data types for deep equals: ${A(t)} & ${A(e)}`);if(A(t)!==A(e))return!1;if(B(t)&&B(e))return t===e;const n=(t,e)=>Object.entries(t).every((([t,n])=>N(e[t],n)));return t&&e&&n(t,e)&&n(e,t)};const U=t=>{if(B(t))return t;if(K(t))return t.map(U);if(P(t)){const e=Object.keys(t).reduce(((e,n)=>(e[n]=U(t[n]),e)),{});const n=Object.create(Object.getPrototypeOf(t));return Object.assign(n,e)}throw new Error(`Unsupported data type for clone: ${A(t)}`)};const H=(t,e)=>t.reduce((([t,n],r,s)=>e(r,s)?[[...t,r],n]:[t,[...n,r]]),[[],[]]);const L=(t,e)=>Object.fromEntries(Object.entries(t).map((t=>e(t))));const F=(t,e)=>L(t,(([t,n])=>[t,e(n)]));const M=(t,e)=>Object.fromEntries(Object.entries(t).filter((t=>e(t))));const J=(t,e)=>M(t,(([,t])=>e(t)));const V=(t,e,n,r)=>{if(B(t))return t;if(K(t))return t.map((t=>V(t,e,n,r)));if(P(t)){t._rev=`${r}:${n}`;const s=e[n];return Object.entries(t).forEach((([n,o])=>{"object"==typeof s&&Object.keys(s).includes(n)&&(t[n]=V(o,e,s[n],r))})),t}throw new Error(`Unsupported type ${A(t)} in deep.updateRev`)};const G=(t,e)=>{if(B(t))return t;if(K(t))return t.map((t=>G(t,e)));if(P(t))return t._id=!t._id||t._id.startsWith("__temp__")?t._rev:t._id,t._rootId=t._rootId||e,Object.entries(t).forEach((([n,r])=>{t[n]=G(r,e)})),t;throw new Error(`Unsupported type ${A(t)} in deep.addId`)};const q=t=>{if(B(t))return t;if(K(t))return t.map((t=>q(t)));if(P(t)){const e=C();return t._id=t._id||e,t._rev=t._rev||e,Object.values(t).map((t=>q(t))),t}throw new Error(`Unsupported type ${A(t)} in addRandomId`)};const W=t=>{if(B(t))return t;if(K(t))return t.map((t=>W(t)));if(P(t))return L(t,(([t,e])=>["_owners","_readers"].includes(t)?[t,JSON.stringify(e)]:B(e)?[t,e]:[t,W(e)]));throw new Error(`Unexpected type ${A(t)} in stringifyOwners`)};const Z=t=>(t._owners&&(t._owners=JSON.parse(t._owners)),t._readers&&(t._readers=JSON.parse(t._readers)),t);const z=t=>{if(B(t))return t;if(K(t)||P(t))return Object.entries(t).reduce(((t,[e,n])=>{const r=z(n);return k(r)?Object.entries(r).forEach((([n,r])=>{t[`${e}_${n}`]=r})):t[e]=r,t}),{});throw new Error(`Unsupported type ${A(t)} in encodeArraysAsObjects`)};const Q=t=>{const e={[t._id]:Object.entries(t).reduce(((t,[e,n])=>E.includes(e)?Object.assign(Object.assign({},t),{[e]:n}):B(n)?Object.assign(Object.assign({},t),{[`__basic__${e}`]:n}):Object.assign(Object.assign({},t),{[e]:n._id})),{})};return Object.values(t).filter((t=>!B(t))).reduce(((t,e)=>Object.assign(Object.assign({},t),Q(e))),e)};const X=t=>M(t,(([t])=>!t.startsWith("__basic__")));const Y=(t,e)=>L(e,(([e,n])=>{const r=t[e];var s;return n.__change=(s=r)?N(s,n)?"same":"diff":"new",[e,n]}));const tt=(t,e)=>{const n=t[e];return n.__contains=Object.entries(n).reduce(((e,[n,r])=>["__contains",...E].includes(n)?e:"__change"===n?"new"===r||"diff"===r||e:tt(t,r)[r].__contains||e),!1),t};const et=t=>t.reduce(((t,e,n)=>Object.assign(Object.assign({},t),{[e._id]:n})),{});const nt=(t,e)=>t.map((t=>Object.entries(t).reduce(((t,[n,r])=>{const s="string"==typeof r&&"undefined"!==A(e[r])?e[r]:r;return Object.assign(Object.assign({},t),{[n]:s})}),{})));const rt=(t,e)=>[e,...t].map((t=>{const e=l(t,["_id","_rev","__change","__contains"]);return M(e,(([t,e])=>E.includes(t)||"number"==typeof e))}));const st=(t,e)=>{const n=q(e);const r=n._id;const s=U(t);const o=U(n);const i=W(s);const c=W(o);const a=z(i);const u=z(c);const d=Q(a);const h=Q(u);const l=Y(d,h);const f=F(l,X);const p=tt(f,r);const v=p[r];delete p[r];const g=F(p,(t=>t._rev));const _=J(p,(t=>t.__contains||Object.values(v).includes(t._id)));const b=Object.values(_);const[w,y]=H(b,(t=>"new"===t.__change));const m=[...y,...w];const O=et(m);const x=nt(m,O);const[S]=nt([v],O);const j=y.map((t=>t._rev));const[$,...I]=rt(x,S);return[j,I.map(Z).map((t=>Object.entries(t).reduce(((t,[e,n])=>Object.assign(Object.assign({},t),{[e]:g[n]||n})),{}))),$]};function ot(t,e){let n=0;return e.map((e=>"__"===e?t[n++]:e))}class it{constructor(t){this.db=t}get(t){return p(this,void 0,void 0,(function*(){const{txId:e,outIndex:n}=$(t);const{inRevs:r,outData:s}=yield this.db.fromTxId(e);if(!Array.isArray(r)||!Array.isArray(s)||0===s.length)return;const o=s[0].__index||{};const i=s[o.obj].__cls||"";const c=s[o.obj].__func||"";const a=s[o.obj].__args||[];const u=yield Promise.all(Object.values(o).map((t=>{const e=r[t];return e?this.get(e):Promise.resolve({})})));const d=Object.keys(o).map(((t,e)=>[t,u[e]]));const h=Object.fromEntries(d);let l=h.obj;delete h.obj;const f=Object.entries(h).reduce(((t,[e,n])=>{const r=parseInt(e,10);return Number.isNaN(r)||(t[r]=n),t}),[]);const p=ot(f,a);let v;if("constructor"===c){const t=eval(`(${i})`);l=Reflect.construct(t,p)}else v=Reflect.apply(l[c].bind(l),l,p);Object.entries(o).forEach((([t,n])=>{const r=parseInt(t,10);let o=f[r];"obj"===t?o=l:"res"===t&&(o=v),V(o,s,n,e)}));const g=l._rootId||`${e}:${o.obj}`;return G([v,l,...f],g),[...f,l,v][n]}))}}function ct(t){return{smartArgs:t.filter((t=>t._rev)),dumbArgs:t.map((t=>t._rev?"__":t))}}class at{constructor(t){this.db=t,at.proxyDepth=at.proxyDepth||0}static getUpdate(t){return p(this,void 0,void 0,(function*(){let e;let n;let r;let s;let o;let i;let c;if("Cls"in t){const{Cls:a,args:u}=t;e=a.toString(),n=null,r=Reflect.construct(a,u),s=U(u),o=u,i=null,c=void 0}else{const{target:a,property:u,args:d}=t;e=null,n=U(a),r=a,s=U(d),o=d,i=u,this.proxyDepth+=1,c=Reflect.apply(a[u],a,o),this.proxyDepth-=1}const{smartArgs:a,dumbArgs:u}=ct(s);const{smartArgs:d}=ct(o);const h=Object.assign(Object.assign(Object.assign({},a),{obj:n}),{_id:"index"});const l=Object.assign(Object.assign(Object.assign({},d),{obj:r}),{_id:"index"});["Object","Array"].includes(A(c))&&(l.res=c);const[f,p,v]=st(h,l);void 0!==p[0]&&(p[0].__index=v);const g=v.obj;void 0!==p[g]&&(null!==e&&(p[g].__cls=e),p[g].__func=null===i?"constructor":String(i),p[g].__args=u);const _=v.res;return void 0!==p[_]&&"function Object() { [native code] }"!==c.constructor.toString()&&(p[_].__cls=c.constructor.toString()),[f,p,r,d,c,v]}))}allocate(t,e){return p(this,void 0,void 0,(function*(){const[n,r,s,o,,i]=yield at.getUpdate({Cls:t,args:e});const[c]=yield this.db.update(n,r);const{txId:a}=$(c);Object.entries(i).forEach((([t,e])=>{const n=parseInt(t,10);let i=o[n];"obj"===t&&(i=s),V(i,r,e,a)}));const u=`${a}:${i.obj}`;return G([s,...o],u),s}))}update(t,e,n){return p(this,void 0,void 0,(function*(){const[r,s,,o,i,c]=yield at.getUpdate({target:t,property:e,args:n});const[a]=yield this.db.update(r,s);const{txId:u}=$(a);Object.entries(c).forEach((([e,n])=>{const r=parseInt(e,10);let c=o[r];"obj"===e?c=t:"res"===e&&(c=i),V(c,s,n,u)}));const d="string"==typeof t._rootId?t._rootId:`${u}:${c.obj}`;return G([i,t,...o],d),i}))}get(t,e){return at.proxyDepth>0||"function"!=typeof t[e]?Reflect.get(t,e):(...n)=>this.update(t,e,n)}}const ut=process.env.CHAIN||"BCH";const dt=process.env.NETWORK||"testnet";const ht=parseInt(process.env.BC_DUST_LIMIT||"",10)||4e3;const lt=parseInt(process.env.BC_DEFAULT_FEE||"",10)||("BSV"===ut?500:2500);const ft=parseInt(process.env.BC_SCRIPT_CHUNK_SIZE||"",10)||("BSV"===ut?1/0:479);const pt=process.env.BBS_URL?process.env.BBS_URL:"https://node.bitcoincomputer.io/";let vt;vt="BCH"===ut?1e5:2e4;const gt=1;const _t=64;var bt={CHAIN:ut,NETWORK:dt,MIN_NON_DUST_AMOUNT:ht,SCRIPT_CHUNK_SIZE:ft,BBS_URL:pt,DEFAULT_FEE:lt,SIGHASH_ALL:gt,SIGHASH_FORKID:_t,FEE_PER_KB:vt};const wt=t=>{try{return JSON.parse(t),!0}catch(t){return!1}};function yt(t,e){const n=[];let r=0;for(;r<t.length;){const s=r+e;n.push(t.slice(r,s)),r=s}return n}function mt(t,n){const r=new e.Script;if(!Array.isArray(n))throw new Error("Owners is not defined");if(n.length>16)throw new Error("Too many owners");return r.add("OP_1"),n.forEach((t=>{r.add(e.PublicKey.fromString(t).toBuffer())})),r.add(`OP_${n.length}`),r.add("OP_CHECKMULTISIG"),r.add(t),r.add("OP_DROP"),r}function Ot(t){const n=t.chunks.length;return!(!t.chunks[n-2].buf||!wt((t.chunks[n-2].buf||"").toString())||t.chunks[n-1].opcodenum!==e.Opcode.OP_DROP)}function xt(t,e){const{_amount:n,__vouts:r,_owners:s}=t,o=l(t,["_amount","__vouts","_owners"]);const i=Buffer.from(JSON.stringify(o));return(e.isNonStandard()?[i]:yt(i,bt.SCRIPT_CHUNK_SIZE)).map((t=>mt(t,s)))}function St(t){return Ot(t)?t.chunks.slice(1,t.chunks.length-4).map((t=>{if(!t.buf)throw new Error("Illegal state");return new e.PublicKey(t.buf).toString()})):[]}function jt(t){if(Ot(t)){const e=t.chunks[t.chunks.length-2];if(!e.buf)throw new Error("Illegal state");const n=JSON.parse(e.buf.toString());const r=St(t);return void 0!==r&&(n._owners=r),n}return{}}function $t(t){const{chunks:n}=t;return n[0].opcodenum===e.Opcode.OP_HASH160&&n[n.length-1].opcodenum===e.Opcode.OP_EQUAL}function It(t){let e=0;const n=[];for(let r=0;r<t.length;r+=1)n.push(e),e+=t[r];return n}function Ct(t,e){let n=0;for(let r=0;r<e.length;r+=1){const s=[];for(let t=0;t<e[r];t+=1)s.push(n),n+=1;if(s[0]===t)return s}throw new Error("No match found")}function Et(t,e){let n=0;for(let r=0;r<e.length;r+=1){const s=[];for(let t=0;t<e[r];t+=1)s.push(n),n+=1;if(s[0]===t)return r}throw new Error("No match found")}var Rt;const{Output:Dt}=e.Transaction;const{MultiSigScriptHash:At}=e.Transaction.Input;const{UnspentOutput:Bt}=e.Transaction;let Kt=Rt=class{constructor(t,n,r){const s=new e.Transaction(r);s.feePerKb(bt.DEFAULT_FEE),this.nodeConfig=t,this._tx=s,this._outData=[],this._privateKey=n}get chain(){return this.nodeConfig.chain}get network(){return this.nodeConfig.network}get restClient(){return new I(this.nodeConfig,this._privateKey)}get tx(){return this._tx}get inputs(){return this.tx.inputs.map((t=>`${t.prevTxId.toString("hex")}:${t.outputIndex}`))}get inRevs(){let t=0;const{opReturns:e}=this;if(0===e.length)return[];const[{__vins:n}]=e;return Array.isArray(n)?n.map((e=>{if(!this.tx.inputs[t])throw new Error("Input not found in inRevs");const{prevTxId:n,outputIndex:r}=this.tx.inputs[t];return t+=e,`${n.toString("hex")}:${r}`})):[]}get outRevs(){let t=0;const{opReturns:e}=this;if(0===e.length)return[];const[{__vouts:n}]=e;if(!Array.isArray(n))return[];const r=this.tx.id;return n.map((e=>{const n=`${r}:${t}`;return t+=e,n}))}get outData(){return this._outData}get opReturns(){const{outputs:t}=this.tx;return t.filter((t=>{let n;let r;try{n=new e.Script(t.script.toBuffer());const{chunks:s}=n;if(!s[1]||!s[1].buf)return!1;r=JSON.parse(s[1].buf.toString())}catch(t){return!1}return r&&n.toString().startsWith("OP_RETURN")})).map((t=>{var n,r;const s=new e.Script(t.script.toBuffer());const{chunks:o}=s;return JSON.parse((null===(r=null===(n=o[1])||void 0===n?void 0:n.buf)||void 0===r?void 0:r.toString())||"")}))}checkOutDataBCH(t){const n=t.map((t=>xt(l(t,["_amount"]),this.nodeConfig).map((t=>e.Script.buildScriptHashOut(t))))).flat().map((t=>t.toString()));const r=this.tx.outputs.filter((t=>{try{return!!t.script}catch(t){return!1}})).map((t=>new e.Script(t.script))).filter((t=>$t(t))).map((t=>t.toString()));return R(r,n)}addMetaData(t){return t.map(((t,n)=>{const r=this.tx.outputs[n];const s="BSV"===this.chain?St(new e.Script(r.script)):t._owners;const o=r.satoshis;return void 0!==s&&(t._owners=s),void 0!==o&&(t._amount=o),t}))}spendFromDataBsv(t){return p(this,void 0,void 0,(function*(){const n=t.map($);const r=n.map((t=>t.txId));const s=yield this.restClient.getTransactions(r);for(let t=0;t<n.length;t+=1){const{txId:r,outIndex:o}=n[t];const{outputs:i}=s[t];const c=i[o];const a=new e.Script(c.script);const u=Math.round(c.satoshis);const d=St(a);const h={txId:r,outputIndex:o,script:a,satoshis:u};this.tx.from([new Bt(h)],d,1)}return new Array(n.length).fill(1)}))}spendFromDataBch(t){return p(this,void 0,void 0,(function*(){const n=[];for(const r of t){const{txId:t,outIndex:s}=$(r);const o=yield Rt.fromTxId(t,this.restClient.nodeConfig,this._privateKey);const{outData:i}=o;const[{__vouts:c}]=o.opReturns;const a=Ct(s,c).map((e=>{const{script:n,satoshis:r}=o.tx.outputs[e];const s=n.toBuffer().toString("hex");return{txId:t,vout:e,scriptPubKey:s,satoshis:r,amount:r/1e8}}));const u=i[Et(s,c)];const d=xt(l(u,["_amount"]),this.nodeConfig);d.forEach(((t,n)=>{const{scriptPubKey:r,satoshis:s,txId:o,vout:i}=a[n];const c=new Dt({script:new e.Script(r),satoshis:s});const d=new e.Script;const h=new At({prevTxId:o,output:c,outputIndex:i,script:d},u._owners||[],1,null,t);this.tx.addInput(h)})),n.push(d.length)}return n}))}spendFromData(t){return p(this,void 0,void 0,(function*(){return 0===t.length?[]:"BSV"===this.chain?this.spendFromDataBsv(t):this.spendFromDataBch(t)}))}createOpReturnOut(t){this.tx.addData(JSON.stringify(t))}createDataOut(t){const{_amount:n}=t,r=l(t,["_amount"]);const s=n||bt.MIN_NON_DUST_AMOUNT;const o=xt(r,this.nodeConfig);if(this._outData.push(r),"BSV"===this.chain){const t=new Dt({script:o[0],satoshis:s});return this.tx.addOutput(t),1}return o.forEach((t=>{const n=new Dt({script:e.Script.buildScriptHashOut(t),satoshis:s});this.tx.addOutput(n)})),o.length}static fromHexBSV(t,n,r){const s=new this(n,r);s.tx.fromString(t);const o=s.tx.outputs.filter((t=>{try{return Ot(new e.Script(t.script))}catch(t){return!1}})).map((t=>jt(new e.Script(t.script))));return s._outData=s.addMetaData(o),s}static fromHexBCH(t,e,n,r){const s=new this(e,n);if(s.tx.fromString(t),!s.checkOutDataBCH(r))throw new Error("Invalid data from server in fromHexBCH.");return s._outData=s.addMetaData(r),s}static fromTxId(t,e,n){return p(this,void 0,void 0,(function*(){const r=new I(e,n);if("BSV"===e.chain){const s=yield r.getRawTx(t);return this.fromHexBSV(s,e,n)}const{hex:s,data:o}=yield r.getRawTxData(t);return this.fromHexBCH(s,e,n,o)}))}};function Pt(t){return Buffer.from(d.default.SHA256(t).toString(),"hex").toString("hex").substr(0,4)}function Tt(t,e){return Pt(t)===e}function kt(t){return`${Pt(t)};${t}`}function Nt(t){const e=t.substr(0,4);const n=t.substr(5);if(!Tt(n,e))throw new Error("Decryption failure");return n}function Ut(){return u.default.randomBytes(32).toString("hex")}function Ht(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid secret");const n=Buffer.from(e,"hex").toString("binary");const r=kt(t);return d.default.AES.encrypt(r,n).toString()}function Lt(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid secret");const n=Buffer.from(e,"hex").toString("binary");return Nt(d.default.AES.decrypt(t,n).toString(d.default.enc.Utf8))}function Ft(t,e){if(!/^0[2-3][0-9a-f]{64}|04[0-9a-f]{128}$/.test(e))throw new Error("Invalid publicKey");const n=kt(t);return h.encrypt(e,Buffer.from(n,"utf8")).toString("base64")}function Mt(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid privateKey");return Nt(h.decrypt(e,Buffer.from(t,"base64")).toString("utf8"))}function Jt(t,e){const n=Ut();return{__cypher:Ht(t,n),__secrets:e.map((t=>Ft(n,t)))}}function Vt({__cypher:t,__secrets:e},n){let r="";if(n.forEach((n=>{e.forEach((e=>{try{const s=Mt(e,n);r=Lt(t,s)}catch(t){const e=["Decryption failure","Unsupported state or unable to authenticate data"];if(t instanceof Error&&!e.includes(t.message))throw t}}))})),r)return r;throw new Error("Decryption failure")}function Gt(t){if(void 0!==t._readers){const{_readers:e,_url:n,_owners:r,_amount:s}=t,o=l(t,["_readers","_url","_owners","_amount"]);const i=Jt(JSON.stringify(o),e);return void 0!==n&&(i._url=n),void 0!==r&&(i._owners=r),void 0!==s&&(i._amount=s),i}return t}function qt(t,e){if(O(t)){const{__cypher:n,__secrets:r}=t,s=l(t,["__cypher","__secrets"]);return Object.assign(Object.assign(Object.assign({},s),JSON.parse(Vt({__cypher:n,__secrets:r},e))),{_readers:[]})}return t}function Wt(t){return e=>p(this,void 0,void 0,(function*(){if(void 0!==e._url){const{_url:n,_owners:r,_amount:s}=e,o=l(e,["_url","_owners","_amount"]);const i=yield I.setSecretOutput({host:n,secretOutput:{data:JSON.stringify(o)},privateKey:t.getPrivateKey()});return void 0!==r&&(i._owners=r),void 0!==s&&(i._amount=s),i}return e}))}function Zt(t){return e=>p(this,void 0,void 0,(function*(){if(m(e)){const{_url:n}=e,r=l(e,["_url"]);const{host:s,data:o}=yield I.getSecretOutput({_url:n,privateKey:t.getPrivateKey()});return Object.assign(Object.assign(Object.assign({},r),JSON.parse(o)),{_url:s})}return e}))}Kt=Rt=f([x()],Kt);class zt{constructor(t){this.wallet=t}get chain(){return this.wallet.chain}get network(){return this.wallet.network}get nodeConfig(){return this.wallet.nodeConfig}fromDataTx(t,e=!0,n=!0){return p(this,void 0,void 0,(function*(){const r=t.tx.id;const{inputs:s,inRevs:o,outRevs:i,opReturns:c}=t;const a=this.wallet.getPrivateKey().toBuffer().toString("hex");return{inRevs:o,outRevs:i,inputs:s,outData:yield Promise.all(t.outData.map((t=>p(this,void 0,void 0,(function*(){const r=n?yield Zt(this.wallet)(t):t;return e?qt(r,[a]):r}))))),opReturns:c,txId:r}}))}fromTxHex(t,e=!0,n=!0){return p(this,void 0,void 0,(function*(){const{wallet:r,nodeConfig:s}=this;const o=r.getPrivateKey();let i;if("BSV"===this.chain)i=Kt.fromHexBSV(t,s,o);else{i=new Kt(s,o),i.tx.fromString(t);const e=yield r.restClient.getOutData(i.tx.id);if(!i.checkOutDataBCH(e))throw new Error("Invalid data from server in fromTxHex.");i._outData=i.addMetaData(e)}return this.fromDataTx(i,e,n)}))}fromTxId(t,e=!0,n=!0){return p(this,void 0,void 0,(function*(){const{wallet:r,nodeConfig:s}=this;const o=r.getPrivateKey();const i=yield Kt.fromTxId(t,s,o);return this.fromDataTx(i,e,n)}))}get(t,e,n){return p(this,void 0,void 0,(function*(){const r=t.map($);return Promise.all(r.map((({txId:t,outIndex:r})=>p(this,void 0,void 0,(function*(){const{outData:s,opReturns:o}=yield this.fromTxId(t,e,n);const[{__vouts:i}]=o;return s[Et(r,i)]})))))}))}put(t){return this.update([],t)}update(t,e){return p(this,void 0,void 0,(function*(){const{wallet:n,nodeConfig:r}=this;const s=n.getPrivateKey();const o=new Kt(r,s);const i=e.map((t=>{var{_owners:e}=t,n=l(t,["_owners"]);return Object.assign({_owners:e||[this.wallet.getPublicKey().toString()]},n)})).map(Gt);const c=yield Promise.all(i.map(Wt(this.wallet)));const a=yield o.spendFromData(t);const u=c.map(o.createDataOut.bind(o));o.createOpReturnOut({__vins:a,__vouts:u});const d=yield this.wallet.fundAndSendTransaction(o,!0);return It(u).map((t=>`${d}:${t}`))}))}}function Qt(t){const e=t;for(let t=e.length-1;t>0;t-=1){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}}class Xt{constructor(t,e,n={}){const{path:r="m/44'/0'/0'/0",passphrase:s=""}=n;let o=t.toHDPrivateKey(s,e.network);r&&(o=o.derive(r));const i=o.publicKey.toAddress(e.network);this.mnemonic=t,this.restClient=e,this.path=r,this.passphrase=s,this.hdPrivateKey=o,this.address=i}get chain(){return this.restClient.chain}get network(){return this.restClient.network}get nodeConfig(){return this.restClient.nodeConfig}getMnemonic(){return this.mnemonic}getPath(){return this.path}derive(t="0"){const e=`${this.path}${this.path.length>0?"/":""}${t}`;return new Xt(this.mnemonic,this.restClient,{path:e})}getPrivateKey(){return this.hdPrivateKey.privateKey}getPublicKey(){return this.hdPrivateKey.publicKey}getAddress(){return this.address}getBalance(){return p(this,void 0,void 0,(function*(){return this.restClient.getBalance(this.getAddress())}))}getUtxos(t=this.getAddress()){return p(this,void 0,void 0,(function*(){return this.restClient.getUtxosFromAddress(t)}))}selectUtxos(t,e){let n=0;const r=[];Qt(t);for(let s=0;s<t.length;s+=1){const o=t[s];if(n+=o.satoshis,r.push(o),n>=e)return r}const{network:s,chain:o}=this.restClient.nodeConfig;throw new Error(`Insufficient balance in address ${this.getAddress().toString()} on ${s} ${o}. Found ${n}, required ${e}.`)}fundAndSendTransaction(t,n=!1){return p(this,void 0,void 0,(function*(){const r=t.tx._getInputAmount();const s=t.tx._getOutputAmount();t.tx.feePerKb(bt.FEE_PER_KB);const o=t.tx._estimateFee();const i=s-r+Math.round(o);if(i>0){const n=yield this.getUtxos(this.getAddress());this.selectUtxos(n,i).forEach((n=>{t.tx.from([new e.Transaction.UnspentOutput(n)])}))}t.tx.change(this.getAddress()),t.tx.sign(this.getPrivateKey(),"BSV"===this.restClient.chain?bt.SIGHASH_ALL|bt.SIGHASH_FORKID:bt.SIGHASH_ALL);const c=yield this.restClient.sendTransaction(t.tx.toString());return n&&(yield this.storeResult(c,t)),c}))}storeResult(t,e){return p(this,void 0,void 0,(function*(){const{outData:n,inputs:r,inRevs:s,outRevs:o}=e;const i=JSON.stringify(n);yield this.restClient.postOutData({outData:i,txId:t,inputs:r,inRevs:s,outRevs:o})}))}send(t,e){return p(this,void 0,void 0,(function*(){const n=new Kt(this.restClient.nodeConfig,this.getPrivateKey());return n.tx.to(e,t),this.fundAndSendTransaction(n)}))}}class Yt{constructor(t,e){this.chain=t,this.network=e}isNonStandard(){return"BSV"===this.chain}}class te extends Yt{constructor(t,e,n){super(t,e),this.url=n}}class ee{constructor(t){if(!t)throw new Error("Please provide a configuration object setting 'chain' and 'network'.");const{chain:n,network:r}=t;if(!n||!["BSV","BCH","LTC","BTC","DOGE"].includes(n.toUpperCase()))throw new Error("Please provide a configuration object setting 'chain' to 'BSV', 'BCH', 'LTC', 'BTC', or 'DOGE'");if(!r||!["mainnet","testnet","regtest"].includes(r.toLowerCase()))throw new Error("Please provide a configuration object setting 'network' to 'mainnet', 'testnet', or 'regtest'");const s=t.bbsUrl||bt.BBS_URL;const o=t.mnemonic||new e.Mnemonic(t.seed);const i=t.path||"m/44'/0'/0'/0";const c=t.passphrase||"";const a=g(o,r,{path:i,passphrase:c});const u=new te(n,r,s);const d=new I(u,a);const h=t.db||new zt(new Xt(o,d,{path:i,passphrase:c}));this.db=h}get chain(){return this.db.chain}get network(){return this.db.network}parseContract(t){const e=t.startsWith("export ")?t.slice(7):t;const n=e.startsWith("default ")?e.slice(8):e;return eval(`(${n})`)}new(t,e){return p(this,void 0,void 0,(function*(){const n=t.toString();const r=yield this.parseContract(n);const s=new at(this.db);const o=yield s.allocate(r,e);return new Proxy(o,s)}))}sync(t){return p(this,void 0,void 0,(function*(){j(t);const e=new it(this.db);const n=new at(this.db);const r=yield e.get(t);return new Proxy(r,n)}))}getOwnedRevs(t=this.db.wallet.getPublicKey()){return this.db.wallet.restClient.getOwnedRevs(t)}queryRevs(t){return p(this,void 0,void 0,(function*(){const{publicKey:n,contractName:r,contractHash:s}=t;const o=n?new e.PublicKey(n):void 0;return this.db.wallet.restClient.queryRevs({publicKey:o,contractName:r,contractHash:s})}))}getRevs(t=this.db.wallet.getPublicKey()){return p(this,void 0,void 0,(function*(){return(yield this.getOwnedRevs(t)).map((({rev:t})=>t))}))}getLatestRev(t){return p(this,void 0,void 0,(function*(){return this.db.wallet.restClient.getLatestRev(t)}))}getLatestRevs(t){return p(this,void 0,void 0,(function*(){return this.db.wallet.restClient.getLatestRevs(t)}))}}return t.Computer=ee,Object.defineProperty(t,"__esModule",{value:!0}),t}({},BitcoinSource,axios,crypto,CryptoJS,eciesjs);
