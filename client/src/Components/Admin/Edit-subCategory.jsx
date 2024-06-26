import React, {useEffect, useState} from 'react';
import toast, {Toaster} from "react-hot-toast";
import Layout from "../Layout/Layout.jsx";
import {useNavigate, useParams} from "react-router-dom";
import adminStore from "../../Store/adminStore.js";

const EditSubCategory = () => {
    const navigate=useNavigate();

    const [img,setImg]=useState("");
    const {subcategoryID}=useParams();

    const urlParams = new URLSearchParams(window.location.search);
    const categoryID = urlParams.get('categoryId');

    const {subcategoryByID,subcategoryForm,subcategoryFormDataChange,readSubCategory,updateSubcategory}=adminStore();
    useEffect(() => {
        (async ()=>{
            await subcategoryByID(subcategoryID);
        })()
    }, [subcategoryID,categoryID]);

    const convert64=(e)=>{
        const read=new FileReader();
        read.readAsDataURL((e.target.files[0]));
        read.onload=()=>{
            setImg(read.result);
        }
    }
    let image;
    if(img===null || img===""){
        image=subcategoryForm.subcategoryImg;
    }else {
        image=img;
    }
    const postBody={
        subcategoryName:subcategoryForm.subcategoryName,
        subcategoryImg:image
    }
    const SubcategoryUpdate=async ()=>{
        const res=await updateSubcategory(subcategoryID,postBody);
        if(res==='success'){
            toast.success("Subcategory updated successfully");
            navigate(`/admin/create-subcategory/${categoryID}`);

        }else{
            toast.error("Something went wrong!")
        }

    }
    return (
        <Layout>
            <div className="mt-32 ">
                <div className="flex justify-center items-center">
                    <div className="shadow-md w-1/2 h-auto rounded-md border-t-2 border-t-gray-100 ">
                        <div className="flex items-center justify-center mt-10 mb-5">
                            <h2 className="text-xl font-semibold">Edit Subcategory</h2>
                        </div>
                        <hr/>
                        <div className="flex items-center justify-center mt-10 mb-5">
                            <div className="w-2/3">
                                <label>Edit category: </label><br/>
                                <input value={subcategoryForm.subcategoryName} onChange={(e)=>{subcategoryFormDataChange("subcategoryName",e.target.value)}} className="w-full border border-cyan-200 rounded-md px-5 py-1" placeholder="Enter text"/>

                                <div className="flex items-center space-x-2 mt-2 justify-center">
                                    {
                                        img===null || img===""?(
                                            <>
                                                <img src={subcategoryForm.subcategoryImg
                                                } alt="categoryImg" className="w-20 h-20 object-cover rounded-md"/>
                                            </>
                                        ):(
                                            <>
                                                <img src={img} alt="categoryImg" className="w-16 h-16 object-cover rounded-md"/>
                                            </>
                                        )
                                    }

                                    <input type="file" accept="image/*" onChange={convert64} id="categoryImg" className="sr-only" placeholder="Additional input"/>
                                    <label htmlFor="categoryImg" className="px-8 py-1 rounded-full shadow-md bg-cyan-200 border border-cyan-400 hover:bg-cyan-300 hover:border hover:border-cyan-600">Edit Image</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center mb-10 ">
                            <button onClick={()=>{SubcategoryUpdate()}} className="bg-green-600 rounded-full shadow px-5 py-1 text-white font-semibold border-2 border-cyan-300 hover:bg-green-800">Save</button>
                        </div>


                    </div>

                </div>
            </div>
            <Toaster position="bottom-center"/>

        </Layout>
    );
};

export default EditSubCategory;