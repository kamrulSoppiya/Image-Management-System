import { useState } from 'react';
import classes from '../../assets/css/module/mainDesign.module.scss';

// eslint-disable-next-line react/prop-types
export default function ImageTab({searchInputs, selectedFile, filteredImages, images}) {
    const [preview, setPreview] = useState(null);
    const [selectData, setSelectData] = useState();

    if (!Array.isArray(selectedFile)) {
        return null; 
    }
    if(!Array.isArray(filteredImages)){
        return null; 
    }
    return (
        <div className={classes.images}>
            {(()=>{
                // eslint-disable-next-line react/prop-types
                if(searchInputs.length > 0){
                    // eslint-disable-next-line react/prop-types
                    return selectedFile.filter((item) => item.imgName.includes(searchInputs))
                        .map((item, index) => (
                            <div key={index} className={classes.images}>
                                <div className={classes.imageBox} style={{position:'relative'}} height="60px"  width="60px">
                                    <img src={item.baseData} alt="Uploaded" height="60px !important"  width="60px" onClick={()=>setSelectData(item)} />
                                    <p style={{ fontSize: '10px', display: 'flex', textAlign: 'center' }}>
                                    {item.imgName}
                                    </p>
                                    <button type='button' onClick={()=>setPreview(item)} style={{backgroundColor:'red', position:'absolute', width:'4px'}}>Prev</button>
                                </div>
                            </div>
                    ))
                    }else if(filteredImages.length>0){
                        return filteredImages.map((image, index) => (
                            <div key={index}>
                                <img src={image.baseData} alt="" height="60px !important"  width="60px" onClick={()=>setSelectData(image)}/>
                                <p style={{ fontSize: '10px', display: 'flex', textAlign: 'center' }}>{image.imgName}</p>
                                <button type='button' onClick={()=>setPreview(image)} style={{backgroundColor:'red', position:'absolute', width:'4px'}}>Prev</button>
                            </div>
                            
                    ))
                    // Condtion for sorting Images 
                }else if(images.length>0){
                    return images.map((image, index) => (
                        <img key={index} src={image.baseData} alt="" height="60px !important"  width="60px"/>
                    ))
                }else{
                    return <div className={classes.images}>
                        {selectedFile.map((selectFile, index) => (
                            <div key={index} className={classes.imageBox} height="60px"  width="60px">
                                <img src={selectFile.baseData} style={{position:'relative'}} alt="Uploaded" height="60px !important"  width="60px" onClick={()=>setSelectData(selectFile)}/>
                                <p style={{ fontSize: '10px', display: 'flex', textAlign: 'center' }}>
                                {selectFile.imgName}
                                </p>
                                <svg onClick={()=>setPreview(selectFile)} viewBox="0 0 20 20" className="Polaris-Icon__Svg_375hu imagePreviewEyeIcon" focusable="false" aria-hidden="true"><path fillRule="evenodd" d="M13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-1.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path><path fillRule="evenodd" d="M10 4c-2.476 0-4.348 1.23-5.577 2.532a9.266 9.266 0 0 0-1.4 1.922 5.98 5.98 0 0 0-.37.818c-.082.227-.153.488-.153.728s.071.501.152.728c.088.246.213.524.371.818.317.587.784 1.27 1.4 1.922 1.229 1.302 3.1 2.532 5.577 2.532 2.476 0 4.348-1.23 5.577-2.532a9.265 9.265 0 0 0 1.4-1.922 5.98 5.98 0 0 0 .37-.818c.082-.227.153-.488.153-.728s-.071-.501-.152-.728a5.984 5.984 0 0 0-.371-.818 9.269 9.269 0 0 0-1.4-1.922c-1.229-1.302-3.1-2.532-5.577-2.532Zm-5.999 6.002v-.004c.004-.02.017-.09.064-.223a4.5 4.5 0 0 1 .278-.608 7.768 7.768 0 0 1 1.17-1.605c1.042-1.104 2.545-2.062 4.487-2.062 1.942 0 3.445.958 4.486 2.062a7.77 7.77 0 0 1 1.17 1.605c.13.24.221.447.279.608.047.132.06.203.064.223v.004c-.004.02-.017.09-.064.223a4.503 4.503 0 0 1-.278.608 7.768 7.768 0 0 1-1.17 1.605c-1.042 1.104-2.545 2.062-4.487 2.062-1.942 0-3.445-.958-4.486-2.062a7.766 7.766 0 0 1-1.17-1.605 4.5 4.5 0 0 1-.279-.608c-.047-.132-.06-.203-.064-.223Z"></path></svg>
                            </div>
                        ))}
                    </div>
                } 
            })()}   
            {console.log(selectData)}
            {preview && <>
                <img src={preview.baseData} alt="Show Preview Data" />
            </>}
        </div>
    );
  }
  