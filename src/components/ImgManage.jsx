import { useEffect, useState } from "react";
import TabButton from "./TabButton";
import classes from '.././assets/css/module/mainDesign.module.scss';
import ImageTab from "./pages/Images";
import DropZone from '../components/DropZone';
import Selected from "./pages/Selected";

// eslint-disable-next-line react/prop-types
export default function ImgManage({onImageUpload, imgFormat}){
    const [tab, setTab] = useState('images');
    const [selectedFile, setSelectedFile] = useState([]);
    const [showMore, setShowMore] = useState();
    const [error, setError] = useState({status: false, msg: ''});
    const [searchInputs, setSearchInputs] = useState({ filterMinData: '',filterMaxData: '', searchItem: ''});
    const [filteredImages, setFilteredImages] = useState([]);
    const [images, setImages] = useState([]);
    const [sortingCriteria, setSortingCriteria] = useState('newest'); 
    // selected Items
    function selectedImage(event){
        console.log(event.target.value);
    }
     // selectTab
     function selectTab(nextTab) {
        setTab(nextTab);      
    }
    // Show Data
    function showMoreClick() {
        setShowMore(!showMore);
    }
    // get All Search Input Data
    const handleInputChange  = (event) => {
        const { name, value } = event.target;
        setSearchInputs((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };
    // Function for base64 and Data onLoad   
    const dataOnLoad = (file) => {
        if (file && isSupportedImageFormat(file, imgFormat)) {
        const newFile = {
            baseData:'', 
            imgSize: 0, 
            imgName: ''
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            newFile.baseData = event.target.result;
            newFile.imgSize = file.size/(1024);
            newFile.imgName = file.name;
            setSelectedFile((prevSelectedFiles) => [...prevSelectedFiles, newFile]);
            onImageUpload(file, newFile.baseData);
        };
        reader.readAsDataURL(file);
        } else {
        setError(
            {
            status: true,
            msg: `Invalid image format. Please upload an Valid image.`
            });
        }
    }
    const isSupportedImageFormat = (file, imgFormat) => {
        // eslint-disable-next-line react/prop-types
        const conCatData = imgFormat.map(element => 'image/' + element);
        return conCatData.includes(file.type)
    };

    // min max
    const searchImages = () => {
        // eslint-disable-next-line react/prop-types
        const filtered = selectedFile.filter((image) => {
            const size = image.imgSize;
            return size >= searchInputs.filterMinData && size <= searchInputs.filterMaxData;
        });
        setFilteredImages(filtered);
    };
    // Sort All Images 
    const sortImages = () => {
        const sortedImages = [...selectedFile];

        switch (sortingCriteria) {
        case 'newest':
            sortedImages.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            break;
        case 'oldest':
            sortedImages.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
            break;
        case 'name-az':
            sortedImages.sort((a, b) => a.imgName.localeCompare(b.imgName));
            break;
        case 'name-za':
            sortedImages.sort((a, b) => b.imgName.localeCompare(a.imgName));
            break;
        case 'size-smallest':
            sortedImages.sort((a, b) => a.imgSize - b.imgSize);
            break;
        case 'size-largest':
            sortedImages.sort((a, b) => b.imgSize - a.imgSize);
            break;
        default:
            break;
        }
        setImages(sortedImages);
    };

    const handleSortingChange = (event) => {
        setSortingCriteria(event.target.value);
    };

    useEffect(() => {
        sortImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortingCriteria]);
    return(
        <div className={classes.row}>
            <div className={classes.container}>
                <div className={classes.header}>
                    <h4>Select Image</h4>
                    <p>Close</p>
                </div>
                <div className={classes.sidebar}>
                    <div className={classes.sidebarTopContent}>
                        <div className={classes.sidebarOption}>
                            <p>Store Library</p>
                            <p>Icon</p>
                        </div>
                        <TabButton isActive={tab === 'images'} onClick={() => selectTab('images')}>
                            <div className={classes.sidebarOption}>
                                <p>Images</p>
                                <p>{selectedFile.length}</p>
                            </div>
                        </TabButton>

                        <TabButton isActive={tab === 'selected'} onClick={() => selectTab('selected')}>
                            <div className={classes.sidebarOption}>
                                <p>Selected</p>
                                <p>Icon</p>
                            </div>
                        </TabButton>
                      
                    </div>

                    <div className={classes.sidebarBottomContent}>
                        <div className={classes.sidebarOption}>
                            <p>Saved Views</p>
                            <p>Icon</p>
                        </div>
                        <div className= {classes.sidebarOption}>
                            <p>No saved views found</p>
                        </div>
                    </div>

                </div>

                <div className={classes.mainBody}>
                    <div className={classes.navFilter}>
                        <div className={classes.searchBox}>
                            <input type="text" name="searchItem" placeholder="Search files" value={searchInputs.searchItem} onChange={handleInputChange}/>
                        </div>
                        <div className={classes.filterOption}>
                            <button type="button" onClick={showMoreClick}>Filter</button>
                            <div>
                                <label>
                                Sort by:
                                <select value={sortingCriteria} onChange={handleSortingChange}>
                                    <option value="newest">Data Added (Newest First)</option>
                                    <option value="oldest">Data Added (Oldest First)</option>
                                    <option value="name-az">File Name (A-Z)</option>
                                    <option value="name-za">File Name (Z-A)</option>
                                    <option value="size-smallest">File Size (Smallest First)</option>
                                    <option value="size-largest">File Size (Largest First)</option>
                                </select>
                                </label>
                            </div>
                            <h5>View</h5>
                        </div>
                    </div>
                    {showMore && <>
                            <label style={{display:'flex', flexDirection:'column', width:'40%'}} htmlFor="">Min Size (KB)
                            <input type="number" name="filterMinData" value={searchInputs.filterMinData} onChange={handleInputChange} />
                            </label>
                            <label style={{display:'flex', flexDirection:'column', width:'40%'}} htmlFor="">Max Size (KB)
                                <input type="number" name="filterMaxData" value={searchInputs.filterMaxData} onChange={handleInputChange} />
                            </label>
                            <button onClick={searchImages}>Search</button>
                        </>
                    }

                    <div className={classes.scrollBar}>
                        <DropZone dataOnLoad={dataOnLoad} imgFormat={imgFormat} setError={setError} error={error} />
                        {tab === 'images' && <ImageTab searchInputs={searchInputs.searchItem} selectedFile={selectedFile} filteredImages={filteredImages} images={images} />}
                        {tab === 'selected' && <Selected searchInputs={searchInputs.searchItem} selectedFile={selectedFile} filteredImages={filteredImages} images={images} />}
                    </div>
                </div>

                <div className={classes.footer}>
                    <button type="button">Close</button>
                    <button type="button">Done</button>
                </div>
            </div>
        </div>
    );
}