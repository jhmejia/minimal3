---
layout: post
title: Phantom Graphs
category: learning
dependencies: 
    - geogebra
---

<!-- video embed -->
<div class="iframe-container">
<iframe class="responsive-iframe" src="https://www.youtube.com/watch?v=d6BKD1IDi6s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

### Intro 
Hey! Hi! If you are here from the video above, thanks for watching! Below are two interactive plots where you can play with general phantom graphs of 2nd- and 3rd-degree polynomials. You'll probably have the best user experience on PC but if you insist on mobile, turn your device sideways, reload and click on the *full-screen view* button in the bottom right corner of the web app.

If you haven't seen the above video, I highly recommend watching it (*note I am really biased*) and then playing with the graphs below. In the video I explain what **phantom graphs** are and why literally every graph you plotted in the past, has a hidden part (when plotted in the *"phantom"* way). 

<!-- geogebra 1st embed -->
### Interactive Phantom Plot for 2nd-Degree Polynomials
The GeoGebra applet below lets you play with a general second-degree polynomial $ax^2 + bx + c$. Move the sliders on the bottom-left to see the corresponding phantom graphs in the 3D plot on the right and their roots in the 2D plot above. The real part of the curve is pictured in <span style="color:#0099FF;">**blue**</span> and the phantom part in <span style="color:#66CC00;">**green**</span>.

<div style="display:flex; justify-content: center; align-items: center;">
    <div id="ggbApplet1"></div>
</div>

<!-- geogebra 2nd embed -->
### Interactive Phantom Plot for 3rd-Degree Polynomials
This applet works the same as the applet above but displays the third-degree polynomial $ax^3 + bx^2 + cx +d$. Have fun!
<div style="display:flex; justify-content: center; align-items: center;">
    <div id="ggbApplet2"></div>
</div>

<script>
var parameters = {
"width":1230,
"height":698,
"showMenuBar":true,
"showAlgebraInput":false,
"showToolBar":true,
"customToolBar":"0 | 40 41 42 27",
"showToolBarHelp":true,
"showResetIcon":false,
"enableLabelDrags":false,
"enableShiftDragZoom":true,
"enableRightClick":false,
"errorDialogsActive":false,
"useBrowserForJS":false,
"allowStyleBar":false,
"preventFocus":false,
"showZoomButtons":true,
"capturingThreshold":3,
// add code here to run when the applet starts
"appletOnLoad":function(api){ /* api.evalCommand('Segment((1,2),(3,4))');*/ },
"showFullscreenButton":true,
"scale":1,
"disableAutoScale":false,
"allowUpscale":false,
"clickToLoad":false,
"appName":"classic",
"buttonRounding":0.7,
"buttonShadows":false,
"language":"en",
// use this instead of ggbBase64 to load a material from geogebra.org
// "material_id":"keyhrbab",
// use this instead of ggbBase64 to load a .ggb file
// "filename":"myfile.ggb",
};
// is3D=is 3D applet using 3D view, AV=Algebra View, SV=Spreadsheet View, CV=CAS View, EV2=Graphics View 2, CP=Construction Protocol, PC=Probability Calculator DA=Data Analysis, FI=Function Inspector, macro=Macros
var views = {'is3D': 1,'AV': 0,'SV': 0,'CV': 0,'EV2': 1,'CP': 0,'PC': 0,'DA': 0,'FI': 0,'macro': 0};
// load applets
var applet1 = new GGBApplet({parameters, "id": "ggbApplet1", "material_id":"keyhrbab"}, '5.0', views);
var applet2 = new GGBApplet({parameters, "id": "ggbApplet2", "material_id":"thetzf32"}, '5.0', views);
window.onload = function() {applet1.inject('ggbApplet1'); applet2.inject('ggbApplet2')};
applet1.setPreviewImage('data:image/gif;base64,R0lGODlhAQABAAAAADs=','https://www.geogebra.org/images/GeoGebra_loading.png','https://www.geogebra.org/images/applet_play.png');
applet2.setPreviewImage('data:image/gif;base64,R0lGODlhAQABAAAAADs=','https://www.geogebra.org/images/GeoGebra_loading.png','https://www.geogebra.org/images/applet_play.png');
</script>