import {loadProject,saveProject,makeProject} from './storage.js';
import {createDemoSession} from './auth.js';
import {renderPreview,readHtmlFile} from './editor.js';
import {validatePublish} from './publisher.js';
import '../js/ui.js';

const $=s=>document.querySelector(s);let project=loadProject();let session=null;
const starter='<!doctype html>\n<html lang="ar" dir="rtl">\n<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>موقعي الجديد</title><style>body{font-family:Arial;background:#f5f7fb;color:#172033;display:grid;place-items:center;min-height:90vh}main{text-align:center;padding:40px}button{padding:12px 20px;border:0;border-radius:9px;background:#6658e8;color:#fff}</style></head>\n<body><main><h1>مرحبًا بك في موقعي</h1><p>عدّل الكود وشاهد النتيجة مباشرة.</p><button onclick="alert(\'يعمل!\')">جرّب الزر</button></main></body>\n</html>';
function toast(text){const el=$('#toast');el.textContent=text;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
function save(){if(!project)return;project.code=$('#codeEditor').value;project.updatedAt=new Date().toISOString();saveProject(project);$('#saveStatus').textContent='محفوظ تلقائيًا'}
function preview(){renderPreview($('#previewFrame'),$('#codeEditor').value);$('#saveStatus').textContent='جارٍ الحفظ…';clearTimeout(window.saveTimer);window.saveTimer=setTimeout(save,450)}
function openWorkspace(){session=createDemoSession();$('#landing').classList.add('hidden');$('#workspace').classList.remove('hidden');$('#loginTop').classList.add('hidden');$('#userArea').classList.remove('hidden');$('#userName').textContent=session.name;$('#projectTitle').textContent=project.name;$('#codeEditor').value=project.code;preview()}
function login(){if(!project){$('#projectDialog').showModal()}else openWorkspace()}
$('#googleBtn').onclick=login;$('#loginTop').onclick=login;
$('#createProject').onclick=e=>{e.preventDefault();project=makeProject($('#projectName').value.trim()||'مشروعي الأول',starter);saveProject(project);$('#projectDialog').close();openWorkspace();toast('تم إنشاء المشروع')};
$('#codeEditor').oninput=preview;$('#logoutBtn').onclick=()=>{save();session=null;$('#workspace').classList.add('hidden');$('#landing').classList.remove('hidden');$('#userArea').classList.add('hidden');$('#loginTop').classList.remove('hidden');toast('تم الحفظ والخروج')};$('#backBtn').onclick=()=>{$('#workspace').classList.add('hidden');$('#landing').classList.remove('hidden')};
document.querySelectorAll('.tab').forEach(tab=>tab.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));tab.classList.add('active');$('#uploadPanel').classList.toggle('hidden',tab.dataset.tab!=='upload')});
$('#fileInput').onchange=async e=>{const file=e.target.files[0];if(!file)return;$('#codeEditor').value=await readHtmlFile(file);document.querySelector('[data-tab="write"]').click();preview();toast('تم تحميل الملف')};
$('#publishBtn').onclick=()=>{$('#publishMessage').textContent='';$('#publishDialog').showModal();$('#publishCode').focus()};$('#confirmPublish').onclick=e=>{e.preventDefault();const result=validatePublish($('#codeEditor').value,$('#publishCode').value.trim());const message=$('#publishMessage');message.textContent=result.message;message.className=`message ${result.ok?'success':'error'}`;if(result.ok){project.published=true;save();setTimeout(()=>{$('#publishDialog').close();toast('تم النشر بنجاح')},900)}};
