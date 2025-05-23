import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const applicantsFile = path.join('db','applicants.json');
if(!fs.existsSync('db')) fs.mkdirSync('db');
if(!fs.existsSync(applicantsFile)) fs.writeFileSync(applicantsFile,'[]');

function serveStatic(req,res){
  const url = new URL(req.url,'http://localhost');
  let filePath;
  if(url.pathname === '/') filePath = 'frontend/index.html';
  else if(url.pathname === '/apply.html') filePath = 'frontend/apply.html';
  else if(url.pathname === '/success.html') filePath = 'frontend/success.html';
  else if(url.pathname === '/style.css') filePath = 'public/style.css';
  else return false;
  fs.readFile(filePath,(err,data)=>{
    if(err){res.writeHead(404);res.end('not found');return;}
    const type = filePath.endsWith('.css')?'text/css':'text/html';
    res.writeHead(200,{'Content-Type':type});
    res.end(data);
  });
  return true;
}

function parseBody(req){
  return new Promise(resolve=>{
    let body='';
    req.on('data',chunk=>{body+=chunk});
    req.on('end',()=>{try{resolve(JSON.parse(body))}catch{resolve({})}});
  });
}

async function handleApply(req,res){
  const data = await parseBody(req);
  data.created_at = new Date().toISOString();
  const list = JSON.parse(fs.readFileSync(applicantsFile,'utf8'));
  list.push(data);
  fs.writeFileSync(applicantsFile,JSON.stringify(list,null,2));
  res.writeHead(200,{'Content-Type':'application/json'});
  res.end(JSON.stringify({ok:true}));
}

async function handleApplicants(req,res){
  const list = JSON.parse(fs.readFileSync(applicantsFile,'utf8'));
  res.writeHead(200,{'Content-Type':'application/json'});
  res.end(JSON.stringify(list));
}

const server = http.createServer((req,res)=>{
  if(serveStatic(req,res)) return;
  if(req.method==='POST' && req.url==='/api/apply') return handleApply(req,res);
  if(req.method==='GET' && req.url==='/api/applicants') return handleApplicants(req,res);
  res.writeHead(404);res.end('not found');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>{console.log('Server running on '+PORT)});
