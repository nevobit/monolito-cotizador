const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.cotroller')
const { verifyToken } = require('../middlewares/authJWT');
const updateProducts = require('../utils/updateProducts');
const XLSX = require('xlsx');
const fs = require('fs');
const Product = require('../models/Product');

router.get("/", [productCtrl.getProducts])


router.get("/updating", async(req, res) => {

    // const publicFolderPath = path.join(__dirname, '../image');
    const excelFilePath =  'src/document/referencias.xlsx';
    const workbook = XLSX.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const excelData = XLSX.utils.sheet_to_json(worksheet);

    const products = await Product.find({}).sort({ sku: 1 });

    const productArray = excelData.map(row => {
        return {
          referencia: row.Referencia,
          precio1: row.Precio1
        };
      });


      const notCommonProducts = productArray.filter(item => !products.some(product => product.sku === item.referencia));
 let finalListOfProducts = notCommonProducts.map((p) => {
      let prices = []
      for (let i = 1; i <= 5; i++) {
        if (p[`precio${i}`] && p[`precio${i}`] > 0) {
          prices.push({
            price: p[`precio${i}`],
            // description: p[`descripcionPrecio${i}`]
          })
        }
      }
      const product = {
        sku: p.referencia,
        // name: p.nombre,
        // resume: p.resumen,
        // keywords: p.palabrasClaveSeo,
        // description: p.descripcionProducto,
        // photo: p.imageUrl,
        // custom: false,
        prices
      }
      return product
    })

       
      await Product.insertMany(finalListOfProducts)

     for (let i = 0; productArray.length; i++) {
          await Product.updateMany(
            { sku: productArray[i].referencia },
           { $set: { 'prices.0.price': productArray[i].precio1 } }
          );

        
          console.log(`Precios actualizados para SKU: ${productArray[i].referencia}`);
       }
    
    res.status(200).send({obj: "obj"})
})

module.exports = router;
