import { renderedFullHTML } from '../util/template.js'

export default function ShowPullRequest({ $target, data }) {
    this.$target = $target
    this.data = data

    this.setState = function (nextData) {
        this.data = nextData
        this.render()
    }
    this.render = function () {
        const userLength = this.data[0].ready.user.length
        let renderedHTML = this.data.map((val, idx) => {
            let renderedReadyHTML = val.ready.user.map((subVal1) => {
                return subVal1 ? `<td><img src=${subVal1} height="10%"></img></td>` : `<td></td>`
            }).join('')
            let renderedOpenHTML = val.open.user.map((subVal2, subIdx2) => {
                return subVal2 ? `<td><a href="javascript:void(window.open('${val.open.url[subIdx2]}','_blank'))"><img src=${subVal2} height="10%"></a></td>`
                    : `<td></td>`
            }).join('')
            let renderedClosedHTML = val.closed.user.map((subVal3, subIdx3) => {
                return subVal3 ? `<td><a href="javascript:void(window.open('${val.closed.url[subIdx3]}','_blank'))"><img src=${subVal3} height="10%"></a></td>`
                    : `<td></td>`
            }).join('')

            return `
            <tr>
                <th>Mission${idx + 1}</th>
                ${renderedReadyHTML}
                ${renderedOpenHTML}
                ${renderedClosedHTML}
            </tr>
            `
        }).join('')
        $target.innerHTML = renderedFullHTML(renderedHTML, userLength)
}
}