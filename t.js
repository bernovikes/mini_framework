const a = "{{hello}} 你好afdsf {{two}}"
a.replace(/{{(.*?)}}/g, (match, p) => {
    console.log(match, p)
    return match
})
