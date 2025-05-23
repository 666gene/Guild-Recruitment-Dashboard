import fs from 'node:fs';
const applicants=[
  {battletag:'Player#1234',char_name:'Hero',realm:'Mannoroth',class_spec:'Warrior/Fury',desired_role:'DPS',notes:'Looking forward!',created_at:new Date().toISOString()}
];
if(!fs.existsSync('db')) fs.mkdirSync('db');
fs.writeFileSync('db/applicants.json',JSON.stringify(applicants,null,2));
console.log('Seeded');
