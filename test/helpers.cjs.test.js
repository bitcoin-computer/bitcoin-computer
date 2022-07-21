"use strict";var t=require("chai");require("ses");var e=require("bitcoin-computer-bitcore");var r=require("axios");require("child_process"),require("crypto");var n=require("crypto-js");var s=require("eciesjs");function o(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e=Object.create(null);return t&&Object.keys(t).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,n.get?n:{enumerable:!0,get:function(){return t[r]}})}})),e.default=t,Object.freeze(e)}var c=o(r);var a=o(n);var u=i(s);function h(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(n=Object.getOwnPropertySymbols(t);s<n.length;s++)e.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(t,n[s])&&(r[n[s]]=t[n[s]])}return r}function p(t,e,r,n){var s,o=arguments.length,i=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,r,n);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(i=(o<3?s(i):o>3?s(e,r,i):s(e,r))||i);return o>3&&i&&Object.defineProperty(e,r,i),i}function d(t,e,r,n){return new(r||(r=Promise))((function(s,o){function i(t){try{a(n.next(t))}catch(t){o(t)}}function c(t){try{a(n.throw(t))}catch(t){o(t)}}function a(t){var e;t.done?s(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(i,c)}a((n=n.apply(t,e||[])).next())}))}const{crypto:f}=e.Bitcoin;const l=(t,e)=>{const r=Date.now();const n=f.Hash.sha256(Buffer.from(e+r));const s=[f.ECDSA.sign(n,t,"big").toString("hex"),t.publicKey.toString(),r];return`Bearer ${Buffer.from(s.join(":")).toString("base64")}`};class g{constructor(t,e,r={}){this.baseUrl=t,this.headers=r,this.privateKey=e}get(t){return d(this,void 0,void 0,(function*(){const e=this.privateKey?{Authentication:l(this.privateKey,this.baseUrl)}:{};return(yield c.default.get(`${this.baseUrl}${t}`,{headers:Object.assign(Object.assign({},this.headers),e)})).data}))}post(t,e){return d(this,void 0,void 0,(function*(){const r=this.privateKey?{Authentication:l(this.privateKey,this.baseUrl)}:{};return(yield c.default.post(`${this.baseUrl}${t}`,e,{headers:Object.assign(Object.assign({},this.headers),r)})).data}))}delete(t){return d(this,void 0,void 0,(function*(){const e=this.privateKey?{Authentication:l(this.privateKey,this.baseUrl)}:{};return(yield c.default.delete(`${this.baseUrl}${t}`,{headers:Object.assign(Object.assign({},this.headers),e)})).data}))}}var v=process.env.CHAIN||"LTC",_=process.env.NETWORK||"testnet",b=process.env.BCN_URL||"https://node.bitcoincomputer.io";process.env.RPC_USER,process.env.RPC_PASSWORD;class m extends class{constructor({chain:t=v,network:e=_}={}){this.chain=t,this.network=e}}{constructor({chain:t=v,network:e=_,url:r=b}={}){super({chain:t,network:e}),this.url=r}}const{PrivateKey:y,Transaction:w}=e.Bitcoin;const{UnspentOutput:O}=w;function E(t){if(!/^[0-9A-Fa-f]{64}$/.test(t))throw new Error(`Invalid txId: ${t}`)}function x(t){if(!/^[0-9A-Fa-f]{64}\/\d+$/.test(t))throw new Error(`Invalid outId: ${t}`)}function S(t){x(t);const[e,r]=t.split("/");return{txId:e,outputIndex:parseInt(r,10)}}let I=class{constructor({nodeConfig:t=new m,privateKey:e=new y}={}){this.nodeConfig=t,this.bcn=new g(t.url,e)}get chain(){return this.nodeConfig.chain}get network(){return this.nodeConfig.network}get url(){return this.nodeConfig.url}getBalance(t){return d(this,void 0,void 0,(function*(){const{chain:e,network:r}=this;return yield this.bcn.get(`/v1/${e}/${r}/address/${t}/balance`)}))}getTransactions(t){return d(this,void 0,void 0,(function*(){return(yield this.getRawTxs(t)).map((t=>new w(t)))}))}getRawTxs(t){return d(this,void 0,void 0,(function*(){t.map(E);const{chain:e,network:r}=this;return this.bcn.post(`/v1/${e}/${r}/tx/bulk/`,{txIds:t})}))}sendTransaction(t){return d(this,void 0,void 0,(function*(){return this.bcn.post(`/v1/${this.chain}/${this.network}/tx/send`,{rawTx:t})}))}getUtxosByAddress(t){return d(this,void 0,void 0,(function*(){const{chain:e,network:r}=this;return(yield this.bcn.get(`/v1/${e}/${r}/wallet/${t.toString()}/utxos`)).map((({rev:t,scriptPubKey:e,satoshis:r})=>{const[n,s]=t.split("/");return new O({txId:n,outputIndex:parseInt(s,10),satoshis:r,script:e})}))}))}query({publicKey:t,classHash:e}){return d(this,void 0,void 0,(function*(){if(void 0===t&&void 0===e)throw new Error("Query parameters cannot be empty.");let r="";t&&(r+=`?publicKey=${t}`),e&&(r+=0===r.length?"?":"&",r+=`classHash=${e}`);const{chain:n,network:s}=this;return this.bcn.get(`/v1/${n}/${s}/non-standard-utxos${r}`)}))}idsToRevs(t){return d(this,void 0,void 0,(function*(){t.map(x);const{chain:e,network:r}=this;return this.bcn.post(`/v1/${e}/${r}/revs`,{ids:t})}))}rpc(t,e){return d(this,void 0,void 0,(function*(){return this.bcn.post(`/v1/${this.chain}/${this.network}/rpc`,{method:t,params:e})}))}static getSecretOutput({_url:t,privateKey:e}){return d(this,void 0,void 0,(function*(){const r=t.split("/");const n=r[r.length-1];const s=r.slice(0,-2).join("/");const o=new g(s,e);return{host:s,data:yield o.get(`/v1/store/${n}`)}}))}static setSecretOutput({secretOutput:t,host:e,privateKey:r}){return d(this,void 0,void 0,(function*(){return new g(e,r).post("/v1/store/",t)}))}static deleteSecretOutput({_url:t,privateKey:e}){return d(this,void 0,void 0,(function*(){const r=t.split("/");const n=r[r.length-1];const s=r.slice(0,-2).join("/");const o=new g(s,e);yield o.delete(`/v1/store/${n}`)}))}};I=p([t=>t],I);const N=parseInt(process.env.BC_DUST_LIMIT||"",10)||1546;const A=parseInt(process.env.BC_DEFAULT_FEE||"",10)||2500;var j={MIN_NON_DUST_AMOUNT:N,SCRIPT_CHUNK_SIZE:parseInt(process.env.BC_SCRIPT_CHUNK_SIZE||"",10)||479,DEFAULT_FEE:A,SIGHASH_ALL:1,FEE_PER_KB:2e4,PUBLIC_KEY_SIZE:65,ANYONE_CAN_SPEND_MNEMONIC:"replace this seed",PASSPHRASE:"",ENCODING_LENGTH:3,ENCODING_NUMBER_LENGTH:3,MAX_PUBKEYS_PER_SCRIPT:3,OP_RETURN_SIZE:80,CHANGE_OUTPUT_MAX_SIZE:62};const{PublicKey:T,crypto:P}=e.Bitcoin;const{Point:C}=P;function $(t){return Buffer.from(t,"hex").toString().replace(/\0/g,"")}function R(t,e,r){if(t.length*Math.log2(e)>53)throw new Error(`Input too large ${t.length} ${Math.log2(e)}`);if(![2,10,16].includes(e)||![2,10,16].includes(r))throw new Error("ToBase or FromBase invalid in covertNumber.");if(2===e&&t.length%8!=0)throw new Error("Binary strings must be byte aligned.");if(16===e&&t.length%2!=0)throw new Error("Hex strings must be of even length.");const n=parseInt(t,e).toString(r);return 2===r?n.padStart(8*Math.ceil(n.length/8),"0"):16===r?n.padStart(2*Math.ceil(n.length/2),"0"):n}function U(t,e){const r=new RegExp(`.{1,${e}}`,"g");return t.match(r)||[]}function B(t){return U(t,2).map((t=>R(t,16,2))).join("")}function K(t){return U(t,8).map((t=>R(t,2,16))).join("")}function D(t){return t.toString(16).padStart(j.ENCODING_NUMBER_LENGTH,"0")}function k(t){return parseInt(t,16)}function M(t){if(62!==t.length)throw new Error("Input to hexToPublicKey must be of length 62");let e=!1;let r=0;let n;for(;!e;){if(r>=256)throw new Error("Something went wrong storing data");const i=r.toString(16).padStart(2,"0")+K((o=r,(s=B(t).padStart(64,"0")).slice(o)+s.slice(0,o)));try{n=C.fromX(!1,i),e=!0}catch(t){r+=1}}var s,o;if(!n)throw new Error("Something went wrong storing data");return new T(n)}function H(t){const e=t.point.getX().toString("hex").padStart(64,"0");const r=R(e.slice(0,2),16,10);return K((s=parseInt(r,10),(n=B(e.slice(2))).slice(-s)+n.slice(0,-s)));var n,s}const{PublicKey:G,Script:L}=e.Bitcoin;function q(t){if(t.length>j.MAX_PUBKEYS_PER_SCRIPT)throw new Error("Too many owners");return function(t){const e=new L;return e.add("OP_1"),t.forEach((t=>{e.add(t)})),e.add(`OP_${t.length}`),e.add("OP_CHECKMULTISIG"),e}(t.map((t=>t.toBuffer())))}function F(t){return function(t){return t.chunks.filter((t=>t.buf)).map((t=>t.buf))}(t).map((t=>G.fromBuffer(t)))}function X(t){const e=t.substr(0,4);const r=t.substr(5);if(!function(t,e){return function(t){return Buffer.from(a.default.SHA256(t).toString(),"hex").toString("hex").substr(0,4)}(t)===e}(r,e))throw new Error("Decryption failure");return r}const{Transaction:Z}=e.Bitcoin;const{Output:Y}=Z;const{UnspentOutput:J}=Z;let z=class{constructor(t,e,r){const n=new Z(r);n.feePerKb(j.FEE_PER_KB),this.nodeConfig=t,this.tx=n,this.outData=[],this.privateKey=e}get txId(){return this.tx.id}get chain(){return this.nodeConfig.chain}get network(){return this.nodeConfig.network}get restClient(){const{nodeConfig:t,privateKey:e}=this;return new I({nodeConfig:t,privateKey:e})}get inputs(){return this.tx.inputs.map((t=>`${t.prevTxId.toString("hex")}/${t.outputIndex}`))}get inRevs(){const{enc:t}=this;let[e]=t;return e=Number.isFinite(e)?e:0,this.tx.inputs.slice(0,e).map((({prevTxId:t,outputIndex:e})=>`${t.toString("hex")}/${e}`))}get outRevs(){const{enc:t}=this;let[,e]=t;return e=Number.isFinite(e)?e:0,Array.from(Array(e).keys()).map((t=>`${this.tx.id}/${t}`))}get opReturns(){try{const{outputs:t}=this.tx;return t.filter((({script:t})=>t.isDataOut())).map((({script:t})=>t.getData())).map((t=>t.toString())).join()}catch(t){return""}}get enc(){return U(this.opReturns.slice(0,j.ENCODING_LENGTH*j.ENCODING_NUMBER_LENGTH),j.ENCODING_NUMBER_LENGTH).map(k)}get dataPrefix(){return this.opReturns.slice(9)}isFullyFunded(){return this.tx._getInputAmount()-this.tx._getOutputAmount()>=this.tx.getFee()}getOwnerOutputs(){const{enc:t}=this;const[,e=0]=t;return this.tx.outputs.slice(0,e)}getDataOutputs(){const{enc:t}=this;const[,e,r]=t;return this.tx.outputs.slice(e,r)}getOutData(t){return d(this,void 0,void 0,(function*(){try{const e=this.getDataOutputs().map((t=>t.script)).map((t=>F(t))).flat().map(H).map($).join("");const{dataPrefix:r}=this;const n=JSON.parse(r+e);const s=t.toBuffer().toString("hex");const o=this.getOwnerOutputs();if(o.length!==n.length)throw new Error("Inconsistent state");const i=o.map(((t,e)=>Object.assign(Object.assign({},n[e]),{_owners:F(t.script).map((t=>t.toString())),_amount:t.satoshis})));return Promise.all(i.map((e=>d(this,void 0,void 0,(function*(){try{const r=yield function(t){return e=>d(this,void 0,void 0,(function*(){if(function(t){return void 0!==t._url}(e)){const{_url:r}=e,n=h(e,["_url"]);const{host:s,data:o}=yield I.getSecretOutput({_url:r,privateKey:t});return Object.assign(Object.assign(Object.assign({},n),JSON.parse(o)),{_url:s})}return e}))}(t)(e);return function(t,e){if(function(t){return void 0!==t.__cypher&&void 0!==t.__secrets}(t)){const{__cypher:r,__secrets:n}=t,s=h(t,["__cypher","__secrets"]);return Object.assign(Object.assign(Object.assign({},s),JSON.parse(function({__cypher:t,__secrets:e},r){let n="";if(r.forEach((r=>{e.forEach((e=>{try{const s=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid privateKey");return X(u.decrypt(e,Buffer.from(t,"base64")).toString("utf8"))}(e,r);n=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid secret");const r=Buffer.from(e,"hex").toString("binary");return X(a.default.AES.decrypt(t,r).toString(a.default.enc.Utf8))}(t,s)}catch(t){const e=["Decryption failure","Unsupported state or unable to authenticate data"];if(t instanceof Error&&!e.includes(t.message))throw t}}))})),n)return n;throw new Error("Decryption failure")}({__cypher:r,__secrets:n},e))),{_readers:[]})}return t}(r,[s])}catch(t){return null}})))))}catch(t){return[]}}))}getOwners(){return this.getOwnerOutputs().map((t=>F(t.script).map((t=>t.toString()))))}getAmounts(){return this.getOwnerOutputs().map((t=>t.satoshis))}spendFromData(t){return d(this,void 0,void 0,(function*(){if(!t.length)return;const r=t.map(S);const n=r.map((t=>t.txId));const s=yield this.restClient.getTransactions(n);for(let t=0;t<r.length;t+=1){const{txId:n,outputIndex:o}=r[t];const{outputs:i}=s[t];const c=i[o];const a=Math.round(c.satoshis);const u=new e.Bitcoin.Script(c.script);const h=new J({txId:n,outputIndex:o,satoshis:a,script:u});const p=F(u).map((t=>t.toString()));this.tx.from([h],p,1)}}))}createDataOuts(t){t.forEach((({_amount:t,_owners:r=[]})=>{if(Array.isArray(r)&&r.length>j.MAX_PUBKEYS_PER_SCRIPT)throw new Error("Too many owners.");const n=r.map((t=>e.Bitcoin.PublicKey.fromString(t)));const s=t||j.MIN_NON_DUST_AMOUNT;const o=q(n);this.tx.addOutput(new Y({script:o,satoshis:s}))}));const r=t.map((t=>h(t,["_amount","_owners"])));const n=j.MIN_NON_DUST_AMOUNT;const s=JSON.stringify(r);const o=j.OP_RETURN_SIZE-j.ENCODING_LENGTH*j.ENCODING_NUMBER_LENGTH;const i=s.slice(0,o);const c=function(t){var e;return function(t,e){const r=[];for(let n=0;n<t.length;n+=e)r.push(t.slice(n,n+e));return r}(U((e=t,Buffer.from(e).toString("hex")),62).map((t=>t.padStart(62,"0"))).map(M),j.MAX_PUBKEYS_PER_SCRIPT).map((t=>q(t)))}(s.slice(o));const a=D(this.tx.inputs.length)+D(this.tx.outputs.length)+D(this.tx.outputs.length+c.length);c.forEach((t=>{this.tx.addOutput(new Y({script:t,satoshis:n}))})),this.tx.addData(a+i)}static fromTxHex(t,e,r){return d(this,void 0,void 0,(function*(){let n=[];let s=[];let o=[];const i=new this(e,r);i.tx.fromString(t);try{n=yield i.getOutData(r)}catch(t){}try{s=i.getOwners()}catch(t){}try{o=i.getAmounts()}catch(t){}return i.outData=n.map(((t,e)=>Object.assign(Object.assign({},t),{_owners:s[e],_amount:o[e]}))),i}))}static fromTxId(t,e,r){return d(this,void 0,void 0,(function*(){const n=new I({nodeConfig:e,privateKey:r});const[s]=yield n.getRawTxs([t]);return this.fromTxHex(s,e,r)}))}};z=p([t=>t],z);const W=t=>(Object.prototype.toString.call(t).match(/\s([a-zA-Z]+)/)||[])[1];const Q=t=>"object"==typeof t?W(t):W(t).toLowerCase();const V=t=>{if((t=>["number","string","boolean","undefined","Null"].includes(Q(t)))(t))return t;if((t=>"Array"===Q(t))(t))return t.map(V);if((t=>"Object"===Q(t))(t)){const e=Object.keys(t).reduce(((e,r)=>(e[r]=V(t[r]),e)),{});const r=Object.create(Object.getPrototypeOf(t));return Object.assign(r,e)}throw new Error(`Unsupported data type for clone: ${Q(t)}`)};function tt(t,e){let r=0;return e.map((e=>"__"===e?t[r++]:e))}function et(t){return{smartArgs:t.filter((t=>t._rev)),dumbArgs:t.map((t=>t._rev?"__":t))}}describe("helpers",(()=>{describe("splitArgs",(()=>{it("should work for an array of dumb objects",(()=>{t.expect(et([{a:1},{b:2}])).to.deep.eq({dumbArgs:[{a:1},{b:2}],smartArgs:[]})})),it("should work for an array of smart objects",(()=>{t.expect(et([{a:1,_rev:"rev1"},{b:2,_rev:"rev1"}])).to.deep.eq({dumbArgs:["__","__"],smartArgs:[{_rev:"rev1",a:1},{_rev:"rev1",b:2}]})})),it("should work for an array of smart objects",(()=>{t.expect(et([{a:1},{b:2,_rev:"rev1"}])).to.deep.eq({dumbArgs:[{a:1},"__"],smartArgs:[{_rev:"rev1",b:2}]})}))})),describe("mergeArgs",(()=>{it("should work for an array of dumb objects",(()=>{const e=[{a:1}];const r=V(e);t.expect(tt(e,["__"])).to.deep.eq([{a:1}]),t.expect(r).to.deep.eq(e)})),it("should work for an array of dumb objects",(()=>{const e=[{a:1},{b:2}];const{smartArgs:r,dumbArgs:n}=et(e);t.expect(tt(r,n)).to.deep.eq(e)})),it("should work for an array of smart objects",(()=>{const e=[{a:1,_rev:"rev0"},{b:2,_rev:"rev0"}];const{smartArgs:r,dumbArgs:n}=et(e);t.expect(tt(r,n)).to.deep.eq(e)})),it("should work for a mixed array of objects",(()=>{const e=[{a:1},{b:2,_rev:"rev0"}];const{smartArgs:r,dumbArgs:n}=et(e);t.expect(tt(r,n)).to.deep.eq(e)}))}))}));
