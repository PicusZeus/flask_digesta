export const adjustHeight = (event) => {
    const el = event.target
    el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight) + "px" : "60px";
}

export const createPrettyDate = (commentDate) => {
    const date = new Date(commentDate)
    const timeLocal = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
    const leadingZero = (num) => `0${num}`.slice(-2);
    const hour = [timeLocal.getHours(), timeLocal.getMinutes()].map((t) => leadingZero(t)).join(':')
    const day = [timeLocal.getDate(), timeLocal.getMonth() + 1, timeLocal.getFullYear()].map(t => leadingZero(t)).join('.')
    return `${day} ${hour}`

}

export const splitLabels = (label, factor) => {

    const labelA = label.split(' ')
    if (labelA.length > factor)
    {
        const half = Math.ceil(labelA.length / 2)
        const firstHalf = labelA.slice(0, half).join(" ")
        const secondHalf = labelA.slice(half).join(" ")
        return [firstHalf, secondHalf]
    } else {
        return label
    }
}