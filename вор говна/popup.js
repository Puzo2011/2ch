var find;
var find2;
var timer;
var err;
var dw;

console.log("injected");

const grabBtn = document.getElementById("grabBtn");
grabBtn.addEventListener("click",() => {    
    chrome.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];
        if (tab) {
            chrome.scripting.executeScript(
                {
                    target:{tabId: tab.id, allFrames: true},
                    func:interval,
                    args:['0'],
                },
                onResult
            )
        } else {
            alert("There are no active tabs")
        }
    })
})

const stopBtn = document.getElementById("StopBtn");
stopBtn.addEventListener("click",() => {    
    chrome.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];
        if (tab) {
            chrome.scripting.executeScript(
                {
                    target:{tabId: tab.id, allFrames: true},
                    func:interval,
                    args:['1'],
                },
                onResult
            )
        } else {
            alert("There are no active tabs")
        }
    })
})

function interval(args) {
  err = 0;
  dw = 0;
  if(args === '1') {
    timer = clearInterval(timer);
	location.reload();
    console.log('Function has been stopped');
  }
  if(args === '0') {
    timer = setInterval(() => {
      set();
  }, 1000)
    console.log('Function has been started');
  }

  function set() {
      try {
			find2 = document.querySelector('figcaption[class="post__file-attr"]');
			ftext = find2.outerHTML;
			ftext = ftext.replaceAll("svg", "img");
			find2.outerHTML = ftext;
			find = document.querySelector('img[class="icon js-post-saveimg desktop"]');
			find.click();
			find2 = document.querySelector('figcaption[class="post__file-attr"]');
			dw++;
			console.log(dw);
			scroll = find;
			scroll.scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
			find2.remove();
			err = 0;
          }
        catch(e) {
          console.log("Кнопка не найдена.\n" + e)
          window.scrollTo({
            top: 999999999,
            behavior: "smooth"
        });
          if(err >= 5) {
            timer = clearInterval(timer);
            console.log('Function has been stopped');
			location.reload();
          }
            err += 1;
        }
    }
}

function onResult(frames) {

}