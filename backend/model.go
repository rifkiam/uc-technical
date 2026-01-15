package main

type ApiResponse struct {
	Success bool          `json:"success"`
	Message string        `json:"message"`
	Data    DashboardData `json:"data"`
}

type DashboardData struct {
	TotalDeposit       int         `json:"total_deposit"`
	TotalDepositValue  int         `json:"total_deposit_value"`
	TotalWithdraw      int         `json:"total_withdraw"`
	TotalWithdrawValue int         `json:"total_withdraw_value"`
	TotalVerifiedKYC   int         `json:"total_verified_kyc"`
	TotalRegistration  int         `json:"total_registration"`
	SalesList          []SalesData `json:"sales_list"`
}

type SalesData struct {
	Month      string `json:"month"`
	TotalSales int    `json:"total_sales"`
}
