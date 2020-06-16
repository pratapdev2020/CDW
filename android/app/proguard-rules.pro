# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
-keep public class io.invertase.firebase.* { public *; }
-dontwarn io.invertase.firebase.**

-keep public class com.google.firebase.* { public *; }
-dontwarn com.google.firebase.**

-keep public class com.google.android.gms.* { public *; }
-dontwarn com.google.android.gms.**

-keep public class com.google.android.material.* { public *; }
-dontwarn com.google.android.material.**

-keep public class com.facebook.imagepipeline.* { public *; }
-dontwarn com.facebook.imagepipeline.**