
function start(){
  browser.storage.local.get(["settings"]).then( result => {
    if(result.settings){
      const { hideMembers, hiddenMembers, hideSignatures } = result.settings
      if(hideMembers){
        const hm = hiddenMembers.split(",").map(m => m.trim())
        document.querySelectorAll(".ItemDiscussion")
          .forEach(el => { 
            if( hm.includes(el.querySelector(".DiscussionAuthor")?.textContent) ){
              el.remove()
            }
          })
        document.querySelectorAll(".ItemComment")
          .forEach(el => {
            if( hm.includes(el.querySelector(".Author > a")?.title) ){
              el.remove()
            }
          })
      }
      if(hideSignatures){
        document.querySelectorAll(".Signature")
          .forEach(el => el.remove())
      }
    }
  })
}

start();