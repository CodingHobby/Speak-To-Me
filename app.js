$(function () {
	var curLang = navigator.languge || 'en-US'

	const input = $('#text')

	window.speechSynthesis.onvoiceschanged = function () {
		$('#select').html('')
		var langs = speechSynthesis.getVoices().map(voice => voice.lang)
		var prevLang
		langs.forEach(lang => {
			if (lang !== prevLang) {
				if (lang != curLang) {
					$('#select').append('<option name="radio" class="radio"> ' + lang + '</option>')
				} else {
					$('#select').append('<option name="radio" class="radio" selected> ' + lang + '</option>')
				}
				prevLang = lang
			}

			$('#select').on('change', function() {
				curLang = $('#select').val()
			})
		})
	}

	$('#say').click(function (e) {
		e.preventDefault()
		sayStuff(input.val(), curLang)
	})

	$(document).keypress(function (e) {
		if (e.which == 13) {
			e.preventDefault()
			sayStuff(input.val(), curLang)
		}
	})
})


function sayStuff(stuff, lang) {
	const msg = new SpeechSynthesisUtterance(stuff)
	msg.lang = lang
	window.speechSynthesis.speak(msg)
	$('#text').val('')
}