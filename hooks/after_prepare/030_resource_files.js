#!/usr/bin/env node

//
// This hook copies various resource files from our version control system directories into the appropriate platform specific location
//


// configure all the files to copy.  Key of object is the source file, value is the destination location.  It's fine to put all platforms' icons and splash screen files here, even if we don't build for all platforms on each developer's box.
var filestocopy = [{
    "resource/icon/92-92.png": "platforms/android/res/drawable/icon.png"
}, {
    "resource/icon/72-72.png": "platforms/android/res/drawable-hdpi/icon.png"
}, {
    "resource/icon/36-36.png": "platforms/android/res/drawable-ldpi/icon.png"
}, {
    "resource/icon/48-48.png": "platforms/android/res/drawable-mdpi/icon.png"
}, {
    "resource/icon/96-96.png": "platforms/android/res/drawable-xhdpi/icon.png"
}, {
    "resource/icon/96-96.png": "platforms/android/res/drawable-xxhdpi/icon.png"
}, {
    "resource/splash/drawable-port-hdpi-screen.png": "platforms/android/res/drawable/screen.png"
}, {
    "resource/splash/drawable-port-hdpi-screen.png": "platforms/android/res/drawable-port-hdpi/screen.png"
}, {
    "resource/splash/drawable-port-ldpi-screen.png": "platforms/android/res/drawable-port-ldpi/screen.png"
}, {
    "resource/splash/drawable-port-mdpi-screen.png": "platforms/android/res/drawable-port-mdpi/screen.png"
}, {
    "resource/splash/drawable-port-xhdpi-screen.png": "platforms/android/res/drawable-port-xhdpi/screen.png"
} ];

var fs = require('fs');
var path = require('path');

// no need to configure below
var rootdir = process.argv[2];

filestocopy.forEach(function(obj) {
    Object.keys(obj).forEach(function(key) {
        var val = obj[key];
        var srcfile = path.join(rootdir, key);
        var destfile = path.join(rootdir, val);
        //console.log("copying "+srcfile+" to "+destfile);
        var destdir = path.dirname(destfile);
        if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
            fs.createReadStream(srcfile).pipe(fs.createWriteStream(destfile));
        }
    });
});