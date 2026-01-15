export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface DashboardStats {
    total_deposit: number;
    total_deposit_value: number;
    total_withdraw: number;
    total_withdraw_value: number;
    total_verified_kyc: number;
    total_registration: number;
    sales_list: SalesList[];
}

export interface SalesList {
    month: string;
    total_sales: number;
}