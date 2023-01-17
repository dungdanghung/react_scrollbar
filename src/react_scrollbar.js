import { useEffect, useState, useRef } from "react"
import "./react_scrollbar.css"

function React_scrollbar({ children }) {
    const [test, settest] = useState(0)
    const [heightofscrollitem, setheightofscrollitem] = useState(0)
    const ref = useRef()

    function handleparentelementscroll(e) {
        let b = ((e.target.scrollTop + e.target.clientHeight) / e.target.scrollHeight * 100) - ref.current
        setheightofscrollitem(b > 0 ? b : 0)
    }
    function handlescrollclick(e) {
        if (e.target.className === "scroll") {
            let a = (e.target.parentElement.children[0].offsetHeight / 100) * ((e.nativeEvent.offsetY - e.target.children[0].offsetHeight / 2) / e.target.clientHeight * 100)
            e.target.parentElement.scrollTo({
                top: a,
                behavior: "smooth"
            })
        }
    }
    function handlescrollitemclick(e) {

        let max = e.screenY + e.target.parentElement.offsetHeight - (e.nativeEvent.offsetY + e.target.offsetTop)
        let min = max - e.target.parentElement.offsetHeight
        function handlescrollmove(even) {
            if (even.screenY < max && even.screenY > min) {
                let a = ((even.screenY - min)-e.nativeEvent.offsetY) / (max - min) * 100
                let b = e.target.parentElement.parentElement.children[0].offsetHeight / 100 * a
                e.target.parentElement.parentElement.scrollTo({
                    top: b,
                })

            } else if (even.screenY > max) {
                let c = e.target.parentElement.parentElement.children[0].offsetHeight
                e.target.parentElement.parentElement.scrollTo({
                    top: c,
                })
            } else if (even.screenY < min) {
                e.target.parentElement.parentElement.scrollTo({
                    top: 0,
                })
            }


        }
        function handleremovescrollmove() {
            window.removeEventListener("mousemove", handlescrollmove)
            window.removeEventListener("mouseup", handleremovescrollmove)
        }
        window.addEventListener("mousemove", handlescrollmove)
        window.addEventListener("mouseup", handleremovescrollmove)
    }



    const ro = new ResizeObserver((e) => {
        let a = e[0].target.offsetParent.children[1].clientHeight / e[0].target.offsetParent.children[0].clientHeight * 100
        ref.current = a
        settest(a > 0 ? a < 100 ? a : 100 : 0)
        ro.observe(e[0].target.offsetParent.children[0])
        e[0].target.offsetParent.addEventListener("scroll", handleparentelementscroll)
    })
    useEffect(() => {
        ro.observe(document.querySelector(".scroll"))
    }, [])

    return (
        <>
            {children}
            <div className="scroll" onMouseDown={handlescrollclick}>
                <div className="scrollitem" style={{ top: `${heightofscrollitem}%`, height: `${test}%` }} onMouseDown={handlescrollitemclick} ></div>
            </div>
        </>

    )
}

export default React_scrollbar

