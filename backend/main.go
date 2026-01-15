// main.go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/rs/cors"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/admin/dashboard/stats", me)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		MaxAge:           300,
		Debug:            true,
	})

	handlerWithCors := c.Handler(mux)

	handler := loggingMiddleware(handlerWithCors)

	fmt.Println("Server starting on :8080...")
	
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}

func me(w http.ResponseWriter, r *http.Request) {
	// Only allow GET method
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Sample response data
	resp := ApiResponse{
		Success: true,
		Message: "Success",
		Data: DashboardData{
			TotalDepositValue:  1000000,
			TotalDeposit:       6,
			TotalWithdrawValue: 500000,
			TotalWithdraw:      3,
			TotalVerifiedKYC:   25,
			TotalRegistration:  125,
			SalesList: []SalesData{
				{Month: "January", TotalSales: 64},
				{Month: "February", TotalSales: 40},
				{Month: "March", TotalSales: 38},
				{Month: "April", TotalSales: 52},
				{Month: "May", TotalSales: 80},
				{Month: "June", TotalSales: 32},
				{Month: "July", TotalSales: 56},
				{Month: "August", TotalSales: 70},
				{Month: "September", TotalSales: 68},
			},
		},
	}

	// Set content type
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	// Write JSON response (pretty-printed)
	encoder := json.NewEncoder(w)
	encoder.SetIndent("", "  ") // optional: makes output readable
	if err := encoder.Encode(resp); err != nil {
		log.Printf("json encode error: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
}

// Simple logging middleware (optional but recommended)
func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		duration := time.Since(start)

		log.Printf("%s %s %s %v",
			r.Method,
			r.URL.Path,
			r.RemoteAddr,
			duration,
		)
	})
}
