import GetPullRequest from "./GetPullRequest.js"
import { apiHandler } from "../util/api.js"
// import { dummyData } from "../util/dummy.js"
import ShowPullRequest from "./ShowPullRequest.js"

function App() {
    const $targetBody = document.querySelector('.body')
    let titleNames = new Set()
    let userNames = new Set()
    let userUrls = new Set()
    const pullRequestStates = []
    const getPullRequest = new GetPullRequest({
        $target: $targetBody,

            // onLoad: (state) => {
            // const data = dummyData

            onLoad: async ( state ) => {
            const data = await apiHandler({
                apiState: state
            })

            data.map((val) => {
                titleNames.add(val.title.substr(8, 3))
                userUrls.add(val.user.avatar_url)
                pullRequestStates.push(val.state)
            })
            titleNames = [...titleNames].sort((a, b) => a - b)
            userUrls = [...userUrls].sort()
            let tempArray = new Array(userUrls.length)
            let initSummary = new Array(titleNames.length)
            initSummary.fill(
                {
                    ready: {
                        user: userUrls
                    },
                    open: {
                        user: tempArray,
                        url: tempArray
                    },
                    closed: {
                        user: tempArray,
                        url: tempArray
                    }
                }
            )
            let summary = JSON.parse(JSON.stringify(initSummary))
            data.map((val) => {
                let titleIndex = (titleNames).indexOf(val.title.substr(8, 3))
                let tempReadyArray = summary[titleIndex]["ready"]["user"]
                let readyUserIndex = tempReadyArray.indexOf(val.user.avatar_url)
                summary[titleIndex][val.state].user[readyUserIndex]=(val.user.avatar_url)
                summary[titleIndex][val.state].url[readyUserIndex]=(val.html_url)
                if(readyUserIndex !== -1){
                    tempReadyArray[readyUserIndex] = ''
                }
            })
            showPullRequest.setState(summary)
        }
    })
    const showPullRequest = new ShowPullRequest({
        $target: $targetBody,
        data: [],
        userLength: []
    })
}

new App()