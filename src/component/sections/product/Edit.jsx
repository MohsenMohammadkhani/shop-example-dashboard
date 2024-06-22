import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import Sidebar from "../../partials/aside/Sidebar";
import Title from "../../partials/Title";
import validateEditProduct from "../../../validations/product/edit";
import toastHelper from "../../../helpers/toast";
import httpHelper from "../../../helpers/http";
import spinnerHelper from "../../../helpers/spinner";
import helpersNumbers from "../../../helpers/number";

export default function Edit() {
  const history = useHistory();
  const [amount, setAmount] = useState(1000000);
  const [imagesFileUpload, setImagesFileUpload] = useState([]);
  const [imagesProduct, setImagesProduct] = useState([]);
  const [attributes, setAttributes] = useState({});
  const [product, setProduct] = useState();
  const params = useParams();
  const productID = params.productID;

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    spinnerHelper.showSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    const resultGetProduct = await sendRequestGetProduct(productID);
    spinnerHelper.removeSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);

    if (!resultGetProduct.result) {
      return;
    }

    setProduct(resultGetProduct.product);
    setAmount(resultGetProduct.product.price);
    setImagesProduct(resultGetProduct.product.attributes.images_path);
    let attributes = resultGetProduct.product.attributes;
    delete attributes.images_path;
    setAttributes(attributes);
  }

  async function sendRequestGetProduct(productID) {
    try {
      const resultRequest = await httpHelper.getRequest(
        `${process.env.REACT_APP_DOMAIN_API}/api/v1/dashboard/product/${productID}`,
        getHeaderForRequest()
      );

      return {
        result: true,
        product: resultRequest.data.data,
      };
    } catch (error) {
      toast.error(
        error.response.data.message,
        toastHelper.getOptionErrorToast()
      );
      return {
        result: false,
      };
    }
  }

  const inputAmountChangeHandler = (e) => {
    let number = e.target.value;
    number = helpersNumbers.toEnglishNumber(number.replaceAll(",", ""));
    if (number == "") {
      number = 0;
    }
    setAmount(parseInt(number));
  };

  const inputAmountBeforeInputHandler = (e) => {
    const regexLetter = new RegExp("^[0-9\b]+$");
    if (!regexLetter.test(e.data)) {
      e.preventDefault();
      return;
    }
  };

  function removeImagePreviewUploaded(index) {
    const newImagesProduct = imagesProduct.filter((item, indexFiler) => {
      if (index != indexFiler) {
        return item;
      }
    });
    setImagesProduct(newImagesProduct);
  }

  function removeImagePreview(index) {
    const newImagesFileUpload = imagesFileUpload.filter((item, indexFiler) => {
      if (index != indexFiler) {
        return item;
      }
    });
    setImagesFileUpload(newImagesFileUpload);
  }

  function generateImagePreview() {
    if (imagesFileUpload.length == 0 && imagesProduct.length == 0) {
      return (
        <div class="alert alert-warning w-100 text-center">
          هیچ عکسی وارد نشده.
        </div>
      );
    }

    return (
      <>
        {imagesFileUpload.map((file, index) => {
          return (
            <div className="col-12 col-md-3" id="">
              <div className="border border-1 rounded position-relative">
                <span
                  className="position-absolute"
                  style={{ left: "10px", top: "10px" }}
                  onClick={() => {
                    removeImagePreview(index);
                  }}
                >
                  <span className="remove-product-image">
                    <i className="fas fa-times"></i>
                  </span>
                </span>
                <a href={URL.createObjectURL(file)} target="_blank">
                  <img class="img-fluid" src={URL.createObjectURL(file)} />
                </a>
              </div>
            </div>
          );
        })}

        {imagesProduct.map((imageProductURL, index) => {
          return (
            <div className="col-12 col-md-3" id="">
              <div className="border border-1 rounded position-relative">
                <span
                  className="position-absolute"
                  style={{ left: "10px", top: "10px" }}
                  onClick={() => {
                    removeImagePreviewUploaded(index);
                  }}
                >
                  <span className="remove-product-image">
                    <i className="fas fa-times"></i>
                  </span>
                </span>
                <a href={imageProductURL} target="_blank">
                  <img class="img-fluid" src={imageProductURL} />
                </a>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  function addAttribute() {
    const attributeKey = document.querySelector("#attribute-key").value;
    const attributeValue = document.querySelector("#attribute-value").value;
    if (!attributeKey) {
      return;
    }
    if (!attributeValue) {
      return;
    }

    if (attributes[attributeKey]) {
      alert("این ویژگی وجود دارد");
      return;
    }
    const newAttributes = new Map();
    newAttributes[attributeKey] = attributeValue;
    setAttributes({ ...attributes, ...newAttributes });
    document.querySelector("#attribute-key").value = "";
    document.querySelector("#attribute-value").value = "";
  }

  function removeAttribute(key) {
    delete attributes[key];
    setAttributes({ ...attributes });
  }

  function generateAttribute() {
    if (!Object.keys(attributes).length) {
      return (
        <tr>
          <td colSpan={"100%"} className="text-center">
            هیچ مشخصاتی وارد نشده.
          </td>
        </tr>
      );
    }

    return Object.keys(attributes).map((key) => {
      return (
        <tr>
          <td>{key}</td>
          <td>{attributes[key]}</td>
          <td>
            <span
              className="btn btn-danger"
              onClick={() => {
                removeAttribute(key);
              }}
            >
              <i class="fas fa-times"></i>
            </span>
          </td>
        </tr>
      );
    });
  }

  function makeFormData(productData) {
    let formData = new FormData();
    for (const [key, value] of Object.entries(productData)) {
      formData.append(key, value);
    }

    for (
      let counter = 0;
      counter < productData.count_images_upload;
      counter++
    ) {
      formData.append(`file-${counter}`, imagesFileUpload[counter]);
    }

    return formData;
  }

  async function sendForm() {
    const productData = getProductData();
    const resultValidateAddProduct = validateEditProduct(productData);

    if (resultValidateAddProduct != true) {
      toast.error(resultValidateAddProduct, toastHelper.getOptionErrorToast());
      return;
    }

    const productFormData = makeFormData(productData);
    spinnerHelper.showSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    let resultEditProduct = await sendRequestEditProduct(
      productID,
      productFormData
    );
    spinnerHelper.removeSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);

    if (!resultEditProduct.result) {
      return;
    }

    toast.success("محصول ویرایش شد.", {
      ...toastHelper.getOptionErrorToast(),
      autoClose: toastHelper.timeClose,
      onClose: () => {
        history.push(`/product/all`);
      },
    });
  }

  function getProductData() {
    return {
      title: document.querySelector("#title").value,
      slug: document.querySelector("#slug").value,
      is_exist: +document.querySelector("#is-exist-product").checked + "",
      price: amount + "",
      description: document.querySelector("#description").value,
      count_images_upload: imagesFileUpload.length + "",
      count_images_uploaded: imagesProduct.length + "",
      attributes: JSON.stringify(attributes),
      images_uploaded: JSON.stringify(imagesProduct),
    };
  }

  function getHeaderForRequest() {
    const token = localStorage.getItem("token");
    return {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Requested-With": "XMLHttpRequest",
        authorization: `Bearer ${token}`,
      },
    };
  }

  async function sendRequestEditProduct(productID, formData) {
    for (const value of formData.values()) {
      console.log(value);
    }
    try {
      await httpHelper.postRequest(
        `${process.env.REACT_APP_DOMAIN_API}/api/v1/dashboard/product/${productID}?_method=put`,
        formData,
        getHeaderForRequest()
      );
      return {
        result: true,
      };
    } catch (error) {
      toast.error(
        error.response.data.message,
        toastHelper.getOptionErrorToast()
      );
      return {
        result: false,
      };
    }
  }

  function generateProduct() {
    let isChecked = "";
    if (product.is_exist) {
      isChecked = "checked";
    }

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendForm();
        }}
      >
        <div className="form-group">
          <label>عنوان</label>
          <input
            tabIndex="1"
            dir="rtl"
            type="text"
            id="title"
            className="form-control"
            defaultValue={product.title}
            required
          />
        </div>

        <div className="form-group">
          <label>
            اسلاگ (فقط حروف کوچک انگلیسی و اعداد و خط فاصله مجاز است.)
          </label>
          <input
            tabIndex="1"
            dir="ltr"
            type="text"
            id="slug"
            className="form-control"
            defaultValue={product.slug}
            onKeyDown={(event) => {
              const allowKeys = ["ArrowLeft", "ArrowRight", "Backspace"];
              if (allowKeys.includes(event.key)) {
                return event;
              }

              const regex = /^[a-z0-9-]$/i;
              if (!regex.test(event.key)) {
                event.preventDefault();
              }
            }}
            required
          />
        </div>

        <div>
          <span className="d-flex align-items-center">
            <span className="pl-2">
              <label className="m-0"> محصول موجود است؟</label>
            </span>
            <span>
              <label className="adl-switch">
                <input
                  id="is-exist-product"
                  type="checkbox"
                  defaultChecked={isChecked}
                />
                <span className="adl-slider round"></span>
              </label>
            </span>
          </span>
        </div>

        <div>
          <label className="pb-2">مبلغ محصول</label>
          <div>
            <div class="input-group">
              <input
                type="text"
                id="amount"
                class="form-control number-finance"
                value={helpersNumbers.toPersianNum(
                  helpersNumbers.toFormatFinanceNumber(amount)
                )}
                onChange={inputAmountChangeHandler}
                onBeforeInput={inputAmountBeforeInputHandler}
                dir="ltr"
              />
              <div class="input-group-append">
                <span class="input-group-text">تومان</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>توضیحات</label>
          <textarea
            tabIndex="1"
            rows="5"
            dir="rtl"
            id="description"
            className="form-control"
            defaultValue={product.description}
            required
          ></textarea>
        </div>

        <div>
          <label className="pb-2">
            عکس ها محصول (چند عکس را با هم انتخاب کنید)
          </label>
          <div>
            <div class="input-group">
              <input
                multiple="multiple"
                type="file"
                name="files[]"
                id="images"
                accept=".webp,.jpeg,.jpg"
                className="form-control"
                onChange={() => {
                  setImagesFileUpload([
                    ...imagesFileUpload,
                    ...document.querySelector("#images").files,
                  ]);
                }}
              />
            </div>
          </div>
        </div>

        <div id="images" className="row py-2">
          {generateImagePreview()}
        </div>

        <div className="py-2">
          <div>
            <div className="d-flex align-items-end">
              <span>
                <label className="pb-2">نام ویژگی</label>
                <input
                  className="form-control"
                  type="text"
                  id="attribute-key"
                />
              </span>
              <span className="px-4">
                <label className="pb-2">مقدار ویژگی</label>
                <input
                  className="form-control"
                  type="text"
                  id="attribute-value"
                />
              </span>
              <span>
                <span
                  className="btn btn-success"
                  onClick={() => {
                    addAttribute();
                  }}
                >
                  اضافه کردن ویژگی
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="table-responsive pt-3">
          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <td>نام ویژگی</td>
                <td>مقدار ویژگی</td>
              </tr>
            </thead>
            <tbody>{generateAttribute()}</tbody>
          </table>
        </div>

        <div className="form-group">
          <button className="btn btn-primary">ویرایش  </button>
        </div>
      </form>
    );
  }

  return (
    <div className="wrapper">
      <Sidebar openItem="products" />
      <div className="content-wrapper">
        <Title title="ویرایش کردن محصول" />

        <section className="content">
          <div className="card">
            <div className="card-body">{product && generateProduct()}</div>
          </div>
        </section>
      </div>
    </div>
  );
}
