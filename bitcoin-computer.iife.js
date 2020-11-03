var t=function(t,e){"use strict";function s(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var n=s(t);var r=s(e);
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
    ***************************************************************************** */function i(t,e){var s={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(s[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(t);r<n.length;r++)e.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(t,n[r])&&(s[n[r]]=t[n[r]])}return s}function o(t,e,s,n){return new(s||(s=Promise))((function(r,i){function o(t){try{a(n.next(t))}catch(t){i(t)}}function c(t){try{a(n.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?r(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(o,c)}a((n=n.apply(t,e||[])).next())}))}const c=process.env.BC_CHAIN||"BSV";const a=process.env.BC_NETWORK||"testnet";const u=process.env.BC_WOC_API_KEY;const d=parseInt(process.env.BC_DUST_LIMIT||"",10)||4e3;const h=parseInt(process.env.BC_DEFAULT_FEE||"",10)||("BSV"===c?500:2500);const l=parseInt(process.env.BC_SCRIPT_CHUNK_SIZE||"",10)||479;let p;let f;process.env.BC_BBS_URL?(p=process.env.BC_BBS_URL,f="ws"+process.env.BC_BBS_URL.slice(4)):(p="https://bbs.bitcoincomputer.io",f="wss://bbs.bitcoincomputer.io");var g={CHAIN:c,NETWORK:a,WOC_API_KEY:u,MIN_NON_DUST_AMOUNT:d,SCRIPT_CHUNK_SIZE:l,UN_P2SH_URL:p,WS_URL:f,DEFAULT_FEE:h};n.default.versionGuard=()=>!0,n.default.Networks.defaultNetwork=n.default.Networks[g.NETWORK];class _ extends n.default.Address{constructor(...t){super(...t)}}class w extends n.default.crypto.BN{constructor(...t){super(...t)}}class v extends n.default.encoding.BufferReader{constructor(...t){super(...t)}}class b extends n.default.encoding.BufferWriter{constructor(...t){super(...t)}}class m extends n.default.Mnemonic{constructor(...t){super(...t)}}class y extends n.default.HDPrivateKey{constructor(...t){super(...t)}}class O extends n.default.Transaction.Input.MultiSigScriptHash{constructor(...t){super(...t)}}class S extends n.default.Script.Interpreter{constructor(...t){super(...t)}}class x extends n.default.Opcode{constructor(...t){super(...t)}}class I extends n.default.Transaction.Input{constructor(...t){super(...t)}}class j extends n.default.Transaction.Output{constructor(...t){super(...t)}}class E extends n.default.PrivateKey{constructor(...t){super(...t)}}class P extends n.default.PublicKey{constructor(...t){super(...t)}}class C extends n.default.Script{constructor(...t){super(...t)}}class T extends n.default.Transaction{constructor(...t){super(...t)}}const B=()=>"__temp__:"+Math.random();const K=["_id","_rev","_owners","_amount","__vouts","__txId","__cls","__func","__index","__args"];const N=t=>(Object.prototype.toString.call(t).match(/\s([a-zA-Z]+)/)||[])[1];const D=t=>"object"==typeof t?N(t):N(t).toLowerCase();const $=t=>["number","string","boolean","undefined","Null"].includes(D(t));const k=t=>"Array"===D(t);const U=t=>"Object"===D(t);const A=t=>!!t._owners&&"object"==typeof t._owners;const R=t=>!!t._owners&&"string"==typeof t._owners;const H=t=>!!t._amount;const M=t=>$(t)||["Array","Object"].includes(D(t));const F=t=>"Object"===D(t)&&Object.keys(t).every(t=>!Number.isNaN(parseInt(t,10)));const L=(t,e)=>{if(!M(t)||!M(e))throw new Error(`Unsupported data types for deep equals: ${D(t)} & ${D(e)}`);if(D(t)!==D(e))return!1;if($(t)&&$(e))return t===e;const s=(t,e)=>Object.entries(t).every(([t,s])=>L(e[t],s));return t&&e&&s(t,e)&&s(e,t)};const V=t=>{if($(t))return t;if(k(t))return t.map(V);if(U(t)){const e=Object.keys(t).reduce((e,s)=>(e[s]=V(t[s]),e),{});const s=Object.create(Object.getPrototypeOf(t));return Object.assign(s,e)}throw new Error("Unsupported data type for clone: "+D(t))};const J=(t,e)=>t.reduce(([t,s],n,r)=>e(n,r)?[[...t,n],s]:[t,[...s,n]],[[],[]]);const W=(t,e)=>Object.fromEntries(Object.entries(t).map(t=>e(t)));const z=(t,e)=>W(t,([t,s])=>[t,e(s)]);const q=(t,e)=>Object.fromEntries(Object.entries(t).filter(([,t])=>e(t)));const Z=(t,e)=>{if($(t))return t;if(k(t))return t.map(t=>Z(t,e));if(U(t)){const s=W(t,([t,s])=>[t,K.includes(t)?s:Z(s,e)]);const n=H(t)?t._amount:g.MIN_NON_DUST_AMOUNT;const r=A(t)?t._owners:[e];return Object.assign(Object.assign({},s),{_amount:n,_owners:r})}throw new Error(`unsupported type ${D(t)} in setOwnersAndAmount`)};const G=(t,e,s,n)=>{if($(t))return t;if(k(t))return t.map(t=>G(t,e,s,n));if(U(t)){t._rev=`${n}:${s}`;const r=e[s];return Object.entries(t).forEach(([s,i])=>{"object"==typeof r&&Object.keys(r).includes(s)&&(t[s]=G(i,e,r[s],n))}),t}throw new Error(`Unsupported type ${D(t)} in deep.updateRev`)};const Y=t=>{if($(t))return t;if(k(t))return t.map(t=>Y(t));if(U(t))return t.__cls=t.constructor.toString(),Object.entries(t).forEach(([e,s])=>{t[e]=Y(s)}),t;throw new Error(`Unsupported type ${D(t)} in deep.addClass`)};const Q=(t,e)=>{if($(t))return t;if(k(t))return t.map(t=>Q(t,e));if(U(t))return t._id=!t._id||t._id.startsWith("__temp__")?t._rev:t._id,t._rootId=t._rootId||e,Object.entries(t).forEach(([s,n])=>{t[s]=Q(n,e)}),t;throw new Error(`Unsupported type ${D(t)} in deep.addId`)};const X=t=>{if($(t))return t;if(k(t))return t.map(t=>X(t));if(U(t)){const e=B();return t._id=t._id||e,t._rev=t._rev||e,Object.values(t).map(t=>X(t)),t}throw new Error(`Unsupported type ${D(t)} in addRandomId`)};const tt=t=>{if($(t))return t;if(k(t))return t.map(t=>tt(t));if(U(t))return W(t,([t,e])=>"_owners"===t?[t,JSON.stringify(e)]:$(e)?[t,e]:[t,tt(e)]);throw new Error(`Unexpected type ${D(t)} in stringifyOwners`)};const et=t=>R(t)?Object.assign(Object.assign({},t),{_owners:JSON.parse(t._owners).map(t=>new P(t))}):t;const st=t=>{if($(t))return t;if(k(t)||U(t))return Object.entries(t).reduce((t,[e,s])=>{const n=st(s);return F(n)?Object.entries(n).forEach(([s,n])=>{t[`${e}_${s}`]=n}):t[e]=n,t},{});throw new Error(`Unsupported type ${D(t)} in encodeArraysAsObjects`)};const nt=t=>{const e={[t._id]:Object.entries(t).reduce((t,[e,s])=>K.includes(e)?Object.assign(Object.assign({},t),{[e]:s}):$(s)?Object.assign(Object.assign({},t),{["__basic__"+e]:s}):Object.assign(Object.assign({},t),{[e]:s._id}),{})};return Object.values(t).filter(t=>!$(t)).reduce((t,e)=>Object.assign(Object.assign({},t),nt(e)),e)};const rt=t=>Object.fromEntries(Object.entries(t).filter(([t])=>!t.startsWith("__basic__")));const it=(t,e)=>Object.fromEntries(Object.entries(e).map(([e,s])=>{const n=t[e];var r;return s.__change=(r=n)?L(r,s)?"same":"diff":"new",[e,s]}));const ot=(t,e)=>(t[e].__contains=Object.entries(t[e]).reduce((e,[s,n])=>["__contains"].concat(K).includes(s)?e:"__change"===s?"new"===n||"diff"===n||e:ot(t,n)[n].__contains||e,!1),t);const ct=t=>t.reduce((t,e,s)=>Object.assign(Object.assign({},t),{[e._id]:s}),{});const at=(t,e)=>t.map(t=>Object.entries(t).reduce((t,[s,n])=>{const r="string"==typeof n&&"undefined"!==D(e[n])?e[n]:n;return Object.assign(Object.assign({},t),{[s]:r})},{}));const ut=(t,e,s)=>{const[n,...r]=[e,...t].map((t,e)=>{const n=i(t,["_id","_rev","__change","__contains"]);return 0===e||e<=s.length?i(n,["__cls"]):n});return[n,...r.map(t=>Object.fromEntries(Object.entries(t).filter(([t,e])=>K.filter(t=>"__cls"!==t).includes(t)||"__cls"===t&&"string"==typeof e&&"function Object() { [native code] }"!==e||"number"==typeof e)))]};const dt=(t,e)=>{const s=X(e);const n=s._id;const r=V(t);const i=V(s);Y(r),Y(i);const o=tt(r);const c=tt(i);const a=st(o);const u=st(c);const d=nt(a);const h=nt(u);const l=it(d,h);const p=z(l,rt);const f=ot(p,n);const g=f[n];delete g.__cls,delete f[n];const _=z(f,t=>t._rev);const w=q(f,t=>t.__contains||Object.values(g).includes(t._id));const v=Object.values(w);const[b,m]=J(v,t=>"new"===t.__change);const y=[...m,...b];const O=ct(y);const S=at(y,O);const[x]=at([g],O);const I=m.map(t=>t._rev);const[j,...E]=ut(S,x,I);return[I,E.map(et).map(t=>Object.entries(t).reduce((t,[e,s])=>Object.assign(Object.assign({},t),{[e]:_[s]||s}),{})),j]};const ht=t=>({smartArgs:t.filter(t=>t._rev),dumbArgs:t.map(t=>t._rev?"__":t)});const lt=(t,e)=>{let s=0;return e.map(e=>"__"===e?t[s++]:e)};const pt=t=>{if("string"!=typeof t||0===t.length)throw new Error("Please enter a valid id or revision");const[e,s]=t.split(":");if(!e||!s)throw new Error("Please enter a valid id or revision of the form <transaction id>:<output number>");if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid Transaction ID");if(Number.isNaN(Number(s)))throw new Error("Invalid Number")};class ft{constructor(t){this.db=t}static getUpdate(t,e,s,n){return o(this,void 0,void 0,(function*(){const[r,i]=V([t,s]);const o=Object.keys(s).length?Reflect.apply(s[n],s,t):null;const c=Object.keys(s).length?s:new e(...t);const{smartArgs:a,dumbArgs:u}=ht(r);const{smartArgs:d}=ht(t);const h=Object.assign(Object.assign(Object.assign({},a),{obj:i}),{_id:"index"});const l=Object.assign(Object.assign(Object.assign({},d),{obj:c}),{_id:"index"});"Object"===D(o)&&(l.res=o);const[p,f,g]=dt(h,l);void 0!==f[0]&&(f[0].__index=g);const _=g.obj;return void 0!==f[_]&&(f[_].__args=u,n?f[_].__func=n:(f[_].__func="constructor",f[_].__cls=e.toString())),[p,f,c,d,o,g]}))}construct(t,e){return o(this,void 0,void 0,(function*(){const[s,n,r,i,,o]=yield ft.getUpdate(e,t,{});const[c]=yield this.db.update(s,n);const[a]=c.split(":");const u=`${a}:${o.obj}`;return Object.entries(o).forEach(([t,e])=>{G("obj"===t?r:i[t],n,e,a)}),Q([r,...i],u),r}))}call(t,e,s){return o(this,void 0,void 0,(function*(){const[n,r,,i,o,c]=yield ft.getUpdate(s,null,t,e);const[a]=yield this.db.update(n,r);const[u]=a.split(":");Object.entries(c).forEach(([e,s])=>{"obj"===e&&G(t,r,s,u),G("res"===e?o:i[e],r,s,u)});const d=t._rootId||`${u}:${c.obj}`;return Q([o,t,...i],d),o}))}get(t,e){return"function"==typeof t[e]?(...s)=>this.call(t,e,s):Reflect.get(t,e)}}function gt(t,e){const s=[];let n=0;for(;n<t.length;)s.push(t.slice(n,n+e)),n+=e;return s}class _t extends C{static outScriptFromData(t){const{_owners:e,_amount:s,__vouts:n,__txId:r}=t,o=i(t,["_owners","_amount","__vouts","__txId"]);const c=gt(Buffer.from(JSON.stringify(o)),g.SCRIPT_CHUNK_SIZE);if(c[c.length-1].byteLength>=g.SCRIPT_CHUNK_SIZE){const t=c.pop();if(!t)throw new Error("panic");gt(t,g.SCRIPT_CHUNK_SIZE).forEach(t=>{c.push(t)})}return c.map(t=>({redeemScript:_t.getScript(t,e),chunk:t}))}static getScript(t,e){const s=new _t;return s.add("OP_1"),e.forEach(t=>s.add(t.toBuffer())),s.add("OP_"+e.length),s.add("OP_CHECKMULTISIG"),s.add(t),s.add("OP_DROP"),s}getData(){return this.isDbDataScript()?JSON.parse(this.chunks[this.chunks.length-2].buf.toString()):{}}getPublicKeys(){if(this.isDbDataScript())return this.chunks.slice(1,this.chunks.length-4).map(t=>new P(t.buf));throw new Error("Cannot get owners from non-data script")}isDbDataScript(){return!!(this.chunks.length>=5&&this.chunks[0].opcodenum===x.OP_1&&this.chunks[1].buf&&[20,33].includes(this.chunks[1].buf.length)&&this.chunks[this.chunks.length-3].opcodenum===x.OP_CHECKMULTISIG&&this.chunks[this.chunks.length-2].buf&&this.chunks[this.chunks.length-1].opcodenum===x.OP_DROP)}static isP2shScript(t){return!(3!==t.chunks.length||t.chunks[0].opcodenum!==x.OP_0||!t.chunks[1].buf||!t.chunks[2].buf)}static redeemScriptFromP2shScript(t){if(!this.isP2shScript(t))throw new Error("not a p2sh script");const e=new C(t.chunks[2].buf);const s=new this;return s.chunks=e.chunks,s}static fromScript(t){const e=new C(t);const s=new _t;return s.chunks=e.chunks,s}static buildPublicKeyOut(t){return _t.fromScript(C.buildPublicKeyOut(t))}static buildPublicKeyHashOut(t){return _t.fromScript(C.buildPublicKeyHashOut(t))}static buildScriptHashOut(t){return _t.fromScript(C.buildScriptHashOut(t))}}function wt(t){try{const e=JSON.parse(t);if("object"!=typeof e)throw new Error("Invalid object");if("string"!=typeof e.txhex)throw new Error("Invalid object");return new T(e.txhex)}catch(t){return null}}function vt(t){return o(this,void 0,void 0,(function*(){const{message:e,config:{url:s,method:n,data:r},response:i}=t;const o=wt(r);const c="message\t"+e;const a=`request\t${n} ${s}`;const u=o?"transaction\t "+JSON.stringify(o.toJSON(),null,2):"";const d="post"===n?"data\t"+r:"";const h=i?"response\t"+JSON.stringify(i.data):"";const l=o?u:d;throw t.message=`\n    Communication Error\n    ${c}\n    ${a}\n    ${l}\n    ${h}`,t}))}class bt{constructor(t,e={}){this.baseUrl=t,this.headers=e}get(t){return o(this,void 0,void 0,(function*(){const e=`${this.baseUrl}${t}`;try{return(yield r.default.get(e,{headers:this.headers})).data}catch(t){return vt(t)}}))}post(t,e){return o(this,void 0,void 0,(function*(){const s=`${this.baseUrl}${t}`;try{return(yield r.default.post(s,e,{headers:this.headers})).data}catch(t){return vt(t)}}))}}function mt(t){if(!/^[0-9A-Fa-f]{64}$/.test(t))throw new Error("Invalid txId: "+t)}function yt(t){if(!/^[0-9A-Fa-f]{64}:\d+$/.test(t))throw new Error("Invalid outId: "+t)}function Ot(t){yt(t);const[e,s]=t.split(":");return{txId:e,virtualIndex:parseInt(s,10)}}const St=new Map;class xt{constructor(t=g.CHAIN,e=g.NETWORK,s=g.WOC_API_KEY){this.chain=t,this.network=e,"BSV"===t&&(this.wocApiKey=s),this.bcx=new bt(this.getBaseUrl(),this.getRequestHeaders()),this.bbs=new bt(g.UN_P2SH_URL)}getBaseUrl(){if("BSV"===this.chain)return"https://api.whatsonchain.com/v1/bsv/"+("livenet"===this.network?"main":"test");if("BCH"===this.chain)return`https://${"livenet"===this.network?"rest":"trest"}.bitcoin.com/v2`;throw new Error("Illegal state")}getRequestHeaders(){if("BSV"===this.chain)return this.wocApiKey?{"woc-api-key":this.wocApiKey}:{};if("BCH"===this.chain)return{};throw new Error("Illegal state")}getBalance(t){return o(this,void 0,void 0,(function*(){if("BSV"===this.chain){const e=yield this.bcx.get(`/address/${t.toString()}/balance`);return e.confirmed+e.unconfirmed}if("BCH"===this.chain){const e=yield this.bcx.get("/address/details/"+t.toString());return e.balanceSat+e.unconfirmedBalanceSat}throw new Error("Illegal state")}))}getTransaction(t){return o(this,void 0,void 0,(function*(){return new T(yield this.getRawTransaction(t))}))}getRawTransaction(t){return o(this,void 0,void 0,(function*(){mt(t);let e=St.get(t);if(!e){const s="livenet"===this.network?"main":"test";e=yield this.bbs.get(`/tx/${this.chain}/${s}/${t}`),St.set(t,e)}return e}))}sendTransaction(t,e=!1){return o(this,void 0,void 0,(function*(){const s=t.toString();if("BSV"===this.chain){const n=yield this.bcx.post("/tx/raw",{txhex:s});return e&&(yield this.storeResult(n,t)),n}if("BCH"===this.chain){const[n]=yield this.bcx.post("/rawtransactions/sendRawTransaction",{hexes:[s]});return e&&(yield this.storeResult(n,t)),n}throw new Error("Illegal state")}))}storeResult(t,e){return o(this,void 0,void 0,(function*(){function s(t){return t.toString()}const n=e.outputData.map(t=>Object.assign(Object.assign({},t),{_owners:t._owners?t._owners.map(s):void 0}));const r=JSON.stringify(n);const i=e.toJSON().inputs.map(t=>`${t.prevTxId}:${t.outputIndex}`);yield this.postOutputData({txId:t,outputData:r,inputs:i})}))}getUtxosFromAddress(t){return o(this,void 0,void 0,(function*(){if("BSV"===this.chain){const e=(yield this.bcx.get(`/address/${t.toString()}/unspent`)).map(t=>({txId:t.tx_hash,vout:t.tx_pos,amount:t.value/1e8,satoshis:t.value}));return Promise.all(e.map(t=>o(this,void 0,void 0,(function*(){const e=(yield this.getTransaction(t.txId)).outputs[t.vout].script.toHex();return Object.assign(Object.assign({},t),{scriptPubKey:e})}))))}if("BCH"===this.chain){const{utxos:e,scriptPubKey:s}=yield this.bcx.get("/address/utxo/"+t.toString());return e.map(t=>({txId:t.txid,vout:t.vout,scriptPubKey:s,amount:t.amount,satoshis:t.satoshis,height:t.height,confirmations:t.confirmations}))}throw new Error("Illegal state")}))}getTxosFromOutputData(t){return o(this,void 0,void 0,(function*(){const e=new Map;const s=t.map(t=>{const e=t.__txId;if(!e)throw new Error("Missing __txId");return e});const n=[...new Set(s)];return yield Promise.all(n.map(t=>o(this,void 0,void 0,(function*(){return e.set(t,yield this.getTransaction(t))})))),t.map(t=>{const s=t.__txId;if(!s)throw new Error("Missing __txId");const n=t.__vouts;if(!n)throw new Error("Missing __vouts");const r=e.get(s);if(!r)throw new Error("Illegal state");return n.map(t=>{const e=r.outputs[t];const n=e._scriptBuffer.toString("hex");const i=e._satoshis;return{txId:s,vout:t,scriptPubKey:n,amount:i/1e8,satoshis:i}})})}))}postOutputData(t){return o(this,void 0,void 0,(function*(){return this.bbs.post("/",t)}))}getOutputData(t){return o(this,void 0,void 0,(function*(){function e(t){return new P(t)}return(yield this.bbs.get("/un-p2sh/"+t)).map(t=>Object.assign(Object.assign({},t),{_owners:t._owners?t._owners.map(e):void 0}))}))}getOwnedRevs(t){return o(this,void 0,void 0,(function*(){return this.bbs.get("/txos/"+t.toString())}))}getLatestRev(t){return o(this,void 0,void 0,(function*(){yt(t);const[{rev:e}]=yield this.bbs.get("/get-rev/"+t);return e}))}getLatestRevs(t){return o(this,void 0,void 0,(function*(){t.map(yt);const e=t.map(t=>"id="+t).join("&");return yield this.bbs.get("/get-revs?"+e)}))}setTxoSpent(t){return o(this,void 0,void 0,(function*(){const e=Ot(t);this.bbs.post("/txos/set-spent/",e)}))}}function It(t){return{writable:!0,value:t}}function jt(t,e,s){var n=t,r=s[n],o=i(s,["symbol"==typeof n?n:n+""]);return Object.assign({[e]:r},o)}const Et=t=>new Promise(e=>setTimeout(e,t));class Pt extends T{constructor(t,e,s){super(s),this._outputData=[],this.restClient=new xt(t,e),this.feePerKb(g.DEFAULT_FEE),Object.defineProperty(this,"from",It(this._from))}get chain(){return this.restClient.chain}get network(){return this.restClient.network}static fromRedeemScripts(t){const e=t.map(t=>t.chunks[t.chunks.length-2].buf);const s=Buffer.concat(e);const n=JSON.parse(s.toString());return Object.assign({_owners:t[0].getPublicKeys(),_amount:g.MIN_NON_DUST_AMOUNT},n)}static addVouts(t){let e=0;return t.map(t=>{const s=_t.outScriptFromData(t).length;const n=Object.assign(Object.assign({},t),{__vouts:[]});return n.__vouts=Array(s).fill(e).map((t,e)=>t+e),e+=s,n})}get dataInputs(){const t=[];const e=function*(t){for(const e of t)yield e}(this.inputs);let s=e.next();for(;!s.done;){const n=s.value;const r=_t.fromScript(n._scriptBuffer);if(_t.isP2shScript(r)){let s=!1;const n=[_t.redeemScriptFromP2shScript(r)];for(;!s;)try{t.push(Pt.fromRedeemScripts(n)),s=!0}catch(t){const s=e.next();if(s.done)throw new Error("Could not compute data inputs");const r=s.value;const i=_t.fromScript(r._scriptBuffer);n.push(_t.redeemScriptFromP2shScript(i))}}s=e.next()}return t}set dataInputs(t){throw Error("dataTransaction.dataInputs cannot be set directly, use dataTransaction.from or dataTransaction.fromDataOutput")}getVirtualInputs(){return o(this,void 0,void 0,(function*(){if("BSV"===this.chain)return(yield Promise.all(this.inputs.map(t=>o(this,void 0,void 0,(function*(){const{outputIndex:e}=t;const s=t.prevTxId.toString("hex");const n=(yield Pt.fromTxId(s,this.chain,this.network)).outputs[e];return!!_t.fromScript(n._scriptBuffer).isDbDataScript()&&t}))))).filter(t=>!!t).map(t=>`${t.prevTxId.toString("hex")}:${t.outputIndex}`);if("BCH"===this.chain){const{dataInputs:t}=this;const e=Pt.addVouts(t);return Promise.all(e.map(t=>o(this,void 0,void 0,(function*(){const e=[];t.__vouts.forEach(t=>{e.push(this.inputs[t])});const s=e[0].prevTxId.toString("hex");const n=yield Pt.fromTxId(s,this.chain,this.network);yield n.fetchOutputData();const r=Pt.addVouts(n.outputData);const i=[];return r.forEach((t,s)=>{L(t.__vouts,e.map(t=>t.outputIndex))&&i.push(s)}),`${s}:${i[0]}`}))))}throw new Error("chain not set in getVirtualInputs")}))}fromMultiSig(t,e,s){const n=t.map(t=>jt("txId","txid",t));return super.from(n,e,s)}_from(t,e,s){const n=jt("txId","txid",t);return super.from(n,e,s)}fromDataOutput(t,e){const s=_t.outScriptFromData(e);const{_owners:n}=e;return s.forEach(({redeemScript:e},s)=>{const{scriptPubKey:r,satoshis:i,txId:o,vout:c}=t[s];const a=new j({script:new _t(r),satoshis:i});const u=new _t;const d=new O({prevTxId:o,output:a,outputIndex:c,script:u},n,1,null,e);this.addInput(d)}),this}get outputData(){if("BSV"===this.chain)return this.outputs.filter(t=>_t.fromScript(t._scriptBuffer).isDbDataScript()).map(t=>{const{chunks:e}=t._script||t.script;const{buf:s}=e[e.length-2];const n=JSON.parse(s.toString());const r=e.slice(1,e.length-4);return n._owners=r.map(t=>new P(t.buf).toString()),n._amount=t._satoshis,n});if("BCH"===this.chain)return this._outputData;throw new Error("Chain not set in dataTransaction get outputdata")}set outputData(t){throw Error("dataTransaction.outputData cannot be set directly")}toData(t){if("BSV"===this.chain){const{_owners:e,_amount:s}=t,n=i(t,["_owners","_amount"]);const r=Buffer.from(JSON.stringify(n));const o=_t.getScript(r,e);const c=new j({script:o,satoshis:s});return this.addOutput(c),this.outputs.length-1}if("BCH"===this.chain){const e=_t.outScriptFromData(t);return this._outputData.push(t),e.forEach(({redeemScript:e})=>{const s=_t.buildScriptHashOut(e);const n=t._amount;const r=new j({script:s,satoshis:n});this.addOutput(r)}),this._outputData.length-1}throw new Error("chain not set in dataScript.toScriptOutput")}fetchOutputData(){return o(this,void 0,void 0,(function*(){if(this._outputData.length)return;const t=this.getTxId();"BSV"===this.chain?this._outputData=this.outputs.map(t=>{const e=_t.fromScript(t._scriptBuffer);const s=t._satoshis;if(e.isDbDataScript()){const t=e.getPublicKeys().map(t=>t.toString());return Object.assign(e.getData(),{_amount:s,_owners:t})}if(e.isPublicKeyHashOut()){const t=e.getPublicKeyHash();return{address:_.fromPublicKeyHash(t)}}throw new Error("Unrecognized output script "+e.toString())}):"BCH"===this.chain&&(this._outputData=yield this.restClient.getOutputData(t))}))}get prevObjectIds(){return this.inputs.map(t=>`${t.prevTxId.toString("hex")}:${t.outputIndex}`)}getTxId(){return new v(this._getHash()).readReverse().toString("hex")}getChangeIndex(){return this._changeIndex}static fromTxId(t,e,s){return o(this,void 0,void 0,(function*(){let n=null;const r=new xt(e,s);try{n=yield r.getRawTransaction(t)}catch(e){yield Et(3e3),n=yield r.getRawTransaction(t)}const i=new Pt(e,s);return i.fromString(n),i}))}}class Ct{constructor(t){this.wallet=t}get chain(){return this.wallet.chain}get network(){return this.wallet.network}put(t){return o(this,void 0,void 0,(function*(){return this.update([],t)}))}getOutputDataMap(t){return o(this,void 0,void 0,(function*(){const e=[...new Set(t)];const s=yield Promise.all(e.map(t=>o(this,void 0,void 0,(function*(){const e=yield this.wallet.restClient.getOutputData(t);let s=0;const n=e.map(e=>{const n=Object.assign({},e);const r=_t.outScriptFromData(n).length;const i=Array(r).fill(s).map((t,e)=>t+e);return s+=r,void 0!==n._owners&&(n._owners=n._owners.map(t=>new P(t))),Object.assign(Object.assign({},n),{__vouts:i,__txId:t})});return[t,n]}))));return new Map(s)}))}get(t){return o(this,void 0,void 0,(function*(){if("BSV"===this.chain){const e=t.map(t=>t.split(":")[0]);const s=[...new Set(e)];const n=yield Promise.all(s.map(t=>o(this,void 0,void 0,(function*(){return[t,yield this.wallet.restClient.getTransaction(t)]}))));const r=new Map(n);return Promise.all(t.map(t=>o(this,void 0,void 0,(function*(){const[e,s]=t.split(":");const n=r.get(e).outputs[parseInt(s,10)];const i=_t.fromScript(n.script);return Object.assign(i.getData(),{__txId:e,__vouts:[parseInt(s,10)],_owners:i.getPublicKeys(),_amount:Math.round(n.satoshis)})}))))}if("BCH"===this.chain){const e=t.map(t=>t.split(":")[0]);const s=yield this.getOutputDataMap(e);return t.map(t=>{const[e,n]=t.split(":");const r=s.get(e);if(!r||!Array.isArray(r))throw new Error("No data found.");return r[parseInt(n,10)]})}throw new Error("chain not set in db.get")}))}getUpdateTxBch(t,e){return o(this,void 0,void 0,(function*(){const s=new Pt(this.chain,this.network);const n=yield this.get(t);const r=yield this.wallet.restClient.getTxosFromOutputData(n);t.forEach((t,e)=>o(this,void 0,void 0,(function*(){s.fromDataOutput(r[e],n[e])})));const i=Z(e,this.wallet.getPublicKey()).map(t=>s.toData(t));return{txId:yield this.wallet.fundAndSendTransaction(s,!0),virtualIndices:i}}))}getUpdateTxBsv(t,e){return o(this,void 0,void 0,(function*(){const s=new Pt(this.chain,this.network);(yield Promise.all(t.map(t=>o(this,void 0,void 0,(function*(){const[e,s]=t.split(":");const n=yield this.wallet.restClient.getTransaction(e);const{script:r,satoshis:i}=n.outputs[parseInt(s,10)];const o=_t.fromScript(r);return{output:{txId:e,outputIndex:parseInt(s,10),scriptPubKey:o,satoshis:Math.round(i)},publicKeys:o.getPublicKeys(),nr:1}}))))).forEach(({output:t,publicKeys:e,nr:n})=>{s.from(t,e,n)});const n=Z(e,this.wallet.getPublicKey()).map(t=>s.toData(t));return{txId:yield this.wallet.fundAndSendTransaction(s,!0),virtualIndices:n}}))}update(t,e){return o(this,void 0,void 0,(function*(){if("BSV"===this.chain){const{txId:s,virtualIndices:n}=yield this.getUpdateTxBsv(t,e);return yield Promise.all(t.map(t=>o(this,void 0,void 0,(function*(){yield this.wallet.restClient.setTxoSpent(t)})))),n.map(t=>`${s}:${t}`)}if("BCH"===this.chain){const{txId:s,virtualIndices:n}=yield this.getUpdateTxBch(t,e);return t.forEach(t=>o(this,void 0,void 0,(function*(){yield this.wallet.restClient.setTxoSpent(t)}))),n.map(t=>`${s}:${t}`)}throw new Error("Chain not set in db.update "+this.chain)}))}}class Tt{constructor(t,e,s={}){const{path:n="m/44'/0'/0'/0",passphrase:r=""}=s;this.mnemonic=t,this.path=n,this.passphrase=r,this.restClient=e,this.utoxsSyncing=!1,this.hdPrivateKey=this.mnemonic.toHDPrivateKey(this.passphrase,g.NETWORK),this.path&&(this.hdPrivateKey=this.hdPrivateKey.derive(this.path)),this.utxos=[],this.syncUtxos()}get chain(){return this.restClient.chain}get network(){return this.restClient.network}getMnemonic(){return this.mnemonic}getPath(){return this.path}getUtxos(){return this.utxos}derive(t=0,e=!1){const s=new Tt(this.mnemonic,this.restClient);return s.path=`${this.path}${this.path.length?"/":""}${t}${e?"'":""}`,s.hdPrivateKey=this.hdPrivateKey.derive(t,e),s}static getHdPrivateKey(){return new y}getPrivateKey(){return this.hdPrivateKey.privateKey}getPublicKey(){return this.hdPrivateKey.publicKey}getAddress(){return this.address=this.address||this.getPublicKey().toAddress(this.network),this.address}syncUtxos(){return o(this,void 0,void 0,(function*(){this.utoxsSyncing=!0,this.utxos=yield this.restClient.getUtxosFromAddress(this.getAddress()),this.utoxsSyncing=!1}))}waitUntilSynced(){return o(this,void 0,void 0,(function*(){for(;this.utoxsSyncing;)yield new Promise(t=>setTimeout(t,300))}))}getBalance(){return o(this,void 0,void 0,(function*(){const t=this.getAddress();return this.restClient.getBalance(t)}))}getBalanceLowerBounds(){return o(this,void 0,void 0,(function*(){return yield this.waitUntilSynced(),this.utxos.reduce((t,e)=>t+e.satoshis,0)}))}getUtxosToSpend(t){return o(this,void 0,void 0,(function*(){yield this.waitUntilSynced();for(let t=this.utxos.length-1;t>0;t-=1){const e=Math.floor(Math.random()*(t+1));[this.utxos[t],this.utxos[e]]=[this.utxos[e],this.utxos[t]]}return this.getUtxosWithSatoshis(t)}))}getUtxosWithSatoshis(t){let e=0;const s=[];let n=0;for(;e<t&&n<this.utxos.length;)s.push(this.utxos[n]),e+=this.utxos[n].satoshis,n+=1;if(e>=t)return s;throw new Error(`Insufficient balance in address ${this.getAddress().toString()} on ${g.NETWORK} ${g.CHAIN}. Found ${e}, required ${t}.`)}fundAndSendTransaction(t,e=!1){return o(this,void 0,void 0,(function*(){t.feePerKb(g.DEFAULT_FEE);const s=t._estimateFee()+100;const n=yield this.getUtxosToSpend(t._getOutputAmount()-t._getInputAmount()+s);n.forEach(e=>t.from(e)),t.change(this.getAddress()),t.sign(this.getPrivateKey());const r=yield this.restClient.sendTransaction(t,e);this.utxos=this.utxos.filter(t=>!n.includes(t));const i=t.getChangeOutput();return i&&this.utxos.push({txId:t.getTxId(),vout:t.getChangeIndex(),satoshis:i.satoshis,amount:i.satoshis/1e8,scriptPubKey:i.script.toHex()}),r}))}send(t,e){return o(this,void 0,void 0,(function*(){const s=new Pt(this.chain,this.network);const n=s.to(e,t);if(s!==n)throw new Error("panic");return this.fundAndSendTransaction(s)}))}}let Bt;if("undefined"==typeof window){const{LocalStorage:t}=require("node-localstorage");Bt=new t("./uls-scratch")}else void 0!==window.localStorage&&(Bt=window.localStorage);var Kt=Bt;class Nt{static serialize(t){return JSON.stringify(Object.entries(t))}static deserialize(t,e){const s=e?new e:{};return JSON.parse(t).forEach(([t,e])=>{s[t]=e}),s}static set(t){if(void 0===t._rev)throw new Error("Rev not set in Cache.set");const e="Object"===t.constructor.name?JSON.stringify({data:Nt.serialize(t)}):JSON.stringify({data:Nt.serialize(t),clazz:t.constructor.toString()});return Kt.setItem(t._rev,e),t._rev}static get(t){const{data:e,clazz:s}=JSON.parse(Kt.getItem(t||""))||{};if(e){const t="string"==typeof s?eval(`(${s})`):void 0;return this.deserialize(e,t)}return null}}class Dt{constructor(t,e){this.chain=t,this.network=e}get(t){return o(this,void 0,void 0,(function*(){const e=Nt.get(t);if(e)return e;const[s,n]=t.split(":");const r=yield Pt.fromTxId(s,this.chain,this.network);yield r.fetchOutputData();const i=r.outputData;const{__index:c}=i[0];const{__cls:a,__func:u,__args:d}=i[c.obj];const h=yield r.getVirtualInputs();const l=yield Promise.all(Object.values(c).map(t=>o(this,void 0,void 0,(function*(){return h[t]?this.get(h[t]):Promise.resolve({})}))));const p=Object.keys(c).map((t,e)=>[t,l[e]]);const f=Object.fromEntries(p);let g=f.obj;delete f.obj;const _=Object.entries(f).reduce((t,[e,s])=>(Number.isNaN(parseInt(e,10))||(t[parseInt(e,10)]=s),t),[]);const w=lt(_,d);let v;if("constructor"===u){const t=eval(`(${a})`);g=new t(...w)}else{const t=g[u].bind(g);v=Reflect.apply(t,g,w)}const b=c;Object.entries(b).forEach(([t,e])=>{"obj"===t&&G(g,i,e,s),G("res"===t?v:_[t],i,e,s)});const m=g._rootId||`${s}:${b.obj}`;return Q([g,v,..._],m),[g,v,..._].filter(t=>!$(t)).map(Nt.set),[..._,g,v][n]}))}}class $t{constructor(t={}){const{seed:e,chain:s=g.CHAIN,network:n=g.NETWORK,mnemonic:r=new m(e),wocApiKey:i,path:o="m/44'/0'/0'/0",passphrase:c=""}=t;if(!s||!["BSV","BCH"].includes(s))throw new Error("Please set 'chain' to 'BSV' or 'BCH' when creating a computer instance");if(!n||!["livenet","testnet"].includes(n))throw new Error("Please set 'network' to 'testnet' or 'livenet' when creating a computer instance");if(!r)throw new Error("Please set 'seed' to a valid BIP 39 mnemonic string when creating a computer instance");this.restClient=new xt(s,n,i);const{db:a=new Ct(new Tt(r,this.restClient,{path:o,passphrase:c}))}=t;this.db=a,this.reader=new Dt(this.chain,this.network)}get chain(){return this.db.chain}get network(){return this.db.network}static parseContract(t){if("string"==typeof t){const e=t.startsWith("export ")?t.slice(7):t;const s=e.startsWith("default ")?e.slice(8):e;return eval(`(${s})`)}return t}new(t,e=[]){return o(this,void 0,void 0,(function*(){if(!t)throw new Error("Please enter a valid Class");const s=new ft(this.db);const n=$t.parseContract(t);const r=new Proxy(n,s);const i=yield new r(...e);return new Proxy(i,s)}))}sync(t){return o(this,void 0,void 0,(function*(){pt(t);const e=yield this.reader.get(t);const s=new ft(this.db);return new Proxy(e,s)}))}getOwnedRevs(t=this.db.wallet.getPublicKey()){return o(this,void 0,void 0,(function*(){return this.db.wallet.restClient.getOwnedRevs(t)}))}getRevs(t=this.db.wallet.getPublicKey()){return o(this,void 0,void 0,(function*(){return(yield this.db.wallet.restClient.getOwnedRevs(t)).map(({txId:t,virtualIndex:e})=>`${t}:${e}`)}))}getLatestRev(t){return o(this,void 0,void 0,(function*(){return this.db.wallet.restClient.getLatestRev(t)}))}getLatestRevs(t){return o(this,void 0,void 0,(function*(){return this.db.wallet.restClient.getLatestRevs(t)}))}}return $t}(BitcoinSource,axios);
