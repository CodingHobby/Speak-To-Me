annyang.pause()

var commands = {
	'*msg': toText
}

annyang.addCommands(commands)

$(function () {
	var curLang = navigator.languge || 'en-US'

	const input = $('#text')

	$('#start').click(function(e) {
		e.preventDefault()
		annyang.start()
	})
	$('#stop').click(function(e) {
		e.preventDefault()
		annyang.pause()
	})

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

			$('#select').on('change', function () {
				curLang = $('#select').val()
			})
		})
	}
})

function toText(msg) {
	$('#text').val(msg)
}