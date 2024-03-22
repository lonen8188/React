import { Suspense, lazy } from "react";
import todoRouter from "./todoRouter";

const { createBrowserRouter } = require("react-router-dom");



const Loading = <div>Loading....</div>

const Main = lazy(() => import("../pages/MainPage"))

const About = lazy(() => import("../pages/AboutPage"))

//P60 추가 라우팅 설정
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))

//P62 리스트 라우팅 설정
// P64에서 주석처리 (분리) const TodoList = lazy(() => import("../pages/todo/ListPage"))

const root = createBrowserRouter([
    {
        path : "" ,
        element: <Suspense fallback={Loading}><Main/></Suspense>
    }
    ,
    {
        path : "about" ,
        element: <Suspense fallback={Loading}><About/></Suspense>
    }
    ,
    { // p60 todo 관련 코드 추가
        path : "todo",
        element : <Suspense fallback={Loading}> <TodoIndex/> </Suspense>,
        children: todoRouter() //p64에서 만들 todoRouter.js 연결 아래 주석
        // children: [ 
        //     { 
        //         path : "list",
        //         element : <Suspense fallback={Loading}> <TodoList/> </Suspense>
        //     }
        //] // 중첩라우팅 종료
    }
])
export default root;