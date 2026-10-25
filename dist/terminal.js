(function(root){
'use strict';
const target='192.0.2.10'; // TEST-NET-1 address reserved for documentation; the lab never sends packets.
const common=[
 ['whoami','ฉันเป็นผู้ใช้ใด','ดูชื่อบัญชีที่กำลังใช้ ไม่ได้บอกว่าสิทธิ์สูงหรือต่ำ'],
 ['hostname','เครื่องนี้ชื่ออะไร','ดูชื่อเครื่องเพื่อเทียบกับทะเบียนอุปกรณ์ขององค์กร']
];
const unix=[['id','บัญชีและกลุ่ม','แสดง UID, GID และกลุ่มที่บัญชีสังกัด'],['pwd','อยู่ที่โฟลเดอร์ไหน','แสดงตำแหน่งโฟลเดอร์ปัจจุบัน']];
const recipes={
 'nmap -sn 192.0.2.10':['Host is up (simulated lab host)','-sn ตรวจว่ามีโฮสต์ตอบสนองหรือไม่ โดยไม่สแกนพอร์ต การไม่ตอบอาจเกิดจากไฟร์วอลล์ ไม่ได้ยืนยันว่าเครื่องปิด'],
 'nmap -p 22,80,443 192.0.2.10':['PORT    STATE     SERVICE\n22/tcp  closed    ssh\n80/tcp  open      http\n443/tcp filtered  https','-p จำกัดพอร์ตที่ดู open คือมีบริการตอบรับ, closed คือเครื่องตอบว่าไม่มีบริการ, filtered คือแยกไม่ออกเพราะถูกกรอง ผลนี้เป็นข้อมูลจำลอง'],
 'nmap -sT -p 22,80,443 192.0.2.10':['PORT    STATE     SERVICE\n22/tcp  closed    ssh\n80/tcp  open      http\n443/tcp filtered  https','-sT ใช้การเชื่อมต่อ TCP ผ่านระบบปฏิบัติการ การเชื่อมต่อสำเร็จจะครบขั้นตอน จึงมีโอกาสปรากฏในบันทึกของปลายทาง'],
 'nmap -sS -p 22,80,443 192.0.2.10':['PORT    STATE     SERVICE\n22/tcp  closed    ssh\n80/tcp  open      http\n443/tcp filtered  https','-sS เป็น SYN scan ที่ประเมินการตอบกลับโดยไม่ทำ TCP handshake ให้ครบ ปกติต้องใช้สิทธิ์ส่ง raw packets และไม่ใช่วิธีซ่อนตัวจากการตรวจจับ'],
 'nmap -sU -p 53,123 192.0.2.10':['PORT    STATE          SERVICE\n53/udp  open           domain\n123/udp open|filtered  ntp','-sU ตรวจ UDP ซึ่งไม่มี handshake แบบ TCP สถานะ open|filtered หมายถึงยังแยกไม่ได้ว่าเปิดหรือถูกกรอง'],
 'nmap -sV -p 22,80,443 192.0.2.10':['PORT    STATE     SERVICE  VERSION\n22/tcp  closed    ssh\n80/tcp  open      http     Nara Lab Web (sample)\n443/tcp filtered  https','-sV พยายามระบุชนิดหรือเวอร์ชันบริการที่เปิด ผลเวอร์ชันเป็นการคาดเดาจากการตอบกลับและต้องยืนยันจากหลักฐานอื่น'],
 'nmap -Pn -p 22,80,443 192.0.2.10':['PORT    STATE     SERVICE\n22/tcp  closed    ssh\n80/tcp  open      http\n443/tcp filtered  https','-Pn ข้ามการตรวจว่าโฮสต์ออนไลน์ก่อน แล้วตรวจพอร์ตตามที่ระบุ จึงอาจใช้เวลามากขึ้นหากปลายทางไม่ตอบ']
};
const scanNames={'-sn':'ตรวจว่าโฮสต์ตอบไหม','-p':'เลือกพอร์ตที่ต้องตรวจ','-sT':'TCP connect scan','-sS':'SYN scan','-sU':'UDP scan','-sV':'ระบุชนิดบริการ','-Pn':'ข้ามการตรวจโฮสต์'};
const perOS={
 macos:[...common,...unix,['ifconfig','ดูอินเทอร์เฟซ','ดูที่อยู่ IP ของการ์ดเครือข่าย; บางรายการเป็น loopback หรืออะแดปเตอร์เสมือน'],['lsof -i -P -n','ดูโปรเซสที่ใช้เครือข่าย','จับคู่โปรเซสกับพอร์ตในเครื่อง -P และ -n ช่วยคงตัวเลขพอร์ต/ที่อยู่']],
 linux:[...common,...unix,['ip addr','ดูอินเทอร์เฟซ','ดู IP และสถานะการ์ดเครือข่ายใน Linux'],['ss -tuln','ดูพอร์ตที่กำลังฟัง','-t TCP, -u UDP, -l listening, -n แสดงตัวเลข']],
 windows:[...common,['cd','อยู่ที่โฟลเดอร์ไหน','แสดงโฟลเดอร์ปัจจุบันใน Command Prompt'],['ver','เวอร์ชันระบบ','แสดงเวอร์ชัน Windows แบบย่อ'],['ipconfig','ดูอินเทอร์เฟซ','แสดง IPv4, เกตเวย์ และ DNS ของเครื่อง'],['netstat -ano','ดูพอร์ตและ PID','-a ทุกการเชื่อมต่อ, -n ตัวเลข, -o PID; ใช้ PID ไปตรวจโปรเซสต่อ']]
};
const results={macos:{whoami:'mali',hostname:'MALI-MAC',id:'uid=501(mali) gid=20(staff) groups=20(staff),12(everyone)',pwd:'/Users/mali',ifconfig:'en0: flags=8863<UP,RUNNING>\n  inet 192.0.2.14 netmask 255.255.255.0\nlo0: inet 127.0.0.1','lsof -i -P -n':'COMMAND   PID  USER   NAME\nBrowser   425  mali   TCP 192.0.2.14:54210->192.0.2.10:80 (ESTABLISHED)\nMail      631  mali   TCP 192.0.2.14:54821->192.0.2.31:443 (ESTABLISHED)'},linux:{whoami:'analyst',hostname:'SOC-LAB',id:'uid=1000(analyst) gid=1000(analyst) groups=1000(analyst),27(sudo)',pwd:'/home/analyst','ip addr':'1: lo: <LOOPBACK,UP> inet 127.0.0.1/8\n2: eth0: <BROADCAST,UP> inet 192.0.2.21/24','ss -tuln':'Netid State  Local Address:Port\ntcp   LISTEN  127.0.0.1:3000\ntcp   LISTEN  192.0.2.21:22\nudp   UNCONN  192.0.2.21:53'},windows:{whoami:'NARA\\mali',hostname:'FINANCE-PC',cd:'C:\\Users\\mali',ver:'Microsoft Windows [Version 10.0.22631] (sample)','ipconfig':'Ethernet adapter Office:\n  IPv4 Address . . . . . : 192.0.2.25\n  Default Gateway . . . : 192.0.2.1','netstat -ano':'Proto  Local Address       Foreign Address     State        PID\nTCP    192.0.2.25:50312    192.0.2.31:443      ESTABLISHED  4321\nTCP    0.0.0.0:135         0.0.0.0:0           LISTENING    1024'}};
function commands(os){return [...(perOS[os]||perOS.macos),...Object.entries(recipes).map(([cmd,recipe])=>[cmd,scanNames[cmd.split(' ')[1]],recipe[1]])];}
function run(os,input){const cmd=String(input||'').trim().replace(/\s+/g,' '),key=cmd.toLowerCase();if(!cmd)return {output:'',explanation:''};if(key==='clear')return {clear:true,output:'',explanation:'ล้างประวัติบนจอเท่านั้น'};if(key==='help')return {output:commands(os).map(x=>x[0]).join('\n')+'\nclear',explanation:'เลือกคำสั่งจากรายการหรือพิมพ์เอง ผลทั้งหมดเป็นข้อมูลจำลอง ไม่มีการรันบนเครื่องหรือสแกนเครือข่าย'};
const item=(perOS[os]||perOS.macos).find(x=>x[0].toLowerCase()===key);if(item)return {output:(results[os]||results.macos)[item[0]],explanation:item[2]};
if(key.startsWith('nmap ')){const recipe=Object.entries(recipes).find(([sample])=>sample.toLowerCase()===key)?.[1];if(recipe){const [output,explanation]=recipe;return {output:'Nmap scan report for '+target+' (LAB SIMULATION)\n'+output,explanation:explanation+' · ใช้เฉพาะระบบที่ได้รับอนุญาต; พอร์ตเปิดไม่เท่ากับช่องโหว่'};}return {output:'ห้องฝึกจำลองเฉพาะ 192.0.2.10 และรูปแบบคำสั่งที่แสดงด้านข้าง ไม่มีการสแกนจริง',explanation:'ลองเลือกสูตรตัวอย่างเพื่อเรียนรู้ความต่างของตัวเลือก แต่ไม่ส่งแพ็กเก็ตไปยัง IP หรือโดเมนอื่น'};}
return {output:'ไม่พบคำสั่งนี้ในห้องฝึกจำลอง',explanation:'พิมพ์ help หรือเลือกคำสั่งตัวอย่าง ลองเปลี่ยนระบบปฏิบัติการเพื่อเทียบคำสั่ง'};}
root.ShiftTerminal={commands,run};
if(typeof module!=='undefined')module.exports=root.ShiftTerminal;
})(typeof window!=='undefined'?window:globalThis);
