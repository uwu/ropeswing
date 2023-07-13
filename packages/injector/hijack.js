//? hijack.js - originally written in a single afternoon at work
//* original comments preserved

// Hijack the Windows96 init process

// i love pretty printing
console.group("[ hijack-setup ]");
console.log("init setup script...");

// some constant values
const constants = {
    kinjectPath: "KINJECT.js",
    bundleEndpoint: "http://127.0.0.1:8008/ropeswing.js",
}

// remove any existing injections
console.log("removing existing injections");
kutil.sysrom.exists(constants.kinjectPath) && kutil.sysrom.rm(constants.kinjectPath);

// use the kutil to destroy the kutil!
console.log("writing new injection")
kutil.sysrom.write(constants.kinjectPath, `let r=new XMLHttpRequest();r.open("GET","${constants.bundleEndpoint}?_="+Date.now(),false);r.send();r.status===200&&eval(r.responseText)`);

console.log("done!");

console.groupEnd();