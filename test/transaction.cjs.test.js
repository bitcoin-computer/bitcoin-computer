"use strict";var t=require("bitcoin-computer-bitcore");var e=require("chai");var n=require("axios");require("child_process");var r=require("crypto");var o=require("crypto-js");var s=require("eciesjs");require("exponential-backoff"),require("ses");var i=require("http");var a=require("https");var c=require("url");var u=require("util");function d(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}function p(t){if(t&&t.__esModule)return t;var e=Object.create(null);return t&&Object.keys(t).forEach((function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:function(){return t[n]}})}})),e.default=t,Object.freeze(e)}var l=d(n);var f=d(r);var h=d(o);var g=p(s);var w=d(i);var b=d(a);var _=d(c);var S=d(u);function m(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]])}return n}function x(t,e,n,r){var o,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(i=(s<3?o(i):s>3?o(e,n,i):o(e,n))||i);return s>3&&i&&Object.defineProperty(e,n,i),i}function v(t,e,n,r){return new(n||(n=Promise))((function(o,s){function i(t){try{c(r.next(t))}catch(t){s(t)}}function a(t){try{c(r.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,a)}c((r=r.apply(t,e||[])).next())}))}const{crypto:O}=t.Bitcoin;const y=(t,e)=>{const n=Date.now();const r=O.Hash.sha256(Buffer.from(e+n));const o=[O.ECDSA.sign(r,t,"big").toString("hex"),t.publicKey.toString(),n];return`Bearer ${Buffer.from(o.join(":")).toString("base64")}`};class T{constructor(t,e,n={}){this.baseUrl=t,this.headers=n,this.privateKey=e}get(t){return v(this,void 0,void 0,(function*(){const e=this.privateKey?{Authentication:y(this.privateKey,this.baseUrl)}:{};return(yield l.default.get(`${this.baseUrl}${t}`,{headers:Object.assign(Object.assign({},this.headers),e)})).data}))}post(t,e){return v(this,void 0,void 0,(function*(){const n=this.privateKey?{Authentication:y(this.privateKey,this.baseUrl)}:{};return(yield l.default.post(`${this.baseUrl}${t}`,e,{headers:Object.assign(Object.assign({},this.headers),n)})).data}))}delete(t){return v(this,void 0,void 0,(function*(){const e=this.privateKey?{Authentication:y(this.privateKey,this.baseUrl)}:{};return(yield l.default.delete(`${this.baseUrl}${t}`,{headers:Object.assign(Object.assign({},this.headers),e)})).data}))}}var I={CHAIN:process.env.CHAIN||"LTC",NETWORK:process.env.NETWORK||"testnet",BCN_URL:process.env.BCN_URL||"https://node.bitcoincomputer.io",RPC_USER:process.env.RPC_USER||"bcn-admin",RPC_PASSWORD:process.env.RPC_PASSWORD||"kH4nU5Okm6-uyC0_mA5ztVNacJqZbYd_KGLl6mx722A=",TEST_MNEMONICS:"travel upgrade inside soda birth essence junk merit never twenty system opinion;toddler hockey salute wheel harvest video narrow riot guitar lake sea call;cannon hour begin test replace fury motion squirrel envelope announce neck culture"};class N extends class{constructor({chain:t=I.CHAIN,network:e=I.NETWORK}={}){this.chain=t,this.network=e}}{constructor({chain:t=I.CHAIN,network:e=I.NETWORK,url:n=I.BCN_URL}={}){super({chain:t,network:e}),this.url=n}}const{PrivateKey:P,Transaction:C}=t.Bitcoin;const{UnspentOutput:R}=C;function A(t){if(!/^[0-9A-Fa-f]{64}$/.test(t))throw new Error(`Invalid txId: ${t}`)}function E(t){if(!/^[0-9A-Fa-f]{64}\/\d+$/.test(t))throw new Error(`Invalid outId: ${t}`)}function B(t){E(t);const[e,n]=t.split("/");return{txId:e,outputIndex:parseInt(n,10)}}let U=class{constructor({nodeConfig:t=new N,privateKey:e=new P}={}){this.nodeConfig=t,this.bcn=new T(t.url,e)}get chain(){return this.nodeConfig.chain}get network(){return this.nodeConfig.network}get url(){return this.nodeConfig.url}getBalance(t){return v(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return yield this.bcn.get(`/v1/${e}/${n}/address/${t}/balance`)}))}getTransactions(t){return v(this,void 0,void 0,(function*(){return(yield this.getRawTxs(t)).map((t=>new C(t)))}))}getRawTxs(t){return v(this,void 0,void 0,(function*(){t.map(A);const{chain:e,network:n}=this;return this.bcn.post(`/v1/${e}/${n}/tx/bulk/`,{txIds:t})}))}sendTransaction(t){return v(this,void 0,void 0,(function*(){return this.bcn.post(`/v1/${this.chain}/${this.network}/tx/send`,{rawTx:t})}))}getUtxosByAddress(t){return v(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return(yield this.bcn.get(`/v1/${e}/${n}/wallet/${t.toString()}/utxos`)).map((({rev:t,scriptPubKey:e,satoshis:n})=>{const[r,o]=t.split("/");return new R({txId:r,outputIndex:parseInt(o,10),satoshis:n,script:e})}))}))}query({publicKey:t,classHash:e}){return v(this,void 0,void 0,(function*(){if(void 0===t&&void 0===e)throw new Error("Query parameters cannot be empty.");let n="";t&&(n+=`?publicKey=${t}`),e&&(n+=0===n.length?"?":"&",n+=`classHash=${e}`);const{chain:r,network:o}=this;return this.bcn.get(`/v1/${r}/${o}/non-standard-utxos${n}`)}))}idsToRevs(t){return v(this,void 0,void 0,(function*(){t.map(E);const{chain:e,network:n}=this;return this.bcn.post(`/v1/${e}/${n}/revs`,{ids:t})}))}rpc(t,e){return v(this,void 0,void 0,(function*(){return this.bcn.post(`/v1/${this.chain}/${this.network}/rpc`,{method:t,params:e})}))}static getSecretOutput({_url:t,privateKey:e}){return v(this,void 0,void 0,(function*(){const n=t.split("/");const r=n[n.length-1];const o=n.slice(0,-2).join("/");const s=new T(o,e);return{host:o,data:yield s.get(`/v1/store/${r}`)}}))}static setSecretOutput({secretOutput:t,host:e,privateKey:n}){return v(this,void 0,void 0,(function*(){return new T(e,n).post("/v1/store/",t)}))}static deleteSecretOutput({_url:t,privateKey:e}){return v(this,void 0,void 0,(function*(){const n=t.split("/");const r=n[n.length-1];const o=n.slice(0,-2).join("/");const s=new T(o,e);yield s.delete(`/v1/store/${r}`)}))}};U=x([t=>t],U);const M=parseInt(process.env.BC_DUST_LIMIT||"",10)||1546;const H=parseInt(process.env.BC_DEFAULT_FEE||"",10)||2500;var j={MIN_NON_DUST_AMOUNT:M,SCRIPT_CHUNK_SIZE:parseInt(process.env.BC_SCRIPT_CHUNK_SIZE||"",10)||479,DEFAULT_FEE:H,SIGHASH_ALL:1,FEE_PER_KB:2e4,PUBLIC_KEY_SIZE:65,ANYONE_CAN_SPEND_MNEMONIC:"replace this seed",PASSPHRASE:"",ENCODING_LENGTH:3,ENCODING_NUMBER_LENGTH:3,MAX_PUBKEYS_PER_SCRIPT:3,OP_RETURN_SIZE:80,CHANGE_OUTPUT_MAX_SIZE:62};const{PublicKey:D,crypto:k}=t.Bitcoin;const{Point:K}=k;function q(t){return Buffer.from(t,"hex").toString().replace(/\0/g,"")}function L(t,e,n){if(t.length*Math.log2(e)>53)throw new Error(`Input too large ${t.length} ${Math.log2(e)}`);if(![2,10,16].includes(e)||![2,10,16].includes(n))throw new Error("ToBase or FromBase invalid in covertNumber.");if(2===e&&t.length%8!=0)throw new Error("Binary strings must be byte aligned.");if(16===e&&t.length%2!=0)throw new Error("Hex strings must be of even length.");const r=parseInt(t,e).toString(n);return 2===n?r.padStart(8*Math.ceil(r.length/8),"0"):16===n?r.padStart(2*Math.ceil(r.length/2),"0"):r}function F(t,e){const n=new RegExp(`.{1,${e}}`,"g");return t.match(n)||[]}function $(t){return F(t,2).map((t=>L(t,16,2))).join("")}function G(t){return F(t,8).map((t=>L(t,2,16))).join("")}function W(t){return t.toString(16).padStart(j.ENCODING_NUMBER_LENGTH,"0")}function Y(t){return parseInt(t,16)}function J(t){if(62!==t.length)throw new Error("Input to hexToPublicKey must be of length 62");let e=!1;let n=0;let r;for(;!e;){if(n>=256)throw new Error("Something went wrong storing data");const i=n.toString(16).padStart(2,"0")+G((s=n,(o=$(t).padStart(64,"0")).slice(s)+o.slice(0,s)));try{r=K.fromX(!1,i),e=!0}catch(t){n+=1}}var o,s;if(!r)throw new Error("Something went wrong storing data");return new D(r)}function V(t){const e=t.point.getX().toString("hex").padStart(64,"0");const n=L(e.slice(0,2),16,10);return G((o=parseInt(n,10),(r=$(e.slice(2))).slice(-o)+r.slice(0,-o)));var r,o}function z(t=I.CHAIN,e=I.NETWORK){if("testnet"===e||"regtest"===e)return 1;if("BTC"===t)return 0;if("LTC"===t)return 2;if("DOGE"===t)return 3;if("BCH"===t)return 145;if("BSV"===t)return 236;throw new Error(`Unsupported chain ${t}`)}function Z(){return Math.round(Math.random()*Math.pow(2,31))}const{PublicKey:X,Script:Q}=t.Bitcoin;function tt(t){if(t.length>j.MAX_PUBKEYS_PER_SCRIPT)throw new Error("Too many owners");return function(t){const e=new Q;return e.add("OP_1"),t.forEach((t=>{e.add(t)})),e.add(`OP_${t.length}`),e.add("OP_CHECKMULTISIG"),e}(t.map((t=>t.toBuffer())))}function et(t){return function(t){return t.chunks.filter((t=>t.buf)).map((t=>t.buf))}(t).map((t=>X.fromBuffer(t)))}function nt(t){return Buffer.from(h.default.SHA256(t).toString(),"hex").toString("hex").substr(0,4)}function rt(t){return`${nt(t)};${t}`}function ot(t){const e=t.substr(0,4);const n=t.substr(5);if(!function(t,e){return nt(t)===e}(n,e))throw new Error("Decryption failure");return n}function st(t){if(void 0!==t._readers){const{_readers:e,_url:n,_owners:r,_amount:o}=t,s=m(t,["_readers","_url","_owners","_amount"]);const i=function(t,e){const n=f.default.randomBytes(32).toString("hex");const r=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid secret");const n=Buffer.from(e,"hex").toString("binary");const r=rt(t);return h.default.AES.encrypt(r,n).toString()}(t,n);const o=e.map((t=>function(t,e){if(!/^0[2-3][0-9a-f]{64}|04[0-9a-f]{128}$/.test(e))throw new Error("Invalid publicKey");const n=rt(t);return g.encrypt(e,Buffer.from(n,"utf8")).toString("base64")}(n,t)));return{__cypher:r,__secrets:o}}(JSON.stringify(s),e);return void 0!==n&&(i._url=n),void 0!==r&&(i._owners=r),void 0!==o&&(i._amount=o),i}return t}const{Transaction:at}=t.Bitcoin;const{Output:ct}=at;const{UnspentOutput:ut}=at;let dt=class{constructor(t,e,n){const r=new at(n);r.feePerKb(j.FEE_PER_KB),this.nodeConfig=t,this.tx=r,this.outData=[],this.privateKey=e}get txId(){return this.tx.id}get chain(){return this.nodeConfig.chain}get network(){return this.nodeConfig.network}get restClient(){const{nodeConfig:t,privateKey:e}=this;return new U({nodeConfig:t,privateKey:e})}get inputs(){return this.tx.inputs.map((t=>`${t.prevTxId.toString("hex")}/${t.outputIndex}`))}get inRevs(){const{enc:t}=this;let[e]=t;return e=Number.isFinite(e)?e:0,this.tx.inputs.slice(0,e).map((({prevTxId:t,outputIndex:e})=>`${t.toString("hex")}/${e}`))}get outRevs(){const{enc:t}=this;let[,e]=t;return e=Number.isFinite(e)?e:0,Array.from(Array(e).keys()).map((t=>`${this.tx.id}/${t}`))}get opReturns(){try{const{outputs:t}=this.tx;return t.filter((({script:t})=>t.isDataOut())).map((({script:t})=>t.getData())).map((t=>t.toString())).join()}catch(t){return""}}get enc(){return F(this.opReturns.slice(0,j.ENCODING_LENGTH*j.ENCODING_NUMBER_LENGTH),j.ENCODING_NUMBER_LENGTH).map(Y)}get dataPrefix(){return this.opReturns.slice(9)}isFullyFunded(){return this.tx._getInputAmount()-this.tx._getOutputAmount()>=this.tx.getFee()}getOwnerOutputs(){const{enc:t}=this;const[,e=0]=t;return this.tx.outputs.slice(0,e)}getDataOutputs(){const{enc:t}=this;const[,e,n]=t;return this.tx.outputs.slice(e,n)}getOutData(t){return v(this,void 0,void 0,(function*(){try{const e=this.getDataOutputs().map((t=>t.script)).map((t=>et(t))).flat().map(V).map(q).join("");const{dataPrefix:n}=this;const r=JSON.parse(n+e);const o=t.toBuffer().toString("hex");const s=this.getOwnerOutputs();if(s.length!==r.length)throw new Error("Inconsistent state");const i=s.map(((t,e)=>Object.assign(Object.assign({},r[e]),{_owners:et(t.script).map((t=>t.toString())),_amount:t.satoshis})));return Promise.all(i.map((e=>v(this,void 0,void 0,(function*(){try{const n=yield function(t){return e=>v(this,void 0,void 0,(function*(){if(function(t){return void 0!==t._url}(e)){const{_url:n}=e,r=m(e,["_url"]);const{host:o,data:s}=yield U.getSecretOutput({_url:n,privateKey:t});return Object.assign(Object.assign(Object.assign({},r),JSON.parse(s)),{_url:o})}return e}))}(t)(e);return function(t,e){if(function(t){return void 0!==t.__cypher&&void 0!==t.__secrets}(t)){const{__cypher:n,__secrets:r}=t,o=m(t,["__cypher","__secrets"]);return Object.assign(Object.assign(Object.assign({},o),JSON.parse(function({__cypher:t,__secrets:e},n){let r="";if(n.forEach((n=>{e.forEach((e=>{try{const o=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid privateKey");return ot(g.decrypt(e,Buffer.from(t,"base64")).toString("utf8"))}(e,n);r=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid secret");const n=Buffer.from(e,"hex").toString("binary");return ot(h.default.AES.decrypt(t,n).toString(h.default.enc.Utf8))}(t,o)}catch(t){const e=["Decryption failure","Unsupported state or unable to authenticate data"];if(t instanceof Error&&!e.includes(t.message))throw t}}))})),r)return r;throw new Error("Decryption failure")}({__cypher:n,__secrets:r},e))),{_readers:[]})}return t}(n,[o])}catch(t){return null}})))))}catch(t){return[]}}))}getOwners(){return this.getOwnerOutputs().map((t=>et(t.script).map((t=>t.toString()))))}getAmounts(){return this.getOwnerOutputs().map((t=>t.satoshis))}spendFromData(e){return v(this,void 0,void 0,(function*(){if(!e.length)return;const n=e.map(B);const r=n.map((t=>t.txId));const o=yield this.restClient.getTransactions(r);for(let e=0;e<n.length;e+=1){const{txId:r,outputIndex:s}=n[e];const{outputs:i}=o[e];const a=i[s];const c=Math.round(a.satoshis);const u=new t.Bitcoin.Script(a.script);const d=new ut({txId:r,outputIndex:s,satoshis:c,script:u});const p=et(u).map((t=>t.toString()));this.tx.from([d],p,1)}}))}createDataOuts(e){e.forEach((({_amount:e,_owners:n=[]})=>{if(Array.isArray(n)&&n.length>j.MAX_PUBKEYS_PER_SCRIPT)throw new Error("Too many owners.");const r=n.map((e=>t.Bitcoin.PublicKey.fromString(e)));const o=e||j.MIN_NON_DUST_AMOUNT;const s=tt(r);this.tx.addOutput(new ct({script:s,satoshis:o}))}));const n=e.map((t=>m(t,["_amount","_owners"])));const r=j.MIN_NON_DUST_AMOUNT;const o=JSON.stringify(n);const s=j.OP_RETURN_SIZE-j.ENCODING_LENGTH*j.ENCODING_NUMBER_LENGTH;const i=o.slice(0,s);const a=function(t){var e;return function(t,e){const n=[];for(let r=0;r<t.length;r+=e)n.push(t.slice(r,r+e));return n}(F((e=t,Buffer.from(e).toString("hex")),62).map((t=>t.padStart(62,"0"))).map(J),j.MAX_PUBKEYS_PER_SCRIPT).map((t=>tt(t)))}(o.slice(s));const c=W(this.tx.inputs.length)+W(this.tx.outputs.length)+W(this.tx.outputs.length+a.length);a.forEach((t=>{this.tx.addOutput(new ct({script:t,satoshis:r}))})),this.tx.addData(c+i)}static fromTxHex(t,e,n){return v(this,void 0,void 0,(function*(){let r=[];let o=[];let s=[];const i=new this(e,n);i.tx.fromString(t);try{r=yield i.getOutData(n)}catch(t){}try{o=i.getOwners()}catch(t){}try{s=i.getAmounts()}catch(t){}return i.outData=r.map(((t,e)=>Object.assign(Object.assign({},t),{_owners:o[e],_amount:s[e]}))),i}))}static fromTxId(t,e,n){return v(this,void 0,void 0,(function*(){const r=new U({nodeConfig:e,privateKey:n});const[o]=yield r.getRawTxs([t]);return this.fromTxHex(o,e,n)}))}};dt=x([t=>t],dt);const{CHAIN:pt="LTC",NETWORK:lt="regtest",RPC_USER:ft,RPC_PASSWORD:ht,RPC_HOST:gt}=process.env;const wt="LTC"===process.env.CHAIN?19332:8332;var bt=Object.assign(Object.assign({},I),{CHAIN:pt,NETWORK:lt,BCN_URL:"http://127.0.0.1:3000",RPC_PROTOCOL:"http",RPC_USER:ft,RPC_PASSWORD:ht,RPC_HOST:gt,RPC_PORT:wt,TEST_ADDRESSES:"mwADSUHvPCGrrX4ozP8Kcd5JCWK93rnc8h;moMoH1vTgCc2dkDfGSKYPnafxy22wSqgrr;mmQEk8VwtSehRryLF8jhVapYg553hJGhNa;miKQVhZbFKSsJcQZ8eXwBQ89xNyetpN34q;mzoGRNh55y9j57TPdwRGi3nt9X4CFwpqUS;n1X6JFDyxibtdhYrc7mrkuft6o168ELFNW;mjLcig6eTZVJkgRgJFMkwrYHpfMnZ1t4kk;mfYkMQAe7afeRSkgLxAtwnMVryjLTfr95Q"});var _t=w.default;var St=b.default;var mt=_.default;function xt(t){"string"==typeof t&&(t=function(t){var e=mt.parse(t);var n=e.hostname;var r=parseInt(e.port,10);var o=e.protocol;o=o.substring(0,o.length-1);var s=e.auth.split(":");return{host:n,port:r,protocol:o,user:s[0]?decodeURIComponent(s[0]):null,pass:s[1]?decodeURIComponent(s[1]):null}}(t)),t=t||{},this.host=t.host||"127.0.0.1",this.port=t.port||8332,this.user=t.user||"user",this.pass=t.pass||"pass",this.protocol="http"===t.protocol?_t:St,this.batchedCalls=null,this.disableAgent=t.disableAgent||!1;var e=void 0!==t.rejectUnauthorized;this.rejectUnauthorized=!e||t.rejectUnauthorized,xt.config.log?this.log=xt.config.log:this.log=xt.loggers[xt.config.logger||"normal"]}var vt=console.log.bind(console);var Ot=function(){};function yt(t,e){var n=this;t=JSON.stringify(t);var r=this.user+":"+this.pass;var o=Buffer.from&&Buffer.from!==Uint8Array.from?Buffer.from(r):new Buffer(r);this.auth=o.toString("base64");var s={host:n.host,path:"/",method:"POST",port:n.port,rejectUnauthorized:n.rejectUnauthorized,agent:!n.disableAgent&&void 0};if(n.httpOptions)for(var i in n.httpOptions)s[i]=n.httpOptions[i];var a=!1;var c="Bitcoin JSON-RPC: ";var u=this.protocol.request(s,(function(t){var r="";t.on("data",(function(t){r+=t})),t.on("end",(function(){if(!a)if(a=!0,401!==t.statusCode)if(403!==t.statusCode){if(500===t.statusCode&&"Work queue depth exceeded"===r.toString("utf8")){var o=new Error("Bitcoin JSON-RPC: "+r.toString("utf8"));return o.code=429,void e(o)}var s;try{s=JSON.parse(r)}catch(o){n.log.err(o.stack),n.log.err(r),n.log.err("HTTP Status code:"+t.statusCode);var i=new Error(c+"Error Parsing JSON: "+o.message);return void e(i)}e(s.error,s)}else e(new Error(c+"Connection Rejected: 403 Forbidden"));else e(new Error(c+"Connection Rejected: 401 Unnauthorized"))}))}));u.on("error",(function(t){var n=new Error(c+"Request Error: "+t.message);a||(a=!0,e(n))})),u.setHeader("Content-Length",t.length),u.setHeader("Content-Type","application/json"),u.setHeader("Authorization","Basic "+n.auth),u.write(t),u.end()}xt.loggers={none:{info:Ot,warn:Ot,err:Ot,debug:Ot},normal:{info:vt,warn:vt,err:vt,debug:Ot},debug:{info:vt,warn:vt,err:vt,debug:vt}},xt.config={logger:"normal"},xt.prototype.batch=function(t,e){this.batchedCalls=[],t(),yt.call(this,this.batchedCalls,e),this.batchedCalls=null},xt.callspec={abandonTransaction:"str",abortRescan:"",addMultiSigAddress:"",addNode:"",analyzePSBT:"str",backupWallet:"",bumpFee:"str",clearBanned:"",combinePSBT:"obj",combineRawTransaction:"obj",convertToPSBT:"str",createMultiSig:"",createPSBT:"obj",createRawTransaction:"obj obj",createWallet:"str",decodePSBT:"str",decodeScript:"str",decodeRawTransaction:"",deriveAddresses:"str",disconnectNode:"",dumpPrivKey:"",dumpWallet:"str",encryptWallet:"",enumerateSigners:"",estimateFee:"",estimateSmartFee:"int str",estimatePriority:"int",generate:"int",generateBlock:"str obj",generateToAddress:"int str",generateToDescriptor:"int str",getAccount:"",getAccountAddress:"str",getAddedNodeInfo:"",getAddressMempool:"obj",getAddressUtxos:"obj",getAddressBalance:"obj",getAddressDeltas:"obj",getAddressesByLabel:"str",getAddressInfo:"str",getAddressTxids:"obj",getAddressesByAccount:"",getBalance:"str int",getBalances:"",getBestBlockHash:"",getBlockDeltas:"str",getBlock:"str int",getBlockchainInfo:"",getBlockCount:"",getBlockFilter:"str",getBlockHashes:"int int obj",getBlockHash:"int",getBlockHeader:"str",getBlockNumber:"",getBlockStats:"str",getBlockTemplate:"",getConnectionCount:"",getChainTips:"",getChainTxStats:"",getDescriptorInfo:"str",getDifficulty:"",getGenerate:"",getHashesPerSec:"",getIndexInfo:"",getInfo:"",getMemoryInfo:"",getMemoryPool:"",getMemPoolAncestors:"str",getMemPoolDescendants:"str",getMemPoolEntry:"str",getMemPoolInfo:"",getMiningInfo:"",getNetTotals:"",getNetworkHashPS:"",getNetworkInfo:"",getNewAddress:"str str",getNodeAddresses:"",getPeerInfo:"",getRawChangeAddress:"",getRawMemPool:"bool",getRawTransaction:"str int",getReceivedByAccount:"str int",getReceivedByAddress:"str int",getReceivedByLabel:"str",getRpcInfo:"",getSpentInfo:"obj",getTransaction:"",getTxOut:"str int bool",getTxOutProof:"",getTxOutSetInfo:"",getUnconfirmedBalance:"",getWalletInfo:"",getWork:"",getZmqNotifications:"",finalizePSBT:"str",fundRawTransaction:"str",help:"",importAddress:"str str bool",importDescriptors:"str",importMulti:"obj obj",importPrivKey:"str str bool",importPrunedFunds:"str, str",importPubKey:"str",importWallet:"str",invalidateBlock:"str",joinPSBTs:"obj",keyPoolRefill:"",listAccounts:"int",listAddressGroupings:"",listBanned:"",listDescriptors:"",listLabels:"",listLockUnspent:"bool",listReceivedByAccount:"int bool",listReceivedByAddress:"int bool",listReceivedByLabel:"",listSinceBlock:"str int",listTransactions:"str int int",listUnspent:"int int",listWalletDir:"",listWallets:"",loadWallet:"str",lockUnspent:"",logging:"",move:"str str float int str",ping:"",preciousBlock:"str",prioritiseTransaction:"str float int",pruneBlockChain:"int",psbtBumpFee:"str",removePrunedFunds:"str",reScanBlockChain:"",saveMemPool:"",send:"obj",setHDSeed:"",setLabel:"str str",setWalletFlag:"str",scanTxOutSet:"str",sendFrom:"str str float int str str",sendMany:"str obj int str",sendRawTransaction:"str",sendToAddress:"str float str str",setAccount:"",setBan:"str str",setNetworkActive:"bool",setGenerate:"bool int",setTxFee:"float",signMessage:"",signMessageWithPrivKey:"str str",signRawTransaction:"",signRawTransactionWithKey:"str obj",signRawTransactionWithWallet:"str",stop:"",submitBlock:"str",submitHeader:"str",testMemPoolAccept:"obj",unloadWallet:"",upgradeWallet:"",uptime:"",utxoUpdatePSBT:"str",validateAddress:"",verifyChain:"",verifyMessage:"",verifyTxOutProof:"str",walletCreateFundedPSBT:"",walletDisplayAddress:"str",walletLock:"",walletPassPhrase:"string int",walletPassphraseChange:"",walletProcessPSBT:"str"};var Tt=function(t,e,n){return Array.prototype.slice.call(t,e,n)};function It(){return parseInt(1e5*Math.random())}!function(t,e,n){function r(t,e){return function(){var r=arguments.length-1;this.batchedCalls&&(r=arguments.length);for(var o=0;o<r;o++)e[o]&&(arguments[o]=e[o](arguments[o]));this.batchedCalls?this.batchedCalls.push({jsonrpc:"2.0",method:t,params:Tt(arguments),id:It()}):n.call(this,{method:t,params:Tt(arguments,0,arguments.length-1),id:It()},arguments[arguments.length-1])}}var o={str:function(t){return t.toString()},int:function(t){return parseFloat(t)},float:function(t){return parseFloat(t)},bool:function(t){return!0===t||"1"==t||"true"==t||"true"==t.toString().toLowerCase()},obj:function(t){return"string"==typeof t?JSON.parse(t):t}};for(var s in e){var i=[];if(e[s].length){i=e[s].split(" ");for(var a=0;a<i.length;a++)o[i[a]]?i[a]=o[i[a]]:i[a]=o.str}var c=s.toLowerCase();t.prototype[s]=r(c,i),t.prototype[c]=t.prototype[s]}}(xt,xt.callspec,yt);var Nt=xt;const Pt=new Nt({protocol:process.env.RPC_PROTOCOL,user:process.env.RPC_USER,pass:process.env.RPC_PASSWORD,host:process.env.RPC_HOST,port:process.env.RPC_PORT});S.default.promisify(Nt.prototype.createwallet.bind(Pt)),S.default.promisify(Nt.prototype.getaddressinfo.bind(Pt)),S.default.promisify(Nt.prototype.getBlock.bind(Pt)),S.default.promisify(Nt.prototype.getBlockchainInfo.bind(Pt)),S.default.promisify(Nt.prototype.getBlockHash.bind(Pt)),S.default.promisify(Nt.prototype.generateToAddress.bind(Pt)),S.default.promisify(Nt.prototype.getRawTransaction.bind(Pt)),S.default.promisify(Nt.prototype.importaddress.bind(Pt)),S.default.promisify(Nt.prototype.listunspent.bind(Pt)),S.default.promisify(Nt.prototype.sendRawTransaction.bind(Pt));const{PrivateKey:Ct,Opcode:Rt,Script:At,Mnemonic:Et,crypto:Bt,Transaction:Ut,encoding:Mt}=t.Bitcoin;const{CHAIN:Ht,NETWORK:jt,TEST_MNEMONICS:Dt}=I;function kt(t=0){return function(t=0){return function(t=0){return new Et(function(t=0){return Dt.split(";")[t]}(t))}().toHDPrivateKey("",jt).derive(function({chain:t=I.CHAIN,network:e=I.NETWORK,account:n=Z()}={}){return function({purpose:t=44,coinType:e=2,account:n=0}={}){return`m/${t.toString()}'/${e.toString()}'/${n.toString()}'`}({account:n,coinType:z(t,e)})}({account:t}))}(t).privateKey}function Kt(t=0){return kt(t).toPublicKey()}function qt(t=0){return Kt(t).toAddress()}function Lt(e=1e5,n=0){const r=At.buildPublicKeyHashOut(qt(n));return{address:qt(n),txId:"a477af6b2667c29670467e4e0728b685ee07b240235771862318e29ddbe58458",outputIndex:n,script:r,vout:0,amount:e/1e8,satoshis:e,scriptPubKey:"",inspect:()=>"",toObject:()=>new t.Bitcoin.Transaction.UnspentOutput({})}}new N;const{PrivateKey:Ft,PublicKey:$t,Script:Gt,Transaction:Wt,Address:Yt,crypto:Jt}=t.Bitcoin;const{Interpreter:Vt}=Gt;const{UnspentOutput:zt,Output:Zt}=Wt;const{Signature:Xt,Point:Qt}=Jt;const te=new Ft;const ee=new N;const ne=j.SIGHASH_ALL;const re=kt(0);const oe=kt(1);const se=Kt(0);const ie=Kt(1);const ae=Kt(2);const ce=[Kt(0).toString()];const ue=[Kt(1).toString()];const de={a:"a"};const pe={b:"b"};const le=j.MIN_NON_DUST_AMOUNT;describe("DataTransaction",(()=>{describe("constructor",(()=>{const t=new dt(ee,te);e.expect(t).to.not.be.undefined,e.expect(t.chain).eq(bt.CHAIN),e.expect(t.network).eq(bt.NETWORK),e.expect(t.tx).to.not.be.undefined,e.expect(Array.isArray(t.tx.inputs)).eq(!0),e.expect(Array.isArray(t.tx.outputs)).eq(!0)})),describe("enc",(()=>{it("should return the encoding",(()=>{const t=new dt(ee,te);t.createDataOuts([de]);const{enc:n}=t;e.expect(n).to.deep.eq([0,1,1])}))})),describe("opReturnString",(()=>{it("should return the opReturn string",(()=>{const t=new dt(ee,te);t.tx.addData("0123456789abcedf");const{dataPrefix:n}=t;e.expect(n).to.deep.eq("9abcedf")}))})),describe("getOutData",(()=>{it("should return the data of a transactions with one output",(()=>v(void 0,void 0,void 0,(function*(){const t=new dt(ee,te);const n=[Object.assign({_owners:ce,_amount:le},de)];t.createDataOuts(n),e.expect(yield t.getOutData(re)).to.deep.eq(n)})))),it("should return the data of a transactions with one large output",(()=>v(void 0,void 0,void 0,(function*(){const t=[{_owners:ce,_amount:le,a:"a".repeat(100)}];const n=new dt(ee,te);n.createDataOuts(t),e.expect(yield n.getOutData(re)).to.deep.eq(t)})))),it("should return the data of a transactions with two outputs",(()=>v(void 0,void 0,void 0,(function*(){const t=new dt(ee,te);const n=[Object.assign({_owners:ce,_amount:le},de),Object.assign({_owners:ce,_amount:le},pe)];t.createDataOuts(n),e.expect(yield t.getOutData(re)).to.deep.eq(n)})))),it("should return the data of a transactions if some outputs are encrypted",(()=>v(void 0,void 0,void 0,(function*(){const t=new dt(ee,te);const n=[Object.assign({_owners:ce,_readers:ce,_amount:le},de),Object.assign({_owners:ce,_readers:ue,_amount:le},pe)].map(st);t.createDataOuts(n);const r=Object.assign({_owners:ce,_readers:[],_amount:le},de);e.expect(yield t.getOutData(re)).to.deep.eq([r,null])}))))})),describe("getOwners",(()=>{it("should return the owners of a transactions",(()=>{const t=new dt(ee,te);t.createDataOuts([Object.assign({_owners:ce,_amount:le},de),Object.assign({_owners:ue,_amount:le},de)]),e.expect(t.getOwners()).to.deep.eq([ce,ue])}))})),describe("getAmounts",(()=>{it("should return the owners of a transactions",(()=>{const t=new dt(ee,te);t.createDataOuts([Object.assign({_owners:ce,_amount:1},de),Object.assign({_owners:ue,_amount:2},de)]),e.expect(t.getAmounts()).to.deep.eq([1,2])}))})),describe("to",(()=>{it("should add a p2pkh output",(()=>{const t=new dt(ee,te);t.tx.from([new Wt.UnspentOutput(Lt())]),t.tx.to(qt(),j.MIN_NON_DUST_AMOUNT),t.tx.sign(kt(),ne),e.expect(t.tx.id).to.be.an("string"),e.expect(t.inRevs).to.deep.eq([]),e.expect(t.inputs).to.deep.eq(["a477af6b2667c29670467e4e0728b685ee07b240235771862318e29ddbe58458/0"]),e.expect(t.tx.outputs[0].script.isPublicKeyHashOut()).eq(!0),e.expect(t.tx.verify()).eq(!0)})),it("should add a p2sh multisig output",(()=>{const t=[se,ie,ae];const n=Yt.createMultisig(t,2,bt.NETWORK,!1);const r=new dt(ee,te);r.tx.from([new Wt.UnspentOutput(Lt())]),r.tx.to(n,j.MIN_NON_DUST_AMOUNT),r.tx.sign(kt(),ne),e.expect(r.tx).to.not.be.undefined,e.expect(r.tx.outputs.length).eq(1),e.expect(r.tx.inputs.length).eq(1),e.expect(r.tx.outputs[0].script.isScriptHashOut()).eq(!0),e.expect(r.tx.verify()).eq(!0)})),it("should add a bare multisig output",(()=>{const t=(new Gt).add("OP_1").add(se.toBuffer()).add(ie.toBuffer()).add(ae.toBuffer()).add("OP_3").add("OP_CHECKMULTISIG");const n=new dt(ee,te);n.tx.from([new Wt.UnspentOutput(Lt())]),n.tx.addOutput(new Zt({script:t,satoshis:j.MIN_NON_DUST_AMOUNT})),n.tx.sign(kt(),ne),e.expect(n.tx).to.not.be.undefined,e.expect(n.tx.outputs.length).eq(1),e.expect(n.tx.inputs.length).eq(1),e.expect(n.tx.outputs[0].script.isMultisigOut()).eq(!0),e.expect(n.tx.verify()).eq(!0)})),it("should create compressed and uncompressed pk",(()=>{const t={bn:"96c132224121b509b7d0a16245e957d9192609c5637c6228311287b1be21627a",compressed:!1,network:"livenet"};const n=Ft.fromObject(t);const r={bn:"96c132224121b509b7d0a16245e957d9192609c5637c6228311287b1be21627a",compressed:!0,network:"livenet"};const o=Ft.fromObject(r);e.expect(JSON.stringify(n)).eq(JSON.stringify(t)),e.expect(JSON.stringify(o)).eq(JSON.stringify(r)),e.expect(JSON.stringify(o.publicKey)).not.eq(JSON.stringify(n.publicKey))})),it("should work with compressed and uncompressed pk - bare multisig output",(()=>{const t=Buffer.from("0412345678901234567890123456789012345678901234567890123456789012341234567890123456789012345678901234567890123456789012345678901234","hex");const n=(new Gt).add("OP_1").add(se.toBuffer()).add(ie.toBuffer()).add(ae.toBuffer()).add(t).add(t).add(t).add(t).add(t).add(t).add(t).add(t).add(t).add(t).add("OP_3").add("OP_CHECKMULTISIG");const r=new dt(ee,te);r.tx.from([new Wt.UnspentOutput(Lt())]),r.tx.addOutput(new Zt({script:n,satoshis:j.MIN_NON_DUST_AMOUNT})),r.tx.sign(kt(),ne),e.expect(r.tx).to.not.be.undefined,e.expect(r.tx.outputs.length).eq(1),e.expect(r.tx.inputs.length).eq(1),e.expect(r.tx.outputs[0].script.isMultisigOut()).eq(!0),e.expect(r.tx.verify()).eq(!0)}))})),describe("from",(()=>{it("should spend from a p2pkh output",(()=>{const t=new Ft("cSBnVM4xvxarwGQuAfQFwqDg9k5tErHUHzgWsEfD4zdwUasvqRVY");const{publicKey:n}=t;const r=n.toAddress();const o=Gt.buildPublicKeyHashOut(r);const s=new zt({address:r,txId:"a477af6b2667c29670467e4e0728b685ee07b240235771862318e29ddbe58458",outputIndex:0,script:o,satoshis:1e5});const i=(new Wt).from(s).to("mrU9pEmAx26HcbKVrABvgL7AwA5fjNFoDc",1e5).sign(t,1);const a=Xt.fromTxFormat(i.inputs[0].script.chunks[0].buf);e.expect(i.verifySignature(a,n,0,o)).eq(!0);const c=i.inputs[0].script;const u=Vt.SCRIPT_VERIFY_P2SH|Vt.SCRIPT_VERIFY_STRICTENC;const d=(new Vt).verify(c,o,i,0,u);e.expect(d).to.deep.eq(!0)})),it("should spend from a p2sh output",(()=>{const t=Gt.buildMultisigOut([se,ie,ae],2,{});const n=new zt({txId:"66e64ef8a3b384164b78453fa8c8194de9a473ba14f89485a0e433699daec140",outputIndex:0,script:t,satoshis:1e6});const r=(new Wt).from(n,[se.toString(),ie.toString(),ae.toString()],2).to(new Yt("33zbk2aSZYdNbRsMPPt6jgy6Kq1kQreqeb"),1e6);const o=r.inputs[0];e.expect(o.countSignatures()).eq(0),r.sign(re,j.SIGHASH_ALL),e.expect(o.countSignatures()).eq(1),e.expect(o.countMissingSignatures()).eq(1),e.expect(o.isFullySigned()).eq(!1),r.sign(oe,j.SIGHASH_ALL),e.expect(o.countSignatures()).eq(2),e.expect(o.countMissingSignatures()).eq(0),e.expect(o.isFullySigned()).eq(!0);const s=r.inputs[0].script;const i=Vt.SCRIPT_VERIFY_P2SH|Vt.SCRIPT_VERIFY_STRICTENC;const a=(new Vt).verify(s,t,r,0,i);e.expect(a).to.deep.eq(!0)})),it("should spend from a transaction with a multisig output",(()=>{const t=[se,ie,ae];const n=Yt.createMultisig(t,1,bt.NETWORK,!1);const r=new dt(ee,te);r.tx.from([new Wt.UnspentOutput(Lt())]),r.tx.to(n,j.MIN_NON_DUST_AMOUNT),r.tx.sign(kt(),ne);const o=r.tx.outputs[0].script;const s=r.tx.outputs[0];const i=Math.round(s.satoshis);const a=new zt({txId:r.tx.id,outputIndex:0,script:o,satoshis:i});const c=(new Wt).from(a,t.map((t=>t.toString())),1).to(n,1e6);c.sign(re,j.SIGHASH_ALL);const u=c.inputs[0].script;const d=Vt.SCRIPT_VERIFY_P2SH|Vt.SCRIPT_VERIFY_STRICTENC;const p=(new Vt).verify(u,o,c,0,d);e.expect(p).to.deep.eq(!0)})),it("should spend from a transaction with a bare multisig output",(()=>{const t=(new Gt).add("OP_1").add(se.toBuffer()).add(ie.toBuffer()).add(ae.toBuffer()).add("OP_3").add("OP_CHECKMULTISIG");const n=new dt(ee,te);n.tx.from([new Wt.UnspentOutput(Lt())]),n.tx.addOutput(new Zt({script:t,satoshis:j.MIN_NON_DUST_AMOUNT})),n.tx.sign(kt(),ne);const r=n.tx.outputs[0];const o=r.script;const s=Math.round(r.satoshis);const i=new zt({txId:n.tx.id,outputIndex:0,script:o,satoshis:s});const{chunks:a}=o;const c=[new $t(a[1].buf),new $t(a[2].buf),new $t(a[3].buf)];const u=(new Wt).from(i,c.map((t=>t.toString())),2).to(qt(),1e4);u.sign(re,j.SIGHASH_ALL),u.sign(oe,j.SIGHASH_ALL);const d=u.inputs[0].script;const p=Vt.SCRIPT_VERIFY_P2SH|Vt.SCRIPT_VERIFY_STRICTENC;const l=(new Vt).verify(d,o,u,0,p);e.expect(l).to.deep.eq(!0)})),it("should spend from an transaction with a bare multisig output with data",(()=>{const t="1".repeat(32);const n=Qt.fromX(!1,t);const r=new $t(n);const o=(new Gt).add("OP_1").add(se.toBuffer()).add(ie.toBuffer()).add(ae.toBuffer()).add(r.toBuffer()).add("OP_4").add("OP_CHECKMULTISIG");const s=new dt(ee,te);s.tx.from([new Wt.UnspentOutput(Lt())]),s.tx.addOutput(new Zt({script:o,satoshis:j.MIN_NON_DUST_AMOUNT})),s.tx.sign(kt(),ne);const i=s.tx.outputs[0];const a=i.script;const c=Math.round(i.satoshis);const u=new zt({txId:s.tx.id,outputIndex:0,script:a,satoshis:c});const{chunks:d}=a;const p=[new $t(d[1].buf),new $t(d[2].buf),new $t(d[3].buf)];const l=(new Wt).from(u,p.map((t=>t.toString())),2).to(qt(),1e4);l.sign(re,j.SIGHASH_ALL),l.sign(oe,j.SIGHASH_ALL);const f=l.inputs[0].script;const h=Vt.SCRIPT_VERIFY_P2SH|Vt.SCRIPT_VERIFY_STRICTENC;const g=(new Vt).verify(f,a,l,0,h);e.expect(g).to.deep.eq(!0)})),it("should spend from an transaction with a bare multisig output and dummy data",(()=>{const t=Buffer.from("11".repeat(512),"hex");const n=(new Gt).add("OP_1").add(se.toBuffer()).add(ie.toBuffer()).add(ae.toBuffer()).add(t).add("OP_4").add("OP_CHECKMULTISIG");const r=new dt(ee,te);r.tx.from([new Wt.UnspentOutput(Lt())]),r.tx.addOutput(new Zt({script:n,satoshis:j.MIN_NON_DUST_AMOUNT})),r.tx.sign(kt(),ne);const o=r.tx.outputs[0];const s=o.script;const i=Math.round(o.satoshis);const a=new zt({txId:r.tx.id,outputIndex:0,script:s,satoshis:i});const{chunks:c}=s;const u=[new $t(c[1].buf),new $t(c[2].buf),new $t(c[3].buf)];const d=(new Wt).from(a,u.map((t=>t.toString())),2).to(qt(),1e4);d.sign(re,j.SIGHASH_ALL),d.sign(oe,j.SIGHASH_ALL);const p=d.inputs[0].script;const l=Vt.SCRIPT_VERIFY_P2SH;const f=(new Vt).verify(p,s,d,0,l);e.expect(f).to.deep.eq(!0)})),it("should spend from an transaction with a bare multisig output and dummy data",(()=>{const t=Buffer.from("11".repeat(512),"hex");const n=(new Gt).add("OP_1").add(se.toBuffer()).add(ie.toBuffer()).add(ae.toBuffer()).add(t).add("OP_4").add("OP_CHECKMULTISIG");const r=new dt(ee,te);r.tx.from([new Wt.UnspentOutput(Lt())]),r.tx.addOutput(new Zt({script:n,satoshis:j.MIN_NON_DUST_AMOUNT})),r.tx.sign(kt(),ne);const o=r.tx.outputs[0];const s=o.script;const i=Math.round(o.satoshis);const a=new zt({txId:r.tx.id,outputIndex:0,script:s,satoshis:i});const{chunks:c}=s;const u=[new $t(c[1].buf),new $t(c[2].buf),new $t(c[3].buf)];const d=(new Wt).from(a,u.map((t=>t.toString())),2).to(qt(),1e4);d.sign(re,j.SIGHASH_ALL),d.sign(oe,j.SIGHASH_ALL);const p=d.inputs[0].script;const l=Vt.SCRIPT_VERIFY_P2SH;const f=(new Vt).verify(p,s,d,0,l);e.expect(f).to.deep.eq(!0)}))})),describe("createDataOuts",(()=>{it("should add a data output",(()=>{const t=new dt(ee,te);const n=[Kt()];const r=n.map((t=>t.toString()));const o={a:1};t.createDataOuts([Object.assign({_owners:r,_amount:le},o)]),e.expect(t).to.not.be.undefined,e.expect(t.tx).to.not.be.undefined,e.expect(t.tx.outputs).to.not.be.undefined,e.expect(t.tx.outputs.length).eq(2),e.expect(t.tx.outputs[0].script.toASM()).to.deep.eq(tt(n).toASM()),e.expect(JSON.parse(t.dataPrefix)).to.deep.eq([o])})),it("should add a large data output",(()=>v(void 0,void 0,void 0,(function*(){const t=new dt(ee,te);const n=[Kt()];const r=[{a:"1".repeat(100),_owners:n.map((t=>t.toString())),_amount:le}];t.createDataOuts(r),e.expect(t).to.not.be.undefined,e.expect(t.tx).to.not.be.undefined,e.expect(t.tx.outputs).to.not.be.undefined,e.expect(t.tx.outputs.length).eq(3),e.expect(t.tx.outputs[0].script.toASM()).to.deep.eq(tt(n).toASM()),e.expect(yield t.getOutData(te)).to.deep.eq(r)}))))}))}));
