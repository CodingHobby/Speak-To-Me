$(function () {
	var curLang = navigator.languge || 'en-US'
	console.log(curLang)

	const input = $('#text')

	window.speechSynthesis.onvoiceschanged = function () {
		$('#radios').html('')
		var langs = speechSynthesis.getVoices().map(voice => voice.lang)
		var prevLang
		langs.forEach(lang => {
			if (lang !== prevLang) {
				if (lang != curLang) {
					$('#radios').append('<li><input type="radio" name="radio" class="radio" value="' + lang + '"> ' + lang + '</li>')
				} else {
					$('#radios').append('<li><input type="radio" checked="checked" name="radio" class="radio" value="' + lang + '"> ' + lang + '</li>')
				}
				prevLang = lang
			}
			$('#radioForm input').on('change', function () {
				curLang = $('input:checked', '#radioForm').val()
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
}