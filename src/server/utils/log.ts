export const colors = {
    green: '\x1b[32m%s\x1b[0m',
    red: '\x1b[31m%s\x1b[0m',
    gray: '\x1b[37m%s\x1b[0m'
}

export const logColor = (color, content) => {
    console.log(colors[color], content)
}

export const log = (content) => {
    console.log(content)
}
