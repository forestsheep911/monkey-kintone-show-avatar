const app = () => {
  setTimeout(() => {
    const readUnread = document.querySelectorAll('div.gaia-argoui-toggleswitch-option')
    if (readUnread.length >= 2) {
      readUnread[0].addEventListener('mouseup', function () {
        showAvatar()
      })
      readUnread[1].addEventListener('mouseup', function () {
        showAvatar()
      })
    }
  }, 2000)
  showAvatar()
  window.addEventListener('hashchange', function () {
    setTimeout(() => {
      showAvatar()
    }, 2000)
  })
  function showAvatar() {
    setTimeout(() => {
      const findusericon = document.querySelectorAll(
        'span.User-cybozu, .itemlist-userImage-gaia, a.recordlist-username-gaia, .ocean-ntf-ntfitem-img > span, span.itemlist-userImage-gaia, .ocean-ui-comments-commentbase-entity div, .ocean-ntf-menuitem-img > span',
      )
      if (findusericon.length != 0) {
        findusericon.forEach(function (element) {
          const usericon = document.createElement('img')
          usericon.style.display = 'none'
          element.addEventListener('mouseenter', function (e) {
            document.body.appendChild(usericon)
            const thisSpan = e.target as HTMLElement
            const innerImg = thisSpan.querySelector('img') as HTMLImageElement
            if (innerImg) {
              usericon.src = innerImg.src.replace(/SMALL|NORMAL/g, 'ORIGINAL')
            }
            const spanBackground = thisSpan.style.backgroundImage
            if (spanBackground) {
              const imgUrlRex = RegExp(/https.*png/g)
              const resultUrl = imgUrlRex.exec(spanBackground)
              console.log(resultUrl)
              if (resultUrl && resultUrl.length > 0) {
                usericon.src = resultUrl[0].replace(/SIZE_\d+/g, 'ORIGINAL')
              }
            }

            usericon.onload = function () {
              usericon.style.position = 'absolute'
              usericon.style.display = 'block'
              const me = e as MouseEvent
              const leftOffset = me.clientX > window.innerWidth / 2 ? 0.25 : 0.75
              usericon.style.left = (window.innerWidth - usericon.width) * leftOffset + 'px'
              usericon.style.top = (window.innerHeight - usericon.height) / 2 + 'px'
              usericon.style.zIndex = '2'
            }
          })

          element.addEventListener('mouseout', function () {
            if (usericon) {
              usericon.remove()
            }
          })
        })
      }
    }, 2000)
  }
}

export default app
