//export const BASE_URL = "https://money-manager-application-gofn.onrender.com/api/v1.0";
export const BASE_URL = "http://localhost:8080/api/v1.0";

const CLOUDINARY_CLOUD_NAME="dvt2eou0k";

export const API_ENDPOINTS =  {
    LOGIN: "/login",
    REGISTER: "/register",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    GET_USER_INFO:"/profile",
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    UPDATE_CATEGORY: (categoryId)=>`/categories/${categoryId}`,
    GET_ALL_INCOMES:"/incomes",
    GET_ALL_EXPENSES:"/expenses",
    CATEGORY_BY_TYPE:(type)=>`/categories/${type}`,
    ADD_INCOME:"/incomes",
    ADD_EXPENSES:"/expenses",
    INCOME_EXCEL_DOWNLOAD:"/excel/download/incomes",
    INCOME_SEND_EXCEL_EMAIL:"/email/income-excel",
    EXPENSE_EXCEL_DOWNLOAD:"/excel/download/expenses",
    EXPENSE_SEND_EXCEL_EMAIL:"/email/expense-excel",
    DELETE_INCOME:(id)=>`/incomes/${id}`,
    DELETE_EXPENSES:(id)=>`/expenses/${id}`,
    APPLY_FILTERS:"/filter",
    DASHBOARD_DATA:"/dashboard",



}