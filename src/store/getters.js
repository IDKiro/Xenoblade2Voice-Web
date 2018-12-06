export default {

  availablePatterns (state) {
    return getAvailablePatterns(state)
  },

  charaList (state) {
    let availablePatterns = getAvailablePatterns(state)
    let charaList = []

    // Set去重
    let cids = new Set(
      availablePatterns.map(
        pattern => pattern.split('_')
      ).reduce(
        (x, y) => x.concat(y)
      ).map(
        cid => cid.replace(/[xyz]/, '')
      )
    )

    // 去除已选的角色
    let selectedCid = state.selectedChara.map(x => x.cid)
    selectedCid.map(cid => cids.delete(cid))

    // 生成charaList
    cids = Array.from(cids)
    cids.map(
      cid => {
        charaList.push({
          'cid': cid,
          'name': state.charactor[cid].name,
          'img': state.charactor[cid].img
        })
      }
    )

    // 去除本篇与黄金国互斥的角色
    if (selectedCid.length > 0) {
      if (selectedCid[0] < 700 | selectedCid[0] === '15a' | selectedCid[0] === '15b') {
        state.ifMainShow = true
        state.ifDLCShow = false
      } else {
        state.ifMainShow = false
        state.ifDLCShow = true
      }
    } else {
      state.ifMainShow = true
      state.ifDLCShow = true
    }

    // 按cid排序
    return charaList.sort((x, y) => parseInt(x.cid) - parseInt(y.cid))
  },

  charaBoxList (state) {
    let ret = []
    for (let i of state.selectedChara) {
      ret.push(i)
    }

    let dummyImg = 'http://share.idkiro.xyz/xb2/image/placeholder.png'
    let i = state.selectedChara.length
    while (i < 3) {
      ret.push({
        img: dummyImg,
        name: {
          CN: '',
          JP: ''
        }
      })
      i += 1
    }
    return ret
  },

  playList (state) {
    if (state.selectedPattern) {
      let textObj = state.dialogue[state.selectedPattern]['text']
      let playList = []
      for (let voice in textObj) {
        playList.push({
          src: 'http://share.idkiro.xyz/xb2/music/' + voice + '.mp3',
          artist: textObj[voice][state.language].split('：')[0],
          title: textObj[voice][state.language].split('：')[1]
        })
      }

      let cids = state.selectedPattern.split('_').map(cid => cid.replace(/[xyz]/, ''))
      for (let trackId in playList) {
        let cid = cids[trackId]
        playList[trackId]['pic'] = state.charactor[cid].img
      }

      return playList
    }

    return []
  },

  ifMainShow (state) {
    return state.ifMainShow
  },

  ifDLCShow (state) {
    return state.ifDLCShow
  }
}

function getAvailablePatterns (state) {
  let dialoguePatterns = Object.keys(state.dialogue)
  let selectedCid = state.selectedChara.map(x => x.cid) // 已选择的角色id
  let availablePatterns = []
  if (selectedCid.length) {
    availablePatterns = dialoguePatterns.filter(
      pattern => selectedCid.map(
        cid => pattern.includes(cid)
      ).reduce((a, b) => a && b)
    )
  } else {
    availablePatterns = dialoguePatterns
  }
  return availablePatterns
}
