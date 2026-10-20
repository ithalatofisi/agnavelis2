import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
let submits = 0;
let success = false;
let gaLoads = 0;
await page.route('**/*', async route => {
  const u = new URL(route.request().url());
  if (u.pathname.includes('/quote/status')) return route.fulfill({json:{configured:true}});
  if (u.pathname.includes('/quote/submit')) {
    submits++;
    const body = route.request().postDataJSON();
    await new Promise(resolve => setTimeout(resolve, 500));
    return route.fulfill({status:success?200:502,json:success?{accepted:true,request_id:body.request_key}:{detail:'SMTP test failure'}});
  }
  if (u.hostname.includes('googletagmanager')) { gaLoads++; return route.fulfill({body:''}); }
  if (u.hostname !== 'agnavelis.test') return route.abort();
  if (u.pathname === '/api/config') return route.fulfill({json:{ga4_measurement_id:'G-7TMC0025H8'}});
  const file = u.pathname.startsWith('/assets/') ? u.pathname.slice(1) : 'contact/index.html';
  try { return route.fulfill({body:await readFile(path.join(process.cwd(),'dist',file)),contentType:file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html'}); } catch { return route.abort(); }
});
const assert = (v,m) => { if(!v) throw Error(m); console.log('OK:',m); };
await page.goto('https://agnavelis.test/contact/#b2b-quote');
await page.getByRole('button',{name:'Request a B2B Quote',exact:true}).waitFor();
await page.waitForTimeout(2500);
assert(gaLoads===0,'İzin öncesi GA yüklenmedi');
const button=page.getByRole('button',{name:'Request a B2B Quote',exact:true});
assert(await button.isEnabled(),'Kontrollü hazır yanıtında form açık');
await button.click();
assert(submits===0,'Eksik alan gönderilmedi');
await page.locator('[name=company_name]').fill('TEST Company');
await page.locator('[name=country]').selectOption('TR');
await page.locator('[name=quantity_packs]').fill('1');
await page.locator('[name=contact_name]').fill('TEST Person');
await page.locator('[name=business_email]').fill('invalid');
await button.click(); assert(submits===0,'Geçersiz email gönderilmedi');
await page.locator('[name=business_email]').fill('test@gmail.com');
await page.getByRole('button',{name:'Accept analytics',exact:true}).click();
await button.click();
await page.waitForTimeout(700);
assert(await page.getByRole('alert').isVisible(),'Kontrollü gönderim hatası gösterildi');
assert(await page.locator('[name=company_name]').inputValue()==='TEST Company','Hata sonrası bilgiler korundu');
let events=await page.evaluate(()=>window.dataLayer||[]);
assert(!events.some(e=>e[1]==='generate_lead'),'Hatalı gönderimde generate_lead yok');
success=true;
await page.evaluate(()=>{ const f=document.querySelector('form'); f.requestSubmit(); f.requestSubmit(); });
await page.waitForTimeout(700);
assert(submits===2,'Hata denemesi ve çift tıklamalı başarı denemesi toplam iki istek');
assert(await page.getByText('Your quote request has been accepted for email delivery. Thank you.').isVisible(),'Kontrollü başarılı kabul mesajı');
events=await page.evaluate(()=>window.dataLayer||[]);
assert(events.filter(e=>e[1]==='generate_lead').length===1,'Başarıda tek generate_lead');
assert(!JSON.stringify(events).includes('test@gmail.com')&&!JSON.stringify(events).includes('TEST Company'),'Olaylarda form kişisel verisi yok');
await page.getByRole('link',{name:/Contact AGNAVELIS on WhatsApp/}).first().click();
events=await page.evaluate(()=>window.dataLayer||[]);
assert(events.filter(e=>e[1]==='whatsapp_click').length===1,'WhatsApp tıklaması tek olay');
assert(!JSON.stringify(events).includes('wa.me')&&!JSON.stringify(events).includes('?text='),'Olaylarda WhatsApp URL/metni yok');
for(const width of [390,1440]){
 await page.setViewportSize({width,height:900});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Yatay taşma yok: '+width);
}
console.log('Kontrollü API senaryoları tamamlandı; gerçek SMTP/DebugView teslimi değildir.');
await browser.close();
