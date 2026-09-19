export function renderPreview(frame,code){frame.srcdoc=code}
export function readHtmlFile(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=reject;reader.readAsText(file)})}
export function looksLikeHtml(code){return /<html[\s>]/i.test(code)&&/<body[\s>]/i.test(code)}
