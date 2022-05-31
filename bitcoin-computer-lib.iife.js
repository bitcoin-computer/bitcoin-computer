!function(t,e,n,r,s,o,i,c,a){"use strict";function u(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}function d(t){if(t&&t.__esModule)return t;var e=Object.create(null);return t&&Object.keys(t).forEach((function(n){if("default"!==n){var r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:function(){return t[n]}})}})),e.default=t,Object.freeze(e)}var h=u(r);var l=u(i);var f=u(c);var p=d(a);function g(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]])}return n}function _(t,e,n,r){var s,o=arguments.length,i=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,r);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(i=(o<3?s(i):o>3?s(e,n,i):s(e,n))||i);return o>3&&i&&Object.defineProperty(e,n,i),i}function v(t,e,n,r){return new(n||(n=Promise))((function(s,o){function i(t){try{a(r.next(t))}catch(t){o(t)}}function c(t){try{a(r.throw(t))}catch(t){o(t)}}function a(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,c)}a((r=r.apply(t,e||[])).next())}))}const w=t=>new Compartment({}).evaluate(t);const y=(t,e,n)=>new Compartment({target:t,thisArgument:e,argumentsList:n}).evaluate("Reflect.apply(target, thisArgument, argumentsList)");const b=(t,e)=>new Compartment({target:t,argumentsList:e}).evaluate(`Reflect.construct(${t}, argumentsList)`);const{crypto:m}=e.Bitcoin;const O=(t,e)=>{const n=Date.now();const r=m.Hash.sha256(Buffer.from(e+n));const s=[m.ECDSA.sign(r,t,"big").toString("hex"),t.publicKey.toString(),n];return`Bearer ${Buffer.from(s.join(":")).toString("base64")}`};class x{constructor(t,e,n={}){this.baseUrl=t,this.headers=n,this.privateKey=e}get(t){return v(this,void 0,void 0,(function*(){const e=this.privateKey?{Authentication:O(this.privateKey,this.baseUrl)}:{};return(yield h.default.get(`${this.baseUrl}${t}`,{headers:Object.assign(Object.assign({},this.headers),e)})).data}))}post(t,e){return v(this,void 0,void 0,(function*(){const n=this.privateKey?{Authentication:O(this.privateKey,this.baseUrl)}:{};return(yield h.default.post(`${this.baseUrl}${t}`,e,{headers:Object.assign(Object.assign({},this.headers),n)})).data}))}delete(t){return v(this,void 0,void 0,(function*(){const e=this.privateKey?{Authentication:O(this.privateKey,this.baseUrl)}:{};return(yield h.default.delete(`${this.baseUrl}${t}`,{headers:Object.assign(Object.assign({},this.headers),e)})).data}))}}var E=process.env.CHAIN||"LTC",S=process.env.NETWORK||"testnet",j=process.env.BCN_URL||"https://node.bitcoincomputer.io";class C extends class{constructor({chain:t=E,network:e=S}={}){this.chain=t,this.network=e}}{constructor({chain:t=E,network:e=S,url:n=j}={}){super({chain:t,network:e}),this.url=n}}const{PrivateKey:$,Transaction:I}=e.Bitcoin;const{UnspentOutput:N}=I;function T(t){if(!/^[0-9A-Fa-f]{64}$/.test(t))throw new Error(`Invalid txId: ${t}`)}function P(t){if(!/^[0-9A-Fa-f]{64}\/\d+$/.test(t))throw new Error(`Invalid outId: ${t}`)}function A(t){P(t);const[e,n]=t.split("/");return{txId:e,outputIndex:parseInt(n,10)}}let K=class{constructor({nodeConfig:t=new C,privateKey:e=new $}={}){this.nodeConfig=t,this.bcn=new x(t.url,e)}get chain(){return this.nodeConfig.chain}get network(){return this.nodeConfig.network}get url(){return this.nodeConfig.url}getBalance(t){return v(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return yield this.bcn.get(`/v1/${e}/${n}/address/${t}/balance`)}))}getTransaction(t){return v(this,void 0,void 0,(function*(){return new I(yield this.getRawTx(t))}))}getRawTx(t){return v(this,void 0,void 0,(function*(){T(t);const{chain:e,network:n}=this;return this.bcn.get(`/v1/${e}/${n}/tx/${t}`)}))}getTransactions(t){return v(this,void 0,void 0,(function*(){return(yield this.getRawTxs(t)).map((t=>new I(t)))}))}getRawTxs(t){return v(this,void 0,void 0,(function*(){t.map(T);const{chain:e,network:n}=this;return this.bcn.post(`/v1/${e}/${n}/tx/bulk/`,{txIds:t})}))}sendTransaction(t){return v(this,void 0,void 0,(function*(){return this.bcn.post(`/v1/${this.chain}/${this.network}/tx/send`,{rawTx:t})}))}getUtxosByAddress(t){return v(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return(yield this.bcn.get(`/v1/${e}/${n}/wallet/${t.toString()}/utxos`)).map((({rev:t,scriptPubKey:e,satoshis:n})=>{const[r,s]=t.split("/");return new N({txId:r,outputIndex:parseInt(s,10),satoshis:n,script:e})}))}))}getOwnedRevs(t){return v(this,void 0,void 0,(function*(){const{chain:e,network:n}=this;return this.bcn.get(`/v1/${e}/${n}/wallet/${t.toString()}/non-standard-utxos`)}))}queryRevs(t){return v(this,void 0,void 0,(function*(){const{publicKey:e,contractName:n,contractHash:r}=t;if(void 0===e&&void 0===n&&void 0===r)throw new Error("Filter parameter for queryRevs endpoint cannot be empty.");let s="";e&&(s+=`?publicKey=${e}`),n&&(s+=0===s.length?"?":"&",s+=`contractName=${n}`),r&&(s+=0===s.length?"?":"&",s+=`contractHash=${r}`);const{chain:o,network:i}=this;return this.bcn.get(`/v1/${o}/${i}/non-standard-utxos${s}`)}))}getLatestRev(t){return v(this,void 0,void 0,(function*(){P(t);const{chain:e,network:n}=this;const[{rev:r}]=yield this.bcn.get(`/v1/${e}/${n}/rev/${t}`);return r}))}getLatestRevs(t){return v(this,void 0,void 0,(function*(){t.map(P),t.map(P);const{chain:e,network:n}=this;return yield this.bcn.post(`/v1/${e}/${n}/revs`,{ids:t})}))}static getSecretOutput({_url:t,privateKey:e}){return v(this,void 0,void 0,(function*(){const n=t.split("/");const r=n[n.length-1];const s=n.slice(0,-2).join("/");const o=new x(s,e);return{host:s,data:yield o.get(`/v1/store/${r}`)}}))}static setSecretOutput({secretOutput:t,host:e,privateKey:n}){return v(this,void 0,void 0,(function*(){return new x(e,n).post("/v1/store/",t)}))}static deleteSecretOutput({_url:t,privateKey:e}){return v(this,void 0,void 0,(function*(){const n=t.split("/");const r=n[n.length-1];const s=n.slice(0,-2).join("/");const o=new x(s,e);yield o.delete(`/v1/store/${r}`)}))}};K=_([t=>t],K);const B=parseInt(process.env.BC_DUST_LIMIT||"",10)||1546;const R=parseInt(process.env.BC_DEFAULT_FEE||"",10)||2500;var U={MIN_NON_DUST_AMOUNT:B,SCRIPT_CHUNK_SIZE:parseInt(process.env.BC_SCRIPT_CHUNK_SIZE||"",10)||479,DEFAULT_FEE:R,SIGHASH_ALL:1,FEE_PER_KB:2e4,PUBLIC_KEY_SIZE:65,ANYONE_CAN_SPEND_SEED:"replace this seed",PASSPHRASE:"",ENCODING_LENGTH:3,ENCODING_NUMBER_LENGTH:3,MAX_PUBKEYS_PER_SCRIPT:3,OP_RETURN_SIZE:80};const{PublicKey:D,crypto:k}=e.Bitcoin;const{Point:M}=k;function L(t){return Buffer.from(t,"hex").toString().replace(/\0/g,"")}function H(t,e){return t.slice(e)+t.slice(0,e)}function G(t,e,n){if(t.length*Math.log2(e)>53)throw new Error(`Input too large ${t.length} ${Math.log2(e)}`);if(![2,10,16].includes(e)||![2,10,16].includes(n))throw new Error("ToBase or FromBase invalid in covertNumber.");if(2===e&&t.length%8!=0)throw new Error("Binary strings must be byte aligned.");if(16===e&&t.length%2!=0)throw new Error("Hex strings must be of even length.");const r=parseInt(t,e).toString(n);return 2===n?r.padStart(8*Math.ceil(r.length/8),"0"):16===n?r.padStart(2*Math.ceil(r.length/2),"0"):r}function F(t,e){const n=new RegExp(`.{1,${e}}`,"g");return t.match(n)||[]}function q(t){return F(t,2).map((t=>G(t,16,2))).join("")}function W(t){return F(t,8).map((t=>G(t,2,16))).join("")}function J(t){return t.toString(16).padStart(U.ENCODING_NUMBER_LENGTH,"0")}function Y(t){return parseInt(t,16)}function X(t){if(62!==t.length)throw new Error("Input to hexToPublicKey must be of length 62");let e=!1;let n=0;let r;for(;!e;){if(n>=256)throw new Error("Something went wrong storing data");const s=n.toString(16).padStart(2,"0")+W(H(q(t).padStart(64,"0"),n));try{r=M.fromX(!1,s),e=!0}catch(t){n+=1}}if(!r)throw new Error("Something went wrong storing data");return new D(r)}function Z(t){const e=t.point.getX().toString("hex").padStart(64,"0");const n=G(e.slice(0,2),16,10);return W((s=parseInt(n,10),(r=q(e.slice(2))).slice(-s)+r.slice(0,-s)));var r,s}function z(t=E,e=S){if("testnet"===e||"regtest"===e)return 1;if("BTC"===t)return 0;if("LTC"===t)return 2;if("DOGE"===t)return 3;if("BCH"===t)return 145;if("BSV"===t)return 236;throw new Error(`Unsupported chain ${t}`)}function V(t=E,e=S){return function({purpose:t=44,coinType:e=2,account:n=0}={}){return`m/${t.toString()}'/${e.toString()}'/${n.toString()}'`}({coinType:z(t,e)})}const{PublicKey:Q,Script:tt}=e.Bitcoin;function et(t){if(t.length>U.MAX_PUBKEYS_PER_SCRIPT)throw new Error("Too many owners");return function(t){const e=new tt;return e.add("OP_1"),t.forEach((t=>{e.add(t)})),e.add(`OP_${t.length}`),e.add("OP_CHECKMULTISIG"),e}(t.map((t=>t.toBuffer())))}function nt(t){return function(t){return t.chunks.filter((t=>t.buf)).map((t=>t.buf))}(t).map((t=>Q.fromBuffer(t)))}function rt(t){return Buffer.from(f.default.SHA256(t).toString(),"hex").toString("hex").substr(0,4)}function st(t){return`${rt(t)};${t}`}function ot(t){const e=t.substr(0,4);const n=t.substr(5);if(!function(t,e){return rt(t)===e}(n,e))throw new Error("Decryption failure");return n}function it(t){if(void 0!==t._readers){const{_readers:e,_url:n,_owners:r,_amount:s}=t,o=g(t,["_readers","_url","_owners","_amount"]);const i=function(t,e){const n=l.default.randomBytes(32).toString("hex");const r=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid secret");const n=Buffer.from(e,"hex").toString("binary");const r=st(t);return f.default.AES.encrypt(r,n).toString()}(t,n);const s=e.map((t=>function(t,e){if(!/^0[2-3][0-9a-f]{64}|04[0-9a-f]{128}$/.test(e))throw new Error("Invalid publicKey");const n=st(t);return p.encrypt(e,Buffer.from(n,"utf8")).toString("base64")}(n,t)));return{__cypher:r,__secrets:s}}(JSON.stringify(o),e);return void 0!==n&&(i._url=n),void 0!==r&&(i._owners=r),void 0!==s&&(i._amount=s),i}return t}const{Transaction:ct}=e.Bitcoin;const{Output:at}=ct;const{UnspentOutput:ut}=ct;let dt=class{constructor(t,e,n){const r=new ct(n);r.feePerKb(U.FEE_PER_KB),this.nodeConfig=t,this.tx=r,this.outData=[],this.privateKey=e}get txId(){return this.tx.id}get chain(){return this.nodeConfig.chain}get network(){return this.nodeConfig.network}get restClient(){const{nodeConfig:t,privateKey:e}=this;return new K({nodeConfig:t,privateKey:e})}get inputs(){return this.tx.inputs.map((t=>`${t.prevTxId.toString("hex")}/${t.outputIndex}`))}get inRevs(){const{enc:t}=this;let[e]=t;return e=Number.isFinite(e)?e:0,this.tx.inputs.slice(0,e).map((({prevTxId:t,outputIndex:e})=>`${t.toString("hex")}/${e}`))}get outRevs(){const{enc:t}=this;let[,e]=t;return e=Number.isFinite(e)?e:0,Array.from(Array(e).keys()).map((t=>`${this.tx.id}/${t}`))}get opReturns(){try{const{outputs:t}=this.tx;return t.filter((({script:t})=>t.isDataOut())).map((({script:t})=>t.getData())).map((t=>t.toString())).join()}catch(t){return""}}get enc(){return F(this.opReturns.slice(0,U.ENCODING_LENGTH*U.ENCODING_NUMBER_LENGTH),U.ENCODING_NUMBER_LENGTH).map(Y)}get dataPrefix(){return this.opReturns.slice(9)}getOwnerOutputs(){const{enc:t}=this;const[,e=0]=t;return this.tx.outputs.slice(0,e)}getDataOutputs(){const{enc:t}=this;const[,e,n]=t;return this.tx.outputs.slice(e,n)}getOutData(t){return v(this,void 0,void 0,(function*(){try{const e=this.getDataOutputs().map((t=>t.script)).map((t=>nt(t))).flat().map(Z).map(L).join("");const{dataPrefix:n}=this;const r=JSON.parse(n+e);const s=t.toBuffer().toString("hex");const o=this.getOwnerOutputs();if(o.length!==r.length)throw new Error("Inconsistent state");const i=o.map(((t,e)=>Object.assign(Object.assign({},r[e]),{_owners:nt(t.script).map((t=>t.toString())),_amount:t.satoshis})));return Promise.all(i.map((e=>v(this,void 0,void 0,(function*(){try{const n=yield function(t){return e=>v(this,void 0,void 0,(function*(){if(function(t){return void 0!==t._url}(e)){const{_url:n}=e,r=g(e,["_url"]);const{host:s,data:o}=yield K.getSecretOutput({_url:n,privateKey:t});return Object.assign(Object.assign(Object.assign({},r),JSON.parse(o)),{_url:s})}return e}))}(t)(e);return function(t,e){if(function(t){return void 0!==t.__cypher&&void 0!==t.__secrets}(t)){const{__cypher:n,__secrets:r}=t,s=g(t,["__cypher","__secrets"]);return Object.assign(Object.assign(Object.assign({},s),JSON.parse(function({__cypher:t,__secrets:e},n){let r="";if(n.forEach((n=>{e.forEach((e=>{try{const s=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid privateKey");return ot(p.decrypt(e,Buffer.from(t,"base64")).toString("utf8"))}(e,n);r=function(t,e){if(!/^[0-9a-f]{64}$/.test(e))throw new Error("Invalid secret");const n=Buffer.from(e,"hex").toString("binary");return ot(f.default.AES.decrypt(t,n).toString(f.default.enc.Utf8))}(t,s)}catch(t){const e=["Decryption failure","Unsupported state or unable to authenticate data"];if(t instanceof Error&&!e.includes(t.message))throw t}}))})),r)return r;throw new Error("Decryption failure")}({__cypher:n,__secrets:r},e))),{_readers:[]})}return t}(n,[s])}catch(t){return null}})))))}catch(t){return[]}}))}getOwners(){return this.getOwnerOutputs().map((t=>nt(t.script).map((t=>t.toString()))))}getAmounts(){return this.getOwnerOutputs().map((t=>t.satoshis))}spendFromData(t){return v(this,void 0,void 0,(function*(){if(!t.length)return;const n=t.map(A);const r=n.map((t=>t.txId));const s=yield this.restClient.getTransactions(r);for(let t=0;t<n.length;t+=1){const{txId:r,outputIndex:o}=n[t];const{outputs:i}=s[t];const c=i[o];const a=Math.round(c.satoshis);const u=new e.Bitcoin.Script(c.script);const d=new ut({txId:r,outputIndex:o,satoshis:a,script:u});const h=nt(u).map((t=>t.toString()));this.tx.from([d],h,1)}}))}createDataOuts(t){t.forEach((({_amount:t,_owners:n=[]})=>{if(Array.isArray(n)&&n.length>U.MAX_PUBKEYS_PER_SCRIPT)throw new Error("Too many owners.");const r=n.map((t=>e.Bitcoin.PublicKey.fromString(t)));const s=t||U.MIN_NON_DUST_AMOUNT;const o=et(r);this.tx.addOutput(new at({script:o,satoshis:s}))}));const n=t.map((t=>g(t,["_amount","_owners"])));const r=U.MIN_NON_DUST_AMOUNT;const s=JSON.stringify(n);const o=U.OP_RETURN_SIZE-U.ENCODING_LENGTH*U.ENCODING_NUMBER_LENGTH;const i=s.slice(0,o);const c=function(t){var e;return function(t,e){const n=[];for(let r=0;r<t.length;r+=e)n.push(t.slice(r,r+e));return n}(F((e=t,Buffer.from(e).toString("hex")),62).map((t=>t.padStart(62,"0"))).map(X),U.MAX_PUBKEYS_PER_SCRIPT).map((t=>et(t)))}(s.slice(o));const a=J(this.tx.inputs.length)+J(this.tx.outputs.length)+J(this.tx.outputs.length+c.length);c.forEach((t=>{this.tx.addOutput(new at({script:t,satoshis:r}))})),this.tx.addData(a+i)}static fromTxHex(t,e,n){return v(this,void 0,void 0,(function*(){let r=[];let s=[];let o=[];const i=new this(e,n);i.tx.fromString(t);try{r=yield i.getOutData(n)}catch(t){}try{s=i.getOwners()}catch(t){}try{o=i.getAmounts()}catch(t){}return i.outData=r.map(((t,e)=>Object.assign(Object.assign({},t),{_owners:s[e],_amount:o[e]}))),i}))}static fromTxId(t,e,n){return v(this,void 0,void 0,(function*(){const r=new K({nodeConfig:e,privateKey:n});const s=yield r.getRawTx(t);return this.fromTxHex(s,e,n)}))}};dt=_([t=>t],dt);class ht{constructor({seed:t="",chain:n=E,network:r=S,url:s=j,path:o=V(),passphrase:i=""}={}){this.passphrase=i,this.seed=t,this.path=o;const c=new e.Bitcoin.Mnemonic(t);this.hdPrivateKey=c.toHDPrivateKey(i,r).deriveChild(o);const a=new C({chain:n,network:r,url:s});this.restClient=new K({nodeConfig:a,privateKey:this.hdPrivateKey.privateKey}),this.address=this.hdPrivateKey.publicKey.toAddress(r)}get nodeConfig(){return this.restClient.nodeConfig}get chain(){return this.nodeConfig.chain}get network(){return this.nodeConfig.network}get url(){return this.nodeConfig.url}getMnemonic(){return new e.Bitcoin.Mnemonic(this.seed)}derive(t="0"){const e=`${this.path}${this.path.length>0?"/":""}${t}`;const{seed:n,chain:r,network:s,url:o}=this;return new ht({seed:n,chain:r,network:s,url:o,path:e})}getPrivateKey(){return this.hdPrivateKey.privateKey}getPublicKey(){return this.hdPrivateKey.publicKey}getAddress(){return this.address}getBalance(){return v(this,void 0,void 0,(function*(){return this.restClient.getBalance(this.getAddress())}))}getUtxosByAmount(t){return v(this,void 0,void 0,(function*(){const e=yield this.restClient.getUtxosByAddress(this.getAddress());let n=0;const r=[];!function(t){const e=t;for(let t=e.length-1;t>0;t-=1){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}}(e);for(const s of e)if(n+=s.satoshis,r.push(s),n>=t)return r;const{network:s,chain:o}=this.restClient.nodeConfig;const i=this.getAddress().toString();throw new Error(`Insufficient balance in address ${i} on ${s} ${o}. Found ${n}, required ${t}.`)}))}fundAndSendTx(t){return v(this,void 0,void 0,(function*(){t.tx.feePerKb(U.FEE_PER_KB);const{chain:n,network:r}=this.nodeConfig;const{enc:o}=t;const[,i=0]=o;const c=i*function(t){if("LTC"===t)return 8e3;if("BTC"===t)return 22;if("DOGE"===t)return 7e6;if("BCH"===t)return 2700;throw new Error(`Unsupported chain ${t}`)}(n);const a=.001*t.tx._getOutputAmount();const u=Math.max(U.MIN_NON_DUST_AMOUNT,c+a);t.tx.to(function(t,e){const n={"any-testnet":"gLjNGbKQzxqKA9bv2nhn1Ewf7rxYVXgrtR","BTC-mainnet":"84ZHRqRPTcUv6AFGMVC1KmSUeC9Y8SNfMm","LTC-mainnet":"mov5ivrsqWut5ffZhiz18uAkwy2D4y98iz","DOGE-mainnet":"1MVukPYmWdbEoxy3Sqq1ES4nYqDfpB5e68","BCH-mainnet":"P9CmJszhvARfQc8YjUW1K2oBnus1ZQWEqk","BSV-mainnet":"G2wxQ74zX48WMo7sfiX1faGGNQB8ebVth"};return H("testnet"===e||"regtest"===e?n["any-testnet"]:n[`${t}-${e}`],19)}(n,r),Math.round(u));let d=t.tx._getInputAmount();const h=t.tx._getOutputAmount();const l=t.tx._estimateFee();let f=h-d+Math.round(l);return f>0&&((yield s.backOff((()=>this.getUtxosByAmount(f)))).forEach((n=>{t.tx.from([new e.Bitcoin.Transaction.UnspentOutput(n)])})),d=t.tx._getInputAmount(),f=h-d+Math.round(t.tx._estimateFee())),t.tx.change(this.getAddress()),t.tx.sign(this.getPrivateKey(),U.SIGHASH_ALL),this.restClient.sendTransaction(t.tx.toString())}))}send(t,e){return v(this,void 0,void 0,(function*(){const{nodeConfig:n}=this.restClient;const r=this.getPrivateKey();const s=new dt(n,r);return s.tx.to(e,t),this.fundAndSendTx(s)}))}}class lt{constructor({wallet:t=new ht}={}){this.wallet=t}get chain(){return this.wallet.chain}get network(){return this.wallet.network}get nodeConfig(){return this.wallet.nodeConfig}fromTxHex(t){return v(this,void 0,void 0,(function*(){const{wallet:e,nodeConfig:n}=this;const r=e.getPrivateKey();return dt.fromTxHex(t,n,r)}))}fromTxId(t){return v(this,void 0,void 0,(function*(){const{wallet:e,nodeConfig:n}=this;const r=e.getPrivateKey();const s=new K({nodeConfig:n,privateKey:r});const o=yield s.getRawTx(t);return this.fromTxHex(o)}))}get(t){return v(this,void 0,void 0,(function*(){const e=t.map(A);return Promise.all(e.map((({txId:t,outputIndex:e})=>v(this,void 0,void 0,(function*(){const{outData:n}=yield this.fromTxId(t);if(e>n.length)throw new Error("Index out of bounds");return n[e]})))))}))}put(t){return this.update([],t)}createTx(t,e){return v(this,void 0,void 0,(function*(){const{wallet:n,nodeConfig:r}=this;const s=n.getPrivateKey();const o=new dt(r,s);const i=e.map((t=>{var{_owners:e}=t,n=g(t,["_owners"]);return Object.assign({_owners:e||[this.wallet.getPublicKey().toString()]},n)})).map(it);const c=yield Promise.all(i.map(function(t){return e=>v(this,void 0,void 0,(function*(){if(void 0!==e._url){const{_url:n,_owners:r,_amount:s}=e,o=g(e,["_url","_owners","_amount"]);const i=yield K.setSecretOutput({host:n,secretOutput:{data:JSON.stringify(o)},privateKey:t});return void 0!==r&&(i._owners=r),void 0!==s&&(i._amount=s),i}return e}))}(s)));return yield o.spendFromData(t),yield o.createDataOuts(c),o}))}update(t,e){return v(this,void 0,void 0,(function*(){const n=yield this.createTx(t,e);return yield this.wallet.fundAndSendTx(n),n.outRevs}))}}const ft=["_id","_rev","_owners","_amount","_readers","_url","__vouts","__func","__index","__args"];const pt=t=>(Object.prototype.toString.call(t).match(/\s([a-zA-Z]+)/)||[])[1];const gt=t=>"object"==typeof t?pt(t):pt(t).toLowerCase();const _t=t=>["number","string","boolean","undefined","Null"].includes(gt(t));const vt=t=>"Array"===gt(t);const wt=t=>"Object"===gt(t);const yt=t=>_t(t)||["Array","Object"].includes(gt(t));const bt=(t,e)=>{if(!yt(t)||!yt(e))throw new Error(`Unsupported data types for deep equals: ${gt(t)} & ${gt(e)}`);if(gt(t)!==gt(e))return!1;if(_t(t)&&_t(e))return t===e;const n=(t,e)=>Object.entries(t).every((([t,n])=>bt(e[t],n)));return t&&e&&n(t,e)&&n(e,t)};const mt=t=>{if(_t(t))return t;if(vt(t))return t.map(mt);if(wt(t)){const e=Object.keys(t).reduce(((e,n)=>(e[n]=mt(t[n]),e)),{});const n=Object.create(Object.getPrototypeOf(t));return Object.assign(n,e)}throw new Error(`Unsupported data type for clone: ${gt(t)}`)};const Ot=(t,e)=>Object.fromEntries(Object.entries(t).map((t=>e(t))));const xt=(t,e)=>Ot(t,(([t,n])=>[t,e(n)]));const Et=(t,e)=>Object.fromEntries(Object.entries(t).filter((t=>e(t))));const St=(t,e,n,r)=>{if(_t(t))return t;if(vt(t))return t.map((t=>St(t,e,n,r)));if(wt(t)){t._rev=`${r}/${n}`;const s=e[n];return Object.entries(t).forEach((([n,o])=>{"object"==typeof s&&Object.keys(s).includes(n)&&(t[n]=St(o,e,s[n],r))})),t}throw new Error(`Unsupported type ${gt(t)} in deep.updateRev`)};const jt=(t,e)=>{if(_t(t))return t;if(vt(t))return t.map((t=>jt(t,e)));if(wt(t))return t._id=!t._id||t._id.startsWith("__temp__")?t._rev:t._id,t._root=t._root||e,Object.entries(t).forEach((([n,r])=>{t[n]=jt(r,e)})),t;throw new Error(`Unsupported type ${gt(t)} in deep.addId`)};const Ct=t=>{if(_t(t))return t;if(vt(t))return t.map((t=>Ct(t)));if(wt(t)){const e=`__temp__/${Math.random()}`;return t._id=t._id||e,t._rev=t._rev||e,Object.values(t).map((t=>Ct(t))),t}throw new Error(`Unsupported type ${gt(t)} in addRandomId`)};const $t=t=>{if(_t(t))return t;if(vt(t))return t.map((t=>$t(t)));if(wt(t))return Ot(t,(([t,e])=>["_owners","_readers"].includes(t)?[t,JSON.stringify(e)]:_t(e)?[t,e]:[t,$t(e)]));throw new Error(`Unexpected type ${gt(t)} in stringifyOwners`)};const It=t=>(t._owners&&(t._owners=JSON.parse(t._owners)),t._readers&&(t._readers=JSON.parse(t._readers)),t);const Nt=t=>{if(_t(t))return t;if(vt(t)||wt(t))return Object.entries(t).reduce(((t,[e,n])=>{const r=Nt(n);return(t=>"Object"===gt(t)&&Object.keys(t).every((t=>!Number.isNaN(parseInt(t,10)))))(r)?Object.entries(r).forEach((([n,r])=>{t[`${e}_${n}`]=r})):t[e]=r,t}),{});throw new Error(`Unsupported type ${gt(t)} in encodeArraysAsObjects`)};const Tt=t=>{const e={[t._id]:Object.entries(t).reduce(((t,[e,n])=>ft.includes(e)?Object.assign(Object.assign({},t),{[e]:n}):_t(n)?Object.assign(Object.assign({},t),{[`__basic__${e}`]:n}):Object.assign(Object.assign({},t),{[e]:n._id})),{})};return Object.values(t).filter((t=>!_t(t))).reduce(((t,e)=>Object.assign(Object.assign({},t),Tt(e))),e)};const Pt=t=>Et(t,(([t])=>!t.startsWith("__basic__")));const At=(t,e)=>{const n=t[e];return n.__contains=Object.entries(n).reduce(((e,[n,r])=>["__contains",...ft].includes(n)?e:"__change"===n?"new"===r||"diff"===r||e:At(t,r)[r].__contains||e),!1),t};const Kt=(t,e)=>t.map((t=>Object.entries(t).reduce(((t,[n,r])=>{const s="string"==typeof r&&"undefined"!==gt(e[r])?e[r]:r;return Object.assign(Object.assign({},t),{[n]:s})}),{})));class Bt{constructor({db:t=new lt}={}){this.db=t}get(t){return v(this,void 0,void 0,(function*(){const{txId:e,outputIndex:n}=A(t);const{inRevs:r,outData:s}=yield this.db.fromTxId(e);if(!Array.isArray(r)||!Array.isArray(s)||0===s.length)return;const o=s[0].__index||{};const i=s[o.obj].__cls||"";const c=s[o.obj].__func||"";const a=s[o.obj].__args||[];const u=yield Promise.all(Object.values(o).map((t=>{const e=r[t];return e?this.get(e):Promise.resolve({})})));const d=Object.keys(o).map(((t,e)=>[t,u[e]]));const h=Object.fromEntries(d);let l=h.obj;delete h.obj;const f=Object.entries(h).reduce(((t,[e,n])=>{const r=parseInt(e,10);return Number.isNaN(r)||(t[r]=n),t}),[]);const p=function(t,e){let n=0;return e.map((e=>"__"===e?t[n++]:e))}(f,a);let g;if("constructor"===c){const t=w(`(${i})`);l=b(t,p)}else g=y(l[c].bind(l),l,p);Object.entries(o).forEach((([t,n])=>{const r=parseInt(t,10);let o=f[r];"obj"===t?o=l:"res"===t&&(o=g),St(o,s,n,e)}));const _=l._root||`${e}/${o.obj}`;return jt([g,l,...f],_),[...f,l,g][n]}))}}function Rt(t){return{smartArgs:t.filter((t=>t._rev)),dumbArgs:t.map((t=>t._rev?"__":t))}}class Ut{constructor({db:t=new lt}={}){this.db=t,Ut.proxyDepth=Ut.proxyDepth||0}static getUpdate(t){return v(this,void 0,void 0,(function*(){let e;let n;let r;let s;let o;let i;let c;if("Cls"in t){const{Cls:a}=t;const u=t.args||[];e=a.toString(),n=null,r=b(a,u),s=mt(u),o=u,i=null,c=void 0}else{const{target:a,property:u,args:d}=t;e=null,n=mt(a),r=a,s=mt(d),o=d,i=u,this.proxyDepth+=1,c=y(a[u],a,o),this.proxyDepth-=1}const{smartArgs:a,dumbArgs:u}=Rt(s);const{smartArgs:d}=Rt(o);const h=Object.assign(Object.assign(Object.assign({},a),{obj:n}),{_id:"index"});const l=Object.assign(Object.assign(Object.assign({},d),{obj:r}),{_id:"index"});["Object","Array"].includes(gt(c))&&(l.res=c);const[f,p,_]=((t,e)=>{const n=Ct(e);const r=n._id;const s=mt(t);const o=mt(n);const i=$t(s);const c=$t(o);const a=Nt(i);const u=Nt(c);const d=((t,e)=>Ot(e,(([e,n])=>{const r=t[e];var s;return n.__change=(s=r)?bt(s,n)?"same":"diff":"new",[e,n]})))(Tt(a),Tt(u));const h=xt(d,Pt);const l=At(h,r);const f=l[r];delete l[r];const p=xt(l,(t=>t._rev));const _=(v=t=>t.__contains||Object.values(f).includes(t._id),Et(l,(([,t])=>v(t))));var v;const w=Object.values(_);const[y,b]=(m=t=>"new"===t.__change,w.reduce((([t,e],n,r)=>m(n)?[[...t,n],e]:[t,[...e,n]]),[[],[]]));var m;const O=[...b,...y];const x=(t=>t.reduce(((t,e,n)=>Object.assign(Object.assign({},t),{[e._id]:n})),{}))(O);const E=Kt(O,x);const[S]=Kt([f],x);const j=b.map((t=>t._rev));const[C,...$]=((t,e)=>[e,...t].map((t=>{const e=g(t,["_id","_rev","__change","__contains"]);return Et(e,(([t,e])=>ft.includes(t)||"number"==typeof e))})))(E,S);return[j,$.map(It).map((t=>Object.entries(t).reduce(((t,[e,n])=>Object.assign(Object.assign({},t),{[e]:p[n]||n})),{}))),C]})(h,l);void 0!==p[0]&&(p[0].__index=_);const v=_.obj;void 0!==p[v]&&(null!==e&&(p[v].__cls=e),p[v].__func=null===i?"constructor":String(i),p[v].__args=u);const w=_.res;return void 0!==p[w]&&"function Object() { [native code] }"!==c.constructor.toString()&&(p[w].__cls=c.constructor.toString()),[f,p,r,d,c,_]}))}allocate(t,e){return v(this,void 0,void 0,(function*(){const[n,r,s,o,,i]=yield Ut.getUpdate({Cls:t,args:e});const[c]=yield this.db.update(n,r);const{txId:a}=A(c);Object.entries(i).forEach((([t,e])=>{const n=parseInt(t,10);let i=o[n];"obj"===t&&(i=s),St(i,r,e,a)}));const u=`${a}/${i.obj}`;return jt([s,...o],u),s}))}update(t,e,n){return v(this,void 0,void 0,(function*(){const[r,s,,o,i,c]=yield Ut.getUpdate({target:t,property:e,args:n});const[a]=yield this.db.update(r,s);const{txId:u}=A(a);Object.entries(c).forEach((([e,n])=>{const r=parseInt(e,10);let c=o[r];"obj"===e?c=t:e.startsWith("res")&&(c=i),St(c,s,n,u)}));const d="string"==typeof t._root?t._root:`${u}/${c.obj}`;return jt([i,t,...o],d),i}))}get(t,e){return Ut.proxyDepth>0||"function"!=typeof t[e]?Reflect.get(t,e):(...n)=>this.update(t,e,n)}}const{PublicKey:Dt}=e.Bitcoin;t.Computer=class{constructor({seed:t="",path:e="",chain:n=E,network:r=S,url:s=j,passphrase:o=U.PASSPHRASE}={}){const i=n.toUpperCase();const c=r.toLowerCase();const a=e||V(i,c);if(!["LTC","BTC","DOGE","BCH"].includes(i))throw new Error("We currently only support LTC.");if(!["mainnet","testnet","regtest"].includes(c))throw new Error("Please set 'network' to 'regtest', 'testnet', or 'mainnet'");const u=new ht({seed:t,chain:i,network:c,url:s,path:a,passphrase:o});this.db=new lt({wallet:u})}get chain(){return this.db.chain}get network(){return this.db.network}parseContract(t){const e=t.startsWith("export ")?t.slice(7):t;const n=e.startsWith("default ")?e.slice(8):e;return w(`(${n})`)}new(t,e){return v(this,void 0,void 0,(function*(){const n=t.toString();const r=yield this.parseContract(n);const s=new Ut({db:this.db});const o=yield s.allocate(r,e);return new Proxy(o,s)}))}sync(t){return v(this,void 0,void 0,(function*(){P(t);const{db:e}=this;const n=new Bt({db:e});const r=new Ut({db:e});const s=yield n.get(t);return new Proxy(s,r)}))}getOwnedRevs(t=this.db.wallet.getPublicKey()){return this.db.wallet.restClient.getOwnedRevs(t)}queryRevs(t){return v(this,void 0,void 0,(function*(){const{publicKey:e,contractName:n,contractHash:r}=t;const s=e?new Dt(e):void 0;return this.db.wallet.restClient.queryRevs({publicKey:s,contractName:n,contractHash:r})}))}getRevs(t=this.db.wallet.getPublicKey()){return v(this,void 0,void 0,(function*(){return(yield this.getOwnedRevs(t)).map((({rev:t})=>t))}))}getLatestRev(t){return v(this,void 0,void 0,(function*(){return this.db.wallet.restClient.getLatestRev(t)}))}getLatestRevs(t){return v(this,void 0,void 0,(function*(){return this.db.wallet.restClient.getLatestRevs(t)}))}},Object.defineProperty(t,"__esModule",{value:!0})}({},Bitcoin,0,axios,exponentialBackoff,0,crypto,CryptoJS,eciesjs);
