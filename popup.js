function formSubmit(event){
  event.preventDefault()
  const form = new FormData(event.target)
  const settings = {
    "hideMembers": form.get("hideMembers"),
    "hiddenMembers": form.get("hiddenMembers"),
    "hideSignatures": form.get("hideSignatures")
  }
  browser.storage.local.set({ settings })
  alert("saved! please reload your page")
}

function init(){
  browser.storage.local.get(["settings"]).then( result => {
    if(result.settings){
      const { hideMembers, hideSignatures, hiddenMembers } = result.settings
      document.querySelector("[name='hideMembers']").checked = hideMembers
      document.querySelector("[name='hideSignatures']").checked = hideSignatures
      document.querySelector("[name='hiddenMembers']").value = hiddenMembers
    }
  })
  document.getElementById("form").addEventListener("submit", formSubmit)
}

init();