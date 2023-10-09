import ImgManage from "./components/ImgManage";
import Loading from "./components/Loading";

function App() {
    const handelImageUploada =(file, base64Image)=>{
      console.log(`getFile - `,file.name);
      console.log(`base64ImageUrl - `,base64Image);
    }
    const imgFormat = ["jpg", "jpeg", "png" ];
    return(
        <div className="">
          <Loading />
          <ImgManage onImageUpload={handelImageUploada} imgFormat={imgFormat} />
        </div>
    )
}

export default App
