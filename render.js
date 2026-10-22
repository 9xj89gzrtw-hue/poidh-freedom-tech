const { chromium } = require('playwright-core');
const fs=require('fs');
(async()=>{
  const b=await chromium.connectOverCDP('http://127.0.0.1:9222');
  const ctx=b.contexts()[0];
  const p=await ctx.newPage();
  await p.setViewportSize({width:1600,height:1000});
  const svg=fs.readFileSync('diagram.svg','utf8');
  await p.goto('about:blank');
  await p.setContent(`<html><body style="margin:0">${svg}</body></html>`);
  await p.waitForTimeout(600);
  await p.screenshot({path:'diagram.png',clip:{x:0,y:0,width:1600,height:1000}});
  console.log('ok');
  process.exit(0);
})().catch(e=>{console.error(e.message);process.exit(1)});
