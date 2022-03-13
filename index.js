import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import process from 'process';
import cors from 'cors';

// process.report.reportOnFatalError = true;
// process.report.reportOnUncaughtException = true;
// process.report.reportOnSignal = true;
// process.report.filename = "report.json";

// import customerRoutes from './routes/customer.js';
// import produkKategoriRoutes from './routes/produkKategori.js';
// import produkSubKategoriRoutes from './routes/produkSubKategori.js';
// import produkMaterialRoutes from './routes/produkMaterial.js';
// import produkRoutes from './routes/product.js';
// import produkColorRoutes from './routes/productColor.js';
// import lokasiRoutes from './routes/lokasiStore.js';
// import termRoutes from './routes/termConditions.js';
// import cartRoutes from './routes/shoppingBag.js';
// import provinceRoutes from './routes/province.js';
// import cityRoutes from './routes/city.js';
// import propertyRoutes from './routes/property.js';
// import districtRoutes from './routes/district.js';
// import privacyRoutes from './routes/privacyPolicy.js';
// import contactRoutes from './routes/contact.js';
// import socialMediaRoutes from './routes/socialMedia.js';
// import socialMediaAppsRoutes from './routes/socialMediaApps.js';
// import helpCenterRoutes from './routes/helpCenter.js';
// import homeRoutes from './routes/homepage.js';
// import productBySubCategoryRoutes from './routes/subcategoryPage.js';
// import productSizeRoutes from './routes/productSize.js';
// import midtransRoutes from './routes/midtransTest.js';
//Admin Routes
// import administrator from './routes/admin/admin.js';
// import adminCustomer from './routes/admin/customer.js';
// import adminProdukKategori from './routes/admin/productCategory.js';
// import adminProdukSubKategori from './routes/admin/productSubCategory.js';
// import adminProduk from './routes/admin/product.js';
// import adminProdukList from './routes/admin/productList.js';
// import adminProdukImage from './routes/admin/productImage.js';
// import adminProdukSize from './routes/admin/produkSize.js';
// import adminCustomerAddress from './routes/admin/customer_address.js';
// import adminSetting from './routes/admin/settings.js';
// import adminVoucher from './routes/admin/voucher.js';
// import adminProductImage from './routes/admin/productListImage.js';

import storeLocationRouter from './routes/storeLocationController.js';
import userRouter from './routes/userController.js';
import productRouter from './routes/productController.js';
import authRouter from './routes/authController.js';
import locationRouter from './routes/locationController.js';
import imageRouter from './routes/imageController.js';
import PDTRouter from './routes/PDTController.js';
import checkoutRouter from './routes/checkoutController.js';
import voucherRouter from './routes/voucherController.js';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//var uploadPath = path.resolve(__dirname, 'uploads');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/stores', storeLocationRouter);
app.use('/location', locationRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/pdt', PDTRouter);
app.use('/checkout', checkoutRouter);
app.use('/vouchers', voucherRouter);

app.use('/products', productRouter);
app.use('/images', imageRouter);
// app.use('/home',homeRoutes);
// app.use('/product-by-subcategory',productBySubCategoryRoutes);
// app.use('/customer',customerRoutes); // [Done]
// app.use('/kategori-produk',produkKategoriRoutes);
// app.use('/subkategori-produk',produkSubKategoriRoutes);
// app.use('/material-produk', produkMaterialRoutes);
// app.use('/warna-produk', produkColorRoutes);
// app.use('/size-produk', productSizeRoutes);
// app.use('/product',produkRoutes);
// app.use('/property', propertyRoutes);
// app.use('/lokasi-store',lokasiRoutes);
// app.use('/term-conditions',termRoutes);
// app.use('/shopping-bag',cartRoutes);
// app.use('/province',provinceRoutes);
// app.use('/city',cityRoutes);
// app.use('/district',districtRoutes);
// app.use('/privacy-policy',privacyRoutes);
// app.use('/contact', contactRoutes);
// app.use('/social-media', socialMediaRoutes);
// app.use('/social-media-apps', socialMediaAppsRoutes);
// app.use('/help-center', helpCenterRoutes);
// app.use('/midtrans-test', midtransRoutes);
//Set Admin Routes
// app.use('/admin/product-category',adminProdukKategori);
// app.use('/admin/product-subcategory',adminProdukSubKategori);
// app.use('/admin/product',adminProduk);
// app.use('/admin/produk-list',adminProdukList);
// app.use('/admin/produk-image',adminProdukImage);
// app.use('/admin/produk-size',adminProdukSize);
// app.use('/admin/customer',adminCustomer);
// app.use('/administrator',administrator);
// app.use('/admin/customer-address',adminCustomerAddress);
// app.use('/admin/setting',adminSetting);
// app.use('/admin/voucher',adminVoucher);
// app.use('/admin/produk-list-image',adminProductImage);
app.use(express.static(__dirname));

app.get('/',(req,res) => {
    res.send('Hello From Homepage');
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});