$(function() {
	const input = $('#text')
	$('#say').click(function(e) {
		e.preventDefault()
		sayStuff(input.val())
	})
	$(document).keypress(function(e) {
		if(e.which == 13) {
			e.preventDefault()
			sayStuff(input.val())
		}
	})
})

function sayStuff(stuff) {
	const msg = new SpeechSynthesisUtterance(stuff)
	window.speechSynthesis.speak(msg)
}