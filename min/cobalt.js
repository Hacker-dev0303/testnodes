let ua=navigator.userAgent.toLowerCase(),isIOS=ua.match("iphone os"),isMobile=ua.match("android")||ua.match("iphone os"),version=18,regex=new RegExp(/https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/),notification='<div class="notification-dot"></div>',store={},switchers={theme:["auto","light","dark"],vFormat:["mp4","webm"],vQuality:["hig","max","mid","low"],aFormat:["mp3","best","ogg","wav","opus"]},checkboxes=["disableTikTokWatermark","fullTikTokAudio"],exceptions={vQuality:"mid"};function eid(e){return document.getElementById(e)}function sGet(e){return localStorage.getItem(e)}function sSet(e,t){localStorage.setItem(e,t)}function enable(e){eid(e).dataset.enabled="true"}function disable(e){eid(e).dataset.enabled="false"}function vis(e){return e===1?"visible":"hidden"}function opposite(e){return e==="true"?"false":"true"}function changeDownloadButton(e,t){switch(e){case 0:eid("download-button").disabled=!0,sGet("alwaysVisibleButton")==="true"?(eid("download-button").value=t,eid("download-button").style.padding="0 1rem"):(eid("download-button").value="",eid("download-button").style.padding="0");break;case 1:eid("download-button").disabled=!1,eid("download-button").value=t,eid("download-button").style.padding="0 1rem";break;case 2:eid("download-button").disabled=!0,eid("download-button").value=t,eid("download-button").style.padding="0 1rem";break}}document.addEventListener("keydown",e=>{e.key==="Tab"&&(eid("download-button").value=">>",eid("download-button").style.padding="0 1rem")});function button(){let e=regex.test(eid("url-input-area").value);eid("url-input-area").value.length>0?eid("url-clear").style.display="block":eid("url-clear").style.display="none",changeDownloadButton(e?1:0,">>")}function clearInput(){eid("url-input-area").value="",button()}function copy(e,t){let a=document.getElementById(e);a.classList.add("text-backdrop"),t?navigator.clipboard.writeText(t):navigator.clipboard.writeText(a.innerText),setTimeout(()=>{a.classList.remove("text-backdrop")},600)}function detectColorScheme(){let e="auto",t=sGet("theme");t?e=t:window.matchMedia||(e="dark"),document.documentElement.setAttribute("data-theme",e)}function changeTab(e,t,a){let i=document.getElementsByClassName(`tab-content-${a}`),o=document.getElementsByClassName(`tab-${a}`);for(let n=0;n<i.length;n++)i[n].style.display="none";for(let n=0;n<o.length;n++)o[n].dataset.enabled="false";eid(t).style.display="block",e.currentTarget.dataset.enabled="true",t==="tab-about-changelog"&&sGet("changelogStatus")!==`${version}`&&notificationCheck("changelog"),t==="tab-about-about"&&!sGet("seenAbout")&&notificationCheck("about")}function notificationCheck(e){let t=!0;switch(e){case"about":sSet("seenAbout","true");break;case"changelog":sSet("changelogStatus",version);break;default:t=!1;break}(t&&sGet("changelogStatus")===`${version}`||e==="disable")&&setTimeout(()=>{eid("about-footer").innerHTML=eid("about-footer").innerHTML.replace(notification,""),eid("tab-button-about-changelog").innerHTML=eid("tab-button-about-changelog").innerHTML.replace(notification,"")},900),sGet("disableChangelog")!=="true"&&(!sGet("seenAbout")&&!eid("about-footer").innerHTML.includes(notification)&&(eid("about-footer").innerHTML=`${notification}${eid("about-footer").innerHTML}`),sGet("changelogStatus")!==`${version}`&&(eid("about-footer").innerHTML.includes(notification)||(eid("about-footer").innerHTML=`${notification}${eid("about-footer").innerHTML}`),eid("tab-button-about-changelog").innerHTML.includes(notification)||(eid("tab-button-about-changelog").innerHTML=`${notification}${eid("tab-button-about-changelog").innerHTML}`)))}function hideAllPopups(){let e=document.getElementsByClassName("popup");for(let t=0;t<e.length;t++)e[t].style.visibility="hidden";eid("picker-holder").innerHTML="",eid("picker-download").href="/",eid("picker-download").style.visibility="hidden",eid("popup-backdrop").style.visibility="hidden"}function popup(e,t,a){if(t===1)switch(hideAllPopups(),e){case"about":let i=sGet("seenAbout")?"changelog":"about";a&&(i=a),eid(`tab-button-${e}-${i}`).click();break;case"settings":eid(`tab-button-${e}-video`).click();break;case"error":eid("desc-error").innerHTML=a;break;case"download":eid("pd-download").href=a,eid("pd-copy").setAttribute("onClick",`copy('pd-copy', '${a}')`);break;case"picker":switch(a.type){case"images":eid("picker-title").innerHTML=loc.pickerImages,eid("picker-subtitle").innerHTML=loc.pickerImagesExpl,eid("popup-picker").classList.contains("scrollable")||eid("popup-picker").classList.add("scrollable"),eid("picker-holder").classList.contains("various")&&eid("picker-holder").classList.remove("various"),eid("picker-download").href=a.audio,eid("picker-download").style.visibility="visible";for(let o in a.arr)eid("picker-holder").innerHTML+=`<a class="picker-image-container"><img class="picker-image" src="${a.arr[o].url}" onerror="this.parentNode.style.display='none'"></img></a>`;break;default:eid("picker-title").innerHTML=loc.pickerDefault,eid("picker-subtitle").innerHTML=loc.pickerDefaultExpl,eid("popup-picker").classList.contains("scrollable")&&eid("popup-picker").classList.remove("scrollable"),eid("picker-holder").classList.contains("various")||eid("picker-holder").classList.add("various");for(let o in a.arr){let n=a.arr[o],r;switch(n.type){case"video":r=`<a class="picker-various-container" href="${a.arr[o].url}" target="_blank"><div class="picker-element-name">VIDEO ${Number(o)+1}</div><div class="imageBlock"></div><img class="picker-image" src="${a.arr[o].thumb}" onerror="this.style.display='none'"></img></a>`;break}eid("picker-holder").innerHTML+=r}eid("picker-download").style.visibility="hidden";break}break;default:break}else e==="picker"&&(eid("picker-download").href="/",eid("picker-download").style.visibility="hidden",eid("picker-holder").innerHTML="");eid("popup-backdrop").style.visibility=vis(t),eid(`popup-${e}`).style.visibility=vis(t)}function updateMP4Text(){eid("vFormat-mp4").innerHTML=sGet("vQuality")==="mid"?"mp4 (h264/av1)":"mp4 (av1)"}function changeSwitcher(e,t){if(t){sSet(e,t);for(let a in switchers[e])switchers[e][a]===t?enable(`${e}-${t}`):disable(`${e}-${switchers[e][a]}`);e==="theme"&&detectColorScheme(),e==="vQuality"&&updateMP4Text()}else{let a=switchers[e][0];isMobile&&exceptions[e]&&(a=exceptions[e]),sSet(e,a);for(let i in switchers[e])switchers[e][i]===a?enable(`${e}-${a}`):disable(`${e}-${switchers[e][i]}`)}}function internetError(){eid("url-input-area").disabled=!1,changeDownloadButton(2,"!!"),popup("error",1,loc.noInternet)}function checkbox(e){eid(e).checked?(sSet(e,"true"),e==="alwaysVisibleButton"&&button()):(sSet(e,"false"),e==="alwaysVisibleButton"&&button()),sGet(e)==="true"?notificationCheck("disable"):notificationCheck()}function updateToggle(e,t){switch(t){case"true":eid(e).innerHTML=loc.toggleAudio;break;case"false":eid(e).innerHTML=loc.toggleDefault;break}}function toggle(e){let t=sGet(e);t?(sSet(e,opposite(t)),opposite(t)==="true"&&sSet(`${e}ToggledOnce`,"true")):sSet(e,"false"),updateToggle(e,sGet(e))}function loadSettings(){try{if(typeof navigator.clipboard.readText>"u")throw new Error}catch{eid("pasteFromClipboard").style.display="none"}sGet("alwaysVisibleButton")==="true"&&(eid("alwaysVisibleButton").checked=!0,eid("download-button").value=">>",eid("download-button").style.padding="0 1rem"),sGet("downloadPopup")==="true"&&!isIOS&&(eid("downloadPopup").checked=!0),sGet("audioMode")||toggle("audioMode");for(let e=0;e<checkboxes.length;e++)sGet(checkboxes[e])==="true"&&(eid(checkboxes[e]).checked=!0);updateToggle("audioMode",sGet("audioMode"));for(let e in switchers)changeSwitcher(e,sGet(e));updateMP4Text()}function changeButton(e,t){switch(e){case 0:eid("url-input-area").disabled=!1,eid("url-clear").style.display="block",changeDownloadButton(2,"!!"),popup("error",1,t);break;case 1:changeDownloadButton(1,">>"),eid("url-clear").style.display="block",eid("url-input-area").disabled=!1;break;case 2:popup("error",1,t),changeDownloadButton(1,">>"),eid("url-clear").style.display="block",eid("url-input-area").disabled=!1;break}}function resetSettings(){localStorage.clear(),window.location.reload()}async function pasteClipboard(){let e=await navigator.clipboard.readText();regex.test(e)&&(eid("url-input-area").value=e,download(eid("url-input-area").value))}async function download(e){changeDownloadButton(2,"..."),eid("url-clear").style.display="none",eid("url-input-area").disabled=!0;let t={url:encodeURIComponent(e.split("&")[0].split("%")[0]),aFormat:sGet("aFormat").slice(0,4)};sGet("audioMode")==="true"?(t.isAudioOnly=!0,t.isNoTTWatermark=!0,sGet("fullTikTokAudio")==="true"&&(t.isTTFullAudio=!0)):(t.vQuality=sGet("vQuality").slice(0,4),(e.includes("youtube.com/")||e.includes("/youtu.be/"))&&(t.vFormat=sGet("vFormat").slice(0,4)),(e.includes("tiktok.com/")||e.includes("douyin.com/"))&&sGet("disableTikTokWatermark")==="true"&&(t.isNoTTWatermark=!0)),await fetch("/api/json",{method:"POST",body:JSON.stringify(t),headers:{Accept:"application/json","Content-Type":"application/json"}}).then(async a=>{let i=await a.json();if(i.status!=="error"&&i.status!=="rate-limit")if(i.url||i.picker)switch(i.status){case"redirect":changeDownloadButton(2,">>>"),setTimeout(()=>{changeButton(1)},1500),sGet("downloadPopup")==="true"?popup("download",1,i.url):window.open(i.url,"_blank");break;case"picker":i.audio&&i.picker?(changeDownloadButton(2,"?.."),fetch(`${i.audio}&p=1`).then(async o=>{let n=await o.json();n.status==="continue"?(changeDownloadButton(2,">>>"),popup("picker",1,{audio:i.audio,arr:i.picker,type:i.pickerType}),setTimeout(()=>{changeButton(1)},2500)):changeButton(0,n.text)}).catch(o=>internetError())):i.picker?(changeDownloadButton(2,">>>"),popup("picker",1,{arr:i.picker,type:i.pickerType}),setTimeout(()=>{changeButton(1)},2500)):changeButton(0,loc.noURLReturned);break;case"stream":changeDownloadButton(2,"?.."),fetch(`${i.url}&p=1`).then(async o=>{let n=await o.json();n.status==="continue"?(changeDownloadButton(2,">>>"),window.location.href=i.url,setTimeout(()=>{changeButton(1)},2500)):changeButton(0,n.text)}).catch(o=>internetError());break;case"success":changeButton(2,i.text);break;default:changeButton(0,loc.unknownStatus);break}else i.status==="success"?changeButton(2,i.text):changeButton(0,loc.noURLReturned);else changeButton(0,i.text)}).catch(a=>internetError())}async function loadOnDemand(e,t){store.historyButton=eid(e).innerHTML;let a={};eid(e).innerHTML="...";try{if(store.historyContent?a=store.historyContent:await fetch(`/api/onDemand?blockId=${t}`).then(async i=>{a=await i.json(),a.status==="success"&&(store.historyContent=a)}),a.status==="success"&&a.status!=="rate-limit")if(a.text)eid(e).innerHTML=`<button class="switch bottom-margin" onclick="restoreUpdateHistory()">${loc.collapseHistory}</button>${a.text}`;else throw new Error;else throw new Error}catch{eid(e).innerHTML=store.historyButton,internetError()}}function restoreUpdateHistory(){eid("changelog-history").innerHTML=store.historyButton}window.onload=()=>{loadSettings(),detectColorScheme(),changeDownloadButton(0,">>"),eid("cobalt-main-box").style.visibility="visible",eid("footer").style.visibility="visible",eid("url-input-area").value="",notificationCheck(),isIOS&&sSet("downloadPopup","true");let e=new URLSearchParams(window.location.search).get("u");e!==null&&(eid("url-input-area").value=e,button())},eid("url-input-area").addEventListener("keydown",e=>{e.key==="Escape"&&(eid("url-input-area").value=""),button()}),eid("url-input-area").addEventListener("keyup",e=>{e.key==="Enter"&&eid("download-button").click()}),document.onkeydown=e=>{(e.key==="Tab"||e.ctrlKey)&&eid("url-input-area").focus(),e.key==="Escape"&&hideAllPopups()};
