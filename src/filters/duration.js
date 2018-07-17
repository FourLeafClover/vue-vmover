export default function (duration) {
  let result = ''
  if (duration) {
    if (duration >= 60) {
      let min = parseInt(duration / 60)
      let sec = parseInt(duration % 60)
      result = (min > 9 ? min : ('0' + min)) + ':' + (sec > 9 ? sec : ('0' + sec))
    } else {
      result = '00:' + duration
    }
  }
  return result
}
