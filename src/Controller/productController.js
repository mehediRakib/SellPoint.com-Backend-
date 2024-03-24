const {readCategoryService, readSubCategoryService, productByCategoryService, productBySubCategoryService,
    productSellService, ReadProductDetailsService, listByKeywordService, listByLocationService, productListByLowPrice,
    productListByHighPrice, sortProductByTimeService, filterProductByConditionService
} = require("../Service/productService");

exports.readCategory=async (req,res)=>{
    const result=await readCategoryService();
    res.status(200).json(result);
}

exports. readSubCategory=async (req,res)=>{
    const result=await readSubCategoryService(req);
    res.status(200).json(result);
}

exports.readProductByCategory=async (req,res)=>{
    const result=await productByCategoryService(req);
    res.status(200).json(result);
}

exports.readProductBySubCategory=async (req,res)=>{
    const result=await productBySubCategoryService(req);
    res.status(200).json(result);
}

exports.sellProduct=async (req,res)=>{
    const result=await productSellService(req);
    res.status(200).json(result);
}

exports.readProductDetails=async (req,res)=>{
    const result=await ReadProductDetailsService(req);
    res.status(200).json(result);
}

exports.listByKeyWord=async (req,res)=>{
    const result=await listByKeywordService(req)
    res.status(200).json(result);
}


exports.listByLocation=async (req,res)=>{
    const result=await listByLocationService(req);
    res.status(200).json(result);
}

exports.listByLowPrice=async (req,res)=>{
    const result=await productListByLowPrice(req);
    res.status(200).json(result);
}

exports.listByHighPrice=async (req,res)=>{
    const result=await productListByHighPrice(req);
    res.status(200).json(result);
}

exports. sortProductByTime=async (req,res)=>{
    const result=await sortProductByTimeService(req);
    res.status(200).json(result);
}

exports.sortByCondition=async (req,res)=>{
    const result=await filterProductByConditionService(req);
    res.status(200).json(result);
}