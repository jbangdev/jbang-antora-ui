;(function () {
  'use strict'

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('theme-toggle')
    var root = document.documentElement
    var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null
    var labels = { auto: 'Auto (follows system)', light: 'Light', dark: 'Dark' }
    var nextMode = { auto: 'light', light: 'dark', dark: 'auto' }

    function applyTheme (mode) {
      root.setAttribute('data-theme-mode', mode)
      root.setAttribute('data-theme', mode === 'auto' ? (mq && mq.matches ? 'dark' : 'light') : mode)
      if (toggle) {
        var label = 'Theme: ' + labels[mode] + '. Switch to ' + labels[nextMode[mode]]
        toggle.setAttribute('aria-label', label)
        toggle.setAttribute('title', label)
      }
    }

    if (mq) {
      var onSystemChange = function () {
        if ((root.getAttribute('data-theme-mode') || 'auto') === 'auto') applyTheme('auto')
      }
      if (mq.addEventListener) mq.addEventListener('change', onSystemChange)
      else if (mq.addListener) mq.addListener(onSystemChange)
    }

    if (toggle) {
      applyTheme(root.getAttribute('data-theme-mode') || 'auto')
      toggle.addEventListener('click', function () {
        var mode = nextMode[root.getAttribute('data-theme-mode') || 'auto']
        try {
          if (mode === 'auto') window.localStorage.removeItem('jb-theme')
          else window.localStorage.setItem('jb-theme', mode)
        } catch (e) {}
        applyTheme(mode)
      })
    }
  })
})()
