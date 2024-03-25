import { useRef, useState } from "react";
import { postAdd } from "../../api/productsApi"; // p254
import FetchingModal from "../common/FetchingModal"; //p257 useState()를 통해 제어함
import ResultModal from "../common/ResultModal"; //p260 결과 모달 추가
import useCustomMove from "../../hooks/useCustomMove"; //p262 등록 완료후 이동용
 

// api 서버를 호출할 때 fetching 상테를 true로 해주고, 데이터를 가져온 후 false로 변경해서 화면에서 사라지도록 함

// useRef()는 document.getElementById()와 유사한 역활을 한다.
// 리엑트 컴포넌트는 태그 id 속성을 활용하면 나중에 동일한 컴포넌트를 여러번 사용해서 화면에 문제가 생기기 때문에  useRef()를 이용해 처리함.
const initState = {
    pname: '',
    pdesc: '',
    price: 0,
    files: []
  }


const AddComponent = () => {

    const [product,setProduct] = useState({...initState})
    const uploadRef = useRef()

    const [fetching, setFetching] = useState(false)  //p257 추가 (진행중 모달)
    const [result, setResult] = useState(null) //p260 추가(결과 모달)

    const {moveToList} = useCustomMove() // p263 이동을 위한 함수 

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({...product})
        
    }

    const handleClickAdd = (e) => {
        
        console.log(product)
        

        //p252 추가
        const files = uploadRef.current.files
        // useRef를 이용할 때 current라는 속성을 활용해서 DOM 객체를 참조하게 됨
        const formData = new FormData()
        // ADD 버튼을 클릭했을 때 첨부파일에 선택된 정보를 읽어내서 첨부파일의 정보를 파악하고 이를 AJAX 전송에 FormData 객체로 구성
        for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
        }
        
        //other data
        formData.append("pname", product.pname)
        formData.append("pdesc", product.pdesc)
        formData.append("price", product.price)
        
        // Ajax를 전송할 때 FormData 객체를 통해서 모든 내용을 담아 전송하게 됨
        console.log(formData)

        setFetching(true) //  p257 추가

        postAdd(formData).then(data=> {  // p257 변경
        setFetching(false)
        setResult(data.result) //p261 추가(결과 모달)
        }) // p257 추가 끝

    }

    const closeModal = () => { //ResultModal 종료 p261 추가

        setResult(null)
        moveToList({page:1}) // p263 추가모달 창이 닫히면 이동 
      }

    return ( 
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4"> 
            {/*  p258 추가 */}
            {fetching? <FetchingModal/> :<></>}

            {/* p261 추가(모달) */}
            {result? <ResultModal 
                title={'Product Add Result'} 
                content={`${result}번 등록 완료`} 
                callbackFn ={closeModal}/>
                : <></>
            }
                <div className="flex justify-center">
                    {/* <h1>Product Add Component</h1> */}
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">
                            Product Name
                        </div>
                        <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                        name="pname"
                        type={'text'} 
                        value={product.pname}
                        onChange={handleChangeProduct}
                        >
                        </input>

                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                            <textarea 
                            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                            name="pdesc"
                            rows="4"
                            onChange={handleChangeProduct}
                            value={product.pdesc}>
                            {product.pdesc}
                            </textarea>
                        </div>  
                    </div>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">Price</div>
                            <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                            name="price"
                            type={'number'} 
                            value={product.price}
                            onChange={handleChangeProduct}
                            >
                            </input>
                        </div>
                    </div>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">Files</div>
                            <input ref={uploadRef} 
                                className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                                type={'file'} multiple={true}
                            >    
                            </input>
                        </div>
                    </div>
                <div className="flex justify-end">
                    <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                        <button type="button" 
                        className="rounded p-4 w-36 bg-blue-500 text-xl  text-white "
                        onClick={handleClickAdd}
                        >
                        ADD
                        </button>
                    
                    </div>
                </div>
                
        </div>      
    );

}

export default AddComponent;