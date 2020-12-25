#!/usr/bin/bash

trap interrupted INT
function interrupted() {
    rm -f platforms/android/release.properties
}

stty -echo
read -p "Store Password: " spassw; echo
read -p "Key Password: " kpassw; echo
stty echo

cat << EOT > platforms/android/release.properties
storeFile=release.keystore
storePassword=$spassw
keyAlias=release_key
keyPassword=$kpassw
EOT

export ORG_GRADLE_PROJECT_cdvReleaseSigningPropertiesFile=../release.properties 
cordova build --release android
rm platforms/android/release.properties