const balancingGroup=require("./balancing-group");function extractFn(n,e){const t=[new RegExp(`${e}\\(([^)]*)\\)([\\s\\S]*)`),new RegExp(`${e}:\\s*function\\s*\\(([^)]*)\\)([\\s\\S]*)`),new RegExp(`${e}:\\s*\\(([^)]*)\\)\\s*=>([\\s\\S]*)`)];let r="",a="";for(let e=0;e<t.length;e+=1){const o=t[e],s=n.match(o);if(s){r=s[1]||"",a=s[2]||"";break}}return a&&(a=balancingGroup(a)),{name:e,args:r,body:a}}module.exports=extractFn;