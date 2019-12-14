"use strict";function t(t){return t&&"object"==typeof t&&"default"in t?t.default:t}var r=t(require("socket.io-client"));var e=t(require("bitcoinsource"));var n=t(require("axios"));var a=t(require("eventemitter3"));function i(t,r,e,n,a,i,s){try{var o=t[i](s);var u=o.value}catch(t){return void e(t)}o.done?r(u):Promise.resolve(u).then(n,a)}function s(t){return function(){var r=this,e=arguments;return new Promise((function(n,a){var s=t.apply(r,e);function o(t){i(s,n,a,o,u,"next",t)}function u(t){i(s,n,a,o,u,"throw",t)}o(void 0)}))}}function o(t,r,e){return r in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}function u(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,n)}return e}function c(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?u(Object(e),!0).forEach((function(r){o(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):u(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}function d(t,r){if(null==t)return{};var e=function(t,r){if(null==t)return{};var e={};var n=Object.keys(t);var a,i;for(i=0;i<n.length;i++)a=n[i],r.indexOf(a)>=0||(e[a]=t[a]);return e}(t,r);var n,a;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(a=0;a<i.length;a++)n=i[a],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(e[n]=t[n])}return e}function h(t){var r=function(t,r){if("object"!=typeof t||null===t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof r?r:String(r)}var v={CHAIN:"BSV",BITCOIN_NETWORK:"mainnet",BLOCK_EXPLORER_URL:"https://bchsvexplorer.com/api",MIN_SATOSHI_AMOUNT:546,MIN_NON_DUST_AMOUNT:2e3,SCRIPT_CHUNK_SIZE:479,UN_P2SH_URL:"http://bitcoinbroadcastserver-env.r5t6c3b2kj.us-west-1.elasticbeanstalk.com",DEFAULT_FEE:2e4,WS_URL:"ws://bitcoinbroadcastserver-env.r5t6c3b2kj.us-west-1.elasticbeanstalk.com:8020"};e.versionGuard=()=>!0,e.Networks.defaultNetwork=e.Networks[v.BITCOIN_NETWORK];class p{constructor(t){this.kind=t}toJSON(){return{}}}function l(t){return{writable:!0,value:t}}function f(t,r,e){var{[t]:n}=e;return c({[r]:n},d(e,[t].map(h)))}var{PublicKey:g,Address:m,Transaction:_}=e;class w extends p{constructor(t,r){super("pkh"),this.address=t,this.amount=r}static fromPublicKeyHashInput(t){var{output:r}=t;return new this(r.script.toAddress(),r.satoshis)}toJSON(){return{kind:"pkh",address:this.address.toString(),amount:this.amount}}static isJSON(t){return t.address&&t.amount}static fromJSON(t){return new this(new m(t.address),t.amount)}}class y extends p{constructor(t){super("return"),this.data=t||""}getData(){return this.data}toJSON(){return{kind:"return",data:this.data}}static isJSON(t){return!!t.data}static fromJSON(t){return new this(t.data)}}var{Address:O,PublicKey:b,Signature:S,Script:x,Opcode:I}=e;function P(t,r){var e=[];var n=0;for(;n<t.length;)e.push(t.slice(n,n+r)),n+=r;return e}class T extends x{static outScriptFromData(t){var{kind:r,_owners:e=[],_amount:n,__vouts:a,__txId:i}=t,s=d(t,["kind","_owners","_amount","__vouts","__txId"]);var o=P(Buffer.from(JSON.stringify(s)),v.SCRIPT_CHUNK_SIZE);return o[o.length-1].byteLength>=v.SCRIPT_CHUNK_SIZE&&P(o.pop(),v.SCRIPT_CHUNK_SIZE).forEach(t=>{o.push(t)}),o.map(t=>{var r=new T;return r.add("OP_1"),e.forEach(t=>r.add(t.toBuffer())),r.add("OP_".concat(e.length)),r.add("OP_CHECKMULTISIG"),r.add(t),r.add("OP_DROP"),{redeemScript:r,chunk:t}})}getPublicKeys(){var t=1;var r=[];for(;this.chunks[t].buf;)r.push(new b(this.chunks[t].buf)),t+=1;return r}static inScriptFromData(t,r,e,n){var a=new T;return e.forEach(t=>{a.add(t)}),a.add(a),a}isDbDataScript(){return!(!(this.chunks.length>=5&&this.chunks[0].opcodenum===I.OP_1&&this.chunks[1].buf)||20!==this.chunks[1].buf.length&&33!==this.chunks[1].buf.length||this.chunks[2].opcodenum!==I.OP_1||this.chunks[3].opcodenum!==I.OP_CHECKMULTISIG||!this.chunks[4].buf||this.chunks[5].opcodenum!==I.OP_DROP)}static isP2shScript(t){return!(3!==t.chunks.length||t.chunks[0].opcodenum!==I.OP_0||!t.chunks[1].buf||!t.chunks[2].buf)}static redeemScriptFromP2shScript(t){if(!this.isP2shScript(t))throw new Error("not a p2sh script");var r=new x(t.chunks[2].buf);var e=new this;return e.chunks=r.chunks,e}static fromScript(t){var r=new x(t);var e=new T;return e.chunks=r.chunks,e}}var{PublicKey:N,Transaction:D,Script:E}=e;class k extends p{constructor(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};super("script"),Object.assign(this,t),this._amount=t._amount||v.MIN_NON_DUST_AMOUNT}getData(t){return this[t]}getSerializeData(){var t=d(this,["kind","_owners","_amount"]);return Buffer.from(JSON.stringify(t))}static fromMultiSigScriptHashInput(t){var{_scriptBuffer:r}=t;var e=T.fromBuffer(r);var{redeemScript:n=T.redeemScriptFromP2shScript(e)}=t;return this.fromRedeemScript(n)}static fromRedeemScript(t){return this.fromRedeemScripts([t])}static fromRedeemScripts(t){var r=t.map(t=>t.chunks[t.chunks.length-2].buf);var e=Buffer.concat(r);var n=JSON.parse(e.toString());return Object.assign(new this,c({kind:"script",_owners:t[0].getPublicKeys(),_amount:v.MIN_NON_DUST_AMOUNT},n))}static addVouts(t){var r=0;return t.map(t=>{var e="script"===t.kind?T.outScriptFromData(t).length:1;return t.__vouts=Array(e).fill(r).map((t,r)=>t+r),r+=e,t})}toJSON(){return c({},this,{kind:"script",_owners:(this._owners||[]).map(t=>t.toString()),_amount:v.MIN_NON_DUST_AMOUNT})}static isJSON(t){return"script"===t.kind}static fromJSON(t){var r=c({},t);return r._owners=(r._owners||[]).map(t=>new N(t)),new k(r)}}var{PublicKey:R,Address:j}=e;class K extends p{constructor(t){super("change"),this.address=t}toJSON(){return{kind:"change",address:this.address.toString()}}static isJSON(t){return t.address}static fromJSON(t){return new this(new j(t.address))}}var A=t=>"object"==typeof t?Object.prototype.toString.call(t).match(/\s([a-zA-Z]+)/)[1]:Object.prototype.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase();var U=t=>["undefined","number","string","boolean","Null"].includes(A(t));var C=t=>U(t)||["Array","Object"].includes(A(t));var J=t=>t===parseInt(t,10).toString();var B=(t,r)=>{if(!C(t)||!C(r))throw new Error("Unsupported data types for deep equals: ".concat(A(t)," & ").concat(A(r)));return A(t)===A(r)&&(U(t)&&U(r)?t===r:t&&r&&Object.entries(t).every(t=>{var[e,n]=t;return B(r[e],n)})&&Object.entries(r).every(r=>{var[e,n]=r;return B(t[e],n)}))};var M=t=>{if(U(t))return t;if("Array"===A(t))return t.map(t=>M(t));if("Object"===A(t)){var r=Object.keys(t).reduce((r,e)=>(r[e]=M(t[e]),r),{});var e=Object.create(Object.getPrototypeOf(t));return Object.assign(e,r)}throw new Error("Unsupported data type for clone: ".concat(A(t)))};var H=function t(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];var a=e;for(var i of(n[e]={},Object.keys(r)))i.startsWith("_")?n[a][i]=r[i]:U(r[i])?n[a][i]="_":(e+=1,n[a][i]=e,({res:n,pos:e}=t(r[i],e,n)));return{res:n,pos:e}};var F=function t(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;var n=r[e];if(void 0===n)return"_";var a=Object.keys(n).every(J);var i=a?[]:{};for(var s of Object.keys(n))s.startsWith("_")?i[s]=n[s]:i[s]=t(r,n[s]);return i};class L extends Error{constructor(t,r){for(var e=arguments.length,n=new Array(e>2?e-2:0),a=2;a<e;a++)n[a-2]=arguments[a];super(...n),this.name="Error",this.message=t+(r?": ".concat(r):""),Error.captureStackTrace&&Error.captureStackTrace(this,L)}}class W{constructor(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v.CHAIN;this.chain=t}static unwrap(t){return s((function*(){try{return(yield t).data}catch(t){var{message:r,config:e,response:n}=t;var{url:a,method:i,data:s}=e;throw new L("\nCommunication Error\n\nmessage\t".concat(r,"\nrequest\t").concat(i," ").concat(a,"\n").concat(n?"response\t".concat(JSON.stringify(n.data)):"","\n").concat("post"===i?"data\t".concat(s):"","\n      "))}}))()}static get(t){var r=arguments,e=this;return s((function*(){var a=r.length>1&&void 0!==r[1]?r[1]:v.BLOCK_EXPLORER_URL;return yield e.unwrap(n.get("".concat(a).concat(t)))}))()}static post(t,r){var e=arguments,a=this;return s((function*(){var i=e.length>2&&void 0!==e[2]?e[2]:v.BLOCK_EXPLORER_URL;return yield a.unwrap(n.post("".concat(i).concat(t),r))}))()}static getBalance(t,r){var e=this;return s((function*(){switch(r){case"BSV":var{confirmed:n,unconfirmed:a}=yield e.get("","https://api.whatsonchain.com/v1/bsv/main/address/".concat(t.toString(),"/balance"));return parseInt(n,10)+parseInt(a,10);case"BCH":var{balanceSat:i}=yield e.get("/address/details/".concat(t.toString()));return parseInt(i,10);default:throw new Error("chain is not set in getBalance")}}))()}getBalance(t){var r=this;return s((function*(){return W.getBalance(t,r.chain)}))()}static getTransaction(t,r){var e=this;return s((function*(){switch(r){case"BSV":return e.get("","https://api.whatsonchain.com/v1/bsv/main/tx/hash/".concat(t));case"BCH":return e.get("/transaction/details/".concat(t));default:throw new Error("chain is not set in getTransaction")}}))()}getTransaction(t){var r=this;return s((function*(){return W.getTransaction(t,r.chain)}))()}static getRawTransaction(t,r){var e=this;return s((function*(){switch(r){case"BSV":return(yield e.get("","https://api.whatsonchain.com/v1/bsv/main/tx/hash/".concat(t))).hex;case"BCH":return e.get("/rawtransactions/getRawTransaction/".concat(t));default:throw new Error("chain is not set in getRawTransaction")}}))()}getRawTransaction(t){var r=this;return s((function*(){return W.getRawTransaction(t,r.chain)}))()}static sendTransaction(t,r){var e=this;return s((function*(){var n={};switch(r){case"BSV":return n={txhex:t.toString()},{txId:yield e.post("",n,"https://api.whatsonchain.com/v1/bsv/main/tx/raw")};case"BCH":return n={hex:[t.toString()]},{txId:yield e.get("/rawtransactions/sendRawTransaction/".concat(t.toString()))};default:throw new Error("chain is not set in sendTransaction")}}))()}sendTransaction(t){var r=this;return s((function*(){return W.sendTransaction(t,r.chain)}))()}static getUtxosFromAddress(t,r){var e=this;return s((function*(){var n=[];var a="";switch(r){case"BSV":var i=(n=yield e.get("","https://api.whatsonchain.com/v1/bsv/main/address/".concat(t.toString(),"/unspent"))).map(t=>{var{tx_hash:r,tx_pos:e,value:n}=t;return{txId:r,vout:e,satoshis:n,amount:n/1e8}});return Promise.all(i.map(function(){var t=s((function*(t){var r=(yield e.get("","https://api.whatsonchain.com/v1/bsv/main/tx/hash/".concat(t.txId))).vout[t.vout];return t.scriptPubKey=r.scriptPubKey.hex,t}));return function(r){return t.apply(this,arguments)}}()));case"BCH":return({utxos:n,scriptPubKey:a}=yield e.get("/address/utxo/".concat(t.toString()))),(n=n.map(t=>c({scriptPubKey:a},t))).map(t=>{var{txid:r}=t;return c({txId:r},d(t,["txid"]))});default:throw new Error("chain is not set in getUtxosFromAddress")}}))()}getUtxosFromAddress(t){var r=this;return s((function*(){return W.getUtxosFromAddress(t,r.chain)}))()}static getTxosFromOutputData(t,r){var e=this;return s((function*(){var n=t.map(t=>t.__txId);var a=[...new Set(n)];var i=new Map;return yield Promise.all(a.map(function(){var t=s((function*(t){return i.set(t,yield e.getTransaction(t,r))}));return function(r){return t.apply(this,arguments)}}())),t.map(t=>{var{vout:r,blockheight:e,confirmations:n}=i.get(t.__txId)||{};return t.__vouts.map(a=>{var{scriptPubKey:i,value:s}=r[a];return{address:i.addresses[0],txId:t.__txId,vout:a,scriptPubKey:i.hex,amount:parseFloat(s),satoshis:parseInt(1e8*s,10),height:e,confirmations:n}})})}))()}getTxosFromOutputData(t){var r=this;return s((function*(){return W.getTxosFromOutputData(t,r.chain)}))()}static postOutputData(t){var r=this;return s((function*(){return r.post("/",t,v.UN_P2SH_URL)}))()}postOutputData(t){return s((function*(){return W.postOutputData(t)}))()}static getOutputData(t){var r=this;return s((function*(){return r.get("/un-p2sh/".concat(t),v.UN_P2SH_URL)}))()}getOutputData(t){return s((function*(){return W.getOutputData(t)}))()}static getOwnedRevs(t){var r=this;return s((function*(){return r.get("/txos/".concat(t.toString()),v.UN_P2SH_URL)}))()}getOwnedRevs(t){return s((function*(){return W.getOwnedRevs(t)}))()}static setTxoSpent(t){var r=this;return s((function*(){return r.post("/txos/set-spent/",t,v.UN_P2SH_URL)}))()}setTxoSpent(t){return s((function*(){return W.setTxoSpent(t)}))()}}class z{static fromJSON(t){if(k.isJSON(t))return k.fromJSON(t);if(w.isJSON(t))return w.fromJSON(t);if(K.isJSON(t))return K.fromJSON(t);if(y.isJSON(t))return y.fromJSON(t);throw new Error("unrecognized json ".concat(JSON.stringify(t)))}}var{Transaction:V,PublicKey:q,Address:Z,BN:G,Script:X,encoding:Q}=e;var{Output:Y,Input:$}=V;var{MultiSigScriptHash:tt,PublicKeyHashInput:rt}=$;var{BufferReader:et}=Q;var nt=t=>new Promise(r=>setTimeout(r,t));class at extends V{constructor(t){super(t),this._outputData=[],Object.defineProperty(this,"to",l(this._to)),Object.defineProperty(this,"from",l(this._from))}get dataInputs(){var t=[];var r=function*(t){for(var r of t)yield r}(this.inputs);var e=r.next();for(;!e.done;){var n=e.value;var a=T.fromScript(n._scriptBuffer);if(a.isPublicKeyHashIn())t.push(new w(a.toAddress(),0));else if(T.isP2shScript(a)){var i=!1;var s=[T.redeemScriptFromP2shScript(a)];for(;!i;)try{t.push(k.fromRedeemScripts(s)),i=!0}catch(t){var o=r.next();if(o.done)throw new Error("Could not compute data inputs");var u=o.value;var c=T.fromScript(u._scriptBuffer);s.push(T.redeemScriptFromP2shScript(c))}}e=r.next()}return t}set dataInputs(t){throw Error("dataTransaction.dataInputs cannot be set directly, use dataTransaction.from or dataTransaction.fromScriptOutput")}get inputsWithData(){return this.dataInputs.filter(t=>"script"===t.kind)}getVirtualInputs(t){var r=this;return s((function*(){var{inputsWithData:e}=r;var n=k.addVouts(e);return Promise.all(n.map(function(){var e=s((function*(e){var n=[];if(e.__vouts.forEach(t=>{n.push(r.inputs[t])}),!n.every(t=>t.prevTxId.toString("hex")===n[0].prevTxId.toString("hex")))throw new Error("Something went wrong 1");var a=n[0].prevTxId.toString("hex");var i=yield at.fromTxId(a,t);yield i.fetchOutputData();var s=k.addVouts(i.outputData);var o=[];if(s.forEach((t,r)=>{B(t.__vouts,n.map(t=>t.outputIndex))&&o.push(r)}),o.length>1)throw new Error("Something went wrong 2");return{txId:a,virtualIndex:o[0]}}));return function(t){return e.apply(this,arguments)}}()))}))()}fromMultiSig(t,r,e){var n=t.map(t=>f("txId","txid",t));return super.from(n,r,e)}_from(t){var r=f("txId","txid",t);return super.from(r)}fromScriptOutput(t,r){var e=T.outScriptFromData(r);var{_owners:n}=r;return e.forEach((r,e)=>{var{redeemScript:a}=r;var{scriptPubKey:i,satoshis:s,txId:o,vout:u}=t[e];var c=new Y({script:new T(i),satoshis:parseInt(s,10)});var d=new T;var h=new tt({prevTxId:o,output:c,outputIndex:u,script:d},n,1,null,a);this.addInput(h)}),this}get outputData(){if(!this._outputData.length)throw new Error("dataTransaction.outputData is not initialized. Call dataTransaction.fetchDataOuptuts() first.");return this._outputData}set outputData(t){throw Error("dataTransaction.outputData cannot be set directly")}get outputsWithData(){return this.outputData.filter(t=>"script"===t.kind)}change(t){var r=this.outputs.length;return super.change(t),this.outputs.length>r&&this._outputData.push(new K(t)),this}toChangeOutput(t){var r=this.outputs.length;return super.change(t.address),this.outputs.length>r&&this._outputData.push(t),this._outputData.length-1}toPkhOutput(t){return super.to(t.address,t.amount),this._outputData.push(t),this._outputData.length-1}toScriptOutput(t){var r=T.outScriptFromData(t);return this._outputData.push(t),r.forEach(r=>{var{redeemScript:e,chunk:n}=r;var a=T.buildScriptHashOut(e);var i=t._amount;var s=new Y({script:a,satoshis:i});this.addOutput(s)}),this._outputData.length-1}toReturnOutput(t){return this.addData(t.data),this._outputData.push(t),this._outputData.length-1}_to(t){switch(t.kind){case"change":return this.toChangeOutput(t);case"return":return this.toReturnOutput(t);case"script":return this.toScriptOutput(t);case"pkh":return this.toPkhOutput(t);default:throw new Error("Unsupported output kind ".concat(t.kind))}}fetchOutputData(){var t=this;return s((function*(){if(t._outputData.length)return t._outputData;var r=t.getTxId();var e=yield W.getOutputData(r);return t._outputData=e.map(z.fromJSON),t._outputData}))()}get prevObjectIds(){return this.inputs.map(t=>({txId:t.prevTxId.toString("hex"),virtualIndex:t.outputIndex}))}getTxId(){return new et(this._getHash()).readReverse().toString("hex")}static fromTxId(t,r){return s((function*(){var e=null;try{e=yield W.getRawTransaction(t,r)}catch(n){yield nt(3e3),e=yield W.getRawTransaction(t,r),console.log("\nslept and found\n")}var n=new at;return yield n.fromString(e),n}))()}}var{Mnemonic:it,HDPrivateKey:st,PrivateKey:ot,PublicKey:ut,Address:ct,OutputData:dt}=e;class ht{constructor(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new it;var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:v.CHAIN;this.mnemonic=t,this.path="",this.restClient=new W(r),this.hdPrivateKey=this.mnemonic.toHDPrivateKey(this.path,v.BITCOIN_NETWORK)}static getRandomMnemonic(){return(new it).toString()}getRandomMnemonic(){return ht.getRandomMnemonic()}static fromMnemonic(t){return new ht(t)}getMnemonic(){return this.mnemonic}getPath(){return this.path}derive(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];var e=new ht(this.mnemonic);return e.path="".concat(this.path).concat(this.path.length?"/":"").concat(t).concat(r?"'":""),e.hdPrivateKey=this.hdPrivateKey.derive(t,r),e}static getHdPrivateKey(){return new st}getPrivateKey(){return this.hdPrivateKey.privateKey}getPublicKey(){return this.hdPrivateKey.publicKey}getAddress(){return this.address=this.address||this.getPublicKey().toAddress(v.BITCOIN_NETWORK),this.address}getBalance(){var t=this;return s((function*(){var r=t.getAddress();return t.restClient.getBalance(r.toString())}))()}getUtxos(t){var r=arguments,e=this;return s((function*(){var n=r.length>1&&void 0!==r[1]?r[1]:e.getAddress();var a=yield e.restClient.getUtxosFromAddress(n);for(var i=a.length-1;i>0;i-=1){var s=Math.floor(Math.random()*(i+1));var o=a[i];a[i]=a[s],a[s]=o}var u=0;var c=[];var d=0;for(;u<t&&d<a.length;)c.push(a[d]),u+=a[d].satoshis,d+=1;if(u<t)throw new Error("Insufficient balance in address ".concat(n.toString(),". Found ").concat(u,", required ").concat(t,"."));return c}))()}sendTransaction(t){var r=arguments,e=this;return s((function*(){var n=r.length>1&&void 0!==r[1]&&r[1];var{txId:a}=yield e.restClient.sendTransaction(t);if(n){var i=JSON.stringify(t.outputData.map(t=>t.toJSON()));var s=t.toJSON().inputs.map(t=>{var{prevTxId:r,outputIndex:e}=t;return{txId:r,outputIndex:e}});yield e.restClient.postOutputData({txId:a,outputData:i,inputs:s})}return{txId:a}}))()}send(t,r,e){var n=this;return s((function*(){var a="string"==typeof r?r:r.toString();"string"==typeof e&&ct.fromString(e);var i=z.fromJSON({amount:t,address:a});return n.sendOutputData([i],e)}))()}sendOutputData(t,r){var e=this;return s((function*(){var n=new at;var a=r||e.getAddress();var i=v.DEFAULT_FEE;var s=e.getPrivateKey();var o=t.reduce((t,r)=>t+parseInt(r.amount||0,10),0);return(yield e.getUtxos(o+i)).forEach(n.from.bind(n)),t.forEach(n.to.bind(n)),n.change(a),n.sign(s),e.sendTransaction(n)}))()}sendAll(t){var r=this;return s((function*(){var e=yield r.getBalance();var n=v.DEFAULT_FEE;if(e>n){var a=new w(t,e-n);return r.sendOutputData([a])}throw new Error("Insufficient funds to send payment.")}))()}}class vt{constructor(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:v.CHAIN;this.wallet=t||new ht(void 0,r)}static fromMnemonic(t,r){return new this(new ht(t,r),r)}put(t){var r=this;return s((function*(){return r.update([],t)}))()}get(t){return s((function*(){return vt.get(t)}))()}static getOutputDataMap(t){return s((function*(){var r=[...new Set(t)];var e=yield Promise.all(r.map(function(){var t=s((function*(t){var r=(yield W.getOutputData(t)).map(z.fromJSON);var e=0;var n=r.map(r=>{var n="script"===r.kind?T.outScriptFromData(r).length:1;var a=Array(n).fill(e).map((t,r)=>t+r);return e+=n,c({},r,{__vouts:a,__txId:t})});return[t,n]}));return function(r){return t.apply(this,arguments)}}()));return new Map(e)}))()}static get(t){var r=this;return s((function*(){var e=t.map(t=>t.txId);var n=yield r.getOutputDataMap(e);return t.map(t=>{var{txId:r,virtualIndex:e}=t;var a=n.get(r);if(!a||!Array.isArray(a))throw new Error("No data found.");return a[e]})}))()}update(t,r){var e=this;return s((function*(){var n=new at;var a=yield e.get(t);var i=yield e.wallet.restClient.getTxosFromOutputData(a);t.forEach(function(){var t=s((function*(t,r){n.fromScriptOutput(i[r],a[r])}));return function(r,e){return t.apply(this,arguments)}}());var o=r.map(n.to.bind(n));var u=(n._estimateSize()+20)*(v.DEFAULT_FEE/1e3);(yield e.wallet.getUtxos(u)).forEach(n.from.bind(n)),n.fee(u),n.change(e.wallet.getAddress()),n.sign(e.wallet.getPrivateKey());var{txId:c}=yield e.wallet.sendTransaction(n,!0);return t.forEach(function(){var t=s((function*(t){yield e.wallet.restClient.setTxoSpent(t)}));return function(r){return t.apply(this,arguments)}}()),o.map(t=>({txId:c,virtualIndex:t}))}))()}}var pt=eval;class lt{eval(t){return s((function*(){return pt(t)}))()}apply(t,r,e){return s((function*(){return{res:t[r](...e),obj:t}}))()}}class ft{constructor(){return new lt}eval(t){var r=this;return s((function*(){return r.sandbox.eval(t)}))()}apply(t,r,e){var n=this;return s((function*(){return n.sandbox.apply(t,r,e)}))()}}var gt=t=>new Promise(r=>setTimeout(r,t));class mt{constructor(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};var{id:r,target:e={},chain:n,db:i=new vt(void 0,n),sandbox:s=new ft,eventEmitter:o=new a,socket:u}=t;this._id=r,this._rev=r,this.__target=e,this.db=i,this.sandbox=s,this.eventEmitter=o,this.socket=u,this.socket.on("message",this.onWebsocketMessage.bind(this)),this._initialized=!1,this.chain=n,this.poll()}poll(){var t=this;return s((function*(){for(;!t._initialized;)try{yield W.getTransaction(t._id.txId,t.chain),t._initialized=!0}catch(t){yield gt(500)}t.eventEmitter.emit("initialized")}))()}onWebsocketMessage(t){var r=this;return s((function*(){var{data:e}=t;try{var{txId:n}=JSON.parse(e)||{};var a=yield at.fromTxId(n,r.chain);yield a.fetchOutputData();var{__func:i,_args:o}=a.outputData[0];var u=yield a.getVirtualInputs(r.chain);var c=u.findIndex(t=>B(t,r._rev));if("constructor"===i||-1===c)return;var d=yield Promise.all(u.map(function(){var t=s((function*(t){return B(t,r._rev)?r.__target:mt.getObjectAt(t,r.sandbox,r.chain)}));return function(r){return t.apply(this,arguments)}}()));var h=0;var[v,...p]=d;var l=o.map(t=>"__"===t?p[h++]:t);yield r.sandbox.apply(v,i,l),r._rev={txId:n,virtualIndex:c},r.eventEmitter.emit("updated")}catch(t){throw console.log("Error on websocket message",t),t}}))()}static getObjectAt(t,r,e){return s((function*(){var n=yield at.fromTxId(t.txId,e);yield n.fetchOutputData();var a=yield n.getVirtualInputs(e);var i=yield Promise.all(a.map(function(){var t=s((function*(t){return mt.getObjectAt(t,r,e)}));return function(r){return t.apply(this,arguments)}}()));var{__func:o,_args:u,__cls:c}=n.outputData[0];var d=null;var h=0;if("constructor"===o){var v=i;var p=u.map(t=>"__"===t?v[h++]:t);d=[new(yield r.eval("(".concat(c,")")))(...p),...p]}else{var[l,...f]=i;var g=u.map(t=>"__"===t?f[h++]:t);yield r.apply(l,o,g),d=[l,...g]}return d[t.virtualIndex]}))()}get(t,r){var e=this;if("_id"===r||"_rev"===r||"_initialized"===r)return Reflect.get(this,r);if("_owners"===r||"_amount"===r)return Reflect.get(this.__target,r);if("__target"===r)return this.__target;if("_on"===r||"_once"===r)return(t,e)=>this.eventEmitter[r.substring(1)](t,e);if("_close"===r)throw new Error("Smart objects do not need to be closed anymore.");return t&&r&&"function"!=typeof t[r]?Reflect.get(t,r):Object.prototype.hasOwnProperty.call(t.constructor.prototype,r)?s((function*(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];var i=yield global.computer.update(e,r,n);yield e.db.update(global.computer.oldRevs,global.computer.newOutputs),global.computer.reset();var{eventEmitter:s}=e;return new Promise(t=>{s.once("updated",()=>{t(i)})})})):Reflect.get(t,r)}set(t,r,e){if("_rev"===r)return this._rev=e,!0;throw new Error("Cannot set property of smart object")}}class _t{constructor(t){this.publicKey=t,this.newOutputs=[],this.oldRevs=[]}static encode(t,r){var{res:e}=H([t,...r]);var n=e.shift();var a=Object.values(n);return e[0]._partition=a,e}static decode(t){var r=t[0]._partition;delete t[0]._partition;var e={};var n=0;for(var a of r)e[n]=a,n+=1;t.unshift(e);var i=F(t);return{target:i.shift(),params:i}}new(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];var e=r.filter(t=>t._rev);var n=r.map(t=>t._rev?"__":t);var a=r.map(t=>t._rev?t.__target:t);var i=e.map(t=>t._rev);var s=new t(...a);s._owners=s._owners||[this.publicKey.toString()],s._amount=s._amount||v.MIN_NON_DUST_AMOUNT;var o=_t.encode(s,e);o[0].__cls=t.toString(),o[0].__func="constructor",o[0]._args=n;var u=o.map(k.fromJSON.bind(this));return this.oldRevs=[...i],this.newOutputs=u,s}update(t,r,e){var n=this;return s((function*(){var{__target:a,_rev:i,sandbox:s}=t;var o=e.filter(t=>t._rev);var u=e.map(t=>t._rev?"__":t);var c=e.map(t=>t._rev?t.__target:t);var d=o.map(t=>t._rev);var h=M(a);var{res:v,obj:p}=yield s.apply(h,r,c);var l=_t.encode(h,o);l[0].__func=r,l[0]._args=u,l[0]._owners=p._owners||h.owners,l[0]._amount=p._amount||h._amount;var f=l.map(k.fromJSON.bind(n));return n.oldRevs=[i,...d],n.newOutputs=f,v}))()}reset(){this.oldRevs=[],this.newOutputs=[]}}var{Mnemonic:wt,PublicKey:yt}=e;var Ot=function(){var t=s((function*(t,r){return new Promise(e=>{t._initialized||t._once(r,e)})}));return function(r,e){return t.apply(this,arguments)}}();class bt{constructor(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};var{chain:e,seed:n}=t;var{sandbox:a=new ft}=t;var{mnemonic:i=new wt(n)}=t;var{db:s=vt.fromMnemonic(i,e)}=t;this.db=s,this.sandbox=a,this.socket=r.connect(v.UN_P2SH_URL),global.computer=new _t(this.db.wallet.getPublicKey())}_createSmartObject(t,r){var{db:e,socket:n}=this;var a=new mt({id:r,target:t,db:e,socket:n,chain:e.wallet.restClient.chain});return new Proxy(t,a)}formatContract(t){var r=this;return s((function*(){return"string"===A(t)&&(t=(t=t.startsWith("export ")?t.slice(7):t).startsWith("default ")?t.slice(8):t,t="(".concat(t,")"),t=yield r.sandbox.eval(t)),t}))()}new(t){var r=arguments,e=this;return s((function*(){var n=r.length>1&&void 0!==r[1]?r[1]:[];t=yield e.formatContract(t);var a=global.computer.new(t,n);var i=yield e.db.update(global.computer.oldRevs,global.computer.newOutputs);global.computer.reset(),n.filter(t=>t._rev).forEach((t,r)=>{t._rev=i[r+1]});var s=e._createSmartObject(a,i[0]);return yield Ot(s,"initialized"),s}))()}sync(t){var r=this;return s((function*(){var e=yield mt.getObjectAt(t,r.sandbox,r.db.wallet.restClient.chain);return r._createSmartObject(e,t)}))()}shutdown(){this.socket.disconnect(!0)}close(){throw new Error("computer.close() has been renamed to computer.shutdown()")}static getOlder(t,r){return s((function*(){var{txId:e,virtualIndex:n}=t[0];var a=yield at.fromTxId(e,r);return yield a.fetchOutputData(),"constructor"!==a.outputData[n].__func&&[{txId:a.inputs[0].prevTxId.toString("hex"),virtualIndex:a.inputs[0].outputIndex}]}))()}static getOldest(t,r){var e=this;return s((function*(){var n=yield e.getOlder(t,r);return n?e.getOldest(n,r):t}))()}getOwnedRevs(){var t=this;return s((function*(){return bt.getOwnedRevs(t.db.wallet.getPublicKey())}))()}static getOwnedRevs(t){return s((function*(){return W.getOwnedRevs(t)}))()}}module.exports=bt;
