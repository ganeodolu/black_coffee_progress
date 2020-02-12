function renderedFullHTML(val, userLength){
    return `
    <table class="type11">
        <thead>
            <tr>
                <th>Mission</th>
                <th colspan = "${userLength}">Ready</th>
                <th colspan = "${userLength}">Pull Request</th>
                <th colspan = "${userLength}">Merged</th>
            </tr>
        </thead>
        <tbody>
            ${val}
        </tbody>
    </table>
`
}  

export { renderedFullHTML }