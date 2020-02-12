// import { apiHandler } from '../util/api.js'

export default function GetPullRequest({$target, onLoad}){
    this.$target = $target

    window.addEventListener('load', (e) => {
        onLoad('all')
    })

}