import connection from "../config/database.js";

const checkExistingProduct = (barcode_pcs) => {
  let query = `SELECT * FROM product WHERE barcode = '${barcode}'`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      return resolve(result.length > 0);
    });
  }).catch(err => {
    return err;
  });
}

const addNewProduct = (product) => {
  let query = `INSERT INTO product (barcode, subcategory_id, price, material_id, color_id, size_id) VALUES('${product.barcode}', ${product.subcategory_id}, ${product.price}, '${material_id}', '${color_id}', '${size_id}')`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      const response = {
        code: 200,
        status: "ok",
        data: product,
        error: null
      }

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
}

// NAH NANTI BIKIN ALGORITMA DUMMY DEH
// CHECK
const getAllProducts = () => {
  // let query =
  //   `SELECT
  //     p.id,
  //     p.barcode,
  //     c.name_in_id as category,
  //     sc.name_in_id as subcategory,
  //     sc.price,
  //     p.stock,
  //     m.name as material,
  //     color.name as color,
  //     s.name as size,
  //     p.created_at,
  //     p.updated_at
  //   FROM product p
  //   JOIN product_subcategory sc ON p.subcategory_id = sc.id
  //   JOIN product_category c ON sc.category_id = c.id
  //   JOIN product_material m ON p.material_id = m.id
  //   JOIN product_color color ON p.color_id = color.id
  //   JOIN product_size s ON p.size_id = s.id
  //   LIMIT 50`;

  // let query =
  //   `SELECT
  //     p.subcategory_id as product_id,
  //     sc.name_in_id as indonesia_name,
  //     sc.name_in_eng as english_name,
  //     sc.price,
  //     SUM(p.stock) stock,
  //     p.created_at,
  //     p.updated_at
  //   FROM product p
  //   JOIN product_subcategory sc ON p.subcategory_id = sc.id
  //   GROUP BY p.subcategory_id, indonesia_name, english_name
  //   ORDER BY p.subcategory_id ASC
  //   LIMIT 50`;

  let query = `SELECT p.subcategory_id as product_id, sc.name_in_id as indonesia_name, sc.name_in_eng as english_name, sc.price, SUM(p.stock) stock, p.created_at, p.updated_at FROM product p JOIN product_subcategory sc ON p.subcategory_id = sc.id GROUP BY p.subcategory_id, indonesia_name, english_name ORDER BY p.subcategory_id ASC LIMIT 50`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      let products = [];

      result.forEach((res, index) => {
        let temp = res;
        temp['thumbnail'] = `http://api.myalexis.xyz:3001/uploads/products/productImage-1645502195243.jpg`

        if((index + 1) % 3 == 0) {
          temp['image_type'] = 'single';
        } else {
          temp['image_type'] = 'double';
        }

        products = [...products, temp];
      });

      const response = {
        code: 200,
        status: "ok",
        data: {
          products: products
        },
        error: null
      };

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
}

const getSingleProduct = (product) => {
  let query = `SELECT p.id, p.barcode, c.name_in_id as category, sc.name_in_id as subcategory, p.price, p.stock, m.name as material, color.name as color, s.name as size, p.created_at, p.updated_at FROM product p JOIN product_subcategory sc ON p.subcategory_id = sc.id JOIN product_category c ON sc.category_id = c.id JOIN product_material m ON p.material_id = m.id JOIN product_color color ON p.color_id = color.id JOIN product_size s ON p.size_id = s.id WHERE p.id = ${product.id}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      const product = result[0];

      const response = {
        code: 200,
        status: "ok",
        data: {
          product
        },
        error: null
      };

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
};

const getAllMaterials = () => {
  const query = "SELECT id, name, created_at, updated_at FROM product_material";

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      const response = {
        code: 200,
        status: "ok",
        data: {
          materials: result
        },
        error: null
      };

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
}

const getAllSize = () => {
  const query = "SELECT id, name, selection, created_at, updated_at FROM product_size";

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      const response = {
        code: 200,
        status: "ok",
        data: {
          sizes: result
        },
        error: null
      };

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
}

const getSingleSize = (queryParam) => {
  let query = `SELECT id, name, selection, created_at, updated_at FROM product_size WHERE`;
  let queryNum = 0;

  const keys = Object.keys(queryParam);

  keys.forEach((key, index) => {
    if(queryNum) {
      query += ` AND`;
    }

    if(queryParam[key]) {
      query += ` ${key} = '${queryParam[key]}'`;
      queryNum += 1;
    }
  });

  // if(queryParam.sizeId) {
  //   query += ` id = '${queryParam.sizeId}'`
  //   queryNum += 1;
  // }

  // if(queryParam.selection) {
  //   if(queryNum == 1) {
  //     query += ` AND`;
  //   }

  //   query += ` selection = '${queryParam.selection}'`
  // }

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      if(result.length < 1) {

        const response = {
          code: 200,
          status: "ok",
          data: {
            message: "Tidak ada ukuran produk",
            sizes: null
          },
          error: null
        }

        return resolve(response);
      } else if(result.length < 2) {

        const size = result[0];
        const response = {
          code: 200,
          status: "ok",
          data: {
            size: size
          },
          error: null
        }

        return resolve(response);
      }

      const response = {
        code: 200,
        status: "ok",
        data: {
          sizes: result
        },
        error: null
      }

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
}

const getAllColors = () => {
  const query = `SELECT id, name, created_at, updated_at FROM product_color`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      const colors = result;

      const response = {
        code: 200,
        status: "ok",
        data: {
          colors: colors
        },
        error: null
      }

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
}

const getAllCategories = () => {
  const query = `SELECT id, name_in_id, name_in_eng, created_at, updated_at FROM product_category`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      const categories = result;
      const response = {
        code: 200,
        status: "ok",
        data: {
          categories: categories
        },
        error: null
      };

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
}

const getAllSubCategories = () => {
  const query = `SELECT id, name_in_id, name_in_eng, category_id, created_at,updated_at FROM product_subcategory`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      const subcategories = result;
      const response = {
        code: 200,
        status: "ok",
        data: {
          subcategories: subcategories
        },
        error: null
      };

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
}

const getAllReturns = () => {
  const query =
    "SELECT product_return.id, product.name as product_name, product_return.product_id, product_return.reason, product_return.created_at, product_return.updated_at FROM product_return JOIN product ON product_return.product_id = product.id";

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      const returns = result;
      const response = {
        code: 200,
        status: "ok",
        data: {
          returns: resturns
        },
        error: null
      }

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
}

const getProductByBarcode = (barcode) => {
  let query = `SELECT p.id, p.barcode, c.name_in_id as category, sc.name_in_id as subcategory, p.price, p.stock, m.name as material, color.name as color, s.name as size, p.created_at, p.updated_at FROM product p JOIN product_subcategory sc ON p.subcategory_id = sc.id JOIN product_category c ON sc.category_id = c.id JOIN product_material m ON p.material_id = m.id JOIN product_color color ON p.color_id = color.id JOIN product_size s ON p.size_id = s.id WHERE p.barcode = ${barcode}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      const product = result[0];
      const response = {
        code: 200,
        status: "ok",
        data: {
          product: product
        },
        error: null
      };

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
}

const addNewCart = (cart) => {
  // product_id diperoleh dari subcategory_id
  let query = `INSERT INTO cart (customer_id, product_id, unit) VALUES(${cart.customer_id}, ${cart.product_id}, ${cart.unit})`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      const response = {
        code: 200,
        status: "ok",
        data: {
          product_id: cart.product_id,
          qty: cart.unit
        },
        error: null
      }

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
}

const getCartByCustomer = (customer_id) => {
  let query = `SELECT
                cart.id,
                product.barcode,
                cart.unit,
                product_subcategory.name_in_id,
                product_subcategory.name_in_eng,
                product_subcategory.price
              FROM cart
              JOIN product ON cart.product_id = product.id
              JOIN product_subcategory ON product.subcategory_id = product_subcategory.id
              WHERE customer_id = ${customer_id}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      const carts = result;

      const response = {
        code: 200,
        status: "ok",
        data: {
          carts: carts
        },
        error: null
      };

      return resolve(response);
    });
  }).catch(err => {
    return err;
  })
}

const addNewWishlist = (wishlist) => {
  let query = `INSERT INTO wishlist (customer_id, product_id) VALUES(${wishlist.customer_id}, ${wishlist.product_id})`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      const response = {
        code: 200,
        status: "ok",
        data: {
          product_id: wishlist.product_id
        },
        error: null
      };

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
}

const getWishlistByCustomer = (customer_id) => {
  let query = `SELECT * FROM wishlist WHERE customer_id = ${customer_id}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      const wishlists = result;
      const response = {
        code: 200,
        status: "ok",
        data: {
          wishlist: wishlists
        },
        error: null
      };

      return resolve(response);
    });
  }).catch(err => {
    return err;
  })
}

const getAllProductCategories = () => {
  let query = `SELECT * FROM product_category`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      const product_category = result;
      const response = {
        code: 200,
        status: "ok",
        data: {
          product_category
        },
        error: null
      };

      return resolve(response);
    });
  }).catch(err => {
    return err;
  })
}

const getSingleProductCategory = (categoryId) => {
  let query = `SELECT * FROM product_category WHERE id = ${categoryId}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Request can't provide",
            errMessage: error
          }
        }

        return reject(errResponse);
      }

      if(result.length < 1) {
        const response = {
          code: 200,
          status: "ok",
          data: {
            message: "Tidak ada data kategori produk"
          },
          error: null
        };

        return resolve(response);
      }

      const categoryProduct = result[0]
      const response = {
        code: 200,
        status: "ok",
        data: {
          category_product: categoryProduct
        },
        error: null
      };

      return resolve(response);
    });
  }).catch(err => {
    return err;
  })
}

const getListedProducts = () => {
  let query = `SELECT id, barcode, stock FROM product`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const responseError = {
          code: 400,
          status: 'bad request',
          data: null,
          error: {
            message: "Bad Request",
            errMessage: error
          }
        };

        return reject(responseError);
      }

      const numProductListed = result.length;

      if(numProductListed > 0) {
        const dataBuilder = {
          total_data: numProductListed,
          products: result
        }

        const response = {
          code: 200,
          status: "ok",
          data: dataBuilder,
          error: null
        };

        return resolve(response);
      } else {
        const dataBuilder = {
          total_data: numProductListed,
          products: []
        }

        const response = {
          code: 200,
          status: "ok",
          data: dataBuilder,
          error: null
        };

        return resolve(response);
      }

    });
  }).catch(err => {
    return err;
  });
}

const getStoredProducts = () => {
  let query = `SELECT id, product_bpcs, storage_code FROM storage_product`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const responseError = {
          code: 400,
          status: 'bad request',
          data: null,
          error: {
            message: "Bad Request",
            errMessage: error
          }
        };

        return reject(responseError);
      }

      const numProductStored = result.length;

      if(numProductStored > 0) {
        const dataBuilder = {
          total_data: numProductStored,
          products: result
        }

        const response = {
          code: 200,
          status: "ok",
          data: dataBuilder,
          error: null
        };

        return resolve(response);
      } else {
        const dataBuilder = {
          total_data: numProductStored,
          products: []
        }

        const response = {
          code: 200,
          status: "ok",
          data: dataBuilder,
          error: null
        };

        return resolve(response);
      }

    });
  }).catch(err => {
    return err;
  });
}

const getToBeListedProducts = () => {
  let query = "SELECT * FROM product"; // algoritma belum sempurna karena membutuhkan data dari alexis

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const responseError = {
          code: 400,
          status: 'bad request',
          data: null,
          error: {
            message: "Bad Request",
            errMessage: error
          }
        };

        return reject(responseError);
      }

      // =============================
      // AWAL ALGORITMA SEMENTARA
      // =============================
      const response = {
        code: 204,
        status: "ok",
        data: [],
        error: null
      };

      return resolve(response);
      // =============================
      // AKHIR ALGORITMA SEMENTARA
      // =============================

      const numProductNotListed = result.length;

      if(numProductNotListed > 0) {
        const dataBuilder = {
          total_data: numProductNotListed,
          products: result
        }

        const response = {
          code: 200,
          status: "ok",
          data: dataBuilder,
          error: null
        };

        return resolve(response);
      } else {
        const dataBuilder = {
          total_data: numProductNotListed,
          products: []
        }

        const response = {
          code: 200,
          status: "ok",
          data: dataBuilder,
          error: null
        };

        return resolve(response);
      }

    });
  }).catch(err => {
    return err;
  });
}

const getToBeStoredProducts = () => {
  let query = "SELECT id, barcode, stock FROM product WHERE barcode NOT IN (SELECT product_bpcs FROM storage_product)"; // algoritma belum sempurna karena membutuhkan data dari alexis

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const responseError = {
          code: 400,
          status: 'bad request',
          data: null,
          error: {
            message: "Bad Request",
            errMessage: error
          }
        };

        return reject(responseError);
      }

      const numProductNotStored = result.length;

      if(numProductNotStored > 0) {
        const dataBuilder = {
          total_data: numProductNotStored,
          products: result
        }

        const response = {
          code: 200,
          status: "ok",
          data: dataBuilder,
          error: null
        };

        return resolve(response);
      } else {
        const dataBuilder = {
          total_data: numProductNotStored,
          products: []
        }

        const response = {
          code: 200,
          status: "ok",
          data: dataBuilder,
          error: null
        };

        return resolve(response);
      }

    });
  }).catch(err => {
    return err;
  });
}

const getPhotographedProducts = () => {
  let query = `SELECT product.id, product.barcode, product.stock, product_image.image_url, product_image.type FROM product JOIN product_image ON product.id = product_image.product_id`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const responseError = {
          code: 400,
          status: 'bad request',
          data: null,
          error: {
            message: "Bad Request",
            errMessage: error
          }
        };

        return reject(responseError);
      }

      const numProductPhotograph = result.length;

      if(numProductPhotograph > 0) {
        const productBuilder = [];

        result.forEach((res, index) => {
          let temp = {
            product_id: res.id,
            barcode: res.barcode,
            stock: res.stock,
            image: []
          };

          let image_meta = {
            type: res.type,
            image_url: `http://api.myalexis.xyz:3001/${res.image_url}`
          };

          if(index == 0) {
            temp.image.push(image_meta);
            productBuilder.push(temp);
          } else {
            let exist = false;
            let locateIndex = -1;
            productBuilder.forEach((product, index) => {
              if(product.product_id == temp.product_id) {
                locateIndex = index;
                exist = true;
              }
            });

            if(!exist) {
              temp.image.push(image_meta);
              productBuilder.push(temp);
            } else {
              productBuilder[locateIndex].image.push(image_meta);
            }
          }
        });

        const dataBuilder = {
          total_data: numProductPhotograph,
          products: productBuilder
        };

        const response = {
          code: 200,
          status: "ok",
          data: dataBuilder,
          error: null
        };

        return resolve(response);
      } else {
        const dataBuilder = {
          total_data: numProductPhotograph,
          products: []
        };

        const response = {
          code: 200,
          status: "ok",
          data: dataBuilder,
          error: null
        };

        return resolve(response);
      }

    });
  }).catch(err => {
    return err;
  });
}

const getToBePhotographedProducts = () => {
  let query = `SELECT id, barcode, stock FROM product WHERE id not in (SELECT product_id FROM product_image)`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const responseError = {
          code: 400,
          status: 'bad request',
          data: null,
          error: {
            message: "Bad Request",
            errMessage: error
          }
        };

        return reject(responseError);
      }

      const numToBeProductPhotograph = result.length;

      if(numToBeProductPhotograph > 0) {
        const dataBuilder = {
          total_data: numToBeProductPhotograph,
          products: result
        }

        const response = {
          code: 200,
          status: "ok",
          data: dataBuilder,
          error: null
        };

        return resolve(response);
      } else {
        const dataBuilder = {
          total_data: numToBeProductPhotograph,
          products: []
        }

        const response = {
          code: 200,
          status: "ok",
          data: dataBuilder,
          error: null
        };

        return resolve(response);
      }

    });
  }).catch(err => {
    return err;
  });
}

const addReturnProduct = (product) => {
  let query = `INSERT INTO product_return (product_id, reason, status) VALUE (${product.product_id}, '${product.reason}', 1)`; // 1 -> dalam perjalanan, 2 -> diterima

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Bad Request",
            errMessage: error
          }
        };

        return reject(errorResponse);
      }

      const response = {
        code: 200,
        status: "ok",
        data: {
          product_id: product.product_id,
          reason: product.reason,
          status: "dalam perjalanan"
        },
        error: null
      }

      return resolve(response);
    });
  }).catch(err => {
    return err;
  })
}

const getReturnProduct = (status = null) => {
  let query = `SELECT product_return.id, product_return.product_id, product.barcode FROM product_return JOIN product ON product_return.product_id = product.id`;

  if(status) {
    query += ` WHERE product_return.status = ${status}`;
  }

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Bad Request",
            errMessage: error
          }
        };

        return reject(errResponse);
      }

      const response = {
        code: 200,
        status: "ok",
        data: {
          products: result
        },
        error: null
      };

      return resolve(response);
    })
  }).catch(err => {
    return err;
  });
}

const getDiscardedProduct = () => {
  let query = `SELECT id, barcode, stock, material_id, size_id, color_id FROM product_discarded`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Bad Request",
            errMessage: error
          }
        };

        return reject(errResponse);
      }

      const response = {
        code: 200,
        status: "ok",
        data: {
          products: result
        },
        error: null
      };

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
}

const getToBeDiscarded = () => {
  let query = `SELECT product_damage.id, product.id, product.barcode, product.stock, product.material_id, product.size_id, product.color_id FROM product_damage JOIN product ON product_damage.product_id = product.id`;

  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        const errResponse = {
          code: 400,
          status: "bad request",
          data: null,
          error: {
            message: "Bad Request",
            errMessage: error
          }
        };

        return reject(errResponse);
      }

      const response = {
        code: 200,
        status: "ok",
        data: {
          products: result
        },
        error: null
      };

      return resolve(response);
    });
  }).catch(err => {
    return err;
  });
}

export default {
  checkExistingProduct,
  addNewProduct,
  getAllProducts,
  getSingleProduct,
  getAllMaterials,
  getAllSize,
  getSingleSize,
  getAllColors,
  getAllCategories,
  getAllSubCategories,
  getAllReturns,
  getProductByBarcode,
  addNewWishlist,
  getWishlistByCustomer,
  addNewCart,
  getCartByCustomer,
  getAllProductCategories,
  getSingleProductCategory,
  getListedProducts,
  getStoredProducts,
  getPhotographedProducts,
  getToBeListedProducts,
  getToBeStoredProducts,
  getToBePhotographedProducts,
  getReturnProduct,
  addReturnProduct,
  getToBeDiscarded,
  getDiscardedProduct,
}
