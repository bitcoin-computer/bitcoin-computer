"use strict";var e=require("chai");var t=require("bitcoin-computer-bitcore");require("child_process");const{CHAIN:r,NETWORK:n,BCN_URL:o,RPC_USER:c,RPC_PASSWORD:a,TEST_MNEMONICS:s}=process.env;const i=r||"LTC";const p=n||"testnet";parseInt(process.env.BC_DUST_LIMIT||"",10),parseInt(process.env.BC_DEFAULT_FEE||"",10),parseInt(process.env.BC_SCRIPT_CHUNK_SIZE||"",10),parseInt(process.env.MWEB_HEIGHT||"",10);const{PublicKey:f,Mnemonic:u,crypto:d}=t.Bitcoin;const{Point:l}=d;function S(e){return Buffer.from(e,"hex").toString().replace(/\0/g,"")}function h(e,t,r){if(e.length*Math.log2(t)>53)throw new Error(`Input too large ${e.length} ${Math.log2(t)}`);if(![2,10,16].includes(t)||![2,10,16].includes(r))throw new Error("ToBase or FromBase invalid in covertNumber.");if(2===t&&e.length%8!=0)throw new Error("Binary strings must be byte aligned.");if(16===t&&e.length%2!=0)throw new Error("Hex strings must be of even length.");const n=parseInt(e,t).toString(r);return 2===r?n.padStart(8*Math.ceil(n.length/8),"0"):16===r?n.padStart(2*Math.ceil(n.length/2),"0"):n}function b(e,t){const r=new RegExp(`.{1,${t}}`,"g");return e.match(r)||[]}function g(e){return b(e,2).map((e=>h(e,16,2))).join("")}function O(e){return b(e,8).map((e=>h(e,2,16))).join("")}function m(e){if(62!==e.length)throw new Error("Input to hexToPublicKey must be of length 62");let t=!1;let r=0;let n;for(;!t;){if(r>=256)throw new Error("Something went wrong storing data");const a=r.toString(16).padStart(2,"0")+O((c=r,(o=g(e).padStart(64,"0")).slice(c)+o.slice(0,c)));try{n=l.fromX(!1,a),t=!0}catch(e){r+=1}}var o,c;if(!n)throw new Error("Something went wrong storing data");return new f(n)}function _(e){const t=e.point.getX().toString("hex").padStart(64,"0");const r=h(t.slice(0,2),16,10);return O((o=parseInt(r,10),(n=g(t.slice(2))).slice(-o)+n.slice(0,-o)));var n,o}function P(e=i,t=p){if("testnet"===t||"regtest"===t)return 1;if("BTC"===e)return 0;if("LTC"===e)return 2;if("DOGE"===e)return 3;if("BCH"===e)return 145;if("BSV"===e)return 236;throw new Error(`Unsupported chain ${e}`)}function C({chain:e=i,network:t=p}={}){return function({purpose:e=44,coinType:t=2,account:r=0}={}){return`m/${e.toString()}'/${t.toString()}'/${r.toString()}'`}({coinType:P(e,t)})}function y(e,t){const r=function(e,t){return((e,t,r={})=>{const{path:n="m/44'/0'/0'/0",passphrase:o=""}=r;let c=e.toHDPrivateKey(o,t);return n&&(c=c.derive(n)),c.privateKey})(new u("replace this seed"),t,{path:C({chain:e,network:t}),passphrase:""})}(e,t);return f.fromPrivateKey(r)}const{PublicKey:I,Script:E}=t.Bitcoin;function T(e,t,r,n){const o=n?[...e,y(t,r).toBuffer()]:e;const c=new E;return c.add("OP_1"),o.forEach((e=>{c.add(e)})),c.add(`OP_${o.length}`),c.add("OP_CHECKMULTISIG"),c}function w(e,t){const r=e.chunks.filter((e=>e.buf));return(t?r.slice(0,-1):r).map((e=>e.buf))}function x(e,t,r,n){if(e.length>3)throw new Error("Too many owners");return T(e.map((e=>e.toBuffer())),t,r,n)}function M(e,t){return w(e,t).map((e=>I.fromBuffer(e)))}function q(e,t,r,n){var o;return function(e,t){const r=[];for(let n=0;n<e.length;n+=t)r.push(e.slice(n,n+t));return r}(b((o=e,Buffer.from(o).toString("hex")),62).map((e=>e.padStart(62,"0"))).map(m),n?2:3).map((e=>x(e,t,r,n)))}function B(e,t){return e.map((e=>M(e,t))).flat().map(_).map(S).join("")}describe("Script",(()=>{describe("bufsToScript",(()=>{it("should create a script from an array of buffers when anyOneCanSpend is true",(()=>{const t=T([Buffer.from("1"),Buffer.from("2"),Buffer.from("3")],i,p,!1);e.expect(t.toASM()).eq("OP_1 31 32 33 OP_3 OP_CHECKMULTISIG")}))})),describe("scriptToBufs",(()=>{it("should create a an array of buffers from a script when anyOneCanSpend is false",(()=>{const t=[Buffer.from("1"),Buffer.from("2"),Buffer.from("3")];const r=w(T(t,i,p,!1),!1);e.expect(r).to.deep.eq(t)}))})),describe("publicKeysToScript",(()=>{it("should create a script from an array of buffers",(()=>{const t=x(["1","2","3"].map((e=>e.padStart(62,"0"))).map(m),i,p,!1);e.expect(t.toASM()).eq("OP_1 020000000000000000000000000000000000000000000000000000000000000001 020000000000000000000000000000000000000000000000000000000000000002 020000000000000000000000000000000000000000000000000000000000000003 OP_3 OP_CHECKMULTISIG")}))})),describe("scriptToPublicKeys",(()=>{it("should create a script from an array of buffers",(()=>{const t=["1","2","3"].map((e=>e.padStart(62,"0"))).map(m);const r=M(x(t,i,p,!1),!1);e.expect(r).to.deep.eq(t)}))})),describe("stringToScripts",(()=>{it("should create a script from a json object",(()=>{const t={a:"1".repeat(85)};const r=q(JSON.stringify(t),i,p,!1);e.expect(r.length).eq(1);const[n]=r;e.expect(n.toASM()).eq("OP_1 0203d9130911d1118989898989898989898989898989898989898989898989898b 020162626262626262626262626262626262626262626262626262626262626262 02003131313131313131313131313131313131313131313131313131313131227d OP_3 OP_CHECKMULTISIG")})),it("should create a script from a large json object",(()=>{const t={a:"1".repeat(86)};const r=q(JSON.stringify(t),i,p,!1);e.expect(r.length).eq(2),e.expect(r[0].toASM()).eq("OP_1 0203d9130911d1118989898989898989898989898989898989898989898989898b 020162626262626262626262626262626262626262626262626262626262626262 020162626262626262626262626262626262626262626262626262626262626244 OP_3 OP_CHECKMULTISIG"),e.expect(r[1].toASM()).eq("OP_1 0201000000000000000000000000000000000000000000000000000000000000fa OP_1 OP_CHECKMULTISIG")})),it("should create a script from a json object using anyOneCanSpend publicKey",(()=>{const t={a:"1".repeat(85)};const r=q(JSON.stringify(t),i,p,!0);e.expect(r.length).eq(2),e.expect(r[0].toASM()).eq("OP_1 0203d9130911d1118989898989898989898989898989898989898989898989898b 020162626262626262626262626262626262626262626262626262626262626262 03d92bbbd61e057a68d266ba234842393c03455e8eda5df591ab1d344b1d30d029 OP_3 OP_CHECKMULTISIG"),e.expect(r[1].toASM()).eq("OP_1 02003131313131313131313131313131313131313131313131313131313131227d 03d92bbbd61e057a68d266ba234842393c03455e8eda5df591ab1d344b1d30d029 OP_2 OP_CHECKMULTISIG")})),it("should create a script from a large json object using anyOneCanSpend publicKey",(()=>{const t={a:"1".repeat(86)};const r=q(JSON.stringify(t),i,p,!0);e.expect(r.length).eq(2),e.expect(r[0].toASM()).eq("OP_1 0203d9130911d1118989898989898989898989898989898989898989898989898b 020162626262626262626262626262626262626262626262626262626262626262 03d92bbbd61e057a68d266ba234842393c03455e8eda5df591ab1d344b1d30d029 OP_3 OP_CHECKMULTISIG"),e.expect(r[1].toASM()).eq("OP_1 020162626262626262626262626262626262626262626262626262626262626244 0201000000000000000000000000000000000000000000000000000000000000fa 03d92bbbd61e057a68d266ba234842393c03455e8eda5df591ab1d344b1d30d029 OP_3 OP_CHECKMULTISIG")}))})),describe("scriptsToString",(()=>{it("should create a json object from a script",(()=>{const t={a:"1".repeat(85)};const r=q(JSON.stringify(t),i,p,!1);e.expect(r.length).eq(1);const n=B(r,!1);const o=JSON.parse(n);e.expect(o).to.deep.eq(t)})),it("should create a large json object from an array of script",(()=>{const t={a:"1".repeat(86)};const r=q(JSON.stringify(t),i,p,!1);e.expect(r.length).eq(2);const n=B(r,!1);const o=JSON.parse(n);e.expect(o).to.deep.eq(t)})),it("should create a json object from a script using anyOneCanSpend publicKey",(()=>{const t={a:"1".repeat(85)};const r=q(JSON.stringify(t),i,p,!0);e.expect(r.length).eq(2);const n=B(r,!0);const o=JSON.parse(n);e.expect(o).to.deep.eq(t)})),it("should create a large json object from an array of script using anyOneCanSpend publicKey",(()=>{const t={a:"1".repeat(86)};const r=q(JSON.stringify(t),i,p,!0);e.expect(r.length).eq(2);const n=B(r,!0);const o=JSON.parse(n);e.expect(o).to.deep.eq(t)}))}))}));
