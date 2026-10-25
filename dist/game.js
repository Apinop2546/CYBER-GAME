(function(root){
'use strict';
const steps=[
{id:'talk',target:'mali',title:'ไปหามะลิ',hint:'มะลิมีเรื่องอยากให้ช่วย ที่โต๊ะริมหน้าต่าง',icon:'chat'},
{id:'mail',target:'mail',title:'หาจุดผิดปกติในอีเมล',hint:'ตรวจจอมะลิ แตะเบาะแส 2 จุด แล้วรายงานฟิชชิงโดยไม่ต้องเปิดลิงก์',icon:'mail'},
{id:'session',target:'server',title:'หยุดผู้บุกรุก',hint:'ไปที่เซิร์ฟเวอร์ แล้วตัดเซสชันที่ขโมยมา',icon:'link'},
{id:'cleanup',target:'mail',title:'เก็บกวาดกล่องจดหมาย',hint:'ลบทางส่งต่อข้อมูลและอีเมลหลอกที่ยังเหลือ',icon:'trash'},
{id:'protect',target:'mali',title:'คืนบัญชีให้มะลิ',hint:'เปลี่ยนรหัสผ่าน และเปิดการยืนยันสองขั้นตอน',icon:'shield'},
{id:'verify',target:'hub',title:'ตรวจว่าสำนักงานปลอดภัย',hint:'ไปที่โต๊ะกลางเพื่อตรวจระบบอีกครั้ง',icon:'check'}];
const secondSteps=[
{id:'talk',target:'mali',title:'ถามว่าเกิดอะไรขึ้น',hint:'มะลิเห็นไฟล์งานเปิดไม่ได้ ไปฟังอาการก่อน',icon:'chat'},
{id:'inspect',target:'mail',title:'ตรวจร่องรอยที่เครื่อง',hint:'หาเบาะแส 2 จุดที่บอกว่าไฟล์กำลังถูกล็อก',icon:'monitor'},
{id:'isolate',target:'server',title:'หยุดการลาม',hint:'แยกเฉพาะเครื่องที่มีอาการออกจากเครือข่าย',icon:'shield'},
{id:'backup',target:'hub',title:'เลือกสำรองข้อมูลที่ปลอดภัย',hint:'ดูจุดคืนค่าที่แยกจากระบบและตรวจแล้ว',icon:'book'},
{id:'recover',target:'mail',title:'คืนเครื่องและไฟล์งาน',hint:'สร้างเครื่องใหม่ก่อน แล้วคืนไฟล์จากสำรองที่ปลอดภัย',icon:'monitor'},
{id:'verify',target:'hub',title:'ตรวจว่ากลับมาทำงานได้',hint:'เช็กไฟล์ พื้นที่ส่วนกลาง และสัญญาณการลาม',icon:'check'}];
const thirdSteps=[
{id:'talk',target:'mali',title:'คำชวนให้โหลดโปรแกรม',hint:'คุยกับมะลิเรื่องโปรแกรมช่วยงานที่เพิ่งได้รับ',icon:'chat'},
{id:'download',target:'mail',title:'ดูการดาวน์โหลดจำลอง',hint:'เปิดจอเครื่องมะลิ แล้วดูไฟล์ที่แอบอ้างเป็นโปรแกรมธรรมดา',icon:'monitor'},
{id:'inspect',target:'mail',title:'ตรวจสัญญาณ Trojan',hint:'ตรวจผู้เผยแพร่และสิทธิ์ที่โปรแกรมขอให้ครบ 2 จุด',icon:'shield'},
{id:'decide',target:'server',title:'ตัดสินใจก่อนเปิดไฟล์',hint:'เลือกจัดการไฟล์โดยไม่ให้มันทำงานในสำนักงาน',icon:'trash'},
{id:'verify',target:'hub',title:'ตรวจเครื่องและทีม',hint:'เช็กว่าไฟล์ถูกกัก เครื่องปลอดภัย และทีมได้รับแจ้ง',icon:'check'}];
const lessons=[
['การรับแจ้งเหตุเริ่มจากถามว่าใครทำอะไร เมื่อไร และยังใช้งานเครื่องอยู่หรือไม่ อย่าเดาจากอาการอย่างเดียว','อีเมลปลอมมักอาศัยโดเมนคล้ายจริงและความเร่งด่วน หน้าให้ล็อกอินจากลิงก์ในอีเมลไม่ใช่ช่องทางยืนยันที่ปลอดภัย','IP เพียงอย่างเดียวไม่พิสูจน์ผู้บุกรุก ต้องเทียบเวลา อุปกรณ์ และคำยืนยันจากเจ้าของบัญชี ก่อนเพิกถอนเซสชันที่ผิดปกติ','หลังตัดทางเข้าแล้ว ตรวจสิ่งที่ผู้บุกรุกตั้งค้างไว้ เช่น กฎส่งต่อ และแจ้งผู้รับที่ได้รับอีเมลหลอก','การเปลี่ยนรหัสช่วยปิดรหัสที่รั่ว ส่วน MFA ลดโอกาสเข้าสู่ระบบครั้งใหม่ ทั้งสองอย่างแทนการเพิกถอนเซสชันไม่ได้','ตอบสนองเหตุแล้วต้องทดสอบผลจริง: เซสชันเก่า กล่องจดหมาย และการเข้าด้วยรหัสใหม่'],
['ไฟล์เปิดไม่ได้หลายไฟล์พร้อมข้อความเรียกค่าไถ่ เป็นสัญญาณที่ต้องรีบตรวจ แต่ยังไม่ควรรีบสรุปสาเหตุ','บันทึกอาการและหลักฐานก่อนแก้ไข เพื่อให้ทีมติดตามขอบเขตและลำดับเหตุได้','แยกเฉพาะเครื่องที่มีอาการก่อนเพื่อลดการลามและลดผลกระทบต่อเพื่อนร่วมงาน','สำรองข้อมูลที่ใช้กู้คืนควรแยกจากระบบที่ได้รับผลกระทบ และตรวจแล้วว่าเปิดอ่านได้','คืนเครื่องจากอิมเมจที่เชื่อถือได้ก่อนนำไฟล์กลับมา ไม่คืนข้อมูลลงเครื่องที่ยังมีอาการ','เปิดไฟล์ตัวอย่าง ตรวจพื้นที่ส่วนกลาง และเฝ้าดูสัญญาณซ้ำก่อนกลับไปทำงานปกติ'],
['โปรแกรมที่เพื่อนส่งมาอาจดูเหมือนงานปกติ ถามแหล่งที่มาและเหตุผลที่ต้องใช้ก่อนเปิด','การดาวน์โหลดในเกมนี้เป็นภาพจำลอง ไม่มีไฟล์ถูกส่งมาในเครื่องจริง ตรวจชื่อไฟล์ก่อนเปิดทุกครั้ง','Trojan ปลอมตัวเป็นโปรแกรมที่ดูมีประโยชน์ ผู้เผยแพร่ที่ตรวจไม่ได้และสิทธิ์เกินหน้าที่เป็นสัญญาณสำคัญ','อย่าเปิดไฟล์เพื่อพิสูจน์ว่าปลอดภัย กักไฟล์และส่งข้อมูลให้ทีมดูในพื้นที่แยก','ตรวจว่าไฟล์ไม่ทำงาน ไม่มีอาการผิดปกติ และคนในทีมรู้วิธีเลี่ยงไฟล์เดียวกัน']];
const timedHints=[
 [
  ['ลองมองหาป้ายชื่อมะลิที่โต๊ะริมหน้าต่าง','แตะป้าย “มะลิ” หรือเดินเข้าไปหา แล้วกดโต้ตอบเพื่อถามว่าเกิดอะไรขึ้น'],
  ['อีเมลที่ดูเป็นงานจริงอาจพาไปคนละโดเมน ลองเทียบชื่อผู้ส่งกับที่อยู่ปลายทาง','เปิดคอมมะลิ ตรวจโดเมนและคำเร่งด่วนให้ครบ แล้วกดรายงานฟิชชิงได้เลย ไม่ต้องเปิดลิงก์'],
  ['IP แปลกอย่างเดียวไม่พอ ลองดูอุปกรณ์และเวลาที่ล็อกอินเทียบกับคำบอกของมะลิ','ที่ศูนย์ SOC ตรวจ Log ล็อกอินกับกฎส่งต่อ แล้วตัดเฉพาะเซสชันอุปกรณ์ที่มะลิไม่รู้จัก'],
  ['หลังหยุดเซสชันแล้ว ยังมีทางที่ข้อมูลอาจถูกส่งต่อโดยไม่ต้องล็อกอินใหม่','กลับไป Nara Mail ลบกฎส่งต่อที่ไม่รู้จัก และกักเมลหลอกที่ยังค้างอยู่'],
  ['รหัสผ่านใหม่กับ MFA ช่วยคนละเรื่อง ลองดูว่าขาดอย่างใดอย่างหนึ่งไหม','กลับไปหามะลิ เปลี่ยนรหัสผ่านและเปิด MFA ให้ครบทั้งสองอย่าง'],
  ['ตอบสนองเหตุแล้วต้องเช็กผล ไม่ใช่ดูแค่ว่ากดปุ่มสำเร็จ','ที่โต๊ะตรวจระบบ ตรวจเซสชัน กล่องจดหมาย และบัญชีให้ครบสามด้าน']
 ],[
  ['ลองถามมะลิก่อนว่าไฟล์เริ่มเปิดไม่ได้เมื่อไร และเครื่องยังต่อเครือข่ายไหม','เดินไปคุยกับมะลิแล้วเลือกขอตรวจเครื่อง'],
  ['อาการไฟล์ล็อกต้องมีหลักฐานมากกว่าคำบอกเล่า','เปิดคอมมะลิ ตรวจไฟล์ที่เปิดไม่ได้กับ READ_ME.txt แล้วบันทึกหลักฐานทั้งสองจุด'],
  ['เครื่องที่มีอาการคือจุดเริ่มหยุดการลาม อย่าแยกทุกระบบโดยไม่จำเป็น','เปิด Endpoint console ใน SOC แล้วแยก MALI-MAC ที่มีอาการ ไม่ใช่ไฟล์เซิร์ฟเวอร์ที่ยังปกติ'],
  ['สำรองที่ต่อกับเครื่องติดปัญหาอยู่ตลอดอาจถูกกระทบด้วย','ที่โต๊ะตรวจระบบ เลือกชุดสำรองที่แยกไว้และตรวจว่าเปิดอ่านได้'],
  ['อย่ารีบนำไฟล์กลับเข้าเครื่องที่ยังไม่สะอาด','เปิดศูนย์กู้คืนบนคอมมะลิ สร้างเครื่องใหม่จากอิมเมจที่เชื่อถือได้ก่อนคืนไฟล์'],
  ['การกู้คืนสำเร็จต้องดูทั้งไฟล์งานและระบบส่วนกลาง','ที่โต๊ะตรวจระบบ เปิดไฟล์ตัวอย่าง ตรวจพื้นที่ส่วนกลาง และเฝ้าดูสัญญาณการลามซ้ำ']
 ],[
  ['ลองถามว่าทำไมมะลิต้องใช้แอปนี้ และได้ไฟล์จากใคร','เดินไปคุยกับมะลิ แล้วขอดูที่มาของ DeskBuddy ก่อนเปิดไฟล์'],
  ['ไฟล์ติดตั้งที่ดูธรรมดาไม่ยืนยันว่าปลอดภัย','เปิดคอมมะลิ ดูหน้าดาวน์โหลดจำลองของ DeskBuddy แล้วตรวจรายละเอียดไฟล์'],
  ['โปรแกรมตกแต่งหน้าจอควรขอสิทธิ์แค่ไหน ลองอ่านรายละเอียดก่อนเปิด','ตรวจชื่อผู้เผยแพร่และสิทธิ์ที่ DeskBuddy ขอให้ครบสองจุด แล้วบันทึกผล'],
  ['การเปิดไฟล์เพื่อลองดูอาจทำให้โปรแกรมแฝงเริ่มทำงาน','ไปที่ Endpoint console แล้วกักไฟล์ DeskBuddy โดยไม่เปิดใช้งาน'],
  ['กักไฟล์แล้ว ยังต้องดูผลต่อเครื่องและเพื่อนร่วมงาน','ที่โต๊ะตรวจระบบ ยืนยันว่าไฟล์ไม่ทำงาน เครื่องไม่มีอาการ และทีมได้รับแจ้ง']
 ]];
function timedHint(s,level){return level>0&&!s.completed?timedHints[s.mission-1]?.[s.stage]?.[Math.min(level,2)-1]||'':'';}
function timedHintLevel(milliseconds){return milliseconds>=120000?2:milliseconds>=60000?1:0;}
const initial=()=>({version:2,mission:1,firstCompleted:false,firstScore:null,secondCompleted:false,secondScore:null,started:false,stage:0,mistakes:0,mistakeLog:[],found:[],cleaned:[],reset:false,mfa:false,loginChecked:false,reportedMail:false,isolated:false,backup:false,reimaged:false,restored:false,downloaded:false,quarantined:false,verified:[],completed:false,labRuns:0});
const stepsFor=s=>s.mission===3?thirdSteps:s.mission===2?secondSteps:steps;
function restore(raw){const s=initial();if(!raw||raw.version!==2)return s;s.firstCompleted=raw.firstCompleted===true||raw.stage===6&&raw.mission===1;s.secondCompleted=raw.secondCompleted===true||raw.stage===6&&raw.mission===2;s.mission=raw.mission===3&&s.secondCompleted?3:raw.mission===2&&s.firstCompleted?2:1;s.started=raw.started===true;s.stage=Number.isInteger(raw.stage)?Math.max(0,Math.min(stepsFor(s).length,raw.stage)):0;s.mistakes=Number.isInteger(raw.mistakes)?Math.max(0,Math.min(1000,raw.mistakes)):0;s.mistakeLog=Array.isArray(raw.mistakeLog)?raw.mistakeLog.filter(x=>Number.isInteger(x?.stage)&&x.stage>=0&&x.stage<stepsFor(s).length&&typeof x.message==='string').slice(-20).map(x=>({stage:x.stage,message:x.message.slice(0,240)})):[];for(const [key,allowed]of [['found',s.mission===3?['publisher','permissions']:s.mission===2?['locked','note']:['domain','urgent']],['cleaned',['forward','phishing']],['verified',s.mission===3?['file','device','team']:s.mission===2?['files','share','monitor']:['session','mail','account']]])s[key]=Array.isArray(raw[key])?[...new Set(raw[key].filter(x=>allowed.includes(x)))]:[];for(const key of ['reset','mfa','loginChecked','reportedMail','isolated','backup','reimaged','restored','downloaded','quarantined'])s[key]=raw[key]===true;s.completed=s.stage===stepsFor(s).length;s.labRuns=Number.isInteger(raw.labRuns)?Math.max(0,raw.labRuns):0;s.firstScore=Number.isInteger(raw.firstScore)?Math.max(30,Math.min(100,raw.firstScore)):null;s.secondScore=Number.isInteger(raw.secondScore)?Math.max(30,Math.min(100,raw.secondScore)):null;if(s.firstCompleted&&s.mission===1&&s.firstScore===null)s.firstScore=score(s);if(s.secondCompleted&&s.mission===2&&s.secondScore===null)s.secondScore=score(s);return s;}
function beginSecond(s){if(s.mission!==1||!s.completed)return false;const firstScore=score(s),labRuns=s.labRuns;Object.assign(s,initial(),{mission:2,firstCompleted:true,firstScore,started:true,labRuns});return true;}
function beginThird(s){if(s.mission!==2||!s.completed)return false;const {firstScore,labRuns}=s,secondScore=score(s);Object.assign(s,initial(),{mission:3,firstCompleted:true,firstScore,secondCompleted:true,secondScore,started:true,labRuns});return true;}
function restart(s){if(s.mission===1)return initial();return Object.assign(initial(),{mission:s.mission,firstCompleted:true,firstScore:s.firstScore,secondCompleted:s.mission===3,secondScore:s.secondScore,started:true,labRuns:s.labRuns});}
// Independent cases preserve progress when players switch missions.
function newCase(mission){return Object.assign(initial(),{mission,firstCompleted:mission>1,secondCompleted:mission>2});}
function restoreCase(raw,mission){if(!raw||raw.version!==2||raw.mission!==mission)return newCase(mission);return restore({...raw,firstCompleted:mission>1,secondCompleted:mission>2});}
function newCampaign(){return {version:1,lives:5,items:{lens:2,patch:1,shield:1,scan:1},shieldActive:false,scannedCases:{},cases:{1:newCase(1),2:newCase(2),3:newCase(3)},selected:1,awarded:{},gameOver:false};}
function restoreCampaign(raw,legacy){const c=newCampaign();if(raw?.version===1){c.lives=Number.isInteger(raw.lives)?Math.max(0,Math.min(5,raw.lives)):5;for(const item of ['lens','patch','shield','scan'])if(Number.isInteger(raw.items?.[item]))c.items[item]=Math.max(0,Math.min(9,raw.items[item]));c.shieldActive=raw.shieldActive===true;for(const m of [1,2,3])c.scannedCases[m]=raw.scannedCases?.[m]===true;for(const m of [1,2,3])c.cases[m]=restoreCase(raw.cases?.[m],m);c.selected=[1,2,3].includes(raw.selected)?raw.selected:1;c.awarded=Object.fromEntries([1,2,3].map(m=>[m,raw.awarded?.[m]===true]));c.gameOver=c.lives===0;return c;}if(legacy?.version===2&&[1,2,3].includes(legacy.mission)){c.selected=legacy.mission;c.cases[c.selected]=restoreCase(legacy,legacy.mission);}return c;}
function chooseCase(c,mission){if(![1,2,3].includes(mission)||c.gameOver)return false;c.selected=mission;return true;}
function loseHeart(c){if(c.gameOver)return c.lives;if(c.shieldActive){c.shieldActive=false;return c.lives;}c.lives=Math.max(0,c.lives-1);c.gameOver=c.lives===0;return c.lives;}
function useItem(c,item,mission=c.selected){if(c.gameOver||!['lens','patch','shield','scan'].includes(item)||!c.items[item]||item==='patch'&&c.lives===5||item==='shield'&&c.shieldActive||item==='scan'&&c.scannedCases[mission])return false;c.items[item]--;if(item==='patch')c.lives++;if(item==='shield')c.shieldActive=true;if(item==='scan')c.scannedCases[mission]=true;return true;}
function recordMistake(s,message){s.mistakes++;s.mistakeLog=(s.mistakeLog||[]).concat({stage:s.stage,message}).slice(-20);return {ok:false,message};}
function act(s,action,value){if(s.completed)return {ok:false,message:'เวรนี้เสร็จแล้ว'};if(s.mission===3)return actThird(s,action,value);if(s.mission===2)return actSecond(s,action,value);const fail=message=>recordMistake(s,message);
if(action==='talk'&&s.stage===0){s.stage++;return {ok:true,advance:true};}
if(action==='spot'&&s.stage===1){if(!['domain','urgent'].includes(value))return fail('โลโก้หรือชื่อผู้ส่งปลอมได้ ลองตรวจโดเมนและคำเร่งให้กรอกรหัส');if(!s.found.includes(value))s.found.push(value);return {ok:true,message:value==='domain'?'โดเมน narapay-help.example ไม่ตรงกับ nara.example':'ขู่ว่าบัญชีจะถูกระงับ แล้วเร่งให้กรอกรหัสผ่าน'};}
if(action==='loginPrompt'&&s.stage===1){if(value!=='reject')return fail('นี่เป็นคำขอล็อกอินจากลิงก์ในอีเมล อย่าใส่รหัสผ่าน เปิดเว็บบริษัทเองจากที่อยู่ที่รู้จัก');s.loginChecked=true;return {ok:true,message:'หยุดก่อนใส่รหัส แล้วเปิดเว็บบริษัทด้วยที่อยู่ที่รู้จักเอง'};}
if(action==='reportMail'&&s.stage===1){if(s.found.length<2)return {ok:false,message:'ตรวจโดเมนผู้ส่งและคำขอให้กรอกรหัสก่อนรายงาน'};s.reportedMail=true;s.stage++;return {ok:true,advance:true,message:'รายงานฟิชชิงถูกต้อง · +10 คะแนน โดยไม่ต้องเปิดลิงก์'};}
if(action==='quarantine'&&s.stage===1){if(s.found.length<2||!s.loginChecked)return {ok:false,message:'ตรวจเบาะแส 2 จุดและตอบคำขอล็อกอินก่อน'};s.stage++;return {ok:true,advance:true};}
if(action==='cut'&&s.stage===2){if(value!=='intruder')return fail('นี่คือเครื่องที่มะลิยืนยันว่าใช้งานอยู่ เลือกเซสชันเครื่องไม่รู้จัก');s.stage++;return {ok:true,advance:true};}
if(action==='clean'&&s.stage===3){if(!['forward','phishing'].includes(value))return fail('รายงานทีมฉบับนี้ปลอดภัย เก็บไว้ได้');if(!s.cleaned.includes(value))s.cleaned.push(value);if(s.cleaned.length===2){s.stage++;return {ok:true,advance:true};}return {ok:true,message:value==='forward'?'ลบทางส่งต่อออกแล้ว ยังมีอีเมลหลอกค้างอยู่':'ลบอีเมลหลอกแล้ว ยังต้องลบกฎส่งต่อข้อมูล'};}
if(action==='protect'&&s.stage===4){if(!['reset','mfa'].includes(value))return {ok:false};s[value]=true;if(s.reset&&s.mfa){s.stage++;return {ok:true,advance:true};}return {ok:true,message:value==='reset'?'เปลี่ยนรหัสแล้ว เปิด MFA เพิ่มเพื่อกันการเข้าครั้งใหม่':'MFA เปิดแล้ว ยังต้องเปลี่ยนรหัสผ่านที่รั่ว'};}
if(action==='verify'&&s.stage===5&&['session','mail','account'].includes(value)){if(!s.verified.includes(value))s.verified.push(value);if(s.verified.length===3){s.stage=6;s.completed=true;s.firstCompleted=true;s.firstScore=score(s);return {ok:true,advance:true};}return {ok:true};}return {ok:false,message:'ยังไม่ใช่ขั้นตอนนี้'};}
function actSecond(s,action,value){const fail=message=>recordMistake(s,message);
if(action==='talk'&&s.stage===0){s.stage++;return {ok:true,advance:true};}
if(action==='spot'&&s.stage===1){if(!['locked','note'].includes(value))return fail('เครื่องช้าอย่างเดียวบอกเหตุไม่ได้ ตรวจไฟล์ที่เปิดไม่ได้กับข้อความเรียกค่าไถ่');if(!s.found.includes(value))s.found.push(value);return {ok:true,message:value==='locked'?'ไฟล์งานหลายไฟล์เปิดไม่ได้พร้อมกัน':'พบข้อความเรียกค่าไถ่บนเครื่องของมะลิ'};}
if(action==='confirm'&&s.stage===1){if(s.found.length<2)return {ok:false,message:'เก็บเบาะแสให้ครบ 2 จุดก่อน'};s.stage++;return {ok:true,advance:true};}
if(action==='isolate'&&s.stage===2){if(value!=='affected')return fail('แยกเซิร์ฟเวอร์ที่ยังปกติจะทำให้งานเพื่อนร่วมงานหยุด โดยเครื่องที่มีอาการยังเชื่อมอยู่ แยกเครื่องมะลิก่อน');s.isolated=true;s.stage++;return {ok:true,advance:true};}
if(action==='backup'&&s.stage===3){if(value!=='offline')return fail('สำรองที่ต่ออยู่กับระบบตลอดอาจถูกกระทบด้วย เลือกชุดที่แยกไว้และตรวจแล้ว');s.backup=true;s.stage++;return {ok:true,advance:true};}
if(action==='recover'&&s.stage===4){if(value==='reimage'){s.reimaged=true;return {ok:true,message:'เตรียมเครื่องใหม่จากอิมเมจที่เชื่อถือได้แล้ว'};}if(value==='restore'){if(!s.reimaged)return fail('อย่าคืนไฟล์ลงบนเครื่องที่ยังมีอาการ สร้างเครื่องใหม่ก่อน');s.restored=true;s.stage++;return {ok:true,advance:true};}return {ok:false,message:'เลือกขั้นตอนกู้คืนบนจอ'};}
if(action==='verify'&&s.stage===5&&['files','share','monitor'].includes(value)){if(!s.verified.includes(value))s.verified.push(value);if(s.verified.length===3){s.stage=6;s.completed=true;s.secondCompleted=true;s.secondScore=score(s);return {ok:true,advance:true};}return {ok:true};}
return {ok:false,message:'ยังไม่ใช่ขั้นตอนนี้'};}
function actThird(s,action,value){const fail=message=>recordMistake(s,message);
if(action==='talk'&&s.stage===0){s.stage++;return {ok:true,advance:true};}
if(action==='download'&&s.stage===1){s.downloaded=true;s.stage++;return {ok:true,advance:true};}
if(action==='spot'&&s.stage===2){if(!['publisher','permissions'].includes(value))return fail('หน้าตาโปรแกรมสวยไม่ได้ยืนยันว่าปลอดภัย ตรวจผู้เผยแพร่และสิทธิ์ที่ขอ');if(!s.found.includes(value))s.found.push(value);return {ok:true,message:value==='publisher'?'ไม่พบผู้เผยแพร่ที่ตรวจสอบได้':'โปรแกรมตกแต่งจอกลับขออ่านไฟล์และอีเมลบริษัท'};}
if(action==='confirm'&&s.stage===2){if(s.found.length<2)return {ok:false,message:'ตรวจสัญญาณให้ครบ 2 จุดก่อน'};s.stage++;return {ok:true,advance:true};}
if(action==='decide'&&s.stage===3){if(value!=='quarantine')return fail('การเปิดไฟล์เพื่อลองดูอาจเริ่มการทำงานของ Trojan กักไฟล์โดยไม่เปิดก่อน');s.quarantined=true;s.stage++;return {ok:true,advance:true};}
if(action==='verify'&&s.stage===4&&['file','device','team'].includes(value)){if(!s.verified.includes(value))s.verified.push(value);if(s.verified.length===3){s.stage=5;s.completed=true;return {ok:true,advance:true};}return {ok:true};}
return {ok:false,message:'ยังไม่ใช่ขั้นตอนนี้'};}
function attack(kind,defenses){return kind==='session'?!defenses.revoke:!defenses.mfa;}
function score(s){return Math.max(30,Math.min(100,(s.mission===1?90+(s.reportedMail||s.loginChecked?10:0):100)-s.mistakes*5));}
const bounds={minX:-6.5,maxX:6.5,minZ:-4,maxZ:4.5};
function walkable(x,z,obstacles){return x>=bounds.minX&&x<=bounds.maxX&&z>=bounds.minZ&&z<=bounds.maxZ&&!obstacles.some(o=>x>o.x-o.w/2-.25&&x<o.x+o.w/2+.25&&z>o.z-o.d/2-.25&&z<o.z+o.d/2+.25);}
function path(from,to,obstacles){const snap=n=>Math.round(n*2)/2,key=(x,z)=>x+','+z;const start={x:snap(from.x),z:snap(from.z)},target={x:snap(to.x),z:snap(to.z)};const open=[start],seen=new Map([[key(start.x,start.z),null]]);let closest=start,best=Infinity;for(let i=0;i<open.length;i++){const p=open[i],dist=(p.x-target.x)**2+(p.z-target.z)**2;if(dist<best){best=dist;closest=p;}if(dist===0)break;for(const [dx,dz]of [[.5,0],[-.5,0],[0,.5],[0,-.5]]){const n={x:p.x+dx,z:p.z+dz},k=key(n.x,n.z);if(!seen.has(k)&&walkable(n.x,n.z,obstacles)){seen.set(k,p);open.push(n);}}}const result=[];let p=closest;while(p&&key(p.x,p.z)!==key(start.x,start.z)){result.push(p);p=seen.get(key(p.x,p.z));}return result.reverse();}
const api={steps,secondSteps,thirdSteps,stepsFor,lessons,timedHint,timedHintLevel,initial,restore,beginSecond,beginThird,restart,newCase,newCampaign,restoreCampaign,chooseCase,loseHeart,useItem,act,attack,score,bounds,walkable,path};if(typeof module!=='undefined')module.exports=api;else root.ShiftGame=api;
})(typeof window!=='undefined'?window:globalThis);
