import { useEffect } from "react";  //p414 추가
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi"; // p414추가 ,  420추가 getMemberWithAccessToken
import { useDispatch } from "react-redux"; // 428 추가
import { login } from "../../slices/loginSlice"; //428 추가
import useCustomLogin from "../../hooks/useCustomLogin"; // 429 추가

const KakaoRedirectPage = () => {

  const [searchParams] = useSearchParams()

  const {moveToPath} = useCustomLogin() // 429 추가

  const dispatch = useDispatch() // 428 추가

  const authCode = searchParams.get("code")


// p419 추가
  useEffect(() => {

    // 420 data -> accessToken
    getAccessToken(authCode).then(accessToken => {
      console.log(accessToken) 
        
      // 420 추가 
      getMemberWithAccessToken(accessToken).then(memberInfo => {

        console.log("-------------------")
        console.log(memberInfo)

        dispatch(login(memberInfo)) // 429 추가

        //소셜 회원이 아니라면 429 추가
        if(memberInfo && !memberInfo.social){
          moveToPath("/")
        }else {
          moveToPath("/member/modify")
        }

      })
      
    })

  }, [authCode])

  return (
   <div>
     <div>Kakao Login Redirect</div>
     <div>{authCode}</div>
   </div>
  )
}

export default KakaoRedirectPage;